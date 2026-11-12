"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import logo from "@/app/android-chrome-192x192.png";
import type { Locale } from "@/lib/brand/content";
import { LEGAL, LEGAL_UI, LEGAL_UPDATED, type LegalDoc } from "@/lib/brand/legal";
import { LocaleProvider, useBrand } from "./LocaleProvider";
import { useMounted } from "./useMounted";

const DOCS: LegalDoc[] = ["privacy", "terms"];

// Module-level so the object identity is stable and LocaleProvider's effect does not re-run on every render.
const PAGE_META: Record<LegalDoc, Record<Locale, { title: string; description: string }>> = {
  privacy: { vi: LEGAL.vi.privacy.meta, en: LEGAL.en.privacy.meta },
  terms: { vi: LEGAL.vi.terms.meta, en: LEGAL.en.terms.meta },
};

function formatDate(iso: string, locale: Locale): string {
  const [y, m, d] = iso.split("-");
  return locale === "vi" ? `${d}/${m}/${y}` : new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

function LegalHeader() {
  const { c, locale, setLocale } = useBrand();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--b-line)] bg-[color-mix(in_srgb,var(--b-bg)_82%,transparent)] backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="Main">
        <Link href="/" className="flex min-h-10 items-center gap-2.5 shrink-0" aria-label="AI42E">
          <Image src={logo} alt="" width={30} height={30} className="rounded-lg" priority />
          <span className="t-heading tracking-tight text-[var(--b-ink)]">AI42E</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setLocale(locale === "vi" ? "en" : "vi")}
            aria-label={c.ui.language}
            className="nav-link !px-2.5 sm:!px-3 text-[13px] sm:text-[15px] font-semibold whitespace-nowrap"
          >
            {locale === "vi" ? "VI" : "EN"}
          </button>
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={c.ui.theme}
            className="nav-link !px-2.5 sm:!px-3"
          >
            {isDark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>
  );
}

function LegalFooter({ current }: { current: LegalDoc }) {
  const { c, locale } = useBrand();
  const ui = LEGAL_UI[locale];
  const other = DOCS.find((d) => d !== current) as LegalDoc;

  return (
    <footer className="mx-auto w-full max-w-7xl px-4 pb-8 pt-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 border-t border-[var(--b-line)] pt-5 text-[13px] text-[var(--b-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {c.footer.rights}
        </p>
        <nav aria-label={ui.nav} className="flex flex-wrap items-center gap-x-4">
          <Link href={`/${other}`} className="inline-flex min-h-10 items-center transition-colors hover:text-[var(--b-ink)]">
            {ui.otherDoc[other]}
          </Link>
          <Link href="/" className="inline-flex min-h-10 items-center transition-colors hover:text-[var(--b-ink)]">
            {ui.back}
          </Link>
        </nav>
      </div>
    </footer>
  );
}

function LegalBody({ doc }: { doc: LegalDoc }) {
  const { locale } = useBrand();
  const ui = LEGAL_UI[locale];
  const page = LEGAL[locale][doc];

  return (
    <div className="brand-landing flex min-h-screen flex-col overflow-x-clip">
      <LegalHeader />
      <main className="mx-auto w-full max-w-[760px] flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/"
          className="group inline-flex min-h-10 items-center gap-1.5 text-[15px] font-semibold text-[var(--b-muted)] transition-colors hover:text-[var(--b-ink)]"
        >
          <ArrowLeft size={15} aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5" />
          {ui.back}
        </Link>

        <h1 className="t-title mt-4">{page.title}</h1>
        <p className="t-small mt-3 text-[var(--b-muted)]">
          {ui.updated}: <time dateTime={LEGAL_UPDATED}>{formatDate(LEGAL_UPDATED, locale)}</time>
        </p>
        <p className="t-lead mt-6 text-[var(--b-muted)]">{page.intro}</p>

        <div className="mt-8 space-y-8">
          {page.sections.map((section) => (
            <section key={section.heading} aria-labelledby={`sec-${section.heading.split(".")[0]}`}>
              <h2 id={`sec-${section.heading.split(".")[0]}`} className="t-heading">
                {section.heading}
              </h2>
              {section.paragraphs?.map((text) => (
                <p key={text} className="t-body mt-2 text-[var(--b-muted)]">
                  {text}
                </p>
              ))}
              {section.items ? (
                <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-[var(--b-brand)]">
                  {section.items.map((item) => (
                    <li key={item} className="t-body text-[var(--b-muted)]">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </main>
      <LegalFooter current={doc} />
    </div>
  );
}

/** Privacy policy and terms of use, in the brand look and both locales. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <LocaleProvider meta={PAGE_META[doc]}>
      <LegalBody doc={doc} />
    </LocaleProvider>
  );
}
