"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useBrand } from "./LocaleProvider";
import { ProductVisual } from "./ProductVisual";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

/** "What you can do": one big, real product picture at a time, switched by tabs (the AdKit workflow block). */
export function ShowcaseSection() {
  const { c } = useBrand();
  const [active, setActive] = useState<"studio" | "game">("studio");
  const tab = c.showcase.tabs.find((item) => item.id === active) ?? c.showcase.tabs[0];
  const product = c.products.items.find((item) => item.id === tab.id);

  return (
    <section id="features" className="scroll-mt-32 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead eyebrow={c.showcase.eyebrow} title={c.showcase.title} tone={c.showcase.tone} />

        <Reveal className="mt-10">
          <div role="tablist" aria-label={c.showcase.eyebrow} className="mx-auto flex max-w-md rounded-full bg-[var(--b-chip)] p-1">
            {c.showcase.tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={active === item.id}
                aria-controls={`panel-${item.id}`}
                onClick={() => setActive(item.id)}
                className={`t-body h-10 flex-1 rounded-full px-4 font-medium transition-colors ${
                  active === item.id ? "bg-[var(--b-surface)] text-[var(--b-ink)] shadow-sm" : "text-[var(--b-muted)] hover:text-[var(--b-ink)]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          className="mt-10 grid items-center gap-8 rounded-[32px] bg-[var(--b-surface)] p-4 ring-1 ring-[var(--b-line)] sm:p-6 md:grid-cols-[1fr_1.15fr] md:gap-12 md:p-10"
        >
          <div>
            <p className="eyebrow">{tab.eyebrow}</p>
            <h3 className="t-subtitle mt-2">{tab.title}</h3>
            <p className="t-body mt-4 text-[var(--b-muted)]">{tab.text}</p>
            <ul className="mt-5 space-y-3">
              {tab.bullets.map((bullet) => (
                <li key={bullet} className="t-body flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--b-chip)] text-[var(--b-brand)]">
                    <Check size={13} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
            <a href={tab.href} target="_blank" rel="noopener noreferrer" className="pill pill-accent mt-7">
              {tab.cta}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          {product ? <ProductVisual product={product} /> : null}
        </div>
      </div>
    </section>
  );
}
