"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Award, ShieldCheck, Heart, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-brand-bg text-brand-dark min-h-screen">
      
      {/* Premium Header Banner */}
      <section className="relative py-24 bg-brand-dark text-brand-bg text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <Image
            src="/honey.jpg"
            alt="Organic Bees"
            fill
            className="object-cover filter blur-[1px]"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-brand-orange uppercase tracking-[0.25em] text-xs font-semibold block mb-3">Our Legacy</span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold mb-4">
            From Nature To Nourishment
          </h1>
          <div className="w-12 h-0.5 bg-brand-orange mx-auto mt-6" />
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-serif-luxury text-3xl font-bold text-brand-green">
              The Genesis of Sreeva
            </h2>
            <p className="text-sm font-light text-brand-dark/85 leading-relaxed">
              At Sreeva Naturals, our journey began with a simple, profound realization: modern processing strips foods of their molecular vitality. Grounded in the ancient agricultural wisdom of India, we set out to build a brand that bridges the gap between pure soil and your kitchen table.
            </p>
            <p className="text-sm font-light text-brand-dark/85 leading-relaxed">
              We work directly with organic farmers across pristine bio-regions of India, ensuring fair trade and zero pesticide use. From selecting indigenous seed varieties to bottling in eco-friendly glass, every step is a tribute to pure nourishment.
            </p>
          </div>
          <div className="relative aspect-square w-full bg-brand-cream border border-brand-dark/5 p-4 rounded-3xl overflow-hidden flex items-center justify-center">
            <Image
              src="/ghee.jpg"
              alt="Golden Ghee Churning"
              fill
              className="object-contain p-6"
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-brand-dark">
          <div className="bg-brand-cream border border-brand-dark/5 p-8 sm:p-10 rounded-2xl space-y-4">
            <span className="p-3 bg-brand-green/5 text-brand-green rounded-full inline-block">
              <Leaf className="w-6 h-6" />
            </span>
            <h3 className="font-serif-luxury text-2xl font-bold text-brand-green">Our Mission</h3>
            <p className="text-sm font-light text-brand-dark/75 leading-relaxed">
              To revive traditional, slow-extraction methods of natural foods, making pure, chemical-free nutrition accessible to modern families while empowering native farming communities.
            </p>
          </div>

          <div className="bg-brand-cream border border-brand-dark/5 p-8 sm:p-10 rounded-2xl space-y-4">
            <span className="p-3 bg-brand-green/5 text-brand-green rounded-full inline-block">
              <Award className="w-6 h-6" />
            </span>
            <h3 className="font-serif-luxury text-2xl font-bold text-brand-green">Our Vision</h3>
            <p className="text-sm font-light text-brand-dark/75 leading-relaxed">
              To establish Sreeva Naturals as a global standard for natural integrity and wellness, proving that authentic traditional methods are the ultimate foundation for sustainable modern living.
            </p>
          </div>
        </div>

        {/* Extraction Process Highlight */}
        <div className="bg-brand-cream border border-brand-dark/5 p-8 sm:p-12 rounded-3xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-brand-green">
              Ancient Wooden Pressing Philosophy
            </h3>
            <p className="text-xs uppercase tracking-widest text-brand-orange font-bold">Kachi Ghani Method</p>
            <div className="w-12 h-0.5 bg-brand-orange mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-center text-xs leading-relaxed font-light text-brand-dark/80">
            <div className="space-y-3">
              <span className="text-lg font-serif-luxury font-bold text-brand-orange block">01 / Low Heat</span>
              <p>Seeds are pressed slowly under 45°C. This avoids thermal friction that breaks down natural fatty acids, vitamins, and delicate enzymes.</p>
            </div>
            <div className="space-y-3">
              <span className="text-lg font-serif-luxury font-bold text-brand-orange block">02 / Vagai Wood Churns</span>
              <p>We use presses made from Vagai (East Indian Walnut) wood. The wood absorbs heat and imparts a subtle therapeutic essence to the oil.</p>
            </div>
            <div className="space-y-3">
              <span className="text-lg font-serif-luxury font-bold text-brand-orange block">03 / Zero Additives</span>
              <p>Unlike commercial oils refined with phosphoric acid or caustic soda, our oils settle naturally via sedimentation and are filtered using cotton mesh.</p>
            </div>
          </div>

          <div className="pt-8 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-brand-bg text-xs font-bold uppercase tracking-widest rounded-full transition-luxury shadow-lg shadow-brand-orange/10"
            >
              <span>Explore Our Range</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </section>

    </div>
  );
}
