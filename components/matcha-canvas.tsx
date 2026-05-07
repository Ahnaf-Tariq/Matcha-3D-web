"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useSpring, motion, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface TextBeat {
  id: string;
  start: number;
  end: number;
  eyebrow: string;
  headline: string;
  body: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TOTAL_FRAMES = 144;
const FRAME_BASE = "/sequence/ezgif-frame-";

const TEXT_BEATS: TextBeat[] = [
  {
    id: "a",
    start: 0.0,
    end: 0.2,
    eyebrow: "Welcome to",
    headline: "SŌL MATCHA",
    body: "Energy, redefined.",
  },
  {
    id: "b",
    start: 0.25,
    end: 0.45,
    eyebrow: "The Ritual",
    headline: "CRAFTED LAYERS",
    body: "Pure matcha meets rich espresso.",
  },
  {
    id: "c",
    start: 0.5,
    end: 0.7,
    eyebrow: "The Experience",
    headline: "CHILLED TO PERFECTION",
    body: "Crystalline ice meets flavor.",
  },
  {
    id: "d",
    start: 0.75,
    end: 0.95,
    eyebrow: "Your Next Step",
    headline: "WAKE UP YOUR FLOW",
    body: "Order your Sōl today.",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function padFrame(n: number): string {
  return String(n).padStart(3, "0");
}

function getFrameSrc(index: number): string {
  return `${FRAME_BASE}${padFrame(index)}.jpg`;
}

// ─── Loading UI ───────────────────────────────────────────────────────────────

function LoadingScreen({ progress }: { progress: number }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Logo mark */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 flex flex-col items-center gap-3"
      >
        <span className="font-display text-5xl tracking-[0.25em] text-white/90">
          SŌL
        </span>
        <span className="text-xs tracking-[0.4em] text-[#4ADE80] uppercase">
          Matcha
        </span>
      </motion.div>

      {/* Progress bar */}
      <div className="relative w-48 h-px bg-white/10 overflow-hidden rounded-full">
        <motion.div
          className="absolute inset-y-0 left-0 bg-[#4ADE80]"
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      {/* Percentage */}
      <motion.span
        key={Math.floor(progress)}
        className="mt-5 font-mono text-xs tabular-nums text-white/30"
      >
        {Math.floor(progress)}%
      </motion.span>
    </motion.div>
  );
}

// ─── Text Overlay ─────────────────────────────────────────────────────────────

function TextOverlay({ beat, visible }: { beat: TextBeat; visible: boolean }) {
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
          <span className="mb-3 text-[10px] tracking-[0.45em] uppercase text-[#4ADE80]">
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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MatchaCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number>(-1);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeBeat, setActiveBeat] = useState<TextBeat | null>(TEXT_BEATS[0]);

  // Scroll progress relative to wrapper
  const { scrollYProgress } = useScroll({ target: wrapperRef });

  // Spring-smoothed progress for canvas
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0001,
  });

  // ── Image preloading ───────────────────────────────────────────────────────

  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i + 1);
      img.onload = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
        if (loaded === TOTAL_FRAMES) {
          imagesRef.current = images;
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        // Still count errored frames so we don't hang
        loaded++;
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
        if (loaded === TOTAL_FRAMES) {
          imagesRef.current = images;
          setIsLoaded(true);
        }
      };
      images[i] = img;
    }

    return () => {
      // Abort any in-flight loads
      images.forEach((img) => {
        if (img) img.src = "";
      });
    };
  }, []);

  // ── Canvas draw ───────────────────────────────────────────────────────────

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[frameIndex];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;

    // "contain" fit
    const scale = Math.min(
      width / img.naturalWidth,
      height / img.naturalHeight,
    );
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    const offsetX = (width - drawW) / 2;
    const offsetY = (height - drawH) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  // ── Resize canvas ─────────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      if (lastFrameRef.current >= 0) drawFrame(lastFrameRef.current);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [drawFrame]);

  // ── Animation loop ────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isLoaded) return;

    const loop = () => {
      const progress = smoothProgress.get();
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1))),
      );

      if (frameIndex !== lastFrameRef.current) {
        lastFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }

      // Update active beat
      const beat =
        TEXT_BEATS.find((b) => progress >= b.start && progress <= b.end) ??
        null;
      setActiveBeat(beat);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isLoaded, smoothProgress, drawFrame]);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {!isLoaded && <LoadingScreen progress={loadProgress} />}
      </AnimatePresence>

      {/* 400vh scroll wrapper */}
      <div ref={wrapperRef} className="relative h-[400vh] mb-40">
        {/* Sticky canvas viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ display: "block" }}
          />

          {/* Subtle vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)",
            }}
          />

          {/* Green accent line — top */}
          <div className="absolute top-0 inset-x-0 h-px bg-[#4ADE80]/30" />

          {/* Wordmark — top left */}
          <div className="absolute top-7 left-8 flex items-center gap-3 pointer-events-none select-none">
            <span className="font-display text-lg tracking-[0.3em] text-white/80">
              SŌL
            </span>
            <span className="text-[9px] tracking-[0.4em] uppercase text-[#4ADE80]/80">
              Matcha
            </span>
          </div>

          {/* Scroll hint — bottom center, fades out after first beat */}
          <motion.div
            className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2 pointer-events-none select-none"
            animate={{ opacity: activeBeat?.id === "a" ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="w-px h-6 bg-white/20 origin-top"
              animate={{ scaleY: [1, 0.4, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Text beats */}
          {TEXT_BEATS.map((beat) => (
            <TextOverlay
              key={beat.id}
              beat={beat}
              visible={activeBeat?.id === beat.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
