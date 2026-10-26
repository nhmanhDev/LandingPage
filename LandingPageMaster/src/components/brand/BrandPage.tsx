"use client";

import { useState } from "react";
import { MotionConfig } from "motion/react";
import { BrandFooter } from "./BrandFooter";
import { BrandHero } from "./BrandHero";
import { BrandNavbar } from "./BrandNavbar";
import { ClosingSection } from "./ClosingSection";
import { FaqSection } from "./FaqSection";
import { FreemiumSection } from "./FreemiumSection";
import { LocaleProvider, useBrand } from "./LocaleProvider";
import { MotionPausedProvider } from "./MotionContext";
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

export function BrandPage() {
  const [paused, setPaused] = useState(false);
  return (
    <LocaleProvider>
      <MotionPausedProvider value={paused}>
      <MotionConfig reducedMotion="user">
        <noscript>
          <style>{'.brand-landing [style*="opacity"]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <div className="brand-landing min-h-screen overflow-x-clip" data-paused={paused}>
          <SkipLink />
          <BrandNavbar />
          <main>
            <BrandHero userPaused={paused} onTogglePause={() => setPaused((value) => !value)} />
            <ProductsSection />
            <FreemiumSection />
            <FaqSection />
            <ClosingSection />
          </main>
          <BrandFooter />
        </div>
      </MotionConfig>
      </MotionPausedProvider>
    </LocaleProvider>
  );
}
