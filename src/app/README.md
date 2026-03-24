# BFD Virtual Tour — Next.js

Landing page bán hàng tích hợp Matterport 3D Tour.

## Cài đặt & chạy

```bash
npm install
npm run dev
# Mở http://localhost:3000
```

## Cấu trúc project

```
src/
├── app/
│   ├── layout.js         # Root layout, load fonts & Matterport SDK
│   ├── page.js           # Trang chính
│   └── globals.css       # CSS variables & reset
├── components/
│   ├── Navbar.jsx        # Navigation bar cố định
│   ├── Hero.jsx          # Section đầu — stats, CTA
│   ├── TourSection.jsx   # Tour 3D + chọn căn hộ
│   ├── AmenitiesSection.jsx  # Tiện ích
│   ├── ContactSection.jsx    # Form liên hệ
│   └── Footer.jsx
├── hooks/
│   └── useMatterport.js  # Hook quản lý SDK
└── data/
    └── project.js        # ← CHỈNH SỬA FILE NÀY
```

## Chỉnh sửa nội dung

Tất cả nội dung được quản lý tập trung tại **`src/data/project.js`**:

### 1. Thông tin dự án
```js
export const PROJECT = {
  name: 'The Grand Residence',
  location: 'Hà Đông, Hà Nội',
  // ...
};
```

### 2. Matterport config
```js
export const MATTERPORT = {
  modelId: 'YtVzqVgSyFT',   // Model ID của bạn
  sdkKey: 'YOUR_SDK_KEY',    // SDK Key từ developers.matterport.com
};
```

### 3. Lấy Sweep ID cho từng phòng
1. Chạy `npm run dev`
2. Mở http://localhost:3000
3. Mở DevTools → Console
4. Chờ log `[All Sweeps] [...]` xuất hiện
5. Copy từng ID vào `UNITS[].sweepId` trong `project.js`

### 4. Form liên hệ
Tích hợp API gửi form trong `ContactSection.jsx`:
```js
const handleSubmit = async (e) => {
  e.preventDefault();
  // Gọi API gửi email / CRM / Zalo OA tại đây
  await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) });
  setSent(true);
};
```

## Build production

```bash
npm run build
npm start
```
