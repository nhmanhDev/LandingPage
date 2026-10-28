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
    <section className="pt-4 pb-2 sm:pt-6 sm:pb-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="aurora au-panel relative rounded-[32px] shadow-[var(--sh-card)]">
            <div className="relative z-10 grid items-center gap-6 p-5 sm:p-8 lg:p-9 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <SectionTitle text={c.closing.title} className="t-title" />
                <p className="t-body mt-2.5 max-w-md text-[var(--b-muted)]">{c.closing.sub}</p>
                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  <Magnet padding={40} magnetStrength={4} maxOffset={10}>
                    <a href="#products" className="pill pill-accent pill-cta">
                      {c.closing.cta}
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </Magnet>
                  <a href="#contact" className="pill pill-surface">
                    {c.closing.cta2}
                  </a>
                </div>
                <p className="t-small mt-3 text-xs text-[var(--b-muted)]">{c.closing.trust}</p>
              </div>

              <div className="relative mx-auto h-[210px] w-full max-w-[420px] sm:h-[240px]" aria-hidden="true">
                <OrbitImages
                  images={ORBIT}
                  shape="ellipse"
                  radiusX={160}
                  radiusY={95}
                  rotation={-12}
                  duration={36}
                  itemSize={58}
                  itemRadius={14}
                  shadow={0.5}
                  paused={paused}
                  responsive
                  showPath
                  pathColor={pathColor}
                  pathDash={4}
                  width="100%"
                  height="100%"
                  centerContent={
                    <span className="glass grid h-13 w-13 place-items-center rounded-full">
                      <Image src={logo} alt="" width={30} height={30} className="rounded-lg" />
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
