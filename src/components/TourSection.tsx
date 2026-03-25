"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const SWEEP_DATA = {
  wgnqrumc7ebc4t05mui19pinc: {
    title: "Phật Di Lặc",
    sub: "Bồ Tát · Di Lặc",
    img: "https://vacationtravel.com.vn/storage/photos/1/68-x-108.jpg",
    imgLabel: "Tượng Phật Di Lặc",
    desc: "Đức Phật Di Lặc — vị Phật của tương lai, biểu tượng cho niềm vui, sự an lành và lòng từ bi vô biên.",
    attrs: [
      ["Tên Phạn", "Maitreya"],
      ["Ý nghĩa", "Vị Phật kế thừa trong tương lai"],
      ["Biểu tượng", "Nụ cười, bụng tròn, túi vải"],
      ["Vị trí", "Tiền đường / cổng tam quan"],
    ],
    tags: ["Từ bi", "Hỷ lạc", "Phật vị lai", "Tài lộc"],
  },
  qq3dab0dw9dmbpbg4wdu644ab: {
    title: "Tượng Hộ Pháp Vi Đà",
    sub: "Hộ Pháp · Thiên Thần",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6gygOPmlRC-g9GDMYFO8CdmG3v87ZgQ1i0Q&s",
    imgLabel: "Hộ Pháp Vi Đà",
    desc: "Vi Đà Hộ Pháp — vị thần hộ trì Phật Pháp, đứng canh giữ cửa chùa với kim cang chử trong tay.",
    attrs: [
      ["Tên Phạn", "Skanda / Veda"],
      ["Chức năng", "Bảo vệ Phật Pháp và tự viện"],
      ["Pháp khí", "Kim cang chử / Bảo kiếm"],
    ],
    tags: ["Hộ trì", "Bảo vệ", "Uy lực"],
  },
  zgc3c2q5p5g3azi3fxf9wmeba: {
    title: "Tiêu Diện Đại Sĩ",
    sub: "Hộ Pháp · Ông Ác",
    img: "https://file.hstatic.net/200000244471/file/tranh-vi-da-bo-tat_b250e1a065064e6a877f651c11b68d01_grande.jpg",
    imgLabel: "Tượng Tiêu Diện Đại Sĩ",
    desc: "Tiêu Diện Đại Sĩ là hóa thân của Bồ Tát Quan Thế Âm, hiện thân uy nghiêm để hàng phục ma quân và dẫn dắt cô hồn.",
    attrs: [
      ["Ý nghĩa", "Diệt trừ cái ác, cảm hóa chúng sinh"],
      ["Hình tướng", "Mặt đỏ, sừng dài, lưỡi thè"],
      ["Vị trí", "Đối diện Hộ Pháp Vi Đà"],
    ],
    tags: ["Hộ trì", "Uy lực", "Hàng ma"],
  },
  m13k6xwt0sfkwgq81s014bx5a: {
    title: "Chính điện",
    sub: "Thích Ca · Văn Thù · Phổ Hiền",
    img: "https://bizweb.dktcdn.net/100/500/453/files/tam-the-phat-01.jpg?v=1699086418293",
    imgLabel: "Tam thế Phật / Thích Ca Tam Tôn",
    desc: "Nơi tôn nghiêm nhất của ngôi chùa, thờ Đức Phật Thích Ca Mâu Ni cùng hai vị đại Bồ Tát đại diện cho Trí tuệ và Hạnh nguyện.",
    attrs: [
      ["Trung tâm", "Đức Phật Thích Ca Mâu Ni"],
      ["Bên trái", "Bồ Tát Văn Thù (cưỡi sư tử)"],
      ["Bên phải", "Bồ Tát Phổ Hiền (cưỡi voi trắng)"],
      ["Ý nghĩa", "Sự kết hợp giữa lý thuyết và thực hành"],
    ],
    tags: ["Trí tuệ", "Hành nguyện", "Giải thoát"],
  },
  "9izcdcg77pbfd7bq1s1ns58yc": {
    title: "Bồ Tát Chuẩn Đề",
    sub: "Thất Câu Chi Phật Mẫu",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRhY--urzItnFjhqRbTuKQo82lCY4FNggV-w&s",
    imgLabel: "Tượng Bồ Tát Chuẩn Đề",
    desc: "Vị Bồ Tát có nhiều cánh tay, tượng trưng cho pháp lực vô biên để cứu độ chúng sinh trong sáu nẻo luân hồi.",
    attrs: [
      ["Pháp khí", "Gương soi, ấn quyết, binh khí"],
      ["Đặc điểm", "Thường có 18 cánh tay"],
      ["Công đức", "Tiêu trừ nghiệp chướng, thọ mạng dài lâu"],
    ],
    tags: ["Pháp lực", "Cứu độ", "Thần chú"],
  },
  i9c4zmxu8f2gf4xfkrxeus0rb: {
    title: "Đức Thánh Hiền & Đức Ông",
    sub: "A Nan Đà · Cấp Cô Độc",
    img: "https://dothothonghong.com/media/data/san-pham/tuong-phat/duc-ong-duc-thanh-hien/tuong-duc-ong-duc-thanh-hien-thong-hong.jpg",
    imgLabel: "Ban thờ Đức Thánh Hiền và Đức Ông",
    desc: "Đức Thánh Hiền (A Nan Đà) đại diện cho giới trí thức tỳ kheo, Đức Ông (Cấp Cô Độc) là vị trưởng giả hộ trì tinh xá đầu tiên.",
    attrs: [
      ["Đức Thánh Hiền", "Thị giả của Phật, đa văn đệ nhất"],
      ["Đức Ông", "Chủ tể bảo vệ cảnh chùa (Già Lam Thần)"],
      ["Vị trí", "Hai hành lang hoặc hai bên tiền đường"],
    ],
    tags: ["Hộ pháp", "Trí tuệ", "Công đức"],
  },
} as const;

