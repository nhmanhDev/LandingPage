"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Zap, Globe, Brain, TrendingUp } from "lucide-react";

const traits = [
  {
    icon: Brain,
    label: "AI Systems",
    desc: "Building intelligent automation pipelines and AI-native products from scratch.",
    color: "from-blue-500/20 to-blue-600/5",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: TrendingUp,
    label: "Trading & Finance",
    desc: "Quantitative strategies, algorithmic trading systems, and market data tooling.",
    color: "from-violet-500/20 to-violet-600/5",
    border: "border-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: Globe,
    label: "Digital Businesses",
    desc: "MMO, affiliate, content systems, and multi-channel internet monetization.",
    color: "from-emerald-500/15 to-emerald-600/5",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Zap,
    label: "Creator Ecosystem",
    desc: "TikTok, YouTube, and content engines running as scalable digital systems.",
    color: "from-amber-500/15 to-amber-600/5",
    border: "border-amber-500/20",
    iconColor: "text-amber-400",
  },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative bg-[#070710] py-32 px-6">
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/6 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-8 bg-white/20" />
          <span
            className="text-white/35 text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Identity
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="text-white mb-6"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
              }}
            >
              Not just a builder —
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                an ecosystem architect.
              </span>
            </h2>

            <div
              className="space-y-4 text-white/50"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.8,
              }}
            >
              <p>
                Tôi là Nguyễn Hùng Mạnh — một digital builder làm việc ở giao điểm
                giữa AI, automation, trading, và creator economy. Tôi không chỉ
                xây dựng sản phẩm — tôi xây dựng hệ thống.
              </p>
              <p>
                Mỗi dự án là một mắt xích trong một hệ sinh thái số lớn hơn: từ
                công cụ AI tạo video, bot giao dịch tự động, đến các kênh nội
                dung multi-platform chạy như cỗ máy.
              </p>
              <p>
                Triết lý của tôi đơn giản: <span className="text-white/80 italic">build systems, not just products.</span>{" "}
                Automation is leverage. AI is the infrastructure of the future.
                Content is compounding capital.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {["AI", "Automation", "Trading", "MMO", "TikTok", "YouTube", "Systems", "Creator"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* Right — trait cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {traits.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative p-5 rounded-2xl bg-gradient-to-br ${t.color} border ${t.border} group hover:border-white/20 transition-all duration-300`}
              >
                <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${t.iconColor}`}>
                  <t.icon size={18} />
                </div>
                <h3
                  className="text-white/90 mb-2"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                  }}
                >
                  {t.label}
                </h3>
                <p
                  className="text-white/40"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.82rem",
                    lineHeight: 1.65,
                  }}
                >
                  {t.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
