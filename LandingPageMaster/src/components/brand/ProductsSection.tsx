"use client";

import { ArrowUpRight } from "lucide-react";
import type { Product, ProductStatus } from "@/lib/brand/content";
import { useBrand } from "./LocaleProvider";
import { ProductVisual } from "./ProductVisual";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

// The only colour in the UI chrome: a small dot that says whether the product is live.
const DOT: Record<ProductStatus, string> = {
  free: "bg-[#1a9b5a]",
  freemium: "bg-[#1a9b5a]",
  soon: "bg-[var(--b-muted)]",
  research: "bg-[var(--b-muted)]",
  maintenance: "bg-[#d98a00]",
};

// Bento layout on large screens: two big cards, three medium, one wide.
const ORDER = ["studio", "game", "oneforall", "voice", "download", "trading"];
const SPAN: Record<string, string> = {
  studio: "sm:col-span-2 lg:col-span-7",
  game: "lg:col-span-5",
  oneforall: "lg:col-span-4",
  voice: "lg:col-span-4",
  download: "lg:col-span-4",
  trading: "sm:col-span-2 lg:col-span-12",
};

/**
 * One sand card (pattern measured on slite.com): status label, serif name, one line, an outlined pill,
 * and the product picture bleeding off the bottom edge. The wide card puts the picture beside the copy.
 */
function Card({ product, statusLabel }: { product: Product; statusLabel: string }) {
  const live = Boolean(product.href);
  const wide = product.id === "trading";
  const body = (
    <>
      <div className="card-copy">
        <div className="flex items-start justify-between gap-3">
          <span className="t-small inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--b-surface)] px-3 py-1 text-[var(--b-muted)]">
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
        <p className="t-body mt-2 max-w-[30rem] text-[var(--b-muted)]">{product.tagline}</p>
        {live ? <span className="pill pill-outline mt-6">{product.cta}</span> : null}
      </div>
      <div className="card-visual">
        <ProductVisual product={product} flush />
      </div>
    </>
  );

  const className = `sand-card group${wide ? " sand-card-wide" : ""}`;
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
  const items = ORDER.map((id) => c.products.items.find((item) => item.id === id)).filter((item): item is Product => Boolean(item));
  return (
    <section id="products" className="relative z-10 -mt-14 scroll-mt-24 pb-14 sm:pb-[4.5rem] lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow={c.products.eyebrow} title={c.products.title} sub={c.products.sub} />

        <ul className="mt-10 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-12">
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
