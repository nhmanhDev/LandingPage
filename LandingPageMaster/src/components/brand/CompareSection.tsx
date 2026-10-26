"use client";

import { ArrowRight, Check, X } from "lucide-react";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

/** "Without / with": the honest before-and-after, no invented numbers or quotes. */
export function CompareSection() {
  const { c } = useBrand();
  const k = c.compare;
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow={k.eyebrow} title={k.title} tone={k.tone} sub={k.sub} />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full rounded-3xl bg-[var(--b-chip)] p-6 shadow-[var(--sh-soft)] sm:p-9">
              <h3 className="t-heading text-[var(--b-muted)]">{k.withoutTitle}</h3>
              <ul className="mt-5 space-y-4">
                {k.without.map((item) => (
                  <li key={item} className="t-body flex items-start gap-3 text-[var(--b-muted)]">
                    <X size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <div className="h-full rounded-3xl bg-[var(--b-surface)] p-6 shadow-[var(--sh-card)] ring-1 ring-[var(--b-brand)]/30 sm:p-9">
              <h3 className="t-heading">{k.withTitle}</h3>
              <ul className="mt-5 space-y-4">
                {k.with.map((item) => (
                  <li key={item} className="t-body flex items-start gap-3">
                    <Check size={18} strokeWidth={2.6} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--b-brand)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="t-body brand-text mt-6 rounded-2xl bg-[var(--b-lav)] px-4 py-3 font-medium">{k.result}</p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14 flex flex-col items-center gap-3">
          <a href="#products" className="pill pill-accent pill-cta">
            {c.closing.cta}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <p className="t-small text-[var(--b-muted)]">{c.closing.trust}</p>
        </Reveal>
      </div>
    </section>
  );
}
