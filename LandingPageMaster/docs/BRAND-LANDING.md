# Trang thương hiệu `ai42e.com`

Trang `/` giới thiệu thương hiệu AI42E và các sản phẩm của hệ sinh thái. Không phải portfolio cá nhân (đã chuyển sang `portfolio.ai42e.com`) và không phải trang sản phẩm: mỗi sản phẩm có trang riêng.

## Thông điệp
AI42E là nền tảng giúp nhiều người tiếp cận AI dễ dàng, với nhiều sản phẩm trong cùng một hệ sinh thái. Nhiều thứ miễn phí để bắt đầu, dùng nâng cao thì mới trả phí. Slogan: AI FOR EVERYONE AND EVERYTHING.

## Cấu trúc trang
Hero (tiêu đề, hai nút, dải hạt) → Sản phẩm (6 thẻ) → Freemium (3 ý) → Hỏi đáp → Liên hệ chính thức → Footer. Thanh menu dính, không viền, có nút đổi ngôn ngữ và sáng/tối.

## Nơi sửa
| Cần sửa | File |
| :--- | :--- |
| Mọi chữ, sản phẩm, trạng thái, link mạng xã hội (tiếng Việt và Anh) | `src/lib/brand/content.ts` |
| Màu và token (`--b-*`, tách riêng cho sáng/tối) | cuối `src/app/globals.css`, class `.brand-landing` |
| Hiệu ứng dải hạt | `src/components/brand/Ribbon.tsx` |
| Bố cục từng mục | `src/components/brand/*Section.tsx`, `BrandHero.tsx`, `BrandNavbar.tsx` |

Thêm hoặc đổi trạng thái sản phẩm: sửa mảng `products.items` ở cả `vi` và `en`. Chỉ đặt `href` khi sản phẩm đã chạy thật; không có `href` thì thẻ hiện không bấm được.

## Quy tắc thiết kế (đừng phá)
- Chỉ **một** hiệu ứng nổi bật (dải hạt ở hero). Phần còn lại chỉ hiện dần khi cuộn.
- Không three.js/WebGL. Dải hạt dừng khi ngoài màn hình, khi tab ẩn, và vẽ một khung tĩnh khi người dùng bật giảm chuyển động.
- Chỉ ghi thông tin thật: không logo khách, lời chứng thực, số liệu mẫu. Trading ghi rõ "đang nghiên cứu, không phải lời khuyên đầu tư".
- Không ghi giá cụ thể khi chưa chốt; chỉ nguyên tắc "miễn phí để bắt đầu, nâng cao thì trả phí".
- Màu chữ phải đạt WCAG AA ở cả hai theme (test axe trong `scripts/ui-test`).

## Chạy và kiểm thử
```
npm ci
npm run build && npx next start -p 3100
npm i --no-save playwright-core axe-core
node scripts/ui-test/ui.mjs
```
Bộ test (Chrome thật qua Playwright) kiểm: không lỗi console, không tràn ngang ở 360/390/768/1440px, vùng chạm ≥ 40px, anchor, đổi theme và ngôn ngữ (có lưu), dải hạt chạy / đứng yên khi giảm chuyển động, bàn phím và vòng focus, axe WCAG AA (sáng và tối), nội dung vẫn hiện khi tắt JavaScript, LCP.
`middleware.ts` chỉ coi `ai42e.com` và `localhost:3000` là domain chính, nên test ánh xạ `ai42e.com` về cổng chạy.
