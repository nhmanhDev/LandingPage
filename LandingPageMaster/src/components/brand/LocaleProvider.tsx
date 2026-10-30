"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { CONTENT, type Content, type Locale } from "@/lib/brand/content";

const STORAGE_KEY = "ai42e-locale";
const listeners = new Set<() => void>();
// Keeps the choice for this visit even when storage is blocked.
let memoryLocale: Locale | null = null;

interface LocaleContextValue {
  locale: Locale;
  c: Content;
  setLocale: (next: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readLocale(): Locale {
  if (memoryLocale) return memoryLocale;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "vi" || stored === "en") return stored;
  } catch {
    /* storage can be blocked; fall through to the browser language */
  }
  return navigator.language.toLowerCase().startsWith("vi") ? "vi" : "en";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // The server snapshot is always Vietnamese, so hydration matches; the client snapshot then takes over.
  const locale = useSyncExternalStore<Locale>(subscribe, readLocale, () => "vi");

  useEffect(() => {
    const { title, description } = CONTENT[locale].meta;
    const apply = () => {
      document.documentElement.lang = locale;
      if (document.title !== title) document.title = title;
      document.querySelector('meta[name="description"]')?.setAttribute("content", description);
      document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
      document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    };
    apply();
    // React re-commits the page metadata <title> after hydration and on some re-renders, so keep it in step with the locale.
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    memoryLocale = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* the choice just won't persist */
    }
    listeners.forEach((listener) => listener());
  }, []);

  const value = useMemo(() => ({ locale, c: CONTENT[locale], setLocale }), [locale, setLocale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useBrand(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useBrand must be used inside LocaleProvider");
  return ctx;
}
