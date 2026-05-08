"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// ── Pixel Arrow SVG (black fill + green pixel outline) ────────────────────────
const PixelArrow = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: "pixelated", display: "block" }}
  >
    <path
      d="M1 0 L1 12 L4 9 L6 13 L8 12 L6 8 L10 8 Z"
      fill="#4ADE80"
      transform="translate(-0.5, -0.5) scale(1.15)"
    />
    <path d="M1 0 L1 12 L4 9 L6 13 L8 12 L6 8 L10 8 Z" fill="#000000" />
  </svg>
);

// ── Pixel Hand SVG (black fill + green pixel outline) ────────────────────────
const PixelHand = () => (
  <svg
    width="24"
    height="26"
    viewBox="0 0 14 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: "pixelated", display: "block" }}
  >
    {/* Green outline */}
    <path
      d="
        M4 0 L4 1 L3 1 L3 2 L2 2 L2 3 L2 8
        L1 8 L1 7 L0 7 L0 9 L1 9 L1 10 L2 10
        L2 11 L3 11 L3 13 L4 13 L4 14 L10 14
        L10 13 L11 13 L11 8 L10 8 L10 7 L9 7
        L9 6 L8 6 L8 5 L7 5 L7 4 L6 4 L6 3
        L5 3 L5 1 L4 1 L4 0 Z
      "
      fill="#4ADE80"
      transform="translate(-0.6, -0.6) scale(1.1)"
    />
    {/* Black fill */}
    <path
      d="
        M4 0 L4 1 L3 1 L3 2 L2 2 L2 3 L2 8
        L1 8 L1 7 L0 7 L0 9 L1 9 L1 10 L2 10
        L2 11 L3 11 L3 13 L4 13 L4 14 L10 14
        L10 13 L11 13 L11 8 L10 8 L10 7 L9 7
        L9 6 L8 6 L8 5 L7 5 L7 4 L6 4 L6 3
        L5 3 L5 1 L4 1 L4 0 Z
      "
      fill="#000000"
    />
    {/* Finger dividers (green lines) */}
    <line x1="5" y1="4" x2="5" y2="8" stroke="#4ADE80" strokeWidth="0.5" />
    <line x1="7" y1="5" x2="7" y2="8" stroke="#4ADE80" strokeWidth="0.5" />
    <line x1="9" y1="6" x2="9" y2="8" stroke="#4ADE80" strokeWidth="0.5" />
  </svg>
);

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    const attachHoverListeners = () => {
      const els = document.querySelectorAll(
        "a, button, input, textarea, select, label, [role='button']",
      );
      els.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    attachHoverListeners();

    // Re-attach when DOM changes (dynamic elements)
    observerRef.current = new MutationObserver(attachHoverListeners);
    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <motion.div
      animate={{
        x: position.x,
        y: position.y,
        scale: clicking ? 0.85 : 1,
      }}
      transition={{
        x: { type: "spring", stiffness: 800, damping: 40, mass: 0.4 },
        y: { type: "spring", stiffness: 800, damping: 40, mass: 0.4 },
        scale: { type: "spring", stiffness: 600, damping: 25 },
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999999,
        pointerEvents: "none",
        // Offset so tip of cursor is at exact mouse position
        marginLeft: hovered ? "-4px" : "-2px",
        marginTop: hovered ? "-2px" : "-2px",
        filter:
          "drop-shadow(0 0 3px #4ADE80) drop-shadow(0 0 8px rgba(74,222,128,0.4))",
      }}
    >
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        style={{ display: "block" }}
      >
        {hovered ? <PixelHand /> : <PixelArrow />}
      </motion.div>
    </motion.div>
  );
}
