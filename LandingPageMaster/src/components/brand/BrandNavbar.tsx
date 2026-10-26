"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { AudioLines, Boxes, CandlestickChart, ChevronDown, Clapperboard, Download, Gamepad2, Menu, Moon, Sun, X } from "lucide-react";
import logo from "@/app/android-chrome-192x192.png";
import type { Product, ProductStatus } from "@/lib/brand/content";
import { useBrand } from "./LocaleProvider";
import { useMounted } from "./useMounted";

type IconType = React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>;

const ICONS: Record<string, IconType> = {
  studio: Clapperboard,
  game: Gamepad2,
  oneforall: Boxes,
  voice: AudioLines,
  download: Download,
  trading: CandlestickChart,
};

const DOT: Record<ProductStatus, string> = {
  free: "bg-[#1a9b5a]",
  freemium: "bg-[#1a9b5a]",
  soon: "bg-[var(--b-muted)]",
  research: "bg-[var(--b-muted)]",
  maintenance: "bg-[#d98a00]",
};

const ORDER = ["studio", "game", "oneforall", "voice", "download", "trading"];

function useOrderedProducts(items: Product[]) {
  return ORDER.map((id) => items.find((item) => item.id === id)).filter((item): item is Product => Boolean(item));
}

/** "Sản phẩm" with a drop-down listing every product, its one-line description and whether it is live. */
function ProductsMenu({ products, label, statusLabels }: { products: Product[]; label: string; statusLabels: Record<ProductStatus, string> }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);
  // Hover opens the menu; the click that follows must not close it again.
  const openedByHover = useRef(false);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li ref={rootRef} className="relative" onMouseEnter={() => { openedByHover.current = true; setOpen(true); }} onMouseLeave={() => { openedByHover.current = false; setOpen(false); }}>
      <button type="button" className="nav-link" aria-expanded={open} aria-haspopup="true" onClick={() => {
          if (openedByHover.current) {
            openedByHover.current = false;
            setOpen(true);
          } else {
            setOpen((value) => !value);
          }
        }}>
        {label}
        <ChevronDown size={16} aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="absolute left-1/2 top-full z-50 w-[36rem] -translate-x-1/2 pt-2" role="menu">
          <ul className="grid grid-cols-2 gap-1 rounded-3xl bg-[var(--b-surface)] p-2 shadow-[0_24px_60px_-20px_rgba(23,18,58,0.35)] ring-1 ring-[var(--b-line)]">
            {products.map((product) => {
              const Icon = ICONS[product.id];
              const inner = (
                <>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--b-chip)] text-[var(--b-brand)]">
                    <Icon size={20} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="t-body block font-medium">{product.name}</span>
                    <span className="t-small mt-0.5 line-clamp-2 block text-[var(--b-muted)]">{product.tagline}</span>
                    <span className="t-small mt-1.5 flex items-center gap-1.5 text-[var(--b-muted)]">
                      <span className={`h-1.5 w-1.5 rounded-full ${DOT[product.status]}`} aria-hidden="true" />
                      {statusLabels[product.status]}
                    </span>
                  </span>
                </>
              );
              const cls = "flex items-start gap-3 rounded-2xl p-3 text-left transition-colors hover:bg-[var(--b-chip)]";
              return (
                <li key={product.id} role="none">
                  {product.href ? (
                    <a role="menuitem" href={product.href} target="_blank" rel="noopener noreferrer" className={cls} onClick={() => setOpen(false)}>
                      {inner}
                    </a>
                  ) : (
                    <a role="menuitem" href="#products" className={cls} onClick={() => setOpen(false)}>
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

export function BrandNavbar() {
  const { c, locale, setLocale } = useBrand();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDark = mounted && resolvedTheme === "dark";
  const products = useOrderedProducts(c.products.items);
  const links = [
    { href: "#pricing", label: c.nav.pricing },
    { href: "#faq", label: c.nav.faq },
    { href: "#contact", label: c.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--b-line)] bg-[color-mix(in_srgb,var(--b-bg)_82%,transparent)] backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6" aria-label="Main">
        <a href="#top" className="flex min-h-10 items-center gap-2.5" aria-label="AI42E">
          <Image src={logo} alt="" width={30} height={30} className="rounded-lg" priority />
          <span className="t-heading">AI42E</span>
        </a>

        <ul className="hidden items-center gap-0.5 md:flex">
          <ProductsMenu products={products} label={c.nav.products} statusLabels={c.products.status} />
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <button type="button" onClick={() => setLocale(locale === "vi" ? "en" : "vi")} aria-label={c.ui.language} className="nav-link !px-3">
            {locale === "vi" ? "VI" : "EN"}
          </button>
          <button type="button" onClick={() => setTheme(isDark ? "light" : "dark")} aria-label={c.ui.theme} className="nav-link !px-3">
            {isDark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>
          <a href="https://studio.ai42e.com" className="pill pill-accent ml-1 hidden sm:inline-flex">
            {c.hero.ctaSecondary}
          </a>
          <button
            type="button"
            className="nav-link !px-3 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={c.nav.menu}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* "Also available" strip: every product one tap away, like AdKit's row under the bar. */}
      <div className="hidden border-t border-[var(--b-line)] md:block">
        <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-1.5 sm:px-6">
          <span className="t-small mr-1 shrink-0 text-[var(--b-muted)]">{c.nav.strip}</span>
          {products.map((product) => {
            const Icon = ICONS[product.id];
            const body = (
              <>
                <Icon size={16} aria-hidden />
                <span className="font-medium">{product.name}</span>
                <span className={`h-1.5 w-1.5 rounded-full ${DOT[product.status]}`} aria-hidden="true" />
              </>
            );
            const cls = "t-small inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-3 transition-colors hover:bg-[var(--b-chip)]";
            return product.href ? (
              <a key={product.id} href={product.href} target="_blank" rel="noopener noreferrer" className={cls}>
                {body}
              </a>
            ) : (
              <a key={product.id} href="#products" className={`${cls} text-[var(--b-muted)]`}>
                {body}
              </a>
            );
          })}
        </div>
      </div>

      {mobileOpen ? (
        <div id="mobile-menu" className="border-t border-[var(--b-line)] bg-[var(--b-bg)] md:hidden">
          <ul className="mx-auto max-w-6xl space-y-1 px-4 py-3 sm:px-6">
            <li>
              <a href="#products" className="nav-link w-full" onClick={() => setMobileOpen(false)}>
                {c.nav.products}
              </a>
            </li>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link w-full" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-1">
              <a href="https://studio.ai42e.com" className="pill pill-accent w-full">
                {c.hero.ctaSecondary}
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
