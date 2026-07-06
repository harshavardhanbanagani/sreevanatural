"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { useApp, Product } from "@/context/AppContext";
import { Heart, ShoppingBag, ArrowRight, ShieldCheck, Award, Leaf, Zap, Star, Eye, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Homepage() {
  const { products, addToCart, toggleWishlist, isInWishlist, reviews } = useApp();
  const [showSplash, setShowSplash] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [addedNotify, setAddedNotify] = useState<string | null>(null);

  const handleAddToCart = (productId: string) => {
    addToCart(productId, 1);
    setAddedNotify(productId);
    setTimeout(() => setAddedNotify(null), 2000);
  };

  // Splash Screen auto-redirect after 800ms
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);




  const featuredReviews = reviews.filter((r) => r.isFeatured || r.rating === 5).slice(0, 3);
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      {/* SPLASH SCREEN VIA PORTAL TO ABSOLUTELY COVER LAYOUT NAVBAR */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {showSplash && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
              className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(253,251,247,1)_0%,rgba(244,240,230,1)_100%)] text-brand-dark px-4"
            >
              {/* Logo Cinematic Zoom Reveal */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.90, opacity: 0 }}
                  animate={{ scale: 1.02, opacity: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
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
                  transition={{ delay: 0.1, duration: 0.6, ease: "easeInOut" }}
                  className="h-[1px] bg-brand-green/30 mx-auto mt-8 relative overflow-hidden"
                >
                  <motion.div 
                    initial={{ left: "-100%" }}
                    animate={{ left: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    className="absolute inset-y-0 w-1/2 bg-brand-orange"
                  />
                </motion.div>
              </div>

              {/* Minimal Enter / Skip Link */}
              <button
                onClick={() => setShowSplash(false)}
                className="absolute bottom-12 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-dark/40 hover:text-brand-orange transition-colors cursor-pointer"
              >
                Enter Storefront
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* MAIN HOMEPAGE CONTENT */}
      <div className="relative overflow-hidden">
        {/* HERO SECTION */}
        <section className="relative h-[92vh] flex items-center bg-brand-dark text-brand-bg overflow-hidden">
          {/* Farm Background Image with professional cinematic grading and camera glide */}
          <div className="absolute inset-0 z-0">
            <motion.div
              initial={{ scale: 1.16, x: "-3%", y: "-1.5%", opacity: 0 }}
              animate={{ scale: 1.05, x: "0%", y: "0%", opacity: 0.94 }}
              transition={{ duration: 7.0, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {/* Widescreen Landscape Image (Desktop) */}
              <Image
                src="/hero_bg.jpg"
                alt="Sreeva Organic Farms"
                fill
                className="hidden sm:block object-cover object-center brightness-[0.85] contrast-[1.08] saturate-[1.12]"
                priority
              />
              {/* Portrait Image (Mobile) */}
              <Image
                src="/hero_mobile.jpg"
                alt="Sreeva Organic Farms Mobile"
                fill
                className="block sm:hidden object-cover object-center brightness-[0.85] contrast-[1.08] saturate-[1.12]"
                priority
              />
            </motion.div>

            {/* Cinematic Golden Hour Sunlight Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(242,120,75,0.18)_0%,rgba(0,0,0,0)_60%)] z-10 pointer-events-none mix-blend-screen" />
            
            {/* Soft Edge Film Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_50%,rgba(0,0,0,0.45)_100%)] z-10 pointer-events-none mix-blend-multiply" />
            
            {/* Subtle left gradient overlay just for typography readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/25 to-transparent z-10 pointer-events-none" />

          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl text-left flex flex-col items-start">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex items-center gap-2 text-brand-orange uppercase tracking-[0.3em] text-[10px] sm:text-[11px] font-bold mb-4"
              >
                <Leaf className="w-3.5 h-3.5 animate-pulse text-brand-orange" />
                <span>100% Farm Direct & Wood-Pressed</span>
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.0 }}
                className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-wide mb-6"
              >
                Pure Tradition.<br />
                <span className="italic text-brand-orange relative inline-block">
                  Bottled
                  <span className="absolute bottom-1.5 left-0 w-full h-[3px] bg-brand-orange/30 rounded-full" />
                </span> For Modern Life.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-xs sm:text-sm font-light text-brand-bg/85 leading-relaxed mb-8"
              >
                Handcrafted wellness extracts from native soil. Sourced directly from our organic farms and extracted using traditional wood-pressing methods to preserve molecular purity and natural health-giving enzymes.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              >
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/shop"
                    className="w-full sm:w-auto text-center px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-brand-bg text-xs font-bold uppercase tracking-widest rounded-full transition-luxury flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/25"
                  >
                    <span>Shop Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/about"
                    className="w-full sm:w-auto text-center px-8 py-4 border border-brand-bg/30 hover:bg-brand-bg hover:text-brand-dark text-xs font-bold uppercase tracking-widest rounded-full transition-luxury flex items-center justify-center"
                  >
                    Our Story
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Inverted Organic Curve (Subtle & Flattened) */}
          <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
            <svg
              viewBox="0 0 1440 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto min-h-[45px] text-brand-bg fill-current translate-y-[2px]"
              preserveAspectRatio="none"
            >
              <path d="M0,96 Q720,72 1440,96 L1440,100 L0,100 Z"></path>
            </svg>
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
                  <div 
                    onClick={() => setQuickViewProduct(prod)}
                    className="relative aspect-square w-full bg-brand-cream overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Floating Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod.id);
                      }}
                      className="absolute top-4 right-4 p-2 bg-brand-bg/85 backdrop-blur-sm rounded-full shadow-md text-brand-dark/60 hover:text-brand-orange hover:scale-105 transition-luxury z-10"
                    >
                      <Heart
                        className={`w-4 h-4 ${isInWishlist(prod.id) ? "fill-brand-orange text-brand-orange" : ""}`}
                      />
                    </button>

                    {/* Quick view hover indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-2 bg-brand-bg/95 text-brand-dark hover:bg-brand-orange hover:text-brand-bg text-xs font-semibold uppercase tracking-wider rounded-lg shadow-md transition-luxury opacity-0 group-hover:opacity-100 z-10">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </div>
                  </div>

                  {/* Body info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[10px] uppercase tracking-widest text-brand-orange font-semibold mb-2">
                      {prod.category}
                    </span>
                    <h3 
                      onClick={() => setQuickViewProduct(prod)}
                      className="font-serif-luxury text-lg font-bold mb-2 group-hover:text-brand-green transition-colors cursor-pointer"
                    >
                      {prod.name}
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
                        onClick={() => handleAddToCart(prod.id)}
                        className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-luxury ${
                          addedNotify === prod.id
                            ? "bg-[#4ade80] text-brand-bg"
                            : "bg-brand-green hover:bg-brand-green-hover text-brand-bg"
                        }`}
                      >
                        {addedNotify === prod.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 animate-bounce" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
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
        {/* QUICK VIEW MODAL OVERLAY */}
        <AnimatePresence>
          {quickViewProduct && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setQuickViewProduct(null)}
                className="absolute inset-0 bg-brand-dark/50 backdrop-blur-sm"
              />
              
              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="bg-brand-bg rounded-2xl max-w-3xl w-full border border-brand-dark/10 overflow-hidden shadow-2xl relative max-h-[95vh] overflow-y-auto z-10"
              >
                {/* Close button */}
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-4 right-4 p-2 bg-brand-cream/80 hover:bg-brand-orange hover:text-brand-bg text-brand-dark rounded-full transition-all duration-300 z-10 cursor-pointer shadow-sm"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  
                  {/* Product Photo panel */}
                  <div className="relative aspect-square md:aspect-auto md:min-h-[420px] bg-gradient-to-br from-[#FAF6EE] to-[#F3EFE9] p-10 flex items-center justify-center overflow-hidden group">
                    {/* Floating Category Badge */}
                    <span className="absolute top-6 left-6 z-10 bg-brand-green text-brand-bg text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                      {quickViewProduct.category === "Oils" ? "🪵 Cold Pressed" : quickViewProduct.category === "Ghee" ? "🥛 Traditional A2" : "🍯 Raw Wild"}
                    </span>
                    
                    <div className="relative w-64 h-64 sm:w-72 sm:h-72 transition-transform duration-700 ease-out group-hover:scale-105">
                      <Image
                        src={quickViewProduct.image}
                        alt={quickViewProduct.name}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                  {/* Product Info panel */}
                  <div className="p-8 sm:p-10 space-y-6 flex flex-col justify-between bg-white text-brand-dark">
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-brand-orange font-bold">
                          {quickViewProduct.category} Collection
                        </span>
                        <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-brand-green mt-1">
                          {quickViewProduct.name}
                        </h2>

                        {/* Rating details */}
                        <div className="flex items-center gap-2 mt-2.5">
                          <div className="flex text-[#D4AF37]">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < Math.floor(quickViewProduct.rating) ? "fill-brand-gold text-brand-gold" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-brand-dark/60">({quickViewProduct.reviewsCount})</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs font-light text-brand-dark/80 leading-relaxed">
                        {quickViewProduct.description}
                      </p>

                      {/* Benefits Tag chips */}
                      <div className="space-y-2 pt-2">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-brand-dark/65 block">Key Benefits:</span>
                        <div className="flex flex-wrap gap-2">
                          {quickViewProduct.benefits.slice(0, 3).map((b, i) => (
                            <span key={i} className="text-[10px] font-medium text-brand-green bg-brand-green/5 border border-brand-green/10 px-3 py-1 rounded-full">
                              ✓ {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Pricing & Add to Cart */}
                    <div className="pt-6 border-t border-brand-dark/5 space-y-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-brand-dark/50 block">Harvest Price</span>
                          <span className="text-3xl font-bold text-brand-green">₹{quickViewProduct.price}</span>
                        </div>
                        <div className="text-right text-xs text-brand-dark/65">
                          <span>Inventory: </span>
                          {quickViewProduct.stock > 0 ? (
                            <span className="text-green-700 font-bold uppercase text-[10px]">{quickViewProduct.stock} Available</span>
                          ) : (
                            <span className="text-red-700 font-bold uppercase text-[10px]">Sold Out</span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          disabled={quickViewProduct.stock === 0}
                          onClick={() => handleAddToCart(quickViewProduct.id)}
                          className={`flex-grow flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md ${
                            quickViewProduct.stock === 0
                              ? "bg-brand-dark/15 text-brand-dark/45 cursor-not-allowed shadow-none"
                              : addedNotify === quickViewProduct.id
                              ? "bg-[#4ade80] text-brand-bg shadow-[#4ade80]/10"
                              : "bg-brand-green hover:bg-brand-green-hover text-brand-bg hover:shadow-lg hover:shadow-brand-green/15 cursor-pointer"
                          }`}
                        >
                          {addedNotify === quickViewProduct.id ? (
                            <>
                              <Check className="w-4 h-4 animate-bounce" />
                              <span>Added to Cart</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-4 h-4" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                        <Link
                          href={`/product/${quickViewProduct.id}`}
                          className="px-6 py-3.5 border border-brand-green/20 text-brand-green hover:bg-brand-cream rounded-xl text-xs font-bold uppercase tracking-widest text-center transition-colors shadow-sm"
                        >
                          Details
                        </Link>
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
