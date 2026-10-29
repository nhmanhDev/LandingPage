"use client";

import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

interface SectionHeadProps {
  eyebrow?: string;
  title: string;
  tone?: string;
  sub?: string;
  align?: "center" | "left";
}

/** Slite-inspired clean section header: Direct confident title, no cluttery eyebrow labels. */
export function SectionHead({ title, tone, sub, align = "center" }: SectionHeadProps) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <SectionTitle text={title} tone={tone} className="t-title" />
      {sub ? <p className="t-lead mt-3 text-[var(--b-muted)] max-w-2xl mx-auto">{sub}</p> : null}
    </Reveal>
  );
}
