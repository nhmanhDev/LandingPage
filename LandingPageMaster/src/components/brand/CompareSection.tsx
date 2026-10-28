"use client";

import { ArrowRight, Check, X, Layers, Cpu, CreditCard, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function CompareSection() {
  const { c } = useBrand();
  const k = c.compare;

  const withoutIcons = [Layers, Cpu, CreditCard];
  const withIcons = [Sparkles, Zap, ShieldCheck];

  return (
    <section id="compare" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow={k.eyebrow} title={k.title} tone={k.tone} sub={k.sub} />

        {/* Slite-Inspired High-Fidelity Comparison Board */}
        <Reveal className="mx-auto mt-12 max-w-5xl sm:mt-16">
          <div className="rounded-[40px] border border-[var(--b-line)] bg-[var(--b-lav)] p-6 sm:p-10 lg:p-12 shadow-[var(--sh-card)]">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
              
              {/* Left Column: Cách làm thông thường (Muted & Frictional) */}
              <div className="flex flex-col justify-between rounded-3xl border border-dashed border-[var(--b-line)] bg-[var(--b-chip)]/60 p-6 sm:p-8">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="t-heading font-semibold text-[var(--b-muted)]">{k.withoutTitle}</h3>
                    <span className="text-xs font-semibold uppercase tracking-wider text-red-500/80 bg-red-500/10 px-2.5 py-0.5 rounded-full">
                      Phức tạp
                    </span>
                  </div>

                  <ul className="mt-6 space-y-4">
                    {k.without.map((item, idx) => {
                      const Icon = withoutIcons[idx] || X;
                      return (
                        <li key={item} className="flex items-start gap-3.5 rounded-2xl bg-[var(--b-surface)]/60 p-4 border border-[var(--b-line)]/60">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-red-500/10 text-red-500 mt-0.5">
                            <X size={16} strokeWidth={2.4} aria-hidden />
                          </span>
                          <div>
                            <p className="t-body font-medium text-[var(--b-muted)]">{item}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-8 border-t border-[var(--b-line)] pt-4 text-xs text-[var(--b-muted)] text-center">
                  Tốn thời gian tìm kiếm · Dễ nản lòng trước khi bắt đầu
                </div>
              </div>

              {/* Right Column: Với AI42E (Elevated, Crisp & Verified) */}
              <div className="flex flex-col justify-between rounded-3xl border border-[var(--b-line)] bg-[var(--b-surface)] p-6 sm:p-8 shadow-[0_16px_40px_-12px_rgba(45,47,52,0.1)]">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="t-heading font-semibold text-[var(--b-ink)]">{k.withTitle}</h3>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--b-pos-fg)] bg-[var(--b-pos-bg)] px-2.5 py-0.5 rounded-full">
                      Tối ưu
                    </span>
                  </div>

                  <ul className="mt-6 space-y-4">
                    {k.with.map((item, idx) => {
                      const Icon = withIcons[idx] || Check;
                      return (
                        <li key={item} className="group flex items-start gap-3.5 rounded-2xl bg-[var(--b-lav)]/70 p-4 border border-[var(--b-line)] transition-all hover:bg-[var(--b-lav)] hover:-translate-y-0.5">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[var(--b-pos-bg)] text-[var(--b-pos-fg)] mt-0.5 shadow-2xs">
                            <Check size={16} strokeWidth={2.8} aria-hidden />
                          </span>
                          <div>
                            <p className="t-body font-semibold text-[var(--b-ink)]">{item}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-8 rounded-2xl bg-[var(--b-pos-bg)]/60 border border-[var(--b-pos-fg)]/20 p-4 flex items-center justify-between gap-3">
                  <span className="t-small font-semibold text-[var(--b-pos-fg)]">{k.result}</span>
                  <span className="text-xs font-bold text-[var(--b-pos-fg)] bg-[var(--b-surface)] px-2.5 py-1 rounded-full shadow-2xs">
                    0đ Bắt đầu
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Unified CTA Strip */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-[var(--b-surface)] border border-[var(--b-line)] p-5 sm:p-6 shadow-[var(--sh-soft)]">
              <div className="text-center sm:text-left">
                <p className="t-body font-semibold text-[var(--b-ink)]">Trải nghiệm sự khác biệt ngay hôm nay</p>
                <p className="t-small text-[var(--b-muted)]">{c.closing.trust}</p>
              </div>
              <a href="#products" className="pill pill-accent pill-cta !min-w-[14rem] shrink-0">
                {c.closing.cta}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
