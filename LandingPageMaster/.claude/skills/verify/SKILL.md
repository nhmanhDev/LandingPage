---
name: verify
description: Tự chạy app LandingPage thật (build, start, Playwright + axe) và kiểm việc vừa làm trên trang chủ, trang Trading, định tuyến theo host.
---

Chạy từ `LandingPageMaster/`.

1. Lint và build: `npm run lint && npm run build`
2. Cài công cụ test (không ghi vào package.json): `npm i --no-save playwright-core axe-core`. Script dùng Chrome thật (`channel: "chrome"`); thiếu Chrome thì `npx playwright install chrome`.
3. Trang chủ: `npx next start -p 3100 &` rồi `node scripts/ui-test/ui.mjs` (tự ánh xạ `ai42e.com` về 127.0.0.1:3100; kiểm khổ 360/390/768/1440, sáng/tối, VI/EN, axe, font/cỡ chữ). Ảnh chụp ở thư mục tạm (`SHOTS_DIR` để đổi).
4. Trading: `npx next start -p 3101 &` rồi `node scripts/ui-test/invest.mjs` (`BASE` để đổi địa chỉ).
5. Định tuyến theo host (với server đang chạy): `curl -s -H "Host: invest.ai42e.com" localhost:3101/ | grep -i trading`; `Host: mmo.ai42e.com` ở `/` ra cùng trang Trading. Các route cần Supabase (`/blog`, `/admin`, `[domain]`) chỉ kiểm được khi có `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
6. Dọn: tắt các `next start` đã mở. Kiểm chuẩn: `node scripts/check-standard.mjs .`

Ghi kết quả PASS/FAIL của từng bước. Đổi chữ hay thiết kế thì đối chiếu `docs/BRAND-LANDING.md` và `docs/COPYWRITING-SPEC.md`.
