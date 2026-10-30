"use client";

import { Check, Sparkles, Server, HeartHandshake, ArrowRight } from "lucide-react";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

const TIER_ICONS = [Sparkles, Server, HeartHandshake];

/** Three plans side by side. Rows inside each card have fixed heights so the titles, prices and lists line up. */
export function FreemiumSection() {
  const { c } = useBrand();
  const f = c.freemium;

  return (
    <section id="pricing" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow={f.eyebrow} title={f.title} sub={f.sub} />

        <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-3">
          {f.tiers.map((tier, index) => {
            const Icon = TIER_ICONS[index];
            const featured = Boolean(tier.ribbon);
            return (
              <Reveal key={tier.title} delay={index * 0.08} className="h-full">
                <div
                  className={`relative flex h-full flex-col justify-between rounded-[36px] p-7 transition-all hover:-translate-y-1 sm:p-8 ${
                    featured
                      ? "border-2 border-[var(--b-brand)] bg-[var(--b-surface)] shadow-[0_20px_50px_rgba(194,65,12,0.14)]"
                      : "border border-[var(--b-line)] bg-[var(--b-surface)] shadow-[var(--sh-soft)] hover:shadow-[var(--sh-card)]"
                  }`}
                >
                  {tier.ribbon ? (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-[#c2410c] px-3.5 py-1 text-[13px] font-bold tracking-wide text-white shadow-sm">
                        {tier.ribbon}
                      </span>
                    </div>
                  ) : null}

                  <div>
                    <div className="flex h-7 items-center justify-between gap-3">
                      <span className="inline-flex items-center rounded-full bg-[var(--b-chip)] px-3 py-1 text-[13px] font-bold text-[var(--b-ink)]">
                        {tier.tag}
                      </span>
                      <Icon size={18} className="text-[var(--b-muted)]" aria-hidden="true" />
                    </div>

                    <h3 className="t-heading mt-5 min-h-[3rem] font-bold text-[var(--b-ink)]">{tier.title}</h3>

                    <div className="mt-3 flex h-11 items-baseline gap-2">
                      <span className="t-subtitle text-[var(--b-ink)]">{tier.price}</span>
                      {tier.priceNote ? <span className="t-small text-[var(--b-muted)]">{tier.priceNote}</span> : null}
                    </div>

                    <p className="t-body mt-4 min-h-[6rem] leading-relaxed text-[var(--b-muted)]">{tier.text}</p>

                    <div className="mt-6 border-t border-[var(--b-line)] pt-6">
                      <p className="mb-4 text-[13px] font-bold uppercase tracking-wider text-[var(--b-muted)]">{tier.featuresTitle}</p>
                      <ul className="space-y-3.5">
                        {tier.features.map((feature) => (
                          <li key={feature} className="t-small flex items-start gap-3">
                            <Check size={16} strokeWidth={2.6} className="mt-0.5 shrink-0 text-[var(--b-pos-fg)]" aria-hidden="true" />
                            <span className="text-[var(--b-ink)]">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <a href={tier.href} className={`pill w-full justify-center gap-2 ${featured ? "pill-cta" : "pill-outline"}`}>
                      {tier.cta}
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
