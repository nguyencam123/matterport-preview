"use client";
import { useRef, useState } from "react";
import { MATTERPORT } from "@/data/project";
import type { TransitionKey } from "@/types";

// ─────────────────────────────────────────────
//  HOTSPOTS — chỉnh sửa ở đây
//  anchorPosition: log console "[Position]" khi đứng gần điểm muốn đặt
// ─────────────────────────────────────────────
// const HOTSPOTS: HotspotDef[] = [
//   {
//     label: "Chính điện →",
//     targetSweepId: "m13k6xwt0sfkwgq81s014bx5a",
//     anchorPosition: {
//       x: 47.422313413083785,
//       y: 1.977594757994845,
//       z: 19.632136899407037,
//     },
//     transition: "FADE",
//   },
//   // Thêm hotspot khác ở đây:
//   // {
//   //   label: "Nhà bếp →",
//   //   targetSweepId: "SWEEP_ID_KITCHEN",
//   //   anchorPosition: { x: ..., y: ..., z: ... },
//   // },
// ];

export default function TourSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [transition, setTransition] = useState<TransitionKey>("FADE");

  // Truyền HOTSPOTS vào hook — tự động inject HTML khi SDK ready
  // const { status, currentSweepId, allSweeps } = useMatterport(
  //   iframeRef,
  //   HOTSPOTS,
  //   {
  //     baseRotationY: 180,
  //     leftDeg: -40,
  //     rightDeg: 40,
  //   },
  // );

  const src = `https://my.matterport.com/show/?m=${MATTERPORT.modelId}&play=1&qs=1&hr=0&vr=0`;

  return (
    <section id="tour" className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Header */}
      {/* <div className="text-center mb-12">
        <div className="inline-block text-[10px] tracking-[0.18em] uppercase text-[#c8a96e] border border-[#c8a96e]/30 rounded-full px-3.5 py-1 mb-4">
          Tour 3D tương tác
        </div>
        <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-light tracking-[0.03em] mb-3">
          Trải nghiệm thực tế
        </h2>
        <p className="text-[15px] text-white/50 max-w-md mx-auto leading-relaxed">
          Chọn loại căn hộ hoặc nhấn vào hotspot trong tour để di chuyển.
        </p>
      </div> */}

      {/* Unit cards */}
      {/* <div
        id="units"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-7"
      >
        {UNITS.map((unit) => {
          const active = activeUnitId === unit.id;
          return (
            <button
              key={unit.id}
              onClick={() => handleUnit(unit)}
              className={`relative flex flex-col items-center gap-1.5 p-5 rounded-xl text-center transition-all duration-200 ${
                active
                  ? "bg-[#c8a96e]/[0.07] border border-[#c8a96e]"
                  : "bg-[#141414] border border-white/[0.07] hover:border-white/20 hover:bg-[#1a1a1a]"
              }`}
            >
              {unit.tag && (
                <span
                  className="absolute top-2.5 right-2.5 text-[9px] tracking-wider px-2 py-0.5 rounded-full"
                  style={{
                    background: `${unit.tagColor}22`,
                    color: unit.tagColor ?? undefined,
                  }}
                >
                  {unit.tag}
                </span>
              )}
              <span className="text-2xl mb-1">{unit.icon}</span>
              <span className="text-[13px] font-medium text-[#f0ede8]">
                {unit.label}
              </span>
              <span className="text-[11px] text-white/40 tracking-wider">
                {unit.area}
              </span>
              <span className="text-[12px] text-white/45">
                {unit.beds > 0 ? `${unit.beds} PN` : "Studio"} · {unit.baths} WC
              </span>
              <span
                className={`text-[13px] font-medium font-serif mt-1 ${active ? "text-[#c8a96e]" : "text-[#f0ede8]"}`}
              >
                {unit.price}
              </span>
              <span
                className={`text-[11px] mt-1.5 px-3 py-1 rounded-full border transition-colors ${
                  active
                    ? "border-[#c8a96e] text-[#c8a96e]"
                    : "border-white/[0.12] text-white/40"
                }`}
              >
                {active ? "▶ Đang xem" : "Xem tour →"}
              </span>
            </button>
          );
        })}
      </div> */}

      {/* Viewer */}
      <div className="border border-white/[0.07] rounded-xl overflow-hidden bg-[#0b0b0b]">
        {/* Status bar */}
        {/* <iframe width="853" height="480" src="https://my.matterport.com/show/?m=YtVzqVgSyFT" frameborder="0" allowfullscreen allow="autoplay; fullscreen; web-share; xr-spatial-tracking;"></iframe> */}

        {/* iframe 16:9 */}
        <div className="relative" style={{ paddingTop: "56.25%" }}>
          {/* {status === "connecting" && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#0b0b0b]">
              <div className="w-9 h-9 rounded-full border-2 border-white/[0.07] border-t-[#c8a96e] animate-spin" />
              <span className="text-[13px] text-white/40">
                Đang tải không gian 3D...
              </span>
            </div>
          )} */}
          <iframe
            src="https://my.matterport.com/show/?m=YtVzqVgSyFT&play=1&qs=1&hr=0&vr=0&ts=1"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            allow="autoplay; fullscreen; web-share; xr-spatial-tracking"
          />
        </div>
      </div>
    </section>
  );
}
