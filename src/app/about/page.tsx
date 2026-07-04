"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Award, ShieldCheck, Heart, ArrowRight, Globe, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="bg-[#F7F3ED] text-[#1B1815] min-h-screen font-sans">
      
      {/* Editorial Hero Banner */}
      <section className="relative py-28 bg-[#EFE7DB] border-b border-[#1B1815]/5 overflow-hidden">
        {/* Subtle leaf shadow element background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
          <Image
            src="/luxury_hero_bg.png"
            alt="Leaf shadow texture"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#6D7553] uppercase tracking-[0.3em] text-[10px] font-bold block"
          >
            Our Legacy & Wisdom
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1.0 }}
            className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold text-[#1B1815] leading-tight max-w-4xl mx-auto"
          >
            PRESERVING INDIGENOUS LANDS, SLOW CRAFTSMANSHIP, AND PURE NUTRITION.
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-16 h-0.5 bg-[#B86B2D] mx-auto mt-6"
          />
        </div>
      </section>

      {/* Main Narrative Split Spread */}
      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-[#B86B2D] text-xs font-bold uppercase tracking-widest font-sans block">
                01 / The Genesis
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1B1815] leading-tight">
                Traditional Roots. Bottled with Uncompromising Purity.
              </h2>
            </div>
            
            <p className="text-sm font-light text-[#4A433C] leading-relaxed">
              At Sreeva Naturals, our journey began with a simple, profound realization: modern chemical processing strips crops of their molecular vitality. Grounded in the ancient agricultural wisdom of India, we set out to build a brand that bridges the gap between pure soil and your kitchen table.
            </p>
            
            <div className="border-l-2 border-[#B86B2D] pl-6 py-2 my-6 italic text-[#4A433C] text-sm font-light leading-relaxed">
              "We do not refine, chemicalize, or compromise. The aroma, taste, and therapeutic qualities of our oils are a direct testimony of the earth they originate from."
            </div>

            <p className="text-sm font-light text-[#4A433C] leading-relaxed">
              We work directly with organic farmers across pristine bio-regions of India, ensuring fair trade practices and zero pesticide use. From selecting indigenous seed varieties to cold wood-pressing and bottling in eco-friendly protective glass, every step is a tribute to raw, unadulterated nourishment.
            </p>
          </div>
          
          {/* Right Image/Graphic Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-[#1B1815]/10 shadow-xl bg-[#EFE7DB]/30 group">
              <Image
                src="/groundnut_oil.jpg"
                alt="Golden Raw Cold-pressed Oils"
                fill
                className="object-cover transition-transform duration-[6.0s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B1815]/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 text-white text-[10px] uppercase tracking-wider font-bold bg-[#1B1815]/80 backdrop-blur-sm px-4 py-2 rounded-xl">
                Batch #4 &bull; vaagai extraction
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Philosophies (Three Pillars Grid) */}
      <section className="py-20 bg-[#EFE7DB]/30 border-y border-[#1B1815]/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[#6D7553] text-[10px] font-bold uppercase tracking-[0.25em]">Guiding Tenets</span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1B1815]">Our Operational Truths</h3>
            <div className="w-8 h-0.5 bg-[#B86B2D] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Sourcing */}
            <div className="bg-[#FAF6EE] border border-[#1B1815]/5 p-8 rounded-2xl space-y-4 hover:shadow-md transition-all duration-300 group">
              <div className="p-3 bg-[#EFE7DB] text-[#B86B2D] rounded-xl inline-block transition-colors group-hover:bg-[#B86B2D] group-hover:text-white">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="font-serif-luxury text-lg font-bold text-[#1B1815]">Ethical Sourcing</h4>
              <p className="text-xs font-light text-[#4A433C] leading-relaxed">
                We trade directly with native farmers, cutting middle brokers to ensure farming communities receive equitable pricing for their organic yields.
              </p>
            </div>

            {/* Purity */}
            <div className="bg-[#FAF6EE] border border-[#1B1815]/5 p-8 rounded-2xl space-y-4 hover:shadow-md transition-all duration-300 group">
              <div className="p-3 bg-[#EFE7DB] text-[#B86B2D] rounded-xl inline-block transition-colors group-hover:bg-[#B86B2D] group-hover:text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif-luxury text-lg font-bold text-[#1B1815]">Uncompromised Purity</h4>
              <p className="text-xs font-light text-[#4A433C] leading-relaxed">
                No chemical refining, decolorizing, or artificial deodorizing. Every extraction preserves its raw native aroma, enzymes, and micro-nutrients.
              </p>
            </div>

            {/* Craft */}
            <div className="bg-[#FAF6EE] border border-[#1B1815]/5 p-8 rounded-2xl space-y-4 hover:shadow-md transition-all duration-300 group">
              <div className="p-3 bg-[#EFE7DB] text-[#B86B2D] rounded-xl inline-block transition-colors group-hover:bg-[#B86B2D] group-hover:text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif-luxury text-lg font-bold text-[#1B1815]">Slow Craftsmanship</h4>
              <p className="text-xs font-light text-[#4A433C] leading-relaxed">
                Extracted via traditional Vagai wood presses operating at slow speeds, preventing seed heating to keep healthy fatty acids intact.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* The Traditional Extraction Process Timeline */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[#6D7553] text-[10px] font-bold uppercase tracking-[0.25em]">Seed To Bottle</span>
          <h3 className="font-serif-luxury text-3xl font-bold text-[#1B1815]">The Vaagai Wood Press Process</h3>
          <p className="text-xs uppercase tracking-widest text-[#B86B2D] font-bold">Cold & Slow Extraction</p>
          <div className="w-8 h-0.5 bg-[#B86B2D] mx-auto mt-2" />
        </div>

        <div className="relative border-l border-[#1B1815]/10 ml-4 md:ml-8 space-y-12">
          
          {/* Step 1 */}
          <div className="relative pl-8 md:pl-12 group">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#B86B2D] border-4 border-[#FAF6EE] transition-transform duration-300 group-hover:scale-125" />
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-[#B86B2D] tracking-wider">Step 01 / Sun-Drying Seeds</span>
              <h4 className="font-serif-luxury text-lg font-bold text-[#1B1815]">Harvesting & Desanding</h4>
              <p className="text-xs font-light text-[#4A433C] leading-relaxed max-w-2xl">
                Organic seeds are sourced from our partnered agricultural zones, thoroughly cleared of sand/soil residues, and sun-dried naturally on wood planks to achieve the perfect low moisture content required for wood extraction.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative pl-8 md:pl-12 group">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#6D7553] border-4 border-[#FAF6EE] transition-transform duration-300 group-hover:scale-125" />
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-[#6D7553] tracking-wider">Step 02 / Vagai Churning</span>
              <h4 className="font-serif-luxury text-lg font-bold text-[#1B1815]">Slow Rotation Under 40°C</h4>
              <p className="text-xs font-light text-[#4A433C] leading-relaxed max-w-2xl">
                Dried seeds are placed in our authentic Vagai (East Indian Walnut wood) Chekku mortar. The pestle rotates at a low speed of 12-16 RPM, producing no thermal friction or extraction heat, preserving all natural aroma notes and enzymes.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative pl-8 md:pl-12 group">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#B86B2D] border-4 border-[#FAF6EE] transition-transform duration-300 group-hover:scale-125" />
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-[#B86B2D] tracking-wider">Step 03 / Cotton Mesh Filtration</span>
              <h4 className="font-serif-luxury text-lg font-bold text-[#1B1815]">Natural Sedimentation & Bottling</h4>
              <p className="text-xs font-light text-[#4A433C] leading-relaxed max-w-2xl">
                The extracted oil is kept untouched in copper vessels for 4-5 days to let seed residues settle down naturally. We then pass it through raw cotton mesh filters and seal it immediately in dark glass bottles to prevent photo-oxidation.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#B86B2D] hover:bg-[#a05a22] text-[#FDFBF7] text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg shadow-[#B86B2D]/20 cursor-pointer"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

    </div>
  );
}
