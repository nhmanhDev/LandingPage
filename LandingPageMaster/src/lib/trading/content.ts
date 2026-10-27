import type { Locale } from "@/lib/brand/content";

// Copy for invest.ai42e.com (and mmo.ai42e.com home). Written 2026-10-27; Mạnh approved it for now the same day ("tạm thế đi"), still open to edits.
// Facts come from the READMEs of the four trading repos and the vault note "AI42E Trading System"; no performance figures on purpose.

export interface TradingCard {
  title: string;
  text: string;
}

export interface TradingContent {
  meta: { title: string; description: string };
  nav: { home: string; cta: string; language: string; theme: string; skip: string };
  hero: { eyebrow: string; title: string; sub: string; ctaPrimary: string; ctaSecondary: string; note: string };
  work: { eyebrow: string; title: string; sub: string; cards: [TradingCard, TradingCard, TradingCard] };
  status: { eyebrow: string; title: string; items: { label: string; value: string }[] };
  risk: { title: string; points: string[] };
  closing: { eyebrow: string; title: string; sub: string; cta: string };
}

const vi: TradingContent = {
  meta: {
    title: "AI42E Trading — giao dịch tự động, đang nghiên cứu",
    description: "AI42E Trading đang nghiên cứu các công cụ giao dịch tự động. Chỉ để tham khảo, không phải lời khuyên đầu tư.",
  },
  nav: { home: "Về AI42E", cta: "Theo dõi AI42E", language: "Đổi ngôn ngữ", theme: "Đổi giao diện sáng tối", skip: "Đến phần nội dung" },
  hero: {
    eyebrow: "AI42E Trading · đang nghiên cứu",
    title: "Giao dịch tự động, đang ở giai đoạn nghiên cứu",
    sub: "AI42E đang thử xây một số công cụ giao dịch tự động: sao chép lệnh trên MetaTrader 5, điều phối nhiều tài khoản và bắt tín hiệu từ biểu đồ TradingView. Tất cả vẫn là nghiên cứu, chưa phải sản phẩm để bạn dùng hay đầu tư theo.",
    ctaPrimary: "Theo dõi AI42E",
    ctaSecondary: "Về AI42E",
    note: "Chỉ để tham khảo, không phải lời khuyên đầu tư.",
  },
  work: {
    eyebrow: "Đang nghiên cứu gì",
    title: "Ba hướng đang được thử",
    sub: "Mỗi hướng là một dự án riêng đang được làm thử trên máy, chưa mở cho người dùng bên ngoài.",
    cards: [
      {
        title: "Sao chép lệnh trên MetaTrader 5",
        text: "Một bảng điều khiển trung tâm để một tài khoản chính chia lệnh sang các tài khoản phụ, cấu hình và theo dõi ngay trên giao diện web chạy trên máy.",
      },
      {
        title: "Điều phối nhiều tài khoản",
        text: "Mở rộng cách làm trên cho nhiều nhà môi giới khác nhau nhưng vẫn đi qua một điểm điều khiển chung.",
      },
      {
        title: "Tín hiệu từ TradingView",
        text: "Nhận tín hiệu từ biểu đồ TradingView mà không cần gói trả phí hay webhook, rồi chuyển sang MetaTrader 5 qua một tệp trung gian.",
      },
    ],
  },
  status: {
    eyebrow: "Trạng thái",
    title: "Nói thật về hiện tại",
    items: [
      { label: "Giai đoạn", value: "Nghiên cứu" },
      { label: "Mở cho người dùng", value: "Chưa" },
      { label: "Kết quả giao dịch", value: "Trang này không công bố" },
    ],
  },
  risk: {
    title: "Cần biết trước khi đọc tiếp",
    points: [
      "Giao dịch có rủi ro. Bạn có thể mất một phần hoặc toàn bộ số vốn.",
      "Nội dung trên trang này chỉ để tham khảo và học hỏi. Đây không phải lời khuyên đầu tư, không kêu gọi mua hay bán và không hứa hẹn lợi nhuận.",
      "Hãy tự tìm hiểu và tự quyết định, hoặc hỏi một người có chuyên môn và giấy phép phù hợp.",
    ],
  },
  closing: {
    eyebrow: "Tin mới",
    title: "Muốn biết khi có tiến triển?",
    sub: "Mọi cập nhật chính thức của AI42E nằm ở các kênh bên dưới.",
    cta: "Xem các kênh chính thức",
  },
};

const en: TradingContent = {
  meta: {
    title: "AI42E Trading — automated trading, in research",
    description: "AI42E Trading is researching automated trading tools. For reference only, not investment advice.",
  },
  nav: { home: "About AI42E", cta: "Follow AI42E", language: "Change language", theme: "Switch light or dark", skip: "Skip to content" },
  hero: {
    eyebrow: "AI42E Trading · in research",
    title: "Automated trading, in the research stage",
    sub: "AI42E is trying out a few automated trading tools: copying orders on MetaTrader 5, coordinating several accounts and picking up signals from TradingView charts. All of it is still research, not a product to use or to invest by.",
    ctaPrimary: "Follow AI42E",
    ctaSecondary: "About AI42E",
    note: "For reference only, not investment advice.",
  },
  work: {
    eyebrow: "What is being researched",
    title: "Three directions being tried",
    sub: "Each one is a separate project being tried out locally, not open to outside users.",
    cards: [
      {
        title: "Copying orders on MetaTrader 5",
        text: "A central control panel where one main account passes orders to follower accounts, configured and watched from a web interface running locally.",
      },
      {
        title: "Coordinating several accounts",
        text: "Extending the same approach to several brokers while keeping a single point of control.",
      },
      {
        title: "Signals from TradingView",
        text: "Picking up signals from TradingView charts without a paid plan or webhooks, then passing them to MetaTrader 5 through an intermediate file.",
      },
    ],
  },
  status: {
    eyebrow: "Status",
    title: "Where things honestly stand",
    items: [
      { label: "Stage", value: "Research" },
      { label: "Open to users", value: "Not yet" },
      { label: "Trading results", value: "Not published on this page" },
    ],
  },
  risk: {
    title: "Please read this first",
    points: [
      "Trading is risky. You can lose part or all of your capital.",
      "Everything on this page is for reference and learning only. It is not investment advice, not a call to buy or sell, and no profit is promised.",
      "Do your own research and decide for yourself, or ask someone qualified and licensed.",
    ],
  },
  closing: {
    eyebrow: "News",
    title: "Want to know when there is progress?",
    sub: "Every official AI42E update appears on the channels below.",
    cta: "See the official channels",
  },
};

export const TRADING: Record<Locale, TradingContent> = { vi, en };
