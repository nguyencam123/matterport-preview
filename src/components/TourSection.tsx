"use client";
import { useEffect, useRef, useState } from "react";

const SWEEP_INFO = {
  SWEEP_ID_ABC: {
    title: "Phòng khách",
    description: "35m², hướng Đông Nam",
  },
};

export default function TourSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [drawerInfo, setDrawerInfo] = useState<any>(null);
  const [open, setOpen] = useState(false);

  return (
    <section id="tour" className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="relative border border-white/[0.07] rounded-xl overflow-hidden">
        <div className="relative" style={{ paddingTop: "56.25%" }}>
          <iframe
            id="mp-iframe"
            src={`https://my.matterport.com/show/?m=YtVzqVgSyFT&play=1&qs=1&hr=0&vr=0&ts=1`}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            allow="autoplay; fullscreen; web-share; xr-spatial-tracking"
          />
        </div>

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[#111]/90 backdrop-blur-md 
          border-l border-white/10 transition-transform duration-300 z-20
          ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 text-white/40 hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>
    </section>
  );
}
