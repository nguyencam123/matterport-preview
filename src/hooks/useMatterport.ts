"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { MATTERPORT } from "@/data/project";
import type { MpSdk, SdkStatus, TransitionKey } from "@/types";

// ─────────────────────────────────────────────
//  Cấu hình một hotspot
// ─────────────────────────────────────────────
export interface HotspotDef {
  label: string; // tên hiển thị trên badge
  targetSweepId: string; // sweep sẽ nhảy đến khi click
  anchorPosition: { x: number; y: number; z: number };
  stemVector?: { x: number; y: number; z: number };
  transition?: TransitionKey;
}

// ─────────────────────────────────────────────
//  Sinh HTML cho một hotspot
// ─────────────────────────────────────────────
function buildHotspotHTML(label: string): string {
  return `
    <style>
      .hs { display:flex; flex-direction:column; align-items:center; gap:6px; cursor:pointer; }
      .hs-wrap { position:relative; display:flex; align-items:center; justify-content:center; }
      .hs-ring {
        position:absolute; width:48px; height:48px; border-radius:50%;
        border:2px solid rgba(200,169,110,0.55);
        animation:hsPulse 2s ease-out infinite;
      }
      .hs-ring2 {
        position:absolute; width:48px; height:48px; border-radius:50%;
        border:2px solid rgba(200,169,110,0.25);
        animation:hsPulse 2s ease-out infinite 0.5s;
      }
      .hs-btn {
        position:relative; width:38px; height:38px; border-radius:50%;
        background:rgba(200,169,110,0.92);
        display:flex; align-items:center; justify-content:center;
        box-shadow:0 0 0 5px rgba(200,169,110,0.18);
        transition:transform 0.2s;
      }
      .hs-btn:hover { transform:scale(1.12); }
      .hs-arrow {
        width:0; height:0;
        border-top:5px solid transparent;
        border-bottom:5px solid transparent;
        border-left:9px solid #0b0b0b;
      }
      .hs-label {
        background:rgba(11,11,11,0.88);
        color:#f0ede8;
        font-size:11px;
        font-family:'DM Sans',sans-serif;
        letter-spacing:0.08em;
        padding:4px 12px;
        border-radius:20px;
        white-space:nowrap;
        border:1px solid rgba(200,169,110,0.35);
      }
      @keyframes hsPulse {
        0%   { transform:scale(0.85); opacity:0.9; }
        70%  { transform:scale(1.7);  opacity:0; }
        100% { transform:scale(0.85); opacity:0; }
      }
    </style>
    <div class="hs">
      <div class="hs-wrap">
        <div class="hs-ring"></div>
        <div class="hs-ring2"></div>
        <div class="hs-btn">
          <div class="hs-arrow"></div>
        </div>
      </div>
      <div class="hs-label">${label}</div>
    </div>
  `;
}

