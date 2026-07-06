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
    // Generate 18 unique leaf configurations with randomized wind-drifts
    const generatedLeaves: LeafConfig[] = Array.from({ length: 18 }).map((_, i) => {
      const colors = [
        "text-brand-orange/35", 
        "text-brand-green/25", 
        "text-[#FAF6EE]/30",
        "text-[#B86B2D]/40"
      ];
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.floor(Math.random() * 14) + 12, // 12px to 26px size variation
        duration: Math.random() * 8 + 8, // 8s to 16s fall speed
        delay: Math.random() * -16, // Negative delay so leaves are pre-distributed across the viewport instantly on mount
        opacity: Math.random() * 0.35 + 0.15,
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
