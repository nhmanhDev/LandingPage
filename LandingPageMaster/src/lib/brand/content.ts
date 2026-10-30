import type { ImageKey } from "./tiles";

export type Locale = "vi" | "en";

export type ProductStatus = "free" | "freemium" | "soon" | "research" | "maintenance";

export type ProductIcon =
  | "studio"
  | "voice"
  | "download"
  | "game"
  | "oneforall"
  | "trading";

export interface Product {
  id: string;
  icon: ProductIcon;
  name: string;
  tagline: string;
  bullets: string[];
  status: ProductStatus;
  thumb?: "studio-hero" | "play-family";
  href?: string;
  cta?: string;
}

export interface Content {
  meta: { title: string; description: string };
  nav: {
    products: string;
    creative?: string;
    play?: string;
    horizon?: string;
    compare: string;
    pricing: string;
    story: string;
    faq: string;
    contact: string;
    open: string;
    menu: string;
    megaCreative: string;
    megaOther: string;
    megaFooter: string;
    megaCta: string;
    mobileGroup: string;
    mobileCreative: string;
    mobilePlay: string;
    mobileHorizon: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    sub: string;
    ctaPrimary: string;
    note: string;
    pillars: {
      creative: { title: string; tagline: string };
      play: { title: string; tagline: string };
      horizon: { title: string; tagline: string };
    };
    explore: string;
  };
  products: {
    eyebrow: string;
    title: string;
    sub: string;
    steps: { title: string; text: string }[];
    status: Record<ProductStatus, string>;
    items: Product[];
  };
  play: {
    eyebrow: string;
    title: string;
    sub: string;
    tabs: { name: string; text: string; image: ImageKey }[];
    points: string[];
    cta: string;
  };
  horizon: {
    eyebrow: string;
    title: string;
    sub: string;
    hub: string;
    footnote: string;
  };
  compare: {
    eyebrow: string;
    title: string;
    tone?: string;
    sub: string;
    questions: { without: string; with: string };
    withoutTitle: string;
    withTitle: string;
    without: string[];
    with: string[];
    result: string;
  };
  freemium: {
    eyebrow: string;
    title: string;
    sub: string;
    tiers: {
      tag: string;
      ribbon?: string;
      title: string;
      text: string;
      price: string;
      priceNote?: string;
      featuresTitle: string;
      features: string[];
      cta: string;
      href: string;
    }[];
  };
  founder: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    signature: string;
    role: string;
    contact: string;
  };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  contact: { title: string; sub: string };
  closing: {
    title: string;
    sub: string;
    cta: string;
    orbit: Record<string, { name: string; tagline: string }>;
  };
  footer: {
    slogan: string;
    portfolio: string;
    rights: string;
    about: string;
    colProducts: string;
    colContact: string;
    allTools: string;
    newsTitle: string;
    newsText: string;
    emailPlaceholder: string;
    subscribed: string;
    subscribeLabel: string;
    mailSubject: string;
    mailBody: string;
  };
  wall: { free: string; brand: string; tools: string };
  ui: {
    theme: string;
    language: string;
    skip: string;
    toTop: string;
  };
}

export const SOCIALS = [
  { id: "youtube", name: "YouTube", handle: "@nhmanhAI42E", href: "https://www.youtube.com/@nhmanhAI42E" },
  { id: "facebook", name: "Facebook", handle: "nhmanhAI4E", href: "https://www.facebook.com/nhmanhAI4E/" },
  { id: "telegram", name: "Telegram", handle: "@AI42E", href: "https://t.me/AI42E" },
  { id: "github", name: "GitHub", handle: "nhmanhDev", href: "https://github.com/nhmanhDev" },
  { id: "email", name: "Email", handle: "nhmanh.dev@gmail.com", href: "mailto:nhmanh.dev@gmail.com" },
] as const;

export const PORTFOLIO_URL = "https://portfolio.ai42e.com";

