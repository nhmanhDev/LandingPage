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
  nav: { products: string; pricing: string; faq: string; contact: string; open: string };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    note: string;
  };
  products: {
    title: string;
    sub: string;
    status: Record<ProductStatus, string>;
    items: Product[];
  };
  freemium: {
    title: string;
    sub: string;
    columns: { title: string; text: string }[];
  };
  faq: { title: string; items: { q: string; a: string }[] };
  contact: { title: string; sub: string };
  closing: { title: string; sub: string; cta: string; cta2: string };
  footer: {
    slogan: string;
    portfolio: string;
    rights: string;
    about: string;
    colProducts: string;
    colExplore: string;
    colContact: string;
    soon: string;
  };
  wall: { free: string; brand: string; tools: string };
  ui: {
    theme: string;
    language: string;
    skip: string;
    pause: string;
    play: string;
    hint: string;
    hintTouch: string;
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
    title: "AI42E | AI cho mọi người, cho mọi việc",
    description:
      "AI42E gom những công cụ AI dễ dùng về một chỗ: làm video, chơi game và nhiều thứ nữa. Dùng miễn phí để bắt đầu, cần thêm thì nâng cấp.",
  },
  nav: { products: "Sản phẩm", pricing: "Chi phí", faq: "Hỏi đáp", contact: "Liên hệ", open: "Mở" },
  hero: {
    eyebrow: "AI dành cho tất cả mọi người",
    titleLine1: "AI cho mọi người,",
    titleLine2: "cho mọi việc.",
    sub: "Làm video, chơi game và nhiều thứ nữa. AI42E gom những công cụ AI dễ dùng về một chỗ, để ai cũng dùng được mà không cần biết kỹ thuật.",
    ctaPrimary: "Xem các sản phẩm",
    ctaSecondary: "Thử AI42E Studio",
    note: "Phần lớn dùng miễn phí. Bạn chỉ trả phí khi cần tính năng nâng cao.",
  },
  products: {
    title: "Sản phẩm của AI42E",
    sub: "Mỗi sản phẩm lo một việc cụ thể. Bạn cần gì thì mở cái đó.",
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
        tagline: "Làm video bằng AI: viết kịch bản, dựng hình, lồng tiếng rồi xuất ra file MP4, tất cả trong một ứng dụng.",
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
        tagline: "Một trang web gom nhiều công cụ AI. Mở lên là dùng, không phải cài gì.",
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
        tagline: "Tải video, nhạc và ảnh từ YouTube, TikTok, Facebook và nhiều nơi khác. Hiện đang bảo trì.",
        bullets: [
          "YouTube, TikTok, Instagram, Facebook, X, Pinterest, Douyin",
          "Trợ lý AI giúp lấy nội dung ở những trang khó",
          "Tạm thời chưa truy cập được",
        ],
        status: "maintenance",
      },
      {
        id: "game",
        icon: "game",
        name: "AI42E Game",
        tagline: "11 trò chơi cho hai người hoặc cả nhóm, chơi chung trên một chiếc điện thoại. Không cần tải, không cần đăng ký.",
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
        tagline: "Biến chữ thành giọng đọc nghe tự nhiên, dịch và nhân bản giọng nói.",
        bullets: [
          "Đọc văn bản bằng giọng AI",
          "Dịch và nhân bản giọng nói",
          "Ứng dụng máy tính",
        ],
        status: "soon",
      },
      {
        id: "trading",
        icon: "trading",
        name: "AI42E Trading System",
        tagline: "Hệ thống giao dịch tự động đang trong giai đoạn nghiên cứu. Chỉ để tham khảo, không phải lời khuyên đầu tư.",
        bullets: [
          "Đang trong giai đoạn nghiên cứu",
          "Chưa mở cho người dùng",
          "Không phải lời khuyên đầu tư",
        ],
        status: "research",
      },
    ],
  },
  freemium: {
    title: "Đa số dùng miễn phí, chỉ tính phí khi bạn cần nhiều hơn",
    sub: "AI42E muốn ai cũng được thử AI, còn khoản phí chỉ để giữ cho mọi thứ chạy ổn định.",
    columns: [
      {
        title: "Thử trước, không mất gì",
        text: "Nhiều công cụ dùng được ngay mà không cần biết kỹ thuật. Bạn cứ thử xem có hợp với mình không.",
      },
      {
        title: "Cần nhiều hơn thì nâng cấp",
        text: "Khi bạn dùng nhiều hoặc cần tính năng nâng cao, sẽ có gói trả phí. Giá luôn được ghi rõ trước khi bạn thanh toán.",
      },
      {
        title: "Vì sao phải trả phí",
        text: "Máy chủ, dịch vụ AI và việc bảo trì đều tốn tiền thật. Khoản phí giúp AI42E tiếp tục hoạt động và có thêm sản phẩm mới.",
      },
    ],
  },
  faq: {
    title: "Câu hỏi thường gặp",
    items: [
      {
        q: "AI42E là gì?",
        a: "AI42E là nơi gom những công cụ AI dễ dùng, để ai cũng có thể dùng AI trong công việc và giải trí hằng ngày. Khẩu hiệu của chúng tôi là AI for everyone and everything.",
      },
      {
        q: "Dùng AI42E có mất tiền không?",
        a: "Phần lớn là miễn phí để bạn bắt đầu. Nếu cần tính năng nâng cao thì mới phải trả phí, và giá luôn được ghi rõ trong từng sản phẩm.",
      },
      {
        q: "Bây giờ tôi dùng được những gì?",
        a: "AI42E Game dùng được ngay trên web. AI42E Studio sẽ ra mắt ngày 01/11/2026 và hiện đã có bản xem trước. DownloadAnything đang bảo trì, còn Voice Studio và OneForAll sắp ra mắt.",
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
    title: "Thử AI cùng AI42E nhé?",
    sub: "Chọn một sản phẩm đang chạy và dùng thử miễn phí, hoặc theo dõi AI42E để biết khi có sản phẩm mới.",
    cta: "Xem các sản phẩm",
    cta2: "Thử AI42E Studio",
  },
  footer: {
    slogan: "AI FOR EVERYONE AND EVERYTHING",
    portfolio: "Hồ sơ cá nhân của Mạnh",
    rights: "AI42E. Bảo lưu mọi quyền.",
    about: "AI42E gom những công cụ AI dễ dùng về một chỗ, để ai cũng dùng được AI.",
    colProducts: "Sản phẩm",
    colExplore: "Khám phá",
    colContact: "Liên hệ",
    soon: "Sắp ra mắt",
  },
  wall: { free: "Nhiều thứ miễn phí", brand: "AI42E", tools: "Làm video. Chơi game. Khám phá." },
  ui: {
    theme: "Đổi giao diện sáng/tối",
    language: "Đổi ngôn ngữ",
    skip: "Chuyển đến nội dung chính",
    pause: "Tạm dừng chuyển động",
    play: "Bật chuyển động",
    hint: "Di chuột để nhìn quanh",
    hintTouch: "Vuốt để nhìn quanh",
  },
};

const en: Content = {
  meta: {
    title: "AI42E | AI for everyone, for everything",
    description:
      "AI42E brings easy-to-use AI tools together in one place: make videos, play games and more. Start free, upgrade only when you need more.",
  },
  nav: { products: "Products", pricing: "Pricing", faq: "FAQ", contact: "Contact", open: "Open" },
  hero: {
    eyebrow: "AI for everyone",
    titleLine1: "AI for everyone,",
    titleLine2: "for everything.",
    sub: "Make videos, play games and more. AI42E brings easy-to-use AI tools together in one place, so anyone can use them without technical know-how.",
    ctaPrimary: "See the products",
    ctaSecondary: "Try AI42E Studio",
    note: "Most things are free. You only pay when you need advanced features.",
  },
  products: {
    title: "AI42E products",
    sub: "Each product does one job. Open the one you need.",
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
        tagline: "Make videos with AI: write the script, build the scenes, add the voice-over and export an MP4, all in one app.",
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
        tagline: "One website with many AI tools. Open it and start, nothing to install.",
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
        tagline: "Download video, music and images from YouTube, TikTok, Facebook and more. Currently under maintenance.",
        bullets: [
          "YouTube, TikTok, Instagram, Facebook, X, Pinterest, Douyin",
          "An AI assistant that captures media on tricky sites",
          "Temporarily unavailable",
        ],
        status: "maintenance",
      },
      {
        id: "game",
        icon: "game",
        name: "AI42E Game",
        tagline: "11 games for two or for a group, played on a single phone. No download, no sign-up.",
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
        tagline: "Turn text into natural-sounding speech, and translate or clone voices.",
        bullets: [
          "Read text aloud with AI voices",
          "Translate and clone voices",
          "Desktop app",
        ],
        status: "soon",
      },
      {
        id: "trading",
        icon: "trading",
        name: "AI42E Trading System",
        tagline: "An automated trading system in the research stage. For reference only, not investment advice.",
        bullets: [
          "Currently in research",
          "Not open to users yet",
          "Not investment advice",
        ],
        status: "research",
      },
    ],
  },
  freemium: {
    title: "Most of it is free, and you only pay when you need more",
    sub: "AI42E wants everyone to be able to try AI. The fees simply keep everything running smoothly.",
    columns: [
      {
        title: "Try it first, risk nothing",
        text: "Many tools work right away, with no technical know-how. Just try them and see if they fit.",
      },
      {
        title: "Upgrade when you need more",
        text: "If you use a lot or need advanced features, there is a paid plan. The price is always shown before you pay.",
      },
      {
        title: "Why there is a fee",
        text: "Servers, AI services and upkeep all cost real money. The fees let AI42E keep running and build new products.",
      },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "What is AI42E?",
        a: "AI42E brings easy-to-use AI tools together so anyone can use AI for work and play every day. Our motto is AI for everyone and everything.",
      },
      {
        q: "Does AI42E cost money?",
        a: "Most of it is free so you can get started. Only advanced features are paid, and the price is always shown inside each product.",
      },
      {
        q: "What can I use right now?",
        a: "AI42E Game works right now on the web. AI42E Studio launches on 1 Nov 2026 and already has a web preview. DownloadAnything is under maintenance, and Voice Studio and OneForAll are coming soon.",
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
    title: "Try AI with AI42E?",
    sub: "Pick a product that is live and try it for free, or follow AI42E to hear about new launches.",
    cta: "See the products",
    cta2: "Try AI42E Studio",
  },
  footer: {
    slogan: "AI FOR EVERYONE AND EVERYTHING",
    portfolio: "Manh's personal portfolio",
    rights: "AI42E. All rights reserved.",
    about: "AI42E brings easy-to-use AI tools together in one place, so anyone can use AI.",
    colProducts: "Products",
    colExplore: "Explore",
    colContact: "Contact",
    soon: "Coming soon",
  },
  wall: { free: "A lot is free", brand: "AI42E", tools: "Make videos. Play games. Explore." },
  ui: {
    theme: "Toggle light/dark theme",
    language: "Change language",
    skip: "Skip to main content",
    pause: "Pause motion",
    play: "Play motion",
    hint: "Move to look around",
    hintTouch: "Swipe to look around",
  },
};

export const CONTENT: Record<Locale, Content> = { vi, en };
