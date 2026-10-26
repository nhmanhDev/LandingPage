export type Locale = "vi" | "en";

export type ProductStatus = "free" | "freemium" | "soon" | "research";

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
  footer: { slogan: string; portfolio: string; rights: string };
  ui: { theme: string; language: string; skip: string };
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
    title: "AI42E — AI cho mọi người, cho mọi việc",
    description:
      "AI42E là nền tảng giúp nhiều người tiếp cận AI dễ dàng, với nhiều sản phẩm trong cùng một hệ sinh thái. Bắt đầu miễn phí, nâng cao khi bạn cần.",
  },
  nav: { products: "Sản phẩm", pricing: "Giá", faq: "Hỏi đáp", contact: "Liên hệ", open: "Mở" },
  hero: {
    eyebrow: "Nền tảng AI cho mọi người",
    titleLine1: "AI cho mọi người,",
    titleLine2: "cho mọi việc.",
    sub: "AI42E gom các công cụ AI dễ dùng vào một nơi: tạo video, tải nội dung, chơi game và nhiều thứ khác. Bắt đầu miễn phí, không cần biết kỹ thuật.",
    ctaPrimary: "Khám phá sản phẩm",
    ctaSecondary: "Xem AI42E Studio",
    note: "Nhiều thứ miễn phí. Dùng nâng cao thì mới trả phí.",
  },
  products: {
    title: "Một nhà, nhiều sản phẩm",
    sub: "Mỗi sản phẩm giải một việc cụ thể. Chọn cái bạn cần và bắt đầu.",
    status: {
      free: "Miễn phí",
      freemium: "Miễn phí giai đoạn đầu",
      soon: "Sắp ra mắt",
      research: "Đang nghiên cứu",
    },
    items: [
      {
        id: "studio",
        icon: "studio",
        name: "AI42E Studio",
        tagline: "Tạo video bằng AI từ ý tưởng đến file MP4.",
        bullets: [
          "Viết kịch bản, dựng hình, lồng tiếng tự động",
          "Tải và dịch video từ nhiều nền tảng",
          "Ứng dụng máy tính, ra mắt 01/11/2026",
        ],
        status: "freemium",
        href: "https://studio.ai42e.com",
        cta: "Xem AI42E Studio",
      },
      {
        id: "oneforall",
        icon: "oneforall",
        name: "OneForAll",
        tagline: "Nhiều công cụ AI dùng ngay trong trình duyệt.",
        bullets: [
          "Vào là dùng, một số công cụ không cần đăng nhập",
          "Tải video, đọc văn bản thành giọng nói, dịch tài liệu",
          "Cần nâng cao thì mới trả phí",
        ],
        status: "soon",
      },
      {
        id: "download",
        icon: "download",
        name: "DownloadAnything",
        tagline: "Tải video, âm thanh và ảnh từ nhiều nền tảng.",
        bullets: [
          "YouTube, TikTok, Instagram, Facebook, X, Pinterest, Douyin",
          "Có trợ lý AI bắt nội dung ở những trang khó",
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
        tagline: "11 game chơi chung một máy cho cặp đôi và nhóm bạn.",
        bullets: [
          "Chạy ngay trên trình duyệt",
          "Không cần tài khoản",
          "Truth or Dare, bầu cua, ô ăn quan, câu đố và hơn thế",
        ],
        status: "free",
        href: "https://play.ai42e.com",
        cta: "Chơi ngay",
      },
      {
        id: "voice",
        icon: "voice",
        name: "Voice Studio",
        tagline: "Biến văn bản thành giọng nói tự nhiên.",
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
        tagline: "Nghiên cứu hệ thống giao dịch tự động.",
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
    title: "Bắt đầu miễn phí. Cần nhiều hơn thì mới trả phí.",
    sub: "Chúng tôi nói rõ ngay từ đầu để bạn không bất ngờ.",
    columns: [
      {
        title: "Miễn phí để bắt đầu",
        text: "Nhiều công cụ dùng được ngay, không cần biết kỹ thuật. Bạn thử trước, thấy hợp rồi mới tính tiếp.",
      },
      {
        title: "Nâng cao khi bạn cần",
        text: "Cần xử lý nhiều hơn hoặc tính năng chuyên sâu thì dùng gói nâng cao. Giá luôn được ghi rõ trước khi bạn trả.",
      },
      {
        title: "Vì sao có phí",
        text: "Máy chủ, API AI và công sức bảo trì đều tốn chi phí. Khoản phí giúp AI42E duy trì lâu dài.",
      },
    ],
  },
  faq: {
    title: "Hỏi đáp nhanh",
    items: [
      {
        q: "AI42E là gì?",
        a: "AI42E là nền tảng giúp nhiều người tiếp cận AI dễ dàng, với nhiều sản phẩm trong cùng một hệ sinh thái. Tầm nhìn của chúng tôi: AI for everyone and everything.",
      },
      {
        q: "Dùng AI42E có mất phí không?",
        a: "Nhiều thứ miễn phí để bạn bắt đầu. Khi dùng nâng cao thì mới có phí, để chúng tôi duy trì được hệ thống. Giá được ghi rõ trong từng sản phẩm.",
      },
      {
        q: "Sản phẩm nào dùng được ngay?",
        a: "DownloadAnything và AI42E Game dùng được ngay trên web. AI42E Studio ra mắt ngày 01/11/2026. Voice Studio và OneForAll sắp ra mắt.",
      },
      {
        q: "Kênh liên hệ chính thức ở đâu?",
        a: "Các kênh ở mục Liên hệ bên dưới là kênh chính thức duy nhất của AI42E. Hãy cẩn thận với tài khoản giả mạo.",
      },
    ],
  },
  contact: {
    title: "Liên hệ chính thức",
    sub: "Mọi thông tin và hỗ trợ của AI42E chỉ đi qua các kênh này.",
  },
  footer: {
    slogan: "AI FOR EVERYONE AND EVERYTHING",
    portfolio: "Hồ sơ cá nhân của Mạnh",
    rights: "AI42E. Mọi quyền được bảo lưu.",
  },
  ui: { theme: "Đổi giao diện sáng/tối", language: "Đổi ngôn ngữ", skip: "Bỏ qua điều hướng" },
};

const en: Content = {
  meta: {
    title: "AI42E — AI for everyone, for everything",
    description:
      "AI42E is a platform that makes AI easy for everyone, with many products in one ecosystem. Start free, go further when you need to.",
  },
  nav: { products: "Products", pricing: "Pricing", faq: "FAQ", contact: "Contact", open: "Open" },
  hero: {
    eyebrow: "The AI platform for everyone",
    titleLine1: "AI for everyone,",
    titleLine2: "for everything.",
    sub: "AI42E brings easy-to-use AI tools together in one place: make videos, download content, play games and more. Start free, no technical skills needed.",
    ctaPrimary: "Explore products",
    ctaSecondary: "See AI42E Studio",
    note: "A lot is free. You only pay when you go advanced.",
  },
  products: {
    title: "One home, many products",
    sub: "Each product solves one specific job. Pick what you need and start.",
    status: {
      free: "Free",
      freemium: "Free in the early period",
      soon: "Coming soon",
      research: "In research",
    },
    items: [
      {
        id: "studio",
        icon: "studio",
        name: "AI42E Studio",
        tagline: "Make AI videos from an idea to an MP4 file.",
        bullets: [
          "Script, visuals and voice-over, automated",
          "Download and translate videos from many platforms",
          "Desktop app, launching 1 Nov 2026",
        ],
        status: "freemium",
        href: "https://studio.ai42e.com",
        cta: "See AI42E Studio",
      },
      {
        id: "oneforall",
        icon: "oneforall",
        name: "OneForAll",
        tagline: "Many AI tools you can use right in the browser.",
        bullets: [
          "Open and use, some tools need no sign-in",
          "Video download, text to speech, document translation",
          "Pay only when you need advanced features",
        ],
        status: "soon",
      },
      {
        id: "download",
        icon: "download",
        name: "DownloadAnything",
        tagline: "Download video, audio and images from many platforms.",
        bullets: [
          "YouTube, TikTok, Instagram, Facebook, X, Pinterest, Douyin",
          "An AI assistant that catches media on tricky sites",
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
        tagline: "11 pass-and-play games for couples and friends.",
        bullets: [
          "Runs right in the browser",
          "No account needed",
          "Truth or Dare, Bau Cua, O An Quan, quizzes and more",
        ],
        status: "free",
        href: "https://play.ai42e.com",
        cta: "Play now",
      },
      {
        id: "voice",
        icon: "voice",
        name: "Voice Studio",
        tagline: "Turn text into natural-sounding speech.",
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
        tagline: "Research into automated trading systems.",
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
    title: "Start free. Pay only when you need more.",
    sub: "We say it up front so nothing comes as a surprise.",
    columns: [
      {
        title: "Free to start",
        text: "Many tools work right away, no technical skills needed. Try first, decide later.",
      },
      {
        title: "Advanced when you need it",
        text: "Need more volume or deeper features? Move to an advanced plan. The price is always shown before you pay.",
      },
      {
        title: "Why there is a fee",
        text: "Servers, AI APIs and upkeep all cost money. The fees keep AI42E running for the long term.",
      },
    ],
  },
  faq: {
    title: "Quick answers",
    items: [
      {
        q: "What is AI42E?",
        a: "AI42E is a platform that makes AI easy for many people, with many products in one ecosystem. Our vision: AI for everyone and everything.",
      },
      {
        q: "Does AI42E cost money?",
        a: "A lot is free so you can start. Advanced use has a fee so we can keep the system running. Prices are shown clearly inside each product.",
      },
      {
        q: "Which products can I use now?",
        a: "DownloadAnything and AI42E Game work right now on the web. AI42E Studio launches on 1 Nov 2026. Voice Studio and OneForAll are coming soon.",
      },
      {
        q: "Where are the official contact channels?",
        a: "The channels in the Contact section below are the only official AI42E channels. Beware of fake accounts.",
      },
    ],
  },
  contact: {
    title: "Official contact",
    sub: "All AI42E information and support goes through these channels only.",
  },
  footer: {
    slogan: "AI FOR EVERYONE AND EVERYTHING",
    portfolio: "Manh's personal portfolio",
    rights: "AI42E. All rights reserved.",
  },
  ui: { theme: "Toggle light/dark theme", language: "Change language", skip: "Skip navigation" },
};

export const CONTENT: Record<Locale, Content> = { vi, en };
