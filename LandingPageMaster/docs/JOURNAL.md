# JOURNAL

Chỉ ghi việc dở, tối đa 40 dòng. Xong việc thì xoá mục. Mẫu: `### YYYY-MM-DD — [tool] — tiêu đề`.

### 2026-11-07 — [claude] — Chuẩn hoá chỉ dẫn agent
- Còn thiếu: Dockerfile/compose, `tests/`, `.env.example`, robots/sitemap (checker báo FAIL). Quyết định có làm hay không (app chạy trên Cloudflare Pages, không Docker) để PR sau.
- `scripts/ui-test/*.mjs` dùng `channel: "chrome"`; môi trường không có Chrome cần `npx playwright install chrome` hoặc đổi sang chromium.
