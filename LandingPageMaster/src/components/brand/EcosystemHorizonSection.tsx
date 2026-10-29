"use client";

import { Boxes, CandlestickChart, Sparkles, FileText, Languages, Cpu, Activity } from "lucide-react";
import { useBrand } from "./LocaleProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

function TradingGraph() {
  const points = Array.from({ length: 40 }, (_, i) => {
    const x = (i / 39) * 100;
    const y = 58 - i * 0.55 + Math.sin(i * 0.6) * 9 + Math.sin(i * 1.7) * 4;
    return [x, y] as const;
  });
  const line = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

  return (
    <div className="relative w-full h-[180px] rounded-2xl bg-[var(--b-surface)] border border-[var(--b-line)] p-4 flex flex-col justify-between overflow-hidden shadow-2xs">
      <div className="flex items-center justify-between text-[13px] font-semibold text-[var(--b-muted)]">
        <span className="flex items-center gap-1.5 text-emerald-600">
          <Activity size={14} /> Tín hiệu thời gian thực
        </span>
        <span className="font-mono text-[12px]">AI Model v2.4</span>
      </div>
      
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="h-[90px] w-full text-[var(--b-brand)]">
        <defs>
          <linearGradient id="trade-glow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${line} L100 60 L0 60 Z`} fill="url(#trade-glow)" />
        <path d={line} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="flex items-center justify-between text-[12px] text-[var(--b-muted)] border-t border-[var(--b-line)]/60 pt-2">
        <span>Độ tin cậy thuật toán: 94.2%</span>
        <span>Nghiên cứu nội bộ</span>
      </div>
    </div>
  );
}

function OneForAllMockup() {
  const tools = [
    { title: "Tóm tắt thông minh", desc: "Đọc và cô đọng tài liệu PDF, web dài 100 trang", icon: FileText },
    { title: "Dịch thuật ngữ cảnh", desc: "Bảo toàn văn phong và thuật ngữ chuyên ngành", icon: Languages },
    { title: "Chuyển đổi dữ liệu", desc: "Trích xuất bảng biểu từ ảnh sang Excel/JSON", icon: Cpu },
  ];

  return (
    <div className="w-full space-y-2.5">
      {tools.map((t, idx) => {
        const Icon = t.icon;
        return (
          <div key={idx} className="flex items-center gap-3 rounded-2xl bg-[var(--b-surface)] p-3 border border-[var(--b-line)] shadow-2xs">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[var(--b-chip)] text-[var(--b-brand)]">
              <Icon size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <span className="block text-[13px] font-bold text-[var(--b-ink)]">{t.title}</span>
              <span className="block text-[12px] text-[var(--b-muted)] truncate">{t.desc}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function EcosystemHorizonSection() {
  return (
    <section id="horizon" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          title="Những mảnh ghép AI tiếp theo của hệ sinh thái"
          sub="AI42E liên tục mở rộng để giải quyết thêm nhiều bài toán thường nhật: từ trạm tiện ích web đa nhiệm đến các mô hình thuật toán phân tích thị trường chuyên sâu."
        />

        <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-2">
          
          {/* Card 1: OneForAll */}
          <Reveal delay={0} className="h-full">
            <div className="sand-card flex h-full flex-col justify-between !p-8 sm:!p-10">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--b-surface)] px-3 py-1 text-[12px] font-bold text-[var(--b-muted)] border border-[var(--b-line)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Sắp ra mắt
                  </span>
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-[var(--b-surface)] text-[var(--b-ink)] shadow-2xs">
                    <Boxes size={18} />
                  </span>
                </div>

                <h3 className="t-subtitle font-bold mt-6 text-[var(--b-ink)]">
                  OneForAll
                </h3>
                <p className="t-body mt-2.5 text-[var(--b-muted)] leading-relaxed">
                  Trạm trung chuyển tiện ích AI trên nền web. Gom các tác vụ tóm tắt, dịch tài liệu và chuyển đổi dữ liệu nhanh về một giao diện duy nhất.
                </p>

                <div className="mt-8">
                  <OneForAllMockup />
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[var(--b-line)] flex items-center justify-between text-[13px] text-[var(--b-muted)]">
                <span>Dành cho công việc & nghiên cứu</span>
                <span className="font-semibold text-[var(--b-brand)]">Mở quyền truy cập sớm ↗</span>
              </div>
            </div>
          </Reveal>

          {/* Card 2: AI42E Trading System */}
          <Reveal delay={0.08} className="h-full">
            <div className="sand-card flex h-full flex-col justify-between !p-8 sm:!p-10">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--b-surface)] px-3 py-1 text-[12px] font-bold text-[var(--b-muted)] border border-[var(--b-line)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Đang nghiên cứu nội bộ
                  </span>
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-[var(--b-surface)] text-[var(--b-ink)] shadow-2xs">
                    <CandlestickChart size={18} />
                  </span>
                </div>

                <h3 className="t-subtitle font-bold mt-6 text-[var(--b-ink)]">
                  AI42E Trading System
                </h3>
                <p className="t-body mt-2.5 text-[var(--b-muted)] leading-relaxed">
                  Mô hình thuật toán AI phân tích dữ liệu thị trường và nhận diện tín hiệu xu hướng thời gian thực. (Nghiên cứu nội bộ — Không phải lời khuyên đầu tư).
                </p>

                <div className="mt-8">
                  <TradingGraph />
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[var(--b-line)] flex items-center justify-between text-[13px] text-[var(--b-muted)]">
                <span>Công nghệ định lượng (Quant AI)</span>
                <span className="font-semibold text-[var(--b-muted)]">Tài liệu nghiên cứu ↗</span>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
