# Trang thương hiệu `ai42e.com`

Trang `/` giới thiệu thương hiệu AI42E và các sản phẩm của hệ sinh thái. Không phải portfolio cá nhân (đã chuyển sang `portfolio.ai42e.com`) và không phải trang sản phẩm: mỗi sản phẩm có trang và hệ thiết kế riêng (VD AI42E Studio có landing riêng ở `studio.ai42e.com`).

## Thông điệp
AI42E là nền tảng giúp nhiều người tiếp cận AI dễ dàng, với nhiều sản phẩm trong cùng một hệ sinh thái. Nhiều thứ miễn phí để bắt đầu, dùng nâng cao thì mới trả phí. Slogan: AI FOR EVERYONE AND EVERYTHING.

## Cấu trúc trang
Thứ tự khối (v4, mỗi khối một bố cục khác nhau, học từ slite.com & baked.design): Hero (lồng trụ 3D 360° sticky `235svh` kiểu `baked.design`: đầu trang mở toàn cảnh trụ 3D xoay tròn kèm nút pill ở tâm, cuộn xuống các thẻ dạt tròn 360° để lộ thương hiệu AI42E + 3 trụ cột, cuộn lên khép lại) → Sáng tạo (dải 3 bước có tia tiến trình cuộn, thẻ Studio ngang, thẻ Downloader và Voice cao kèm micro-scene UI sống động) → Giải trí (tab chọn game tự chuyển có thanh tiến trình, khung điện thoại nghiêng 3D) → Tương lai (sơ đồ nút nối có mạch SVG chạy theo cuộn: OneForAll – hub – Trading) → Vì sao chọn AI42E (tab "Cách làm thông thường / Với AI42E", panel hội thoại) → Chi phí (ba thẻ `SpotlightCard`, thẻ giữa nổi bật) → Lời người làm và hỏi đáp → Liên hệ (khối kêu gọi trong lớp bọc bezel, kèm vòng quỹ đạo `RadarOrbit`, rồi chân trang kênh chính thức). Mọi khối đổi theo giao diện sáng/tối.

## Hệ thiết kế (nhỏ có chủ đích, học từ baked.design)
Mọi thứ nằm ở khối `.brand-landing` cuối `src/app/globals.css`. Đừng thêm ngoài danh sách này.

