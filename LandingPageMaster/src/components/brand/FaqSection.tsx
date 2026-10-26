"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function FaqSection() {
  const { c } = useBrand();
  return (
    <section id="faq" className="scroll-mt-32 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHead eyebrow={c.faq.eyebrow} title={c.faq.title} />
        <Reveal delay={0.06} className="mt-10">
          <Accordion type="single" collapsible className="space-y-2">
            {c.faq.items.map((item, index) => (
              <AccordionItem key={item.q} value={`faq-${index}`} className="rounded-2xl border-0 bg-[var(--b-surface)] px-5 ring-1 ring-[var(--b-line)]">
                <AccordionTrigger className="t-heading py-4 text-left hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="t-body text-[var(--b-muted)]">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
