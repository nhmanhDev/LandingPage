import type { Locale } from "./content";

export type LegalDoc = "privacy" | "terms";

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface LegalPageContent {
  /** Browser tab title and meta description. */
  meta: { title: string; description: string };
  title: string;
  intro: string;
  sections: LegalSection[];
}

export interface LegalUi {
  back: string;
  updated: string;
  otherDoc: Record<LegalDoc, string>;
  nav: string;
}

/** Last time the wording of either page was reviewed (ISO date, rendered per locale). */
export const LEGAL_UPDATED = "2026-11-12";

export const LEGAL_UI: Record<Locale, LegalUi> = {
  vi: {
    back: "Về trang chủ",
    updated: "Cập nhật lần cuối",
    otherDoc: { privacy: "Chính sách quyền riêng tư", terms: "Điều khoản sử dụng" },
    nav: "Tài liệu pháp lý",
  },
  en: {
    back: "Back to home",
    updated: "Last updated",
    otherDoc: { privacy: "Privacy Policy", terms: "Terms of Use" },
    nav: "Legal documents",
  },
};

export const LEGAL: Record<Locale, Record<LegalDoc, LegalPageContent>> = {
  vi: {
    privacy: {
      meta: {
        title: "Chính sách quyền riêng tư | AI42E",
        description:
          "AI42E lưu và dùng dữ liệu của bạn như thế nào khi bạn xem trang ai42e.com: dữ liệu lưu trên trình duyệt, email liên hệ, nhật ký kỹ thuật và quyền của bạn.",
      },
      title: "Chính sách quyền riêng tư",
      intro:
        "Trang này giải thích AI42E thu thập gì khi bạn xem ai42e.com, dùng vào việc gì và bạn có những quyền nào. Chúng tôi cố viết ngắn, đúng với những gì trang đang làm thật.",
      sections: [
        {
          heading: "1. Phạm vi áp dụng",
          paragraphs: [
            "Chính sách này áp dụng cho website ai42e.com và các trang do chúng tôi vận hành cùng hệ thống (ví dụ trang blog). Mỗi sản phẩm có phần mềm hoặc tài khoản riêng, như AI42E Studio, Voice Studio, DownloadAnything hay AI42E Game, có thể xử lý thêm dữ liệu khác và sẽ có thông báo riêng trong sản phẩm đó.",
          ],
        },
        {
          heading: "2. Dữ liệu chúng tôi xử lý",
          paragraphs: ["Khi bạn chỉ xem trang, chúng tôi không yêu cầu tài khoản và không có biểu mẫu nào gửi dữ liệu lên máy chủ của chúng tôi."],
          items: [
            "Lựa chọn giao diện: ngôn ngữ (Tiếng Việt hoặc English) và giao diện sáng hoặc tối được lưu ngay trên trình duyệt của bạn (localStorage). Dữ liệu này không được gửi đi đâu. Bạn xoá được bằng cách xoá dữ liệu trang web trong trình duyệt.",
            "Email bạn tự gửi: ô đăng ký bản tin ở chân trang chỉ mở ứng dụng email trên máy bạn với thư soạn sẵn. Chúng tôi chỉ nhận email của bạn khi bạn bấm Gửi trong ứng dụng đó, hoặc khi bạn chủ động viết thư cho chúng tôi.",
            "Nhật ký kỹ thuật: nhà cung cấp hạ tầng có thể ghi lại địa chỉ IP, loại trình duyệt, trang được mở và thời điểm truy cập để vận hành, chống tấn công và phát hiện lỗi.",
            "Blog: người đọc không cần đăng nhập. Khu vực quản trị chỉ dành cho người vận hành và dùng tài khoản đăng nhập riêng.",
          ],
        },
        {
          heading: "3. Cookie và công cụ theo dõi",
          paragraphs: [
            "Trang chủ hiện không dùng cookie quảng cáo và không gắn công cụ phân tích hay theo dõi của bên thứ ba. Nhà cung cấp hạ tầng hoặc mạng phân phối nội dung có thể đặt cookie kỹ thuật cần cho việc vận hành và bảo mật. Nếu sau này chúng tôi thêm công cụ phân tích, trang này sẽ được cập nhật trước khi áp dụng.",
          ],
        },
        {
          heading: "4. Bên thứ ba",
          items: [
            "Cloudflare: lưu trữ và phân phối website.",
            "Supabase: lưu nội dung blog và tài khoản quản trị.",
            "Mạng xã hội (YouTube, Facebook, Telegram, GitHub) và email: khi bạn bấm vào các liên kết này, bạn rời khỏi AI42E và áp dụng chính sách của từng nền tảng.",
          ],
        },
        {
          heading: "5. Chia sẻ dữ liệu",
          paragraphs: [
            "Chúng tôi không bán dữ liệu của bạn. Chúng tôi chỉ chia sẻ khi cần để vận hành dịch vụ (với các nhà cung cấp nêu trên), khi pháp luật yêu cầu, hoặc khi bạn đồng ý.",
          ],
        },
        {
          heading: "6. Thời gian lưu giữ",
          paragraphs: [
            "Email bạn gửi cho chúng tôi được giữ trong thời gian cần để trả lời và hỗ trợ bạn, rồi xoá khi không còn cần. Nhật ký kỹ thuật do nhà cung cấp hạ tầng giữ theo chính sách của họ.",
          ],
        },
        {
          heading: "7. Quyền của bạn",
          paragraphs: [
            "Bạn có thể yêu cầu xem, sửa hoặc xoá dữ liệu cá nhân mà chúng tôi đang giữ về bạn, hoặc rút lại sự đồng ý đã cho. Hãy gửi yêu cầu tới email ở mục 10; chúng tôi sẽ phản hồi trong thời gian hợp lý.",
          ],
        },
        {
          heading: "8. Trẻ em",
          paragraphs: [
            "Website không nhắm tới trẻ em dưới 13 tuổi và chúng tôi không cố ý thu thập dữ liệu của các em. Nếu bạn cho rằng một em nhỏ đã gửi thông tin cho chúng tôi, hãy liên hệ để chúng tôi xoá.",
          ],
        },
        {
          heading: "9. Thay đổi chính sách",
          paragraphs: ["Khi cách chúng tôi xử lý dữ liệu thay đổi, chúng tôi cập nhật trang này và ngày cập nhật ở đầu trang."],
        },
        {
          heading: "10. Liên hệ",
          paragraphs: ["Mọi câu hỏi về quyền riêng tư, vui lòng gửi tới nhmanh.dev@gmail.com."],
        },
      ],
    },
    terms: {
      meta: {
        title: "Điều khoản sử dụng | AI42E",
        description:
          "Điều khoản khi bạn dùng website ai42e.com và các sản phẩm AI42E: cách dùng hợp lệ, quyền sở hữu, giới hạn trách nhiệm và liên hệ.",
      },
      title: "Điều khoản sử dụng",
      intro:
        "Khi truy cập ai42e.com, bạn đồng ý với các điều khoản dưới đây. Nếu không đồng ý, vui lòng ngừng sử dụng website.",
      sections: [
        {
          heading: "1. Về AI42E",
          paragraphs: [
            "AI42E là hệ sinh thái các công cụ và ứng dụng AI do Mạnh phát triển và vận hành. Website này giới thiệu sản phẩm và dẫn bạn tới từng sản phẩm.",
          ],
        },
        {
          heading: "2. Sản phẩm và tính khả dụng",
          paragraphs: [
            "Sản phẩm có trạng thái khác nhau (miễn phí, sắp ra mắt, đang nghiên cứu, đang bảo trì). Chúng tôi có thể thay đổi, tạm ngưng hoặc ngừng một sản phẩm hay tính năng, và thay đổi mức phí hoặc điều kiện sử dụng. Với sản phẩm thu phí, điều kiện cụ thể sẽ được nêu tại sản phẩm đó trước khi bạn thanh toán.",
          ],
        },
        {
          heading: "3. Cách sử dụng hợp lệ",
          paragraphs: ["Bạn đồng ý không:"],
          items: [
            "dùng website hoặc sản phẩm vào mục đích vi phạm pháp luật hoặc xâm phạm quyền của người khác;",
            "tấn công, dò quét lỗ hổng, làm quá tải hoặc cố truy cập trái phép vào hệ thống;",
            "sao chép hàng loạt nội dung, mã nguồn hoặc giao diện để bán lại hay mạo danh AI42E.",
          ],
        },
        {
          heading: "4. Sở hữu trí tuệ",
          paragraphs: [
            "Tên AI42E, logo, giao diện, hình ảnh và nội dung trên website thuộc về AI42E hoặc bên cấp phép cho chúng tôi, trừ khi có ghi chú khác. Mã nguồn công khai trên GitHub tuân theo giấy phép ghi trong từng kho mã. Bạn không được dùng tên hay logo AI42E theo cách khiến người khác hiểu nhầm là sản phẩm hoặc đối tác chính thức.",
          ],
        },
        {
          heading: "5. Nội dung do AI tạo ra",
          paragraphs: [
            "Kết quả từ các công cụ AI có thể chưa chính xác hoặc không phù hợp. Bạn tự chịu trách nhiệm kiểm tra trước khi sử dụng, nhất là với nội dung đăng công khai hoặc dùng cho công việc.",
          ],
        },
        {
          heading: "6. Không phải lời khuyên đầu tư",
          paragraphs: [
            "Nội dung về Trading System và nghiên cứu thị trường chỉ nhằm cung cấp thông tin và thử nghiệm kỹ thuật, không phải lời khuyên đầu tư, tài chính hay pháp lý. Đầu tư có rủi ro; quyết định và kết quả là của bạn.",
          ],
        },
        {
          heading: "7. Liên kết bên ngoài",
          paragraphs: [
            "Website có liên kết tới trang của bên thứ ba (mạng xã hội, GitHub, các tên miền con và sản phẩm riêng). Chúng tôi không kiểm soát và không chịu trách nhiệm về nội dung hay chính sách của các trang đó.",
          ],
        },
        {
          heading: "8. Miễn trừ và giới hạn trách nhiệm",
          paragraphs: [
            "Website và sản phẩm được cung cấp theo hiện trạng, không có bảo đảm rằng luôn hoạt động liên tục hoặc không lỗi. Trong phạm vi pháp luật cho phép, AI42E không chịu trách nhiệm cho thiệt hại gián tiếp hoặc mất mát phát sinh từ việc bạn sử dụng hay không thể sử dụng website và sản phẩm.",
          ],
        },
        {
          heading: "9. Thay đổi điều khoản",
          paragraphs: [
            "Chúng tôi có thể cập nhật điều khoản này. Phiên bản mới có hiệu lực khi đăng tại đây; việc bạn tiếp tục sử dụng website nghĩa là bạn chấp nhận phiên bản đó.",
          ],
        },
        {
          heading: "10. Luật áp dụng và liên hệ",
          paragraphs: [
            "Điều khoản này chịu sự điều chỉnh của pháp luật Việt Nam. Mọi câu hỏi hoặc phản hồi, vui lòng gửi tới nhmanh.dev@gmail.com.",
          ],
        },
      ],
    },
  },
  en: {
    privacy: {
      meta: {
        title: "Privacy Policy | AI42E",
        description:
          "How AI42E handles your data when you visit ai42e.com: data kept in your browser, contact email, technical logs, and your rights.",
      },
      title: "Privacy Policy",
      intro:
        "This page explains what AI42E collects when you visit ai42e.com, what it is used for, and the rights you have. We keep it short and true to what the site actually does.",
      sections: [
        {
          heading: "1. Scope",
          paragraphs: [
            "This policy covers the ai42e.com website and the pages we run alongside it (for example the blog). Individual products with their own software or accounts, such as AI42E Studio, Voice Studio, DownloadAnything or AI42E Game, may handle additional data and will carry their own notice.",
          ],
        },
        {
          heading: "2. Data we handle",
          paragraphs: ["If you only browse, we ask for no account and no form on this site sends data to our servers."],
          items: [
            "Display choices: your language (Vietnamese or English) and light or dark theme are stored in your own browser (localStorage). They are not sent anywhere. Clear them by clearing the site's data in your browser.",
            "Emails you send: the newsletter box in the footer only opens the email app on your device with a prepared message. We receive your address only if you press Send in that app, or if you write to us yourself.",
            "Technical logs: our infrastructure provider may record IP address, browser type, requested page and time of access to run the service, block attacks and find faults.",
            "Blog: readers do not need to sign in. The admin area is for the site operator only and uses a separate sign-in.",
          ],
        },
        {
          heading: "3. Cookies and tracking",
          paragraphs: [
            "The home page currently uses no advertising cookies and loads no third-party analytics or tracking tools. Our hosting or content-delivery provider may set technical cookies needed for operation and security. If we add analytics later, this page will be updated before it goes live.",
          ],
        },
        {
          heading: "4. Third parties",
          items: [
            "Cloudflare: hosting and delivery of the website.",
            "Supabase: storage of blog content and the admin account.",
            "Social networks (YouTube, Facebook, Telegram, GitHub) and email: when you follow these links you leave AI42E and each platform's own policy applies.",
          ],
        },
        {
          heading: "5. Sharing",
          paragraphs: [
            "We do not sell your data. We share it only when needed to run the service (with the providers above), when the law requires it, or with your consent.",
          ],
        },
        {
          heading: "6. Retention",
          paragraphs: [
            "Emails you send us are kept as long as needed to reply and support you, then deleted. Technical logs are kept by our infrastructure provider under its own policy.",
          ],
        },
        {
          heading: "7. Your rights",
          paragraphs: [
            "You may ask to see, correct or delete personal data we hold about you, or withdraw consent you gave. Email the address in section 10 and we will reply within a reasonable time.",
          ],
        },
        {
          heading: "8. Children",
          paragraphs: [
            "The website is not aimed at children under 13 and we do not knowingly collect their data. If you believe a child has sent us information, contact us and we will delete it.",
          ],
        },
        {
          heading: "9. Changes",
          paragraphs: ["When how we handle data changes, we update this page and the date at the top."],
        },
        {
          heading: "10. Contact",
          paragraphs: ["For any privacy question, email nhmanh.dev@gmail.com."],
        },
      ],
    },
    terms: {
      meta: {
        title: "Terms of Use | AI42E",
        description:
          "The terms for using ai42e.com and AI42E products: acceptable use, ownership, limits of liability and how to reach us.",
      },
      title: "Terms of Use",
      intro:
        "By visiting ai42e.com you agree to the terms below. If you do not agree, please stop using the website.",
      sections: [
        {
          heading: "1. About AI42E",
          paragraphs: [
            "AI42E is an ecosystem of AI tools and apps built and run by Manh. This website introduces the products and sends you to each one.",
          ],
        },
        {
          heading: "2. Products and availability",
          paragraphs: [
            "Products have different statuses (free, coming soon, in research, under maintenance). We may change, pause or retire a product or feature, and change prices or conditions. For paid products, the specific terms are shown in that product before you pay.",
          ],
        },
        {
          heading: "3. Acceptable use",
          paragraphs: ["You agree not to:"],
          items: [
            "use the website or products for anything unlawful or that infringes others' rights;",
            "attack, probe for vulnerabilities, overload, or try to gain unauthorized access to our systems;",
            "bulk-copy content, code or design to resell it or to pass yourself off as AI42E.",
          ],
        },
        {
          heading: "4. Intellectual property",
          paragraphs: [
            "The AI42E name, logo, design, images and content on this website belong to AI42E or its licensors unless noted otherwise. Source code published on GitHub follows the license in each repository. You may not use the AI42E name or logo in a way that suggests an official product or partnership.",
          ],
        },
        {
          heading: "5. AI-generated output",
          paragraphs: [
            "Results from AI tools may be inaccurate or unsuitable. You are responsible for checking them before use, especially for public or professional work.",
          ],
        },
        {
          heading: "6. Not investment advice",
          paragraphs: [
            "Content about the Trading System and market research is for information and technical experimentation only, not investment, financial or legal advice. Investing carries risk; decisions and outcomes are yours.",
          ],
        },
        {
          heading: "7. External links",
          paragraphs: [
            "The website links to third-party sites (social networks, GitHub, subdomains and separate products). We do not control them and are not responsible for their content or policies.",
          ],
        },
        {
          heading: "8. Disclaimer and limit of liability",
          paragraphs: [
            "The website and products are provided as is, with no guarantee that they will always run or be error-free. To the extent the law allows, AI42E is not liable for indirect damage or loss arising from using, or being unable to use, the website and products.",
          ],
        },
        {
          heading: "9. Changes to these terms",
          paragraphs: [
            "We may update these terms. A new version takes effect when posted here; continuing to use the website means you accept it.",
          ],
        },
        {
          heading: "10. Governing law and contact",
          paragraphs: [
            "These terms are governed by the laws of Vietnam. For questions or feedback, email nhmanh.dev@gmail.com.",
          ],
        },
      ],
    },
  },
};
