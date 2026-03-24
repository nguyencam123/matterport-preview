"use client";
import { useState } from "react";
import { CONTACT, PROJECT } from "@/data/project";

interface FormState {
  name: string;
  phone: string;
  unit: string;
  note: string;
}

interface FieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}

function Field({
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] tracking-[0.08em] uppercase text-white/40">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#0b0b0b] border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-[#f0ede8] placeholder:text-white/20 outline-none focus:border-[#c8a96e]/50 transition-colors"
      />
    </div>
  );
}

interface ContactItemProps {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

function ContactItem({ icon, label, value, href }: ContactItemProps) {
  const inner = (
    <div className="flex gap-3 items-start">
      <span className="text-lg shrink-0 mt-0.5">{icon}</span>
      <div>
        <div className="text-[10px] tracking-[0.12em] uppercase text-white/30 mb-0.5">
          {label}
        </div>
        <div className={`text-sm ${href ? "text-[#c8a96e]" : "text-white/70"}`}>
          {value}
        </div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="hover:opacity-80 transition-opacity">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    unit: "",
    note: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: gọi API gửi form (email / CRM / Zalo OA)
    console.log("Form submitted:", form);
    setSent(true);
  };

  const set = (key: keyof FormState) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  return (
    <section
      id="contact"
      className="py-20 px-6 md:px-10 border-t border-white/[0.06]"
    >
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 md:gap-20 items-start">
        {/* Info col */}
        <div className="flex flex-col gap-6">
          <div className="inline-block self-start text-[10px] tracking-[0.18em] uppercase text-[#c8a96e] border border-[#c8a96e]/30 rounded-full px-3.5 py-1">
            Liên hệ tư vấn
          </div>
          <h2 className=" text-[clamp(32px,4vw,52px)] font-light leading-[1.2] tracking-[0.02em]">
            Đặt lịch{" "}
            <em className="italic text-[#c8a96e] not-italic font-light">
              tham quan
            </em>
          </h2>
          <p className="text-[15px] text-white/50 leading-[1.8] max-w-sm">
            Đội ngũ tư vấn của {PROJECT.developer} sẵn sàng hỗ trợ bạn tìm căn
            hộ phù hợp nhất.
          </p>
          <div className="flex flex-col gap-5 mt-2">
            <ContactItem
              icon="📞"
              label="Hotline"
              value={CONTACT.phone}
              href={`tel:${CONTACT.phone}`}
            />
            <ContactItem
              icon="✉️"
              label="Email"
              value={CONTACT.email}
              href={`mailto:${CONTACT.email}`}
            />
            <ContactItem icon="📍" label="Văn phòng" value={CONTACT.address} />
            <ContactItem
              icon="🕐"
              label="Giờ làm việc"
              value={CONTACT.workingHours}
            />
          </div>
        </div>

        {/* Form col */}
        <div className="bg-[#141414] border border-white/[0.07] rounded-xl p-8">
          {sent ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center min-h-[360px]">
              <div className="w-14 h-14 rounded-full bg-[#8eb8a0]/15 border border-[#8eb8a0] flex items-center justify-center text-2xl text-[#8eb8a0]">
                ✓
              </div>
              <h3 className=" text-2xl font-light">Gửi thành công!</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Chúng tôi sẽ liên hệ lại với bạn trong vòng 30 phút.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", phone: "", unit: "", note: "" });
                }}
                className="mt-2 px-6 py-2.5 border border-white/15 rounded-md text-sm text-white/55 hover:border-white/25 transition-colors"
              >
                Gửi yêu cầu khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <h3 className=" text-[22px] font-light tracking-[0.04em] mb-1">
                Đăng ký tư vấn
              </h3>

              <Field
                label="Họ và tên *"
                type="text"
                placeholder="Nguyễn Văn A"
                value={form.name}
                onChange={set("name")}
                required
              />

              <Field
                label="Số điện thoại *"
                type="tel"
                placeholder="0901 234 567"
                value={form.phone}
                onChange={set("phone")}
                required
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] tracking-[0.08em] uppercase text-white/40">
                  Loại căn hộ quan tâm
                </label>
                <select
                  value={form.unit}
                  onChange={(e) => set("unit")(e.target.value)}
                  className="bg-[#0b0b0b] border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-[#f0ede8] outline-none focus:border-[#c8a96e]/50 transition-colors"
                >
                  <option value="">Chọn loại căn hộ</option>
                  <option value="studio">Studio (~32 m²)</option>
                  <option value="1br">1 Phòng ngủ (~48 m²)</option>
                  <option value="2br">2 Phòng ngủ (~72 m²)</option>
                  <option value="3br">3 Phòng ngủ (~96 m²)</option>
                  <option value="penthouse">Penthouse (~160 m²)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] tracking-[0.08em] uppercase text-white/40">
                  Ghi chú
                </label>
                <textarea
                  value={form.note}
                  onChange={(e) => set("note")(e.target.value)}
                  placeholder="Thời gian muốn tham quan, yêu cầu đặc biệt..."
                  rows={3}
                  className="bg-[#0b0b0b] border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-[#f0ede8] placeholder:text-white/20 outline-none focus:border-[#c8a96e]/50 transition-colors resize-y"
                />
              </div>

              <button
                type="submit"
                className="mt-1 py-3.5 bg-[#c8a96e] text-[#0b0b0b] rounded-md text-sm font-medium tracking-[0.04em] hover:bg-[#e2c99a] transition-colors"
              >
                Gửi yêu cầu tư vấn →
              </button>

              <p className="text-[11px] text-white/20 text-center">
                Thông tin của bạn được bảo mật tuyệt đối.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
