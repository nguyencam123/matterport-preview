import Image from "next/image";
import { PROJECT } from "@/data/project";
import imgBg from "../../public/BFD-logo_web.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/6 bg-[#0a0a0a] px-6 md:px-10 py-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <span className="text-[#c8a96e] text-xl">
            <Image src={imgBg} alt="Brand" height={32} className="h-8" />
          </span>
          <div>
            <div className="text-[#c8a96e] text-[11px] font-medium tracking-[0.08em] uppercase">
              {PROJECT.developer}
            </div>
            {/* <div className="text-white/25 text-[9px] tracking-[0.1em] mt-0.5">
              {PROJECT.name} · Virtual Tour
            </div> */}
          </div>
        </div>

        {/* Links */}
        {/* <div className="flex gap-6 flex-wrap">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[12px] text-white/35 tracking-[0.06em] hover:text-white/60 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={CONTACT.website}
            target="_blank"
            rel="noreferrer"
            className="text-[12px] text-white/35 tracking-[0.06em] hover:text-white/60 transition-colors"
          >
            Website
          </a>
        </div> */}

        {/* Copy */}
        <p className="text-[11px] text-white/20">
          © {new Date().getFullYear()} {PROJECT.developer} · Powered by
          Matterport SDK
        </p>
      </div>
    </footer>
  );
}
