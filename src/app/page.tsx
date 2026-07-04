"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { Heart, ShoppingBag, ArrowRight, ShieldCheck, Award, Leaf, Zap, Star, Sparkles, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";




export default function Homepage() {
  const { products, addToCart, toggleWishlist, isInWishlist, reviews } = useApp();
  const [showSplash, setShowSplash] = useState(true);

  // Splash Screen auto-redirect after 600ms for premium load speed
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);




  const featuredReviews = reviews.filter((r) => r.isFeatured || r.rating === 5).slice(0, 3);
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      {/* SPLASH SCREEN */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(253,251,247,1)_0%,rgba(244,240,230,1)_100%)] text-brand-dark px-4"
          >
            {/* Logo Cinematic Zoom Reveal */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.90, opacity: 0 }}
                animate={{ scale: 1.03, opacity: 1 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                className="relative w-72 h-24 sm:w-[450px] sm:h-[150px] mx-auto flex items-center justify-center"
              >
                <Image
                  src="/logo.png"
                  alt="Sreeva Naturals"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Minimal Loading Indicator */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "160px" }}
                transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut" }}

                className="h-[1px] bg-brand-green/30 mx-auto mt-8 relative overflow-hidden"
              >
                <motion.div 
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute inset-y-0 w-1/2 bg-brand-orange"
                />
              </motion.div>
            </div>

            {/* Minimal Enter / Skip Link */}
            <button
              onClick={() => setShowSplash(false)}
              className="absolute bottom-12 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-dark/40 hover:text-brand-orange transition-colors"
            >
              Enter Storefront
            </button>


          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN HOMEPAGE CONTENT */}
      <div className="relative overflow-hidden">
        {/* SREEVA NATURALS PREMIUM WOOD-PRESSED HERO SECTION */}
        <section className="relative min-h-[90vh] lg:h-[95vh] flex items-center bg-[#F7F3ED] text-[#1B1815] overflow-hidden pt-20 pb-16 lg:py-0">
          {/* Subtle Ambient Sunlight Glow (Screen only) */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B86B2D]/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#6D7553]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Brand Narrative & Copy */}
              <div className="lg:col-span-6 space-y-8 text-left">
                
                {/* Micro Tagline */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFE7DB] border border-[#1B1815]/5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B86B2D] animate-ping" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#6D7553] font-sans">
                    Traditional Indian Heritage
                  </span>
                </motion.div>

                {/* Editorial Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 1.0 }}
                  className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight text-[#1B1815]"
                >
                  WOOD PRESSED.<br />
                  FARM DIRECT.<br />
                  <span className="text-[#B86B2D]">NATURALLY PURE.</span>
                </motion.h1>

                {/* Supporting Copy */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-sm font-light text-[#4A433C] leading-relaxed max-w-lg"
                >
                  Experience oils crafted through traditional wood-pressed extraction methods, preserving the nutrients, aroma, and goodness nature intended.
                </motion.p>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                    <Link
                      href="/shop"
                      className="w-full sm:w-auto text-center px-8 py-4 bg-[#B86B2D] hover:bg-[#a05a22] text-[#FDFBF7] text-xs font-bold uppercase tracking-widest rounded-full transition-luxury flex items-center justify-center gap-2 shadow-lg shadow-[#B86B2D]/20 cursor-pointer"
                    >
                      <span>Shop Collection</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                    <Link
                      href="/about"
                      className="w-full sm:w-auto text-center px-8 py-4 border-2 border-[#1B1815]/20 hover:bg-[#1B1815]/5 text-[#1B1815] text-xs font-bold uppercase tracking-widest rounded-full transition-luxury flex items-center justify-center cursor-pointer"
                    >
                      Discover Our Process
                    </Link>
                  </motion.div>
                </motion.div>

              </div>

              {/* Right Column: Premium Cinematic Visual */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
                  className="relative w-full max-w-[480px] aspect-square rounded-3xl overflow-hidden border border-[#1B1815]/10 shadow-2xl bg-[#EFE7DB]/40 group"
                >
                  <Image
                    src="/traditional_wood_press.png"
                    alt="Traditional Wooden Oil Press (Chekku)"
                    fill
                    className="object-cover transition-transform duration-[8.0s] ease-out group-hover:scale-105"
                    priority
                  />
                  
                  {/* Subtle Shimmer Highlight Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#F7F3ED]/10 to-transparent opacity-30 pointer-events-none mix-blend-overlay" />
                  
                  {/* Visual Framing Details */}
                  <div className="absolute bottom-6 left-6 z-10 bg-[#1B1815]/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#F7F3ED]/10 text-[#F7F3ED] text-[10px] tracking-wider uppercase">
                    <span className="font-bold text-[#B86B2D]">Batch #4</span> &bull; Vaagai Wood Chekku
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* PREMIUM TRUST CARDS SECTION */}
        <section className="py-12 bg-[#FAF6EE] border-y border-[#1B1815]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Wood Pressed */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-[#1B1815]/5 p-6 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:shadow-md hover:border-[#B86B2D]/20 group"
              >
                <div className="p-3 bg-[#EFE7DB] text-[#B86B2D] rounded-xl transition-colors group-hover:bg-[#B86B2D] group-hover:text-[#FDFBF7]">
                  <Award className="w-5 h-5 flex-shrink-0" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-sm font-bold text-[#1B1815]">Wood Pressed</h4>
                  <p className="text-xs font-light text-[#4A433C]/80 mt-1 leading-relaxed">Traditional slow extraction</p>
                </div>
              </motion.div>

              {/* Farm Direct */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="bg-white border border-[#1B1815]/5 p-6 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:shadow-md hover:border-[#B86B2D]/20 group"
              >
                <div className="p-3 bg-[#EFE7DB] text-[#B86B2D] rounded-xl transition-colors group-hover:bg-[#B86B2D] group-hover:text-[#FDFBF7]">
                  <Globe className="w-5 h-5 flex-shrink-0" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-sm font-bold text-[#1B1815]">Farm Direct</h4>
                  <p className="text-xs font-light text-[#4A433C]/80 mt-1 leading-relaxed">Sourced directly from farmers</p>
                </div>
              </motion.div>

              {/* Chemical Free */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white border border-[#1B1815]/5 p-6 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:shadow-md hover:border-[#B86B2D]/20 group"
              >
                <div className="p-3 bg-[#EFE7DB] text-[#B86B2D] rounded-xl transition-colors group-hover:bg-[#B86B2D] group-hover:text-[#FDFBF7]">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-sm font-bold text-[#1B1815]">Chemical Free</h4>
                  <p className="text-xs font-light text-[#4A433C]/80 mt-1 leading-relaxed">No industrial processing</p>
                </div>
              </motion.div>

              {/* Nutrient Rich */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-white border border-[#1B1815]/5 p-6 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:shadow-md hover:border-[#B86B2D]/20 group"
              >
                <div className="p-3 bg-[#EFE7DB] text-[#B86B2D] rounded-xl transition-colors group-hover:bg-[#B86B2D] group-hover:text-[#FDFBF7]">
                  <Leaf className="w-5 h-5 flex-shrink-0" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-sm font-bold text-[#1B1815]">Nutrient Rich</h4>
                  <p className="text-xs font-light text-[#4A433C]/80 mt-1 leading-relaxed">Retains natural goodness</p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>





        {/* WHY CHOOSE US SECTION */}
        <section className="py-24 bg-brand-bg text-brand-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-brand-green uppercase tracking-[0.25em] text-xs font-semibold block mb-2">Our Philosophy</span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-brand-green">
                Purity You Can Taste, Wellness You Can Feel
              </h2>
              <div className="w-16 h-0.5 bg-brand-orange mx-auto mt-6" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "100% Natural", icon: Leaf, desc: "Directly sourced raw ingredients without artificial processing." },
                { title: "Traditional Extraction", icon: Award, desc: "Cold wood pressing and Vedic Bilona churning retain vital health elements." },
                { title: "Zero Chemicals", icon: ShieldCheck, desc: "Strictly free from hydrogenated oils, solvents, preservatives, and colorants." },
                { title: "Farm Direct", icon: Zap, desc: "Supporting native organic farming communities directly from the soil." }
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                  className="bg-brand-cream border border-brand-dark/5 p-8 rounded-2xl hover:shadow-xl hover:shadow-brand-green/5 transition-luxury flex flex-col items-center text-center group"
                >
                  <div className="w-14 h-14 bg-brand-green/5 group-hover:bg-brand-green text-brand-green group-hover:text-brand-bg rounded-full flex items-center justify-center mb-6 transition-luxury">
                    <card.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-luxury text-xl font-bold mb-3">{card.title}</h3>
                  <p className="text-sm text-brand-dark/70 leading-relaxed font-light">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="py-24 bg-brand-cream text-brand-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16"
            >
              <div>
                <span className="text-brand-orange uppercase tracking-[0.25em] text-xs font-semibold block mb-2">Selected Range</span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-brand-green">
                  Featured Harvests
                </h2>
              </div>
              <Link
                href="/shop"
                className="mt-4 md:mt-0 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-orange hover:text-brand-orange-hover transition-luxury group"
              >
                <span>View Full Shop</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((prod, idx) => (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                  className="bg-brand-bg border border-brand-dark/5 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-brand-dark/5 transition-luxury group flex flex-col h-full"
                >
                  {/* Image container */}
                  <div className="relative aspect-square w-full bg-brand-cream overflow-hidden">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Floating Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className="absolute top-4 right-4 p-2 bg-brand-bg/85 backdrop-blur-sm rounded-full shadow-md text-brand-dark/60 hover:text-brand-orange hover:scale-105 transition-luxury"
                    >
                      <Heart
                        className={`w-4 h-4 ${isInWishlist(prod.id) ? "fill-brand-orange text-brand-orange" : ""}`}
                      />
                    </button>
                  </div>

                  {/* Body info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[10px] uppercase tracking-widest text-brand-orange font-semibold mb-2">
                      {prod.category}
                    </span>
                    <h3 className="font-serif-luxury text-lg font-bold mb-2 group-hover:text-brand-green transition-colors">
                      <Link href={`/product/${prod.id}`}>{prod.name}</Link>
                    </h3>
                    
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      <div className="flex text-[#D4AF37]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(prod.rating) ? "fill-brand-gold text-brand-gold" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-brand-dark/60">({prod.reviewsCount})</span>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-brand-dark/5">
                      <span className="text-lg font-bold text-brand-green">₹{prod.price}</span>
                      <button
                        onClick={() => addToCart(prod.id)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-xs font-semibold uppercase tracking-wider rounded-lg transition-luxury"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="py-24 bg-brand-bg text-brand-dark border-t border-brand-dark/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <span className="text-brand-orange uppercase tracking-[0.25em] text-xs font-semibold block mb-2">Extraction Method</span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-brand-green">
                Our Seed-to-Bottle Process
              </h2>
              <p className="text-sm text-brand-dark/70 leading-relaxed font-light mt-4">
                We preserve nature's vital properties through ancient Vedic cold extraction guidelines.
              </p>
            </motion.div>

            <div className="relative">
              {/* Horizontal Connector Line for Desktop */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-brand-green/10 -translate-y-1/2 z-0" />

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 relative z-10">
                {[
                  { step: "01", name: "Farm Selection", desc: "Sourcing seeds from direct organic farming communities under pristine environments." },
                  { step: "02", name: "Wood Pressing", desc: "Using slow Kachi Ghani wood churns under 45°C to avoid molecular damage." },
                  { step: "03", name: "Quality Testing", desc: "Strict laboratory audits verifying chemical composition and purity levels." },
                  { step: "04", name: "Eco Packaging", desc: "Bottling in food-safe premium amber glass containers shielding nutrients from light." },
                  { step: "05", name: "Delivery", desc: "Delivered to your home pantry with maximum freshness integrity intact." }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.12, ease: "easeOut" }}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="w-16 h-16 bg-brand-bg border-2 border-brand-green group-hover:border-brand-orange text-brand-green group-hover:text-brand-orange font-serif-luxury text-xl font-bold rounded-full flex items-center justify-center mb-6 shadow-md transition-luxury">
                      {item.step}
                    </div>
                    <h3 className="font-serif-luxury text-lg font-bold mb-2">{item.name}</h3>
                    <p className="text-xs text-brand-dark/75 leading-relaxed font-light px-2">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        {featuredReviews.length > 0 && (
          <section className="py-24 bg-brand-cream text-brand-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-3xl mx-auto mb-16"
              >
                <span className="text-brand-green uppercase tracking-[0.25em] text-xs font-semibold block mb-2">Testimonials</span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-brand-green">
                  Loved by Families Across India
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredReviews.map((rev, idx) => (
                  <motion.div
                    key={rev.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="bg-brand-bg border border-brand-dark/5 p-8 rounded-2xl relative shadow-md shadow-brand-dark/5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Rating stars */}
                      <div className="flex text-[#D4AF37] mb-6">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                        ))}
                      </div>
                      <p className="text-sm italic text-brand-dark/80 leading-relaxed font-light mb-6">
                        "{rev.comment}"
                      </p>
                    </div>
                    <div>
                      <div className="h-[1px] bg-brand-dark/5 mb-4" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-brand-green">{rev.author}</span>
                        <span className="text-[10px] text-brand-orange uppercase tracking-wider font-semibold">
                          Verified Buyer
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

      </div>
    </>
  );
}
