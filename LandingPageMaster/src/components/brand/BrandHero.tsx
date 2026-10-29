"use client";

import { ArrowRight, Clapperboard, Gamepad2, Sparkles } from "lucide-react";
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
    <section id="top" className="relative min-h-[calc(100svh-4rem)] overflow-hidden">
      <Wall paused={reduced} text={c.wall} />
      {/* The wall melts softly into the page right at the bottom edge */}
      <div className="hero-fade pointer-events-none absolute inset-x-0 bottom-0 z-[5]" aria-hidden="true" />

      <div className="pointer-events-none relative z-10 flex min-h-[calc(100svh-4rem)] items-center justify-center px-4 py-8 sm:py-12 lg:py-14">
        <div className="pointer-events-auto w-full max-w-[54rem] rounded-[38px] sm:rounded-[44px] border border-[var(--b-line)] bg-[var(--b-surface)] px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 text-center shadow-[0_30px_90px_-25px_rgba(107,93,70,0.32)] dark:shadow-[0_30px_90px_-25px_rgba(0,0,0,0.7)]">

          <motion.h1 {...rise(0.05)} className="t-display">
            {c.hero.titleLine1}
            <br />
            <span className="brand-text">{c.hero.titleLine2}</span>
          </motion.h1>

          <motion.p {...rise(0.1)} className="t-body mx-auto mt-6 sm:mt-8 max-w-[42rem] text-[16px] sm:text-[18px] text-[var(--b-muted)] leading-relaxed">
            {c.hero.sub}
          </motion.p>

          {/* Core Ecosystem Pillars Bar */}
          <motion.div {...rise(0.15)} className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 text-left">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <a
                  key={pillar.id}
                  href={pillar.href}
                  className="group flex flex-col justify-between rounded-2xl border border-[var(--b-line)] bg-[var(--b-lav)]/60 p-4 sm:p-5 transition-all hover:bg-[var(--b-lav)] hover:-translate-y-1 hover:border-[var(--b-ink)]/30 hover:shadow-xs"
                >
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--b-surface)] border border-[var(--b-line)]/50 text-[var(--b-brand)] shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                        <Icon size={17} aria-hidden />
                      </span>
                      <span className="text-[14px] sm:text-[15px] font-bold text-[var(--b-ink)]">{pillar.title}</span>
                    </div>
                    <p className="mt-2.5 text-[12.5px] sm:text-[13px] text-[var(--b-muted)] leading-relaxed">{pillar.tagline}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--b-line)]/50 flex items-center justify-between text-[12px] font-semibold text-[var(--b-brand)] opacity-85 group-hover:opacity-100">
                    <span>Khám phá</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
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
