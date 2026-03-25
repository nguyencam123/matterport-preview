"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { MATTERPORT, TOUR_SWEEPS } from "@/data/project";
import type { MpSdk, SdkStatus, TransitionKey } from "@/types";

// ─────────────────────────────────────────────
//  Cấu hình một tag
// ─────────────────────────────────────────────
export interface TagDef {
  label: string;
  description?: string;
  anchorPosition: { x: number; y: number; z: number };
  stemVector?: { x: number; y: number; z: number };
  color?: { r: number; g: number; b: number };
  /** Sweep chứa tag này — để tour biết dừng lại ở đây */
  hostSweepId: string;
}

// ─────────────────────────────────────────────
//  Tour status
// ─────────────────────────────────────────────
export type TourStatus = "idle" | "running" | "paused" | "done";

// ─────────────────────────────────────────────
//  Constants — chỉnh tại đây nếu muốn
// ─────────────────────────────────────────────
// const PAN_ANGLE = 35; // ± độ xoay trái/phải
const PAN_SPEED = 25; // °/giây (thấp = chậm = đẹp)
const RESUME_AFTER = 10_000; // ms không tương tác → tự resume
const SWEEP_DWELL = 3_500; // ms dừng sweep không có tag (3.5s)
const TAG_DWELL = 4_000; // ms dừng tại sweep có tag
const TRANSITION_MS = 800; // ms fade giữa các sweep

// ─────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────

function delayAbortable(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise<void>((resolve) => {
    if (signal.aborted) {
      resolve();
      return;
    }
    const t = setTimeout(resolve, ms);
    signal.addEventListener("abort", () => {
      clearTimeout(t);
      resolve();
    });
  });
}

/** Lấy rotation hiện tại của camera (chỉ lấy 1 lần, dùng flag để bỏ qua callback tiếp theo) */
function getCurrentRotation(mpSdk: MpSdk): Promise<{ x: number; y: number }> {
  return new Promise((resolve) => {
    let resolved = false;
    mpSdk.Camera.pose.subscribe(
      (pose: { rotation: { x: number; y: number } }) => {
        if (resolved) return;
        resolved = true;
        resolve({ x: pose.rotation.x, y: pose.rotation.y });
      },
    );
  });
}

/**
 * Xoay camera trái → phải → về giữa
 * Dùng setRotation với speed thấp để tạo hiệu ứng pan chậm
 */
async function doPanPreview(mpSdk: MpSdk, signal: AbortSignal): Promise<void> {
  if (signal.aborted) return;

  const BASE_Y = -105; // ← chỉnh tại đây

  const go = (y: number) =>
    mpSdk.Camera.setRotation({ x: 0, y }, { speed: PAN_SPEED }).catch(
      (e: unknown) => console.warn("[pan]", e),
    );

  await Promise.race([go(BASE_Y - 30), delayAbortable(4_000, signal)]);
  if (signal.aborted) return;

  await Promise.race([go(BASE_Y + 30), delayAbortable(4_000, signal)]);
  if (signal.aborted) return;

  await Promise.race([go(BASE_Y), delayAbortable(4_000, signal)]);
}

