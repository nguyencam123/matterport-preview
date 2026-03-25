import type { Unit, Amenity } from "@/types/index";

// ============================================================
//  DỮ LIỆU DỰ ÁN — chỉnh sửa file này cho từng dự án
// ============================================================
export const TOUR_SWEEPS  = [
    "ux0i8tw2swtmzig8kyfqn290a",
    "ixk2nx8cfgurz73cc09f45epc",
    "0ftdcq3cynzpprb3serxhhdxa",
    "ibcmdqcyx7f3gxmpktudmmb6a",
    "xim693dw9y22p1ig8s8efud2d",
    "zkfft1xdf1ai9h1ishx6nf4wb",
    "yhpk7w3gx6c5i0tkhukn643wb",
    "sxu4sinrx391g893ux4as3emc",
    "h2q7p5wf0t360mp0qq0fmtu4d",
    "x1qaprgfpti24q9i0edwxrutc",
    "cqqqb699mxw6a97f42tp9u7ka",
    "mfbhipisrw46eybwiyfnqf6qd",
    "wgnqrumc7ebc4t05mui19pinc",
    "qwz29a62y096sed7w7ag9g65c",
    "4qzf0008bb47u6sise1q01mtc",
    "reh6iq9b2wn92gkmtr4uwcpdb",
    "qq3dab0dw9dmbpbg4wdu644ab",
    "pn6zub53zph7dawbt4r7ycm0b",
    "m13k6xwt0sfkwgq81s014bx5a",
    "9izcdcg77pbfd7bq1s1ns58yc",
    "i9c4zmxu8f2gf4xfkrxeus0rb",
    "zgc3c2q5p5g3azi3fxf9wmeba",
    "t2zb98nm5b3ph3g1c4y5nnt5c",
    "89193chrha4ubprw6cpfq4tsd",
    "wdmeica7dxnda1er00ca3wt5c",
    "42txmg5a4bfmwe7pk5e5sy6id",
    "bggduzbe1u1dukmxt5c4ekh7b"
]
export const PROJECT = {
  name: "The Grand Residence",
  tagline: "Khám phá không gian sống đẳng cấp theo cách của bạn",
  description:
    "Trải nghiệm tour 3D tương tác với công nghệ Matterport — xem mọi góc độ, mọi căn hộ, bất kỳ lúc nào.",
  developer: "BFD Joint Stock Company",
  location: "Hà Đông, Hà Nội",
  completionYear: "2025",
  totalUnits: 320,
  floors: 35,
  priceFrom: "3.2 tỷ",
} as const;

export const MATTERPORT = {
  modelId: "YtVzqVgSyFT",
  sdkKey: "5zm3ey7n4bpp0mu38p989mhdc",
  sdkVersion: "3.10",
} as const;

// Thay SWEEP_ID_x bằng ID thật — mở DevTools > Console > "[All Sweeps]"
export const UNITS: Unit[] = [
  {
    id: "studio",
    sweepId: "SWEEP_ID_1",
    label: "Studio",
    area: "32 m²",
    price: "Từ 3.2 tỷ",
    beds: 0,
    baths: 1,
    icon: "🏠",
    tag: "Phổ biến",
    tagColor: "#c8a96e",
  },
  {
    id: "1br",
    sweepId: "SWEEP_ID_2",
    label: "1 Phòng ngủ",
    area: "48 m²",
    price: "Từ 4.5 tỷ",
    beds: 1,
    baths: 1,
    icon: "🛏️",
    tag: null,
    tagColor: null,
  },
  {
    id: "2br",
    sweepId: "SWEEP_ID_3",
    label: "2 Phòng ngủ",
    area: "72 m²",
    price: "Từ 6.8 tỷ",
    beds: 2,
    baths: 2,
    icon: "🛋️",
    tag: "Bán chạy",
    tagColor: "#8eb8a0",
  },
  {
    id: "3br",
    sweepId: "SWEEP_ID_4",
    label: "3 Phòng ngủ",
    area: "96 m²",
    price: "Từ 9.2 tỷ",
    beds: 3,
    baths: 2,
    icon: "🏡",
    tag: null,
    tagColor: null,
  },
  {
    id: "penthouse",
    sweepId: "SWEEP_ID_5",
    label: "Penthouse",
    area: "160 m²",
    price: "Từ 18 tỷ",
    beds: 4,
    baths: 3,
    icon: "✨",
    tag: "Cao cấp",
    tagColor: "#b09cdb",
  },
];

export const AMENITIES: Amenity[] = [
  { icon: "🏊", label: "Hồ bơi vô cực" },
  { icon: "🏋️", label: "Phòng gym 24/7" },
  { icon: "🌿", label: "Vườn skyline" },
  { icon: "🚗", label: "Bãi đỗ xe thông minh" },
  { icon: "🔒", label: "An ninh 24/7" },
  { icon: "☕", label: "Lobby café" },
];

export const CONTACT = {
  phone: "+84 339 188 182",
  email: "info@bfd.vn",
  website: "https://bfd.vn",
  address: "TE8 - TT9 Xuan Phuong Ecological Urban Area, Xuan Phuong Ward, Ha Noi",
  workingHours: "T2 – CN: 8:00 – 20:00",
} as const;

export const TRANSITIONS = [
  { key: "FADE" as const, label: "Fade" },
  { key: "FLY" as const, label: "Fly" },
  { key: "INSTANT" as const, label: "Instant" },
];
