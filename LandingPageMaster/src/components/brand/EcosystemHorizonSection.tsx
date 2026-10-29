"use client";

import { useState } from "react";
import { ArrowUpRight, Boxes, CandlestickChart, Sparkles, FileText, Languages, Table, Activity } from "lucide-react";
import { motion } from "motion/react";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function EcosystemHorizonSection() {
  const { c } = useBrand();
  const [activeTask, setActiveTask] = useState<number>(0);

  const oneForAllTasks = [
    { id: 0, label: "Tóm tắt tài liệu", icon: FileText, sample: "Đọc và cô đọng văn bản, PDF dài 100 trang trong 3 giây." },
    { id: 1, label: "Dịch thuật ngữ cảnh", icon: Languages, sample: "Bảo toàn văn phong tự nhiên và thuật ngữ kỹ thuật chuyên ngành." },
    { id: 2, label: "Bóc tách dữ liệu", icon: Table, sample: "Quét ảnh hoá đơn, bảng số liệu và xuất ra Excel/JSON chuẩn xác." },
  ];

  return (
    <section id="horizon" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Split Header */}
        <SectionHead
          align="split"
          eyebrow="Trục 03 · Nghiên cứu & Mở rộng"
          title="Những mảnh ghép tiếp theo đang được ươm mầm."
          sub="Chúng mình không dừng lại ở làm video. Từ trạm tiện ích gom việc vặt trên web đến mô hình thuật toán phân tích thị trường thực tế."
        />

        {/* 2 Modular Lab Bento Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: OneForAll (Web Utilities Station) */}
          <Reveal delay={0.06}>
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
              className="group relative flex flex-col justify-between h-full rounded-[36px] border border-[var(--b-line)] bg-[var(--b-surface)] p-7 sm:p-9 shadow-[0_4px_24px_-4px_rgba(107,93,70,0.08)] hover:shadow-[0_24px_48px_-12px_rgba(107,93,70,0.18)] transition-shadow duration-300"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--b-brand)]">
                    Tiện ích Web tập trung
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--b-chip)] px-2.5 py-0.5 text-xs font-medium text-[var(--b-muted)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--b-brand)] animate-pulse" />
                    Sắp ra mắt
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--b-chip)] text-[var(--b-brand)]">
                    <Boxes size={20} />
                  </span>
                  <div>
                    <h3 className="t-title font-bold text-xl text-[var(--b-ink)]">OneForAll</h3>
                    <span className="text-xs text-[var(--b-muted)]">Hộp đồ nghề AI bỏ túi trên trình duyệt</span>
                  </div>
                </div>

                <p className="t-body mt-4 text-sm text-[var(--b-muted)] leading-relaxed">
                  Gom mọi tác vụ xử lý thông tin hằng ngày về một cửa sổ duy nhất. Không cần mở hàng chục tab công cụ rời rạc.
                </p>

                {/* Interactive Task Switcher Pills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {oneForAllTasks.map((task) => {
                    const Icon = task.icon;
                    const isActive = activeTask === task.id;
                    return (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => setActiveTask(task.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                          isActive
                            ? "bg-[var(--b-ink)] text-[var(--b-bg)] shadow-sm"
                            : "bg-[var(--b-lav)] text-[var(--b-muted)] hover:bg-[var(--b-chip)] hover:text-[var(--b-ink)]"
                        }`}
                      >
                        <Icon size={13} />
                        <span>{task.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Task Sample Terminal */}
              <div className="mt-6 rounded-2xl border border-[var(--b-line)] bg-[var(--b-lav)]/60 p-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--b-line)]/60 text-[10px] text-[var(--b-muted)]">
                  <span>oneforall.ai42e.com/preview</span>
                  <span className="text-[#1a9b5a] font-bold">● Ready</span>
                </div>
                <div className="mt-3 text-[var(--b-ink)] leading-relaxed font-sans text-xs">
                  {oneForAllTasks[activeTask].sample}
                </div>
              </div>
            </motion.div>
          </Reveal>

          {/* Card 2: AI42E Trading System (Quant Lab) */}
          <Reveal delay={0.12}>
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
              className="group relative flex flex-col justify-between h-full rounded-[36px] border border-[var(--b-line)] bg-[var(--b-surface)] p-7 sm:p-9 shadow-[0_4px_24px_-4px_rgba(107,93,70,0.08)] hover:shadow-[0_24px_48px_-12px_rgba(107,93,70,0.18)] transition-shadow duration-300"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--b-muted)]">
                    Phòng nghiên cứu Quant AI
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--b-chip)] px-2.5 py-0.5 text-xs font-medium text-[var(--b-muted)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--b-muted)]" />
                    Nghiên cứu nội bộ
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--b-chip)] text-[var(--b-brand)]">
                    <CandlestickChart size={20} />
                  </span>
                  <div>
                    <h3 className="t-title font-bold text-xl text-[var(--b-ink)]">AI42E Trading System</h3>
                    <span className="text-xs text-[var(--b-muted)]">Thuật toán nhận diện tín hiệu tài chính thời gian thực</span>
                  </div>
                </div>

                <p className="t-body mt-4 text-sm text-[var(--b-muted)] leading-relaxed">
                  Mô hình học máy phân tích chuỗi dữ liệu lớn và nhận diện mẫu hình dòng tiền thị trường. Phục vụ nghiên cứu công nghệ AI định lượng.
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-[var(--b-muted)]">
                  <span className="inline-flex items-center gap-1">
                    <Activity size={13} className="text-[#1a9b5a]" />
                    Mô hình: AI Quant v2.4
                  </span>
                  <span>Độ trễ: Thời gian thực</span>
                </div>
              </div>

              {/* Animated Real-time Wave & Signal Radar Canvas */}
              <div className="mt-6 rounded-2xl border border-[var(--b-line)] bg-[var(--b-lav)]/60 p-4">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--b-line)]/60 text-[10px] text-[var(--b-muted)] font-mono">
                  <span>MARKET_STREAM: BTC/USDT</span>
                  <span className="text-[var(--b-brand)] font-bold animate-pulse">● SIGNAL DETECTED</span>
                </div>
                <div className="relative h-24 w-full mt-2">
                  <svg viewBox="0 0 400 90" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--b-brand)" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="var(--b-brand)" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,60 Q50,20 100,55 T200,40 T300,70 T400,25 L400,90 L0,90 Z"
                      fill="url(#waveGradient)"
                    />
                    <motion.path
                      d="M0,60 Q50,20 100,55 T200,40 T300,70 T400,25"
                      fill="none"
                      stroke="var(--b-brand)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      animate={{
                        d: [
                          "M0,60 Q50,20 100,55 T200,40 T300,70 T400,25",
                          "M0,55 Q50,30 100,45 T200,50 T300,60 T400,20",
                          "M0,60 Q50,20 100,55 T200,40 T300,70 T400,25",
                        ],
                      }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    />
                    <circle cx="300" cy="70" r="4" fill="var(--b-brand)" />
                    <circle cx="300" cy="70" r="8" fill="var(--b-brand)" opacity="0.3" className="animate-ping" />
                  </svg>
                </div>
                <div className="mt-1 text-[10px] text-[var(--b-muted)] italic text-right">
                  *Nghiên cứu công nghệ nội bộ — Không phải lời khuyên đầu tư.
                </div>
              </div>
            </motion.div>
          </Reveal>

        </div>

      </div>
    </section>
  );
}
