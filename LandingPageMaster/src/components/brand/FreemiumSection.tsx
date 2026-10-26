"use client";

import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

/** A deliberately dark, glowing panel in both themes: the one "night sky" moment on the page. */
export function FreemiumSection() {
  const { c } = useBrand();
  return (
    <section id="pricing" className="scroll-mt-4 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="night relative overflow-hidden rounded-[32px] p-6 sm:p-12">
            <div className="relative z-10 max-w-2xl">
              <SectionTitle text={c.freemium.title} />
              <p className="t-body mt-3 text-[rgba(242,242,240,0.72)]">{c.freemium.sub}</p>
            </div>

            <ol className="relative z-10 mt-10 grid gap-3 md:grid-cols-3">
              {c.freemium.columns.map((column, index) => (
                <li key={column.title} className="glass-night rounded-3xl p-6">
                  <span className="t-small inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[rgba(242,242,240,0.14)] px-2" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3 className="t-heading mt-5">{column.title}</h3>
                  <p className="t-body mt-2 text-[rgba(242,242,240,0.72)]">{column.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
