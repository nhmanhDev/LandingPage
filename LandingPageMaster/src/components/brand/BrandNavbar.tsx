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
    <li
      ref={rootRef}
      className="relative"
      onMouseEnter={() => {
        openedByHover.current = true;
        setOpen(true);
      }}
      onMouseLeave={() => {
        openedByHover.current = false;
        setOpen(false);
      }}
    >
      <button
        type="button"
        className="nav-link"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => {
          if (openedByHover.current) {
            openedByHover.current = false;
            setOpen(true);
          } else {
            setOpen((value) => !value);
          }
        }}
      >
        {label}
        <ChevronDown
          size={15}
          aria-hidden="true"
          className={`transition-transform duration-200 ease-out ${open ? "rotate-180 text-[var(--b-brand)]" : ""}`}
        />
      </button>

      {/* Dropdown Container with Smooth Animation & Safe Hover Bridge */}
      <div
        className={`products-dropdown absolute left-1/2 top-full z-50 w-[38rem] -translate-x-1/2 pt-2 ${
          open ? "is-open" : ""
        }`}
        role="menu"
        aria-hidden={!open}
      >
        <div className="rounded-[28px] border border-[var(--b-line)] bg-[var(--b-surface)]/95 p-2.5 shadow-[0_20px_50px_rgba(45,47,52,0.12)] backdrop-blur-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
          <ul className="grid grid-cols-2 gap-1.5">
            {products.map((product) => {
              const Icon = ICONS[product.id];
              const inner = (
                <>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--b-chip)] text-[var(--b-brand)] transition-transform duration-150 group-hover:scale-105 group-hover:bg-[var(--b-surface)]">
                    <Icon size={20} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="t-body flex items-center justify-between font-medium transition-colors group-hover:text-[var(--b-brand)]">
                      <span>{product.name}</span>
                      <span className="text-xs text-[var(--b-muted)] opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </span>
                    <span className="t-small mt-0.5 line-clamp-2 block text-[var(--b-muted)]">
                      {product.tagline}
                    </span>
                    <span className="t-small mt-1.5 flex items-center gap-1.5 text-[var(--b-muted)]">
                      <span className={`h-1.5 w-1.5 rounded-full ${DOT[product.status]}`} aria-hidden="true" />
                      {statusLabels[product.status]}
                    </span>
                  </span>
                </>
              );
              const cls =
                "group flex items-start gap-3 rounded-2xl p-3 text-left transition-all duration-150 hover:bg-[var(--b-chip)]";
              return (
                <li key={product.id} role="none">
                  {product.href ? (
                    <a
                      role="menuitem"
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cls}
                      onClick={() => setOpen(false)}
                    >
                      {inner}
                    </a>
                  ) : (
                    <a
                      role="menuitem"
                      href="#products"
                      className={cls}
                      onClick={() => setOpen(false)}
                    >
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
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
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--b-line)] bg-[color-mix(in_srgb,var(--b-bg)_82%,transparent)] backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8" aria-label="Main">
        <a href="#top" className="flex min-h-10 items-center gap-2.5" aria-label="AI42E">
          <Image src={logo} alt="" width={30} height={30} className="rounded-lg" priority />
          <span className="t-heading">AI42E</span>
        </a>

        {/* Center Navigation Menu */}
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

        {/* Right Actions & Utility Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setLocale(locale === "vi" ? "en" : "vi")}
            aria-label={c.ui.language}
            className="nav-link !px-2.5 sm:!px-3 text-xs sm:text-sm font-medium"
          >
            {locale === "vi" ? "VI" : "EN"}
          </button>
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={c.ui.theme}
            className="nav-link !px-2.5 sm:!px-3"
          >
            {isDark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>

          {/* Secondary Action Button: Liên hệ */}
          <a href="#contact" className="pill pill-outline ml-1 hidden sm:inline-flex">
            {c.nav.contact}
          </a>

          {/* Primary CTA Button: Trải nghiệm ngay */}
          <a href="#products" className="pill pill-accent hidden md:inline-flex">
            {c.nav.cta}
          </a>

          {/* Mobile Menu Toggle */}
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
            <li className="pt-2 flex flex-col gap-2">
              <a href="#contact" className="pill pill-outline w-full justify-center" onClick={() => setMobileOpen(false)}>
                {c.nav.contact}
              </a>
              <a href="#products" className="pill pill-accent w-full justify-center" onClick={() => setMobileOpen(false)}>
                {c.nav.cta}
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
