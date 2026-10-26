"use client";

import { useTheme } from "next-themes";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useBrand } from "./LocaleProvider";
import { Ribbon } from "./Ribbon";
import { useMounted } from "./useMounted";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function BrandHero() {
  const { c } = useBrand();
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  return (
    <section id="top" className="relative overflow-hidden pb-4 pt-12 sm:pt-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.p
          {...rise(0)}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--b-chip)] px-4 py-1.5 text-sm text-[var(--b-muted)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--b-green)]" aria-hidden="true" />
          {c.hero.eyebrow}
        </motion.p>

        <motion.h1
          {...rise(0.06)}
          className="font-[family-name:var(--font-serif)] text-[clamp(2.75rem,8.5vw,5.5rem)] leading-[1.02] tracking-[-0.02em]"
        >
          {c.hero.titleLine1}
          <br />
          <em className="text-[var(--b-primary)]">{c.hero.titleLine2}</em>
        </motion.h1>

        <motion.p {...rise(0.14)} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--b-muted)] sm:text-lg">
          {c.hero.sub}
        </motion.p>

        <motion.div {...rise(0.22)} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#products"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--b-ink)] px-7 text-base font-medium text-[var(--b-bg)] transition-transform hover:-translate-y-0.5"
          >
            {c.hero.ctaPrimary}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a
            href="https://studio.ai42e.com"
            className="inline-flex h-12 items-center rounded-full bg-[var(--b-chip)] px-7 text-base font-medium transition-colors hover:bg-[var(--b-chip-hover)]"
          >
            {c.hero.ctaSecondary}
          </a>
        </motion.div>

        <motion.p {...rise(0.3)} className="mt-5 text-sm text-[var(--b-muted)]">
          {c.hero.note}
        </motion.p>
      </div>

      <div
        className="mt-6 h-[230px] w-full sm:h-[320px]"
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        {mounted ? <Ribbon dark={resolvedTheme === "dark"} /> : null}
      </div>
    </section>
  );
}
