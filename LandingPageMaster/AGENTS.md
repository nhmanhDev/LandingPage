# AGENTS.md

## App là gì
Trang thương hiệu AI42E (`ai42e.com`) và trang Trading (`invest.ai42e.com`, `mmo.ai42e.com`). Một app Next.js 16 (App Router, React 19, Tailwind 4) trong thư mục `LandingPageMaster/`, triển khai trên Cloudflare Pages (project `landingpagemaster`). Gốc app là `LandingPageMaster/`: mọi lệnh bên dưới chạy từ đây. Chưa gán cổng riêng: dev dùng `next dev` mặc định, test UI dùng cổng 3100 (trang chủ) và 3101 (Trading).

## Lệnh
- Dev: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- Test UI (Playwright + axe, cần build trước): xem skill `.claude/skills/verify/SKILL.md`
- Kiểm chuẩn repo: `node scripts/check-standard.mjs .`
- Chưa có unit test.

## Luật riêng của repo
- Đây KHÔNG phải Next.js bạn biết: đọc guide trong `node_modules/next/dist/docs/` trước khi viết code, chú ý cảnh báo deprecate (khối Next.js bên dưới).
- Routing theo host nằm ở `src/middleware.ts`: `ai42e.com`, localhost và `*.pages.dev` đi thẳng (preview phục vụ theo đường dẫn `/invest`, `/studio`); `mmo.<domain>` ở `/` rewrite sang `/invest`; subdomain khác rewrite sang `/<subdomain><path>` (route `src/app/[domain]`). Đổi middleware phải thử lại cả ba nhóm host.
- Mọi chữ hiển thị nằm ở `src/lib/brand/content.ts` (trang chủ) và `src/lib/trading/content.ts` (Trading), viết cả `vi` lẫn `en` cùng lúc. Không để chữ cứng trong component.
- Hệ thiết kế và câu chữ chuẩn: `docs/BRAND-LANDING.md`, `docs/COPYWRITING-SPEC.md`. Hai font (Fraunces, Inter), sáu cỡ chữ, một màu cam nhấn; bài test `design (...)` trong `scripts/ui-test/ui.mjs` bắt lệch. Không dùng WebGL. Không thêm nút điều khiển chuyển động cho khách.
- Thông tin trên trang phải thật: không số liệu, trạng thái hay lời hứa chưa kiểm chứng; Trading luôn kèm "Không phải lời khuyên đầu tư".
- Thành phần React Bits ở `src/components/react-bits/` giữ nguyên bản gốc kèm giấy phép; không dùng `BlurText`.
- `mmo` (route `[domain]`, `/blog`, `/admin`) cần `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY`; thiếu thì client dùng giá trị giả và không đọc được dữ liệu. Không commit khoá.
- Đừng Reactivate project Cloudflare Pages `studio` (đang Inactive có chủ ý); `/studio` là trang trong app này.

## Git
Nhánh làm việc tách từ `dev`, PR vào `dev`. Không commit thẳng `main` hay `dev`. Mạnh tự merge.

## Docs
- Đổi code (sửa lỗi, thêm/đổi tính năng) thì thêm một mục vào ĐẦU `docs/CHANGELOG.md`, bảng "Lỗi | Nguyên nhân | Giải pháp", ghi nguyên nhân gốc.
- `docs/JOURNAL.md` chỉ chứa việc dở, tối đa 40 dòng; xong việc thì xoá mục.
- Bản đồ tính năng: `docs/FEATURES.md`. Cách tự chạy và kiểm: skill `.claude/skills/verify/SKILL.md`.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
