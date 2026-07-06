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
    // Generate 24 unique leaf configurations with randomized wind-drifts
    const generatedLeaves: LeafConfig[] = Array.from({ length: 24 }).map((_, i) => {
      const colors = [
        "text-brand-orange/70", 
        "text-brand-green/60", 
        "text-[#B86B2D]/75",
        "text-[#5A8272]/65"
      ];
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.floor(Math.random() * 16) + 14, // 14px to 30px size variation
        duration: Math.random() * 8 + 8, // 8s to 16s fall speed
        delay: Math.random() * -16, // Pre-distributed viewport layout delay
        opacity: Math.random() * 0.3 + 0.5, // Rich visible opacity values (0.5 to 0.8)
        rotateFrom: Math.random() * 360,
        rotateTo: Math.random() * 360 + 360,
        swingRange: Math.random() * 80 + 30, // Horizontal sway distance
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
