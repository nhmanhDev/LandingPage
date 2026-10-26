"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";

export function FaqSection() {
  const { c } = useBrand();
  return (
    <section id="faq" className="scroll-mt-20 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center font-[family-name:var(--font-serif)] text-4xl leading-tight tracking-[-0.015em] sm:text-5xl">{c.faq.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <Accordion type="single" collapsible className="mt-10 rounded-3xl border border-[var(--b-line)] bg-[var(--b-surface)] px-6">
            {c.faq.items.map((item, index) => (
              <AccordionItem key={item.q} value={`faq-${index}`} className="border-[var(--b-line)]">
                <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="text-[15px] leading-relaxed text-[var(--b-muted)]">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
