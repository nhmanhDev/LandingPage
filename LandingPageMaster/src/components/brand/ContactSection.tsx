"use client";

import { Facebook, Github, Mail, Send, Youtube } from "lucide-react";
import { SOCIALS } from "@/lib/brand/content";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";

const ICONS: Record<string, { Icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>; color: string }> = {
  youtube: { Icon: Youtube, color: "#ff0033" },
  facebook: { Icon: Facebook, color: "#1877f2" },
  telegram: { Icon: Send, color: "#229ed9" },
  github: { Icon: Github, color: "var(--b-ink)" },
  email: { Icon: Mail, color: "var(--b-primary)" },
};

export function ContactSection() {
  const { c } = useBrand();
  return (
    <section id="contact" className="scroll-mt-20 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-serif)] text-4xl leading-tight tracking-[-0.015em] sm:text-5xl">{c.contact.title}</h2>
          <p className="mt-4 text-base text-[var(--b-muted)] sm:text-lg">{c.contact.sub}</p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SOCIALS.map((social, index) => {
            const { Icon, color } = ICONS[social.id];
            const external = !social.href.startsWith("mailto:");
            return (
              <li key={social.id}>
                <Reveal delay={index * 0.05} className="h-full">
                  <a
                    href={social.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex h-full flex-col gap-3 rounded-2xl border border-[var(--b-line)] bg-[var(--b-surface)] p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_-16px_rgba(40,30,90,0.3)]"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ color, background: `color-mix(in srgb, ${color} 12%, transparent)` }}>
                      <Icon size={20} aria-hidden />
                    </span>
                    <span>
                      <span className="block text-sm font-medium">{social.name}</span>
                      <span className="block break-all text-sm text-[var(--b-muted)]">{social.handle}</span>
                    </span>
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
