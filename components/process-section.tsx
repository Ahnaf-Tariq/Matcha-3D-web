"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Source",
    subtitle: "Uji, Japan",
    body: "First-harvest shade-grown leaves from Uji's misty hillsides — where matcha has been cultivated for over 800 years.",
    tag: "Origin",
  },
  {
    number: "02",
    title: "Stone-Ground",
    subtitle: "Low-Speed Milling",
    body: "Granite wheels rotate at <40 RPM to prevent heat buildup — preserving chlorophyll, catechins, and vibrant color.",
    tag: "Craft",
  },
  {
    number: "03",
    title: "Layer",
    subtitle: "Precision Pour",
    body: "Matcha concentrate meets cold-brew espresso in a single vessel, separated by density into distinct visual strata.",
    tag: "Alchemy",
  },
  {
    number: "04",
    title: "Chill",
    subtitle: "Flash Freeze",
    body: "Crystal-clear ice cubes cascade over the layers — locking in temperature and texture at the perfect moment.",
    tag: "Ritual",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative pt-10 pb-28 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(74,222,128,0.04) 0%, transparent 80%)",
        }}
      />

      {/* Section Header */}
      <div className="px-5 sm:px-10 max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#4ADE80] mb-3 block">
              The Method
            </span>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white/90 leading-none">
              THE
              <br />
              PROCESS
            </h2>
          </div>
          <p className="text-sm text-white/40 max-w-xs leading-relaxed font-light">
            From ancient hillside to your hands — every step is intentional.
          </p>
        </motion.div>
      </div>

      {/* Steps grid */}
      <div className="px-5 sm:px-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: i * 0.12,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            // Removed hover:bg and added "group" for child animations
            className="bg-black p-8 flex flex-col gap-6 group relative overflow-hidden"
          >
            {/* NEW: Bottom-to-top background reveal */}
            <div className="absolute inset-0 bg-[#071207] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />

            {/* Existing Hover accent (Radial Gradient) */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 100%, rgba(74,222,128,0.08) 0%, transparent 70%)",
              }}
            />

            {/* IMPORTANT: Wrap your content in a relative div 
    so it stays on top of the moving background 
  */}
            <div className="relative z-10 flex flex-col h-full gap-6">
              <div className="flex items-start justify-between">
                <span className="font-display text-5xl text-white/10 group-hover:text-[#4ADE80]/20 transition-colors duration-500">
                  {step.number}
                </span>
                <span className="text-[8px] tracking-[0.4em] uppercase border border-white/10 group-hover:border-[#4ADE80]/30 text-white/30 group-hover:text-[#4ADE80]/70 px-2.5 py-1 rounded-full transition-all duration-500">
                  {step.tag}
                </span>
              </div>

              <div className="mt-auto">
                <h3 className="font-display text-3xl text-white/90 leading-none mb-1">
                  {step.title}
                </h3>
                <span className="text-[9px] tracking-[0.4em] uppercase text-[#4ADE80]/60 mb-4 block">
                  {step.subtitle}
                </span>
                <p className="text-xs text-white/40 leading-relaxed font-light">
                  {step.body}
                </p>
              </div>
            </div>

            {/* Step connector line */}
            {i < STEPS.length - 1 && (
              <div className="absolute right-0 top-1/2 w-px h-8 bg-white/5 hidden lg:block -translate-y-1/2 z-20" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom accent line */}
      <div className="px-5 sm:px-10 max-w-7xl mx-auto mt-16">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-[#4ADE80]/30 to-transparent origin-left"
        />
      </div>
    </section>
  );
}
