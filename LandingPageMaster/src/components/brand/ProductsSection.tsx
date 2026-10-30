"use client";

import { ArrowUpRight, AudioLines, Clapperboard, Download } from "lucide-react";
import type { Product, ProductStatus } from "@/lib/brand/content";
import { useBrand } from "./LocaleProvider";
import { ProductVisual } from "./ProductVisual";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

const DOT: Record<ProductStatus, string> = {
  free: "bg-[#1a9b5a]",
  freemium: "bg-[#1a9b5a]",
  soon: "bg-[var(--b-muted)]",
  research: "bg-[var(--b-muted)]",
  maintenance: "bg-[#d98a00]",
};

// The three creative tools, in pipeline order
const CREATIVE_ORDER = ["studio", "download", "voice"];
const SPAN: Record<string, string> = {
  studio: "lg:col-span-12",
  download: "sm:col-span-1 lg:col-span-6",
  voice: "sm:col-span-1 lg:col-span-6",
};
const STEP_ICONS = [Download, AudioLines, Clapperboard];

function Card({ product, statusLabel }: { product: Product; statusLabel: string }) {
  const live = Boolean(product.href);
  const isWide = product.id === "studio";

  const body = (
    <>
      <div className="card-copy">
        <div className="flex items-start justify-between gap-3">
          <span className="t-small inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--b-surface)] px-3 py-1 text-[var(--b-muted)] border border-[var(--b-line)]">
            <span className={`h-1.5 w-1.5 rounded-full ${DOT[product.status]}`} aria-hidden="true" />
            {statusLabel}
          </span>
          {live ? (
            <span className="card-arrow" aria-hidden="true">
              <ArrowUpRight size={18} />
            </span>
          ) : null}
        </div>
        <h3 className="t-subtitle mt-6">{product.name}</h3>
        <p className="t-body mt-2 max-w-[32rem] text-[var(--b-muted)] leading-relaxed">{product.tagline}</p>
        {live ? <span className="pill pill-outline mt-6">{product.cta}</span> : null}
      </div>
      <div className="card-visual">
        <ProductVisual product={product} flush />
      </div>
    </>
  );

  const className = `sand-card ${isWide ? "sand-card-wide" : ""} group`;
  return live ? (
    <a href={product.href} target="_blank" rel="noopener noreferrer" className={className}>
      {body}
    </a>
  ) : (
    <div className={className}>{body}</div>
  );
}

export function ProductsSection() {
  const { c } = useBrand();
  const items = CREATIVE_ORDER.map((id) => c.products.items.find((item) => item.id === id)).filter((item): item is Product => Boolean(item));

  return (
    <section id="products" className="relative z-10 scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow={c.products.eyebrow} title={c.products.title} sub={c.products.sub} />

        {/* Pipeline strip: three steps separated by hairlines, no card */}
        <Reveal delay={0.08} className="mt-12 sm:mt-16">
          <ol className="grid md:grid-cols-3">
            {c.products.steps.map((step, index) => {
              const Icon = STEP_ICONS[index];
              return (
                <li
                  key={step.title}
                  className="flex flex-col items-start border-t border-[var(--b-line)] py-7 first:border-t-0 md:border-t-0 md:border-l md:px-8 md:py-0 md:first:border-l-0 md:first:pl-0"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--b-surface)] text-[var(--b-brand)] shadow-[var(--sh-soft)]">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="t-small mt-5 font-semibold text-[var(--b-muted)]">0{index + 1}</span>
                  <h3 className="t-heading mt-1 text-[var(--b-ink)]">{step.title}</h3>
                  <p className="t-body mt-2 text-[var(--b-muted)]">{step.text}</p>
                </li>
              );
            })}
          </ol>
        </Reveal>

        {/* Product cards: Studio full width, Downloader and Voice side by side */}
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-12 sm:mt-16">
          {items.map((product, index) => (
            <li key={product.id} className={SPAN[product.id]}>
              <Reveal delay={Math.min(index, 3) * 0.06} className="h-full">
                <Card product={product} statusLabel={c.products.status[product.status]} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
