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

            {/* 9. Closing Billboard & Directory: Exactly 1 Full Viewport Screen */}
            <section id="contact" className="min-h-[calc(100svh-4rem)] lg:h-[calc(100svh-4rem)] flex flex-col justify-center py-2 sm:py-3 px-3 sm:px-6 lg:px-8 overflow-hidden">
              {/* Outer Master Container: Rounded Island Frame with Generous Padding */}
              <div className="mx-auto w-full max-w-[1300px] rounded-[32px] sm:rounded-[40px] lg:rounded-[44px] border border-[var(--b-line)] bg-white dark:bg-[#1e1b17] py-5 px-6 sm:py-6 sm:px-10 lg:py-6 lg:px-12 shadow-[0_16px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)] flex flex-col justify-between">
                {/* Unified Width Container: Strict Left & Right Edge Alignment */}
                <div className="mx-auto w-full max-w-[1060px] flex flex-col justify-between">
                  <ClosingSection />
                  <BrandFooter inIsland />
                </div>
              </div>
            </section>
          </main>
        </div>
      </MotionConfig>
    </LocaleProvider>
  );
}