// ─────────────────────────────────────────────
//  Hook chính
// ─────────────────────────────────────────────
export function useMatterport(
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
  hotspots: HotspotDef[] = [],
) {
  const [status, setStatus] = useState<SdkStatus>("connecting");
  const [currentSweepId, setCurrentSweepId] = useState<string | null>(null);
  const [allSweeps, setAllSweeps] = useState<string[]>([]);
  const sdkRef = useRef<MpSdk | null>(null);

  useEffect(() => {
    if (!iframeRef.current || typeof window === "undefined") return;

    const tryConnect = () => {
      if (!window.MP_SDK) {
        setTimeout(tryConnect, 300);
        return;
      }

      const { sdkKey, sdkVersion } = MATTERPORT;

      window.MP_SDK.connect(iframeRef.current!, sdkKey, sdkVersion)
        .then(async (mpSdk) => {
          sdkRef.current = mpSdk;
          setStatus("ready");

          // ── 1. Auto rotate 180° tại start location ──
          let hasRotatedAtStart = false;

          mpSdk.Sweep.current.subscribe((sweep) => {
            if (sweep?.id) {
              setCurrentSweepId(sweep.id);
              // Chỉ xoay 1 lần duy nhất khi vừa load xong
              if (!hasRotatedAtStart) {
                hasRotatedAtStart = true;

                // Đợi một chút để SDK ổn định trước khi xoay
                setTimeout(() => {
                  let poseHandled = false;

                  mpSdk.Camera.pose.subscribe(
                    (pose: { rotation: { x: number; y: number } }) => {
                      if (poseHandled) return;
                      poseHandled = true;

                      const targetYaw = pose.rotation.y + 180;

                      mpSdk.Camera.setRotation(
                        { x: pose.rotation.x, y: targetYaw },
                        { speed: 25 }, // °/giây — tăng để xoay nhanh hơn
                      ).catch((err: unknown) => {
                        console.warn("[setRotation failed]", err);
                      });
                    },
                  );
                }, 600); // delay 600ms sau khi sweep đầu tiên được detect
              }
            }
          });

          // ── 2. Lấy toàn bộ sweep ──
          mpSdk.Sweep.data.subscribe({
            onCollectionUpdated(collection: Record<string, unknown>) {
              const ids = Object.keys(collection);
              console.log("[All Sweeps]", ids);
              setAllSweeps(ids);
            },
          });

          // ── 3. Thêm hotspot + injectHTML ──
          if (hotspots.length > 0) {
            // Map từ tagSid → targetSweepId để dùng trong click handler
            const sidToTarget = new Map<
              string,
              { sweepId: string; transition: TransitionKey }
            >();

            await Promise.all(
              hotspots.map(async (hs) => {
                // Thêm Mattertag (pin)
                const sids = await mpSdk.Mattertag.add({
                  label: hs.label,
                  description: "",
                  anchorPosition: hs.anchorPosition,
                  // stemVector rất nhỏ → ẩn cán trắng mặc định
                  stemVector: hs.stemVector ?? { x: 0, y: 0.001, z: 0 },
                  color: { r: 0, g: 0, b: 0 }, // ẩn màu gốc, HTML tự render
                });

                const tagSid = Array.isArray(sids) ? sids[0] : sids;

                // Inject HTML thay thế pin mặc định
                await mpSdk.Mattertag.injectHTML(
                  tagSid,
                  buildHotspotHTML(hs.label),
                  { size: { w: 130, h: 90 } },
                );

                sidToTarget.set(tagSid, {
                  sweepId: hs.targetSweepId,
                  transition: hs.transition ?? "FADE",
                });
              }),
            );

            // ── 4. Lắng nghe click → moveTo ──
            mpSdk.on(mpSdk.Mattertag.Event.CLICK, (sid: string) => {
              const target = sidToTarget.get(sid);
              console.log(target);
              if (!target) return;

              console.log(`[Hotspot click] → ${target.sweepId}`);

              mpSdk.Sweep.moveTo("m13k6xwt0sfkwgq81s014bx5a", {
                transition: mpSdk.Sweep.Transition[target.transition],
                transitionTime: target.transition === "INSTANT" ? 0 : 800,
              });
            });
          }
        })
        .catch((err: unknown) => {
          console.error("[Matterport SDK]", err);
          setStatus("error");
        });
    };

    tryConnect();
  }, [iframeRef]); // eslint-disable-line react-hooks/exhaustive-deps

  // Di chuyển thủ công (dùng cho sidebar cards)
  const moveTo = useCallback(
    async (sweepId: string, transition: TransitionKey = "FADE") => {
      const mpSdk = sdkRef.current;
      if (!mpSdk || !sweepId) return;
      if (sweepId.startsWith("SWEEP_ID")) {
        alert("Thay SWEEP_ID bằng ID thật trong src/data/project.ts");
        return;
      }
      try {
        await mpSdk.Sweep.moveTo(sweepId, {
          transition: mpSdk.Sweep.Transition[transition],
          transitionTime: transition === "INSTANT" ? 0 : 800,
        });
      } catch (e) {
        console.error("moveTo failed:", e);
      }
    },
    [],
  );

  return { status, currentSweepId, allSweeps, moveTo };
}
