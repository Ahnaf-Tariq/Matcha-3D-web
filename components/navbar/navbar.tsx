"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const navLinks = ["Experience", "Benefits", "Process", "Shop"];

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="fixed top-2 inset-x-0 z-[100] flex justify-center px-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 pl-4 pr-2 py-1 rounded-full flex items-center gap-8 shadow-2xl"
      >
        <span className="font-display text-xl tracking-widest text-white">
          SŌL
        </span>

        <ul className="flex items-center gap-2">
          {navLinks.map((link, i) => (
            <li
              key={link}
              role="button"
              className="relative px-4 py-1.5 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="relative z-10 text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300">
                {link}
              </span>
              {hoveredIndex === i && (
                <motion.div
                  layoutId="nav-glow"
                  className="absolute inset-0 bg-[#4ADE80]/10 rounded-full blur-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </li>
          ))}
        </ul>

        <button className="bg-[#4ADE80] text-black text-[9px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-transform">
          Order Now
        </button>
      </motion.div>
    </nav>
  );
}
