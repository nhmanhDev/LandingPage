"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import logo from "@/app/android-chrome-192x192.png";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

/** A short personal note from the maker, inspired by Slite's human-centric editorial sections. */
export function FounderSection() {
  const { c } = useBrand();
  const f = c.founder;

  return (
    <section id="founder" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow={f.eyebrow} title={f.title} />

        <Reveal className="mx-auto mt-10 max-w-3xl sm:mt-14">
          <div className="relative rounded-[36px] border border-[var(--b-line)] bg-[var(--b-lav)] p-8 sm:p-12 shadow-[var(--sh-soft)]">
            {/* Subtle quotation mark icon */}
            <span className="absolute top-6 right-8 text-[var(--b-muted)]/20" aria-hidden="true">
              <Quote size={54} />
            </span>

            <figure className="relative z-10">
              <div className="space-y-5 text-[var(--b-ink)] leading-relaxed t-lead">
                {f.paragraphs.map((text, idx) => (
                  <p key={idx} className={idx === 0 ? "font-medium" : "text-[var(--b-muted)]"}>
                    {text}
                  </p>
                ))}
              </div>

              <figcaption className="mt-8 flex items-center justify-between gap-4 border-t border-[var(--b-line)] pt-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--b-surface)] border border-[var(--b-line)] shadow-2xs">
                    <Image src={logo} alt="" width={24} height={24} className="rounded-md" />
                  </div>
                  <div>
                    <span className="t-body block font-bold text-[var(--b-ink)]">{f.signature}</span>
                    <span className="text-[13px] text-[var(--b-muted)]">AI Engineer · Nhà sáng lập AI42E</span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="pill pill-surface text-[13px] font-semibold"
                >
                  Gửi lời nhắn cho Mạnh ↗
                </a>
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
