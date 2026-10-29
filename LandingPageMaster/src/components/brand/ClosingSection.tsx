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
      <div className="w-full rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] border border-[var(--b-line)]/70 bg-white dark:bg-[#24201a] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.25)] relative overflow-hidden">
        <div className="relative z-10 grid items-center gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            {/* Eyebrow: Title Case, neutral muted */}
            <span className="block text-[14px] font-medium text-[var(--b-muted)] mb-2">
              {isVi ? "Khám phá hệ sinh thái" : "AI42E Ecosystem"}
            </span>

            {/* Headline: Clean Geometric Sans-serif, balanced sizing */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--b-heading)] tracking-[-0.025em] leading-[1.2] mb-3 font-sans">
              {c.closing.title}
            </h2>

            {/* Description */}
            <p className="t-body text-[var(--b-muted)] leading-relaxed max-w-[440px] mb-6 font-sans">
              {c.closing.sub}
            </p>

            {/* CTA Button: Consistent brand terracotta orange across both Light and Dark theme */}
            <div>
              <a
                href="#products"
                className="pill pill-cta inline-flex items-center gap-2 !h-[44px] !px-6 text-[15px] font-semibold rounded-full shadow-xs"
              >
                <span>{c.closing.cta}</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Visual: Concentric Radar Orbit matching SquareUi reference video */}
          <div className="relative flex items-center justify-center w-full min-h-[260px] sm:min-h-[290px] lg:min-h-[320px]">
            <RadarOrbit />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
