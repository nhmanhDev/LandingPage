"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

const principles = [
  {
    number: "01",
    title: "Systems over products",
    body: "A product solves a problem once. A system solves it continuously, scales automatically, and compounds over time. Build the machine, not just the output.",
  },
  {
    number: "02",
    title: "AI is infrastructure",
    body: "AI isn't a feature — it's the new foundation. Every business built without AI as core infrastructure is already behind. The builders who understand this early will win.",
  },
  {
    number: "03",
    title: "Content is compounding capital",
    body: "Every video, post, and piece of content is an asset that generates returns indefinitely. Unlike ad spend, it compounds. Build content systems, not content strategies.",
  },
  {
    number: "04",
    title: "Automation is leverage",
    body: "The highest-leverage thing a builder can do is make themselves unnecessary in their own business. Automate until the system runs itself, then build the next one.",
  },
];

export function Vision() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="vision" className="relative bg-[#070710] py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-violet-600/7 blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/6 blur-[100px]" />
      </div>

      {/* Grid lines decoration */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
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
            Vision & Philosophy
          </span>
        </motion.div>

        {/* Big cinematic quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <p
            className="text-white/80 max-w-4xl"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
              fontWeight: 500,
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
            }}
          >
            "The future belongs to builders who treat{" "}
            <span className="text-white">intelligence as a resource</span>,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              automation as leverage
            </span>
            , and{" "}
            <span className="text-white">digital systems as businesses</span> that never sleep."
          </p>
          <p
            className="mt-6 text-white/25 text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            — Nguyễn Hùng Mạnh
          </p>
        </motion.div>

        {/* Principles */}
        <div className="grid md:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {principles.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 bg-[#070710] hover:bg-white/[0.02] transition-colors duration-300 group"
            >
              <div className="flex items-start gap-6">
                <span
                  className="text-white/10 shrink-0 mt-1 group-hover:text-white/20 transition-colors"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {p.number}
                </span>
                <div>
                  <h3
                    className="text-white/80 mb-3 group-hover:text-white transition-colors"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-white/35"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.875rem",
                      lineHeight: 1.75,
                    }}
                  >
                    {p.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom cta strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl border border-white/8 bg-gradient-to-r from-blue-600/8 to-violet-600/8"
        >
          <div>
            <h4
              className="text-white/90 mb-1"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.2rem",
                fontWeight: 600,
              }}
            >
              Interested in collaborating?
            </h4>
            <p
              className="text-white/40 text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Open to partnerships, consulting, and interesting projects.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="shrink-0 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:scale-[1.03] cursor-pointer"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Get in touch
          </button>
        </motion.div>
      </div>
    </section>
  );
}
