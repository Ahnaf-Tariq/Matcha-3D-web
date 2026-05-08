"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "Replaced my double espresso completely. The mental clarity is next level — no crash, no anxiety.",
    name: "Ayesha R.",
    role: "Product Designer",
    stars: 5,
  },
  {
    quote:
      "I didn't know a drink could actually taste like it looks. The layers are insane. It's art.",
    name: "Marcus T.",
    role: "Architect",
    stars: 5,
  },
  {
    quote:
      "Best morning ritual upgrade in years. I feel focused for 4-5 hours straight. Wild.",
    name: "Sofia K.",
    role: "Creative Director",
    stars: 5,
  },
  {
    quote:
      "The matcha flavor is so clean — earthy without bitterness. Perfectly balanced with espresso.",
    name: "James L.",
    role: "Barista Champion",
    stars: 5,
  },
  {
    quote:
      "My anxiety always spiked with coffee. Sōl gives me the energy without any of the jitters.",
    name: "Priya M.",
    role: "Neuroscientist",
    stars: 5,
  },
  {
    quote:
      "The ritual of ordering it, watching it get made, and that first sip — unmatched experience.",
    name: "Khalid A.",
    role: "Entrepreneur",
    stars: 5,
  },
];

const STATS = [
  { value: "98%", label: "Would order again" },
  { value: "4.9★", label: "Average rating" },
  { value: "50K+", label: "Monthly orders" },
  { value: "0", label: "Artificial flavors" },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-[#4ADE80] text-xs">
          ★
        </span>
      ))}
    </div>
  );
}

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(74,222,128,0.05)" }}
      />

      <div className="px-5 sm:px-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#4ADE80] mb-3 block">
              The Verdict
            </span>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white/90 leading-none">
              REAL
              <br />
              PEOPLE
            </h2>
          </div>
          <p className="text-sm text-white/40 max-w-xs leading-relaxed font-light">
            Over 50,000 orders shipped. Here's what they said.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5 mb-12"
        >
          {STATS.map((s, i) => (
            <div key={s.label} className="bg-black px-6 py-8 text-center">
              <div className="font-display text-4xl sm:text-5xl text-white/90 mb-1">
                {s.value}
              </div>
              <div className="text-[9px] tracking-[0.4em] uppercase text-white/30">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.2 + i * 0.08,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-2xl border border-white/8 bg-[#0A0A0A] p-5 sm:p-7 flex flex-col gap-5 overflow-hidden hover:border-[#4ADE80]/20 transition-all duration-500"
            >
              {/* Glass highlight on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(74,222,128,0.03) 0%, transparent 60%)",
                }}
              />
              <StarRow count={t.stars} />
              <p className="text-sm text-white/60 leading-relaxed font-light flex-1">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4ADE80]/10 border border-[#4ADE80]/20 flex items-center justify-center text-xs text-[#4ADE80]">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-[11px] text-white/70 font-medium">
                    {t.name}
                  </div>
                  <div className="text-[9px] tracking-widest uppercase text-white/30">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