// ─────────────────────────────────────────────
//  Hook chính
// ─────────────────────────────────────────────
export function useMatterport(
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
  tags: TagDef[] = [],
) {
  const [status, setStatus] = useState<SdkStatus>("connecting");
  const [currentSweepId, setCurrentSweepId] = useState<string | null>(null);
  const [allSweeps, setAllSweeps] = useState<string[]>([]);
  const [tourStatus, setTourStatus] = useState<TourStatus>("idle");
  const [tourIndex, setTourIndex] = useState(0);

  const sdkRef = useRef<MpSdk | null>(null);
  const sweepTagsRef = useRef<Map<string, string[]>>(new Map()); // sweepId → tagSid[]
  const abortRef = useRef<AbortController | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeIndexRef = useRef(0); // sweep index sẽ resume từ đây

  // ─────────────────────────────────────────────
  //  User interaction → pause → auto-resume 10s
  // ─────────────────────────────────────────────
  const handleUserInteraction = useCallback(() => {
    abortRef.current?.abort();
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    setTourStatus("paused");

    resumeTimerRef.current = setTimeout(() => {
      setTourStatus("running");
    }, RESUME_AFTER);
  }, []);

  // Detect user tương tác với iframe qua window blur
  // (khi user click/drag vào iframe, focus chuyển sang iframe → window blur)
  useEffect(() => {
    const onBlur = () => handleUserInteraction();
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, [handleUserInteraction]);

  // ─────────────────────────────────────────────
  //  Kết nối SDK
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (!iframeRef.current || typeof window === "undefined") return;

    const tryConnect = () => {
      if (!window.MP_SDK) {
        setTimeout(tryConnect, 300);
        return;
      }

      const { sdkKey, sdkVersion } = MATTERPORT;

      window.MP_SDK.connect(iframeRef.current!, sdkKey, sdkVersion)
        .then(async (mpSdk: MpSdk) => {
          sdkRef.current = mpSdk;
          setStatus("ready");

          // Theo dõi sweep hiện tại
          // mpSdk.Sweep.current.subscribe((sweep: { id?: string }) => {
          //   if (sweep?.id) setCurrentSweepId(sweep.id);
          // });

          // Lấy toàn bộ sweep
          mpSdk.Sweep.data.subscribe({
            onCollectionUpdated(col: Record<string, unknown>) {
              setAllSweeps(Object.keys(col));
            },
          });

          // ── Thêm Mattertag mặc định (pin vàng Matterport) ──
          if (tags.length > 0) {
            await Promise.all(
              tags.map(async (tag) => {
                const sids = await mpSdk.Mattertag.add({
                  label: tag.label,
                  description: tag.description ?? "",
                  anchorPosition: tag.anchorPosition,
                  stemVector: tag.stemVector ?? { x: 0, y: 0.3, z: 0 },
                  color: tag.color ?? { r: 0.86, g: 0.78, b: 0.55 },
                });

                const tagSid = Array.isArray(sids) ? sids[0] : sids;

                // Map: hostSweepId → [tagSid]
                const prev = sweepTagsRef.current.get(tag.hostSweepId) ?? [];
                sweepTagsRef.current.set(tag.hostSweepId, [...prev, tagSid]);
              }),
            );
          }

          // Bắt đầu tour sau 1.5s (chờ sweep đầu load xong)
          setTimeout(() => setTourStatus("running"), 1500);
        })
        .catch((err: unknown) => {
          console.error("[Matterport SDK]", err);
          setStatus("error");
        });
    };

    tryConnect();
  }, [iframeRef]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─────────────────────────────────────────────
  //  Tour runner
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (tourStatus !== "running") return;

    const mpSdk = sdkRef.current;
    if (!mpSdk) return;

    if (!TOUR_SWEEPS?.length) {
      console.warn(
        "[Tour] TOUR_SWEEPS rỗng — khai báo trong src/data/project.ts",
      );
      // setTourStatus("done");
      return;
    }

    const ctrl = new AbortController();
    abortRef.current = ctrl;
    const { signal } = ctrl;

    const startIdx = resumeIndexRef.current;

    const run = async () => {
      for (let i = startIdx; i < TOUR_SWEEPS.length; i++) {
        if (signal.aborted) break;

        const sweepId = TOUR_SWEEPS[i];
        resumeIndexRef.current = i;
        setTourIndex(i);
        console.log(`[Tour] ${i + 1}/${TOUR_SWEEPS.length} → ${sweepId}`);

        // 1. Di chuyển đến sweep
        try {
          await mpSdk.Sweep.moveTo(sweepId, {
            transition: mpSdk.Sweep.Transition.FADE,
            transitionTime: TRANSITION_MS,
          });
        } catch (e) {
          console.warn(`[Tour] moveTo ${sweepId} failed:`, e);
        }
        if (signal.aborted) break;

        // Đợi transition xong hẳn
        await delayAbortable(TRANSITION_MS + 200, signal);
        if (signal.aborted) break;

        // 2. Pan preview: trái → phải → giữa
        await doPanPreview(mpSdk, signal);
        if (signal.aborted) break;

        // 3. Dừng — lâu hơn nếu sweep có tag
        const hasTags = (sweepTagsRef.current.get(sweepId) ?? []).length > 0;
        const dwell = hasTags ? TAG_DWELL : SWEEP_DWELL;
        console.log(
          `[Tour] Dừng ${dwell / 1000}s (${hasTags ? "có tag" : "không tag"})`,
        );
        await delayAbortable(dwell, signal);
        if (signal.aborted) break;
      }

      if (!signal.aborted) {
        console.log("[Tour] ✅ Hoàn thành!");
        resumeIndexRef.current = 0;
        setTourIndex(0);
        setTourStatus("done");
      }
    };

    run();
    return () => {
      ctrl.abort();
    };
  }, [tourStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup khi unmount
  useEffect(
    () => () => {
      abortRef.current?.abort();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    },
    [],
  );

  // ─────────────────────────────────────────────
  //  Manual controls (export ra component cha)
  // ─────────────────────────────────────────────
  const stopTour = useCallback(() => {
    abortRef.current?.abort();
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeIndexRef.current = 0;
    setTourIndex(0);
    setTourStatus("idle");
  }, []);

  const pauseTour = useCallback(() => {
    abortRef.current?.abort();
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    setTourStatus("paused");
  }, []);

  const resumeTour = useCallback(() => {
    setTourStatus("running");
  }, []);

  const restartTour = useCallback(() => {
    abortRef.current?.abort();
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeIndexRef.current = 0;
    setTourIndex(0);
    setTimeout(() => setTourStatus("running"), 50);
  }, []);

  const moveTo = useCallback(
    async (sweepId: string, transition: TransitionKey = "FADE") => {
      const mpSdk = sdkRef.current;
      if (!mpSdk || !sweepId) return;
      try {
        await mpSdk.Sweep.moveTo(sweepId, {
          transition: mpSdk.Sweep.Transition[transition],
          transitionTime: transition === "INSTANT" ? 0 : TRANSITION_MS,
        });
      } catch (e) {
        console.error("moveTo failed:", e);
      }
    },
    [],
  );

  return {
    status,
    currentSweepId,
    allSweeps,
    moveTo,
    tourStatus,
    tourIndex,
    stopTour,
    pauseTour,
    resumeTour,
    restartTour,
  };
}
