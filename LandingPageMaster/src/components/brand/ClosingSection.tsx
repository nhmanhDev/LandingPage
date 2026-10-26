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

/** The dark call-to-action card: glowing backdrop, product material orbiting the AI42E mark. */
export function ClosingSection() {
  const { c } = useBrand();
  const paused = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const pathColor = mounted && resolvedTheme === "dark" ? "rgba(243,241,255,0.28)" : "rgba(23,18,58,0.22)";
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="aurora au-panel relative rounded-[32px]">
            <div className="relative z-10 grid items-center gap-6 p-6 sm:p-12 md:grid-cols-[1.05fr_1fr]">
              <div>
                <SectionTitle text={c.closing.title} className="t-title" />
                <p className="t-body mt-3 max-w-md text-[var(--b-muted)]">{c.closing.sub}</p>
                <div className="mt-7 flex flex-wrap items-center gap-2.5">
                  <Magnet padding={50} magnetStrength={5} maxOffset={14}>
                    <a href="#products" className="pill pill-accent">
                      {c.closing.cta}
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </Magnet>
                  <a href="https://studio.ai42e.com" className="pill pill-surface">
                    {c.closing.cta2}
                  </a>
                </div>
                <p className="t-small mt-4 text-[var(--b-muted)]">{c.closing.trust}</p>
              </div>

              <div className="relative mx-auto h-[300px] w-full max-w-[460px] sm:h-[360px]" aria-hidden="true">
                <OrbitImages
                  images={ORBIT}
                  shape="ellipse"
                  radiusX={190}
                  radiusY={110}
                  rotation={-12}
                  duration={36}
                  itemSize={74}
                  itemRadius={18}
                  shadow={0.5}
                  paused={paused}
                  responsive
                  showPath
                  pathColor={pathColor}
                  pathDash={4}
                  width="100%"
                  height="100%"
                  centerContent={
                    <span className="glass grid h-16 w-16 place-items-center rounded-full">
                      <Image src={logo} alt="" width={36} height={36} className="rounded-lg" />
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
