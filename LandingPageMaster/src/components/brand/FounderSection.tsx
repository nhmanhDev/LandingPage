"use client";

import Image from "next/image";
import logo from "@/app/android-chrome-192x192.png";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

/** A short personal note from the maker, in the first person. The text is a draft for Manh to rewrite in his own voice. */
export function FounderSection() {
  const { c } = useBrand();
  const f = c.founder;
  return (
    <section className="band my-6 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow={f.eyebrow} title={f.title} />
        <Reveal className="mx-auto mt-12 max-w-2xl">
          <figure className="rounded-3xl bg-[var(--b-surface)] p-6 shadow-[var(--sh-card)] sm:p-10">
            <div className="space-y-4">
              {f.paragraphs.map((text) => (
                <p key={text} className="t-body">
                  {text}
                </p>
              ))}
            </div>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--b-line)] pt-5">
              <Image src={logo} alt="" width={36} height={36} className="rounded-xl" />
              <span className="t-body font-medium">{f.signature}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
