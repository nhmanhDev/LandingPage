"use client";

import Image from "next/image";
import { ArrowUpRight, Facebook, Github, Mail, Send, Youtube } from "lucide-react";
import logo from "@/app/android-chrome-192x192.png";
import { PORTFOLIO_URL, SOCIALS } from "@/lib/brand/content";
import { useBrand } from "./LocaleProvider";

const ICONS: Record<string, { Icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>; color: string }> = {
  youtube: { Icon: Youtube, color: "#ff0033" },
  facebook: { Icon: Facebook, color: "#1877f2" },
  telegram: { Icon: Send, color: "#229ed9" },
  github: { Icon: Github, color: "var(--b-ink)" },
  email: { Icon: Mail, color: "var(--b-brand)" },
};

export function BrandFooter() {
  const { c } = useBrand();

  return (
    <footer id="contact" className="mt-2 scroll-mt-20 border-t border-[var(--b-line)] pb-5 pt-5 sm:pt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3" aria-hidden="true">
          <span className="h-px w-12 bg-[var(--b-line)]" />
          <span className="text-[11px] font-semibold tracking-[0.16em] text-[var(--b-muted)] uppercase">{c.contact.title}</span>
          <span className="h-px w-12 bg-[var(--b-line)]" />
        </div>
        <h2 className="sr-only t-heading">{c.contact.title}</h2>

        <ul className="mt-3.5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {SOCIALS.map((social) => {
            const { Icon, color } = ICONS[social.id];
            const external = !social.href.startsWith("mailto:");
            return (
              <li key={social.id}>
                <a
                  href={social.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-2.5 rounded-xl border border-[var(--b-line)] bg-[var(--b-surface)] px-3 py-2 shadow-[var(--sh-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--b-ink)]"
                >
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[var(--b-chip)] transition-transform group-hover:scale-105"
                    style={{ color }}
                  >
                    <Icon size={15} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold leading-tight">{social.name}</span>
                    <span className="block truncate text-[11px] text-[var(--b-muted)]">{social.handle}</span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
        <p className="mt-2.5 text-center text-xs text-[var(--b-muted)]">{c.contact.sub}</p>

        <div className="mt-5 flex flex-col gap-3 border-t border-[var(--b-line)] pt-3.5 sm:flex-row sm:items-center sm:justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <Image src={logo} alt="" width={22} height={22} className="rounded-md" />
            <p className="text-[var(--b-muted)]">
              © {new Date().getFullYear()} {c.footer.rights}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href={PORTFOLIO_URL} className="inline-flex items-center gap-1 text-[var(--b-muted)] transition-colors hover:text-[var(--b-ink)]">
              {c.footer.portfolio}
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <p className="font-semibold text-[var(--b-ink)] tracking-wider text-[11px]">{c.footer.slogan}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
