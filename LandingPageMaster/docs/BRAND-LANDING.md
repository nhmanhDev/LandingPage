# Trang thương hiệu `ai42e.com`

Trang `/` giới thiệu thương hiệu AI42E và các sản phẩm của hệ sinh thái. Không phải portfolio cá nhân (đã chuyển sang `portfolio.ai42e.com`) và không phải trang sản phẩm: mỗi sản phẩm có trang và hệ thiết kế riêng (VD AI42E Studio có landing riêng ở `studio.ai42e.com`).

## Thông điệp
AI42E là nền tảng giúp nhiều người tiếp cận AI dễ dàng, với nhiều sản phẩm trong cùng một hệ sinh thái. Nhiều thứ miễn phí để bắt đầu, dùng nâng cao thì mới trả phí. Slogan: AI FOR EVERYONE AND EVERYTHING.

## Cấu trúc trang
Hero (bức tường ảnh sản phẩm nghiêng 3D, thẻ tiêu đề ở giữa) → Sản phẩm (6 thẻ) → Freemium (3 ý) → Hỏi đáp → Liên hệ chính thức → Footer. Thanh menu là các nút viên thuốc nổi trên bức tường, có đổi ngôn ngữ và sáng/tối.

## Hệ thiết kế (nhỏ có chủ đích, học từ baked.design)
Mọi thứ nằm ở khối `.brand-landing` cuối `src/app/globals.css`. Đừng thêm ngoài danh sách này.

| Thành phần | Quy định |
| :--- | :--- |
| Font | **Chỉ Inter** (nạp đủ `latin`, `latin-ext`, `vietnamese`). Không font thứ hai, không chữ nghiêng. |
| Cỡ chữ | **5 cỡ**: `t-display` 36–56px, `t-title` 28–36px, `t-heading` 18px, `t-body` 15px, `t-small` 13px. Độ đậm chỉ 400 và 500. |
| Màu chữ | `--b-ink` và `--b-muted` (ink 66%). Chữ trên nền ink dùng màu nền trang. Không màu nhấn trong giao diện. |
| Màu nền | Sáng: nền `#f2f2f0`, mặt `#fff`, chip `#e8e8e5`. Tối: nền `#111`, mặt `#1b1b1a`, chip `#262624`. |
| Hình khối | Nút luôn là viên thuốc cao 40px (`.pill`, biến thể `-solid`, `-surface`, `-glass`). Mặt phẳng bo 22–28px. |
| Màu sắc | Đến từ **tư liệu sản phẩm** (minh họa game, ảnh chụp sản phẩm), không đến từ giao diện. Ngoại lệ duy nhất: chấm trạng thái nhỏ (xanh = đang chạy, vàng = bảo trì). |
| Chuyển động | Bức tường: con trỏ làm nghiêng nhẹ, các cột tự trôi bằng CSS. Có nút "Tạm dừng chuyển động"; tự tắt khi người dùng bật giảm chuyển động và khi cuộn khỏi màn hình. Phần còn lại chỉ hiện dần khi cuộn. |

Bài test `design (…)` trong `scripts/ui-test/ui.mjs` kiểm tự động: đúng một font, mọi cỡ chữ nằm trong thang 5 cỡ, tối đa 2 độ đậm.

## Nơi sửa
| Cần sửa | File |
| :--- | :--- |
| Mọi chữ, sản phẩm, trạng thái, link mạng xã hội (tiếng Việt và Anh) | `src/lib/brand/content.ts` |
| Bức tường: chọn ảnh, cột, độ nghiêng | `src/lib/brand/tiles.ts`, ảnh ở `public/brand/tiles/` |
| Hiệu ứng bức tường (con trỏ, dừng) | `src/components/brand/Wall.tsx`, CSS `.wall*` |
| Bố cục từng mục | `src/components/brand/*Section.tsx`, `BrandHero.tsx`, `BrandNavbar.tsx` |

Thêm hoặc đổi trạng thái sản phẩm: sửa `products.items` ở cả `vi` và `en`. Chỉ đặt `href` khi sản phẩm đã chạy thật (test `links:` kiểm DownloadAnything không có link khi domain còn 404).

## Ảnh bức tường
Ảnh webp rộng ≤ 520px, tổng khoảng 450KB, tải lười. Nguồn: bìa 13 game lấy từ `public/illustrations/` của repo `flash-play-games` (tư liệu của AI42E Game), và ảnh chụp màn hình `play.ai42e.com`, `studio.ai42e.com` cắt bằng sharp rồi nén. Muốn đổi ảnh: nén tương tự, thêm khóa vào `ImageKey`/`IMAGE_SIZE` trong `tiles.ts`. Chỉ dùng tư liệu thật của sản phẩm AI42E.

## Quy tắc nội dung
- Chỉ ghi thông tin thật: không logo khách, lời chứng thực, số liệu mẫu. Trading ghi "đang nghiên cứu, không phải lời khuyên đầu tư".
- Không ghi giá cụ thể khi chưa chốt; chỉ nguyên tắc "miễn phí để bắt đầu, nâng cao thì trả phí".
- Màu chữ phải đạt WCAG AA ở cả hai theme (test axe).

## Chạy và kiểm thử
```
npm ci
npm run build && npx next start -p 3100
npm i --no-save playwright-core axe-core
node scripts/ui-test/ui.mjs
```
Bộ test (Chrome thật qua Playwright) kiểm: không lỗi console, không tràn ngang ở 360/390/768/1440px, vùng chạm ≥ 40px, anchor, đổi theme và ngôn ngữ (có lưu), bức tường (con trỏ, nút dừng, giảm chuyển động), hệ thiết kế (font, cỡ chữ, độ đậm), link sản phẩm, bàn phím và vòng focus, axe WCAG AA (sáng và tối), nội dung vẫn hiện khi tắt JavaScript, LCP.
`middleware.ts` chỉ coi `ai42e.com` và `localhost:3000` là domain chính, nên test ánh xạ `ai42e.com` về cổng chạy.
