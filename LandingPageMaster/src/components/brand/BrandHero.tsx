"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { ArrowDown, Clapperboard, Gamepad2, Sparkles } from "lucide-react";
import logo from "@/app/android-chrome-192x192.png";
import { useBrand } from "./LocaleProvider";
import { useReducedMotion } from "./useReducedMotion";
import { Wall } from "./Wall";

export function BrandHero() {
  const { c } = useBrand();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  const handleFrame = useCallback((q: number, stageH: number) => {
    const ctaBtn = ctaBtnRef.current;
    const revealEl = revealRef.current;

    if (ctaBtn) {
      const s = q * q * (3 - 2 * q);
      const fadeT = Math.max(0, Math.min(1, (q - 0.1) / 0.22));
      const pillAlpha = 1 - fadeT * fadeT * (3 - 2 * fadeT);
      const driftY = s * Math.min(110, stageH * 0.14);

      ctaBtn.style.opacity = pillAlpha <= 0.002 ? "0" : pillAlpha >= 0.998 ? "1" : pillAlpha.toFixed(3);
      ctaBtn.style.visibility = pillAlpha <= 0.002 ? "hidden" : "visible";
      ctaBtn.style.transform = `translate3d(0, ${driftY.toFixed(1)}px, 0) scale(${(0.95 + 0.05 * pillAlpha).toFixed(3)})`;
      ctaBtn.style.pointerEvents = pillAlpha > 0.35 ? "auto" : "none";
    }

    if (revealEl) {
      const rp = Math.max(0, Math.min(1, (q - 0.33) / 0.52));
      const ra = 1 - Math.pow(1 - rp, 3);
      const ry = (1 - ra) * 18 - Math.max(0, q - 0.85) * 40;

      revealEl.style.opacity = ra <= 0.002 ? "0" : ra >= 0.998 ? "1" : ra.toFixed(3);
      revealEl.style.transform = `translate3d(0, ${ry.toFixed(1)}px, 0) scale(${(0.975 + 0.025 * ra).toFixed(4)})`;
      revealEl.style.pointerEvents = ra > 0.55 ? "auto" : "none";
    }
  }, []);

  const scrollToRevealedHero = () => {
    const heroEl = sectionRef.current;
    const stageH = stageRef.current?.offsetHeight || window.innerHeight;
    const maxSticky = heroEl ? Math.max(0, heroEl.offsetHeight - stageH) : Math.round(stageH * 0.65);
    const sectionTop = heroEl ? heroEl.getBoundingClientRect().top + window.scrollY - 64 : 0;
    const targetY = Math.max(0, sectionTop) + Math.round(maxSticky * 0.86);
    window.scrollTo({ top: targetY, behavior: reduced ? "auto" : "smooth" });
  };

  const handleRevealFocus = () => {
    if (reduced) return;
    const heroEl = sectionRef.current;
    const stageH = stageRef.current?.offsetHeight || window.innerHeight;
    const maxSticky = heroEl ? Math.max(0, heroEl.offsetHeight - stageH) : Math.round(stageH * 0.65);
    if (window.scrollY < maxSticky * 0.72) {
      scrollToRevealedHero();
    }
  };

  const pillars = [
    { id: "creative", title: c.hero.pillars.creative.title, tagline: c.hero.pillars.creative.tagline, href: "#products", icon: Clapperboard },
    { id: "play", title: c.hero.pillars.play.title, tagline: c.hero.pillars.play.tagline, href: "#play", icon: Gamepad2 },
    { id: "horizon", title: c.hero.pillars.horizon.title, tagline: c.hero.pillars.horizon.tagline, href: "#horizon", icon: Sparkles },
  ];

  return (
    <section
      ref={sectionRef}
      id="top"
      className={
        reduced
          ? "relative min-h-[calc(100svh-4rem)] overflow-hidden flex items-center justify-center"
          : "relative h-[168svh]"
      }
    >
      <div
        ref={stageRef}
        className={
          reduced
            ? "relative w-full min-h-[calc(100svh-4rem)] overflow-hidden flex items-center justify-center"
            : "sticky top-16 h-[calc(100svh-4rem)] w-full overflow-hidden"
        }
      >
        <Wall
          paused={reduced}
          heroRef={sectionRef}
          stageRef={stageRef}
          onFrame={handleFrame}
        />

        {/* Floating center CTA pill inside the 360° 3D cylinder (baked.design style) */}
        {!reduced ? (
          <div data-hero-cta="" className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4">
            <button
              ref={ctaBtnRef}
              type="button"
              onClick={scrollToRevealedHero}
              style={{
                opacity: 1,
                transform: "translate3d(0, 0, 0)",
                pointerEvents: "auto",
                willChange: "transform, opacity",
              }}
              className="pill pill-cta !h-[52px] !px-7 shadow-[0_18px_38px_-12px_rgba(194,65,12,0.58)] dark:shadow-[0_18px_38px_-10px_rgba(0,0,0,0.8)] ring-4 ring-[var(--b-bg)]/85 cursor-pointer"
            >
              <span>{c.hero.ctaPrimary}</span>
              <ArrowDown size={17} aria-hidden="true" />
            </button>
          </div>
        ) : null}

        {/* Revealed Hero Center Stage: emerges cleanly as the 360° cylinder parts open */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 py-4 sm:py-6">
          <div
            ref={revealRef}
            data-hero-reveal=""
            onFocusCapture={handleRevealFocus}
            style={
              reduced
                ? { opacity: 1, pointerEvents: "auto" }
                : {
                    opacity: 0,
                    transform: "translate3d(0, 18px, 0) scale(0.975)",
                    pointerEvents: "none",
                    willChange: "transform, opacity",
                  }
            }
            className={
              reduced
                ? "w-full max-w-[53.5rem] rounded-[38px] sm:rounded-[44px] border border-[var(--b-line)] bg-[var(--b-surface)] px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14 text-center shadow-[0_26px_75px_-22px_rgba(107,93,70,0.26)] dark:shadow-[0_26px_75px_-22px_rgba(0,0,0,0.7)]"
                : "w-full max-w-[52rem] flex flex-col items-center text-center"
            }
          >
            <div className="mx-auto grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-2xl border border-[var(--b-line)] bg-[var(--b-surface)] shadow-[var(--sh-soft)]">
              <Image src={logo} alt="" width={28} height={28} className="rounded-lg" priority />
            </div>

            <p className="eyebrow mt-2.5 sm:mt-4">{c.hero.eyebrow}</p>

            <h1 className="t-display mt-1.5 sm:mt-2">
              {c.hero.titleLine1}
              <br />
              <span className="brand-text">{c.hero.titleLine2}</span>
            </h1>

            <p className="t-body mx-auto mt-3 sm:mt-4 max-w-[38rem] text-[15px] sm:text-[18px] text-[var(--b-muted)] leading-relaxed">
              {c.hero.sub}
            </p>

            {/* Core Ecosystem Pillars Bar */}
            <div className="mt-4 sm:mt-8 grid w-full grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-left">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <a
                    key={pillar.id}
                    href={pillar.href}
                    className="group flex items-center justify-between sm:flex-col sm:items-stretch rounded-2xl border border-[var(--b-line)] bg-[var(--b-surface)] px-3.5 py-2.5 sm:p-4 shadow-[var(--sh-soft)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--b-ink)]/35 hover:shadow-[var(--sh-card)]"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="grid h-7.5 w-7.5 place-items-center rounded-xl bg-[var(--b-lav)] border border-[var(--b-line)]/60 text-[var(--b-brand)] shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3">
                          <Icon size={15} aria-hidden="true" />
                        </span>
                        <span className="text-[13px] sm:text-[15px] font-bold text-[var(--b-ink)] truncate">{pillar.title}</span>
                      </div>
                      <p className="mt-1 sm:mt-1.5 text-[13px] text-[var(--b-muted)] line-clamp-1">{pillar.tagline}</p>
                    </div>
                    <div className="pl-3 sm:pl-0 sm:mt-2.5 sm:pt-2 sm:border-t sm:border-[var(--b-line)]/50 flex items-center justify-between text-[13px] font-semibold text-[var(--b-brand)] shrink-0">
                      <span className="hidden sm:inline">{c.hero.explore}</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
