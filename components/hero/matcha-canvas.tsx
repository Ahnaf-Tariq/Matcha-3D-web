"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useSpring, motion, AnimatePresence } from "framer-motion";
import { LoadingScreen } from "./loading-screen";
import { TextOverlay } from "./text-overlay";

export interface TextBeat {
  id: string;
  start: number;
  end: number;
  eyebrow: string;
  headline: string;
  body: string;
}

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

function padFrame(n: number): string {
  return String(n).padStart(3, "0");
}

function getFrameSrc(index: number): string {
  return `${FRAME_BASE}${padFrame(index)}.jpg`;
}

export default function MatchaCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bitmapsRef = useRef<(ImageBitmap | null)[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number>(-1);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeBeat, setActiveBeat] = useState<TextBeat | null>(TEXT_BEATS[0]);

  const { scrollYProgress } = useScroll({ target: wrapperRef });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 40,
    restDelta: 0.0001,
  });

  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    const bitmaps: (ImageBitmap | null)[] = new Array(TOTAL_FRAMES).fill(null);
    bitmapsRef.current = bitmaps;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i + 1);
      img.decoding = "async";

      const onDone = async () => {
        if (img.complete && img.naturalWidth > 0) {
          try {
            bitmaps[i] = await createImageBitmap(img);
          } catch {
            bitmaps[i] = null;
          }
        }
        loaded++;
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
        if (loaded === TOTAL_FRAMES) {
          imagesRef.current = images;
          setIsLoaded(true);
        }
      };

      img.onload = onDone;
      img.onerror = () => {
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
      images.forEach((img) => {
        if (img) img.src = "";
      });
      bitmaps.forEach((bm) => {
        if (bm) bm.close();
      });
    };
  }, []);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cssW = canvas.offsetWidth;
    const cssH = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;
    const pw = cssW * dpr;
    const ph = cssH * dpr;

    if (canvas.width !== pw || canvas.height !== ph) {
      canvas.width = pw;
      canvas.height = ph;
    }

    ctx.clearRect(0, 0, pw, ph);

    const bitmap = bitmapsRef.current[frameIndex];
    const img = imagesRef.current[frameIndex];
    const source: CanvasImageSource | null =
      bitmap ?? (img?.complete ? img : null);

    if (!source) return;

    const srcW = bitmap ? bitmap.width : (img as HTMLImageElement).naturalWidth;
    const srcH = bitmap
      ? bitmap.height
      : (img as HTMLImageElement).naturalHeight;

    // Use the full source width and height to calculate the cover scale
    const scale = Math.max(pw / srcW, ph / srcH);

    const drawW = srcW * scale;
    const drawH = srcH * scale;

    const offsetX = (pw - drawW) / 2;
    const offsetY = (ph - drawH) / 2;

    ctx.drawImage(source, 0, 0, srcW, srcH, offsetX, offsetY, drawW, drawH);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ro = new ResizeObserver(() => {
      if (lastFrameRef.current >= 0) drawFrame(lastFrameRef.current);
    });

    ro.observe(canvas);
    return () => ro.disconnect();
  }, [drawFrame]);

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

  return (
    <>
      <AnimatePresence>
        {!isLoaded && <LoadingScreen progress={loadProgress} />}
      </AnimatePresence>

      <div ref={wrapperRef} className="relative h-[400vh] mt-10">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ display: "block" }}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)",
            }}
          />

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
