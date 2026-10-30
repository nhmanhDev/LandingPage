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
      "Làm video bằng AI, chơi game cùng bạn bè và nhiều công cụ khác, đơn giản đến mức ai cũng dùng được. Miễn phí để bắt đầu.",
  },
  nav: {
    products: "Hệ sinh thái",
    creative: "Sáng tạo",
    play: "Giải trí",
    horizon: "Tương lai",
    compare: "Vì sao chọn AI42E",
    pricing: "Chi phí",
    story: "Về AI42E",
    faq: "Hỏi đáp",
    contact: "Liên hệ",
    open: "Mở",
    menu: "Mở menu",
    megaCreative: "Bộ Sáng tạo Nội dung",
    megaOther: "Giải trí & Không gian mở",
    megaFooter: "6 ứng dụng · Mở trên web & máy tính",
    megaCta: "Xem chu trình phối hợp 3 công cụ",
    mobileGroup: "Hệ sinh thái sản phẩm",
    mobileCreative: "Bộ Sáng tạo AI (Studio, Voice, Downloader)",
    mobilePlay: "AI42E Game (11 trò chơi)",
    mobileHorizon: "Không gian mở rộng (OneForAll & Trading)",
    cta: "Trải nghiệm ngay",
  },
  hero: {
    eyebrow: "Hệ sinh thái AI cho mọi người & mọi việc",
    titleLine1: "AI for Everyone",
    titleLine2: "and Everything",
    sub: "Một hệ sinh thái trọn vẹn gồm các công cụ AI chuyên biệt cho sáng tạo đa phương tiện, tiện ích công việc và gắn kết giải trí. Mở trình duyệt là dùng ngay — không cần biết kỹ thuật.",
    ctaPrimary: "Khám phá hệ sinh thái",
    note: "Bắt đầu miễn phí hoàn toàn · Không yêu cầu thẻ tín dụng",
    pillars: {
      creative: { title: "Bộ Sáng tạo AI", tagline: "3 công cụ: Studio · Voice · Downloader" },
      play: { title: "Giải trí & Game", tagline: "11 trò chơi kết nối bạn bè & gia đình" },
      horizon: { title: "Không gian mở rộng", tagline: "OneForAll · AI42E Trading System" },
    },
    explore: "Khám phá",
  },
  products: {
    eyebrow: "Sáng tạo đa phương tiện",
    title: "Từ tư liệu gốc đến video hoàn chỉnh",
    sub: "Tải tư liệu về bằng DownloadAnything, đọc lời thuyết minh bằng Voice Studio, rồi dựng video hoàn chỉnh trong AI42E Studio.",
    steps: [
      { title: "Tải tư liệu", text: "DownloadAnything lưu video và âm thanh chất lượng cao về máy." },
      { title: "Lồng tiếng", text: "Voice Studio đọc văn bản bằng giọng tự nhiên, hoặc nhân bản một giọng nói." },
      { title: "Dựng video", text: "AI42E Studio xuất video MP4 hoàn chỉnh từ ý tưởng hoặc kịch bản." },
    ],
    status: {
      free: "Miễn phí",
      freemium: "Miễn phí giai đoạn đầu",
      soon: "Sắp ra mắt",
      research: "Đang nghiên cứu",
      maintenance: "Đang bảo trì",
    },
    items: [
      {
        id: "studio",
        icon: "studio",
        name: "AI42E Studio",
        tagline: "Xưởng sáng tạo video tự động bằng AI. Từ ý tưởng thô, kịch bản đến video MP4 hoàn chỉnh chỉ trong một ứng dụng.",
        bullets: [
          "Viết kịch bản, dựng hình và lồng tiếng tự động",
          "Tải và dịch video từ nhiều nền tảng",
          "Ứng dụng máy tính, ra mắt 01/11/2026",
        ],
        status: "freemium",
        thumb: "studio-hero",
        href: "https://studio.ai42e.com",
        cta: "Xem AI42E Studio",
      },
      {
        id: "oneforall",
        icon: "oneforall",
        name: "OneForAll",
        tagline: "Trạm trung chuyển tiện ích AI trên nền web. Gom các tác vụ tóm tắt, dịch tài liệu và chuyển đổi dữ liệu nhanh về một giao diện duy nhất.",
        bullets: [
          "Mở lên là dùng, một số công cụ không cần đăng nhập",
          "Tải video, chuyển văn bản thành giọng nói, dịch tài liệu",
          "Chỉ trả phí khi cần tính năng nâng cao",
        ],
        status: "soon",
      },
      {
        id: "download",
        icon: "download",
        name: "DownloadAnything",
        tagline: "Trích xuất và lưu trữ video, âm thanh chất lượng cao từ YouTube, TikTok, Douyin và hơn 20 nền tảng trực tuyến.",
        bullets: [
          "YouTube, TikTok, Instagram, Facebook, X, Pinterest, Douyin",
          "Trợ lý AI giúp lấy nội dung ở những trang khó",
          "Dùng ngay trên web",
        ],
        status: "free",
        href: "https://downloader.ai42e.com",
        cta: "Mở DownloadAnything",
      },
      {
        id: "game",
        icon: "game",
        name: "AI42E Game",
        tagline: "11 trò chơi gắn kết bạn bè và gia đình. Mở trực tiếp trên trình duyệt điện thoại, không cần tải app, không cần đăng nhập.",
        bullets: [
          "Chơi ngay trên trình duyệt",
          "Không cần tài khoản",
          "Truth or Dare, bầu cua, ô ăn quan, đố vui và nhiều hơn nữa",
        ],
        status: "free",
        thumb: "play-family",
        href: "https://play.ai42e.com",
        cta: "Chơi ngay",
      },
      {
        id: "voice",
        icon: "voice",
        name: "Voice Studio",
        tagline: "Biến văn bản thành giọng đọc truyền cảm chuẩn phòng thu. Tích hợp công nghệ dịch thuật đa ngôn ngữ và nhân bản giọng nói AI.",
        bullets: [
          "Đọc văn bản bằng giọng AI",
          "Dịch và nhân bản giọng nói",
          "Ứng dụng máy tính, tải về cho Windows",
        ],
        status: "free",
        href: "https://voice.ai42e.com",
        cta: "Xem Voice Studio",
      },
      {
        id: "trading",
        icon: "trading",
        name: "AI42E Trading System",
        tagline: "Mô hình thuật toán AI phân tích dữ liệu thị trường và nhận diện tín hiệu xu hướng thời gian thực. (Nghiên cứu nội bộ — Không phải lời khuyên đầu tư).",
        bullets: [
          "Đang trong giai đoạn nghiên cứu",
          "Chưa mở cho người dùng",
          "Không phải lời khuyên đầu tư",
        ],
        status: "research",
      },
    ],
  },
  play: {
    eyebrow: "Giải trí cùng bạn bè",
    title: "Chơi cùng nhau, không cần tải app",
    sub: "11 trò chơi mở ngay trên trình duyệt điện thoại. Không đăng nhập rườm rà, hợp cho những buổi họp mặt gia đình và bạn bè.",
    tabs: [
      { name: "Ô ăn quan", text: "Trò dân gian Việt Nam, đấu trí từng nước đi.", image: "game-oanquan" },
      { name: "Bầu cua tôm cá", text: "Trò chơi quen thuộc mỗi dịp Tết: lắc xúc xắc rồi đoán kết quả.", image: "game-baucua" },
      { name: "Vòng quay sự thật", text: "Quay vòng, chọn thật hay thách, cả nhóm cùng cười.", image: "game-truth" },
    ],
    points: ["Mở là chơi, chạy trên mọi trình duyệt điện thoại", "Không cần tài khoản, không cần cài đặt"],
    cta: "Mở cổng game play.ai42e.com",
  },
  horizon: {
    eyebrow: "Tương lai",
    title: "Những mảnh ghép AI tiếp theo",
    sub: "AI42E đang mở rộng sang những việc hằng ngày hơn: một trạm tiện ích trên web và một mô hình phân tích thị trường đang nghiên cứu.",
    hub: "Hệ sinh thái AI42E",
    footnote: "Hai sản phẩm này chưa mở cho người dùng. Khi có ngày ra mắt, bạn sẽ thấy thông báo ở các kênh chính thức.",
  },
  compare: {
    eyebrow: "Vì sao chọn AI42E",
    title: "Dùng AI không cần",
    tone: "phải biết kỹ thuật",
    sub: "Nhiều người muốn thử AI nhưng ngại cài đặt, kỹ thuật và tiền bạc. AI42E gom mọi thứ về một chỗ để bạn bắt đầu ngay.",
    questions: {
      without: "Muốn thử AI thì phải làm gì trước?",
      with: "Muốn thử AI có cần biết kỹ thuật không?",
    },
    withoutTitle: "Cách làm thông thường",
    withTitle: "Với AI42E",
    without: [
      "Tìm từng công cụ riêng, mỗi nơi một kiểu",
      "Phải học cách dùng rồi mới làm được",
      "Phải trả tiền trước khi biết có hợp hay không",
    ],
    with: [
      "Công cụ AI gom về một chỗ",
      "Mở lên là dùng, không cần biết kỹ thuật",
      "Dùng thử miễn phí, thích thì mới trả phí",
    ],
    result: "Đỡ mất công, đỡ mất tiền, dùng được ngay.",
  },
  freemium: {
    eyebrow: "Chi phí",
    title: "Dùng có mất tiền không?",
    sub: "Phần lớn là miễn phí. Bạn chỉ trả tiền khi cần dùng nhiều hơn, và luôn biết giá trước khi trả.",
    tiers: [
      {
        tag: "Bắt đầu 0đ",
        title: "Cứ thử trước",
        text: "Nhiều công cụ dùng được ngay, không cần biết kỹ thuật. Thấy hợp thì dùng tiếp, không hợp thì thôi.",
        price: "0đ",
        priceNote: "dùng thử tự do",
        featuresTitle: "Bao gồm sẵn:",
        features: [
          "Mở trình duyệt là dùng được ngay",
          "Toàn quyền trải nghiệm các công cụ mở sẵn",
          "Không cần đăng ký thẻ tín dụng",
          "Một số công cụ không cần tài khoản",
        ],
        cta: "Bắt đầu miễn phí",
        href: "#products",
      },
      {
        tag: "Theo nhu cầu",
        ribbon: "Minh bạch 100%",
        title: "Cần nhiều hơn thì nâng cấp",
        text: "Nếu bạn dùng nhiều hoặc cần tính năng nâng cao, sẽ có gói trả phí. Giá luôn được ghi rõ trước khi bạn thanh toán.",
        price: "Giá báo trước",
        featuresTitle: "Đặc quyền nâng cao:",
        features: [
          "Tài nguyên máy chủ AI xử lý khối lượng lớn",
          "Giá niêm yết rõ ràng trước khi thanh toán",
          "Dùng thử miễn phí trước khi nâng cấp",
          "Gói phù hợp được tư vấn qua kênh chính thức",
        ],
        cta: "Tìm hiểu gói nâng cao",
        href: "#contact",
      },
      {
        tag: "Cam kết của Founder",
        title: "Phí dùng để làm gì",
        text: "Chạy máy chủ và các dịch vụ AI tốn tiền thật. Khoản phí giúp AI42E duy trì ổn định và làm thêm sản phẩm mới.",
        price: "Duy trì server",
        featuresTitle: "Cam kết từ AI42E:",
        features: [
          "Phí dùng để duy trì hạ tầng và máy chủ AI",
          "Giữ sản phẩm hoạt động ổn định",
          "Tái đầu tư để làm thêm công cụ mới",
          "Ghi rõ khoản phí được dùng vào việc gì",
        ],
        cta: "Đọc câu chuyện sáng lập",
        href: "#founder",
      },
    ],
  },
  founder: {
    eyebrow: "Lời từ người làm ra AI42E",
    title: "Vì sao có AI42E?",
    paragraphs: [
      "AI đang thay đổi cách chúng ta làm việc, nhưng phần lớn công cụ vẫn khó dùng với người không rành kỹ thuật.",
      "Mình muốn làm một nơi mà ai cũng thử được AI: dễ dùng, và có nhiều thứ miễn phí. Khi bạn dùng nhiều hơn, khoản phí giúp mình duy trì hệ thống và làm thêm sản phẩm mới.",
    ],
    signature: "Mạnh, người làm ra AI42E",
    role: "AI Engineer · Nhà sáng lập AI42E",
    contact: "Liên hệ",
  },
  faq: {
    eyebrow: "Hỏi đáp",
    title: "Có thể bạn đang thắc mắc",
    items: [
      {
        q: "AI42E là gì?",
        a: "AI42E gom những công cụ AI dễ dùng về một chỗ, để ai cũng có thể dùng AI trong công việc và giải trí hằng ngày. Khẩu hiệu của chúng tôi là AI for everyone and everything.",
      },
      {
        q: "Tôi có cần biết kỹ thuật để dùng không?",
        a: "Không. Mỗi sản phẩm đều được làm để người bình thường dùng được, bạn không cần biết lập trình hay hiểu AI hoạt động thế nào.",
      },
      {
        q: "Bây giờ tôi dùng được những gì?",
        a: "AI42E Game và DownloadAnything dùng được ngay trên web, còn Voice Studio tải về dùng trên Windows. AI42E Studio sẽ ra mắt ngày 01/11/2026 và hiện đã có bản xem trước. OneForAll sắp ra mắt.",
      },
      {
        q: "Làm sao biết đâu là kênh chính thức của AI42E?",
        a: "Chỉ những kênh ghi ở cuối trang này mới là kênh chính thức. Nếu thấy tài khoản nào khác tự nhận là AI42E, bạn hãy cẩn thận nhé.",
      },
    ],
  },
  contact: {
    title: "Kênh chính thức",
    sub: "Đây là những kênh chính thức duy nhất của AI42E.",
  },
  closing: {
    title: "Thử một sản phẩm xem sao?",
    sub: "Chọn một sản phẩm đang chạy và dùng thử miễn phí. Các kênh chính thức nằm ở chân trang.",
    cta: "Xem các sản phẩm",
    orbit: {
      studio: { name: "AI42E Studio", tagline: "Dựng video tự động bằng AI" },
      voice: { name: "Voice Studio", tagline: "Lồng giọng & clone giọng" },
      download: { name: "DownloadAnything", tagline: "Tải video & âm thanh 4K" },
      game: { name: "AI42E Game Hub", tagline: "11 trò chơi gắn kết" },
      trading: { name: "Trading System", tagline: "Quant AI phân tích thị trường" },
      oneforall: { name: "OneForAll", tagline: "Trạm tiện ích AI đa năng" },
    },
  },
  footer: {
    slogan: "AI FOR EVERYONE AND EVERYTHING",
    portfolio: "Hồ sơ cá nhân của Mạnh",
    rights: "AI42E. Bảo lưu mọi quyền.",
    about: "Những công cụ AI dễ dùng, gom về một chỗ, dành cho mọi người.",
    colProducts: "Sản phẩm",
    colContact: "Liên hệ",
    allTools: "Tất cả công cụ",
    newsTitle: "Bản tin AI42E",
    newsText: "Nhận thông báo khi có công cụ AI mới và tính năng thử nghiệm sớm.",
    emailPlaceholder: "Nhập email của bạn...",
    subscribed: "Email của bạn sẽ mở ra. Bấm gửi để hoàn tất đăng ký.",
    subscribeLabel: "Đăng ký nhận tin",
    mailSubject: "Đăng ký bản tin AI42E",
    mailBody: "Xin đăng ký nhận bản tin AI42E. Email của tôi:",
  },
  wall: { free: "Nhiều thứ miễn phí", brand: "AI42E", tools: "Làm video. Chơi game. Khám phá." },
  ui: {
    theme: "Đổi giao diện sáng/tối",
    language: "Đổi ngôn ngữ",
    skip: "Chuyển đến nội dung chính",
  },
};

