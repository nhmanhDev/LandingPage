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

            {/* 9. Closing Billboard & Official Network Directory (1 Screen) */}
            <div className="lg:min-h-screen lg:flex lg:flex-col lg:justify-between lg:pt-6">
              <ClosingSection />
              <BrandFooter />
            </div>
          </main>
        </div>
      </MotionConfig>
    </LocaleProvider>
  );
}
