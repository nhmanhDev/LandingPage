"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useBrand } from "./LocaleProvider";

export function ScrollToTop() {
  const { c } = useBrand();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past the hero threshold (400px)
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const label = c.ui?.toTop || "Cuộn lên đầu trang";

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      title={label}
      className={`group fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/90 dark:bg-[#25221d]/90 text-[var(--b-ink)] backdrop-blur-md shadow-md transition-all duration-300 ease-out hover:border-[var(--b-brand)] hover:bg-white dark:hover:bg-[#2e2a24] hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--b-brand)] active:scale-95 ${
        visible
          ? "pointer-events-auto opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-4"
      }`}
    >
      <ArrowUp
        size={18}
        strokeWidth={2.2}
        className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-[var(--b-brand)]"
      />
    </button>
  );
}
