"use client";

import { PORTFOLIO_URL } from "@/lib/brand/content";
import { useBrand } from "./LocaleProvider";

export function BrandFooter() {
  const { c } = useBrand();
  return (
    <footer className="border-t border-[var(--b-line)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center text-sm text-[var(--b-muted)] sm:flex-row sm:px-6 sm:text-left">
        <div>
          <p className="font-[family-name:var(--font-space-grotesk)] text-xs font-medium tracking-[0.18em] text-[var(--b-ink)]">{c.footer.slogan}</p>
          <p className="mt-1">© {new Date().getFullYear()} {c.footer.rights}</p>
        </div>
        <a href={PORTFOLIO_URL} className="underline-offset-4 hover:text-[var(--b-ink)] hover:underline">
          {c.footer.portfolio}
        </a>
      </div>
    </footer>
  );
}
