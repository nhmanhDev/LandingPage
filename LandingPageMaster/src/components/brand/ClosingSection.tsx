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
      {/* Bọc 4: Inner CTA Card - Floating pure white card with golden ratio proportions */}
      <div className="w-full rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] border border-[var(--b-line)]/70 bg-white dark:bg-[#24201a] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.25)] relative overflow-hidden">
        <div className="relative z-10 grid items-center gap-6 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            {/* Eyebrow: Title Case, neutral muted */}
            <span className="block text-[13px] font-medium text-[var(--b-muted)] mb-2">
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

          {/* Right Visual: Orbit scaled generously to match SquareUi */}
          <div className="relative mx-auto h-[180px] w-full max-w-[340px] sm:h-[210px] lg:h-[230px]" aria-hidden="true">
            <OrbitImages
              images={ORBIT}
              shape="ellipse"
              radiusX={135}
              radiusY={72}
              rotation={-10}
              duration={36}
              itemSize={36}
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
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white dark:bg-[#2e2a24] border border-[var(--b-line)]/80 shadow-2xs">
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
