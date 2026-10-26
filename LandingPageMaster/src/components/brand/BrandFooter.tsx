"use client";

import { PORTFOLIO_URL } from "@/lib/brand/content";
import { useBrand } from "./LocaleProvider";

export function BrandFooter() {
  const { c } = useBrand();
  return (
    <footer className="py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="t-body font-medium">{c.footer.slogan}</p>
          <p className="t-small mt-1 text-[var(--b-muted)]">
            © {new Date().getFullYear()} {c.footer.rights}
          </p>
        </div>
        <a href={PORTFOLIO_URL} className="pill pill-surface">
          {c.footer.portfolio}
        </a>
      </div>
    </footer>
  );
}
