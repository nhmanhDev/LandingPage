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
    <section id="top" className="relative min-h-[calc(100svh-4rem)] overflow-hidden flex items-center justify-center">
      <Wall paused={reduced} text={c.wall} />

      <div className="pointer-events-none relative z-10 w-full flex items-center justify-center px-4 py-4 sm:py-6">
        <div className="pointer-events-auto w-full max-w-[53.5rem] rounded-[38px] sm:rounded-[44px] border border-[var(--b-line)] bg-[var(--b-surface)] px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14 text-center shadow-[0_26px_75px_-22px_rgba(107,93,70,0.26)] dark:shadow-[0_26px_75px_-22px_rgba(0,0,0,0.7)]">

          <motion.h1 {...rise(0.05)} className="t-display">
            {c.hero.titleLine1}
            <br />
            <span className="brand-text">{c.hero.titleLine2}</span>
          </motion.h1>

          <motion.p {...rise(0.1)} className="t-body mx-auto mt-4 sm:mt-5 max-w-[38rem] text-[15.5px] sm:text-[16.5px] text-[var(--b-muted)] leading-relaxed">
            {c.hero.sub}
          </motion.p>

          {/* Core Ecosystem Pillars Bar */}
          <motion.div {...rise(0.15)} className="mt-7 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <a
                  key={pillar.id}
                  href={pillar.href}
                  className="group flex flex-col justify-between rounded-2xl border border-[var(--b-line)] bg-[var(--b-lav)]/60 p-3.5 sm:p-4 transition-all hover:bg-[var(--b-lav)] hover:-translate-y-0.5 hover:border-[var(--b-ink)]/30 hover:shadow-2xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="grid h-7.5 w-7.5 place-items-center rounded-xl bg-[var(--b-surface)] border border-[var(--b-line)]/50 text-[var(--b-brand)] shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                        <Icon size={15} aria-hidden />
                      </span>
                      <span className="text-[13.5px] sm:text-[14px] font-bold text-[var(--b-ink)]">{pillar.title}</span>
                    </div>
                    <p className="mt-1.5 text-[12px] sm:text-[12.5px] text-[var(--b-muted)] line-clamp-1">{pillar.tagline}</p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[var(--b-line)]/40 flex items-center justify-between text-[11.5px] font-medium text-[var(--b-brand)]">
                    <span>Khám phá</span>
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </div>
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
