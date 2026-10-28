"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useBrand } from "./LocaleProvider";
import { useReducedMotion } from "./useReducedMotion";
import { Wall } from "./Wall";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function BrandHero() {
  const { c } = useBrand();
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative min-h-[calc(100svh-8rem)] overflow-hidden">
      <Wall paused={reduced} text={c.wall} />
      {/* The wall melts into the page so the next section grows out of it instead of starting at a hard edge. */}
      <div className="hero-fade pointer-events-none absolute inset-x-0 bottom-0 z-[5]" aria-hidden="true" />

      <div className="pointer-events-none relative z-10 grid min-h-[calc(100svh-8rem)] place-items-center px-4 pb-20 pt-10 sm:pb-24">
        <div className="pointer-events-auto w-full max-w-[42rem] rounded-[36px] border border-[var(--b-line)] bg-[var(--b-surface)] p-8 text-center shadow-[0_30px_80px_-30px_rgba(107,93,70,0.35)] sm:p-12">
          <motion.p {...rise(0)} className="t-small mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-[var(--b-chip)] px-3.5 py-1.5 text-[var(--b-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--b-brand)]" aria-hidden="true" />
            {c.hero.eyebrow}
          </motion.p>

          <motion.h1 {...rise(0.05)} className="t-display">
            {c.hero.titleLine1}
            <br />
            <span className="brand-text">{c.hero.titleLine2}</span>
          </motion.h1>

          <motion.p {...rise(0.1)} className="t-body mx-auto mt-5 max-w-[28rem] text-[var(--b-muted)] leading-relaxed">
            {c.hero.sub}
          </motion.p>

          <motion.div {...rise(0.15)} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#products" className="pill pill-accent pill-cta">
              {c.hero.ctaPrimary}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </motion.div>

          <motion.p {...rise(0.2)} className="t-small mt-5 text-[var(--b-muted)]">
            {c.hero.note}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
