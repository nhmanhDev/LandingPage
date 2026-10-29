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
  const { c } = useBrand();
  const paused = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const pathColor = mounted && resolvedTheme === "dark" ? "rgba(243,241,255,0.22)" : "rgba(45,47,52,0.18)";

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-[36px] sm:rounded-[40px] border border-[var(--b-line)] bg-[var(--b-lav)] p-6 sm:p-8 lg:p-9 shadow-[var(--sh-card)] relative overflow-hidden">
            <div className="relative z-10 grid items-center gap-6 md:grid-cols-[1.15fr_0.85fr]">
              <div>
                <SectionTitle text={c.closing.title} className="t-title font-bold text-[var(--b-ink)]" />
                <p className="t-body mt-2.5 max-w-md text-sm sm:text-base text-[var(--b-muted)] leading-relaxed">
                  {c.closing.sub}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href="#products"
                    className="pill pill-cta inline-flex items-center gap-2 !py-2.5 !px-5 text-sm font-semibold"
                  >
                    <span>{c.closing.cta}</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>
                  <a
                    href="#contact"
                    className="pill pill-outline inline-flex items-center gap-1.5 !py-2.5 !px-5 text-sm font-semibold"
                  >
                    {c.closing.cta2}
                  </a>
                </div>
                <p className="t-small mt-3 text-xs text-[var(--b-muted)]">{c.closing.trust}</p>
              </div>

              <div className="relative mx-auto h-[170px] w-full max-w-[360px] sm:h-[190px]" aria-hidden="true">
                <OrbitImages
                  images={ORBIT}
                  shape="ellipse"
                  radiusX={135}
                  radiusY={75}
                  rotation={-12}
                  duration={36}
                  itemSize={46}
                  itemRadius={12}
                  shadow={0.25}
                  paused={paused}
                  responsive
                  showPath
                  pathColor={pathColor}
                  pathDash={4}
                  width="100%"
                  height="100%"
                  centerContent={
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--b-surface)] border border-[var(--b-line)] shadow-sm">
                      <Image src={logo} alt="" width={28} height={28} className="rounded-lg" />
                    </span>
                  }
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
