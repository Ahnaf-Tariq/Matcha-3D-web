"use client";
import { AnimatePresence, motion } from "framer-motion";
import { TextBeat } from "./matcha-canvas";

export function TextOverlay({
  beat,
  visible,
}: {
  beat: TextBeat;
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={beat.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-[12%] flex flex-col items-center text-center px-6 pointer-events-none select-none"
        >
          <span className="mb-3 text-xs font-semibold tracking-[0.45em] uppercase text-[#4ADE80]">
            {beat.eyebrow}
          </span>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white/90 leading-none">
            {beat.headline}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/60 max-w-xs leading-relaxed font-light">
            {beat.body}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
