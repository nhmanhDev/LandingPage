"use client";

import { ArrowUpRight, ArrowRight, Download, AudioLines, Clapperboard, Sparkles } from "lucide-react";
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

// 3 Creative Tools in the multimedia production pipeline
const CREATIVE_ORDER = ["studio", "download", "voice"];
const SPAN: Record<string, string> = {
  studio: "lg:col-span-12",
  download: "sm:col-span-1 lg:col-span-6",
  voice: "sm:col-span-1 lg:col-span-6",
};

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
    <section id="products" className="relative z-10 -mt-10 scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead title={c.products.title} sub={c.products.sub} />

        {/* Closed-loop Workflow Synergy Banner */}
        <Reveal delay={0.08} className="mt-10 sm:mt-12">
          <div className="rounded-3xl border border-[var(--b-line)] bg-[var(--b-lav)] p-5 sm:p-7 shadow-[var(--sh-soft)]">
            <div className="flex items-center gap-2 mb-4 text-[13px] font-bold uppercase tracking-wider text-[var(--b-brand)]">
              <Sparkles size={14} />
              Dây chuyền phối hợp khép kín trong AI42E:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-3 rounded-2xl bg-[var(--b-surface)] p-3.5 border border-[var(--b-line)]">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-orange-500/10 text-[var(--b-brand)] font-bold text-[13px]">
                  01
                </span>
                <div className="min-w-0">
                  <span className="block text-[13px] font-bold text-[var(--b-ink)]">Khai thác tư liệu sạch</span>
                  <span className="block text-[12px] text-[var(--b-muted)] truncate">DownloadAnything tải video, audio 4K</span>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-[var(--b-surface)] p-3.5 border border-[var(--b-line)]">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-orange-500/10 text-[var(--b-brand)] font-bold text-[13px]">
                  02
                </span>
                <div className="min-w-0">
                  <span className="block text-[13px] font-bold text-[var(--b-ink)]">Lồng giọng truyền cảm</span>
                  <span className="block text-[12px] text-[var(--b-muted)] truncate">Voice Studio đọc văn bản & clone voice</span>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-[var(--b-surface)] p-3.5 border border-[var(--b-line)]">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-orange-500/10 text-[var(--b-brand)] font-bold text-[13px]">
                  03
                </span>
                <div className="min-w-0">
                  <span className="block text-[13px] font-bold text-[var(--b-ink)]">Dựng video tự động hóa</span>
                  <span className="block text-[12px] text-[var(--b-muted)] truncate">AI42E Studio xuất bản video hoàn chỉnh</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3 Creative Suite Bento Cards */}
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-12">
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
