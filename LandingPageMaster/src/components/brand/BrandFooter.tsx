"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, AtSign, Check } from "lucide-react";
import logo from "@/app/android-chrome-192x192.png";
import { PORTFOLIO_URL, SOCIALS } from "@/lib/brand/content";
import { useBrand } from "./LocaleProvider";

export function BrandFooter({ inIsland = true }: { inIsland?: boolean }) {
  const { c } = useBrand();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    // No newsletter service is connected yet, so the form opens an email to the team rather than claiming a sign-up.
    const mailto = SOCIALS.find((s) => s.id === "email")?.href ?? "mailto:";
    const body = `${c.footer.mailBody}\n${email}`;
    window.location.href = `${mailto}?subject=${encodeURIComponent(c.footer.mailSubject)}&body=${encodeURIComponent(body)}`;
    setSubscribed(true);
  };

  const ecosystemLinks = [
    { id: "studio", name: "AI42E Studio", href: "https://studio.ai42e.com", external: true },
    { id: "voice", name: "Voice Studio", href: "https://voice.ai42e.com", external: true },
    { id: "download", name: "DownloadAnything", href: "https://downloader.ai42e.com", external: true },
    { id: "game", name: "AI42E Game", href: "#play", external: false },
    { id: "all", name: c.footer.allTools, href: "#products", external: false },
  ];

  const content = (
    <footer className="w-full mt-6 sm:mt-7 lg:mt-8">
      {/* 4-column directory */}

      {/* 4-Column Directory: Unified Grid aligned with CTA card */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:gap-x-10">
        {/* Column 1: Brand Info */}
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="AI42E" width={22} height={22} className="rounded-md" />
            <span className="text-[15px] font-bold text-[var(--b-ink)] tracking-tight">AI42E</span>
          </div>
          <p className="mt-2 text-[15px] text-[var(--b-muted)] leading-relaxed max-w-[260px]">
            {c.footer.about}
          </p>
        </div>

        {/* Column 2: Products */}
        <div>
          <h3 className="text-[15px] font-semibold text-[var(--b-ink)] tracking-tight mb-2">
            {c.footer.colProducts}
          </h3>
          <ul className="space-y-1.5 text-[15px]">
            {ecosystemLinks.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group inline-flex min-h-10 items-center gap-1 text-[var(--b-muted)] transition-colors hover:text-[var(--b-ink)]"
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
          <h3 className="text-[15px] font-semibold text-[var(--b-ink)] tracking-tight mb-2">
            {c.footer.colContact}
          </h3>
          <ul className="space-y-1.5 text-[15px]">
            {SOCIALS.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-10 items-center gap-1 text-[var(--b-muted)] transition-colors hover:text-[var(--b-ink)]"
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
          <h3 className="text-[15px] font-semibold text-[var(--b-ink)] tracking-tight mb-1.5">
            {c.footer.newsTitle}
          </h3>
          <p className="text-[15px] text-[var(--b-muted)] leading-relaxed max-w-[280px] mb-2.5">
            {c.footer.newsText}
          </p>

          <form onSubmit={handleSubscribe} className="relative flex items-center w-full max-w-[320px]">
            {subscribed ? (
              <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--b-pos-fg)] bg-[var(--b-pos-bg)] py-1.5 px-3 rounded-full">
                <Check size={13} />
                <span>{c.footer.subscribed}</span>
              </div>
            ) : (
              <>
                <AtSign size={14} className="absolute left-3 text-[var(--b-muted)] pointer-events-none opacity-40" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={c.footer.emailPlaceholder}
                  required
                  spellCheck={false}
                  autoCorrect="off"
                  autoCapitalize="off"
                  className="w-full rounded-full border border-gray-200/90 dark:border-[var(--b-line)] bg-white dark:bg-[#25221d] h-[38px] pl-8 pr-11 text-[15px] text-[var(--b-ink)] placeholder:text-[var(--b-muted)]/50 focus:border-[var(--b-ink)] focus:outline-none transition-colors shadow-2xs"
                />
                <button
                  type="submit"
                  aria-label={c.footer.subscribeLabel}
                  className="absolute right-1 grid h-[30px] w-[30px] place-items-center rounded-full bg-[var(--b-brand)] text-white hover:opacity-90 transition-opacity"
                >
                  <ArrowRight size={13} />
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Copyright & Slogan Bar: Pure Whitespace separation */}
      <div className="mt-5 sm:mt-6 lg:mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[13px] text-[var(--b-muted)]">
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
            className="inline-flex min-h-10 items-center gap-1 text-[var(--b-muted)] transition-colors hover:text-[var(--b-ink)] font-semibold"
          >
            <span>{c.footer.portfolio}</span>
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
          <span className="text-[var(--b-muted)] hidden sm:inline">·</span>
          <p className="font-semibold tracking-wider text-[13px]">{c.footer.slogan}</p>
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
