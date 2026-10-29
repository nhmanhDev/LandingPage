"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Gamepad2, Smartphone, Users, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const gameList = [
    "Ô ăn quan",
    "Bầu cua tôm cá",
    "Cờ tướng",
    "Cờ vua",
    "Cờ caro",
    "Sudoku",
    "2048",
    "Vòng quay sự thật",
    "Thật hay Thách",
    "Thử thách trí nhớ",
    "Đố vui dân gian",
  ];

  const cards: { id: string; name: ImageKey; baseRot: number; delay: string; title: string }[] = [
    { id: "oanquan", name: "game-oanquan", baseRot: -10, delay: "-1s", title: "Ô ăn quan" },
    { id: "family", name: "play-family", baseRot: 0, delay: "-2.5s", title: "Tụ họp gia đình" },
    { id: "baucua", name: "game-baucua", baseRot: 10, delay: "-4s", title: "Bầu cua tôm cá" },
  ];

  return (
    <section id="play" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Slite-Style Asymmetric Split Card */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] sm:rounded-[44px] border border-[var(--b-line)] bg-[var(--b-surface)] p-8 sm:p-12 lg:p-16 shadow-[0_4px_24px_-4px_rgba(107,93,70,0.08)]">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column (5 cols): Functional Storytelling & Key Points */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-500/10 text-[#1a9b5a]">
                      <Gamepad2 size={17} />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a9b5a]">
                      Trục 02 · Gắn kết đời thường
                    </span>
                  </div>

                  <h2 className="t-display text-3xl sm:text-4xl lg:text-[42px] font-bold mt-5 text-[var(--b-ink)] leading-[1.15]">
                    Công nghệ sinh ra để kéo mọi người lại gần nhau.
                  </h2>

                  <p className="t-body mt-4 text-[var(--b-muted)] text-sm sm:text-base leading-relaxed">
                    11 trò chơi dân gian và trí tuệ quen thuộc. Không tải app, không cần đăng nhập, không quảng cáo rác. Mở link trên điện thoại là cả nhà, bạn bè cùng quây quần vào bàn.
                  </p>

                  {/* 3 Value Points (Slite Functional Checklist) */}
                  <div className="mt-8 space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[var(--b-chip)] text-[var(--b-brand)] mt-0.5">
                        <Smartphone size={15} />
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-[var(--b-ink)]">Chơi ngay trên trình duyệt</h4>
                        <p className="text-xs text-[var(--b-muted)] mt-0.5">Chạy mượt trên mọi điện thoại, chỉ cần gửi link vào nhóm chat.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[var(--b-chip)] text-[var(--b-brand)] mt-0.5">
                        <ShieldCheck size={15} />
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-[var(--b-ink)]">100% Sạch quảng cáo</h4>
                        <p className="text-xs text-[var(--b-muted)] mt-0.5">An toàn tuyệt đối cho trẻ nhỏ, thanh thản cho ông bà cha mẹ.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[var(--b-chip)] text-[var(--b-brand)] mt-0.5">
                        <Users size={15} />
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-[var(--b-ink)]">11 Tựa game đối kháng sum vầy</h4>
                        <p className="text-xs text-[var(--b-muted)] mt-0.5">Thiết kế tối ưu cho 2 người chơi cùng lúc trên cùng 1 màn hình.</p>
                      </div>
                    </div>
                  </div>

                  {/* 11 Game Chips Matrix */}
                  <div className="mt-7 pt-6 border-t border-[var(--b-line)]">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--b-muted)] mb-2.5">
                      Thư viện trò chơi mở sẵn:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {gameList.map((g) => (
                        <span
                          key={g}
                          className="rounded-full bg-[var(--b-lav)] px-2.5 py-1 text-[11px] font-medium text-[var(--b-ink)] border border-[var(--b-line)]"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="mt-8 pt-2">
                  <a
                    href="https://play.ai42e.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill pill-brand inline-flex items-center gap-2 !py-3 !px-6 text-sm font-bold shadow-[0_12px_24px_-8px_rgba(194,72,31,0.4)]"
                  >
                    <span>Mở cổng game play.ai42e.com</span>
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>

              {/* Right Column (7 cols): Interactive Tactile Game Deck */}
              <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px] bg-[var(--b-lav)]/40 rounded-3xl p-6 border border-[var(--b-line)]">
                <div className="relative w-full max-w-[500px] h-[340px] sm:h-[400px] flex items-center justify-center">
                  {cards.map((card, i) => {
                    const isHovered = hoveredCard === card.id;
                    const zIndex = isHovered ? 20 : i === 1 ? 10 : 5;
                    const rotate = isHovered ? 0 : card.baseRot;
                    const scale = isHovered ? 1.06 : 1;
                    const translateY = isHovered ? -16 : 0;

                    return (
                      <motion.div
                        key={card.id}
                        onMouseEnter={() => setHoveredCard(card.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        animate={{
                          rotate,
                          scale,
                          y: translateY,
                        }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="absolute cursor-pointer w-[68%] sm:w-[62%]"
                        style={{
                          zIndex,
                          left: i === 0 ? "4%" : i === 1 ? "22%" : "40%",
                        }}
                      >
                        <Shot name={card.name} />
                        <div className="mt-2 text-center">
                          <span className="inline-block rounded-full bg-[var(--b-surface)]/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-[var(--b-ink)] shadow-sm border border-[var(--b-line)]">
                            {card.title}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
