"use client";

import { MotionConfig } from "motion/react";
import { BrandFooter } from "./BrandFooter";
import { BrandHero } from "./BrandHero";
import { BrandNavbar } from "./BrandNavbar";
import { ContactSection } from "./ContactSection";
import { FaqSection } from "./FaqSection";
import { FreemiumSection } from "./FreemiumSection";
import { LocaleProvider, useBrand } from "./LocaleProvider";
import { ProductsSection } from "./ProductsSection";

function SkipLink() {
  const { c } = useBrand();
  return (
    <a
      href="#products"
      className="sr-only rounded-full bg-[var(--b-ink)] px-4 py-2 text-sm text-[var(--b-bg)] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
    >
      {c.ui.skip}
    </a>
  );
}

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
            <ProductsSection />
            <FreemiumSection />
            <FaqSection />
            <ContactSection />
          </main>
          <BrandFooter />
        </div>
      </MotionConfig>
    </LocaleProvider>
  );
}
