"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";

export function FaqSection() {
  const { c } = useBrand();
  return (
    <section id="faq" className="scroll-mt-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-12">
          <Reveal>
            <h2 className="t-title">{c.faq.title}</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <Accordion type="single" collapsible className="border-t border-[var(--b-line)]">
              {c.faq.items.map((item, index) => (
                <AccordionItem key={item.q} value={`faq-${index}`} className="border-[var(--b-line)]">
                  <AccordionTrigger className="t-heading py-4 text-left hover:no-underline">{item.q}</AccordionTrigger>
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
