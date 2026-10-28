"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { ArrowRight } from "lucide-react";
import logo from "@/app/android-chrome-192x192.png";
import Magnet from "@/components/react-bits/Magnet";
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

/** The warm sand call-to-action billboard inspired by Slite's signature closing cards. */
export function ClosingSection() {
  const { c } = useBrand();
  const paused = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const pathColor = mounted && resolvedTheme === "dark" ? "rgba(243,241,255,0.22)" : "rgba(45,47,52,0.18)";

  return (
    <section className="pt-4 pb-2 sm:pt-6 sm:pb-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-[40px] border border-[var(--b-line)] bg-[var(--b-lav)] p-6 sm:p-10 lg:p-12 shadow-[var(--sh-card)] relative overflow-hidden">
            <div className="relative z-10 grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <SectionTitle text={c.closing.title} className="t-title font-bold text-[var(--b-ink)]" />
                <p className="t-body mt-3 max-w-md text-[var(--b-muted)] leading-relaxed">{c.closing.sub}</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Magnet padding={40} magnetStrength={4} maxOffset={10}>
                    <a href="#products" className="pill pill-accent pill-cta">
                      {c.closing.cta}
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </Magnet>
                  <a href="#contact" className="pill pill-outline">
                    {c.closing.cta2}
                  </a>
                </div>
                <p className="t-small mt-3.5 text-xs text-[var(--b-muted)]">{c.closing.trust}</p>
              </div>

              <div className="relative mx-auto h-[220px] w-full max-w-[420px] sm:h-[250px]" aria-hidden="true">
                <OrbitImages
                  images={ORBIT}
                  shape="ellipse"
                  radiusX={160}
                  radiusY={95}
                  rotation={-12}
                  duration={36}
                  itemSize={58}
                  itemRadius={14}
                  shadow={0.3}
                  paused={paused}
                  responsive
                  showPath
                  pathColor={pathColor}
                  pathDash={4}
                  width="100%"
                  height="100%"
                  centerContent={
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--b-surface)] border border-[var(--b-line)] shadow-md">
                      <Image src={logo} alt="" width={32} height={32} className="rounded-lg" />
                    </span>
                  }
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