const vi: Content = {
  meta: {
    title: "AI42E | Công cụ AI dễ dùng cho mọi người",
    description:
      "Hệ sinh thái công cụ AI thực tế phục vụ sáng tạo nội dung, tiện ích công việc và giải trí hằng ngày. Thiết kế trực quan để ai cũng dùng được ngay — không cần kiến thức kỹ thuật.",
  },
  nav: {
    products: "Hệ sinh thái",
    creative: "Sáng tạo",
    play: "Giải trí",
    horizon: "Lộ trình",
    compare: "Vì sao chọn AI42E",
    pricing: "Chi phí",
    story: "Về AI42E",
    faq: "Hỏi đáp",
    contact: "Liên hệ",
    open: "Mở",
    menu: "Mở menu",
    megaCreative: "Trục Sáng tạo (3 công cụ sản xuất)",
    megaOther: "Trục Mở rộng & Giải trí (3 ứng dụng)",
    megaFooter: "6 sản phẩm trong hệ sinh thái · Web & Desktop",
    megaCta: "Xem quy trình kết hợp bộ 3 sáng tạo →",
    mobileGroup: "Hệ sinh thái sản phẩm",
    mobileCreative: "Trục Sáng tạo (Studio, Voice, Downloader)",
    mobilePlay: "AI42E Game (11 trò chơi)",
    mobileHorizon: "Nghiên cứu & Mở rộng (OneForAll & Trading)",
    cta: "Trải nghiệm ngay",
  },
  hero: {
    eyebrow: "AI for Everyone and Everything",
    titleLine1: "AI for Everyone",
    titleLine2: "and Everything",
    sub: "Hệ sinh thái công cụ AI thực tế phục vụ sáng tạo nội dung, tiện ích công việc và giải trí hằng ngày. Thiết kế trực quan để ai cũng dùng được ngay — không cần kiến thức kỹ thuật.",
    ctaPrimary: "Khám phá hệ sinh thái",
    note: "Bắt đầu miễn phí hoàn toàn · Không yêu cầu thẻ tín dụng",
    pillars: {
      creative: { title: "Sáng tạo Nội dung AI", tagline: "Studio · Voice Studio · DownloadAnything" },
      play: { title: "Giải trí & Gắn kết", tagline: "11 minigame tương tác cho bạn bè & gia đình" },
      horizon: { title: "Nghiên cứu & Mở rộng", tagline: "OneForAll · AI42E Trading System" },
    },
    explore: "Khám phá →",
  },
  products: {
    eyebrow: "Bộ công cụ sáng tạo",
    title: "Từ tư liệu gốc đến video hoàn chỉnh",
    sub: "Quy trình sản xuất nội dung khép kín chỉ với 3 bước: thu thập tư liệu gốc, tạo giọng đọc thuyết minh tự nhiên và tự động dựng thành video hoàn chỉnh.",
    steps: [
      {
        title: "01 · Thu thập tư liệu",
        text: "Tải nhanh video, âm thanh gốc chất lượng cao từ hơn 20 nền tảng với DownloadAnything.",
      },
      {
        title: "02 · Tạo giọng thuyết minh",
        text: "Chuyển kịch bản thành giọng đọc truyền cảm hoặc nhân bản giọng nói riêng qua Voice Studio.",
      },
      {
        title: "03 · Dựng & Xuất bản video",
        text: "Tự động ghép cảnh, tạo phụ đề và xuất video MP4 sắc nét trong AI42E Studio.",
      },
    ],
    status: {
      free: "Miễn phí",
      freemium: "Trải nghiệm sớm miễn phí",
      soon: "Sắp ra mắt",
      research: "Đang nghiên cứu",
      maintenance: "Bảo trì",
    },
    items: [
      {
        id: "studio",
        icon: "studio",
        name: "AI42E Studio",
        tagline: "Tạo video tự động bằng AI — từ ý tưởng, kịch bản đến file MP4 hoàn chỉnh.",
        bullets: [
          "Chuyển kịch bản văn bản thành video MP4 hoàn chỉnh",
          "Tự động tạo hình ảnh minh họa và phụ đề khớp nhịp",
          "Tích hợp giọng đọc AI tự nhiên, không cần phần mềm dựng phim rời",
        ],
        status: "freemium",
        thumb: "studio-hero",
        href: "https://studio.ai42e.com",
        cta: "Khám phá AI42E Studio",
      },
      {
        id: "download",
        icon: "download",
        name: "DownloadAnything",
        tagline: "Tải nhanh video & âm thanh chất lượng cao từ YouTube, TikTok, Douyin và 20+ nền tảng.",
        bullets: [
          "Tải video và âm thanh gốc không dính logo (watermark)",
          "Hỗ trợ hơn 20 nền tảng video và mạng xã hội phổ biến",
          "Trích xuất âm thanh MP3 chất lượng cao chỉ với một click",
        ],
        status: "free",
        href: "https://downloader.ai42e.com",
        cta: "Mở DownloadAnything",
      },
      {
        id: "voice",
        icon: "voice",
        name: "Voice Studio",
        tagline: "Chuyển văn bản thành giọng đọc tự nhiên, dịch đa ngôn ngữ và nhân bản giọng nói.",
        bullets: [
          "Chuyển văn bản thành giọng đọc tự nhiên, chuẩn cảm xúc",
          "Nhân bản giọng nói AI (Voice Cloning) chân thực",
          "Hỗ trợ dịch thuật và lồng tiếng đa ngôn ngữ",
        ],
        status: "free",
        href: "https://voice.ai42e.com",
        cta: "Khám phá Voice Studio",
      },
      {
        id: "game",
        icon: "game",
        name: "AI42E Game",
        tagline: "11 trò chơi tương tác cho nhóm bạn và gia đình — chơi ngay trên trình duyệt, không cần tải app.",
        bullets: [
          "Chơi trực tiếp trên trình duyệt, không cần cài đặt ứng dụng",
          "11 trò chơi tương tác cho nhóm bạn và gia đình",
          "Tối ưu mượt mà cho màn hình điện thoại di động",
        ],
        status: "free",
        thumb: "play-family",
        href: "https://play.ai42e.com",
        cta: "Mở cổng game play.ai42e.com ↗",
      },
      {
        id: "oneforall",
        icon: "oneforall",
        name: "OneForAll",
        tagline: "Không gian tiện ích AI tất-cả-trong-một: tóm tắt, dịch thuật và xử lý tài liệu tức thì.",
        bullets: [
          "Tóm tắt tài liệu và phân tích văn bản tức thì bằng AI",
          "Hỗ trợ dịch thuật đa ngôn ngữ và xử lý dữ liệu thông minh",
          "Không gian tiện ích AI tất-cả-trong-một cho công việc hằng ngày",
        ],
        status: "soon",
      },
      {
        id: "trading",
        icon: "trading",
        name: "AI42E Trading System",
        tagline: "Hệ thống AI phân tích dữ liệu thị trường & nhận diện tín hiệu xu hướng (Dự án nghiên cứu nội bộ).",
        bullets: [
          "Thu thập và phân tích dữ liệu thị trường tài chính theo thời gian thực",
          "Mô hình học máy nhận diện tín hiệu và xu hướng biến động",
          "Dự án nghiên cứu công nghệ nội bộ thuộc hệ sinh thái AI42E",
        ],
        status: "research",
      },
    ],
  },
  play: {
    eyebrow: "Giải trí & Gắn kết",
    title: "Chơi cùng nhau, không cần tải app",
    sub: "11 trò chơi tương tác mở trực tiếp trên trình duyệt điện thoại. Không cần tạo tài khoản hay cài đặt — khuấy động ngay mọi buổi tụ tập bạn bè và sum họp gia đình.",
    tabs: [
      {
        name: "Ô ăn quan",
        text: "Trò chơi dân gian Việt Nam — đấu trí tính toán từng nước đi.",
        image: "game-oanquan",
      },
      {
        name: "Bầu cua tôm cá",
        text: "Trò chơi quen thuộc ngày Tết — mở điện thoại là lắc xúc xắc so tài dự đoán ngay.",
        image: "game-baucua",
      },
      {
        name: "Vòng quay sự thật",
        text: "Xoay vòng chọn Thật hay Thách — gắn kết cả nhóm bằng những tràng cười sảng khoái.",
        image: "game-truth",
      },
    ],
    points: [
      "Tương thích mượt mà trên mọi trình duyệt di động",
      "Không cần đăng nhập, không cần cài đặt",
    ],
    cta: "Mở cổng game play.ai42e.com ↗",
  },
  horizon: {
    eyebrow: "Lộ trình phát triển",
    title: "Những mảnh ghép AI tiếp theo",
    sub: "AI42E liên tục mở rộng sang các bài toán xử lý công việc hằng ngày và phân tích dữ liệu chuyên sâu với hai dự án đang được phát triển.",
    hub: "Hệ sinh thái AI42E",
    footnote: "Các sản phẩm trong không gian nghiên cứu đang trong quá trình phát triển nội bộ và sẽ mở thử nghiệm dần cho cộng đồng.",
  },
  compare: {
    eyebrow: "Vì sao chọn AI42E",
    title: "Dùng AI không cần",
    tone: "phải biết kỹ thuật",
    sub: "Rào cản lớn nhất khi tiếp cận AI là sự phức tạp khi cài đặt, viết câu lệnh (prompt) và chi phí đắt đỏ. AI42E đơn giản hóa mọi thứ để bất kỳ ai cũng bắt đầu được ngay.",
    questions: {
      without: "Cách tiếp cận thông thường",
      with: "Trải nghiệm tại AI42E",
    },
    withoutTitle: "Cách tiếp cận thông thường",
    withTitle: "Trải nghiệm tại AI42E",
    without: [
      "Phải tìm kiếm và ghép nối nhiều công cụ rời rạc ở khắp nơi",
      "Tốn thời gian học kỹ thuật, cài đặt môi trường phức tạp",
      "Bắt buộc nhập thẻ thanh toán hoặc mua gói tháng trước khi biết có phù hợp không",
    ],
    with: [
      "Hệ sinh thái đồng bộ: từ tải tư liệu, làm giọng đọc đến dựng video và giải trí",
      "Giao diện tiếng Việt trực quan — bấm chọn là chạy, không cần biết kỹ thuật",
      "Trải nghiệm miễn phí ngay lập tức, chỉ nâng cấp khi thực sự có nhu cầu lớn",
    ],
    result: "Tiết kiệm thời gian, tối ưu chi phí, tạo ra kết quả ngay lập tức.",
  },
  freemium: {
    eyebrow: "Chi phí minh bạch",
    title: "Chi phí minh bạch, khởi đầu miễn phí",
    sub: "Hầu hết công cụ đều có thể bắt đầu miễn phí. Bạn chỉ trả phí khi cần xử lý khối lượng công việc lớn, với mức giá niêm yết rõ ràng và không có chi phí ẩn.",
    tiers: [
      {
        tag: "Dành cho mọi người",
        title: "Khởi đầu miễn phí",
        text: "Trải nghiệm trực tiếp các công cụ trong hệ sinh thái để kiểm chứng chất lượng thực tế trước khi quyết định gắn bó lâu dài.",
        price: "0đ",
        priceNote: "/ trải nghiệm tự do",
        featuresTitle: "Danh sách bao gồm sẵn:",
        features: [
          "Mở trình duyệt là dùng được ngay",
          "Toàn quyền trải nghiệm các công cụ mở sẵn",
          "Không cần đăng ký thẻ tín dụng",
          "Một số công cụ không cần tài khoản",
        ],
        cta: "Bắt đầu miễn phí →",
        href: "#products",
      },
      {
        tag: "Linh hoạt",
        ribbon: "Minh bạch 100%",
        title: "Nâng cấp theo nhu cầu",
        text: "Dành cho nhà sáng tạo nội dung và công việc tần suất cao. Chi phí luôn được hiển thị minh bạch trước mỗi giao dịch, không tự động trừ tiền.",
        price: "Niêm yết rõ ràng",
        featuresTitle: "Danh sách đặc quyền nâng cao:",
        features: [
          "Tài nguyên máy chủ AI xử lý khối lượng lớn",
          "Giá niêm yết rõ ràng trước khi thanh toán",
          "Dùng thử miễn phí trước khi nâng cấp",
          "Gói phù hợp được tư vấn qua kênh chính thức",
        ],
        cta: "Tìm hiểu gói nâng cao →",
        href: "#contact",
      },
      {
        tag: "Cam kết từ Founder",
        title: "Tái đầu tư cho hệ sinh thái",
        text: "Mỗi khoản đóng góp từ gói nâng cấp được dùng trực tiếp để duy trì cụm máy chủ GPU/AI tốc độ cao và phát triển thêm các công cụ miễn phí mới cho cộng đồng.",
        price: "100%",
        priceNote: "/ duy trì & phát triển",
        featuresTitle: "Danh sách cam kết từ AI42E:",
        features: [
          "Đảm bảo hạ tầng máy chủ AI hoạt động ổn định, tốc độ cao",
          "Duy trì các tính năng miễn phí cho cộng đồng người dùng phổ thông",
          "Tái đầu tư nghiên cứu và ra mắt các ứng dụng mới trong hệ sinh thái",
          "Minh bạch tuyệt đối về quyền lợi và chi phí vận hành",
        ],
        cta: "Đọc câu chuyện sáng lập →",
        href: "#founder",
      },
    ],
  },
  founder: {
    eyebrow: "Lời ngỏ từ người sáng lập",
    title: "Vì sao tôi xây dựng AI42E?",
    paragraphs: [
      "AI đang thay đổi cách chúng ta làm việc mỗi ngày với tốc độ chưa từng có. Tuy nhiên, phần lớn công cụ hiện nay vẫn còn phức tạp, khó tiếp cận với người không chuyên kỹ thuật, hoặc yêu cầu chi phí đăng ký định kỳ đắt đỏ ngay từ đầu.",
      "Tôi xây dựng AI42E với một mong muốn giản dị: tạo ra một điểm chạm nơi bất kỳ ai — từ học sinh, nhân viên văn phòng đến các nhà sáng tạo nội dung — đều có thể trải nghiệm và ứng dụng AI vào công việc lẫn cuộc sống một cách dễ dàng, miễn phí và thiết thực nhất.",
    ],
    signature: "Nguyễn Hùng Mạnh",
    role: "Founder & AI Engineer · AI42E",
    contact: "Liên hệ ↗",
  },
  faq: {
    eyebrow: "Câu hỏi thường gặp",
    title: "Giải đáp thắc mắc về AI42E",
    items: [
      {
        q: "AI42E là gì?",
        a: "AI42E (AI for Everyone and Everything) là hệ sinh thái quy tụ các ứng dụng AI thực tế phục vụ sáng tạo nội dung, công việc và giải trí hằng ngày. Mục tiêu của chúng tôi là giúp bất kỳ ai cũng có thể tận dụng sức mạnh của AI một cách dễ dàng nhất.",
      },
      {
        q: "Tôi có cần biết kỹ thuật để dùng không?",
        a: "Hoàn toàn không. Mọi sản phẩm trong AI42E đều được thiết kế với giao diện trực quan bằng tiếng Việt. Bạn không cần biết lập trình, không cần cài đặt môi trường phức tạp hay học cách viết câu lệnh (prompt).",
      },
      {
        q: "Hiện tại tôi có thể trải nghiệm ngay những sản phẩm nào?",
        a: "Bạn có thể dùng ngay DownloadAnything và cổng trò chơi AI42E Game trực tiếp trên trình duyệt web, hoặc tải ứng dụng Voice Studio dành cho máy tính Windows. Riêng AI42E Studio đã có bản xem trước và sẽ ra mắt chính thức vào ngày 01/11/2026.",
      },
      {
        q: "Làm sao biết đâu là kênh chính thức của AI42E?",
        a: "Toàn bộ tên miền sản phẩm (đuôi .ai42e.com) và các kênh truyền thông chính thức duy nhất của AI42E đều được liệt kê tại phần Chân trang (Footer) bên dưới. Chúng tôi không giao dịch hay thu phí qua bất kỳ tài khoản cá nhân nào nằm ngoài danh sách này.",
      },
    ],
  },
  contact: {
    title: "Kênh chính thức",
    sub: "Đây là những kênh thông tin và liên lạc chính thức duy nhất của AI42E.",
  },
  closing: {
    title: "Sẵn sàng trải nghiệm hệ sinh thái AI42E?",
    sub: "Chọn ngay một công cụ phù hợp với nhu cầu của bạn và trải nghiệm hoàn toàn miễn phí ngay hôm nay.",
    cta: "Khám phá các sản phẩm ↑",
    orbit: {
      studio: { name: "AI42E Studio", tagline: "Dựng video tự động bằng AI" },
      voice: { name: "Voice Studio", tagline: "Lồng giọng & nhân bản giọng nói" },
      download: { name: "DownloadAnything", tagline: "Tải video & âm thanh 4K" },
      game: { name: "AI42E Game Hub", tagline: "11 trò chơi gắn kết" },
      trading: { name: "Trading System", tagline: "Quant AI phân tích thị trường" },
      oneforall: { name: "OneForAll", tagline: "Không gian tiện ích AI đa năng" },
    },
  },
  footer: {
    slogan: "AI FOR EVERYONE AND EVERYTHING",
    portfolio: "Hồ sơ cá nhân của Mạnh",
    rights: "AI42E. Bảo lưu mọi quyền.",
    about: "Hệ sinh thái ứng dụng AI thiết thực, dễ sử dụng dành cho mọi người và mọi nhu cầu hằng ngày.",
    colProducts: "Sản phẩm",
    colContact: "Liên hệ",
    allTools: "Tất cả công cụ",
    newsTitle: "Bản tin AI42E",
    newsText: "Nhận thông báo khi có công cụ AI mới và tính năng thử nghiệm sớm.",
    emailPlaceholder: "Nhập email của bạn...",
    subscribed: "Ứng dụng Email đang được mở — bạn chỉ cần bấm \"Gửi\" để hoàn tất đăng ký nhận tin nhé!",
    subscribeLabel: "Đăng ký",
    mailSubject: "Đăng ký nhận bản tin AI42E",
    mailBody: "Chào Mạnh, vui lòng thêm tôi vào danh sách nhận bản tin AI42E. Email của tôi là:",
  },
  wall: { free: "Khởi đầu miễn phí", brand: "AI42E", tools: "Sáng tạo. Giải trí. Tiện ích." },
  ui: {
    theme: "Chuyển giao diện sáng/tối",
    language: "Chuyển ngôn ngữ",
    skip: "Chuyển đến nội dung chính",
    toTop: "Cuộn lên đầu trang",
  },
};

