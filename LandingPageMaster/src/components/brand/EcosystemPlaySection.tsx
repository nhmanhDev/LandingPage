"use client";

import Image from "next/image";
import { ArrowUpRight, Gamepad2, Users, Smartphone, ShieldCheck } from "lucide-react";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { IMAGE_SIZE, type ImageKey } from "@/lib/brand/tiles";

function Shot({ name, className, style }: { name: ImageKey; className?: string; style?: React.CSSProperties }) {
  const { w, h } = IMAGE_SIZE[name];
  return (
    <div className={`overflow-hidden rounded-2xl shadow-[0_20px_45px_-12px_rgba(45,47,52,0.22)] ${className ?? ""}`} style={style}>
      <Image src={`/brand/tiles/${name}.webp`} alt="" width={w} height={h} unoptimized loading="lazy" draggable={false} className="block h-auto w-full" />
    </div>
  );
}

export function EcosystemPlaySection() {
  const { c } = useBrand();

  const covers: { name: ImageKey; left: string; rot: string; z: number; delay: string }[] = [
    { name: "game-oanquan", left: "6%", rot: "-9deg", z: 1, delay: "-1s" },
    { name: "game-baucua", left: "52%", rot: "8deg", z: 1, delay: "-4s" },
    { name: "game-truth", left: "28%", rot: "-1deg", z: 2, delay: "-2.5s" },
  ];

  return (
    <section id="play" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Trục giải trí & gắn kết đời sống"
          title="Không chỉ là công việc — AI42E là niềm vui gắn kết"
          sub="11 trò chơi mở trực tiếp trên trình duyệt điện thoại. Không tải app, không đăng nhập rườm rà. Dành cho những buổi họp mặt gia đình và bạn bè thêm rộn rã."
        />

        <Reveal className="mx-auto mt-12 max-w-6xl sm:mt-16">
          <div className="sand-card sand-card-wide group !p-8 sm:!p-12">
            
            {/* Left Content Column */}
            <div className="card-copy flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-[var(--b-pos-bg)] text-[var(--b-pos-fg)]">
                    <Gamepad2 size={18} />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--b-pos-fg)]">
                    11 Tựa game mở sẵn
                  </span>
                </div>

                <h3 className="t-title font-bold mt-5 text-[var(--b-ink)]">
                  AI42E Game Hub
                </h3>
                <p className="t-body mt-3 text-[var(--b-muted)] leading-relaxed">
                  Từ những nét văn hóa dân gian Việt Nam như Ô ăn quan, Bầu cua tôm cá đến những trò chơi kết nối hiện đại như Vòng quay sự thật hay Thử thách trí nhớ.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex items-start gap-2.5 rounded-2xl bg-[var(--b-surface)] p-3.5 border border-[var(--b-line)]">
                    <Smartphone size={18} className="text-[var(--b-brand)] mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-[var(--b-ink)]">Mở là chơi ngay</span>
                      <span className="block text-[11px] text-[var(--b-muted)]">Chạy trên trình duyệt mọi điện thoại</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-2xl bg-[var(--b-surface)] p-3.5 border border-[var(--b-line)]">
                    <Users size={18} className="text-[var(--b-brand)] mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-[var(--b-ink)]">Gắn kết bạn bè</span>
                      <span className="block text-[11px] text-[var(--b-muted)]">Thiết kế cho các buổi tụ họp sum vầy</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <a
                  href="https://play.ai42e.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill pill-accent pill-cta inline-flex items-center gap-2"
                >
                  Mở cổng game play.ai42e.com
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>

            {/* Right Visual: Tactile Overlapping Game Cards */}
            <div className="card-visual min-h-[300px] sm:min-h-[380px] relative flex items-center justify-center">
              <div className="relative w-full h-[320px] sm:h-[380px]">
                {covers.map((cover) => (
                  <div
                    key={cover.name}
                    className="float absolute bottom-4 w-[48%]"
                    style={{
                      left: cover.left,
                      zIndex: cover.z,
                      ["--r" as string]: cover.rot,
                      animationDelay: cover.delay,
                    }}
                  >
                    <Shot name={cover.name} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
