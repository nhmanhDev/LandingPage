# FEATURES

Bản đồ tính năng cho agent. Đường dẫn tính từ `LandingPageMaster/`. Cập nhật khi thêm/đổi route.

| Tính năng | Cách tới | File code chính | Cách tự kiểm |
| :--- | :--- | :--- | :--- |
| Trang thương hiệu AI42E | `/` (host `ai42e.com`) | `src/app/page.tsx`, `src/components/brand/`, `src/lib/brand/content.ts`, `src/lib/brand/tiles.ts` | `node scripts/ui-test/ui.mjs` (cổng 3100); footer có 5 kênh chính thức |
| Trang Trading | `/invest`; `invest.ai42e.com`; `mmo.ai42e.com/` rewrite về đây | `src/app/invest/page.tsx`, `src/components/trading/`, `src/lib/trading/content.ts` | `node scripts/ui-test/invest.mjs` (cổng 3101) |
| Chính sách quyền riêng tư và điều khoản | `/privacy`, `/terms` (mọi subdomain cũng hiện trang chính); link ở footer trang chủ | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/components/brand/LegalPage.tsx`, `src/lib/brand/legal.ts`, `src/middleware.ts` | `node scripts/ui-test/legal.mjs` (cổng 3102); `curl -H "Host: studio.ai42e.com" http://localhost:PORT/privacy` ra trang chính |
| Landing Studio | `/studio` | `src/app/studio/page.tsx` | mở trang, không lỗi console |
| Blog công khai | `/blog`, `/blog/[slug]` | `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/lib/services/blogService.ts` | cần Supabase |
| Trang theo subdomain | `<domain>.ai42e.com/`, `/blog/<slug>` (middleware rewrite sang `/<domain>/...`) | `src/app/[domain]/page.tsx`, `src/app/[domain]/blog/[slug]/page.tsx` | `curl -H "Host: mmo.ai42e.com" http://localhost:PORT/blog`; cần Supabase |
| Định tuyến theo host | mọi request (trừ `api`, `_next`, `favicon.ico`) | `src/middleware.ts` | `curl -H "Host: invest.ai42e.com" http://localhost:PORT/` ra trang Trading; `*.pages.dev` phục vụ theo đường dẫn |
| CMS blog | `/admin` (đăng nhập), `/admin/dashboard`, `/admin/blog/new` | `src/app/admin/`, `src/lib/supabase/client.ts` | cần Supabase |
| Đổi ngôn ngữ VI/EN, sáng/tối | nút trên navbar | `src/lib/brand/content.ts` (`vi`, `en`), `next-themes` | `ui.mjs` chạy cả VI/EN, sáng/tối |
| Kiểm thiết kế (font, cỡ chữ, màu) | chạy trong test | `scripts/ui-test/ui.mjs` mục `design (...)`; quy định ở `docs/BRAND-LANDING.md` | `ui.mjs` |
