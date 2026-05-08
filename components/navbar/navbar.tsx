"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = ["Experience", "Benefits", "Process", "Shop"];

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed top-2 inset-x-0 z-[100] flex justify-center px-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 pl-4 pr-2 py-1 rounded-full flex items-center shadow-2xl w-full max-w-2xl justify-between sm:w-auto sm:gap-8"
        >
          <span className="font-display text-xl tracking-widest text-white select-none">
            SŌL
          </span>

          {/* Desktop links */}
          <ul className="hidden sm:flex items-center gap-2">
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

          {/* Desktop CTA */}
          <button className="hidden sm:block bg-[#4ADE80] text-black text-[9px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-transform">
            Order Now
          </button>

          {/* Mobile: hamburger only */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex sm:hidden relative w-9 h-9 items-center justify-center rounded-full bg-white/8 border border-white/10 hover:bg-white/12 transition-colors"
          >
            <div className="flex flex-col gap-[5px] w-4">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block h-[1.5px] w-full bg-white rounded-full origin-center"
              />
              <motion.span
                animate={
                  menuOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.2 }}
                className="block h-[1.5px] w-full bg-white rounded-full"
              />
              <motion.span
                animate={
                  menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3 }}
                className="block h-[1.5px] w-full bg-white rounded-full origin-center"
              />
            </div>
          </button>
        </motion.div>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm sm:hidden"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
              className="fixed top-16 inset-x-4 z-[95] sm:hidden bg-white/6 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <ul className="flex flex-col py-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                    onClick={() => setMenuOpen(false)}
                    className="group px-6 py-4 cursor-pointer border-b border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                  >
                    <span className="text-[11px] uppercase tracking-[0.25em] text-white/60 group-hover:text-white transition-colors duration-200">
                      {link}
                    </span>
                    <span className="text-white/20 group-hover:text-[#4ADE80] transition-colors duration-200 text-xs">
                      →
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Order Now inside drawer */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.15 }}
                className="px-6 py-4 border-t border-white/5"
              >
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full bg-[#4ADE80] text-black text-[9px] font-bold uppercase tracking-widest py-3 rounded-full hover:scale-[1.02] active:scale-95 transition-transform"
                >
                  Order Now
                </button>
              </motion.div>

              {/* Bottom accent */}
              <div className="px-6 py-3 border-t border-white/5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">
                  Premium Matcha · Est. 2024
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
