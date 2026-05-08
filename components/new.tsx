import { ArrowRight } from "lucide-react";
import React from "react";

const New = () => {
  return (
    <section className="relative bg-black pb-28 px-6 flex flex-col items-center text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)",
        }}
      />

      <span className="mb-4 text-[10px] tracking-[0.45em] uppercase text-[#4ADE80]">
        The Collection
      </span>

      <h2 className="font-display text-5xl sm:text-7xl font-black tracking-tight text-white/90 leading-none max-w-2xl">
        EVERY SIP,
        <br />A RITUAL.
      </h2>

      <p className="mt-6 text-white/50 text-base leading-relaxed max-w-sm font-light">
        Hand-sourced ceremonial grade matcha. Cold-pressed espresso. Filtered
        water over hand-chipped crystal ice.
      </p>

      <a
        href="#"
        className="mt-10 group inline-flex items-center gap-1.5 border border-[#4ADE80]/50 hover:border-[#4ADE80] text-[#4ADE80] text-xs tracking-[0.3em] uppercase px-8 py-4 transition-all duration-300 hover:bg-[#4ADE80]/5"
      >
        Order Now
        <span
          className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
          aria-hidden
        >
          <ArrowRight className="size-3.5" />
        </span>
      </a>

      <div className="mt-24 grid grid-cols-3 gap-12 border-t border-white/5 pt-16 w-full max-w-lg">
        {[
          { value: "100%", label: "Ceremonial Grade" },
          { value: "0g", label: "Added Sugar" },
          { value: "144", label: "Frames of Pure Joy" },
        ].map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <span className="font-display text-3xl font-black text-white/90">
              {value}
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-white/30 leading-tight text-center">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default New;
