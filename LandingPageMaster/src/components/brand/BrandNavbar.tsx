"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import logo from "@/app/android-chrome-192x192.png";
import { useBrand } from "./LocaleProvider";
import { useMounted } from "./useMounted";

function subscribeScroll(listener: () => void) {
  window.addEventListener("scroll", listener, { passive: true });
  return () => window.removeEventListener("scroll", listener);
}
const getScrolled = () => window.scrollY > 8;

export function BrandNavbar() {
  const { c, locale, setLocale } = useBrand();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, () => false);

  const isDark = mounted && resolvedTheme === "dark";
  const links = [
    { href: "#products", label: c.nav.products },
    { href: "#pricing", label: c.nav.pricing },
    { href: "#faq", label: c.nav.faq },
    { href: "#contact", label: c.nav.contact },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-[var(--b-bg)]/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6" aria-label="Main">
        <a href="#top" className="flex min-h-10 items-center gap-2.5 rounded-lg">
          <Image src={logo} alt="" width={28} height={28} className="rounded-lg" priority />
          <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold tracking-tight">AI42E</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-10 items-center rounded-full px-4 text-sm text-[var(--b-muted)] transition-colors hover:text-[var(--b-ink)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setLocale(locale === "vi" ? "en" : "vi")}
            aria-label={c.ui.language}
            className="grid h-10 min-w-10 place-items-center rounded-full px-3 text-sm font-medium text-[var(--b-muted)] transition-colors hover:bg-[var(--b-chip)] hover:text-[var(--b-ink)]"
          >
            {locale === "vi" ? "VI" : "EN"}
          </button>
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={c.ui.theme}
            className="grid h-10 w-10 place-items-center rounded-full text-[var(--b-muted)] transition-colors hover:bg-[var(--b-chip)] hover:text-[var(--b-ink)]"
          >
            {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <a
            href="#products"
            className="ml-1 hidden h-10 items-center rounded-full bg-[var(--b-ink)] px-5 text-sm font-medium text-[var(--b-bg)] transition-opacity hover:opacity-85 sm:inline-flex md:hidden"
          >
            {c.nav.products}
          </a>
        </div>
      </nav>
    </header>
  );
}
