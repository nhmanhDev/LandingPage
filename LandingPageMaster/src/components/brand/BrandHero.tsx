"use client";

import { ArrowRight, Clapperboard, Gamepad2, Sparkles, Compass } from "lucide-react";
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

  const pillars = [
    {
      id: "creative",
      title: "Bộ Sáng tạo AI",
      tagline: "3 công cụ: Studio · Voice · Downloader",
      href: "#products",
      icon: Clapperboard,
      color: "#c2481f",
    },
    {
      id: "play",
      title: "Giải trí & Game",
      tagline: "11 trò chơi kết nối bạn bè & gia đình",
      href: "#play",
      icon: Gamepad2,
      color: "#1a9b5a",
    },
    {
      id: "horizon",
      title: "Không gian mở rộng",
      tagline: "OneForAll · AI42E Trading System",
      href: "#horizon",
      icon: Sparkles,
      color: "#d98a00",
    },
  ];

  return (
    <section id="top" className="relative min-h-[calc(100svh-8rem)] overflow-hidden">
      <Wall paused={reduced} text={c.wall} />
      {/* The wall melts into the page so the next section grows out of it instead of starting at a hard edge. */}
      <div className="hero-fade pointer-events-none absolute inset-x-0 bottom-0 z-[5]" aria-hidden="true" />

      <div className="pointer-events-none relative z-10 grid min-h-[calc(100svh-8rem)] place-items-center px-4 pb-20 pt-10 sm:pb-24">
        <div className="pointer-events-auto w-full max-w-[46rem] rounded-[36px] border border-[var(--b-line)] bg-[var(--b-surface)] p-8 text-center shadow-[0_30px_80px_-30px_rgba(107,93,70,0.35)] sm:p-12">
          
          <motion.p {...rise(0)} className="t-small mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-[var(--b-chip)] px-3.5 py-1.5 text-[var(--b-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--b-brand)]" aria-hidden="true" />
            {c.hero.eyebrow}
          </motion.p>

          <motion.h1 {...rise(0.05)} className="t-display">
            {c.hero.titleLine1}
            <br />
            <span className="brand-text">{c.hero.titleLine2}</span>
          </motion.h1>

          <motion.p {...rise(0.1)} className="t-body mx-auto mt-5 max-w-[32rem] text-[var(--b-muted)] leading-relaxed">
            {c.hero.sub}
          </motion.p>

          {/* Core Ecosystem Pillars Bar */}
          <motion.div {...rise(0.15)} className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <a
                  key={pillar.id}
                  href={pillar.href}
                  className="group flex flex-col justify-between rounded-2xl border border-[var(--b-line)] bg-[var(--b-lav)]/60 p-3.5 transition-all hover:bg-[var(--b-lav)] hover:-translate-y-0.5 hover:border-[var(--b-ink)]/30"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--b-surface)] shadow-2xs shrink-0"
                      style={{ color: pillar.color }}
                    >
                      <Icon size={15} aria-hidden />
                    </span>
                    <span className="text-xs font-bold text-[var(--b-ink)]">{pillar.title}</span>
                  </div>
                  <p className="mt-2 text-[11px] text-[var(--b-muted)] line-clamp-1">{pillar.tagline}</p>
                </a>
              );
            })}
          </motion.div>

          <motion.div {...rise(0.2)} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#products" className="pill pill-cta">
              {c.hero.ctaPrimary}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#founder" className="pill pill-outline">
              <Compass size={15} aria-hidden="true" />
              Triết lý AI42E
            </a>
          </motion.div>

          <motion.p {...rise(0.25)} className="t-small mt-4 text-xs text-[var(--b-muted)]">
            {c.hero.note}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
