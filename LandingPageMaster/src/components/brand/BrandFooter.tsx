"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, AtSign, Check } from "lucide-react";
import logo from "@/app/android-chrome-192x192.png";
import { PORTFOLIO_URL, SOCIALS } from "@/lib/brand/content";
import { useBrand } from "./LocaleProvider";

const ECOSYSTEM_LINKS = [
  { name: "Voice Studio", href: "https://voice.ai42e.com", external: true },
  { name: "Tách nhạc AI", href: "https://audio.ai42e.com", external: true },
  { name: "Cờ vây AI", href: "https://baduk.ai42e.com", external: true },
  { name: "Tất cả công cụ", href: "#products", external: false },
];

export function BrandFooter({ inIsland = true }: { inIsland?: boolean }) {
  const { c, locale } = useBrand();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
  };

  const isVi = locale === "vi";

  const content = (
    <footer className="w-full mt-10 sm:mt-14 lg:mt-16 font-sans">
      {/* 4-Column Directory: Unified Grid aligned with CTA card */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 lg:gap-x-10">
        {/* Column 1: Brand Info */}
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="AI42E" width={22} height={22} className="rounded-md" />
            <span className="font-sans text-[16px] font-bold text-[var(--b-ink)] tracking-tight">AI42E</span>
          </div>
          <p className="mt-2.5 text-[14px] text-[var(--b-muted)] leading-relaxed max-w-[260px]">
            {c.footer.about}
          </p>
        </div>

        {/* Column 2: Products */}
        <div>
          <h3 className="text-[14px] font-semibold text-[var(--b-ink)] tracking-tight mb-3">
            {c.footer.colProducts}
          </h3>
          <ul className="space-y-2.5 text-[14px]">
            {ECOSYSTEM_LINKS.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group inline-flex items-center gap-1 text-[var(--b-muted)] transition-colors hover:text-[var(--b-ink)]"
                >
                  <span>{item.name}</span>
                  {item.external ? (
                    <ArrowUpRight size={12} className="opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Socials */}
        <div>
          <h3 className="text-[14px] font-semibold text-[var(--b-ink)] tracking-tight mb-3">
            {c.footer.colContact}
          </h3>
          <ul className="space-y-2.5 text-[14px]">
            {SOCIALS.filter((s) => s.id !== "email").map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-[var(--b-muted)] transition-colors hover:text-[var(--b-ink)]"
                >
                  <span>{social.name}</span>
                  <ArrowUpRight size={12} className="opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="col-span-2 sm:col-span-1">
          <h3 className="text-[14px] font-semibold text-[var(--b-ink)] tracking-tight mb-2.5">
            {isVi ? "Bản tin AI42E" : "Newsletter"}
          </h3>
          <p className="text-[14px] text-[var(--b-muted)] leading-relaxed max-w-[280px] mb-3">
            {isVi
              ? "Nhận thông báo khi có công cụ AI mới và tính năng thử nghiệm sớm."
              : "Receive product updates news and early access."}
          </p>

          <form onSubmit={handleSubscribe} className="relative flex items-center w-full max-w-[320px]">
            {subscribed ? (
              <div className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--b-pos-fg)] bg-[var(--b-pos-bg)] py-1.5 px-3 rounded-full">
                <Check size={13} />
                <span>{isVi ? "Đã đăng ký! Cảm ơn bạn." : "Subscribed! Thank you."}</span>
              </div>
            ) : (
              <>
                <AtSign size={14} className="absolute left-3 text-[var(--b-muted)] pointer-events-none opacity-40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isVi ? "Nhập email của bạn..." : "Enter your email..."}
                  required
                  className="w-full rounded-full border border-gray-200/90 dark:border-[var(--b-line)] bg-white dark:bg-[#25221d] h-[42px] pl-8 pr-11 text-[14px] text-[var(--b-ink)] placeholder:text-[var(--b-muted)]/50 focus:border-[var(--b-ink)] focus:outline-none transition-colors shadow-2xs"
                />
                <button
                  type="submit"
                  aria-label={isVi ? "Đăng ký nhận tin" : "Subscribe"}
                  className="absolute right-1 grid h-[34px] w-[34px] place-items-center rounded-full bg-[var(--b-brand)] text-white hover:opacity-90 transition-opacity"
                >
                  <ArrowRight size={13} />
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Copyright & Slogan Bar: Pure Whitespace separation */}
      <div className="mt-10 sm:mt-12 lg:mt-14 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[13px] text-[var(--b-muted)]">
        <div>
          <p>
            © {new Date().getFullYear()} {c.footer.rights}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[var(--b-muted)] transition-colors hover:text-[var(--b-ink)] font-medium"
          >
            <span>{c.footer.portfolio}</span>
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
          <span className="text-[var(--b-line)] hidden sm:inline">·</span>
          <p className="font-medium tracking-wider text-[12px]">{c.footer.slogan}</p>
        </div>
      </div>
    </footer>
  );

  if (inIsland) {
    return content;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {content}
    </div>
  );
}
