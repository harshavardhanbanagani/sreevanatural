"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp, Order } from "@/context/AppContext";
import { User, LogOut, Package, Heart, Settings, Calendar, MapPin, Phone, Mail, ShoppingBag, Eye, Printer } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AccountDashboard() {
  const router = useRouter();
  const { currentUser, logoutUser, orders, wishlist, products, addToCart, toggleWishlist, updateUserProfile } = useApp();
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "wishlist" | "settings">("overview");

  // Profile forms
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Route Lock
  useEffect(() => {
    if (!currentUser) {
      router.push("/auth");
    } else {
      setName(currentUser.name);
      setPhone(currentUser.phone);
      setAddress(currentUser.address);
      setCity(currentUser.city || "");
      setPostalCode(currentUser.postalCode || "");
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  // Filter orders matching logged-in user email
  const customerOrders = orders.filter(
    (o) => o.customerEmail.toLowerCase().trim() === currentUser.email.toLowerCase().trim()
  );

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, phone, address, city, postalCode });
  };

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  const handleBuyAgain = (items: { productId: string; name: string; price: number; quantity: number; image: string }[]) => {
    items.forEach((item) => {
      addToCart(item.productId, item.quantity);
    });
    router.push("/cart");
  };


  // Resolve products in wishlist
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-brand-dark/5 pb-8 mb-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange block mb-1">
              Customer Account Panel
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-brand-green">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-xs text-brand-dark/60 font-light mt-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>{currentUser.email}</span>
              <span className="text-brand-dark/20">•</span>
              <span className="bg-brand-cream border border-brand-dark/5 px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] text-brand-orange tracking-wider">
                {currentUser.role} Account
              </span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-3 border border-brand-orange/20 text-brand-orange hover:bg-brand-orange hover:text-brand-bg text-xs font-bold uppercase tracking-widest rounded-full transition-luxury cursor-pointer self-start md:self-auto shadow-md shadow-brand-orange/5"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Side Tabs Navigation */}
          <aside className="lg:col-span-1 space-y-2">
            {[
              { id: "overview", name: "Dashboard Overview", icon: User },
              { id: "orders", name: `My Orders (${customerOrders.length})`, icon: Package },
              { id: "wishlist", name: `Wishlist (${wishlistProducts.length})`, icon: Heart },
              { id: "settings", name: "Account Details", icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-luxury text-left border ${
                    isActive
                      ? "bg-brand-green border-brand-green text-brand-bg shadow-lg shadow-brand-green/10"
                      : "bg-white border-[#2A211C]/10 text-brand-dark/75 hover:bg-brand-cream hover:text-brand-green"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </aside>

          {/* Tab Display Area */}
          <main className="lg:col-span-3">
            
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-8 animate-reveal-up">
                
                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white border border-[#2A211C]/10 p-6 rounded-2xl shadow-sm relative overflow-hidden">
                    <Package className="absolute right-4 top-4 w-12 h-12 text-brand-green/5" />
                    <span className="text-[10px] font-bold text-brand-dark/45 uppercase tracking-wider block mb-1">Total Purchases</span>
                    <h3 className="font-serif-luxury text-3xl font-bold text-brand-green">{customerOrders.length}</h3>
                    <p className="text-[10px] text-brand-dark/65 font-light mt-2">Orders processed in sandbox.</p>
                  </div>
                  <div className="bg-white border border-[#2A211C]/10 p-6 rounded-2xl shadow-sm relative overflow-hidden">
                    <Heart className="absolute right-4 top-4 w-12 h-12 text-brand-orange/5" />
                    <span className="text-[10px] font-bold text-brand-dark/45 uppercase tracking-wider block mb-1">Wishlist Saves</span>
                    <h3 className="font-serif-luxury text-3xl font-bold text-brand-orange">{wishlistProducts.length}</h3>
                    <p className="text-[10px] text-brand-dark/65 font-light mt-2">Harvests saved for later.</p>
                  </div>
                  <div className="bg-white border border-[#2A211C]/10 p-6 rounded-2xl shadow-sm relative overflow-hidden">
                    <MapPin className="absolute right-4 top-4 w-12 h-12 text-brand-green/5" />
                    <span className="text-[10px] font-bold text-brand-dark/45 uppercase tracking-wider block mb-1">Default City</span>
                    <h3 className="font-serif-luxury text-lg font-bold text-brand-green truncate mt-1.5">{currentUser.city || "Not Set"}</h3>
                    <p className="text-[10px] text-brand-dark/65 font-light mt-2">Delivery hub location.</p>
                  </div>
                </div>

                {/* Profile Overview Card */}
                <div className="bg-white border border-[#2A211C]/10 p-8 rounded-2xl shadow-sm">
                  <h3 className="font-serif-luxury text-lg font-bold text-brand-green border-b border-brand-dark/5 pb-3 mb-6">
                    Primary Profile Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-light text-brand-dark/80">
                    <div className="space-y-3">
                      <p className="flex items-center gap-2"><User className="w-4 h-4 text-brand-orange" /> <span className="font-bold text-brand-dark">{currentUser.name}</span></p>
                      <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-brand-orange" /> <span>{currentUser.phone}</span></p>
                      <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-brand-orange" /> <span>{currentUser.email}</span></p>
                    </div>
                    <div className="space-y-3">
                      <p className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span>{currentUser.address || "No address saved. Click 'Account Details' to set up."}</span>
                      </p>
                      {currentUser.postalCode && (
                        <p className="pl-6"><span className="font-bold">Postal Code:</span> {currentUser.postalCode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="space-y-6 animate-reveal-up">
                <div className="bg-white border border-[#2A211C]/10 p-8 rounded-2xl shadow-sm">
                  <h3 className="font-serif-luxury text-lg font-bold text-brand-green border-b border-brand-dark/5 pb-3 mb-6">
                    Purchase Order History
                  </h3>

                  {customerOrders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 text-brand-dark/15 mx-auto mb-4" />
                      <h4 className="font-serif-luxury text-base font-semibold text-brand-dark/75 mb-2">No orders placed yet</h4>
                      <p className="text-xs text-brand-dark/50 font-light mb-6">Browse our organic extracts collection to place your first mock purchase!</p>
                      <Link href="/shop" className="px-6 py-3 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-[10px] font-bold uppercase tracking-widest rounded-full transition-luxury">
                        Explore Collection
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {customerOrders.map((order) => (
                        <div key={order.id} className="border border-brand-dark/10 rounded-2xl overflow-hidden bg-brand-bg/10">
                          
                          {/* Order Header Summary */}
                          <div className="bg-brand-cream border-b border-brand-dark/5 p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-light">
                            <div className="grid grid-cols-2 sm:flex sm:items-center gap-x-6 gap-y-2">
                              <div>
                                <span className="text-[9px] uppercase tracking-wider text-brand-dark/55 block">Order ID</span>
                                <span className="font-bold text-brand-green">{order.id}</span>
                              </div>
                              <div>
                                <span className="text-[9px] uppercase tracking-wider text-brand-dark/55 block">Purchase Date</span>
                                <span className="font-semibold">{order.date}</span>
                              </div>
                              <div>
                                <span className="text-[9px] uppercase tracking-wider text-brand-dark/55 block">Total Paid</span>
                                <span className="font-bold text-brand-green">₹{order.total}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                                order.status === "Delivered" ? "bg-green-100 text-green-700" :
                                order.status === "Cancelled" ? "bg-red-100 text-red-700" : "bg-brand-orange/10 text-brand-orange"
                              }`}>
                                {order.status}
                              </span>
                              <Link 
                                href={`/checkout/success/${order.id}`}
                                className="flex items-center gap-1 p-2 border border-brand-green/10 text-brand-green hover:bg-brand-cream transition-colors rounded-lg text-[10px] font-bold uppercase tracking-wider"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Details</span>
                              </Link>
                              {order.status !== "Cancelled" && (
                                <button
                                  onClick={() => handleBuyAgain(order.items)}
                                  className="flex items-center gap-1.5 p-2 bg-brand-green hover:bg-brand-green-hover text-brand-bg transition-colors rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer shadow-xs"
                                >
                                  <ShoppingBag className="w-3.5 h-3.5" />
                                  <span>Buy Again</span>
                                </button>
                              )}
                            </div>

                          </div>

                          {/* Order items listing */}
                          <div className="p-4 sm:p-5 divide-y divide-brand-dark/5">
                            {order.items.map((item) => (
                              <div key={item.productId} className="flex items-center justify-between py-3 first:pt-0 last:pb-0 text-xs">
                                <div className="flex items-center gap-3">
                                  <div className="relative w-10 h-10 border border-brand-dark/5 rounded p-0.5 bg-white">
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      fill
                                      className="object-contain"
                                    />
                                  </div>
                                  <div>
                                    <h5 className="font-serif-luxury font-bold text-brand-green text-sm">{item.name}</h5>
                                    <p className="text-[10px] text-brand-dark/50 font-light mt-0.5">Quantity: {item.quantity} × ₹{item.price}</p>
                                  </div>
                                </div>
                                <span className="font-bold text-brand-green">₹{item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === "wishlist" && (
              <div className="space-y-6 animate-reveal-up">
                <div className="bg-white border border-[#2A211C]/10 p-8 rounded-2xl shadow-sm">
                  <h3 className="font-serif-luxury text-lg font-bold text-brand-green border-b border-brand-dark/5 pb-3 mb-6">
                    My Saved Wishlist
                  </h3>

                  {wishlistProducts.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="w-12 h-12 text-brand-dark/15 mx-auto mb-4" />
                      <h4 className="font-serif-luxury text-base font-semibold text-brand-dark/75 mb-2">Your wishlist is empty</h4>
                      <p className="text-xs text-brand-dark/50 font-light mb-6">Heart your favorite organic items across the shop to save them here.</p>
                      <Link href="/shop" className="px-6 py-3 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-[10px] font-bold uppercase tracking-widest rounded-full transition-luxury">
                        Explore Products
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {wishlistProducts.map((product) => (
                        <div key={product.id} className="border border-brand-dark/10 rounded-2xl p-4 bg-brand-bg/5 flex flex-col justify-between h-full">
                          <div className="flex gap-4">
                            <div className="relative w-16 h-16 border border-brand-dark/5 rounded p-1 bg-white flex-shrink-0">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-serif-luxury font-bold text-brand-green text-sm">{product.name}</h4>
                              <p className="text-brand-orange font-bold text-xs">₹{product.price}</p>
                              <p className="text-[10px] text-brand-dark/50 font-light line-clamp-1">{product.category}</p>
                            </div>
                          </div>

                          <div className="flex gap-2.5 mt-4 pt-3 border-t border-brand-dark/5">
                            <button
                              onClick={() => toggleWishlist(product.id)}
                              className="p-2 border border-red-200 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                              title="Remove from wishlist"
                            >
                              <Heart className="w-4 h-4 fill-current" />
                            </button>
                            <button
                              onClick={() => addToCart(product.id, 1)}
                              disabled={product.stock <= 0}
                              className="flex-grow py-2 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-[10px] font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1 shadow-md shadow-brand-green/5 cursor-pointer disabled:opacity-50"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>{product.stock > 0 ? "Add to Cart" : "Out of Stock"}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === "settings" && (
              <div className="space-y-6 animate-reveal-up">
                <div className="bg-white border border-[#2A211C]/10 p-8 rounded-2xl shadow-sm">
                  <h3 className="font-serif-luxury text-lg font-bold text-brand-green border-b border-brand-dark/5 pb-3 mb-6">
                    Edit Account Profile Details
                  </h3>

                  <form onSubmit={handleUpdateProfile} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-brand-dark/80">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/40" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-brand-bg/40 border border-brand-dark/10 rounded-xl text-sm focus:outline-none focus:border-brand-green transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-brand-dark/80">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/40" />
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-brand-bg/40 border border-brand-dark/10 rounded-xl text-sm focus:outline-none focus:border-brand-green transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-brand-dark/80">
                        Delivery Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-brand-dark/40" />
                        <textarea
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          rows={3}
                          className="w-full pl-11 pr-4 py-3 bg-brand-bg/40 border border-brand-dark/10 rounded-xl text-sm focus:outline-none focus:border-brand-green transition-colors resize-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-brand-dark/80">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-4 py-3 bg-brand-bg/40 border border-brand-dark/10 rounded-xl text-sm focus:outline-none focus:border-brand-green transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-brand-dark/80">
                          Postal Pin Code
                        </label>
                        <input
                          type="text"
                          required
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="w-full px-4 py-3 bg-brand-bg/40 border border-brand-dark/10 rounded-xl text-sm focus:outline-none focus:border-brand-green transition-colors"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3.5 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer shadow-md shadow-brand-green/5"
                    >
                      Save Profile Changes
                    </button>
                  </form>
                </div>
              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
}
