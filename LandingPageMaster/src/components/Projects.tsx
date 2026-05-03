"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight, Circle } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "AutoContent Engine",
    category: "AI · Content",
    description:
      "Fully automated content pipeline: research → script → voiceover → edit → publish. Runs 24/7 across multiple channels with zero manual intervention.",
    progress: 82,
    phase: "In Production",
    tech: ["GPT-4o", "ElevenLabs", "Runway", "n8n"],
    accentColor: "blue",
    borderGlow: "hover:shadow-[0_0_35px_rgba(59,130,246,0.1)]",
    accent: "bg-blue-400",
    tagColor: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  },
  {
    id: 2,
    name: "AlgoTrader Pro",
    category: "Trading · Finance",
    description:
      "Quantitative trading system with multi-timeframe analysis, risk management, and live execution across crypto markets. Backtested on 3+ years of data.",
    progress: 68,
    phase: "Beta Testing",
    tech: ["Python", "Pine Script", "Binance API", "PostgreSQL"],
    accentColor: "emerald",
    borderGlow: "hover:shadow-[0_0_35px_rgba(16,185,129,0.1)]",
    accent: "bg-emerald-400",
    tagColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  },
  {
    id: 3,
    name: "TikTok Network",
    category: "Creator · MMO",
    description:
      "Network of 10+ TikTok accounts across different niches, managed through a centralized automation dashboard. Growing toward monetization thresholds.",
    progress: 55,
    phase: "Scaling",
    tech: ["Automation", "Analytics", "Content Matrix"],
    accentColor: "pink",
    borderGlow: "hover:shadow-[0_0_35px_rgba(236,72,153,0.1)]",
    accent: "bg-pink-400",
    tagColor: "bg-pink-500/10 border-pink-500/20 text-pink-400",
  },
  {
    id: 4,
    name: "AI Image Factory",
    category: "AI · Visual",
    description:
      "High-throughput AI image generation system for e-commerce thumbnails, print-on-demand, and digital product creation at industrial scale.",
    progress: 90,
    phase: "Live",
    tech: ["Midjourney", "Flux", "ComfyUI", "Photoshop API"],
    accentColor: "violet",
    borderGlow: "hover:shadow-[0_0_35px_rgba(139,92,246,0.1)]",
    accent: "bg-violet-400",
    tagColor: "bg-violet-500/10 border-violet-500/20 text-violet-400",
  },
  {
    id: 5,
    name: "Workflow OS",
    category: "Automation · Infra",
    description:
      "Central automation operating system connecting all projects. n8n flows, webhooks, and custom APIs that orchestrate the entire digital business stack.",
    progress: 75,
    phase: "Expanding",
    tech: ["n8n", "Make.com", "Custom APIs", "Webhooks"],
    accentColor: "amber",
    borderGlow: "hover:shadow-[0_0_35px_rgba(245,158,11,0.1)]",
    accent: "bg-amber-400",
    tagColor: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  },
  {
    id: 6,
    name: "Creator Studio",
    category: "Production · Branding",
    description:
      "End-to-end creator production studio for shoots, brand collaboration deliverables, and high-quality visual storytelling. Merging physical and digital.",
    progress: 45,
    phase: "Building",
    tech: ["Video Production", "Brand Deals", "Visual Direction"],
    accentColor: "cyan",
    borderGlow: "hover:shadow-[0_0_35px_rgba(6,182,212,0.1)]",
    accent: "bg-cyan-400",
    tagColor: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
  },
];

function ProjectCard({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.07 * index, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative p-6 rounded-2xl border border-white/8 bg-white/2 hover:bg-white/4 transition-all duration-400 cursor-pointer ${project.borderGlow}`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Circle size={6} className={`${project.accent} fill-current`} />
            <span
              className="text-white/35 text-xs"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {project.category}
            </span>
          </div>
          <h3
            className="text-white/90"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.1rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            {project.name}
          </h3>
        </div>
        <motion.div
          animate={{ opacity: 0, x: 4 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="text-white/40 group-hover:text-white/70 transition-all duration-200 mt-1"
        >
          <ArrowUpRight size={18} />
        </motion.div>
      </div>

      <p
        className="text-white/40 mb-5"
        style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7 }}
      >
        {project.description}
      </p>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-white/30 text-xs"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {project.phase}
          </span>
          <span
            className="text-white/50 text-xs"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
          >
            {project.progress}%
          </span>
        </div>
        <div className="h-1 w-full rounded-full bg-white/6">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${project.progress}%` } : {}}
            transition={{ duration: 1.2, delay: 0.3 + 0.07 * index, ease: [0.16, 1, 0.3, 1] }}
            className={`h-full rounded-full ${project.accent}`}
          />
        </div>
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className={`px-2 py-0.5 rounded-full border text-xs ${project.tagColor}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative bg-[#070710] py-32 px-6">
      {/* Ambient */}
      <div className="absolute top-20 right-0 w-[350px] h-[350px] rounded-full bg-emerald-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
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
            Current Projects
          </span>
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
          What's being built
          <br />
          <span className="text-white/25">right now.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/40 mb-14 max-w-lg"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", lineHeight: 1.7 }}
        >
          Active experiments, live products, and systems in motion. Everything is interconnected.
        </motion.p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
