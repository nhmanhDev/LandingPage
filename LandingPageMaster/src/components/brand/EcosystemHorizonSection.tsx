"use client";

import Image from "next/image";
import logo from "@/app/android-chrome-192x192.png";
import type { Product } from "@/lib/brand/content";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

/** Decorative sketch of a price line. It is an illustration, not market data. */
function TradingSketch() {
  const points = Array.from({ length: 40 }, (_, i) => {
    const x = (i / 39) * 100;
    const y = 58 - i * 0.55 + Math.sin(i * 0.6) * 9 + Math.sin(i * 1.7) * 4;
    return [x, y] as const;
  });
  const line = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

  return (
    <div className="mt-6 h-[110px] overflow-hidden rounded-[18px] bg-[var(--b-chip)] p-4" aria-hidden="true">
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="h-full w-full text-[var(--b-brand)]">
        <defs>
          <linearGradient id="trade-glow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.22" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${line} L100 60 L0 60 Z`} fill="url(#trade-glow)" />
        <path d={line} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

function HorizonNode({ product, statusLabel, children }: { product: Product; statusLabel: string; children?: React.ReactNode }) {
  return (
    <article className="flex h-full flex-col rounded-[28px] border border-[var(--b-line)] bg-[var(--b-surface)] p-7 shadow-[var(--sh-card)] sm:p-8">
      <span className="t-small inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--b-line)] bg-[var(--b-bg)] px-3 py-1 text-[var(--b-muted)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--b-muted)]" aria-hidden="true" />
        {statusLabel}
      </span>
      <h3 className="t-subtitle mt-5">{product.name}</h3>
      <p className="t-body mt-2 text-[var(--b-muted)]">{product.tagline}</p>
      <ul className="t-small mt-5 space-y-2 text-[var(--b-ink)]">
        {product.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2.5">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--b-muted)]" aria-hidden="true" />
            {bullet}
          </li>
        ))}
      </ul>
      {children}
    </article>
  );
}

/** Canvas on graph paper: the ecosystem node at the top, two research products hanging off it on dashed lines. */
export function EcosystemHorizonSection() {
  const { c } = useBrand();
  const h = c.horizon;
  const oneForAll = c.products.items.find((item) => item.id === "oneforall");
  const trading = c.products.items.find((item) => item.id === "trading");
  if (!oneForAll || !trading) return null;

  return (
    <section id="horizon" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead title={h.title} sub={h.sub} />

        <Reveal delay={0.08} className="mt-12 sm:mt-16">
          <div
            className="relative overflow-hidden rounded-[40px] border border-[var(--b-line)] bg-[var(--b-bg)] px-4 pb-10 pt-12 sm:px-10 sm:pb-12 sm:pt-16"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(45,47,52,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(45,47,52,0.05) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          >
            {/* Hub */}
            <div className="relative z-10 mx-auto flex w-fit flex-col items-center">
              <div className="grid h-20 w-20 place-items-center rounded-[24px] bg-[var(--b-ink)] shadow-[var(--sh-card)]">
                <Image src={logo} alt="" width={36} height={36} className="rounded-xl" />
              </div>
              <p className="t-small mt-3 text-[var(--b-muted)]">{h.hub}</p>
            </div>

            {/* Dashed branches: one drop from the hub, a bar, and one drop into each node (desktop only) */}
            <div aria-hidden="true" className="relative mx-auto hidden h-14 max-w-4xl md:block">
              <div className="absolute left-1/2 top-0 h-6 -translate-x-1/2 border-l border-dashed border-[var(--b-muted)]/60" />
              <div className="absolute left-[25%] right-[25%] top-6 border-t border-dashed border-[var(--b-muted)]/60" />
              <div className="absolute left-[25%] top-6 h-8 border-l border-dashed border-[var(--b-muted)]/60" />
              <div className="absolute left-[75%] top-6 h-8 border-l border-dashed border-[var(--b-muted)]/60" />
            </div>

            <div className="relative z-10 mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              <HorizonNode product={oneForAll} statusLabel={c.products.status[oneForAll.status]} />

              <div className="relative">
                {/* Chip pointing at the node: the status the team wants people to see first */}
                <div className="t-small absolute -top-4 right-6 z-20 hidden rounded-[18px] bg-[var(--b-ink)] px-4 py-2.5 text-[var(--b-bg)] shadow-[var(--sh-card)] sm:block">
                  {trading.bullets[1]}
                </div>
                <HorizonNode product={trading} statusLabel={c.products.status[trading.status]}>
                  <TradingSketch />
                </HorizonNode>
              </div>
            </div>
          </div>

          <p className="t-small mx-auto mt-8 max-w-xl text-center text-[var(--b-muted)]">{h.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
}
