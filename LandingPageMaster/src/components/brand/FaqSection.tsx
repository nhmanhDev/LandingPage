"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function FaqSection() {
  const { c } = useBrand();

  return (
    <section id="faq" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHead title={c.faq.title} />

        <Reveal delay={0.06} className="mt-10 sm:mt-14">
          <Accordion type="single" collapsible className="space-y-3.5">
            {c.faq.items.map((item, index) => (
              <AccordionItem
                key={item.q}
                value={`faq-${index}`}
                className="rounded-2xl border border-[var(--b-line)] bg-[var(--b-surface)] px-6 shadow-[var(--sh-soft)] transition-all hover:border-[var(--b-ink)]/30"
              >
                <AccordionTrigger className="t-heading py-4 sm:py-5 text-left font-semibold text-[var(--b-ink)] hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="t-body pb-5 text-[var(--b-muted)] leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
