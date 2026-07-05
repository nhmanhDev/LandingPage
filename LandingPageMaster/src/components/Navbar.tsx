"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Projects", href: "#projects" },
  { label: "Vision", href: "#vision" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      if (pathname === "/") {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/" + href);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 dark:bg-[#080810]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { 
              e.preventDefault(); 
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                router.push("/");
              }
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <span style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-white text-sm font-bold">N</span>
            </div>
            <span
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="text-slate-900 dark:text-white/90 font-medium tracking-tight hidden sm:block"
            >
              Nguyễn Hùng Mạnh
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-slate-500 hover:text-slate-900 dark:text-white/50 dark:hover:text-white/90 transition-colors duration-200 text-sm tracking-wide cursor-pointer"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA & Theme toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full border border-slate-200 dark:border-white/15 text-slate-700 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer flex items-center justify-center w-9 h-9"
              aria-label="Toggle Theme"
            >
              {mounted && theme === "dark" ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-indigo-600 dark:text-indigo-400" />}
            </button>

            <button
              onClick={() => handleNav("#contact")}
              className="hidden md:block px-4 py-2 rounded-full border border-slate-200 dark:border-white/15 text-slate-700 dark:text-white/70 hover:border-slate-400 dark:hover:border-white/30 hover:text-slate-900 dark:hover:text-white transition-all duration-200 text-sm cursor-pointer"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Let's connect
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[65px] left-0 right-0 z-40 bg-white/95 dark:bg-[#080810]/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 px-6 py-6 flex flex-col gap-5"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-slate-700 hover:text-slate-900 dark:text-white/70 dark:hover:text-white text-lg text-left cursor-pointer transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav("#contact")}
              className="mt-2 px-5 py-3 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm w-fit cursor-pointer"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Let's connect
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
