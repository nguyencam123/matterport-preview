"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { PROJECT, CONTACT } from "@/data/project";
import imgBg from "../../public/BFD-logo_web.png";
// const NAV_LINKS = [
//   // { href: "#tour", label: "Tour 3D" },
//   // { href: "#units", label: "Căn hộ" },
//   // { href: "#amenities", label: "Tiện ích" },
//   // { href: "#contact", label: "Liên hệ" },
// ];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-300 ${
          scrolled
            ? "bg-[#0b0b0b]/95 backdrop-blur-md border-b border-white/[0.07]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <span className="text-[#c8a96e] text-xl"><Image src={imgBg} alt="Brand" width={32} height={32} className="w-8 h-8" /></span>
          <div>
            <div className="text-[#c8a96e] text-[11px] font-medium tracking-[0.08em] uppercase">
              {PROJECT.developer}
            </div>
            <div className="text-white/30 text-[9px] tracking-[0.15em] uppercase">
              Virtual Tour
            </div>
          </div>
        </div>

        {/* Desktop links */}
        {/* <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] tracking-[0.06em] text-white/60 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div> */}

        {/* CTA */}
        <a
          href={`tel:${CONTACT.phone}`}
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-[#c8a96e] rounded-md text-[12px] text-[#c8a96e] tracking-[0.04em] hover:bg-[#c8a96e]/10 transition-colors"
        >
          📞 {CONTACT.phone}
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.25 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className={`block w-5 h-[1.5px] bg-white/80 transition-all duration-200 origin-center ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-white/80 transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-white/80 transition-all duration-200 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-[#0b0b0b]/97 backdrop-blur-lg border-b border-white/[0.07] flex flex-col px-6 pb-6">
          {/* {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-3.5 text-base text-white/80 border-b border-white/[0.06] last:border-0"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))} */}
          <a
            href={`tel:${CONTACT.phone}`}
            className="mt-4 py-3 text-center border border-[#c8a96e] rounded-md text-sm text-[#c8a96e]"
          >
            📞 {CONTACT.phone}
          </a>
        </div>
      )}
    </>
  );
}
