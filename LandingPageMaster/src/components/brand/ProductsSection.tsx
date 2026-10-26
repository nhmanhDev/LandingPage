"use client";

import { ArrowUpRight, AudioLines, Boxes, CandlestickChart, Clapperboard, Download, Gamepad2 } from "lucide-react";
import type { Product, ProductIcon, ProductStatus } from "@/lib/brand/content";
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

const ACCENT: Record<ProductIcon, string> = {
  studio: "var(--b-primary)",
  voice: "var(--b-sky)",
  download: "var(--b-green)",
  game: "var(--b-amber)",
  oneforall: "var(--b-primary)",
  trading: "var(--b-sky)",
};

const BADGE: Record<ProductStatus, string> = {
  free: "bg-[var(--b-green)]/14 text-[var(--b-green)]",
  freemium: "bg-[var(--b-primary)]/14 text-[var(--b-primary)]",
  soon: "bg-[var(--b-chip)] text-[var(--b-muted)]",
  research: "bg-[var(--b-chip)] text-[var(--b-muted)]",
};

function Card({ product, statusLabel, openLabel }: { product: Product; statusLabel: string; openLabel: string }) {
  const Icon = ICONS[product.icon];
  const live = Boolean(product.href);
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span
          className="grid h-11 w-11 place-items-center rounded-xl"
          style={{ color: ACCENT[product.icon], background: `color-mix(in srgb, ${ACCENT[product.icon]} 13%, transparent)` }}
        >
          <Icon size={22} aria-hidden />
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${BADGE[product.status]}`}>{statusLabel}</span>
      </div>
      <h3 className="mt-5 font-[family-name:var(--font-space-grotesk)] text-xl font-semibold tracking-tight">{product.name}</h3>
      <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--b-muted)]">{product.tagline}</p>
      <ul className="mt-4 space-y-2 text-sm text-[var(--b-muted)]">
        {product.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2.5">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ background: ACCENT[product.icon] }} aria-hidden="true" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      {live ? (
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: ACCENT[product.icon] }}>
          {product.cta ?? openLabel}
          <ArrowUpRight size={16} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      ) : null}
    </>
  );

  const base =
    "group flex h-full flex-col rounded-3xl border border-[var(--b-line)] bg-[var(--b-surface)] p-6 text-left transition-[transform,box-shadow] duration-300";
  return live ? (
    <a
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(40,30,90,0.28)]`}
    >
      {body}
    </a>
  ) : (
    <div className={base}>{body}</div>
  );
}

export function ProductsSection() {
  const { c } = useBrand();
  return (
    <section id="products" className="scroll-mt-20 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-serif)] text-4xl leading-tight tracking-[-0.015em] sm:text-5xl">{c.products.title}</h2>
          <p className="mt-4 text-base text-[var(--b-muted)] sm:text-lg">{c.products.sub}</p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.products.items.map((product, index) => (
            <li key={product.id}>
              <Reveal delay={Math.min(index, 2) * 0.07} className="h-full">
                <Card product={product} statusLabel={c.products.status[product.status]} openLabel={c.nav.open} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
