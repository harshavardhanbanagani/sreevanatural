"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Globe, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="bg-[#F7F3ED] text-[#1B1815] min-h-[calc(100vh-5rem)] flex flex-col justify-center py-16 font-sans relative overflow-hidden">
      
      {/* Subtle background leaf shadow */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
        <Image
          src="/luxury_hero_bg.png"
          alt="Leaf shadow texture"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Short & Sweet Header */}
        <div className="text-center space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#6D7553] uppercase tracking-[0.3em] text-[10px] font-bold block"
          >
            Sreeva Legacy
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B1815] leading-tight"
          >
            FROM NATURE TO NOURISHMENT
          </motion.h1>
          <div className="w-12 h-0.5 bg-[#B86B2D] mx-auto mt-4" />
        </div>

        {/* Unified Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Narrative Details */}
          <div className="space-y-6">
            <h3 className="font-serif-luxury text-2xl font-bold text-[#1B1815]">
              The Essence of Sreeva
            </h3>
            <p className="text-xs sm:text-sm font-light text-[#4A433C] leading-relaxed">
              At Sreeva Naturals, we preserve traditional Indian oil extraction methods. We work directly with local organic farmers, sourcing seeds that are pressed slowly inside Vaagai (East Indian Walnut) wooden Chekkus. 
            </p>
            <p className="text-xs sm:text-sm font-light text-[#4A433C] leading-relaxed">
              This traditional cold Kachi Ghani process runs under 40°C, ensuring zero thermal friction, zero chemicals, and zero additives. What you receive is pure, raw nourishment exactly as nature intended.
            </p>
            
            {/* Action Shop Button */}
            <div className="pt-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#B86B2D] hover:bg-[#a05a22] text-[#FDFBF7] text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md shadow-[#B86B2D]/10 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Interactive Core Values (Visual Side Grid) */}
          <div className="space-y-4">
            
            {/* Wood Pressed */}
            <div className="flex gap-4 p-4 bg-[#FAF6EE] border border-[#1B1815]/5 rounded-2xl">
              <div className="p-2.5 bg-[#EFE7DB] text-[#B86B2D] rounded-xl h-fit">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-sm font-bold text-[#1B1815]">Wood Pressed</h4>
                <p className="text-xs font-light text-[#4A433C] mt-0.5">Slow traditional Vaagai Chekku extraction under 40°C</p>
              </div>
            </div>

            {/* Farm Direct */}
            <div className="flex gap-4 p-4 bg-[#FAF6EE] border border-[#1B1815]/5 rounded-2xl">
              <div className="p-2.5 bg-[#EFE7DB] text-[#B86B2D] rounded-xl h-fit">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-sm font-bold text-[#1B1815]">Farm Direct</h4>
                <p className="text-xs font-light text-[#4A433C] mt-0.5">Sourced directly from native farmers, ensuring zero chemicals</p>
              </div>
            </div>

            {/* Chemical Free */}
            <div className="flex gap-4 p-4 bg-[#FAF6EE] border border-[#1B1815]/5 rounded-2xl">
              <div className="p-2.5 bg-[#EFE7DB] text-[#B86B2D] rounded-xl h-fit">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-sm font-bold text-[#1B1815]">Chemical Free</h4>
                <p className="text-xs font-light text-[#4A433C] mt-0.5">Naturally settled, mesh filtered, and completely unrefined</p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
