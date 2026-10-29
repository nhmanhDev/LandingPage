"use client";

import { Check, X, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function CompareSection() {
  const { c } = useBrand();
  const k = c.compare;

  const pairs = [
    {
      without: "Tìm 10 công cụ rời rạc, mỗi nơi một tài khoản và giao diện",
      with: "Một điểm chạm duy nhất cho toàn bộ hệ sinh thái AI42E",
    },
    {
      without: "Mất hàng giờ đọc tài liệu và cấu hình kỹ thuật phức tạp",
      with: "Mở trình duyệt lên là bấm dùng ngay, không cần biết kỹ thuật",
    },
    {
      without: "Bắt buộc nhập thẻ tín dụng trả phí trước khi được trải nghiệm",
      with: "Khởi đầu 100% miễn phí, hoàn toàn không yêu cầu thẻ tín dụng",
    },
  ];

  return (
    <section id="compare" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Split Header */}
        <SectionHead
          align="split"
          eyebrow="Vì sao chọn AI42E"
          title="Dùng AI đâu cần phức tạp thế."
          sub="Nhiều người muốn ứng dụng AI nhưng ngại chuyện cài đặt, cấu hình kỹ thuật phức tạp và chi phí đắt đỏ. AI42E làm ngược lại."
        />

        {/* Slite-Inspired Direct Contrast Rows */}
        <Reveal className="mt-12 sm:mt-16">
          <div className="overflow-hidden rounded-[36px] sm:rounded-[44px] border border-[var(--b-line)] bg-[var(--b-surface)] shadow-[0_4px_24px_-4px_rgba(107,93,70,0.08)]">
            
            {/* Table Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[var(--b-line)] bg-[var(--b-lav)]/50">
              <div className="p-5 sm:p-6 text-left border-b md:border-b-0 md:border-r border-[var(--b-line)]">
                <span className="text-xs font-bold uppercase tracking-wider text-red-500/80 bg-red-500/10 px-2.5 py-1 rounded-full">
                  ✕ Cách làm thông thường
                </span>
                <p className="text-xs text-[var(--b-muted)] mt-2">Nhiều rào cản, tốn thời gian tìm kiếm</p>
              </div>

              <div className="p-5 sm:p-6 text-left bg-[var(--b-pos-bg)]/30">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--b-pos-fg)] bg-[var(--b-pos-bg)] px-2.5 py-1 rounded-full">
                  ✓ Với hệ sinh thái AI42E
                </span>
                <p className="text-xs text-[var(--b-pos-fg)] mt-2 font-medium">Tinh giản tối đa, dùng được ngay</p>
              </div>
            </div>

            {/* 3 Direct Contrast Pairs */}
            <div className="divide-y divide-[var(--b-line)]">
              {pairs.map((pair, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 group hover:bg-[var(--b-lav)]/30 transition-colors"
                >
                  {/* Left: Without AI42E */}
                  <div className="p-5 sm:p-7 flex items-start gap-3.5 border-b md:border-b-0 md:border-r border-[var(--b-line)] bg-[var(--b-chip)]/20">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-red-500/10 text-red-500 mt-0.5">
                      <X size={15} strokeWidth={2.4} />
                    </span>
                    <p className="text-sm font-medium text-[var(--b-muted)] leading-relaxed">
                      {pair.without}
                    </p>
                  </div>

                  {/* Right: With AI42E */}
                  <div className="p-5 sm:p-7 flex items-start gap-3.5 bg-[var(--b-surface)]">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[var(--b-pos-bg)] text-[var(--b-pos-fg)] mt-0.5 shadow-2xs">
                      <Check size={15} strokeWidth={2.8} />
                    </span>
                    <p className="text-sm font-bold text-[var(--b-ink)] leading-relaxed">
                      {pair.with}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Value Guarantee Bar */}
            <div className="p-5 sm:p-7 border-t border-[var(--b-line)] bg-[var(--b-lav)]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--b-brand)]">Kết luận:</span>
                <p className="text-sm font-bold text-[var(--b-ink)] mt-0.5">
                  Đỡ mất công, đỡ tốn tiền, giải quyết công việc ngay lập tức.
                </p>
              </div>
              <a
                href="#products"
                className="pill pill-brand inline-flex items-center gap-1.5 !py-2.5 !px-5 text-xs sm:text-sm font-bold shrink-0"
              >
                <span>Xem các sản phẩm</span>
                <ArrowRight size={14} />
              </a>
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
