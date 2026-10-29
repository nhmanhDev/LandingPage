"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { ArrowUpRight } from "lucide-react";
import logo from "@/app/android-chrome-192x192.png";
import OrbitImages from "@/components/react-bits/OrbitImages";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { useMounted } from "./useMounted";
import { useReducedMotion } from "./useReducedMotion";

const ORBIT = [
  "/brand/tiles/game-oanquan.webp",
  "/brand/tiles/studio-hero.webp",
  "/brand/tiles/game-baucua.webp",
  "/brand/tiles/game-truth.webp",
  "/brand/tiles/game-puzzle.webp",
  "/brand/tiles/game-memory.webp",
];

export function ClosingSection() {
  const { c, locale } = useBrand();
  const paused = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const pathColor = mounted && resolvedTheme === "dark" ? "rgba(243,241,255,0.18)" : "rgba(45,47,52,0.12)";
  const isVi = locale === "vi";

  return (
    <Reveal>
      {/* Inner CTA Card: Scaled for exact 1-screen fit while keeping Card-in-Card ratio */}
      <div className="w-full rounded-2xl sm:rounded-3xl border border-[var(--b-line)]/70 bg-[#faf7f3] dark:bg-[#25221d] px-6 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-6 shadow-2xs relative overflow-hidden">
        <div className="relative z-10 grid items-center gap-6 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            {/* Eyebrow: Title Case, neutral muted */}
            <span className="block text-xs font-medium text-[var(--b-muted)] mb-1.5">
              {isVi ? "Khám phá hệ sinh thái" : "AI42E Ecosystem"}
            </span>

            {/* Headline: Clean Geometric Sans-serif, balanced sizing */}
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[var(--b-heading)] tracking-[-0.02em] leading-tight mb-2 font-sans">
              {c.closing.title}
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-[13.5px] text-[var(--b-muted)] leading-relaxed max-w-[420px] mb-4 font-sans">
              {c.closing.sub}
            </p>

            {/* CTA Button: Consistent brand terracotta orange across both Light and Dark theme */}
            <div>
              <a
                href="#products"
                className="pill pill-cta inline-flex items-center gap-1.5 !h-[40px] !px-5 text-xs sm:text-sm font-semibold rounded-full shadow-xs"
              >
                <span>{c.closing.cta}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Visual: Orbit scaled to fit comfortably */}
          <div className="relative mx-auto h-[140px] w-full max-w-[320px] sm:h-[150px]" aria-hidden="true">
            <OrbitImages
              images={ORBIT}
              shape="ellipse"
              radiusX={120}
              radiusY={65}
              rotation={-12}
              duration={36}
              itemSize={32}
              itemRadius={8}
              shadow={0.15}
              paused={paused}
              responsive
              showPath
              pathColor={pathColor}
              pathDash={4}
              width="100%"
              height="100%"
              centerContent={
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white dark:bg-[#2e2a24] border border-[var(--b-line)]/80 shadow-2xs">
                  <Image src={logo} alt="" width={20} height={20} className="rounded-md" />
                </span>
              }
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
