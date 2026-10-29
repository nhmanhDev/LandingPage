"use client";

import { ArrowUpRight } from "lucide-react";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { RadarOrbit } from "./RadarOrbit";

export function ClosingSection() {
  const { c, locale } = useBrand();
  const isVi = locale === "vi";

  return (
    <Reveal>
      {/* Bọc 4: Inner CTA Card - Floating card with golden ratio proportions & concentric radar orbit */}
      <div className="w-full rounded-[22px] sm:rounded-[26px] lg:rounded-[28px] border border-[var(--b-line)]/70 bg-white dark:bg-[#24201a] px-6 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-6 shadow-[0_10px_28px_-6px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_28px_-6px_rgba(0,0,0,0.25)] relative overflow-hidden">
        <div className="relative z-10 grid items-center gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            {/* Eyebrow: Title Case, neutral muted */}
            <span className="block text-[13px] font-medium text-[var(--b-muted)] mb-1.5">
              {isVi ? "Khám phá hệ sinh thái" : "AI42E Ecosystem"}
            </span>

            {/* Headline: Clean Geometric Sans-serif, balanced sizing */}
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[var(--b-heading)] tracking-[-0.025em] leading-[1.2] mb-2 font-sans">
              {c.closing.title}
            </h2>

            {/* Description */}
            <p className="text-[13px] sm:text-[14px] text-[var(--b-muted)] leading-relaxed max-w-[420px] mb-4 font-sans">
              {c.closing.sub}
            </p>

            {/* CTA Button: Consistent brand terracotta orange across both Light and Dark theme */}
            <div>
              <a
                href="#products"
                className="pill pill-cta inline-flex items-center gap-2 !h-[40px] !px-5 text-[14px] font-semibold rounded-full shadow-xs"
              >
                <span>{c.closing.cta}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Visual: Concentric Radar Orbit matching SquareUi reference video */}
          <div className="relative flex items-center justify-center w-full min-h-[190px] sm:min-h-[210px] lg:min-h-[220px]">
            <RadarOrbit />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
