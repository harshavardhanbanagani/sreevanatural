"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring response physics config for outer following ring
  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on mobile/touch interfaces
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (hasTouch) return;

    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Dynamic mouseover hover detection for active/clickable targets
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.closest(".cursor-pointer") ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!mounted || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] hidden lg:block">
      {/* Custom Green Arrow Cursor image aligned to top-left tip */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-6px", // Offset slightly to align the exact visual tip of the green arrow with the coordinate hotspot
          translateY: "-6px",
        }}
        animate={{
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute w-14 h-14 pointer-events-none select-none z-10"
      >
        <div className="relative w-full h-full">
          {/* Subtle glow behind the cursor when hovering over active elements */}
          {isHovered && (
            <motion.div
              layoutId="cursorGlow"
              className="absolute inset-0 bg-brand-green/20 rounded-full filter blur-md -z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
          <Image
            src="/custom_cursor.png"
            alt="Sreeva Custom Cursor"
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Subtle organic green trailing dot for premium response feeling */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          backgroundColor: isHovered ? "#B86B2D" : "rgba(43, 76, 63, 0.25)",
        }}
        className="w-3 h-3 rounded-full absolute pointer-events-none transition-colors duration-250 blur-[0.5px]"
      />
    </div>
  );
}