type SweepInfo = typeof SWEEP_DATA[keyof typeof SWEEP_DATA];

export default function TourSection() {
  const [drawerData, setDrawerData] = useState<SweepInfo | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.matterport.com/showcase-sdk/latest.js";
    script.onload = async () => {
      const iframe = document.getElementById("mp-iframe") as HTMLIFrameElement;
      const sdk = await window.MP_SDK.connect(iframe, "", "");

      sdk.Sweep.current.subscribe((sweep: { id: string } | null) => {
        if (sweep) {
          const info = SWEEP_DATA[sweep.id as keyof typeof SWEEP_DATA];
          if (info) {
            setDrawerData(info);
            setOpen(true);
          }
        }
        // Không đóng drawer khi đi sang sweep khác không có data
      });
    };
    document.head.appendChild(script);
  }, []);

  return (
    <section id="tour" className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="relative border border-white/[0.07] rounded-xl overflow-hidden bg-[#0b0b0b]">
        <div className="relative" style={{ paddingTop: "56.25%" }}>
          <iframe
            id="mp-iframe"
            src={`https://my.matterport.com/show/?m=YtVzqVgSyFT&play=1&qs=1&hr=0&vr=0&ts=1&applicationKey=wd6pwmg28cn410xsucqgf9eyb`}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            allow="autoplay; fullscreen; web-share; xr-spatial-tracking"
          />
        </div>

        {/* Drawer */}
        <div className={`absolute top-0 right-0 h-full w-80 
          bg-black/90 backdrop-blur-xl border-l border-[#c8a96e]/15
          transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] z-20
          flex flex-col overflow-hidden
          ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* scan animation */}
          <div className="absolute inset-x-0 h-0.5 bg-linear-to-r from-transparent via-[#c8a96e]/30 to-transparent animate-[scan_3s_ease-in-out_infinite] pointer-events-none" />

          <button onClick={() => setOpen(false)}
            className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full 
              bg-white/5 border border-white/10 text-white/40 hover:text-white 
              hover:bg-white/10 transition-all flex items-center justify-center text-sm z-10">
            ✕
          </button>

          {drawerData && (
            <>
              {/* Header */}
              <div className="px-4.5 pt-4.5 pb-0 shrink-0" style={{ padding: "18px 18px 0" }}>
                <div className="inline-flex items-center gap-1.5 bg-[#c8a96e]/8 
                  border border-[#c8a96e]/20 rounded-full px-2.5 py-1 mb-3.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c8a96e] animate-pulse" />
                  <span className="text-[10px] tracking-[0.12em] text-[#c8a96e] uppercase">
                    Nhận diện không gian
                  </span>
                </div>
                <h3 className="text-xl font-medium text-[#f0ede8] leading-snug mb-1">
                  {drawerData.title}
                </h3>
                <p className="text-[11px] tracking-widest text-[#c8a96e]/60 uppercase mb-4">
                  {drawerData.sub}
                </p>
              </div>

              {/* Image */}
              <div className="mx-4.5 mb-4 rounded-xl overflow-hidden aspect-video relative shrink-0" style={{ margin: "0 18px 16px" }}>
                <Image src={drawerData.img} alt={drawerData.imgLabel}
                  className="w-full h-full object-cover" fill />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-2 left-2.5 text-[10px] text-white/50 tracking-wider">
                  {drawerData.imgLabel}
                </span>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-4.5 pb-4.5" style={{ padding: "0 18px 18px" }}>
                <p className="text-[13px] text-white/55 leading-[1.8]">{drawerData.desc}</p>
                <div className="h-px bg-white/6 my-3.5" />
                <div className="flex flex-col gap-2.5">
                  {drawerData.attrs.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <span className="text-[11px] text-white/30 uppercase tracking-[0.08em]">{k}</span>
                      <span className="text-[12px] text-[#f0ede8]/80 text-right leading-snug">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {drawerData.tags.map((tag) => (
                    <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full 
                      bg-[#c8a96e]/[0.07] border border-[#c8a96e]/18 text-[#c8a96e]/70">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}