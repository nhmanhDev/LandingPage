"use client";

import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  tone?: string;
  sub?: string;
  align?: "center" | "left";
}

/** The one heading pattern for every section: small violet label, serif title, muted line under it. */
export function SectionHead({ eyebrow, title, tone, sub, align = "center" }: SectionHeadProps) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <SectionTitle text={title} tone={tone} className="t-title mt-3" />
      {sub ? <p className="t-lead mt-6 text-[var(--b-muted)]">{sub}</p> : null}
    </Reveal>
  );
}
