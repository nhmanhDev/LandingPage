"use client";

import Image from "next/image";
import { MotionConfig } from "motion/react";
import { useTheme } from "next-themes";
import { ArrowUpRight, CandlestickChart, Moon, Network, Radio, ShieldAlert, Sun } from "lucide-react";
import logo from "@/app/android-chrome-192x192.png";
import { Bezel } from "@/components/brand/Bezel";
import { BrandFooter } from "@/components/brand/BrandFooter";
import { LocaleProvider, useBrand } from "@/components/brand/LocaleProvider";
import { Reveal } from "@/components/brand/Reveal";
import { SectionHead } from "@/components/brand/SectionHead";
import { useMounted } from "@/components/brand/useMounted";
import { TRADING } from "@/lib/trading/content";

const BRAND_URL = "https://ai42e.com";
const CARD_ICONS = [CandlestickChart, Network, Radio];

function useTrading() {
  const { locale, setLocale } = useBrand();
  return { t: TRADING[locale], locale, setLocale };
}

function TradingNavbar() {
  const { t, locale, setLocale } = useTrading();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--b-line)] bg-[color-mix(in_srgb,var(--b-bg)_82%,transparent)] backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8" aria-label="Main">
        <a href={BRAND_URL} className="flex min-h-10 items-center gap-2.5">
          <Image src={logo} alt="" width={30} height={30} className="rounded-lg" priority />
          <span className="t-heading">AI42E</span>
          <span className="t-small rounded-full bg-[var(--b-chip)] px-2.5 py-0.5 text-[var(--b-muted)]">Trading</span>
        </a>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setLocale(locale === "vi" ? "en" : "vi")}
            aria-label={`${locale === "vi" ? "VI" : "EN"}: ${t.nav.language}`}
            className="nav-link !px-3"
          >
            {locale === "vi" ? "VI" : "EN"}
          </button>
          <button type="button" onClick={() => setTheme(isDark ? "light" : "dark")} aria-label={t.nav.theme} className="nav-link !px-3">
            {isDark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>
          <a href="#contact" className="pill pill-accent ml-1 hidden sm:inline-flex">
            {t.nav.cta}
          </a>
        </div>
      </nav>
    </header>
  );
}

function Content() {
  const { t } = useTrading();
  return (
    <>
      <a
        href="#work"
        className="t-body sr-only rounded-full bg-[var(--b-ink)] px-4 py-2 text-[var(--b-bg)] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        {t.nav.skip}
      </a>
      <TradingNavbar />
      <main>
        <section className="px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1 className="t-display mt-4">{t.hero.title}</h1>
            <p className="t-lead mt-6 text-[var(--b-muted)]">{t.hero.sub}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#contact" className="pill pill-accent">
                {t.hero.ctaPrimary}
              </a>
              <a href={BRAND_URL} className="pill pill-surface">
                {t.hero.ctaSecondary}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <p className="t-small mt-5 text-[var(--b-muted)]">{t.hero.note}</p>
          </Reveal>
        </section>

        <section id="work" className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHead eyebrow={t.work.eyebrow} title={t.work.title} sub={t.work.sub} />
            <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
              {t.work.cards.map((card, index) => {
                const Icon = CARD_ICONS[index];
                return (
                  <li key={card.title}>
                    <Reveal delay={index * 0.06} className="h-full">
                      <Bezel coreClassName="p-6">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--b-chip)] text-[var(--b-brand)]">
                          <Icon size={22} aria-hidden />
                        </span>
                        <h3 className="t-heading mt-5">{card.title}</h3>
                        <p className="t-body mt-2 text-[var(--b-muted)]">{card.text}</p>
                      </Bezel>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="status-title">
          <div className="mx-auto max-w-4xl">
            <SectionHead eyebrow={t.status.eyebrow} title={t.status.title} />
            <Reveal className="mt-10">
              <Bezel inset={12} coreClassName="p-6 sm:p-8">
                <h3 id="status-title" className="sr-only">
                  {t.status.title}
                </h3>
                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {t.status.items.map((item) => (
                    <div key={item.label}>
                      <dt className="t-small text-[var(--b-muted)]">{item.label}</dt>
                      <dd className="t-heading mt-1">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </Bezel>
            </Reveal>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6" aria-labelledby="risk-title">
          <Reveal className="mx-auto max-w-4xl">
            <aside className="rounded-3xl bg-[var(--b-chip)] p-6 sm:p-8" role="note">
              <div className="flex items-center gap-3">
                <ShieldAlert size={22} className="text-[var(--b-brand)]" aria-hidden="true" />
                <h2 id="risk-title" className="t-heading">
                  {t.risk.title}
                </h2>
              </div>
              <ul className="t-body mt-4 space-y-3">
                {t.risk.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-24">
          <SectionHead eyebrow={t.closing.eyebrow} title={t.closing.title} sub={t.closing.sub} />
          <Reveal className="mt-8 text-center">
            <a href="#contact" className="pill pill-accent">
              {t.closing.cta}
            </a>
          </Reveal>
        </section>
      </main>
      <BrandFooter />
    </>
  );
}

/** invest.ai42e.com: honest one-page status of the trading research, in the same design system as ai42e.com. */
export function TradingPage() {
  return (
    <LocaleProvider>
      <MotionConfig reducedMotion="user">
        <noscript>
          <style>{'.brand-landing [style*="opacity"]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <div className="brand-landing min-h-screen overflow-x-clip">
          <Content />
        </div>
      </MotionConfig>
    </LocaleProvider>
  );
}
