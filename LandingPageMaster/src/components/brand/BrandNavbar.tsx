"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { AudioLines, Boxes, CandlestickChart, ChevronDown, Clapperboard, Download, Gamepad2, Menu, Moon, Sun, X, Sparkles, ArrowRight } from "lucide-react";
import logo from "@/app/android-chrome-192x192.png";
import type { Product, ProductStatus } from "@/lib/brand/content";
import { useBrand } from "./LocaleProvider";
import { useMounted } from "./useMounted";
import { useReducedMotion } from "./useReducedMotion";

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

/** "Hệ sinh thái" Mega Menu organized into clear pillars */
function EcosystemMegaMenu({
  products,
  label,
  statusLabels,
  isActive = false,
}: {
  products: Product[];
  label: string;
  statusLabels: Record<ProductStatus, string>;
  isActive?: boolean;
}) {
  const { c } = useBrand();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

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
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [open]);

  const creativeProducts = products.filter((p) => ["studio", "download", "voice"].includes(p.id));
  const otherOrder = ["game", "oneforall", "trading"];
  const otherProducts = otherOrder.map((id) => products.find((p) => p.id === id)).filter((p): p is Product => Boolean(p));

  return (
    <li
      ref={rootRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={`nav-link relative whitespace-nowrap flex items-center gap-1.5 transition-colors ${
          isActive ? "!text-[var(--b-ink)] !font-semibold" : ""
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(true)}
      >
        <span>{label}</span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform duration-200 ease-out ${open ? "rotate-180 text-[var(--b-brand)]" : ""}`}
        />
        {isActive && (
          <motion.span
            layoutId="navbar-active-underline"
            className="absolute bottom-1 left-3 right-5 h-[2px] rounded-full bg-[var(--b-brand)]"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </button>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-50 w-[42rem] -translate-x-1/2 pt-2.5"
            role="menu"
          >
            <div className="rounded-[28px] border border-[var(--b-line)] bg-[var(--b-surface)] p-4 shadow-[0_24px_50px_rgba(23,18,58,0.18)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.7)]">
              <div className="grid grid-cols-2 gap-4">
                {/* Column 1: Bộ Sáng tạo AI (Creative Suite) */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 px-3 py-1 text-[13px] font-bold uppercase tracking-wider text-[var(--b-brand)]">
                    <Sparkles size={13} />
                    <span>{c.nav.megaCreative}</span>
                  </div>
                  {creativeProducts.map((product) => {
                    const Icon = ICONS[product.id];
                    return (
                      <a
                        key={product.id}
                        role="menuitem"
                        href={product.href || "#products"}
                        target={product.href ? "_blank" : undefined}
                        rel={product.href ? "noopener noreferrer" : undefined}
                        className="group flex items-start gap-3 rounded-2xl p-2.5 transition-all duration-150 hover:bg-[var(--b-chip)]"
                        onClick={() => setOpen(false)}
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--b-chip)] text-[var(--b-brand)] transition-transform duration-150 group-hover:scale-105 group-hover:bg-[var(--b-surface)]">
                          <Icon size={18} aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="t-body flex items-center justify-between font-semibold transition-colors group-hover:text-[var(--b-brand)]">
                            <span className="text-[15px] font-semibold">{product.name}</span>
                            <span className="text-[13px] text-[var(--b-muted)] opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0.5">
                              ↗
                            </span>
                          </div>
                          <span className="text-[13px] text-[var(--b-muted)] line-clamp-1 mt-0.5">{product.tagline}</span>
                          <span className="mt-1 flex items-center gap-1.5 text-[13px] text-[var(--b-muted)]">
                            <span className={`h-1.5 w-1.5 rounded-full ${DOT[product.status]}`} aria-hidden="true" />
                            {statusLabels[product.status]}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Column 2: Giải trí & Nghiên cứu tương lai */}
                <div className="space-y-1.5 border-l border-[var(--b-line)] pl-4">
                  <div className="flex items-center gap-1.5 px-3 py-1 text-[13px] font-bold uppercase tracking-wider text-[var(--b-muted)]">
                    <Gamepad2 size={13} />
                    <span>{c.nav.megaOther}</span>
                  </div>
                  {otherProducts.map((product) => {
                    const Icon = ICONS[product.id];
                    return (
                      <a
                        key={product.id}
                        role="menuitem"
                        href={product.href || (product.id === "game" ? "#play" : "#horizon")}
                        target={product.href ? "_blank" : undefined}
                        rel={product.href ? "noopener noreferrer" : undefined}
                        className="group flex items-start gap-3 rounded-2xl p-2.5 transition-all duration-150 hover:bg-[var(--b-chip)]"
                        onClick={() => setOpen(false)}
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--b-chip)] text-[var(--b-brand)] transition-transform duration-150 group-hover:scale-105 group-hover:bg-[var(--b-surface)]">
                          <Icon size={18} aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="t-body flex items-center justify-between font-semibold transition-colors group-hover:text-[var(--b-brand)]">
                            <span className="text-[15px] font-semibold">{product.name}</span>
                            <span className="text-[13px] text-[var(--b-muted)] opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0.5">
                              ↗
                            </span>
                          </div>
                          <span className="text-[13px] text-[var(--b-muted)] line-clamp-1 mt-0.5">{product.tagline}</span>
                          <span className="mt-1 flex items-center gap-1.5 text-[13px] text-[var(--b-muted)]">
                            <span className={`h-1.5 w-1.5 rounded-full ${DOT[product.status]}`} aria-hidden="true" />
                            {statusLabels[product.status]}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quick Bar */}
              <div className="mt-3 pt-3 border-t border-[var(--b-line)] flex items-center justify-between px-2 text-[13px]">
                <span className="text-[var(--b-muted)]">{c.nav.megaFooter}</span>
                <a
                  href="#products"
                  className="inline-flex items-center gap-1 font-semibold text-[var(--b-brand)] hover:underline"
                  onClick={() => setOpen(false)}
                >
                  {c.nav.megaCta}
                  <ArrowRight size={12} />
                </a>
              </div>
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
  const reduced = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDark = mounted && resolvedTheme === "dark";

  const { scrollYProgress } = useScroll();
  const smoothPageProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.35,
  });

  // Clean, focused navigation links without wrapping
  const links = [
    { href: "#compare", id: "compare", label: c.nav.compare },
    { href: "#pricing", id: "pricing", label: c.nav.pricing },
    { href: "#faq", id: "faq", label: c.nav.faq },
    { href: "#contact", id: "contact", label: c.nav.contact },
  ];

  // Active section spy
  const [activeSection, setActiveSection] = useState<string>("top");

  useEffect(() => {
    const sectionIds = ["top", "products", "play", "horizon", "compare", "pricing", "faq", "contact"];

    const handleScroll = () => {
      // 1. If reached bottom of document, activate contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70) {
        setActiveSection("contact");
        return;
      }

      // 2. Determine section near upper third of viewport
      const scrollPos = window.scrollY + 140;
      let current = "top";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isEcosystemActive = ["products", "play", "horizon"].includes(activeSection);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--b-line)] bg-[color-mix(in_srgb,var(--b-bg)_82%,transparent)] backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="Main">
        <a href="#top" className="flex min-h-10 items-center gap-2.5 shrink-0" aria-label="AI42E">
          <Image src={logo} alt="" width={30} height={30} className="rounded-lg" priority />
          <span className="t-heading font-bold tracking-tight text-[var(--b-ink)]">AI42E</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-1 xl:gap-2 text-[15px] font-semibold">
          <EcosystemMegaMenu
            products={c.products.items}
            label={c.nav.products}
            statusLabels={c.products.status}
            isActive={isEcosystemActive}
          />
          {links.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link relative whitespace-nowrap transition-colors ${
                    isActive ? "!text-[var(--b-ink)] !font-semibold" : ""
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-underline"
                      className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-[var(--b-brand)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setLocale(locale === "vi" ? "en" : "vi")}
            aria-label={c.ui.language}
            className="nav-link !px-2.5 sm:!px-3 text-[13px] sm:text-[15px] font-semibold whitespace-nowrap"
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

          <a href="#products" className="pill pill-cta !py-2 !px-4 text-[13px] sm:text-[15px] whitespace-nowrap font-semibold shadow-xs hidden sm:inline-flex">
            {c.nav.cta}
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={c.nav.menu}
            className="nav-link !px-2.5 lg:hidden"
          >
            {mobileOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="border-b border-[var(--b-line)] bg-[var(--b-surface)] px-4 py-5 lg:hidden overflow-hidden"
          >
            <ul className="flex flex-col gap-2">
              <li className="pb-1 text-[13px] font-bold uppercase tracking-wider text-[var(--b-brand)]">{c.nav.mobileGroup}</li>
              <li>
                <a href="#products" className="nav-link w-full flex items-center justify-between gap-2" onClick={() => setMobileOpen(false)}>
                  <span className="flex items-center gap-2">
                    <Clapperboard size={15} className="text-[var(--b-muted)] shrink-0" />
                    <span>{c.nav.mobileCreative}</span>
                  </span>
                  <span className="text-[13px] text-[var(--b-muted)]">↗</span>
                </a>
              </li>
              <li>
                <a href="#play" className="nav-link w-full flex items-center justify-between gap-2" onClick={() => setMobileOpen(false)}>
                  <span className="flex items-center gap-2">
                    <Gamepad2 size={15} className="text-[var(--b-muted)] shrink-0" />
                    <span>{c.nav.mobilePlay}</span>
                  </span>
                  <span className="text-[13px] text-[var(--b-muted)]">↗</span>
                </a>
              </li>
              <li>
                <a href="#horizon" className="nav-link w-full flex items-center justify-between gap-2" onClick={() => setMobileOpen(false)}>
                  <span className="flex items-center gap-2">
                    <Boxes size={15} className="text-[var(--b-muted)] shrink-0" />
                    <span>{c.nav.mobileHorizon}</span>
                  </span>
                  <span className="text-[13px] text-[var(--b-muted)]">↗</span>
                </a>
              </li>
              <li className="pt-2 border-t border-[var(--b-line)]"></li>
              {links.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`nav-link w-full flex items-center justify-between transition-colors ${
                        isActive
                          ? "!text-[var(--b-brand)] !font-semibold border-l-2 !border-[var(--b-brand)] rounded-l-none pl-3 bg-[var(--b-chip)]/40"
                          : ""
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[var(--b-brand)]" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bidirectional page-scroll progress hairline */}
      {!reduced ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[var(--b-brand)]/80"
          style={{ scaleX: smoothPageProgress, willChange: "transform" }}
        />
      ) : null}
    </header>
  );
}
