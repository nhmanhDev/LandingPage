"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import logo from "@/app/android-chrome-192x192.png";
import { PORTFOLIO_URL, SOCIALS } from "@/lib/brand/content";
import { useBrand } from "./LocaleProvider";

const LINK = "t-body inline-flex items-center gap-1 text-[var(--b-muted)] transition-colors hover:text-[var(--b-ink)]";

export function BrandFooter() {
  const { c } = useBrand();
  const live = c.products.items.filter((item) => item.href);
  const soon = c.products.items.filter((item) => !item.href && (item.status === "soon" || item.status === "maintenance"));

  return (
    <footer className="px-3 pb-3 pt-8 sm:px-5 sm:pb-5">
      <div id="contact" className="relative mx-auto max-w-6xl scroll-mt-4 overflow-hidden rounded-[32px] bg-[var(--b-surface)] px-6 pt-10 sm:px-12 sm:pt-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#top" className="inline-flex items-center gap-2">
              <Image src={logo} alt="" width={28} height={28} className="rounded-lg" />
              <span className="t-heading">AI42E</span>
            </a>
            <p className="t-body mt-4 max-w-xs text-[var(--b-muted)]">{c.footer.about}</p>
          </div>

          <nav aria-label={c.footer.colProducts}>
            <h3 className="t-small font-medium">{c.footer.colProducts}</h3>
            <ul className="mt-4 space-y-2.5">
              {live.map((item) => (
                <li key={item.id}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                    {item.name}
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </li>
              ))}
              {soon.map((item) => (
                <li key={item.id} className="t-body text-[var(--b-muted)]">
                  {item.name} <span className="t-small">· {c.products.status[item.status]}</span>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={c.footer.colExplore}>
            <h3 className="t-small font-medium">{c.footer.colExplore}</h3>
            <ul className="mt-4 space-y-2.5">
              <li><a href="#pricing" className={LINK}>{c.nav.pricing}</a></li>
              <li><a href="#faq" className={LINK}>{c.nav.faq}</a></li>
              <li>
                <a href={PORTFOLIO_URL} className={LINK}>
                  {c.footer.portfolio}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="t-small font-medium">{c.footer.colContact}</h3>
            <ul className="mt-4 space-y-2.5">
              {SOCIALS.map((social) => {
                const external = !social.href.startsWith("mailto:");
                return (
                  <li key={social.id}>
                    <a href={social.href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={LINK}>
                      {social.name}
                      <span className="t-small">{social.handle}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="t-small mt-4 max-w-[16rem] text-[var(--b-muted)]">{c.contact.sub}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-1 border-t border-[var(--b-line)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-small text-[var(--b-muted)]">
            © {new Date().getFullYear()} {c.footer.rights}
          </p>
          <p className="t-small font-medium">{c.footer.slogan}</p>
        </div>

        {/* Decorative wordmark, drawn as SVG so it is a picture, not text: the bottom is cropped and faded on purpose. */}
        <div
          aria-hidden="true"
          data-decor
          className="pointer-events-none mt-8 select-none"
          style={{ maskImage: "linear-gradient(to bottom, #000 30%, transparent 95%)", WebkitMaskImage: "linear-gradient(to bottom, #000 30%, transparent 95%)" }}
        >
          <svg viewBox="0 0 600 120" className="block h-auto w-full" role="presentation">
            <text x="300" y="150" textAnchor="middle" fontSize="190" fontWeight="500" letterSpacing="-12" fill="var(--b-chip)" style={{ fontFamily: "inherit" }}>
              AI42E
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
