"use client";

import { ArrowUpRight } from "lucide-react";
import { SOCIALS } from "@/lib/brand/content";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";

export function ContactSection() {
  const { c } = useBrand();
  return (
    <section id="contact" className="scroll-mt-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-xl">
          <h2 className="t-title">{c.contact.title}</h2>
          <p className="t-body mt-3 text-[var(--b-muted)]">{c.contact.sub}</p>
        </Reveal>

        <ul className="mt-8 flex flex-wrap gap-2">
          {SOCIALS.map((social) => {
            const external = !social.href.startsWith("mailto:");
            return (
              <li key={social.id}>
                <Reveal>
                  <a
                    href={social.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="pill pill-surface !h-11 gap-2"
                  >
                    <span className="font-medium">{social.name}</span>
                    <span className="text-[var(--b-muted)]">{social.handle}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
