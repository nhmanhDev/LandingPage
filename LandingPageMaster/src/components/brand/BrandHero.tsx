"use client";

import { Clapperboard, Gamepad2, Sparkles } from "lucide-react";
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
    },
    {
      id: "play",
      title: "Giải trí & Game",
      tagline: "11 trò chơi kết nối bạn bè & gia đình",
      href: "#play",
      icon: Gamepad2,
    },
    {
      id: "horizon",
      title: "Không gian mở rộng",
      tagline: "OneForAll · AI42E Trading System",
      href: "#horizon",
      icon: Sparkles,
    },
  ];

  return (
    <section id="top" className="relative min-h-[calc(100svh-8rem)] overflow-hidden">
      <Wall paused={reduced} text={c.wall} />
      {/* The wall melts into the page so the next section grows out of it instead of starting at a hard edge. */}
      <div className="hero-fade pointer-events-none absolute inset-x-0 bottom-0 z-[5]" aria-hidden="true" />

      <div className="pointer-events-none relative z-10 grid min-h-[calc(100svh-8rem)] place-items-center px-4 pb-16 pt-8 sm:pb-20">
        <div className="pointer-events-auto w-full max-w-[53rem] rounded-[36px] sm:rounded-[42px] border border-[var(--b-line)] bg-[var(--b-surface)] p-8 sm:p-12 lg:p-14 text-center shadow-[0_30px_90px_-25px_rgba(107,93,70,0.32)] dark:shadow-[0_30px_90px_-25px_rgba(0,0,0,0.7)]">

          <motion.h1 {...rise(0.05)} className="t-display">
            {c.hero.titleLine1}
            <br />
            <span className="brand-text">{c.hero.titleLine2}</span>
          </motion.h1>

          <motion.p {...rise(0.1)} className="t-body mx-auto mt-5 max-w-[38rem] text-[15px] sm:text-[17px] text-[var(--b-muted)] leading-relaxed">
            {c.hero.sub}
          </motion.p>

          {/* Core Ecosystem Pillars Bar */}
          <motion.div {...rise(0.15)} className="mt-9 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5 text-left">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <a
                  key={pillar.id}
                  href={pillar.href}
                  className="group flex flex-col justify-between rounded-2xl border border-[var(--b-line)] bg-[var(--b-lav)]/60 p-4 transition-all hover:bg-[var(--b-lav)] hover:-translate-y-0.5 hover:border-[var(--b-ink)]/30"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-[var(--b-surface)] border border-[var(--b-line)]/50 text-[var(--b-brand)] shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                      <Icon size={16} aria-hidden />
                    </span>
                    <span className="text-[13.5px] sm:text-[14px] font-bold text-[var(--b-ink)]">{pillar.title}</span>
                  </div>
                  <p className="mt-2 text-[12px] sm:text-[12.5px] text-[var(--b-muted)] line-clamp-1">{pillar.tagline}</p>
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