const en: Content = {
  meta: {
    title: "AI42E | Easy AI tools for everyone",
    description:
      "Make videos with AI, play games with friends and more, all simple enough for anyone to use. Free to start.",
  },
  nav: {
    products: "Ecosystem",
    creative: "Creation",
    play: "Play & Games",
    horizon: "Future Lab",
    compare: "Why AI42E",
    pricing: "Pricing",
    story: "About",
    faq: "FAQ",
    contact: "Contact",
    open: "Open",
    menu: "Open menu",
    megaCreative: "Creative suite",
    megaOther: "Play & open space",
    megaFooter: "6 apps · On the web and desktop",
    megaCta: "See how the three creative tools work together",
    mobileGroup: "Ecosystem products",
    mobileCreative: "AI creative suite (Studio, Voice, Downloader)",
    mobilePlay: "AI42E Game (11 games)",
    mobileHorizon: "Open space (OneForAll & Trading)",
    cta: "Try now",
  },
  hero: {
    eyebrow: "AI Ecosystem for Everyone & Everything",
    titleLine1: "AI for Everyone",
    titleLine2: "and Everything",
    sub: "A complete AI technology ecosystem with purpose-built tools for multimedia creation, daily productivity and connected play. Open in browser and start immediately.",
    ctaPrimary: "Explore the ecosystem",
    note: "Completely free to start · No credit card required",
    pillars: {
      creative: { title: "AI creative suite", tagline: "3 tools: Studio · Voice · Downloader" },
      play: { title: "Play & games", tagline: "11 games for friends and family" },
      horizon: { title: "Open space", tagline: "OneForAll · AI42E Trading System" },
    },
    explore: "Explore",
  },
  products: {
    eyebrow: "Multimedia creation",
    title: "From raw footage to a finished video",
    sub: "Grab source footage with DownloadAnything, narrate it with Voice Studio, then assemble the finished video in AI42E Studio.",
    steps: [
      { title: "Grab the footage", text: "DownloadAnything saves high-quality video and audio to your device." },
      { title: "Narrate it", text: "Voice Studio reads your text in a natural voice, or clones one you provide." },
      { title: "Edit and export", text: "AI42E Studio turns your idea or script into a finished MP4." },
    ],
    status: {
      free: "Free",
      freemium: "Free in the early period",
      soon: "Coming soon",
      research: "In research",
      maintenance: "Under maintenance",
    },
    items: [
      {
        id: "studio",
        icon: "studio",
        name: "AI42E Studio",
        tagline: "All-in-one AI automated video creation. From raw ideas and scripts to polished MP4 videos in a single app.",
        bullets: [
          "Script, visuals and voice-over, automated",
          "Download and translate videos from many platforms",
          "Desktop app, launching 1 Nov 2026",
        ],
        status: "freemium",
        thumb: "studio-hero",
        href: "https://studio.ai42e.com",
        cta: "See AI42E Studio",
      },
      {
        id: "oneforall",
        icon: "oneforall",
        name: "OneForAll",
        tagline: "Web-based all-in-one AI utility hub. Summarize, translate and convert media seamlessly in one interface.",
        bullets: [
          "Open and use, some tools need no sign-in",
          "Video download, text to speech, document translation",
          "Pay only for advanced features",
        ],
        status: "soon",
      },
      {
        id: "download",
        icon: "download",
        name: "DownloadAnything",
        tagline: "High-speed media downloader and extractor. Save videos and audio from YouTube, TikTok, Douyin and 20+ platforms.",
        bullets: [
          "YouTube, TikTok, Instagram, Facebook, X, Pinterest, Douyin",
          "An AI assistant that captures media on tricky sites",
          "Works right on the web",
        ],
        status: "free",
        href: "https://downloader.ai42e.com",
        cta: "Open DownloadAnything",
      },
      {
        id: "game",
        icon: "game",
        name: "AI42E Game",
        tagline: "11 party games for friends and family. Play right in your mobile browser with zero downloads and no sign-up.",
        bullets: [
          "Plays right in the browser",
          "No account needed",
          "Truth or Dare, Bau Cua, O An Quan, quizzes and more",
        ],
        status: "free",
        thumb: "play-family",
        href: "https://play.ai42e.com",
        cta: "Play now",
      },
      {
        id: "voice",
        icon: "voice",
        name: "Voice Studio",
        tagline: "Studio-grade AI voice synthesis and text-to-speech. Features natural voice cloning and real-time multilingual translation.",
        bullets: [
          "Read text aloud with AI voices",
          "Translate and clone voices",
          "Desktop app, download for Windows",
        ],
        status: "free",
        href: "https://voice.ai42e.com",
        cta: "See Voice Studio",
      },
      {
        id: "trading",
        icon: "trading",
        name: "AI42E Trading System",
        tagline: "Algorithmic AI market data analysis and trend signal detection. (Internal research only — Not financial advice).",
        bullets: [
          "Currently in research",
          "Not open to users yet",
          "Not investment advice",
        ],
        status: "research",
      },
    ],
  },
  play: {
    eyebrow: "Play with friends",
    title: "Play together, nothing to install",
    sub: "11 games that open right in your phone's browser. No sign-in hassle, made for family gatherings and nights with friends.",
    tabs: [
      { name: "O An Quan", text: "A traditional Vietnamese board game. Outwit your opponent one move at a time.", image: "game-oanquan" },
      { name: "Bau Cua", text: "A Lunar New Year favourite: shake the dice and guess the result.", image: "game-baucua" },
      { name: "Truth or Dare", text: "Spin the wheel, then pick truth or dare. Expect plenty of laughs.", image: "game-truth" },
    ],
    points: ["Open it and play, on any phone browser", "No account, no installation"],
    cta: "Open play.ai42e.com",
  },
  horizon: {
    eyebrow: "Future Lab",
    title: "The next pieces of the ecosystem",
    sub: "AI42E is moving into everyday tasks: a web utility hub and a market analysis model that is still in research.",
    hub: "AI42E ecosystem",
    footnote: "Neither of these is open to users yet. Watch the official channels for launch news.",
  },
  compare: {
    eyebrow: "Why AI42E",
    title: "Using AI shouldn't require",
    tone: "technical skills",
    sub: "Plenty of people want to try AI but worry about setup, technical skills and cost. AI42E brings everything into one place so you can start right away.",
    questions: {
      without: "What do I have to do before trying AI?",
      with: "Do I need technical skills to try AI?",
    },
    withoutTitle: "The usual way",
    withTitle: "With AI42E",
    without: [
      "Hunt for separate tools, each one different",
      "Learn how to use them before you can do anything",
      "Pay first, find out later if it suits you",
    ],
    with: [
      "AI tools brought together in one place",
      "Open and use, no technical skills needed",
      "Try for free, pay only if you like it",
    ],
    result: "Less hassle, less cost, ready to use.",
  },
  freemium: {
    eyebrow: "Pricing",
    title: "Does it cost anything?",
    sub: "Most of it is free. You only pay when you need more, and you always see the price first.",
    tiers: [
      {
        tag: "Start free",
        title: "Just try it first",
        text: "Many tools work right away, with no technical know-how. If it fits, keep going. If not, no harm done.",
        price: "Free",
        priceNote: "try freely",
        featuresTitle: "Included:",
        features: [
          "Open a browser and start right away",
          "Full access to the tools that are already open",
          "No credit card needed",
          "Some tools need no account",
        ],
        cta: "Start for free",
        href: "#products",
      },
      {
        tag: "Pay as you need",
        ribbon: "100% transparent",
        title: "Upgrade when you need more",
        text: "If you use a lot or need advanced features, there is a paid plan. The price is always shown before you pay.",
        price: "Price shown upfront",
        featuresTitle: "Advanced perks:",
        features: [
          "AI server capacity for heavy workloads",
          "Clear prices shown before you pay",
          "Try it for free before you upgrade",
          "Plans suggested through the official channels",
        ],
        cta: "Find out about the advanced plan",
        href: "#contact",
      },
      {
        tag: "Founder's commitment",
        title: "What the fees are for",
        text: "Running servers and AI services costs real money. The fees keep AI42E stable and let us build new products.",
        price: "Keeping servers running",
        featuresTitle: "Commitments from AI42E:",
        features: [
          "Fees go to running infrastructure and AI servers",
          "Keep products stable and running",
          "Reinvest to build new tools",
          "Be clear about what the fees are used for",
        ],
        cta: "Read the founder's story",
        href: "#founder",
      },
    ],
  },
  founder: {
    eyebrow: "A word from the maker",
    title: "Why AI42E exists",
    paragraphs: [
      "AI is changing how we work, but most tools are still hard to use if you are not technical.",
      "I wanted a place where anyone can try AI: easy to use, with plenty of free things. When you use more, the fees help me keep the system running and build new products.",
    ],
    signature: "Manh, maker of AI42E",
    role: "AI Engineer · Maker of AI42E",
    contact: "Contact",
  },
  faq: {
    eyebrow: "FAQ",
    title: "You might be wondering",
    items: [
      {
        q: "What is AI42E?",
        a: "AI42E brings easy-to-use AI tools together in one place, so anyone can use AI for work and play every day. Our motto is AI for everyone and everything.",
      },
      {
        q: "Do I need technical skills?",
        a: "No. Every product is built for ordinary people. You do not need to code or understand how AI works.",
      },
      {
        q: "What can I use right now?",
        a: "AI42E Game and DownloadAnything work right now on the web, and Voice Studio can be downloaded for Windows. AI42E Studio launches on 1 Nov 2026 and already has a web preview. OneForAll is coming soon.",
      },
      {
        q: "How do I know which channels are official?",
        a: "Only the channels listed at the bottom of this page are official. If another account claims to be AI42E, be careful.",
      },
    ],
  },
  contact: {
    title: "Official channels",
    sub: "These are the only official AI42E channels.",
  },
  closing: {
    title: "Want to try one?",
    sub: "Pick a product that is live and try it for free. The official channels are in the footer below.",
    cta: "See the products",
    orbit: {
      studio: { name: "AI42E Studio", tagline: "Automated video creation" },
      voice: { name: "Voice Studio", tagline: "Expressive TTS & voice cloning" },
      download: { name: "DownloadAnything", tagline: "Multi-platform media downloader" },
      game: { name: "AI42E Game Hub", tagline: "11 web board games" },
      trading: { name: "Trading System", tagline: "Quant market intelligence" },
      oneforall: { name: "OneForAll", tagline: "All-in-one AI workspace" },
    },
  },
  footer: {
    slogan: "AI FOR EVERYONE AND EVERYTHING",
    portfolio: "Manh's personal portfolio",
    rights: "AI42E. All rights reserved.",
    about: "Easy-to-use AI tools, brought together in one place, for everyone.",
    colProducts: "Products",
    colContact: "Contact",
    allTools: "All tools",
    newsTitle: "AI42E newsletter",
    newsText: "Get a note when new AI tools launch, plus early access to experiments.",
    emailPlaceholder: "Enter your email...",
    subscribed: "Your email app will open. Press send to finish signing up.",
    subscribeLabel: "Subscribe",
    mailSubject: "Subscribe to the AI42E newsletter",
    mailBody: "Please add me to the AI42E newsletter. My email:",
  },
  wall: { free: "A lot is free", brand: "AI42E", tools: "Make videos. Play games. Explore." },
  ui: {
    theme: "Toggle light/dark theme",
    language: "Change language",
    skip: "Skip to main content",
  },
};

export const CONTENT: Record<Locale, Content> = { vi, en };
