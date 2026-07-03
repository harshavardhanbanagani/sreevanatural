"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, Ticket, X } from "lucide-react";

export default function CartPage() {
  const {
    cart,
    products,
    updateCartQuantity,
    removeFromCart,
    activeCoupon,
    applyCouponCode,
    removeCoupon,
    settings
  } = useApp();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Map cart items to products with details
  const cartItems = useMemo(() => {
    return cart.map((item) => {
      const prod = products.find((p) => p.id === item.productId)!;
      return {
        ...prod,
        quantity: item.quantity
      };
    }).filter(Boolean);
  }, [cart, products]);

  // Financial calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  }, [cartItems]);

  const discount = useMemo(() => {
    if (!activeCoupon) return 0;
    if (activeCoupon.discountType === "percentage") {
      return Math.round(subtotal * (activeCoupon.discountValue / 100));
    }
    return activeCoupon.discountValue;
  }, [activeCoupon, subtotal]);

  const tax = useMemo(() => {
    return Math.round((subtotal - discount) * (settings.taxRate / 100));
  }, [subtotal, discount, settings.taxRate]);

  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    return (subtotal - discount) >= settings.freeShippingThreshold ? 0 : settings.shippingFee;
  }, [subtotal, discount, settings]);

  const total = useMemo(() => {
    return subtotal - discount + tax + shipping;
  }, [subtotal, discount, tax, shipping]);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");
    
    if (!couponCode.trim()) return;

    const result = applyCouponCode(couponCode, subtotal);
    if (result.success) {
      setCouponSuccess(result.message);
      setCouponCode("");
    } else {
      setCouponError(result.message);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-24 bg-brand-bg text-brand-dark min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-8 h-8 text-brand-green" />
        </div>
        <h2 className="font-serif-luxury text-2xl font-bold mb-3">Your Shopping Cart is Empty</h2>
        <p className="text-sm text-brand-dark/60 font-light mb-8 max-w-sm text-center">
          Take a look at our natural extracts cold-pressed collection and nourish your kitchen.
        </p>
        <Link
          href="/shop"
          className="px-8 py-3.5 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-xs font-bold uppercase tracking-widest rounded-full transition-luxury shadow-lg shadow-brand-green/10"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 bg-brand-bg text-brand-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-brand-green mb-10 border-b border-brand-dark/5 pb-4">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Cart Table List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-brand-cream border border-brand-dark/5 rounded-2xl overflow-hidden shadow-sm">
              <div className="divide-y divide-brand-dark/5">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    
                    {/* Left: Product details */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 bg-brand-bg border border-brand-dark/5 p-2 rounded-xl flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-brand-orange font-bold">
                          {item.category}
                        </span>
                        <h4 className="font-serif-luxury text-base font-bold text-brand-green mt-0.5">
                          <Link href={`/product/${item.id}`}>{item.name}</Link>
                        </h4>
                        <span className="text-xs font-bold text-brand-dark/60 mt-1 block">
                          ₹{item.price} each
                        </span>
                      </div>
                    </div>

                    {/* Middle & Right: Quantity & Subtotals */}
                    <div className="flex items-center justify-between sm:justify-end gap-8">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-brand-dark/10 rounded-lg bg-brand-bg px-1">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:text-brand-orange transition-luxury"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:text-brand-green transition-luxury"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Subtotal */}
                      <div className="text-right">
                        <span className="text-sm font-bold text-brand-green block">
                          ₹{item.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[10px] text-red-500 hover:text-red-700 font-bold uppercase tracking-wider mt-1 inline-flex items-center gap-1 transition-luxury"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Coupon Code Input block */}
            <div className="bg-brand-cream border border-brand-dark/5 p-6 rounded-2xl shadow-sm">
              <h3 className="font-serif-luxury text-base font-bold text-brand-green mb-4 flex items-center gap-2">
                <Ticket className="w-4 h-4 text-brand-orange" />
                <span>Apply Promo Code</span>
              </h3>

              {!activeCoupon ? (
                <form onSubmit={handleApplyCoupon} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="e.g. PURE20"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError("");
                    }}
                    className="flex-grow px-4 py-2.5 bg-brand-bg text-brand-dark border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green text-sm font-semibold uppercase tracking-wider"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-xs font-bold uppercase tracking-widest rounded-lg transition-luxury"
                  >
                    Apply Coupon
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between bg-brand-green/5 border border-brand-green/20 px-4 py-3 rounded-lg text-sm">
                  <span className="font-semibold text-brand-green">
                    Active Coupon: <span className="font-bold border border-brand-green/20 px-2 py-0.5 rounded bg-brand-bg text-brand-orange">{activeCoupon.code}</span> (₹{discount} Discount)
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="p-1 text-red-500 hover:text-red-700 bg-brand-bg rounded-full shadow-sm transition-luxury"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {couponError && (
                <p className="text-xs text-red-600 font-semibold mt-2 animate-logo-fade">
                  {couponError}
                </p>
              )}
              {couponSuccess && (
                <p className="text-xs text-green-700 font-semibold mt-2 animate-logo-fade">
                  {couponSuccess}
                </p>
              )}

              <p className="text-[10px] text-brand-dark/50 mt-3 font-semibold">
                * Try coupon <span className="font-bold text-brand-orange">PURE20</span> for 20% off on spends above ₹1000!
              </p>
            </div>
          </div>

          {/* Checkout Order Summary Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-brand-cream border border-brand-dark/5 p-6 rounded-2xl shadow-sm space-y-6">
              <h3 className="font-serif-luxury text-lg font-bold text-brand-green border-b border-brand-dark/5 pb-3">
                Order Summary
              </h3>

              {/* Price Details */}
              <div className="space-y-4 text-sm font-light text-brand-dark/85">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-brand-orange font-medium">
                    <span>Coupon Discount</span>
                    <span>- ₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>GST ({settings.taxRate}%)</span>
                  <span className="font-semibold">₹{tax}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  {shipping === 0 ? (
                    <span className="font-bold text-green-700">FREE</span>
                  ) : (
                    <span className="font-semibold">₹{shipping}</span>
                  )}
                </div>

                {shipping > 0 && (
                  <div className="text-[10px] text-brand-dark/50 font-semibold">
                    * Add ₹{settings.freeShippingThreshold - (subtotal - discount)} more for Free Shipping!
                  </div>
                )}
              </div>

              <div className="border-t border-brand-dark/5 pt-6 flex justify-between items-end">
                <span className="font-serif-luxury text-lg font-bold text-brand-green">Order Total</span>
                <span className="text-2xl font-bold text-brand-green">₹{total}</span>
              </div>

              <Link
                href="/checkout"
                className="w-full py-4 bg-brand-orange hover:bg-brand-orange-hover text-brand-bg text-xs font-bold uppercase tracking-widest rounded-full transition-luxury flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/15"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="text-center pt-2">
                <Link
                  href="/shop"
                  className="text-xs uppercase tracking-widest font-bold text-brand-green/80 hover:text-brand-orange transition-luxury"
                >
                  Continue Shopping
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
