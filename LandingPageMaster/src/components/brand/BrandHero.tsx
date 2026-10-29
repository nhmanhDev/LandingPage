"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Clapperboard, Gamepad2, Sparkles, CheckCircle2, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useBrand } from "./LocaleProvider";
import { useReducedMotion } from "./useReducedMotion";
import { Wall } from "./Wall";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function BrandHero() {
  const { c } = useBrand();
  const reduced = useReducedMotion();
  const [activePillar, setActivePillar] = useState<"creative" | "play" | "horizon">("creative");

  const tabs = [
    { id: "creative" as const, label: "Bộ Sáng tạo AI", sub: "3 công cụ sản xuất video", icon: Clapperboard, href: "#products" },
    { id: "play" as const, label: "Giải trí & Game", sub: "11 trò chơi kết nối gia đình", icon: Gamepad2, href: "#play" },
    { id: "horizon" as const, label: "Không gian mở rộng", sub: "OneForAll & Quant Lab", icon: Sparkles, href: "#horizon" },
  ];

  return (
    <section id="top" className="relative min-h-[calc(100svh-5rem)] overflow-hidden pt-8 pb-16">
      <Wall paused={reduced} text={c.wall} />
      
      {/* Soft gradient fade so the next section grows out of it */}
      <div className="hero-fade pointer-events-none absolute inset-x-0 bottom-0 z-[5]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow Pill */}
        <motion.div {...rise(0)} className="inline-flex items-center gap-2 rounded-full border border-[var(--b-line)] bg-[var(--b-surface)]/90 backdrop-blur-sm px-4 py-1.5 shadow-xs">
          <span className="h-2 w-2 rounded-full bg-[var(--b-brand)] animate-pulse" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--b-ink)]">
            Hệ sinh thái AI cho mọi người & mọi việc
          </span>
        </motion.div>

        {/* Display Title with Hand-drawn Accent */}
        <motion.h1 {...rise(0.06)} className="t-display text-4xl sm:text-6xl lg:text-7xl font-bold mt-6 tracking-tight text-[var(--b-ink)] leading-[1.08]">
          {c.hero.titleLine1}{" "}
          <span className="relative inline-block text-[var(--b-brand)]">
            {c.hero.titleLine2}
            {/* Handcrafted curve underline */}
            <svg
              className="absolute -bottom-2 left-0 w-full overflow-visible"
              height="10"
              viewBox="0 0 200 10"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M3 7C50 2 150 2 197 7"
                stroke="var(--b-accent)"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.75"
              />
            </svg>
          </span>
        </motion.h1>

        {/* Crisp Subheadline */}
        <motion.p {...rise(0.12)} className="t-body mx-auto mt-6 max-w-2xl text-base sm:text-lg text-[var(--b-muted)] leading-relaxed">
          Tạo video tự động, lồng giọng phòng thu, trích xuất tư liệu sạch và kết nối gia đình qua 11 tựa game. Mở trình duyệt là dùng ngay — không rào cản kỹ thuật.
        </motion.p>

        {/* Primary Actions */}
        <motion.div {...rise(0.18)} className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a href="#products" className="pill pill-brand inline-flex items-center gap-2 !py-3.5 !px-7 text-sm font-bold shadow-[0_12px_24px_-8px_rgba(194,72,31,0.4)]">
            <span>Khám phá hệ sinh thái</span>
            <ArrowRight size={16} />
          </a>
          <a href="#founder" className="pill pill-surface border border-[var(--b-line)] inline-flex items-center gap-2 !py-3.5 !px-6 text-sm font-semibold hover:border-[var(--b-ink)]/30">
            <span>Triết lý AI42E</span>
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div {...rise(0.22)} className="mt-5 flex items-center justify-center gap-4 text-xs font-medium text-[var(--b-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-[#1a9b5a]" />
            100% Khởi đầu 0đ
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-[#1a9b5a]" />
            Không yêu cầu thẻ tín dụng
          </span>
        </motion.div>

        {/* Slite-Style Ecosystem Interactive Stage */}
        <motion.div {...rise(0.26)} className="mt-12 sm:mt-14">
          <div className="overflow-hidden rounded-[36px] sm:rounded-[44px] border border-[var(--b-line)] bg-[var(--b-surface)]/95 backdrop-blur-md p-4 sm:p-6 shadow-[0_30px_70px_-25px_rgba(107,93,70,0.25)]">
            
            {/* Interactive Pillar Switcher Tabs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pb-4 border-b border-[var(--b-line)]">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activePillar === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActivePillar(tab.id)}
                    className={`relative w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2.5 rounded-2xl px-5 py-2.5 text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[var(--b-ink)] text-[var(--b-bg)] shadow-sm"
                        : "text-[var(--b-muted)] hover:bg-[var(--b-chip)] hover:text-[var(--b-ink)]"
                    }`}
                  >
                    <Icon size={16} />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Stage Canvas */}
            <div className="relative mt-4 aspect-[16/9] max-h-[460px] w-full overflow-hidden rounded-2xl bg-[var(--b-lav)]/60 flex items-center justify-center p-3 sm:p-5">
              <AnimatePresence mode="wait">
                {activePillar === "creative" && (
                  <motion.div
                    key="creative"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="relative w-full h-full flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--b-line)] px-2 text-xs">
                      <span className="font-bold text-[var(--b-ink)] flex items-center gap-1.5">
                        <Clapperboard size={14} className="text-[var(--b-brand)]" />
                        Chuỗi sản xuất video tự động: DownloadAnything ➔ Voice Studio ➔ AI42E Studio
                      </span>
                      <a href="#products" className="font-semibold text-[var(--b-brand)] hover:underline inline-flex items-center gap-1">
                        Xem chi tiết <ArrowUpRight size={12} />
                      </a>
                    </div>
                    <div className="relative flex-1 mt-3 overflow-hidden rounded-xl border border-[var(--b-line)] bg-[var(--b-surface)] flex items-center justify-center">
                      <Image
                        src="/brand/tiles/studio-hero.webp"
                        alt="AI42E Creative Suite"
                        fill
                        className="object-cover object-top"
                        unoptimized
                        priority
                      />
                    </div>
                  </motion.div>
                )}

                {activePillar === "play" && (
                  <motion.div
                    key="play"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="relative w-full h-full flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--b-line)] px-2 text-xs">
                      <span className="font-bold text-[var(--b-ink)] flex items-center gap-1.5">
                        <Gamepad2 size={14} className="text-[#1a9b5a]" />
                        Cổng trò chơi gắn kết: 11 tựa game mở sẵn tại play.ai42e.com
                      </span>
                      <a href="#play" className="font-semibold text-[var(--b-brand)] hover:underline inline-flex items-center gap-1">
                        Xem chi tiết <ArrowUpRight size={12} />
                      </a>
                    </div>
                    <div className="relative flex-1 mt-3 overflow-hidden rounded-xl border border-[var(--b-line)] bg-[var(--b-surface)] flex items-center justify-center">
                      <Image
                        src="/brand/tiles/play-family.webp"
                        alt="AI42E Game Hub"
                        fill
                        className="object-cover object-center"
                        unoptimized
                      />
                    </div>
                  </motion.div>
                )}

                {activePillar === "horizon" && (
                  <motion.div
                    key="horizon"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="relative w-full h-full flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--b-line)] px-2 text-xs">
                      <span className="font-bold text-[var(--b-ink)] flex items-center gap-1.5">
                        <Sparkles size={14} className="text-[var(--b-brand)]" />
                        Phòng nghiên cứu mở rộng: OneForAll & AI42E Trading System
                      </span>
                      <a href="#horizon" className="font-semibold text-[var(--b-brand)] hover:underline inline-flex items-center gap-1">
                        Xem chi tiết <ArrowUpRight size={12} />
                      </a>
                    </div>
                    <div className="relative flex-1 mt-3 overflow-hidden rounded-xl border border-[var(--b-line)] bg-[var(--b-surface)] p-6 flex flex-col items-center justify-center text-center">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--b-chip)] text-[var(--b-brand)] mb-3">
                        <Sparkles size={24} />
                      </span>
                      <h4 className="font-bold text-base text-[var(--b-ink)]">Công nghệ đang nghiên cứu & ươm mầm</h4>
                      <p className="text-xs text-[var(--b-muted)] max-w-md mt-1.5">
                        Khám phá trạm tiện ích AI bỏ túi OneForAll và hệ thống thuật toán phân tích thị trường Quant AI.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
