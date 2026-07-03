"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp, Product } from "@/context/AppContext";
import { Heart, ShoppingBag, Search, SlidersHorizontal, Star, Eye, X, Check } from "lucide-react";

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
          <div className="lg:col-span-1 bg-brand-cream border border-brand-dark/5 p-6 rounded-2xl h-fit space-y-8">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-brand-cream border border-brand-dark/5 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-brand-dark/5 transition-luxury group flex flex-col h-full"
                  >
                    {/* Image container */}
                    <div className="relative aspect-square w-full bg-brand-cream overflow-hidden">
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Floating actions */}
                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        className="absolute top-4 right-4 p-2 bg-brand-bg/85 backdrop-blur-sm rounded-full shadow-md text-brand-dark/60 hover:text-brand-orange hover:scale-105 transition-luxury z-10"
                      >
                        <Heart
                          className={`w-4 h-4 ${isInWishlist(prod.id) ? "fill-brand-orange text-brand-orange" : ""}`}
                        />
                      </button>

                      {/* Quick view hover button */}
                      <button
                        onClick={() => setQuickViewProduct(prod)}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-2 bg-brand-bg/95 hover:bg-brand-orange hover:text-brand-bg text-xs font-semibold uppercase tracking-wider rounded-lg shadow-md transition-luxury opacity-0 group-hover:opacity-100 z-10"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow bg-brand-bg">
                      <span className="text-[10px] uppercase tracking-widest text-brand-orange font-semibold mb-1">
                        {prod.category}
                      </span>
                      <h3 className="font-serif-luxury text-base font-bold mb-2 group-hover:text-brand-green transition-colors">
                        <Link href={`/product/${prod.id}`}>{prod.name}</Link>
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
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QUICK VIEW MODAL OVERLAY */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-brand-dark/50 backdrop-blur-sm p-4">
          <div className="bg-brand-bg rounded-2xl max-w-3xl w-full border border-brand-dark/10 overflow-hidden shadow-2xl relative animate-reveal-up max-h-[90vh] overflow-y-auto">
            
            {/* Close */}
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 bg-brand-cream/80 hover:bg-brand-orange hover:text-brand-bg text-brand-dark rounded-full transition-luxury z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* Product Photo */}
              <div className="relative aspect-square md:h-full bg-brand-cream p-8 flex items-center justify-center">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  width={400}
                  height={400}
                  className="object-contain max-h-[300px]"
                />
              </div>

              {/* Product Info */}
              <div className="p-8 space-y-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">
                    {quickViewProduct.category}
                  </span>
                  <h2 className="font-serif-luxury text-2xl font-bold text-brand-green mt-1">
                    {quickViewProduct.name}
                  </h2>

                  <div className="flex items-center gap-1.5 mt-2">
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
                    <span className="text-xs text-brand-dark/70 font-semibold">
                      ({quickViewProduct.reviewsCount} reviews)
                    </span>
                  </div>

                  <p className="text-sm font-light text-brand-dark/80 mt-4 leading-relaxed">
                    {quickViewProduct.description}
                  </p>

                  <div className="mt-4 space-y-1.5">
                    <p className="text-xs font-bold text-brand-green uppercase tracking-wider">Benefits:</p>
                    <ul className="text-xs text-brand-dark/75 list-disc pl-4 font-light space-y-0.5">
                      {quickViewProduct.benefits.slice(0, 2).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-dark/5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-brand-green">₹{quickViewProduct.price}</span>
                    <span className="text-xs text-brand-dark/60">
                      Stock: <span className="font-bold text-brand-dark">{quickViewProduct.stock} items</span>
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <button
                      disabled={quickViewProduct.stock === 0}
                      onClick={() => handleAddToCart(quickViewProduct.id)}
                      className={`flex-grow flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-luxury ${
                        quickViewProduct.stock === 0
                          ? "bg-brand-dark/15 text-brand-dark/45 cursor-not-allowed"
                          : "bg-brand-green hover:bg-brand-green-hover text-brand-bg"
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                    <Link
                      href={`/product/${quickViewProduct.id}`}
                      className="px-4 py-3 border border-brand-green/20 text-brand-green hover:bg-brand-cream rounded-lg text-sm font-bold uppercase tracking-wider text-center transition-luxury"
                    >
                      Details
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
