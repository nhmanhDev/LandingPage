"use client";

import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";

export function FreemiumSection() {
  const { c } = useBrand();
  return (
    <section id="pricing" className="scroll-mt-20 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-serif)] text-4xl leading-tight tracking-[-0.015em] sm:text-5xl">{c.freemium.title}</h2>
          <p className="mt-4 text-base text-[var(--b-muted)] sm:text-lg">{c.freemium.sub}</p>
        </Reveal>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {c.freemium.columns.map((column, index) => (
            <li key={column.title}>
              <Reveal delay={index * 0.08} className="h-full">
                <div className="h-full rounded-3xl bg-[var(--b-chip)] p-7">
                  <span className="font-[family-name:var(--font-serif)] text-3xl text-[var(--b-primary)]" aria-hidden="true">
                    {index + 1}
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-xl font-semibold tracking-tight">{column.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--b-muted)]">{column.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
