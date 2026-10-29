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
      {/* Inner CTA Card: Exact SquareUi Card-in-Card aspect ratio and internal padding */}
      <div className="w-full rounded-[28px] sm:rounded-[34px] border border-[var(--b-line)]/70 bg-[#fafafb] dark:bg-[#25221d] px-8 py-12 sm:px-12 sm:py-14 lg:px-14 lg:py-16 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)] dark:shadow-none relative overflow-hidden">
        <div className="relative z-10 grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            {/* Eyebrow: Title Case, neutral muted, medium weight */}
            <span className="block text-xs sm:text-[13px] font-medium text-[var(--b-muted)] mb-3 sm:mb-4">
              {isVi ? "Khám phá hệ sinh thái" : "Become an Affiliate"}
            </span>

            {/* Headline: Clean Geometric Sans-serif, tight tracking and line-height */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[var(--b-heading)] tracking-[-0.025em] leading-[1.2] mb-3 sm:mb-3.5 font-sans">
              {c.closing.title}
            </h2>

            {/* Description: Generous line-height, muted text */}
            <p className="text-sm sm:text-[14.5px] text-[var(--b-muted)] leading-[1.6] max-w-[420px] mb-8 sm:mb-9 font-sans">
              {c.closing.sub}
            </p>

            {/* CTA Button: Single focused primary pill button with arrow up-right */}
            <div>
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 h-[47px] px-7 rounded-full bg-[#18181b] dark:bg-[#e65d28] text-white hover:bg-[#27272a] dark:hover:bg-[#d44e1c] text-sm font-medium transition-all duration-150 hover:shadow-sm"
              >
                <span>{c.closing.cta}</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Visual: Delicate Orbit with small avatar badges */}
          <div className="relative mx-auto h-[180px] w-full max-w-[360px] sm:h-[200px]" aria-hidden="true">
            <OrbitImages
              images={ORBIT}
              shape="ellipse"
              radiusX={135}
              radiusY={75}
              rotation={-12}
              duration={36}
              itemSize={34}
              itemRadius={9}
              shadow={0.15}
              paused={paused}
              responsive
              showPath
              pathColor={pathColor}
              pathDash={4}
              width="100%"
              height="100%"
              centerContent={
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white dark:bg-[#2e2a24] border border-[var(--b-line)]/80 shadow-2xs">
                  <Image src={logo} alt="" width={22} height={22} className="rounded-md" />
                </span>
              }
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
