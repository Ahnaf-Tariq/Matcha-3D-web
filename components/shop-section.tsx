"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const PRODUCTS = [
  {
    name: "Classic Sōl",
    desc: "Matcha × Espresso × Ice",
    price: "$8",
    tag: "Bestseller",
    accent: "#4ADE80",
    glow: "rgba(74,222,128,0.15)",
  },
  {
    name: "Sōl Ceremonial",
    desc: "Pure Ceremonial Matcha × Ice",
    price: "$7",
    tag: "Pure",
    accent: "#fff",
    glow: "rgba(255,255,255,0.07)",
  },
  {
    name: "Sōl Hojicha",
    desc: "Roasted Tea × Oat Milk × Ice",
    price: "$7.50",
    tag: "New",
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.12)",
  },
];

function MagneticCTA({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        setHovered(false);
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

export default function ShopSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative pt-12 pb-28 px-5 sm:px-10">
      {/* Full-width CTA banner */}
      <div className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl border border-white/8 bg-[#071207] overflow-hidden p-12 sm:p-20 text-center flex flex-col items-center gap-8"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(74,222,128,0.08) 0%, transparent 80%)",
            }}
          />
          {/* Top accent line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#4ADE80]/40 to-transparent" />

          <span className="text-[10px] tracking-[0.5em] uppercase text-[#4ADE80]">
            Ready?
          </span>
          <h2 className="font-display text-6xl sm:text-8xl md:text-9xl text-white/90 leading-none">
            WAKE UP
            <br />
            YOUR FLOW
          </h2>
          <p className="text-sm text-white/40 max-w-sm leading-relaxed font-light">
            Order your first Sōl. Pick up in-store or deliver fresh to your
            door.
          </p>

          <MagneticCTA>
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="relative group px-10 py-4 rounded-full bg-[#4ADE80] text-black font-medium text-xs tracking-[0.3em] uppercase overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 bg-white rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.05, opacity: 0.15 }}
                transition={{ duration: 0.4 }}
              />
              <span className="relative z-10">Order Now →</span>
            </motion.button>
          </MagneticCTA>
        </motion.div>
      </div>

      {/* Product cards */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-6 flex flex-col"
        >
          <h3 className="font-display text-3xl text-white/70">THE MENU</h3>
          <span className="text-[9px] tracking-[0.4em] uppercase text-white/30">
            Rotating Seasonally
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.3 + i * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-2xl border border-white/8 bg-[#0A0A0A] p-7 flex flex-col gap-6 overflow-hidden hover:border-white/15 transition-all duration-500"
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${p.glow} 0%, transparent 70%)`,
                }}
              />

              <div className="flex items-center justify-between">
                <span
                  className="text-[8px] tracking-[0.45em] uppercase px-2.5 py-1 rounded-full border"
                  style={{ color: p.accent, borderColor: `${p.accent}30` }}
                >
                  {p.tag}
                </span>
                <span
                  className="font-display text-3xl"
                  style={{ color: p.accent }}
                >
                  {p.price}
                </span>
              </div>

              {/* Visual placeholder — abstract circle */}
              <div className="relative flex items-center justify-center py-8">
                <div
                  className="w-24 h-24 rounded-full border-2 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ borderColor: p.accent }}
                />
                <div
                  className="absolute w-16 h-16 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: p.accent }}
                />
                <div
                  className="absolute w-8 h-8 rounded-full opacity-30"
                  style={{ background: p.accent }}
                />
              </div>

              <div>
                <h4 className="font-display text-2xl text-white/90 leading-none mb-1">
                  {p.name}
                </h4>
                <p className="text-xs text-white/40 font-light">{p.desc}</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl border border-white/8 text-[10px] tracking-[0.35em] uppercase text-white/40 hover:border-white/20 hover:text-white/70 transition-all duration-300"
              >
                Add to Order
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
