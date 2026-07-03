"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { Heart, Trash2, ShoppingBag, ShoppingCart } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, products, toggleWishlist, addToCart } = useApp();

  const wishlistedItems = products.filter((p) => wishlist.includes(p.id));

  const handleMoveToCart = (productId: string) => {
    addToCart(productId, 1);
    toggleWishlist(productId); // Remove from wishlist after moving
  };

  if (wishlistedItems.length === 0) {
    return (
      <div className="py-24 bg-brand-bg text-brand-dark min-h-[70vh] flex flex-col items-center justify-center animate-reveal-up">
        <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mb-6">
          <Heart className="w-8 h-8 text-brand-orange" />
        </div>
        <h2 className="font-serif-luxury text-2xl font-bold mb-3">Your Wishlist is Empty</h2>
        <p className="text-sm text-brand-dark/60 font-light mb-8 max-w-sm text-center">
          Save your favorite organic harvests and cold-pressed wellness items here.
        </p>
        <Link
          href="/shop"
          className="px-8 py-3.5 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-xs font-bold uppercase tracking-widest rounded-full transition-luxury shadow-lg shadow-brand-green/10"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 bg-brand-bg text-brand-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-brand-green mb-10 border-b border-brand-dark/5 pb-4">
          My Saved Items
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedItems.map((item) => (
            <div
              key={item.id}
              className="bg-brand-cream border border-brand-dark/5 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-brand-dark/5 transition-luxury group flex flex-col h-full"
            >
              {/* Product Photo */}
              <div className="relative aspect-square w-full bg-brand-cream overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Remove button */}
                <button
                  onClick={() => toggleWishlist(item.id)}
                  className="absolute top-4 right-4 p-2 bg-brand-bg/85 backdrop-blur-sm rounded-full shadow-md text-red-500 hover:bg-red-500 hover:text-white transition-luxury z-10"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Info & CTA Actions */}
              <div className="p-5 flex flex-col flex-grow bg-brand-bg">
                <span className="text-[10px] uppercase tracking-widest text-brand-orange font-bold">
                  {item.category}
                </span>
                <h3 className="font-serif-luxury text-base font-bold mb-2 group-hover:text-brand-green transition-colors mt-0.5">
                  <Link href={`/product/${item.id}`}>{item.name}</Link>
                </h3>
                <span className="text-base font-bold text-brand-green mb-4 block">₹{item.price}</span>

                <div className="mt-auto space-y-2 pt-4 border-t border-brand-dark/5">
                  <button
                    disabled={item.stock === 0}
                    onClick={() => handleMoveToCart(item.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-xs font-bold uppercase tracking-wider rounded-lg transition-luxury"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Move to Cart</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(item.id)}
                    className="w-full py-2 border border-brand-dark/10 hover:border-red-500 hover:text-red-500 text-[10px] font-bold uppercase tracking-wider rounded-lg text-brand-dark/60 transition-luxury"
                  >
                    Remove Item
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
