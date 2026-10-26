"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function FaqSection() {
  const { c } = useBrand();
  return (
    <section id="faq" className="scroll-mt-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-12">
          <Reveal>
            <SectionTitle text={c.faq.title} />
          </Reveal>
          <Reveal delay={0.06}>
            <Accordion type="single" collapsible className="rounded-[28px] bg-[var(--b-surface)] px-6 py-2">
              {c.faq.items.map((item, index) => (
                <AccordionItem key={item.q} value={`faq-${index}`} className="border-[var(--b-line)]">
                  <AccordionTrigger className="t-heading py-5 text-left hover:no-underline">{item.q}</AccordionTrigger>
                  <AccordionContent className="t-body text-[var(--b-muted)]">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
