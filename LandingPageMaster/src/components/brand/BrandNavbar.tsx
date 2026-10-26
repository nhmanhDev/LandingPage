"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import logo from "@/app/android-chrome-192x192.png";
import { useBrand } from "./LocaleProvider";
import { useMounted } from "./useMounted";

export function BrandNavbar() {
  const { c, locale, setLocale } = useBrand();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";
  const links = [
    { href: "#products", label: c.nav.products },
    { href: "#pricing", label: c.nav.pricing },
    { href: "#faq", label: c.nav.faq },
    { href: "#contact", label: c.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav className="flex items-start justify-between gap-2" aria-label="Main">
        <a href="#top" className="pill pill-glass gap-2 !pl-2">
          <Image src={logo} alt="" width={24} height={24} className="rounded-md" priority />
          <span className="font-medium">AI42E</span>
        </a>

        <div className="flex items-center gap-1.5">
          <ul className="hidden items-center gap-1.5 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="pill pill-glass">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => setLocale(locale === "vi" ? "en" : "vi")} aria-label={c.ui.language} className="pill pill-glass">
            {locale === "vi" ? "VI" : "EN"}
          </button>
          <button type="button" onClick={() => setTheme(isDark ? "light" : "dark")} aria-label={c.ui.theme} className="pill pill-glass !px-3">
            {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
          </button>
          <a href="https://studio.ai42e.com" className="pill pill-solid hidden sm:inline-flex">
            {c.hero.ctaSecondary}
          </a>
        </div>
      </nav>
    </header>
  );
}
