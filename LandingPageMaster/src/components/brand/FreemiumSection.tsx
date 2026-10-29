"use client";

import { Check, ArrowRight, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function FreemiumSection() {
  const { c } = useBrand();

  const tiers = [
    {
      id: "free",
      step: "01",
      badge: "Khởi đầu tự do",
      name: "Cứ dùng thoải mái",
      price: "0đ",
      priceSub: "/ trải nghiệm tự do",
      desc: "Hầu hết công cụ mở sẵn 0đ trên web, không cần biết kỹ thuật. Thấy hợp việc thì dùng tiếp, không hợp thì thôi.",
      features: [
        "Mở trình duyệt là dùng được ngay",
        "Trọn quyền trải nghiệm các công cụ mở sẵn",
        "Hoàn toàn không yêu cầu thẻ tín dụng",
        "Không giới hạn thời gian trải nghiệm",
      ],
      ctaText: "Bắt đầu miễn phí →",
      ctaHref: "#products",
      featured: false,
    },
    {
      id: "upgrade",
      step: "02",
      badge: "Minh bạch 100%",
      name: "Cần nhiều thì nâng cấp",
      price: "Báo trước",
      priceSub: "/ theo nhu cầu thực tế",
      desc: "Chỉ khi bạn cần render video khối lượng lớn, dùng server GPU mạnh hay nhân bản giọng riêng. Giá luôn báo trước khi thanh toán.",
      features: [
        "Tài nguyên máy chủ GPU AI xử lý hàng loạt",
        "Báo giá niêm yết rõ ràng trước khi bấm",
        "Tuyệt đối không âm thầm trừ tiền thẻ",
        "Hỗ trợ kỹ thuật trực tiếp 1-1 từ Mạnh",
      ],
      ctaText: "Gửi yêu cầu nâng cấp →",
      ctaHref: "#contact",
      featured: true, // Tab cam nổi bật giống Pro tier của Slite
    },
    {
      id: "mission",
      step: "03",
      badge: "Cam kết nhà phát triển",
      name: "Phí dùng để làm gì",
      price: "Hạ tầng",
      priceSub: "/ duy trì & phát triển",
      desc: "Chạy máy chủ GPU và các API AI tốn chi phí thật. Khoản phí giúp hệ thống ổn định lâu dài và tiếp tục làm thêm công cụ mới.",
      features: [
        "100% Phí dùng cho máy chủ GPU & API AI",
        "Duy trì sản phẩm hoạt động mượt mà, ổn định",
        "Tái đầu tư tạo thêm công cụ mới cho mọi người",
        "Nói không với bán dữ liệu người dùng",
      ],
      ctaText: "Đọc câu chuyện sáng lập →",
      ctaHref: "#founder",
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Slite-Style Punchy Header */}
        <SectionHead
          align="center"
          eyebrow="Chi phí minh bạch"
          title="Dùng có mất tiền không?"
          sub="Phần lớn công cụ là miễn phí. Bạn chỉ trả tiền khi nhu cầu công việc thực sự lớn, và luôn biết trước giá."
        />

        {/* 3 Tiered Cards (Slite Pricing Layout) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <Reveal key={tier.id} delay={idx * 0.08} className="h-full">
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
                className={`relative flex flex-col justify-between h-full rounded-[36px] border p-7 sm:p-9 transition-all duration-300 ${
                  tier.featured
                    ? "border-[var(--b-brand)] bg-[var(--b-surface)] shadow-[0_24px_50px_-12px_rgba(194,72,31,0.22)] ring-2 ring-[var(--b-brand)]/20"
                    : "border-[var(--b-line)] bg-[var(--b-surface)] shadow-[0_4px_24px_-4px_rgba(107,93,70,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(107,93,70,0.16)]"
                }`}
              >
                {/* Top Badge for Featured Tier */}
                {tier.featured ? (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--b-brand)] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                      <Sparkles size={12} />
                      Khuyên dùng
                    </span>
                  </div>
                ) : null}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--b-muted)]">
                      {tier.step} · {tier.badge}
                    </span>
                  </div>

                  <h3 className="t-title font-bold text-2xl mt-4 text-[var(--b-ink)]">
                    {tier.name}
                  </h3>

                  {/* Big Bold Price Display */}
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold tracking-tight text-[var(--b-ink)]">
                      {tier.price}
                    </span>
                    <span className="text-xs text-[var(--b-muted)]">
                      {tier.priceSub}
                    </span>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-[var(--b-muted)] leading-relaxed">
                    {tier.desc}
                  </p>

                  {/* Feature Checklist */}
                  <div className="mt-6 pt-6 border-t border-[var(--b-line)]">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--b-muted)] mb-3">
                      Đặc quyền bao gồm:
                    </span>
                    <ul className="space-y-3">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs text-[var(--b-ink)] font-medium">
                          <Check size={14} className="text-[#1a9b5a] shrink-0 mt-0.5" strokeWidth={2.6} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-8 pt-4">
                  <a
                    href={tier.ctaHref}
                    className={`pill w-full flex items-center justify-center gap-1.5 !py-3 text-xs sm:text-sm font-bold transition-all ${
                      tier.featured
                        ? "pill-brand shadow-sm"
                        : "pill-surface border border-[var(--b-line)] hover:border-[var(--b-ink)]/30"
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                  </a>
                </div>

              </motion.div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
