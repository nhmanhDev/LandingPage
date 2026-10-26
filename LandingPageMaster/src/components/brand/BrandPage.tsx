"use client";

import { MotionConfig } from "motion/react";
import { BrandFooter } from "./BrandFooter";
import { BrandHero } from "./BrandHero";
import { BrandNavbar } from "./BrandNavbar";
import { ClosingSection } from "./ClosingSection";
import { CompareSection } from "./CompareSection";
import { FaqSection } from "./FaqSection";
import { FounderSection } from "./FounderSection";
import { FreemiumSection } from "./FreemiumSection";
import { LocaleProvider, useBrand } from "./LocaleProvider";
import { ProductsSection } from "./ProductsSection";
import { ShowcaseSection } from "./ShowcaseSection";

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

/** The story, top to bottom: claim, what you can do, everything on offer, why it is easier, cost, the maker, doubts, invitation. */
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
            <BrandHero />
            <ShowcaseSection />
            <ProductsSection />
            <CompareSection />
            <FreemiumSection />
            <FounderSection />
            <FaqSection />
            <ClosingSection />
          </main>
          <BrandFooter />
        </div>
      </MotionConfig>
    </LocaleProvider>
  );
}
