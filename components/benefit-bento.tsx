"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

const BENEFITS = [
  {
    size: "large",
    eyebrow: "L-Theanine",
    title: "Calm\nFocus",
    body: "The amino acid that pairs with caffeine to deliver clean, crash-free energy — no jitters, no spike.",
    accent: "#4ADE80",
    bg: "bg-[#0A1A0A]",
    border: "border-[#4ADE80]/20",
    icon: "◈",
  },
  {
    size: "small",
    eyebrow: "Antioxidants",
    title: "137×",
    body: "More antioxidants than regular green tea.",
    accent: "#fff",
    bg: "bg-[#0D0D0D]",
    border: "border-white/8",
    icon: "✦",
  },
  {
    size: "small",
    eyebrow: "Ritual",
    title: "Zero\nCrash",
    body: "Energy that lifts and sustains.",
    accent: "#4ADE80",
    bg: "bg-[#0A1A0A]",
    border: "border-[#4ADE80]/15",
    icon: "◇",
  },
  {
    size: "medium",
    eyebrow: "Ceremony Grade",
    title: "Stone-Ground\nPurity",
    body: "First-harvest ceremonial-grade matcha, stone-ground at low speed to preserve every chlorophyll molecule and micronutrient.",
    accent: "#fff",
    bg: "bg-[#0D0D0D]",
    border: "border-white/8",
    icon: "⬡",
  },
];

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.65,
      ease: easing,
    },
  }),
};

export default function BenefitsBento() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-10 px-5 sm:px-10 max-w-7xl mx-auto"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
      >
        <div>
          <span className="text-xs tracking-[0.5em] uppercase text-[#4ADE80] mb-2 block">
            Why Sōl
          </span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white/90 leading-none">
            WHAT'S
            <br />
            INSIDE
          </h2>
        </div>
        <p className="text-sm text-white/40 max-w-xs leading-relaxed font-light">
          Every ingredient chosen for a reason. Every sip engineered for
          performance.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[minmax(180px,auto)]">
        {/* Card 1 — Large (spans 2 cols, 2 rows) */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`col-span-2 row-span-2 rounded-2xl border ${BENEFITS[0].border} ${BENEFITS[0].bg} p-4 sm:p-8 flex flex-col justify-between relative overflow-hidden group`}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background:
                "radial-gradient(ellipse at 30% 30%, rgba(74,222,128,0.06) 0%, transparent 70%)",
            }}
          />
          <div>
            <span
              className="text-4xl mb-6 block"
              style={{ color: BENEFITS[0].accent }}
            >
              {BENEFITS[0].icon}
            </span>
            <span
              className="text-[9px] tracking-[0.5em] uppercase mb-2 block"
              style={{ color: BENEFITS[0].accent }}
            >
              {BENEFITS[0].eyebrow}
            </span>
            <h3 className="font-display text-5xl sm:text-6xl text-white/90 leading-none whitespace-pre-line">
              {BENEFITS[0].title}
            </h3>
          </div>
          <p className="text-sm text-white/50 leading-relaxed font-light max-w-xs">
            {BENEFITS[0].body}
          </p>
          {/* Decorative corner line */}
          <div
            className="absolute bottom-0 right-0 w-24 h-24 border-b border-r rounded-br-2xl opacity-10"
            style={{ borderColor: BENEFITS[0].accent }}
          />
        </motion.div>

        {/* Card 2 — Small */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`col-span-1 row-span-1 rounded-2xl border ${BENEFITS[1].border} ${BENEFITS[1].bg} p-3 sm:p-6 flex flex-col justify-between relative overflow-hidden group`}
        >
          <span className="text-2xl" style={{ color: BENEFITS[1].accent }}>
            {BENEFITS[1].icon}
          </span>
          <div>
            <span className="text-[8px] tracking-[0.45em] uppercase text-white/30 mb-1 block">
              {BENEFITS[1].eyebrow}
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-white/90 leading-none">
              {BENEFITS[1].title}
            </h3>
            <p className="text-xs text-white/40 mt-2 font-light leading-relaxed">
              {BENEFITS[1].body}
            </p>
          </div>
        </motion.div>

        {/* Card 3 — Small */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`col-span-1 row-span-1 rounded-2xl border ${BENEFITS[2].border} ${BENEFITS[2].bg} p-3 sm:p-6 flex flex-col justify-between relative overflow-hidden`}
        >
          <span className="text-2xl" style={{ color: BENEFITS[2].accent }}>
            {BENEFITS[2].icon}
          </span>
          <div>
            <span
              className="text-[8px] tracking-[0.45em] uppercase mb-1 block"
              style={{ color: BENEFITS[2].accent }}
            >
              {BENEFITS[2].eyebrow}
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-white/90 leading-none whitespace-pre-line">
              {BENEFITS[2].title}
            </h3>
            <p className="text-xs text-white/40 mt-2 font-light">
              {BENEFITS[2].body}
            </p>
          </div>
        </motion.div>

        {/* Card 4 — Medium (spans 2 cols) */}
        <motion.div
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`col-span-2 md:col-span-2 row-span-1 rounded-2xl border ${BENEFITS[3].border} ${BENEFITS[3].bg} p-3.5 sm:p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative overflow-hidden group`}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background:
                "radial-gradient(ellipse at 80% 80%, rgba(255,255,255,0.03) 0%, transparent 60%)",
            }}
          />
          <div>
            <span className="text-2xl text-white/20 mb-4 block">
              {BENEFITS[3].icon}
            </span>
            <span className="text-[8px] tracking-[0.45em] uppercase text-white/30 mb-1 block">
              {BENEFITS[3].eyebrow}
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-white/90 leading-none whitespace-pre-line">
              {BENEFITS[3].title}
            </h3>
          </div>
          <p className="text-xs text-white/40 font-light leading-relaxed max-w-55 shrink-0">
            {BENEFITS[3].body}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