| Thành phần | Quy định |
| :--- | :--- |
| Font | **Hai font**: Fraunces cho tiêu đề `t-display`, `t-title`, `t-subtitle`; Inter cho mọi chữ còn lại. Cả hai nạp đủ bộ `latin`, `latin-ext`, `vietnamese`. Không chữ nghiêng. |
| Cỡ chữ | **Sáu bậc, không hơn**: 13px (`t-small`, nhãn `.eyebrow`), 15px (`t-body`), 18px (`t-heading`, `t-lead`), 28px (`t-subtitle`, giá), 48px (`t-title`, mobile 28px), 56px (`t-display`, mobile 48px). Hai font: tiêu đề `t-display`, `t-title`, `t-subtitle` dùng Fraunces; còn lại Inter. Độ đậm: 400, 600, 700. |
| Màu chữ | `--b-ink` (xám than `#2d2f34`, không đen tuyệt đối), `--b-muted` (xám 600), `--b-heading` (cùng màu chữ, tiêu đề không đổi màu). |
| Màu nền | **Ấm và trung tính**: nền kem `#fdf9f4`, thẻ sand `--b-lav` `#f8f1e7` có viền `--b-line`, mặt trắng `--b-surface` cho khung điện thoại và thẻ nổi. Tối: nền `#1b1916`, sand `#2e2823`. |
| Màu nhấn | **Một** màu cam `--b-brand` (`#c2410c` ở sáng, đạt AA trên nền kem, trắng và sand) cho nút chính, nhãn nhỏ và chữ liên kết. Ở tối: `#f47a4a` (đạt AA trên nền tối; nút chính tối dùng `#c2410c`). `--b-accent` (`#f67748`) chỉ cho viền và bóng, không đặt chữ trắng lên nó (chỉ đạt 2.7:1). Xanh lá chỉ cho kết quả tốt (`--b-pos-*`). Không thêm hue nào khác. |
| Hình khối | Nút viên thuốc (`.pill`, `-solid`, `-outline`, `-cta`). Thẻ sand bo 40px (`.sand-card`), panel bo 40px, khung điện thoại bo 40px, thẻ nổi bo 28px. |
| Chuyển động | Lồng trụ 3D 360° ở Hero học từ `baked.design` (~19 cột xoay 360° ngang + trôi dọc, nghiêng góc nhìn theo con trỏ, kéo chuột/trackpad xoay quán tính, nâng nổi thẻ +70px kèm nhãn `.wall-chip`, mở tròn 360° sticky `235svh` khi cuộn xuống và khép lại khi cuộn lên), thẻ nghiêng 3D và trượt hai chiều theo cuộn (`ScrollMotion.tsx`, `Reveal.tsx`, `SectionTitle.tsx`), micro-scene UI nhẹ thay cho video nặng (timeline Studio, sóng âm Voice, ripple Download), tab Game tự chuyển, mạch nhánh SVG ở Horizon, `SpotlightCard` và `Magnet`, vòng quỹ đạo `RadarOrbit`. **Không có nút điều khiển cho khách** (Mạnh quyết 2026-10-26); tự tắt khi người dùng bật giảm chuyển động. Chỉ dùng GPU transform/opacity/SVG pathLength, giữ nguyên tương phản chữ AA. **Không dùng WebGL**: một lớp WebGL (Grainient) từng phủ màu xám nhạt lên khối tối trên máy thật trong khi Chrome không GPU dùng để test vẽ khác đi, nên không kiểm chứng được bằng test tự động. |

Bài test `design (…)` trong `scripts/ui-test/ui.mjs` kiểm tự động: đúng hai font (Fraunces, Inter), mọi cỡ chữ nằm trong thang 6 cỡ, tối đa 3 độ đậm và 6 màu chữ.

## Giọng văn
Viết như một người thật nói chuyện với khách, không như khẩu hiệu ghép: xưng "bạn", dùng câu hoàn chỉnh thay vì các mệnh đề cụt ngăn bằng dấu chấm, dùng chữ đời thường ("Đa số dùng miễn phí, chỉ tính phí khi bạn cần nhiều hơn" chứ không phải "Miễn phí để bắt đầu. Trả phí khi bạn cần nhiều hơn."). Tránh chữ trừu tượng (hệ sinh thái, tính năng chuyên sâu, minh bạch). Không dịch word-for-word từ tiếng Anh. Thông tin phải thật: trạng thái, ngày, không ghi giá chưa chốt, Trading luôn kèm "Không phải lời khuyên đầu tư" ngay trong dòng mô tả. Mọi chữ nằm ở `content.ts`, viết cả hai ngôn ngữ cùng lúc.

