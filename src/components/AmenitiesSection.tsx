import { AMENITIES, PROJECT } from "@/data/project";

export default function AmenitiesSection() {
  return (
    <section
      id="amenities"
      className="py-20 px-6 md:px-10 border-t border-white/[0.06] bg-[#0f0f0f]"
    >
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Left */}
        <div className="flex flex-col gap-5">
          <div className="inline-block self-start text-[10px] tracking-[0.18em] uppercase text-[#c8a96e] border border-[#c8a96e]/30 rounded-full px-3.5 py-1">
            Tiện ích dự án
          </div>
          <h2 className="text-[clamp(32px,4vw,52px)] font-light leading-[1.2] tracking-[0.02em]">
            Cuộc sống{" "}
            <em className="italic text-[#c8a96e] not-italic font-light">
              đẳng cấp
            </em>
          </h2>
          <p className="text-[15px] text-white/50 leading-[1.8] max-w-sm">
            {PROJECT.name} mang đến hệ thống tiện ích toàn diện, phục vụ mọi nhu
            cầu của cư dân 24/7.
          </p>
          <a
            href="#contact"
            className="self-start text-[13px] text-[#c8a96e] tracking-[0.06em] hover:text-[#e2c99a] transition-colors"
          >
            Nhận tư vấn chi tiết →
          </a>
        </div>

        {/* Right grid */}
        <div className="grid grid-cols-2 gap-3">
          {AMENITIES.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 bg-[#141414] border border-white/[0.06] rounded-xl"
            >
              <span className="text-[22px] shrink-0">{a.icon}</span>
              <span className="text-[13px] text-white/75 leading-snug">
                {a.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
