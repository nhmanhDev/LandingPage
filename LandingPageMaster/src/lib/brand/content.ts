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
    title: "AI42E — AI cho mọi người, cho mọi việc",
    description:
      "AI42E tập hợp những công cụ AI dễ dùng trong một nền tảng: tạo video, chơi game và nhiều hơn thế. Bắt đầu miễn phí, nâng cấp khi bạn cần.",
  },
  nav: { products: "Sản phẩm", pricing: "Chi phí", faq: "Hỏi đáp", contact: "Liên hệ", open: "Mở" },
  hero: {
    eyebrow: "Nền tảng AI cho mọi người",
    titleLine1: "AI cho mọi người,",
    titleLine2: "cho mọi việc.",
    sub: "AI42E tập hợp những công cụ AI dễ dùng trong một nền tảng duy nhất: tạo video, chơi game và nhiều hơn thế. Bắt đầu miễn phí, không cần kiến thức kỹ thuật.",
    ctaPrimary: "Khám phá sản phẩm",
    ctaSecondary: "Xem AI42E Studio",
    note: "Nhiều công cụ miễn phí. Bạn chỉ trả phí khi cần tính năng nâng cao.",
  },
  products: {
    title: "Nhiều sản phẩm, một hệ sinh thái",
    sub: "Mỗi sản phẩm giải quyết một việc cụ thể. Chọn thứ bạn cần và bắt đầu ngay.",
    status: {
      free: "Miễn phí",
      freemium: "Miễn phí thời gian đầu",
      soon: "Sắp ra mắt",
      research: "Đang nghiên cứu",
      maintenance: "Đang bảo trì",
    },
    items: [
      {
        id: "studio",
        icon: "studio",
        name: "AI42E Studio",
        tagline: "Biến ý tưởng thành video hoàn chỉnh bằng AI, từ kịch bản đến file MP4.",
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
        tagline: "Nhiều công cụ AI dùng ngay trên trình duyệt, không cần cài đặt.",
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
        tagline: "Tải video, âm thanh và hình ảnh từ nhiều nền tảng.",
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
        tagline: "11 trò chơi cho cặp đôi và nhóm bạn, chơi chung trên một thiết bị.",
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
        tagline: "Nghiên cứu hệ thống giao dịch tự động. Không phải lời khuyên đầu tư.",
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
    title: "Miễn phí để bắt đầu. Trả phí khi bạn cần nhiều hơn.",
    sub: "Minh bạch ngay từ đầu, để bạn luôn biết mình đang dùng gì và trả cho điều gì.",
    columns: [
      {
        title: "Miễn phí để bắt đầu",
        text: "Nhiều công cụ dùng được ngay, không cần kiến thức kỹ thuật. Bạn trải nghiệm trước, thấy phù hợp rồi hãy quyết định.",
      },
      {
        title: "Nâng cấp khi cần",
        text: "Cần xử lý khối lượng lớn hơn hoặc tính năng chuyên sâu? Chọn gói nâng cao. Giá luôn được hiển thị rõ trước khi bạn thanh toán.",
      },
      {
        title: "Vì sao có phí",
        text: "Máy chủ, API AI và việc bảo trì đều có chi phí thật. Khoản phí giúp AI42E hoạt động ổn định và phát triển lâu dài.",
      },
    ],
  },
  faq: {
    title: "Câu hỏi thường gặp",
    items: [
      {
        q: "AI42E là gì?",
        a: "AI42E là nền tảng giúp nhiều người tiếp cận AI dễ dàng, với nhiều sản phẩm trong cùng một hệ sinh thái. Tầm nhìn của chúng tôi: AI for everyone and everything.",
      },
      {
        q: "Dùng AI42E có mất phí không?",
        a: "Nhiều sản phẩm miễn phí để bạn bắt đầu. Chỉ khi dùng các tính năng nâng cao mới có phí, để chúng tôi duy trì hệ thống. Giá được ghi rõ trong từng sản phẩm.",
      },
      {
        q: "Hiện tại tôi dùng được sản phẩm nào?",
        a: "AI42E Game dùng được ngay trên web. AI42E Studio ra mắt ngày 01/11/2026 và đã có bản xem trước trên web. DownloadAnything đang bảo trì, còn Voice Studio và OneForAll sắp ra mắt.",
      },
      {
        q: "Kênh liên hệ chính thức của AI42E là gì?",
        a: "Các kênh ở cuối trang là kênh chính thức duy nhất của AI42E. Hãy thận trọng với các tài khoản giả mạo.",
      },
    ],
  },
  contact: {
    title: "Liên hệ chính thức",
    sub: "Đây là các kênh chính thức duy nhất của AI42E.",
  },
  closing: {
    title: "Sẵn sàng thử AI cùng AI42E?",
    sub: "Bắt đầu miễn phí với những sản phẩm đang hoạt động, hoặc theo dõi chúng tôi để biết khi có sản phẩm mới.",
    cta: "Khám phá sản phẩm",
    cta2: "Xem AI42E Studio",
  },
  footer: {
    slogan: "AI FOR EVERYONE AND EVERYTHING",
    portfolio: "Hồ sơ cá nhân của Mạnh",
    rights: "AI42E. Bảo lưu mọi quyền.",
    about: "Nền tảng giúp mọi người tiếp cận AI dễ dàng, với nhiều sản phẩm trong cùng một hệ sinh thái.",
    colProducts: "Sản phẩm",
    colExplore: "Khám phá",
    colContact: "Liên hệ",
    soon: "Sắp ra mắt",
  },
  wall: { free: "Nhiều thứ miễn phí", brand: "AI42E", tools: "Tạo. Chơi. Khám phá." },
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
    title: "AI42E — AI for everyone, for everything",
    description:
      "AI42E brings easy-to-use AI tools together in one platform: create videos, play games and more. Start free, upgrade when you need to.",
  },
  nav: { products: "Products", pricing: "Pricing", faq: "FAQ", contact: "Contact", open: "Open" },
  hero: {
    eyebrow: "The AI platform for everyone",
    titleLine1: "AI for everyone,",
    titleLine2: "for everything.",
    sub: "AI42E brings easy-to-use AI tools together in one platform: create videos, play games and more. Start free, no technical skills required.",
    ctaPrimary: "Explore products",
    ctaSecondary: "See AI42E Studio",
    note: "Many tools are free. You only pay when you need advanced features.",
  },
  products: {
    title: "Many products, one ecosystem",
    sub: "Each product solves one specific job. Pick what you need and get started.",
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
        tagline: "Turn an idea into a finished video with AI, from script to MP4.",
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
        tagline: "Many AI tools you can use right in your browser, no install needed.",
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
        tagline: "Download video, audio and images from many platforms.",
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
        tagline: "11 games for couples and friends, played together on a single device.",
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
        tagline: "Research into automated trading systems. Not investment advice.",
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
    title: "Free to start. Pay when you need more.",
    sub: "Transparent from day one, so you always know what you use and what you pay for.",
    columns: [
      {
        title: "Free to start",
        text: "Many tools work right away, no technical skills needed. Try first, decide when it feels right.",
      },
      {
        title: "Upgrade when you need it",
        text: "Need more volume or deeper features? Choose an advanced plan. The price is always shown before you pay.",
      },
      {
        title: "Why there is a fee",
        text: "Servers, AI APIs and maintenance all cost real money. The fees keep AI42E reliable and growing over the long term.",
      },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "What is AI42E?",
        a: "AI42E is a platform that makes AI easy for many people, with many products in one ecosystem. Our vision: AI for everyone and everything.",
      },
      {
        q: "Is AI42E free to use?",
        a: "Many products are free so you can get started. Only advanced features have a fee, which lets us keep the system running. Prices are shown clearly inside each product.",
      },
      {
        q: "Which products can I use today?",
        a: "AI42E Game works right now on the web. AI42E Studio launches on 1 Nov 2026 and has a web preview. DownloadAnything is under maintenance, and Voice Studio and OneForAll are coming soon.",
      },
      {
        q: "What are the official AI42E channels?",
        a: "The channels at the bottom of this page are the only official AI42E channels. Beware of fake accounts.",
      },
    ],
  },
  contact: {
    title: "Official contact",
    sub: "These are the only official AI42E channels.",
  },
  closing: {
    title: "Ready to try AI with AI42E?",
    sub: "Start free with what is live today, or follow us to hear about new launches.",
    cta: "Explore products",
    cta2: "See AI42E Studio",
  },
  footer: {
    slogan: "AI FOR EVERYONE AND EVERYTHING",
    portfolio: "Manh's personal portfolio",
    rights: "AI42E. All rights reserved.",
    about: "A platform that makes AI easy for everyone, with many products in one ecosystem.",
    colProducts: "Products",
    colExplore: "Explore",
    colContact: "Contact",
    soon: "Coming soon",
  },
  wall: { free: "A lot is free", brand: "AI42E", tools: "Make. Play. Explore." },
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
