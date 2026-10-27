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
  nav: { products: string; pricing: string; faq: string; contact: string; open: string; menu: string; cta: string };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    sub: string;
    ctaPrimary: string;
    note: string;
  };
  products: {
    eyebrow: string;
    title: string;
    sub: string;
    status: Record<ProductStatus, string>;
    items: Product[];
  };
  compare: {
    eyebrow: string;
    title: string;
    tone?: string;
    sub: string;
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
    columns: { title: string; text: string }[];
  };
  founder: { eyebrow: string; title: string; paragraphs: string[]; signature: string };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  contact: { title: string; sub: string };
  closing: { title: string; sub: string; cta: string; cta2: string; trust: string };
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
  nav: { products: "Sản phẩm", pricing: "Chi phí", faq: "Hỏi đáp", contact: "Liên hệ", open: "Mở", menu: "Mở menu", cta: "Xem sản phẩm" },
  hero: {
    eyebrow: "Dễ dùng, không cần biết kỹ thuật",
    titleLine1: "AI cho mọi người,",
    titleLine2: "cho mọi việc.",
    sub: "Làm video bằng AI, chơi game cùng bạn bè và nhiều công cụ khác đang đến. Mở ra là dùng được, không cần biết gì về kỹ thuật.",
    ctaPrimary: "Xem các sản phẩm",
    note: "Bạn có thể dùng miễn phí. Cần dùng nhiều hơn thì mới phải trả phí.",
  },
  products: {
    eyebrow: "Tất cả sản phẩm",
    title: "Hôm nay bạn muốn làm gì?",
    sub: "Chọn một sản phẩm, mở lên là dùng được ngay, không phải học thêm gì.",
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
        tagline: "Viết kịch bản, dựng hình, lồng tiếng và xuất file MP4: một ứng dụng làm hết cho bạn.",
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
        tagline: "Tải video, nhạc và ảnh từ YouTube, TikTok, Facebook và nhiều nơi khác.",
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
        tagline: "Biến chữ thành giọng đọc nghe tự nhiên, kèm dịch và nhân bản giọng nói. Ứng dụng cho Windows.",
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
  compare: {
    eyebrow: "Vì sao chọn AI42E",
    title: "Dùng AI đâu cần",
    tone: "phức tạp thế",
    sub: "Nhiều người muốn thử AI nhưng ngại chuyện cài đặt, kỹ thuật và tiền bạc. AI42E làm ngược lại.",
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
    columns: [
      {
        title: "Cứ thử trước",
        text: "Nhiều công cụ dùng được ngay, không cần biết kỹ thuật. Thấy hợp thì dùng tiếp, không hợp thì thôi.",
      },
      {
        title: "Cần nhiều hơn thì nâng cấp",
        text: "Nếu bạn dùng nhiều hoặc cần tính năng nâng cao, sẽ có gói trả phí. Giá luôn được ghi rõ trước khi bạn thanh toán.",
      },
      {
        title: "Phí dùng để làm gì",
        text: "Chạy máy chủ và các dịch vụ AI tốn tiền thật. Khoản phí giúp AI42E duy trì ổn định và làm thêm sản phẩm mới.",
      },
    ],
  },
  founder: {
    eyebrow: "Lời từ người làm ra AI42E",
    title: "Vì sao có AI42E?",
    paragraphs: [
      "AI đang thay đổi cách chúng ta làm việc, nhưng phần lớn công cụ vẫn khó dùng với người không rành kỹ thuật.",
      "Mình muốn làm một nơi mà ai cũng thử được AI: dễ dùng, và có nhiều thứ miễn phí. Khi bạn dùng nhiều hơn, khoản phí giúp mình duy trì hệ thống và làm thêm sản phẩm mới.",
      "Nếu bạn có ý kiến gì, cứ nhắn cho mình qua các kênh ở cuối trang nhé.",
    ],
    signature: "Mạnh, người làm ra AI42E",
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
    sub: "Chọn một sản phẩm đang chạy và dùng thử miễn phí, hoặc theo dõi AI42E để biết khi có sản phẩm mới.",
    cta: "Xem các sản phẩm",
    cta2: "Theo dõi AI42E",
    trust: "Miễn phí để bắt đầu · Không cần biết kỹ thuật",
  },
  footer: {
    slogan: "AI FOR EVERYONE AND EVERYTHING",
    portfolio: "Hồ sơ cá nhân của Mạnh",
    rights: "AI42E. Bảo lưu mọi quyền.",
    about: "Những công cụ AI dễ dùng, gom về một chỗ, dành cho mọi người.",
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
  },
};

const en: Content = {
  meta: {
    title: "AI42E | Easy AI tools for everyone",
    description:
      "Make videos with AI, play games with friends and more, all simple enough for anyone to use. Free to start.",
  },
  nav: { products: "Products", pricing: "Pricing", faq: "FAQ", contact: "Contact", open: "Open", menu: "Open menu", cta: "See products" },
  hero: {
    eyebrow: "Easy to use, no technical skills needed",
    titleLine1: "AI for everyone,",
    titleLine2: "for everything.",
    sub: "Make videos with AI, play games with friends and more tools on the way. Open it and it works, no technical know-how needed.",
    ctaPrimary: "See the products",
    note: "You can use it for free. You only pay when you need more.",
  },
  products: {
    eyebrow: "All products",
    title: "What do you want to do today?",
    sub: "Pick a product and start right away, with nothing new to learn.",
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
        tagline: "Write the script, build the scenes, add the voice-over and export an MP4: one app does it all.",
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
        tagline: "Download video, music and images from YouTube, TikTok, Facebook and more.",
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
        tagline: "Turn text into natural-sounding speech, with voice translation and cloning. A Windows app.",
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
  compare: {
    eyebrow: "Why AI42E",
    title: "Using AI should not be",
    tone: "this complicated",
    sub: "Plenty of people want to try AI but worry about setup, technical skills and cost. AI42E does the opposite.",
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
    columns: [
      {
        title: "Just try it first",
        text: "Many tools work right away, with no technical know-how. If it fits, keep going. If not, no harm done.",
      },
      {
        title: "Upgrade when you need more",
        text: "If you use a lot or need advanced features, there is a paid plan. The price is always shown before you pay.",
      },
      {
        title: "What the fees are for",
        text: "Running servers and AI services costs real money. The fees keep AI42E stable and let us build new products.",
      },
    ],
  },
  founder: {
    eyebrow: "A word from the maker",
    title: "Why AI42E exists",
    paragraphs: [
      "AI is changing how we work, but most tools are still hard to use if you are not technical.",
      "I wanted a place where anyone can try AI: easy to use, with plenty of free things. When you use more, the fees help me keep the system running and build new products.",
      "If you have thoughts, just message me through the channels at the bottom of the page.",
    ],
    signature: "Manh, maker of AI42E",
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
    sub: "Pick a product that is live and try it for free, or follow AI42E to hear about new launches.",
    cta: "See the products",
    cta2: "Follow AI42E",
    trust: "Free to start · No technical skills needed",
  },
  footer: {
    slogan: "AI FOR EVERYONE AND EVERYTHING",
    portfolio: "Manh's personal portfolio",
    rights: "AI42E. All rights reserved.",
    about: "Easy-to-use AI tools, brought together in one place, for everyone.",
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
  },
};

export const CONTENT: Record<Locale, Content> = { vi, en };
