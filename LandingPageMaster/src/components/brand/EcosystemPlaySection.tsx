"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { IMAGE_SIZE } from "@/lib/brand/tiles";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

/** Split layout: copy and a row of game tabs on the left, a phone frame that follows the active tab on the right. */
export function EcosystemPlaySection() {
  const { c } = useBrand();
  const p = c.play;
  const [active, setActive] = useState(0);
  const groupId = useId();

  return (
    <section id="play" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
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
                      onClick={() => setActive(index)}
                      className={`flex w-full items-start gap-4 rounded-[22px] border p-4 text-left transition-colors sm:p-5 ${
                        selected
                          ? "border-[var(--b-ink)] bg-[var(--b-surface)] shadow-[var(--sh-soft)]"
                          : "border-[var(--b-line)] bg-transparent hover:bg-[var(--b-surface)]"
                      }`}
                    >
                      <span
                        className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[13px] font-semibold ${
                          selected ? "bg-[var(--b-ink)] text-[var(--b-bg)]" : "bg-[var(--b-chip)] text-[var(--b-muted)]"
                        }`}
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="t-heading block text-[var(--b-ink)]">{tab.name}</span>
                        <span className={`t-small mt-1 block text-[var(--b-muted)] ${selected ? "" : "hidden sm:block"}`}>{tab.text}</span>
                      </span>
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
              <a href="https://play.ai42e.com" target="_blank" rel="noopener noreferrer" className="pill pill-cta mt-8 inline-flex items-center gap-2">
                {p.cta}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="mx-auto w-full max-w-[420px] rounded-[40px] bg-[var(--b-surface)] p-3 shadow-[var(--sh-card)]">
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
                      className={`absolute inset-0 transition-opacity duration-500 ease-out ${selected ? "opacity-100" : "opacity-0"}`}
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
              <p className="t-small px-2 pb-1 pt-3 text-center text-[var(--b-muted)]" aria-live="polite">
                {p.tabs[active].name}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
