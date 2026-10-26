"use client";

import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";

export function FreemiumSection() {
  const { c } = useBrand();
  return (
    <section id="pricing" className="scroll-mt-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="t-title">{c.freemium.title}</h2>
          <p className="t-body mt-3 text-[var(--b-muted)]">{c.freemium.sub}</p>
        </Reveal>

        <ol className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-3">
          {c.freemium.columns.map((column, index) => (
            <li key={column.title}>
              <Reveal delay={index * 0.06}>
                <div className="border-t border-[var(--b-line)] pt-4">
                  <span className="t-small text-[var(--b-muted)]" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3 className="t-heading mt-2">{column.title}</h3>
                  <p className="t-body mt-2 text-[var(--b-muted)]">{column.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
