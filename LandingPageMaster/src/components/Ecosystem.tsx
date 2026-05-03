"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  Video,
  TrendingUp,
  Music2,
  Youtube,
  Cpu,
  Camera,
  ImageIcon,
  FlaskConical,
  ArrowUpRight,
} from "lucide-react";

const cards = [
  {
    id: "ai-video",
    icon: Video,
    title: "AI Video",
    subtitle: "Automated video production",
    desc: "End-to-end AI pipeline that researches, scripts, edits, and publishes videos at scale. Zero manual intervention.",
    tags: ["GPT-4o", "Runway", "ElevenLabs"],
    accent: "from-blue-600/30 to-blue-800/10",
    border: "hover:border-blue-500/40",
    glow: "hover:shadow-[0_0_40px_rgba(59,130,246,0.12)]",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/15",
    size: "lg", // col-span-2 on large
    status: "Active",
    statusColor: "bg-blue-400",
  },
  {
    id: "trading-lab",
    icon: TrendingUp,
    title: "Trading Lab",
    subtitle: "Quantitative systems",
    desc: "Algorithmic trading strategies, market scanners, and data-driven signal systems.",
    tags: ["Python", "Backtesting", "Crypto"],
    accent: "from-emerald-600/20 to-emerald-800/5",
    border: "hover:border-emerald-500/40",
    glow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.12)]",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/15",
    size: "sm",
    status: "Running",
    statusColor: "bg-emerald-400",
  },
  {
    id: "tiktok",
    icon: Music2,
    title: "TikTok Systems",
    subtitle: "Multi-account growth engine",
    desc: "TikTok content systems across multiple niches and accounts. Automated posting, analytics, monetization.",
    tags: ["Content Farms", "Analytics", "Monetization"],
    accent: "from-pink-600/20 to-pink-800/5",
    border: "hover:border-pink-500/40",
    glow: "hover:shadow-[0_0_40px_rgba(236,72,153,0.12)]",
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/15",
    size: "sm",
    status: "Scaling",
    statusColor: "bg-pink-400",
  },
  {
    id: "youtube",
    icon: Youtube,
    title: "YouTube Growth",
    subtitle: "Long-form content engine",
    desc: "YouTube channels powered by AI research, scripting, and production workflows. SEO-optimized at scale.",
    tags: ["Long-form", "SEO", "Automation"],
    accent: "from-red-600/20 to-red-800/5",
    border: "hover:border-red-500/40",
    glow: "hover:shadow-[0_0_40px_rgba(239,68,68,0.12)]",
    iconColor: "text-red-400",
    iconBg: "bg-red-500/15",
    size: "sm",
    status: "Growing",
    statusColor: "bg-red-400",
  },
  {
    id: "automation",
    icon: Cpu,
    title: "Automation",
    subtitle: "Workflows & integrations",
    desc: "n8n, Make, custom APIs — building invisible infrastructure that runs the entire ecosystem on autopilot.",
    tags: ["n8n", "Make.com", "APIs"],
    accent: "from-violet-600/30 to-violet-800/10",
    border: "hover:border-violet-500/40",
    glow: "hover:shadow-[0_0_40px_rgba(139,92,246,0.12)]",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/15",
    size: "lg",
    status: "Core",
    statusColor: "bg-violet-400",
  },
  {
    id: "studio",
    icon: Camera,
    title: "Studio",
    subtitle: "Creator production hub",
    desc: "Production studio for shoots, brand deals, and high-quality content creation for partnerships.",
    tags: ["Production", "Brand Deals", "Content"],
    accent: "from-amber-600/20 to-amber-800/5",
    border: "hover:border-amber-500/40",
    glow: "hover:shadow-[0_0_40px_rgba(245,158,11,0.12)]",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/15",
    size: "sm",
    status: "Live",
    statusColor: "bg-amber-400",
  },
  {
    id: "ai-image",
    icon: ImageIcon,
    title: "AI Image",
    subtitle: "Visual generation systems",
    desc: "Midjourney, Flux, DALL·E pipelines for product visuals, thumbnails, and creative assets at scale.",
    tags: ["Midjourney", "Flux", "DALL·E"],
    accent: "from-indigo-600/20 to-indigo-800/5",
    border: "hover:border-indigo-500/40",
    glow: "hover:shadow-[0_0_40px_rgba(99,102,241,0.12)]",
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-500/15",
    size: "sm",
    status: "Active",
    statusColor: "bg-indigo-400",
  },
  {
    id: "experiments",
    icon: FlaskConical,
    title: "Experiments",
    subtitle: "R&D & side projects",
    desc: "Where wild ideas get tested. New AI models, unusual niches, experimental systems, and digital frontier exploration.",
    tags: ["R&D", "Beta", "Exploration"],
    accent: "from-cyan-600/20 to-cyan-800/5",
    border: "hover:border-cyan-500/40",
    glow: "hover:shadow-[0_0_40px_rgba(6,182,212,0.12)]",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/15",
    size: "sm",
    status: "Testing",
    statusColor: "bg-cyan-400",
  },
];

function EcosystemCard({ card, index, inView }: { card: typeof cards[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.08 * index, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative group rounded-2xl border border-white/8 bg-gradient-to-br ${card.accent} p-6 
        transition-all duration-400 cursor-pointer overflow-hidden
        ${card.border} ${card.glow}
        ${card.size === "lg" ? "col-span-2" : "col-span-1"}
      `}
    >
      {/* Animated border glow on hover */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
        style={{
          background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.03) 100%)",
        }}
      />

      {/* Status dot */}
      <div className="flex items-center justify-between mb-5">
        <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center ${card.iconColor}`}>
          <card.icon size={20} />
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${card.statusColor} animate-pulse`} />
          <span
            className="text-white/30 text-xs"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {card.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3
              className="text-white/90 mb-1"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: card.size === "lg" ? "1.25rem" : "1.05rem",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              {card.title}
            </h3>
            <p
              className="text-white/35 text-xs mb-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {card.subtitle}
            </p>
          </div>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 4 }}
            transition={{ duration: 0.2 }}
            className={`${card.iconColor} shrink-0 mt-0.5`}
          >
            <ArrowUpRight size={18} />
          </motion.div>
        </div>

        <p
          className="text-white/40 mb-4"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.83rem",
            lineHeight: 1.65,
          }}
        >
          {card.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/8 text-white/35 text-xs"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Ecosystem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ecosystem" className="relative bg-[#070710] py-32 px-6">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-white/20" />
            <span
              className="text-white/35 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Ecosystem
            </span>
            <div className="h-px w-8 bg-white/20" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
            }}
            className="text-white mb-4"
          >
            Eight digital worlds.
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              One interconnected system.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 max-w-lg mx-auto"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", lineHeight: 1.7 }}
          >
            Each card is a gateway into a different domain. Hover to explore.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <EcosystemCard key={card.id} card={card} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
