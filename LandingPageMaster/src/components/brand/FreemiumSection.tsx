"use client";

import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

/** A glowing panel that follows the theme: lavender in light mode, deep violet in dark mode. */
export function FreemiumSection() {
  const { c } = useBrand();
  return (
    <section id="pricing" className="scroll-mt-32 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="aurora au-panel relative rounded-[32px] p-6 sm:p-12">
            <div className="relative z-10 max-w-2xl">
              <p className="eyebrow !text-[var(--b-ink)]">{c.freemium.eyebrow}</p>
              <SectionTitle text={c.freemium.title} className="t-title mt-3" />
              <p className="t-body mt-3 text-[var(--b-muted)]">{c.freemium.sub}</p>
            </div>

            <ol className="relative z-10 mt-10 grid gap-3 md:grid-cols-3">
              {c.freemium.columns.map((column, index) => (
                <li key={column.title} className="glass rounded-3xl p-6">
                  <span className="t-small inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[var(--b-chip)] px-2" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3 className="t-heading mt-5">{column.title}</h3>
                  <p className="t-body mt-2 text-[var(--b-muted)]">{column.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
