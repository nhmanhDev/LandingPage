"use client";

import { Check, Sparkles, Server, HeartHandshake, ArrowRight } from "lucide-react";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { useBrand } from "./LocaleProvider";
import { ScrollParallax } from "./ScrollMotion";
import { SectionHead } from "./SectionHead";

const TIER_ICONS = [Sparkles, Server, HeartHandshake];

/** Three plans side by side with cursor-tracking SpotlightCard glow & differential scroll parallax. */
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
              <ScrollParallax
                key={tier.title}
                className="h-full"
                offsetY={featured ? [38, -28] : [20 + index * 4, -(14 + index * 3)]}
              >
                <div className="relative h-full transition-transform duration-300 hover:-translate-y-1">
                  {tier.ribbon ? (
                    <div className="pointer-events-none absolute -top-3.5 left-1/2 z-20 -translate-x-1/2">
                      <span className="rounded-full bg-[var(--b-brand)] px-3.5 py-1 text-[13px] font-bold tracking-wide text-white shadow-sm">
                        {tier.ribbon}
                      </span>
                    </div>
                  ) : null}

                  <SpotlightCard
                    theme="light"
                    spotlightColor="#f67748"
                    intensity={0.24}
                    borderGlow={0.75}
                    spotlightSize={300}
                    proximity={90}
                    style={
                      {
                        "--spotlight-card-surface": "var(--b-surface)",
                        "--spotlight-card-border": featured ? "transparent" : "var(--b-line)",
                        "--spotlight-card-shadow": featured
                          ? "0 20px 50px rgba(194,65,12,0.14)"
                          : "var(--sh-soft)",
                      } as React.CSSProperties
                    }
                    className={`flex h-full flex-col justify-between !rounded-[36px] !p-7 sm:!p-8 ${
                      featured
                        ? "border-2 border-[var(--b-brand)]"
                        : "hover:[box-shadow:var(--sh-card)]"
                    }`}
                  >
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
                  </SpotlightCard>
                </div>
              </ScrollParallax>
            );
          })}
        </div>
      </div>
    </section>
  );
}
