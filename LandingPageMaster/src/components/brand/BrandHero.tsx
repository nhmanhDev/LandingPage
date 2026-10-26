"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { motion } from "motion/react";
import { useBrand } from "./LocaleProvider";
import { Wall } from "./Wall";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (listener: () => void) => {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
};
const getReduced = () => window.matchMedia(REDUCED_QUERY).matches;

export function BrandHero() {
  const { c } = useBrand();
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, () => false);
  const [userPaused, setUserPaused] = useState(false);
  const paused = userPaused || reduced;

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <Wall paused={paused} text={c.wall} />

      <div className="pointer-events-none relative z-10 grid min-h-[100svh] place-items-center px-4 pb-24 pt-24">
        <div className="pointer-events-auto w-full max-w-[34rem] rounded-[28px] bg-[var(--b-surface)] p-7 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] sm:p-10">
          <motion.p {...rise(0)} className="t-small mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-[var(--b-chip)] px-3.5 py-1.5 text-[var(--b-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--b-ink)]" aria-hidden="true" />
            {c.hero.eyebrow}
          </motion.p>

          <motion.h1 {...rise(0.05)} className="t-display">
            {c.hero.titleLine1}
            <br />
            {c.hero.titleLine2}
          </motion.h1>

          <motion.p {...rise(0.1)} className="t-body mx-auto mt-5 max-w-[26rem] text-[var(--b-muted)]">
            {c.hero.sub}
          </motion.p>

          <motion.div {...rise(0.15)} className="mt-7 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
            <a href="#products" className="pill pill-solid">
              {c.hero.ctaPrimary}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="https://studio.ai42e.com" className="pill">
              {c.hero.ctaSecondary}
            </a>
          </motion.div>

          <motion.p {...rise(0.2)} className="t-small mt-5 text-[var(--b-muted)]">
            {c.hero.note}
          </motion.p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex items-center justify-center gap-2 px-4">
        <button
          type="button"
          onClick={() => setUserPaused((value) => !value)}
          aria-pressed={paused}
          disabled={reduced}
          className="pill pointer-events-auto"
        >
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          {paused ? c.ui.play : c.ui.pause}
        </button>
        <span className="pill pointer-events-none hidden sm:inline-flex">{c.ui.hint}</span>
      </div>
    </section>
  );
}