const en: Content = {
  meta: {
    title: "AI42E | Practical AI Tools for Everyone",
    description:
      "An ecosystem of practical AI tools for multimedia creation, productivity, and casual gaming. Intuitive and ready to use without technical knowledge.",
  },
  nav: {
    products: "Ecosystem",
    creative: "Creation",
    play: "Games",
    horizon: "Roadmap",
    compare: "Why AI42E",
    pricing: "Pricing",
    story: "About",
    faq: "FAQ",
    contact: "Contact",
    open: "Open",
    menu: "Open menu",
    megaCreative: "Creation Suite (3 Production Tools)",
    megaOther: "Expansion & Gaming (3 Apps)",
    megaFooter: "6 ecosystem tools · Web & Desktop",
    megaCta: "See the creative 3-tool workflow →",
    mobileGroup: "Ecosystem tools",
    mobileCreative: "Creation Suite (Studio, Voice, Downloader)",
    mobilePlay: "AI42E Game (11 games)",
    mobileHorizon: "Research & Horizon (OneForAll & Trading)",
    cta: "Get started",
  },
  hero: {
    eyebrow: "AI for Everyone and Everything",
    titleLine1: "AI for Everyone",
    titleLine2: "and Everything",
    sub: "An ecosystem of practical AI tools built for multimedia creation, everyday productivity, and casual entertainment. Intuitive by design so anyone can jump in — no technical background required.",
    ctaPrimary: "Explore the ecosystem",
    note: "100% free to start · No credit card required",
    pillars: {
      creative: { title: "AI Creation Suite", tagline: "Studio · Voice Studio · DownloadAnything" },
      play: { title: "Games & Connection", tagline: "11 interactive minigames for friends & family" },
      horizon: { title: "Research & Horizon", tagline: "OneForAll · AI42E Trading System" },
    },
    explore: "Explore →",
  },
  products: {
    eyebrow: "Creative Suite",
    title: "From raw footage to polished video",
    sub: "A closed-loop content production pipeline in 3 simple steps: gather source media, generate natural voiceovers, and automatically assemble finished MP4 videos.",
    steps: [
      {
        title: "01 · Gather source media",
        text: "Quickly download high-quality original video and audio from 20+ platforms using DownloadAnything.",
      },
      {
        title: "02 · Generate voiceovers",
        text: "Turn scripts into expressive narrations or clone unique voices with Voice Studio.",
      },
      {
        title: "03 · Render & publish",
        text: "Automatically assemble scenes, generate synchronized captions, and export crisp MP4 videos in AI42E Studio.",
      },
    ],
    status: {
      free: "Free",
      freemium: "Early free access",
      soon: "Coming soon",
      research: "In research",
      maintenance: "Maintenance",
    },
    items: [
      {
        id: "studio",
        icon: "studio",
        name: "AI42E Studio",
        tagline: "Automated AI video creation — from raw ideas and scripts to finished MP4 files.",
        bullets: [
          "Turn written scripts into complete MP4 videos",
          "Automatically generate synchronized visuals and subtitles",
          "Integrated natural AI voiceover without complex video editing software",
        ],
        status: "freemium",
        thumb: "studio-hero",
        href: "https://studio.ai42e.com",
        cta: "Explore AI42E Studio",
      },
      {
        id: "download",
        icon: "download",
        name: "DownloadAnything",
        tagline: "Fast high-quality media downloader from YouTube, TikTok, Douyin, and 20+ platforms.",
        bullets: [
          "Download watermark-free original video and audio",
          "Supports 20+ popular video platforms and social networks",
          "Extract high-quality MP3 audio with a single click",
        ],
        status: "free",
        href: "https://downloader.ai42e.com",
        cta: "Open DownloadAnything",
      },
      {
        id: "voice",
        icon: "voice",
        name: "Voice Studio",
        tagline: "Natural text-to-speech, multilingual translation, and voice cloning.",
        bullets: [
          "Convert text into expressive studio-quality speech",
          "Realistic AI voice cloning from short audio samples",
          "Supports multilingual translation and voice dubbing",
        ],
        status: "free",
        href: "https://voice.ai42e.com",
        cta: "Explore Voice Studio",
      },
      {
        id: "game",
        icon: "game",
        name: "AI42E Game",
        tagline: "11 interactive web games for friends and family — play in your browser, no app download.",
        bullets: [
          "Play directly in mobile browser without app install",
          "11 interactive games for friends and family gatherings",
          "Smoothly optimized for touchscreens and mobile viewports",
        ],
        status: "free",
        thumb: "play-family",
        href: "https://play.ai42e.com",
        cta: "Open game portal play.ai42e.com ↗",
      },
      {
        id: "oneforall",
        icon: "oneforall",
        name: "OneForAll",
        tagline: "All-in-one AI workspace: instant summarization, translation, and document processing.",
        bullets: [
          "Instant document summarization and text analysis powered by AI",
          "Multilingual translation and intelligent data extraction",
          "All-in-one AI productivity workspace for daily workflows",
        ],
        status: "soon",
      },
      {
        id: "trading",
        icon: "trading",
        name: "AI42E Trading System",
        tagline: "AI market analytics and signal detection platform (Internal research project).",
        bullets: [
          "Real-time financial market data ingestion and analytics",
          "Machine learning models for trend and signal recognition",
          "Proprietary internal tech research initiative within AI42E",
        ],
        status: "research",
      },
    ],
  },
  play: {
    eyebrow: "Play & Connection",
    title: "Play together, no app install needed",
    sub: "11 interactive games running directly in your phone browser. No account sign-up, no app store download — instantly liven up any hangout or family gathering.",
    tabs: [
      {
        name: "Mandarin Square Capturing",
        text: "Traditional Vietnamese board game — outthink your opponent step by step.",
        image: "game-oanquan",
      },
      {
        name: "Bau Cua Tom Ca",
        text: "Beloved holiday dice game — open your phone and shake the dice to test your luck.",
        image: "game-baucua",
      },
      {
        name: "Truth or Dare Wheel",
        text: "Spin the wheel for Truth or Dare — bond your group with joyful laughter.",
        image: "game-truth",
      },
    ],
    points: [
      "Runs smoothly across modern mobile browsers",
      "No login and no installation required",
    ],
    cta: "Open game portal play.ai42e.com ↗",
  },
  horizon: {
    eyebrow: "Roadmap",
    title: "The next pieces of AI42E",
    sub: "AI42E continuously expands into everyday workflow assistance and advanced data analytics with two active development projects.",
    hub: "AI42E Ecosystem",
    footnote: "Products in research are developed internally and will open for community testing progressively.",
  },
  compare: {
    eyebrow: "Why AI42E",
    title: "Using AI without",
    tone: "technical hurdles",
    sub: "The biggest barrier to AI is technical complexity, complex prompts, and high initial subscription costs. AI42E simplifies everything so anyone can get started immediately.",
    questions: {
      without: "Conventional approach",
      with: "The AI42E experience",
    },
    withoutTitle: "Conventional approach",
    withTitle: "The AI42E experience",
    without: [
      "Hunting and stitching together fragmented tools across multiple services",
      "Spending hours learning technical setups and configuring complex environments",
      "Forced credit card entry or monthly subscriptions before knowing if it fits",
    ],
    with: [
      "Unified ecosystem: from media download and voiceovers to video production and games",
      "Intuitive visual interface — click and run, no technical skills needed",
      "Instant free access to start, upgrade only when your workload scales up",
    ],
    result: "Save time, optimize budget, and achieve real results right away.",
  },
  freemium: {
    eyebrow: "Transparent Pricing",
    title: "Transparent pricing, 100% free to start",
    sub: "Most tools can be used completely free. You only pay when processing high-volume workloads, with clearly listed prices and zero hidden fees.",
    tiers: [
      {
        tag: "For Everyone",
        title: "Free to start",
        text: "Test-drive tools across the ecosystem to verify real-world quality before committing long term.",
        price: "0đ",
        priceNote: "/ free exploration",
        featuresTitle: "Included out of the box:",
        features: [
          "Open browser and start right away",
          "Full access to all open tools in the ecosystem",
          "No credit card or payment info required",
          "Selected utilities require no account",
        ],
        cta: "Start for free →",
        href: "#products",
      },
      {
        tag: "Flexible",
        ribbon: "100% Transparent",
        title: "Upgrade on demand",
        text: "Designed for high-frequency creators and professional workloads. Pricing is always transparent before payment, never auto-billed.",
        price: "Clearly listed",
        featuresTitle: "Advanced privileges:",
        features: [
          "Dedicated GPU/AI server capacity for heavy jobs",
          "Upfront transparent pricing before every transaction",
          "Free trial access before choosing to upgrade",
          "Tailored packages consulted via official channels",
        ],
        cta: "Explore advanced plans →",
        href: "#contact",
      },
      {
        tag: "Founder Commitment",
        title: "Reinvesting into the ecosystem",
        text: "Contributions from paid tiers directly support high-speed GPU infrastructure and fund new free tools for the community.",
        price: "100%",
        priceNote: "/ maintenance & R&D",
        featuresTitle: "AI42E commitments:",
        features: [
          "Keep AI server infrastructure fast and reliably stable",
          "Maintain free tiers for the broad general community",
          "Reinvest into research and ship new ecosystem apps",
          "Absolute transparency in user benefits and operational costs",
        ],
        cta: "Read the founder's story →",
        href: "#founder",
      },
    ],
  },
  founder: {
    eyebrow: "From the Founder",
    title: "Why did I build AI42E?",
    paragraphs: [
      "AI is transforming how we work at unprecedented speed. Yet most tools remain overly complex, difficult for non-technical individuals, or demand costly upfront subscriptions.",
      "I built AI42E with a simple aspiration: create an accessible touchpoint where anyone — from students and office workers to creators — can experience and leverage AI in work and daily life in the easiest, most practical, and cost-effective way.",
    ],
    signature: "Nguyen Hung Manh",
    role: "Founder & AI Engineer · AI42E",
    contact: "Contact ↗",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently Asked Questions",
    items: [
      {
        q: "What is AI42E?",
        a: "AI42E (AI for Everyone and Everything) is an ecosystem of practical AI applications for content creation, daily productivity, and entertainment. Our mission is to make the power of AI accessible to everyone.",
      },
      {
        q: "Do I need technical skills to use it?",
        a: "Not at all. Every product in AI42E is designed with an intuitive visual interface in Vietnamese and English. You do not need coding knowledge, complicated setups, or prompt engineering skills.",
      },
      {
        q: "Which products can I use right now?",
        a: "You can immediately use DownloadAnything and the AI42E Game portal in your browser, or download Voice Studio for Windows. AI42E Studio is available as an early preview and launches officially on November 1, 2026.",
      },
      {
        q: "How do I verify official AI42E channels?",
        a: "All official product domains (.ai42e.com) and official communication channels are listed in the Footer below. We never transact or collect fees through personal accounts outside this list.",
      },
    ],
  },
  contact: {
    title: "Official Channels",
    sub: "These are the only official AI42E channels for communication and updates.",
  },
  closing: {
    title: "Ready to experience the AI42E ecosystem?",
    sub: "Choose a tool that fits your needs and start exploring completely free today.",
    cta: "Explore products ↑",
    orbit: {
      studio: { name: "AI42E Studio", tagline: "Automated AI video creation" },
      voice: { name: "Voice Studio", tagline: "Expressive TTS & voice cloning" },
      download: { name: "DownloadAnything", tagline: "4K video & audio downloader" },
      game: { name: "AI42E Game Hub", tagline: "11 interactive web games" },
      trading: { name: "Trading System", tagline: "Quant AI market intelligence" },
      oneforall: { name: "OneForAll", tagline: "All-in-one AI workspace" },
    },
  },
  footer: {
    slogan: "AI FOR EVERYONE AND EVERYTHING",
    portfolio: "Manh's personal portfolio",
    rights: "AI42E. All rights reserved.",
    about: "A practical, accessible ecosystem of AI applications for everyone and every daily need.",
    colProducts: "Products",
    colContact: "Contact",
    allTools: "All tools",
    newsTitle: "AI42E Newsletter",
    newsText: "Get notified when new AI tools launch, plus early access to experimental features.",
    emailPlaceholder: "Enter your email...",
    subscribed: "Your email client is opening — simply click \"Send\" to complete your subscription!",
    subscribeLabel: "Subscribe",
    mailSubject: "Subscribe to the AI42E Newsletter",
    mailBody: "Hello Manh, please add me to the AI42E newsletter. My email is:",
  },
  wall: { free: "Free to start", brand: "AI42E", tools: "Create. Play. Explore." },
  ui: {
    theme: "Toggle light/dark theme",
    language: "Change language",
    skip: "Skip to main content",
    toTop: "Scroll to top",
  },
};

export const CONTENT: Record<Locale, Content> = { vi, en };
