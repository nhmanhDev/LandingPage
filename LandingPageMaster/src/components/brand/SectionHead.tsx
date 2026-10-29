"use client";

import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  tone?: string;
  sub?: string;
  align?: "center" | "left" | "split";
  extra?: React.ReactNode;
  className?: string;
}

/**
 * Flexible section heading supporting centered, left-aligned, and split-screen layouts
 * while preserving the warm sand & Fraunces design system.
 */
export function SectionHead({
  eyebrow,
  title,
  tone,
  sub,
  align = "center",
  extra,
  className = "",
}: SectionHeadProps) {
  if (align === "split") {
    return (
      <Reveal className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end ${className}`}>
        <div className="lg:col-span-7">
          <p className="eyebrow">{eyebrow}</p>
          <SectionTitle text={title} tone={tone} className="t-title mt-2.5 max-w-2xl" />
        </div>
        <div className="lg:col-span-5 flex flex-col justify-end">
          {sub ? <p className="t-lead text-[var(--b-muted)] leading-relaxed">{sub}</p> : null}
          {extra ? <div className="mt-4">{extra}</div> : null}
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <SectionTitle text={title} tone={tone} className="t-title mt-2.5" />
      {sub ? <p className="t-lead mt-4 text-[var(--b-muted)] leading-relaxed">{sub}</p> : null}
      {extra ? <div className="mt-5">{extra}</div> : null}
    </Reveal>
  );
}
