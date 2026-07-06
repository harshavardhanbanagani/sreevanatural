"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp, Product } from "@/context/AppContext";
import { Heart, ShoppingBag, Search, SlidersHorizontal, Star, Eye, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


export default function ShopPage() {
  const { products, addToCart, toggleWishlist, isInWishlist } = useApp();
  
  // Filter & Sort States
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(2500);
  const [sortBy, setSortBy] = useState("default");
  
  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [addedNotify, setAddedNotify] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);


  // Extract categories dynamically
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, [products]);

  // Max price value calculation
  const maxAvailablePrice = useMemo(() => {
    if (products.length === 0) return 2500;
    return Math.max(...products.map((p) => p.price));
  }, [products]);

  // Handle filter logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    // Price filter
    result = result.filter((p) => p.price <= maxPrice);

    // Sort logic
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "alpha") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, search, category, maxPrice, sortBy]);

  const handleAddToCart = (productId: string) => {
    addToCart(productId, 1);
    setAddedNotify(productId);
    setTimeout(() => setAddedNotify(null), 2000);
  };

  return (
    <div className="py-12 bg-brand-bg text-brand-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Headers */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-brand-green mb-4">
            The Organic Shop
          </h1>
          <p className="text-sm text-brand-dark/70 uppercase tracking-widest font-semibold">
            Pure Wellness Extracts
          </p>
          <div className="w-12 h-0.5 bg-brand-orange mx-auto mt-4" />
        </div>

        {/* Filter controls panel */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-1 bg-brand-cream border border-brand-dark/5 p-6 rounded-2xl h-fit space-y-8">

            <div className="flex items-center gap-2 border-b border-brand-dark/5 pb-4">
              <SlidersHorizontal className="w-4 h-4 text-brand-green" />
              <h3 className="font-serif-luxury text-lg font-bold text-brand-green">Filters</h3>
            </div>

            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/80">Search Products</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Honey..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green"
                />
                <Search className="w-4 h-4 text-brand-dark/40 absolute left-3 top-3" />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/80">Category</label>
              <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-luxury ${
                      category === cat
                        ? "bg-brand-green text-brand-bg"
                        : "bg-brand-bg text-brand-dark/70 hover:bg-brand-green/5 border border-brand-dark/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/80">Max Price</label>
                <span className="text-sm font-bold text-brand-green">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="100"
                max={maxAvailablePrice}
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-green"
              />
              <div className="flex justify-between text-[10px] text-brand-dark/50 font-semibold">
                <span>₹100</span>
                <span>₹{maxAvailablePrice}</span>
              </div>
            </div>
            
            {/* Reset Button */}
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setMaxPrice(maxAvailablePrice);
                setSortBy("default");
              }}
              className="w-full py-2 text-center text-xs font-bold uppercase tracking-wider border border-brand-green/20 text-brand-green rounded-lg hover:bg-brand-green hover:text-brand-bg transition-luxury"
            >
              Reset All Filters
            </button>
          </div>

          {/* Product Grid and Sort bar */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Sort Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-brand-cream border border-brand-dark/5 p-4 rounded-xl">
              <p className="text-xs font-semibold text-brand-dark/70">
                Showing <span className="text-brand-green font-bold">{filteredProducts.length}</span> products
              </p>
              
              <div className="flex items-center gap-3">
                <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/65">Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-brand-bg border border-brand-dark/10 rounded-lg text-xs font-semibold px-3 py-1.5 focus:outline-none focus:border-brand-green"
                >
                  <option value="default">Default Sorting</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="alpha">Alphabetical (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-brand-cream rounded-2xl border border-brand-dark/5">
                <h3 className="font-serif-luxury text-xl font-bold mb-2">No Products Found</h3>
                <p className="text-sm text-brand-dark/60 font-light">Try adjusting your filters or search queries.</p>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((prod) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      key={prod.id}
                      className="bg-brand-cream border border-brand-dark/5 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-brand-dark/5 transition-luxury group flex flex-col h-full"
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
                        {/* Floating actions */}
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
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-grow bg-brand-bg">
                        <span className="text-[10px] uppercase tracking-widest text-brand-orange font-semibold mb-1">
                          {prod.category}
                        </span>
                        <h3 
                          onClick={() => setQuickViewProduct(prod)}
                          className="font-serif-luxury text-base font-bold mb-2 group-hover:text-brand-green transition-colors cursor-pointer"
                        >
                          {prod.name}
                        </h3>

                        <div className="flex items-center gap-1 mb-4">
                          <div className="flex text-[#D4AF37]">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(prod.rating) ? "fill-brand-gold text-brand-gold" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-brand-dark/60 font-semibold">({prod.reviewsCount})</span>
                        </div>

                        {/* Stock indicator */}
                        <div className="mb-4">
                          {prod.stock === 0 ? (
                            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-red-150 text-red-700 font-bold">
                              Out of Stock
                            </span>
                          ) : prod.stock < 15 ? (
                            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-orange-100 text-orange-700 font-bold">
                              Low Stock: {prod.stock} left
                            </span>
                          ) : (
                            <span className="text-[10px] uppercase tracking-wider text-green-700 font-bold">
                              In Stock
                            </span>
                          )}
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-brand-dark/5">
                          <span className="text-base font-bold text-brand-green">₹{prod.price}</span>
                          <button
                            disabled={prod.stock === 0}
                            onClick={() => handleAddToCart(prod.id)}
                            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-luxury ${
                              prod.stock === 0
                                ? "bg-brand-dark/10 text-brand-dark/45 cursor-not-allowed"
                                : addedNotify === prod.id
                                ? "bg-[#4ade80] text-brand-bg"
                                : "bg-brand-green hover:bg-brand-green-hover text-brand-bg"
                            }`}
                          >
                            {addedNotify === prod.id ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
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
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

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
                        <span className="text-xs text-brand-dark/65 font-semibold">
                          {quickViewProduct.rating} ({quickViewProduct.reviewsCount} verified reviews)
                        </span>
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

      {/* Sticky Mobile Filter Button (Screen Only) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden animate-reveal-up print:hidden">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center gap-2 bg-brand-green text-brand-bg px-6 py-3.5 rounded-full shadow-xl hover:bg-brand-green-hover text-xs font-bold uppercase tracking-widest transition-luxury cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-brand-orange" />
          <span>Filters & Sort</span>
        </button>
      </div>

      {/* MOBILE FILTERS SLIDE-UP DRAWER */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[99999] flex items-end justify-center bg-brand-dark/55 backdrop-blur-xs p-0 lg:hidden animate-fade-in">
          {/* Background dismiss click */}
          <div className="absolute inset-0" onClick={() => setShowMobileFilters(false)} />
          
          <div className="relative w-full bg-brand-bg rounded-t-3xl border-t border-brand-dark/15 shadow-2xl p-6 space-y-6 max-h-[85vh] overflow-y-auto animate-reveal-up z-10">
            {/* Drawer handle */}
            <div className="w-12 h-1 bg-brand-dark/10 rounded-full mx-auto mb-2" />
            
            <div className="flex items-center justify-between border-b border-brand-dark/5 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-green" />
                <h3 className="font-serif-luxury text-lg font-bold text-brand-green">Sort & Filter</h3>
              </div>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-1.5 bg-brand-cream hover:bg-brand-orange hover:text-brand-bg rounded-full text-brand-dark transition-luxury cursor-pointer"
                aria-label="Close filters"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Sort options inside drawer */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-wider font-bold text-brand-dark/65">Sort Arrangement</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2.5 bg-brand-cream border border-brand-dark/10 rounded-lg text-xs font-semibold focus:outline-none focus:border-brand-green text-brand-dark"
              >
                <option value="default">Default Catalog</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="alpha">A to Z</option>
              </select>
            </div>

            {/* Mobile Search */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-wider font-bold text-brand-dark/65">Search Products</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Mustard Oil..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-brand-cream border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green text-brand-dark"
                />
                <Search className="w-4 h-4 text-brand-dark/40 absolute left-3 top-3.5" />
              </div>
            </div>

            {/* Mobile Categories grid */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-wider font-bold text-brand-dark/65">Category</label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-luxury cursor-pointer ${
                      category === cat
                        ? "bg-brand-green text-brand-bg"
                        : "bg-brand-cream text-brand-dark/75 border border-brand-dark/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase tracking-wider font-bold text-brand-dark/65">Max Budget</label>
                <span className="text-sm font-bold text-brand-green">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="100"
                max={maxAvailablePrice}
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-green"
              />
              <div className="flex justify-between text-[10px] text-brand-dark/50 font-semibold">
                <span>₹100</span>
                <span>₹{maxAvailablePrice}</span>
              </div>
            </div>

            {/* Mobile Apply Actions */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-dark/5">
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setMaxPrice(maxAvailablePrice);
                  setSortBy("default");
                }}
                className="py-3 border border-brand-green/20 text-brand-green rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-cream transition-luxury cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="py-3 bg-brand-green text-brand-bg rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-green-hover transition-luxury cursor-pointer shadow-md"
              >
                Apply
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
