"use client";

import { MotionConfig } from "motion/react";
import { BrandFooter } from "./BrandFooter";
import { BrandHero } from "./BrandHero";
import { BrandNavbar } from "./BrandNavbar";
import { ClosingSection } from "./ClosingSection";
import { CompareSection } from "./CompareSection";
import { EcosystemHorizonSection } from "./EcosystemHorizonSection";
import { EcosystemPlaySection } from "./EcosystemPlaySection";
import { FaqSection } from "./FaqSection";
import { FounderSection } from "./FounderSection";
import { FreemiumSection } from "./FreemiumSection";
import { LocaleProvider, useBrand } from "./LocaleProvider";
import { ProductsSection } from "./ProductsSection";

function SkipLink() {
  const { c } = useBrand();
  return (
    <a
      href="#products"
      className="t-body sr-only rounded-full bg-[var(--b-ink)] px-4 py-2 text-[var(--b-bg)] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
    >
      {c.ui.skip}
    </a>
  );
}

/** The complete AI42E Ecosystem Showcase */
export function BrandPage() {
  return (
    <LocaleProvider>
      <MotionConfig reducedMotion="user">
        <noscript>
          <style>{'.brand-landing [style*="opacity"]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <div className="brand-landing min-h-screen overflow-x-clip">
          <SkipLink />
          <BrandNavbar />
          <main>
            {/* 1. Hero: Central Nexus of AI42E Ecosystem */}
            <BrandHero />

            {/* 2. Pillar 1: Multimedia Creative Suite (Studio, Voice, Downloader) */}
            <ProductsSection />

            {/* 3. Pillar 2: Life & Play (11 Web Games) */}
            <EcosystemPlaySection />

            {/* 4. Pillar 3: Future Horizon & Quant Lab (OneForAll, Trading AI) */}
            <EcosystemHorizonSection />

            {/* 5. Why Choose an Ecosystem (Integrated vs Scattered Tools) */}
            <CompareSection />

            {/* 6. Pricing & Transparent Freemium Philosophy */}
            <FreemiumSection />

            {/* 7. The Story & The Maker */}
            <FounderSection />

            {/* 8. Frequently Asked Questions */}
            <FaqSection />

            {/* 9. Closing Billboard & Directory: Nested Island Architecture */}
            <section id="contact" className="w-full py-10 sm:py-14 lg:py-20 px-3 sm:px-6 lg:px-8 bg-[var(--b-bg)]">
              {/* Bọc 2: Outer Bezel Rim (16px pure white frame with ambient soft shadow) */}
              <div className="mx-auto w-full max-w-[1340px] p-2.5 sm:p-3.5 lg:p-4 rounded-[36px] sm:rounded-[46px] lg:rounded-[52px] bg-white dark:bg-[#24201a] border border-[var(--b-line)]/60 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.06)] dark:shadow-[0_24px_70px_-15px_rgba(0,0,0,0.45)]">
                {/* Bọc 3: Master Island Surface (Warm Sand / Soft Gray backdrop) */}
                <div className="w-full rounded-[28px] sm:rounded-[38px] lg:rounded-[44px] bg-[#faf6f0] dark:bg-[#1a1714] border border-[var(--b-line)]/40 px-5 py-7 sm:px-8 sm:py-10 lg:px-14 lg:py-14">
                  {/* Unified Width Container: Strict Left & Right Edge Alignment */}
                  <div className="mx-auto w-full max-w-[1080px] flex flex-col">
                    <ClosingSection />
                    <BrandFooter inIsland />
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </MotionConfig>
    </LocaleProvider>
  );
}
