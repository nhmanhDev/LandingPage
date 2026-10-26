"use client";

import Image from "next/image";
import { ArrowUpRight, Facebook, Github, Mail, Send, Youtube } from "lucide-react";
import logo from "@/app/android-chrome-192x192.png";
import { PORTFOLIO_URL, SOCIALS } from "@/lib/brand/content";
import { useBrand } from "./LocaleProvider";

// Brand colours for the platform icons only, as in the footer of play.ai42e.com.
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
    <footer id="contact" className="mt-8 scroll-mt-32 border-t border-[var(--b-line)] pb-8 pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4" aria-hidden="true">
          <span className="h-px w-16 bg-[var(--b-line)]" />
          <span className="t-small font-medium tracking-[0.14em] text-[var(--b-muted)]">{c.contact.title.toUpperCase()}</span>
          <span className="h-px w-16 bg-[var(--b-line)]" />
        </div>
        <h2 className="sr-only t-heading">{c.contact.title}</h2>

        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {SOCIALS.map((social) => {
            const { Icon, color } = ICONS[social.id];
            const external = !social.href.startsWith("mailto:");
            return (
              <li key={social.id}>
                <a
                  href={social.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full flex-col gap-2 rounded-2xl bg-[var(--b-surface)] p-4 shadow-[var(--sh-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--sh-card)]"
                >
                  <span className="t-small flex items-center gap-2 text-[var(--b-muted)]">
                    <span style={{ color }}>
                      <Icon size={18} aria-hidden />
                    </span>
                    {social.name}
                  </span>
                  <span className="t-body break-all font-medium">{social.handle}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <p className="t-small mt-4 text-center text-[var(--b-muted)]">{c.contact.sub}</p>

        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--b-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image src={logo} alt="" width={28} height={28} className="rounded-lg" />
            <p className="t-small text-[var(--b-muted)]">
              © {new Date().getFullYear()} {c.footer.rights}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={PORTFOLIO_URL} className="t-small inline-flex items-center gap-1 text-[var(--b-muted)] transition-colors hover:text-[var(--b-ink)]">
              {c.footer.portfolio}
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <p className="t-small font-medium">{c.footer.slogan}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
