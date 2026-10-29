"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Download, AudioLines, Clapperboard, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
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

const CREATIVE_ORDER = ["download", "voice", "studio"];

const CATEGORY_LABELS: Record<string, string> = {
  download: "01 · Khai thác tư liệu",
  voice: "02 · Lồng tiếng phòng thu",
  studio: "03 · Xưởng dựng video",
};

function CreativeBentoCard({
  product,
  statusLabel,
  categoryLabel,
  index,
}: {
  product: Product;
  statusLabel: string;
  categoryLabel: string;
  index: number;
}) {
  const live = Boolean(product.href);

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-[var(--b-line)] bg-[var(--b-surface)] p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(107,93,70,0.08)] hover:shadow-[0_28px_56px_-16px_rgba(107,93,70,0.22)] transition-shadow duration-300"
    >
      {/* Top Meta & Action */}
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--b-brand)]">
            {categoryLabel}
          </span>
          <span className="t-small inline-flex items-center gap-1.5 rounded-full bg-[var(--b-chip)] px-2.5 py-0.5 text-xs text-[var(--b-muted)]">
            <span className={`h-1.5 w-1.5 rounded-full ${DOT[product.status]}`} aria-hidden="true" />
            {statusLabel}
          </span>
        </div>

        {/* Punchy Title */}
        <h3 className="t-title font-bold mt-4 text-[var(--b-ink)]">
          {product.name}
        </h3>

        {/* Short, crisp description */}
        <p className="t-body mt-2.5 text-sm text-[var(--b-muted)] leading-relaxed line-clamp-2">
          {product.tagline}
        </p>

        {/* Slite-style Pill CTA */}
        <div className="mt-4">
          {live ? (
            <a
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--b-line)] bg-[var(--b-lav)] px-3.5 py-1.5 text-xs font-semibold text-[var(--b-ink)] transition-colors hover:bg-[var(--b-chip-hover)] hover:border-[var(--b-ink)]/20"
            >
              <span>{product.cta || "Trải nghiệm ngay"}</span>
              <ArrowUpRight size={13} className="text-[var(--b-muted)]" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--b-line)] bg-[var(--b-chip)] px-3.5 py-1.5 text-xs font-semibold text-[var(--b-muted)]">
              <span>Sắp mở quyền truy cập</span>
            </span>
          )}
        </div>
      </div>

      {/* Visual Product Mockup Canvas */}
      <div className="relative mt-6 aspect-[16/11] w-full overflow-hidden rounded-2xl border border-[var(--b-line)] bg-[var(--b-lav)]/50 pt-2 shadow-inner">
        <ProductVisual product={product} flush />
      </div>
    </motion.div>
  );
}

export function ProductsSection() {
  const { c } = useBrand();
  const [activeStep, setActiveStep] = useState<number>(0);

  const items = CREATIVE_ORDER.map((id) =>
    c.products.items.find((item) => item.id === id)
  ).filter((item): item is Product => Boolean(item));

  const steps = [
    {
      num: "01",
      title: "Trích xuất tư liệu sạch",
      tool: "DownloadAnything",
      desc: "Tải video, audio gốc 4K không dính watermark từ 20+ nền tảng chỉ với 1 đường link.",
    },
    {
      num: "02",
      title: "Lồng giọng chuẩn phòng thu",
      tool: "Voice Studio",
      desc: "Chuyển kịch bản thành giọng đọc truyền cảm, nhân bản giọng nói AI đa ngôn ngữ.",
    },
    {
      num: "03",
      title: "Tự động dựng video hoàn chỉnh",
      tool: "AI42E Studio",
      desc: "Lắp ghép timeline, phụ đề thông minh và xuất bản video MP4 chuẩn định dạng số.",
    },
  ];

  return (
    <section id="products" className="relative z-10 scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Split Header: Left Title / Right Value Proposition */}
        <SectionHead
          align="split"
          eyebrow="Trục 01 · Sáng tạo Đa Phương Tiện"
          title="Từ ý tưởng thô đến video thành phẩm. Không cần mở 5 phần mềm."
          sub="Một chuỗi liên hoàn khép kín: bóc tách tư liệu sạch, lồng giọng phòng thu tự nhiên, và để AI tự động dựng video hoàn chỉnh cho bạn."
          extra={
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-medium text-[var(--b-muted)]">
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--b-chip)] px-3 py-1">
                <CheckCircle2 size={13} className="text-[#1a9b5a]" />
                100% Sạch watermark
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--b-chip)] px-3 py-1">
                <CheckCircle2 size={13} className="text-[#1a9b5a]" />
                Hỗ trợ 20+ nền tảng
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--b-chip)] px-3 py-1">
                <CheckCircle2 size={13} className="text-[#1a9b5a]" />
                Tự động hóa hoàn toàn
              </span>
            </div>
          }
        />

        {/* Animated Workflow Synergy Pipeline */}
        <Reveal delay={0.08} className="mt-12 sm:mt-16">
          <div className="relative rounded-3xl border border-[var(--b-line)] bg-[var(--b-lav)]/80 p-6 sm:p-8 shadow-[var(--sh-soft)] overflow-hidden">
            
            {/* Pipeline Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[var(--b-line)]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--b-brand)]">
                <Sparkles size={15} />
                <span>Quy trình sản xuất khép kín trong AI42E</span>
              </div>
              <span className="text-xs text-[var(--b-muted)] hidden sm:inline-block">
                Dữ liệu luân chuyển tự động qua 3 bước
              </span>
            </div>

            {/* 3 Interactive Pipeline Steps with Flow Connector */}
            <div className="relative mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Animated Connector Line for Desktop */}
              <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[2px] pointer-events-none z-0">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <line
                    x1="0%"
                    y1="0"
                    x2="100%"
                    y2="0"
                    stroke="var(--b-line)"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                  />
                  {/* Flowing animated dash */}
                  <motion.line
                    x1="0%"
                    y1="0"
                    x2="100%"
                    y2="0"
                    stroke="var(--b-brand)"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                    animate={{ strokeDashoffset: [0, -28] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                  />
                </svg>
              </div>

              {steps.map((step, idx) => (
                <div
                  key={step.num}
                  className="relative z-10 flex flex-col group cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[var(--b-line)] bg-[var(--b-surface)] font-bold text-sm text-[var(--b-ink)] shadow-sm transition-transform duration-200 group-hover:scale-110 group-hover:border-[var(--b-brand)] group-hover:text-[var(--b-brand)]">
                      {step.num}
                    </span>
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-[var(--b-brand)]">
                        {step.tool}
                      </span>
                      <h4 className="text-sm font-bold text-[var(--b-ink)]">
                        {step.title}
                      </h4>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-[var(--b-muted)] leading-relaxed pl-13">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 3 Bento Cards Stand Proud in a 3-Column Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((product, index) => (
            <CreativeBentoCard
              key={product.id}
              product={product}
              statusLabel={c.products.status[product.status]}
              categoryLabel={CATEGORY_LABELS[product.id] || "Sản phẩm AI"}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
