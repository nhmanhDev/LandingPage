"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { ArrowRight } from "lucide-react";
import logo from "@/app/android-chrome-192x192.png";
import OrbitImages from "@/components/react-bits/OrbitImages";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
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
  const pathColor = mounted && resolvedTheme === "dark" ? "rgba(243,241,255,0.22)" : "rgba(45,47,52,0.18)";
  const isVi = locale === "vi";

  return (
    <Reveal>
      {/* Inner Elevated CTA Card (SquareUi Card-in-Card pattern) */}
      <div className="rounded-2xl sm:rounded-3xl border border-[var(--b-line)] bg-[var(--b-surface)] p-5 sm:p-7 lg:p-8 shadow-xs relative overflow-hidden">
        <div className="relative z-10 grid items-center gap-6 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="eyebrow block text-[11px] font-semibold uppercase tracking-wider text-[var(--b-brand)] mb-1.5">
              {isVi ? "Hệ sinh thái AI42E" : "AI42E Ecosystem"}
            </span>
            <SectionTitle text={c.closing.title} className="t-title text-2xl sm:text-3xl lg:text-[2rem] font-bold text-[var(--b-ink)] leading-tight" />
            <p className="t-body mt-2 max-w-md text-xs sm:text-sm text-[var(--b-muted)] leading-relaxed">
              {c.closing.sub}
            </p>
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-3">
              <a
                href="#products"
                className="pill pill-cta inline-flex items-center gap-2 !py-2 !px-4 sm:!py-2.5 sm:!px-5 text-xs sm:text-sm font-semibold"
              >
                <span>{c.closing.cta}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="pill pill-outline inline-flex items-center gap-1.5 !py-2 !px-4 sm:!py-2.5 sm:!px-5 text-xs sm:text-sm font-semibold"
              >
                {c.closing.cta2}
              </a>
            </div>
            <p className="t-small mt-2.5 text-[11px] text-[var(--b-muted)]">{c.closing.trust}</p>
          </div>

          <div className="relative mx-auto h-[155px] w-full max-w-[340px] sm:h-[175px]" aria-hidden="true">
            <OrbitImages
              images={ORBIT}
              shape="ellipse"
              radiusX={130}
              radiusY={70}
              rotation={-12}
              duration={36}
              itemSize={44}
              itemRadius={11}
              shadow={0.25}
              paused={paused}
              responsive
              showPath
              pathColor={pathColor}
              pathDash={4}
              width="100%"
              height="100%"
              centerContent={
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--b-surface)] border border-[var(--b-line)] shadow-sm">
                  <Image src={logo} alt="" width={26} height={26} className="rounded-lg" />
                </span>
              }
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
