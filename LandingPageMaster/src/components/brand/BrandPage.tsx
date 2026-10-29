"use client";

import { MotionConfig } from "motion/react";
import { BrandFooter } from "./BrandFooter";
import { BrandHero } from "./BrandHero";
import { BrandNavbar } from "./BrandNavbar";
import { ClosingSection } from "./ClosingSection";
import { CompareSection } from "./CompareSection";
import { EcosystemHorizonSection } from "./EcosystemHorizonSection";
import { EcosystemPlaySection } from "./EcosystemPlaySection";
import { FounderFaqSection } from "./FounderFaqSection";
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

            {/* 7. The Story, Maker & Frequently Asked Questions (Merged 2-Column Layout) */}
            <FounderFaqSection />

            {/* 9. Closing Billboard & Directory: Nested Island Architecture */}
            <section id="contact" className="w-full scroll-mt-16 min-h-[calc(100dvh-4rem)] flex flex-col justify-center py-4 sm:py-6 lg:py-8 px-3 sm:px-6 lg:px-8 bg-[var(--b-bg)]">
              {/* Bọc 2: Outer Bezel Rim (pure white frame with ambient soft shadow) */}
              <div className="mx-auto w-full max-w-[1340px] p-2 sm:p-2.5 lg:p-3 rounded-[30px] sm:rounded-[38px] lg:rounded-[44px] bg-white dark:bg-[#24201a] border border-[var(--b-line)]/60 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)]">
                {/* Bọc 3: Master Island Surface (Warm Sand / Soft Gray backdrop) */}
                <div className="w-full rounded-[24px] sm:rounded-[32px] lg:rounded-[38px] bg-[#faf6f0] dark:bg-[#1a1714] border border-[var(--b-line)]/40 px-5 py-6 sm:px-8 sm:py-7 lg:px-10 lg:py-8">
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
