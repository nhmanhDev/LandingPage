"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import logo from "@/app/android-chrome-192x192.png";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";

/** Merged Founder Letter & FAQ into a balanced 2-column layout to reduce section count */
export function FounderFaqSection() {
  const { c } = useBrand();
  const f = c.founder;

  return (
    <section id="faq" className="relative scroll-mt-24 py-16 lg:py-24">
      {/* Fallback anchor for any #founder link */}
      <div id="founder" className="absolute top-0 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Lời từ người làm ra AI42E (5 cols) */}
          <div className="lg:col-span-5">
            <Reveal>
              <div>
                <h3 className="text-[20px] sm:text-[22px] font-bold text-[var(--b-ink)] leading-snug">
                  {f.paragraphs[0]}
                </h3>

                {f.paragraphs[1] && (
                  <p className="mt-4 text-[15px] sm:text-[16px] text-[var(--b-muted)] leading-relaxed">
                    {f.paragraphs[1]}
                  </p>
                )}

                {/* Founder Signature Card */}
                <div className="mt-8 rounded-2xl border border-[var(--b-line)] bg-[var(--b-surface)] p-5 shadow-xs">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--b-chip)] border border-[var(--b-line)]">
                        <Image src={logo} alt="AI42E" width={26} height={26} className="rounded-md" />
                      </div>
                      <div>
                        <span className="block font-bold text-[15px] text-[var(--b-ink)]">
                          {f.signature}
                        </span>
                        <span className="block text-[12px] text-[var(--b-muted)]">
                          AI Engineer · Maker of AI42E
                        </span>
                      </div>
                    </div>

                    <a
                      href="#contact"
                      className="pill pill-surface text-[12px] font-semibold border border-[var(--b-line)] shrink-0 inline-flex items-center gap-1"
                    >
                      <span>Liên hệ</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN: Hỏi đáp FAQ (7 cols) */}
          <div className="lg:col-span-7">
            <Reveal delay={0.06}>
              <Accordion type="single" collapsible className="space-y-3">
                {c.faq.items.map((item, index) => (
                  <AccordionItem
                    key={item.q}
                    value={`faq-${index}`}
                    className="rounded-2xl border border-[var(--b-line)] bg-[var(--b-surface)] px-5 shadow-xs transition-all hover:border-[var(--b-ink)]/30"
                  >
                    <AccordionTrigger className="t-heading py-4 text-left font-semibold text-[var(--b-ink)] hover:no-underline text-[15px] sm:text-[16px]">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="t-body pb-4 text-[var(--b-muted)] leading-relaxed text-[14px]">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
