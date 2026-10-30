"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import logo from "@/app/android-chrome-192x192.png";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { ScrollTilt } from "./ScrollMotion";
import { SectionHead } from "./SectionHead";
import { useReducedMotion } from "./useReducedMotion";

type Side = "without" | "with";

/** Two tabs, each one a short question and its answer, shown the way an assistant replies. */
export function CompareSection() {
  const { c } = useBrand();
  const reduced = useReducedMotion();
  const k = c.compare;
  const [side, setSide] = useState<Side>("with");
  const groupId = useId();
  const items = side === "with" ? k.with : k.without;
  const tabs: { id: Side; label: string }[] = [
    { id: "without", label: k.withoutTitle },
    { id: "with", label: k.withTitle },
  ];

  return (
    <section id="compare" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead title={k.title} tone={k.tone} sub={k.sub} />

        <div className="mx-auto mt-12 max-w-4xl sm:mt-16">
          <Reveal delay={0.05}>
            <div role="tablist" aria-label={k.withTitle} className="flex justify-center gap-2.5">
              {tabs.map((tab) => {
                const selected = tab.id === side;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`${groupId}-${tab.id}`}
                    aria-selected={selected}
                    aria-controls={`${groupId}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setSide(tab.id)}
                    className={`pill relative ${selected ? "pill-accent" : "pill-outline"}`}
                  >
                    {selected && !reduced ? (
                      <motion.span
                        layoutId="compare-active-halo"
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-1 rounded-full border-2 border-[var(--b-brand)]/45"
                        transition={{ type: "spring", stiffness: 420, damping: 30 }}
                      />
                    ) : null}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <ScrollTilt className="mt-6" tiltX={5.5} yRange={[30, -20]} scaleEdge={0.968}>
            <div
              id={`${groupId}-panel`}
              role="tabpanel"
              aria-labelledby={`${groupId}-${side}`}
              className="rounded-[40px] border border-[var(--b-line)]/70 bg-[var(--b-lav)] p-5 sm:p-10"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={side}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* The question, as the visitor would ask it */}
                  <div className="ml-auto max-w-[85%] rounded-[22px] rounded-br-md bg-[var(--b-surface)] px-5 py-4 shadow-[var(--sh-soft)] sm:max-w-[70%]">
                    <p className="t-body text-[var(--b-ink)]">{k.questions[side]}</p>
                  </div>

                  {/* The answer: a card with the points, then the sources for the AI42E side */}
                  <div className="mt-5 flex items-start gap-3">
                    <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--b-line)] bg-[var(--b-surface)] shadow-[var(--sh-soft)]" aria-hidden="true">
                      <Image src={logo} alt="" width={22} height={22} className="rounded-md" />
                    </span>
                    <div className="min-w-0 flex-1 rounded-[28px] bg-[var(--b-surface)] p-6 shadow-[var(--sh-card)] sm:p-8">
                      <ul className="space-y-4">
                        {items.map((item, idx) => (
                          <motion.li
                            key={item}
                            initial={reduced ? false : { opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.26, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                            className="flex items-start gap-3"
                          >
                            <span
                              className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ${
                                side === "with" ? "bg-[var(--b-pos-bg)] text-[var(--b-pos-fg)]" : "bg-[var(--b-chip)] text-[var(--b-muted)]"
                              }`}
                              aria-hidden="true"
                            >
                              {side === "with" ? <Check size={15} strokeWidth={2.6} /> : <X size={15} strokeWidth={2.4} />}
                            </span>
                            <p className={`t-body pt-0.5 ${side === "with" ? "font-semibold text-[var(--b-ink)]" : "text-[var(--b-muted)]"}`}>{item}</p>
                          </motion.li>
                        ))}
                      </ul>

                      {side === "with" ? (
                        <>
                          <div className="mt-6 flex flex-wrap gap-2 border-t border-[var(--b-line)] pt-5">
                            {c.products.items
                              .filter((item) => item.href)
                              .map((item) => (
                                <span key={item.id} className="t-small rounded-full bg-[var(--b-chip)] px-3 py-1 text-[var(--b-ink)]">
                                  {item.name}
                                </span>
                              ))}
                          </div>
                          <p className="t-small mt-4 text-[var(--b-muted)]">{k.result}</p>
                        </>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollTilt>
        </div>
      </div>
    </section>
  );
}
