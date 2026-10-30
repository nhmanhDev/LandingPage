"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { motion } from "motion/react";
import Magnet from "@/components/react-bits/Magnet";
import { IMAGE_SIZE } from "@/lib/brand/tiles";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { ScrollTilt } from "./ScrollMotion";
import { SectionHead } from "./SectionHead";
import { useReducedMotion } from "./useReducedMotion";

const AUTO_ADVANCE_MS = 5600;

/** Split layout: copy and auto-advancing game tabs on the left, 3D scroll-reactive phone stage on the right. */
export function EcosystemPlaySection() {
  const { c } = useBrand();
  const p = c.play;
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [pointerInside, setPointerInside] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const groupId = useId();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const autoRunning = inView && !pointerInside && !focusInside && !reduced;

  useEffect(() => {
    if (!autoRunning) return;
    const timer = window.setTimeout(() => {
      setActive((prev) => (prev + 1) % p.tabs.length);
      setCycle((prev) => prev + 1);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [autoRunning, active, cycle, p.tabs.length]);

  const selectTab = (index: number) => {
    setActive(index);
    setCycle((prev) => prev + 1);
  };

  return (
    <section
      ref={sectionRef}
      id="play"
      className="scroll-mt-24 py-20 sm:py-24 lg:py-28"
      onPointerEnter={() => setPointerInside(true)}
      onPointerLeave={() => setPointerInside(false)}
      onFocusCapture={() => setFocusInside(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setFocusInside(false);
        }
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHead align="left" eyebrow={p.eyebrow} title={p.title} sub={p.sub} />

            <Reveal delay={0.08}>
              <div role="tablist" aria-label={p.eyebrow} className="mt-10 flex flex-col gap-3">
                {p.tabs.map((tab, index) => {
                  const selected = index === active;
                  return (
                    <button
                      key={tab.name}
                      type="button"
                      role="tab"
                      id={`${groupId}-tab-${index}`}
                      aria-selected={selected}
                      aria-controls={`${groupId}-panel`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => selectTab(index)}
                      className={`relative overflow-hidden flex w-full items-start gap-4 rounded-[22px] border p-4 text-left transition-all duration-200 sm:p-5 ${
                        selected
                          ? "border-[var(--b-brand)]/45 bg-[var(--b-surface)] shadow-[var(--sh-soft)]"
                          : "border-[var(--b-line)] bg-transparent hover:bg-[var(--b-surface)]"
                      }`}
                    >
                      <span
                        className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[13px] font-semibold transition-colors ${
                          selected ? "bg-[var(--b-brand)] text-white" : "bg-[var(--b-chip)] text-[var(--b-muted)]"
                        }`}
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="t-heading block text-[var(--b-ink)]">{tab.name}</span>
                        <span className={`t-small mt-1 block text-[var(--b-muted)] ${selected ? "" : "hidden sm:block"}`}>{tab.text}</span>
                      </span>

                      {/* Handhold-inspired smooth auto-progress bar */}
                      {selected && !reduced ? (
                        <motion.span
                          key={`${active}-${cycle}-${autoRunning ? "run" : "pause"}`}
                          aria-hidden="true"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: autoRunning ? 1 : 0.35 }}
                          transition={{
                            duration: autoRunning ? AUTO_ADVANCE_MS / 1000 : 0.3,
                            ease: autoRunning ? "linear" : "easeOut",
                          }}
                          className="pointer-events-none absolute inset-x-5 bottom-0 h-[2px] origin-left rounded-full bg-[var(--b-brand)]"
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <ul className="mt-8 space-y-2.5">
                {p.points.map((point) => (
                  <li key={point} className="t-body flex items-center gap-2.5 text-[var(--b-ink)]">
                    <Check size={16} strokeWidth={2.6} className="shrink-0 text-[var(--b-pos-fg)]" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <Magnet padding={56} magnetStrength={4.5} maxOffset={7} disabled={reduced} wrapperClassName="mt-8">
                <a href="https://play.ai42e.com" target="_blank" rel="noopener noreferrer" className="pill pill-cta inline-flex items-center gap-2">
                  {p.cta}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </Magnet>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <ScrollTilt tiltX={7} tiltY={-4.5} yRange={[40, -28]} scaleEdge={0.956}>
              <div className="mx-auto w-full max-w-[420px] rounded-[40px] bg-[var(--b-surface)] p-3 shadow-[var(--sh-card)] border border-[var(--b-line)]/60">
                <div
                  id={`${groupId}-panel`}
                  role="tabpanel"
                  aria-labelledby={`${groupId}-tab-${active}`}
                  className="relative aspect-[4/3] overflow-hidden rounded-[30px] bg-[var(--b-chip)]"
                >
                  {p.tabs.map((tab, index) => {
                    const { w, h } = IMAGE_SIZE[tab.image];
                    const selected = index === active;
                    return (
                      <div
                        key={tab.image}
                        aria-hidden={!selected}
                        className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          selected ? "opacity-100 scale-100" : "opacity-0 scale-[1.06] pointer-events-none"
                        }`}
                      >
                        <Image
                          src={`/brand/tiles/${tab.image}.webp`}
                          alt=""
                          width={w}
                          height={h}
                          unoptimized
                          loading="lazy"
                          draggable={false}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between px-4 pb-1 pt-3">
                  <p className="t-small font-semibold text-[var(--b-ink)]" aria-live="polite">
                    {p.tabs[active].name}
                  </p>
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    {p.tabs.map((tab, index) => (
                      <span
                        key={tab.name}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === active ? "w-5 bg-[var(--b-brand)]" : "w-1.5 bg-[var(--b-line)]"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollTilt>
          </div>
        </div>
      </div>
    </section>
  );
}