## Thư viện bên thứ ba
`Magnet`, `OrbitImages`, `SpotlightCard` lấy từ [React Bits](https://reactbits.dev) (MIT + Commons Clause), để nguyên bản gốc ở `src/components/react-bits/` kèm giấy phép và ghi chú (`SpotlightCard` gắn ở bảng giá `FreemiumSection.tsx`, `Magnet` gắn ở các nút CTA chính). `BlurText` của React Bits **không dùng** vì nó nhân đôi câu chữ ẩn và tách mỗi từ một dòng khi sao chép; `SectionTitle.tsx` làm hiệu ứng tương tự với một câu thật.

## Mẫu thiết kế khối (v4)
- **Tiêu đề + một dòng phụ** ở mọi khối (`SectionHead`, nhận `align`). Không có nhãn nhỏ phía trên tiêu đề.
- **Sáu bố cục, chọn theo nội dung** (không lặp một khuôn):
  1. **Thẻ sand cao** (`.sand-card`): chữ bên trên, mockup bo ra ở đáy. Dùng cho Downloader, Voice Studio.
  2. **Thẻ sand ngang** (`.sand-card-wide`): chữ trái, mockup phải. Dùng cho AI42E Studio.
  3. **Dải nhiều cột có vạch chia**: icon tròn, số thứ tự, tiêu đề, một đoạn. Không có thẻ. Dùng cho dải 3 bước và các khối tương tự.
  4. **Tab + panel**: một cụm tab (`role="tablist"`), một panel đổi nội dung. Dùng cho trò chơi (khung điện thoại) và so sánh (panel `--b-lav`).
  5. **Sơ đồ nút nối**: một nút trung tâm, các nhánh đứt nét và mạch sáng chạy theo cuộn. Dùng cho Horizon. Trên điện thoại xếp dọc.
  6. **Lưới 3 thẻ kính**: thẻ nền trắng có vùng sáng theo con trỏ (`SpotlightCard`), bóng nhẹ. Dùng cho bảng giá. Thẻ nổi bật có viền cam.
- **Khối liên hệ** giữ nguyên bố cục cũ: lớp bọc bezel, khối kêu gọi có `RadarOrbit`, chân trang kênh chính thức.
- **Không số liệu giả.** Không ghi con số chưa có nguồn (ví dụ "độ tin cậy 94%", "phiên bản v2.4"). Biểu đồ trang trí phải ghi rõ là minh họa, hoặc không có chữ.
- Bezel (`Bezel.tsx`) dùng cho khối liên hệ và trang Trading.

## Nơi sửa
| Cần sửa | File |
| :--- | :--- |
| Mọi chữ, sản phẩm, trạng thái, link mạng xã hội (tiếng Việt và Anh) | `src/lib/brand/content.ts` |
| Lồng trụ 3D 360°: chọn ảnh, tính hình học trụ `buildCylinderLayout` | `src/lib/brand/tiles.ts`, ảnh ở `public/brand/tiles/` |
| Hiệu ứng lồng trụ 3D (xoay 360°, con trỏ, kéo quán tính, mở tròn sticky theo cuộn) | `src/components/brand/Wall.tsx`, `BrandHero.tsx`, CSS `.wall*` |
| Chuyển động cuộn hai chiều dùng chung | `src/components/brand/ScrollMotion.tsx`, `Reveal.tsx`, `SectionTitle.tsx` |
| Micro-scene sản phẩm trên thẻ | `src/components/brand/ProductVisual.tsx`, CSS `.bar`, `.ripple`, `.studio-playhead` |
| Khối kêu gọi, footer | `ClosingSection.tsx`, `RadarOrbit.tsx`, `BrandFooter.tsx` |
| Tab so sánh | `CompareSection.tsx` |
| Dải 3 bước, thẻ sản phẩm | `ProductsSection.tsx` |
| Tab trò chơi, khung điện thoại | `EcosystemPlaySection.tsx` |
| Sơ đồ Tương lai (OneForAll, Trading) | `EcosystemHorizonSection.tsx` |
| Lời người làm, hỏi đáp | `FounderFaqSection.tsx` |
| Nhãn + tiêu đề mọi khối | `SectionHead.tsx`, `SectionTitle.tsx` |
| Bố cục từng mục | `src/components/brand/*Section.tsx`, `BrandHero.tsx`, `BrandNavbar.tsx` |

Thêm hoặc đổi trạng thái sản phẩm: sửa `products.items` ở cả `vi` và `en`. Chỉ đặt `href` khi sản phẩm đã chạy thật; test `links:` kiểm đúng 4 sản phẩm đang chạy có link (Studio, Game, Voice Studio, DownloadAnything).

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
