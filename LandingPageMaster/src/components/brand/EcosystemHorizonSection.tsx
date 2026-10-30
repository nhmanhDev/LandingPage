"use client";

import { useRef } from "react";
import Image from "next/image";
import { AudioLines, Download, Languages, Sparkles } from "lucide-react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import logo from "@/app/android-chrome-192x192.png";
import type { Product } from "@/lib/brand/content";
import { useBrand } from "./LocaleProvider";
import { ScrollTilt } from "./ScrollMotion";
import { SectionHead } from "./SectionHead";
import { useReducedMotion } from "./useReducedMotion";

const ONEFORALL_ICONS = [Download, AudioLines, Languages, Sparkles];

/** Decorative illustration of floating utility tools for OneForAll. */
function OneForAllSketch() {
  return (
    <div
      data-decor=""
      aria-hidden="true"
      className="mt-6 flex h-[110px] items-center justify-center gap-3 overflow-hidden rounded-[18px] bg-[var(--b-chip)] p-4"
    >
      {ONEFORALL_ICONS.map((Icon, index) => (
        <div
          key={index}
          className="float grid h-12 w-12 place-items-center rounded-2xl border border-[var(--b-line)] bg-[var(--b-surface)] text-[var(--b-brand)] shadow-[var(--sh-soft)]"
          style={{
            ["--r" as string]: `${index % 2 === 0 ? -3 : 3}deg`,
            animationDelay: `${index * -1.4}s`,
          }}
        >
          <Icon size={19} strokeWidth={1.8} />
        </div>
      ))}
    </div>
  );
}

