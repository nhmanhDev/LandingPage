# Trang thương hiệu `ai42e.com`

Trang `/` giới thiệu thương hiệu AI42E và các sản phẩm của hệ sinh thái. Không phải portfolio cá nhân (đã chuyển sang `portfolio.ai42e.com`) và không phải trang sản phẩm: mỗi sản phẩm có trang và hệ thiết kế riêng (VD AI42E Studio có landing riêng ở `studio.ai42e.com`).

## Thông điệp
AI42E là nền tảng giúp nhiều người tiếp cận AI dễ dàng, với nhiều sản phẩm trong cùng một hệ sinh thái. Nhiều thứ miễn phí để bắt đầu, dùng nâng cao thì mới trả phí. Slogan: AI FOR EVERYONE AND EVERYTHING.

## Cấu trúc trang
Hero (nằm dưới header; bức tường ảnh sản phẩm nghiêng 3D, thẻ tiêu đề ở giữa) → Sản phẩm (6 thẻ dạng bento, mỗi thẻ một vùng sáng riêng) → Chi phí (khối tối, nền gradient CSS) → Câu hỏi thường gặp → Khối kêu gọi tối (vòng quỹ đạo sản phẩm quanh logo) → Footer (thẻ có cột liên kết, kênh chính thức, chữ AI42E khổng lồ mờ). Header học từ adkit.so: thanh cố định có viền dưới, logo chữ đậm bên trái, menu giữa ("Sản phẩm" xổ xuống liệt kê 6 sản phẩm kèm mô tả và trạng thái), bên phải đổi ngôn ngữ, sáng/tối và một nút cam; ngay dưới là dải "Sản phẩm:" để vào thẳng từng sản phẩm. Điện thoại có nút menu.

## Hệ thiết kế (nhỏ có chủ đích, học từ baked.design)
Mọi thứ nằm ở khối `.brand-landing` cuối `src/app/globals.css`. Đừng thêm ngoài danh sách này.

| Thành phần | Quy định |
| :--- | :--- |
| Font | **Chỉ Inter** (nạp đủ `latin`, `latin-ext`, `vietnamese`). Không font thứ hai, không chữ nghiêng. |
| Cỡ chữ | **5 cỡ**: `t-display` 36–56px, `t-title` 28–36px, `t-heading` 18px, `t-body` 15px, `t-small` 13px. Độ đậm chỉ 400 và 500. |
| Màu chữ | `--b-ink` (chàm đậm `#17123a`), `--b-muted` (ink 68%), `--b-brand` (tím `#5a3df0`, chỉ để nhấn: dòng tiêu đề thứ hai, link trên thẻ). Chữ trên nền ink dùng màu nền trang. |
| Màu nền | Một họ tím lavender. Sáng: nền `#f7f5ff`, mặt `#fff`, chip `#ece8ff`. Tối: nền `#0d0b1f`, mặt `#16132e`, chip `#221e44`. |
| Màu nhấn | **Một** màu cam `#ff7a45`, chỉ cho nút chính (`.pill-accent`, chữ chàm đậm để đạt AA). Không dùng cam cho thứ khác. |
| Hình khối | Nút luôn là viên thuốc cao 40px (`.pill`, biến thể `-solid`, `-surface`, `-glass`). Mặt phẳng bo 22–28px. |
| Màu sắc khác | Tư liệu sản phẩm (minh họa game, ảnh chụp) và các **vùng sáng** (`.aurora`, `au-*`) **cùng một họ tím–xanh dương**: các sản phẩm khác nhau bằng hình minh họa, không bằng màu. Chấm trạng thái nhỏ (xanh = đang chạy, vàng = bảo trì). Không dùng thêm hue nào khác. |
| Chuyển động | Một nút "Tạm dừng chuyển động" ở hero dừng **mọi** chuyển động (bức tường, vùng sáng, ánh lấp lánh, quỹ đạo). Tự tắt khi người dùng bật giảm chuyển động. Chuyển động chỉ dùng transform/opacity. **Không dùng WebGL**: một lớp WebGL (Grainient) từng phủ màu xám nhạt lên khối tối trên máy thật, trong khi Chrome không GPU dùng để test vẽ ra khác, nên không thể kiểm chứng bằng test tự động. |

Bài test `design (…)` trong `scripts/ui-test/ui.mjs` kiểm tự động: đúng một font, mọi cỡ chữ nằm trong thang 5 cỡ, tối đa 2 độ đậm.

## Giọng văn
Viết như một người thật nói chuyện với khách, không như khẩu hiệu ghép: xưng "bạn", dùng câu hoàn chỉnh thay vì các mệnh đề cụt ngăn bằng dấu chấm, dùng chữ đời thường ("Đa số dùng miễn phí, chỉ tính phí khi bạn cần nhiều hơn" chứ không phải "Miễn phí để bắt đầu. Trả phí khi bạn cần nhiều hơn."). Tránh chữ trừu tượng (hệ sinh thái, tính năng chuyên sâu, minh bạch). Không dịch word-for-word từ tiếng Anh. Thông tin phải thật: trạng thái, ngày, không ghi giá chưa chốt, Trading luôn kèm "Không phải lời khuyên đầu tư" ngay trong dòng mô tả. Mọi chữ nằm ở `content.ts`, viết cả hai ngôn ngữ cùng lúc.

## Thư viện bên thứ ba
`Magnet`, `OrbitImages`, `SpotlightCard` lấy từ [React Bits](https://reactbits.dev) (MIT + Commons Clause), để nguyên bản gốc ở `src/components/react-bits/` kèm giấy phép và ghi chú. `BlurText` của React Bits **không dùng** vì nó nhân đôi câu chữ ẩn và tách mỗi từ một dòng khi sao chép; `SectionTitle.tsx` làm hiệu ứng tương tự với một câu thật.

## Nơi sửa
| Cần sửa | File |
| :--- | :--- |
| Mọi chữ, sản phẩm, trạng thái, link mạng xã hội (tiếng Việt và Anh) | `src/lib/brand/content.ts` |
| Bức tường: chọn ảnh, cột, độ nghiêng | `src/lib/brand/tiles.ts`, ảnh ở `public/brand/tiles/` |
| Hiệu ứng bức tường (con trỏ, dừng) | `src/components/brand/Wall.tsx`, CSS `.wall*` |
| Vùng sáng từng sản phẩm, hình minh họa trên thẻ | `src/components/brand/ProductVisual.tsx`, CSS `.aurora`, `.au-*` |
| Khối kêu gọi, footer | `ClosingSection.tsx`, `BrandFooter.tsx` |
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
Bộ test (Chrome thật qua Playwright) kiểm: không lỗi console, không tràn ngang ở 360/390/768/1440px, vùng chạm ≥ 40px, anchor, đổi theme và ngôn ngữ (có lưu), bức tường (con trỏ, nút dừng, giảm chuyển động), hệ thiết kế (font, cỡ chữ, độ đậm), câu chữ (không rò placeholder, tiêu đề sao chép thành một câu), link sản phẩm, kênh chính thức ở footer, bàn phím và vòng focus, axe WCAG AA (sáng và tối), nội dung vẫn hiện khi tắt JavaScript, LCP.
`middleware.ts` chỉ coi `ai42e.com` và `localhost:3000` là domain chính, nên test ánh xạ `ai42e.com` về cổng chạy.
