"use client";

import Image from "next/image";
import { ArrowUpRight, AudioLines, Boxes, CandlestickChart, Clapperboard, Download, Gamepad2 } from "lucide-react";
import type { Product, ProductIcon, ProductStatus } from "@/lib/brand/content";
import { IMAGE_SIZE } from "@/lib/brand/tiles";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";

const ICONS: Record<ProductIcon, React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>> = {
  studio: Clapperboard,
  voice: AudioLines,
  download: Download,
  game: Gamepad2,
  oneforall: Boxes,
  trading: CandlestickChart,
};

// The only colour in the UI chrome: a small dot that says whether the product is live.
const DOT: Record<ProductStatus, string> = {
  free: "bg-[#1a9b5a]",
  freemium: "bg-[#1a9b5a]",
  soon: "bg-[var(--b-muted)]",
  research: "bg-[var(--b-muted)]",
  maintenance: "bg-[#d98a00]",
};

function Thumb({ product }: { product: Product }) {
  const Icon = ICONS[product.icon];
  if (product.thumb) {
    const { w, h } = IMAGE_SIZE[product.thumb];
    return (
      <div className="overflow-hidden rounded-xl bg-[var(--b-chip)]" style={{ aspectRatio: "4 / 3" }}>
        <Image src={`/brand/tiles/${product.thumb}.webp`} alt="" width={w} height={h} unoptimized loading="lazy" className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div className="grid place-items-center rounded-xl bg-[var(--b-chip)] text-[var(--b-muted)]" style={{ aspectRatio: "16 / 7" }}>
      <Icon size={26} aria-hidden />
    </div>
  );
}

function Card({ product, statusLabel }: { product: Product; statusLabel: string }) {
  const live = Boolean(product.href);
  const body = (
    <>
      <Thumb product={product} />
      <div className="mt-4 flex items-center justify-between gap-3">
        <h3 className="t-heading">{product.name}</h3>
        <span className="t-small inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--b-chip)] px-2.5 py-1 text-[var(--b-muted)]">
          <span className={`h-1.5 w-1.5 rounded-full ${DOT[product.status]}`} aria-hidden="true" />
          {statusLabel}
        </span>
      </div>
      <p className="t-body mt-2 text-[var(--b-muted)]">{product.tagline}</p>
      <ul className="t-small mt-3 space-y-1.5 text-[var(--b-muted)]">
        {product.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span aria-hidden="true">–</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      {live ? (
        <span className="t-body mt-5 inline-flex items-center gap-1 font-medium">
          {product.cta}
          <ArrowUpRight size={16} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      ) : null}
    </>
  );

  const base = "group flex h-full flex-col rounded-[22px] bg-[var(--b-surface)] p-4 text-left transition-transform duration-300";
  return live ? (
    <a href={product.href} target="_blank" rel="noopener noreferrer" className={`${base} hover:-translate-y-1`}>
      {body}
    </a>
  ) : (
    <div className={base}>{body}</div>
  );
}

export function ProductsSection() {
  const { c } = useBrand();
  return (
    <section id="products" className="scroll-mt-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-xl">
          <h2 className="t-title">{c.products.title}</h2>
          <p className="t-body mt-3 text-[var(--b-muted)]">{c.products.sub}</p>
        </Reveal>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.products.items.map((product, index) => (
            <li key={product.id}>
              <Reveal delay={Math.min(index, 2) * 0.06} className="h-full">
                <Card product={product} statusLabel={c.products.status[product.status]} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