/** Decorative sketch of a price line scrubbed bidirectionally by scroll. It is an illustration, not market data. */
function TradingSketch({ progress, reduced }: { progress: MotionValue<number>; reduced: boolean }) {
  const points = Array.from({ length: 40 }, (_, i) => {
    const x = (i / 39) * 100;
    const y = 58 - i * 0.55 + Math.sin(i * 0.6) * 9 + Math.sin(i * 1.7) * 4;
    return [x, y] as const;
  });
  const line = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const lastPoint = points[points.length - 1];
  const curveLength = useTransform(progress, [0, 1], [0.22, 1]);

  return (
    <div data-decor="" className="mt-6 h-[110px] overflow-hidden rounded-[18px] bg-[var(--b-chip)] p-4" aria-hidden="true">
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="h-full w-full text-[var(--b-brand)]">
        <defs>
          <linearGradient id="trade-glow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.24" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${line} L100 60 L0 60 Z`} fill="url(#trade-glow)" />
        {reduced ? (
          <path
            d={line}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ) : (
          <motion.path
            d={line}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: curveLength }}
          />
        )}
        <circle cx={lastPoint[0]} cy={lastPoint[1]} r="2.2" fill="currentColor" className="live-dot" />
      </svg>
    </div>
  );
}

function HorizonNode({ product, statusLabel, children }: { product: Product; statusLabel: string; children?: React.ReactNode }) {
  return (
    <article className="flex h-full flex-col justify-between rounded-[28px] border border-[var(--b-line)] bg-[var(--b-surface)] p-7 shadow-[var(--sh-card)] transition-transform duration-300 hover:-translate-y-1 sm:p-8">
      <div>
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
      </div>
      {children}
    </article>
  );
}

/** Canvas on graph paper: the ecosystem hub at the top, scroll-scrubbed energy circuit feeding two research nodes. */
export function EcosystemHorizonSection() {
  const { c } = useBrand();
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLDivElement>(null);
  const h = c.horizon;
  const oneForAll = c.products.items.find((item) => item.id === "oneforall");
  const trading = c.products.items.find((item) => item.id === "trading");

  const { scrollYProgress } = useScroll({
    target: canvasRef,
    offset: ["start 0.85", "center 0.42"],
  });
  const smoothCircuit = useSpring(scrollYProgress, {
    stiffness: 135,
    damping: 26,
    mass: 0.45,
  });
  const branchLength = useTransform(smoothCircuit, [0, 1], [0.05, 1]);

  if (!oneForAll || !trading) return null;

  return (
    <section id="horizon" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead title={h.title} sub={h.sub} />

        <div ref={canvasRef} className="relative mt-12 sm:mt-16">
          <ScrollTilt tiltX={5} yRange={[32, -22]} scaleEdge={0.968}>
            <div
              className="relative overflow-hidden rounded-[40px] border border-[var(--b-line)] bg-[var(--b-bg)] px-4 pb-10 pt-12 sm:px-10 sm:pb-12 sm:pt-16"
              style={{
                backgroundImage:
                  "linear-gradient(to right, color-mix(in srgb, var(--b-ink) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--b-ink) 6%, transparent) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            >
              {/* Hub */}
              <div className="relative z-10 mx-auto flex w-fit flex-col items-center">
                <div className="relative grid h-20 w-20 place-items-center rounded-[24px] border border-[var(--b-line)] bg-[var(--b-surface)] shadow-[var(--sh-card)]">
                  <span aria-hidden="true" className="ripple pointer-events-none absolute inset-0 rounded-[24px] border border-[var(--b-brand)]/40" />
                  <Image src={logo} alt="" width={38} height={38} className="rounded-xl" />
                </div>
                <p className="t-small mt-3 font-semibold text-[var(--b-muted)]">{h.hub}</p>
              </div>

              {/* Scroll-scrubbed circuit branches connecting AI42E Hub -> OneForAll & Trading (desktop) */}
              <div aria-hidden="true" className="relative mx-auto hidden h-16 max-w-4xl md:block">
                <svg viewBox="0 0 800 64" preserveAspectRatio="none" className="h-full w-full overflow-visible">
                  <path
                    d="M 400 0 V 26 H 200 V 64"
                    fill="none"
                    stroke="var(--b-muted)"
                    strokeOpacity="0.35"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M 400 0 V 26 H 600 V 64"
                    fill="none"
                    stroke="var(--b-muted)"
                    strokeOpacity="0.35"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    vectorEffect="non-scaling-stroke"
                  />
                  {!reduced ? (
                    <>
                      <motion.path
                        d="M 400 0 V 26 H 200 V 64"
                        fill="none"
                        stroke="var(--b-brand)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        style={{ pathLength: branchLength }}
                      />
                      <motion.path
                        d="M 400 0 V 26 H 600 V 64"
                        fill="none"
                        stroke="var(--b-brand)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        style={{ pathLength: branchLength }}
                      />
                    </>
                  ) : null}
                  <circle cx="400" cy="26" r="3.5" fill="var(--b-brand)" />
                </svg>
              </div>

              <div className="relative z-10 mt-6 md:mt-0 mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
                <HorizonNode product={oneForAll} statusLabel={c.products.status[oneForAll.status]}>
                  <OneForAllSketch />
                </HorizonNode>

                <div className="relative">
                  {/* Chip pointing at the node: the status the team wants people to see first */}
                  <div className="t-small absolute -top-4 right-6 z-20 hidden rounded-[18px] border border-[var(--b-brand)]/30 bg-[var(--b-lav)] px-4 py-2.5 font-semibold text-[var(--b-ink)] bg-white/95 dark:bg-[#25221d] border border-[var(--b-brand)]/35 shadow-[var(--sh-soft)] sm:block">
                    {trading.bullets[1]}
                  </div>
                  <HorizonNode product={trading} statusLabel={c.products.status[trading.status]}>
                    <TradingSketch progress={smoothCircuit} reduced={reduced} />
                  </HorizonNode>
                </div>
              </div>
            </div>
          </ScrollTilt>

          <p className="t-small mx-auto mt-8 max-w-xl text-center text-[var(--b-muted)]">{h.footnote}</p>
        </div>
      </div>
    </section>
  );
}
