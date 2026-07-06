"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

interface LeafConfig {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotateFrom: number;
  rotateTo: number;
  swingRange: number;
  colorClass: string;
}

export default function FallingLeaves() {
  const [leaves, setLeaves] = useState<LeafConfig[]>([]);

  useEffect(() => {
    // Generate 9 sparse, subtle leaf configurations for a delicate backdrop breeze
    const generatedLeaves: LeafConfig[] = Array.from({ length: 9 }).map((_, i) => {
      const colors = [
        "text-brand-orange/30", 
        "text-brand-green/20", 
        "text-[#B86B2D]/25",
        "text-[#5A8272]/20"
      ];
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.floor(Math.random() * 8) + 8, // 8px to 16px delicate micro sizing
        duration: Math.random() * 10 + 10, // Slower, calmer fall speeds (10s to 20s)
        delay: Math.random() * -20, // Pre-distributed viewport layout delay
        opacity: Math.random() * 0.15 + 0.15, // Soft, ultra-subtle opacity values (0.15 to 0.3)
        rotateFrom: Math.random() * 360,
        rotateTo: Math.random() * 360 + 360,
        swingRange: Math.random() * 50 + 20, // Gentle horizontal sway
        colorClass: colors[Math.floor(Math.random() * colors.length)]
      };
    });
    setLeaves(generatedLeaves);
  }, []);

  return (
    <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none hidden md:block">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          initial={{ 
            x: 0, 
            y: "-10vh", 
            opacity: 0,
            rotate: leaf.rotateFrom
          }}
          animate={{ 
            y: "110vh",
            opacity: [0, leaf.opacity, leaf.opacity, 0],
            rotate: leaf.rotateTo,
            x: [0, leaf.swingRange, -leaf.swingRange, 0] // Organic wind sway
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: leaf.left,
            position: "absolute"
          }}
        >
          <Leaf 
            style={{ width: leaf.size, height: leaf.size }}
            className={`fill-current ${leaf.colorClass}`} 
          />
        </motion.div>
      ))}
    </div>
  );
}
