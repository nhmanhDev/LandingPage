"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
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

/** "Sản phẩm" with an animated drop-down listing every product. */
function ProductsMenu({ products, label, statusLabels }: { products: Product[]; label: string; statusLabels: Record<ProductStatus, string> }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
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
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="nav-link"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((prev) => !prev)}
      >
        {label}
        <ChevronDown
          size={15}
          aria-hidden="true"
          className={`transition-transform duration-200 ease-out ${open ? "rotate-180 text-[var(--b-brand)]" : ""}`}
        />
      </button>

      {/* AnimatePresence ensures component is completely unmounted when open is false */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-full z-50 w-[38rem] -translate-x-1/2 pt-2"
            role="menu"
          >
            {/* Solid opaque background prevents content underneath from ghosting through */}
            <div className="rounded-[28px] border border-[var(--b-line)] bg-[var(--b-surface)] p-2.5 shadow-[0_24px_50px_rgba(23,18,58,0.18)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.65)]">
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
          </motion.div>
        )}
      </AnimatePresence>
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
    { href: "#products", label: c.nav.creative || "Sáng tạo" },
    { href: "#play", label: c.nav.play || "Giải trí" },
    { href: "#horizon", label: c.nav.horizon || "Tương lai" },
    { href: "#compare", label: c.nav.compare },
    { href: "#pricing", label: c.nav.pricing },
    { href: "#founder", label: c.nav.story },
    { href: "#faq", label: c.nav.faq },
    { href: "#contact", label: c.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--b-line)] bg-[color-mix(in_srgb,var(--b-bg)_82%,transparent)] backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8" aria-label="Main">
        <a href="#top" className="flex min-h-10 items-center gap-2.5 shrink-0" aria-label="AI42E">
          <Image src={logo} alt="" width={30} height={30} className="rounded-lg" priority />
          <span className="t-heading">AI42E</span>
        </a>

        {/* Center Navigation Menu Covering the Core Sections of the Page */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          <ProductsMenu products={products} label={c.nav.products} statusLabels={c.products.status} />
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link whitespace-nowrap">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Actions & Utility Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
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

          {/* Primary CTA Button: Trải nghiệm ngay */}
          <a href="#products" className="pill pill-accent hidden sm:inline-flex">
            {c.nav.cta}
          </a>

          {/* Mobile / Tablet Menu Toggle */}
          <button
            type="button"
            className="nav-link !px-3 lg:hidden"
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
        <div id="mobile-menu" className="border-t border-[var(--b-line)] bg-[var(--b-bg)] lg:hidden">
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
            <li className="pt-2">
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
