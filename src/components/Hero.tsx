import { PROJECT, CONTACT } from "@/data/project";

interface StatItemProps {
  value: string;
  label: string;
}

function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="text-center">
      <div className="font-serif text-[28px] font-light text-[#c8a96e] tracking-wide">
        {value}
      </div>
      <div className="text-[10px] text-white/40 tracking-[0.12em] uppercase mt-1">
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* Grid texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200,169,110,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,110,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(200,169,110,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl gap-0">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase text-white/50 border border-[#c8a96e]/20 rounded-full px-4 py-1.5 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8eb8a0] shadow-[0_0_6px_#8eb8a0]" />
          Tour 3D trực tuyến · {PROJECT.location}
        </div>

        {/* Title */}
        <h1 className="font-serif text-[clamp(42px,7vw,80px)] font-light tracking-[0.04em] leading-[1.1] text-[#f0ede8] mb-5">
          {PROJECT.name}
        </h1>

        {/* Tagline */}
        <p className="text-base text-white/50 leading-[1.7] max-w-md mb-12">
          {PROJECT.tagline}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-8 mb-12 flex-wrap justify-center">
          <StatItem value={`${PROJECT.floors}+`} label="Tầng cao" />
          <div className="w-px h-9 bg-white/10" />
          <StatItem value={`${PROJECT.totalUnits}`} label="Căn hộ" />
          <div className="w-px h-9 bg-white/10" />
          <StatItem value={PROJECT.priceFrom} label="Giá từ" />
          <div className="w-px h-9 bg-white/10" />
          <StatItem value={PROJECT.completionYear} label="Bàn giao" />
        </div>

        {/* CTAs */}
        <div className="flex gap-4 flex-wrap justify-center">
          <a
            href="#tour"
            className="px-8 py-3.5 bg-[#c8a96e] text-[#0b0b0b] rounded-md text-sm font-medium tracking-[0.04em] hover:bg-[#e2c99a] transition-colors"
          >
            Khám phá ngay →
          </a>
          <a
            href={`tel:${CONTACT.phone}`}
            className="px-8 py-3.5 border border-white/15 text-[#f0ede8] rounded-md text-sm tracking-[0.04em] hover:border-white/30 hover:bg-white/[0.03] transition-colors"
          >
            Tư vấn miễn phí
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div
          className="w-px h-10"
          style={{
            background: "linear-gradient(to bottom, rgba(200,169,110,0.6), transparent)",
          }}
        />
        <span className="text-[9px] tracking-[0.15em] uppercase text-white/25">
          Cuộn xuống
        </span>
      </div>
    </section>
  );
}
