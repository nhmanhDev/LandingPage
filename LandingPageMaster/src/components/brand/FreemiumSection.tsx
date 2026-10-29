"use client";

import { Check, Sparkles, Server, HeartHandshake, ArrowRight } from "lucide-react";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function FreemiumSection() {
  const { c } = useBrand();
  const f = c.freemium;

  return (
    <section id="pricing" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow={f.eyebrow} title={f.title} sub={f.sub} />

        {/* Slite-Style Tiered Transparency Cards */}
        <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-3">
          
          {/* Tier 1: Cứ thử trước (Miễn phí) */}
          <Reveal delay={0} className="h-full">
            <div className="flex h-full flex-col justify-between rounded-[36px] border border-[var(--b-line)] bg-[var(--b-surface)] p-7 sm:p-8 shadow-[var(--sh-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--sh-card)]">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--b-pos-bg)] px-3 py-1 text-xs font-semibold text-[var(--b-pos-fg)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--b-pos-fg)]" />
                    Bắt đầu 0đ
                  </span>
                  <Sparkles size={18} className="text-[var(--b-muted)]" />
                </div>

                <h3 className="t-heading font-bold mt-5 text-[var(--b-ink)]">{f.columns[0].title}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-[var(--b-ink)]">0đ</span>
                  <span className="t-small text-[var(--b-muted)]">/ dùng thử tự do</span>
                </div>

                <p className="t-body mt-4 text-[var(--b-muted)] leading-relaxed">
                  {f.columns[0].text}
                </p>

                <div className="mt-8 border-t border-[var(--b-line)] pt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--b-muted)] mb-4">Bao gồm sẵn:</p>
                  <ul className="space-y-3.5">
                    {[
                      "Mở trình duyệt là dùng được ngay",
                      "Toàn quyền trải nghiệm các công cụ mở sẵn",
                      "Không cần đăng ký thẻ tín dụng",
                      "Không giới hạn thời gian trải nghiệm",
                    ].map((feature) => (
                      <li key={feature} className="flex items-start gap-3 t-small">
                        <Check size={16} strokeWidth={2.6} className="mt-0.5 shrink-0 text-[var(--b-pos-fg)]" />
                        <span className="text-[var(--b-ink)]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <a href="#products" className="pill pill-outline w-full justify-center">
                  Bắt đầu miễn phí →
                </a>
              </div>
            </div>
          </Reveal>

          {/* Tier 2: Cần nhiều hơn thì nâng cấp (Featured Pro Card) */}
          <Reveal delay={0.08} className="h-full">
            <div className="relative flex h-full flex-col justify-between rounded-[36px] border-2 border-[var(--b-accent)] bg-[var(--b-surface)] p-7 sm:p-8 shadow-[0_20px_50px_rgba(246,119,72,0.14)] transition-all hover:-translate-y-1">
              {/* Highlight ribbon */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-[var(--b-accent)] px-3.5 py-1 text-xs font-bold tracking-wide text-white shadow-sm">
                  Minh bạch 100%
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3 pt-1">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--b-chip)] px-3 py-1 text-xs font-semibold text-[var(--b-ink)]">
                    Theo nhu cầu
                  </span>
                  <Server size={18} className="text-[var(--b-brand)]" />
                </div>

                <h3 className="t-heading font-bold mt-5 text-[var(--b-ink)]">{f.columns[1].title}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold tracking-tight text-[var(--b-ink)]">Giá báo trước</span>
                </div>

                <p className="t-body mt-4 text-[var(--b-muted)] leading-relaxed">
                  {f.columns[1].text}
                </p>

                <div className="mt-8 border-t border-[var(--b-line)] pt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--b-muted)] mb-4">Đặc quyền nâng cao:</p>
                  <ul className="space-y-3.5">
                    {[
                      "Tài nguyên máy chủ AI xử lý khối lượng lớn",
                      "Giá niêm yết rõ ràng trước khi thanh toán",
                      "Không âm thầm tự động gia hạn thẻ",
                      "Hỗ trợ kỹ thuật 1-1 trực tiếp từ Mạnh",
                    ].map((feature) => (
                      <li key={feature} className="flex items-start gap-3 t-small">
                        <Check size={16} strokeWidth={2.6} className="mt-0.5 shrink-0 text-[var(--b-brand)]" />
                        <span className="text-[var(--b-ink)] font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <a href="#contact" className="pill pill-cta w-full justify-center">
                  Tìm hiểu gói nâng cao →
                </a>
              </div>
            </div>
          </Reveal>

          {/* Tier 3: Phí dùng để làm gì (Transparency & Community Commitment) */}
          <Reveal delay={0.16} className="h-full">
            <div className="flex h-full flex-col justify-between rounded-[36px] border border-[var(--b-line)] bg-[var(--b-lav)] p-7 sm:p-8 shadow-[var(--sh-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--sh-card)]">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--b-surface)] px-3 py-1 text-xs font-semibold text-[var(--b-muted)]">
                    Cam kết của Founder
                  </span>
                  <HeartHandshake size={18} className="text-[var(--b-muted)]" />
                </div>

                <h3 className="t-heading font-bold mt-5 text-[var(--b-ink)]">{f.columns[2].title}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold tracking-tight text-[var(--b-ink)]">Duy trì server</span>
                </div>

                <p className="t-body mt-4 text-[var(--b-muted)] leading-relaxed">
                  {f.columns[2].text}
                </p>

                <div className="mt-8 border-t border-[var(--b-line)] pt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--b-muted)] mb-4">Cam kết từ AI42E:</p>
                  <ul className="space-y-3.5">
                    {[
                      "100% phí dùng cho hạ tầng & máy chủ AI",
                      "Duy trì sản phẩm hoạt động ổn định, mượt mà",
                      "Tái đầu tư phát triển công cụ mới cho cộng đồng",
                      "Không quảng cáo phiền toái, không bán dữ liệu",
                    ].map((feature) => (
                      <li key={feature} className="flex items-start gap-3 t-small">
                        <Check size={16} strokeWidth={2.6} className="mt-0.5 shrink-0 text-[var(--b-ink)]" />
                        <span className="text-[var(--b-ink)]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <a href="#founder" className="pill pill-surface w-full justify-center">
                  Đọc câu chuyện sáng lập →
                </a>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
