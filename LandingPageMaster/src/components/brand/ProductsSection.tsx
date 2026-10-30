"use client";

import { useRef } from "react";
import { ArrowUpRight, AudioLines, Clapperboard, Download } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import type { Product, ProductStatus } from "@/lib/brand/content";
import { useBrand } from "./LocaleProvider";
import { ProductVisual } from "./ProductVisual";
import { Reveal } from "./Reveal";
import { ScrollTilt } from "./ScrollMotion";
import { SectionHead } from "./SectionHead";
import { useReducedMotion } from "./useReducedMotion";

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

function Card({ product, statusLabel, reduced }: { product: Product; statusLabel: string; reduced: boolean }) {
  const live = Boolean(product.href);
  const isWide = product.id === "studio";
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 150, damping: 28, mass: 0.45 });
  const visualY = useTransform(smooth, [0, 0.5, 1], [22, 0, -14]);

  const onMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduced || !spotRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    spotRef.current.style.background = `radial-gradient(420px circle at ${x.toFixed(0)}px ${y.toFixed(0)}px, color-mix(in srgb, var(--b-accent) 13%, transparent), transparent 72%)`;
    spotRef.current.style.opacity = "1";
  };

  const onLeave = () => {
    if (spotRef.current) spotRef.current.style.opacity = "0";
  };

  const body = (
    <>
      <span
        ref={spotRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
      />
      <div className="card-copy relative z-10">
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
      <motion.div className="card-visual relative z-10" style={reduced ? undefined : { y: visualY, willChange: "transform" }}>
        <ProductVisual product={product} flush />
      </motion.div>
    </>
  );

  const className = `sand-card ${isWide ? "sand-card-wide" : ""} group`;
  return (
    <div ref={cardRef} className="relative h-full">
      {live ? (
        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          {body}
        </a>
      ) : (
        <div className={className} onPointerMove={onMove} onPointerLeave={onLeave}>
          {body}
        </div>
      )}
    </div>
  );
}

export function ProductsSection() {
  const { c } = useBrand();
  const reduced = useReducedMotion();
  const stepsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsRef,
    offset: ["start 0.88", "end 0.32"],
  });
  const smoothSteps = useSpring(stepsProgress, { stiffness: 140, damping: 28, mass: 0.45 });
  const beamScale = useTransform(smoothSteps, [0, 1], [0.06, 1]);

  const items = CREATIVE_ORDER.map((id) => c.products.items.find((item) => item.id === id)).filter((item): item is Product => Boolean(item));

  return (
    <section id="products" className="relative z-10 scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow={c.products.eyebrow} title={c.products.title} sub={c.products.sub} />

        {/* Pipeline strip: three steps separated by hairlines + bidirectional scroll-scrubbed progress beam */}
        <div ref={stepsRef} className="relative mt-12 sm:mt-16">
          <div aria-hidden="true" className="mb-8 hidden h-[2px] w-full overflow-hidden rounded-full bg-[var(--b-line)] md:block">
            <motion.div
              className="h-full w-full origin-left rounded-full bg-[var(--b-brand)]"
              style={reduced ? undefined : { scaleX: beamScale, willChange: "transform" }}
            />
          </div>

          <Reveal delay={0.06}>
            <ol className="grid md:grid-cols-3">
              {c.products.steps.map((step, index) => {
                const Icon = STEP_ICONS[index];
                return (
                  <li
                    key={step.title}
                    className="group/step flex flex-col items-start border-t border-[var(--b-line)] py-7 first:border-t-0 md:border-t-0 md:border-l md:px-8 md:py-0 md:first:border-l-0 md:first:pl-0"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--b-surface)] text-[var(--b-brand)] shadow-[var(--sh-soft)] transition-transform duration-300 group-hover/step:scale-110 group-hover/step:-translate-y-0.5">
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
        </div>

        {/* Product cards: Studio full width, Downloader and Voice side by side */}
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-12 sm:mt-16">
          {items.map((product, index) => {
            const tiltY = product.id === "download" ? 3.5 : product.id === "voice" ? -3.5 : 0;
            return (
              <li key={product.id} className={SPAN[product.id]}>
                <ScrollTilt
                  className="h-full"
                  tiltX={product.id === "studio" ? 5.5 : 6.5}
                  tiltY={tiltY}
                  yRange={[36 + index * 6, -(22 + index * 4)]}
                  scaleEdge={0.964}
                >
                  <Card product={product} statusLabel={c.products.status[product.status]} reduced={reduced} />
                </ScrollTilt>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
