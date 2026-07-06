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
      {/* Logo image centered pointer */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.25 : 1,
          rotate: isHovered ? -4 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className="absolute w-16 h-8 pointer-events-none select-none z-10 flex items-center justify-center bg-brand-bg/90 border border-brand-green/20 shadow-md shadow-brand-green/5 rounded-md px-1.5 py-1"
      >
        <div className="relative w-full h-full">
          <Image
            src="/logo.png"
            alt="Sreeva Cursor"
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Oval shape follow spring ring */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          borderColor: isHovered ? "#B86B2D" : "rgba(43, 76, 63, 0.25)",
          borderWidth: isHovered ? "2px" : "1px",
        }}
        className="w-20 h-11 rounded-lg border absolute transition-all duration-200"
      />
    </div>
  );
}
