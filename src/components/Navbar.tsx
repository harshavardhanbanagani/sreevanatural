"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ShoppingBag, Heart, Menu, X, User, Settings, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const { cart, wishlist, currentUser, logoutUser } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const isAdmin = pathname?.startsWith("/admin");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop Collection", href: "/shop" },
    { name: "Our Story", href: "/about" },
    { name: "Contact Us", href: "/contact" }
  ];


  return (
    <header className="sticky top-0 z-50 w-full bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#2A211C]/5 transition-luxury print:hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative w-36 h-12 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Sreeva Naturals"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isAdmin && (
            <nav className="hidden md:flex space-x-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-luxury hover:text-brand-orange ${
                      isActive ? "text-brand-orange" : "text-brand-dark/75"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            {!isAdmin ? (
              <>
                <Link href="/wishlist" className="relative p-2 text-brand-dark/80 hover:text-brand-orange transition-luxury">
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-brand-orange rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link href="/cart" className="relative p-2 text-brand-dark/80 hover:text-brand-green transition-luxury">
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-brand-green rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Dynamic Customer / Admin account shortcut links */}
                {currentUser ? (
                  currentUser.role === "admin" ? (
                    <Link 
                      href="/admin" 
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-brand-green/20 rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-green hover:bg-brand-green hover:text-brand-bg transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Admin</span>
                    </Link>
                  ) : (
                    <Link 
                      href="/account" 
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-brand-orange/20 rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-orange hover:bg-brand-orange hover:text-brand-bg transition-colors"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">My Account</span>
                    </Link>
                  )
                ) : (
                  <Link 
                    href="/auth" 
                    title="Sign In" 
                    className="p-2 text-brand-dark/80 hover:text-brand-orange transition-luxury"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                )}
              </>

            ) : (
              <Link
                href="/"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-green text-brand-bg hover:bg-brand-green-hover transition-luxury"
              >
                <span>View Storefront</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            {/* Mobile Menu Button */}
            {!isAdmin && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-brand-dark md:hidden hover:text-brand-orange transition-luxury"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && !isAdmin && (
        <div className="md:hidden glass-panel border-t border-brand-dark/5 animate-reveal-up py-6 px-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-semibold tracking-wider uppercase py-2 border-b border-brand-dark/5 ${
                    isActive ? "text-brand-orange" : "text-brand-dark/80"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
