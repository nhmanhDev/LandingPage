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
    <footer className="w-full pt-2 pb-1">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Social Platforms Links Bar (Clean, no @, compact pills) */}
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {SOCIALS.map((social) => {
            const { Icon, color } = ICONS[social.id];
            const external = !social.href.startsWith("mailto:");
            return (
              <li key={social.id}>
                <a
                  href={social.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center justify-between gap-2 rounded-xl border border-[var(--b-line)] bg-[var(--b-surface)] px-3.5 py-2 shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--b-ink)]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[var(--b-chip)] transition-transform group-hover:scale-105"
                      style={{ color }}
                    >
                      <Icon size={14} aria-hidden />
                    </span>
                    <span className="text-xs font-semibold text-[var(--b-ink)] truncate">
                      {social.name}
                    </span>
                  </div>
                  <ArrowUpRight size={13} className="text-[var(--b-muted)] shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Bottom Copyright & Slogan Bar */}
        <div className="mt-3.5 flex flex-col gap-2 border-t border-[var(--b-line)] pt-3 sm:flex-row sm:items-center sm:justify-between text-xs">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="" width={20} height={20} className="rounded-md" />
            <p className="text-[var(--b-muted)]">
              © {new Date().getFullYear()} {c.footer.rights}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--b-muted)] transition-colors hover:text-[var(--b-ink)] font-medium">
              <span>{c.footer.portfolio}</span>
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <p className="font-semibold text-[var(--b-ink)] tracking-wider text-[11px]">{c.footer.slogan}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
