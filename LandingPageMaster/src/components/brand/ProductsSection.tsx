"use client";

import { useTheme } from "next-themes";
import { ArrowUpRight } from "lucide-react";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import type { Product, ProductStatus } from "@/lib/brand/content";
import { useBrand } from "./LocaleProvider";
import { ProductVisual } from "./ProductVisual";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { useMounted } from "./useMounted";

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

function Card({ product, statusLabel }: { product: Product; statusLabel: string }) {
  const live = Boolean(product.href);
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const body = (
    <>
      <ProductVisual product={product} />
      <div className="px-2 pb-2 pt-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="t-heading">{product.name}</h3>
          <span className="t-small inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--b-chip)] px-2.5 py-1 text-[var(--b-muted)]">
            <span className={`h-1.5 w-1.5 rounded-full ${DOT[product.status]}`} aria-hidden="true" />
            {statusLabel}
          </span>
        </div>
        <p className="t-body mt-1.5 text-[var(--b-muted)]">{product.tagline}</p>
        {live ? (
          <span className="t-body brand-text mt-3 inline-flex items-center gap-1 font-medium">
            {product.cta}
            <ArrowUpRight size={16} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        ) : null}
      </div>
    </>
  );

  const inner = "group flex h-full flex-col text-left";
  return (
    <SpotlightCard
      theme={mounted && resolvedTheme === "dark" ? "dark" : "light"}
      className="!rounded-3xl !p-3 h-full transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:!shadow-[var(--sh-card)]"
      style={{ ["--spotlight-card-surface" as string]: "var(--b-surface)", ["--spotlight-card-shadow" as string]: "var(--sh-soft)" }}
      intensity={0.22}
      spotlightSize={300}
    >
      {live ? (
        <a href={product.href} target="_blank" rel="noopener noreferrer" className={inner}>
          {body}
        </a>
      ) : (
        <div className={inner}>{body}</div>
      )}
    </SpotlightCard>
  );
}

export function ProductsSection() {
  const { c } = useBrand();
  const items = ORDER.map((id) => c.products.items.find((item) => item.id === id)).filter((item): item is Product => Boolean(item));
  return (
    <section id="products" className="scroll-mt-32 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow={c.products.eyebrow} title={c.products.title} sub={c.products.sub} />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
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
