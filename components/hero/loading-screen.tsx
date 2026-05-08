"use client";
import { motion } from "framer-motion";

export function LoadingScreen({ progress }: { progress: number }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 flex flex-col items-center gap-3"
      >
        <span className="font-display text-5xl tracking-[0.25em] text-white/90">
          SŌL
        </span>
        <span className="text-xs tracking-[0.4em] text-[#4ADE80] uppercase">
          Matcha
        </span>
      </motion.div>

      <div className="relative w-48 h-px bg-white/10 overflow-hidden rounded-full">
        <motion.div
          className="absolute inset-y-0 left-0 bg-[#4ADE80]"
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      <motion.span
        key={Math.floor(progress)}
        className="mt-5 font-mono text-xs tabular-nums text-white/30"
      >
        {Math.floor(progress)}%
      </motion.span>
    </motion.div>
  );
}
