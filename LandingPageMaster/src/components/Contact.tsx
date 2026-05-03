"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Twitter, Youtube, Mail, ExternalLink, Github, MessageCircle } from "lucide-react";

const socials = [
  {
    label: "Twitter / X",
    handle: "@nguyenhungmanh",
    icon: Twitter,
    href: "#",
    color: "hover:border-sky-500/40 hover:text-sky-400",
    iconColor: "text-sky-400",
  },
  {
    label: "YouTube",
    handle: "Nguyễn Hùng Mạnh",
    icon: Youtube,
    href: "#",
    color: "hover:border-red-500/40 hover:text-red-400",
    iconColor: "text-red-400",
  },
  {
    label: "GitHub",
    handle: "nguyenhungmanh",
    icon: Github,
    href: "#",
    color: "hover:border-white/30 hover:text-white/80",
    iconColor: "text-white/50",
  },
  {
    label: "Telegram",
    handle: "@nguyenhungmanh",
    icon: MessageCircle,
    href: "#",
    color: "hover:border-blue-500/40 hover:text-blue-400",
    iconColor: "text-blue-400",
  },
  {
    label: "Email",
    handle: "hello@hungmanh.io",
    icon: Mail,
    href: "mailto:hello@hungmanh.io",
    color: "hover:border-violet-500/40 hover:text-violet-400",
    iconColor: "text-violet-400",
  },
];

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Projects", href: "#projects" },
  { label: "Vision", href: "#vision" },
];

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleNav = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="relative bg-[#070710] pt-32 pb-12 px-6 border-t border-white/5">
      {/* Ambient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-violet-600/6 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Main contact block */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="h-px w-8 bg-white/20" />
            <span
              className="text-white/35 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Connect
            </span>
            <div className="h-px w-8 bg-white/20" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Let's build something
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              worth talking about.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 max-w-md mx-auto mb-12"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", lineHeight: 1.7 }}
          >
            Open to collabs, consulting, partnerships, and interesting experiments.
            Find me on the platforms below.
          </motion.p>

          {/* Social cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/8 bg-white/2 text-white/50 transition-all duration-300 group ${s.color}`}
              >
                <s.icon size={16} className={`${s.iconColor} transition-colors`} />
                <div className="text-left">
                  <div
                    className="text-xs text-white/25"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {s.label}
                  </div>
                  <div
                    className="text-sm text-white/70 group-hover:text-white transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
                  >
                    {s.handle}
                  </div>
                </div>
                <ExternalLink size={12} className="ml-1 opacity-0 group-hover:opacity-50 transition-opacity" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-10" />

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <span
                className="text-white text-xs font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                N
              </span>
            </div>
            <span
              className="text-white/40 text-sm"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Nguyễn Hùng Mạnh
            </span>
          </div>

          {/* Footer nav */}
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-white/30 hover:text-white/60 transition-colors text-sm cursor-pointer"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <p
            className="text-white/20 text-xs"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            © 2026 · Built with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
