"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Mail, Phone, MapPin, Check } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const { settings } = useApp();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-brand-dark text-brand-bg pt-20 pb-10 border-t border-brand-green/10 print:hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center">
              <div className="relative w-36 h-12 overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Sreeva Naturals"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
            <p className="text-sm text-brand-bg/75 leading-relaxed font-light">
              Crafting premium organic food products using traditional techniques, delivering the purity of nature straight to your nourishment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full border border-brand-bg/10 hover:border-brand-orange hover:text-brand-orange transition-luxury" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="p-2 rounded-full border border-brand-bg/10 hover:border-brand-orange hover:text-brand-orange transition-luxury" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h3v-9h2.72l.42-3H12V6c0-.53.47-1 1-1h1.72V1H12C9.24 1 7 3.24 7 6v2H9z"/></svg>
              </a>
              <a href="#" className="p-2 rounded-full border border-brand-bg/10 hover:border-brand-orange hover:text-brand-orange transition-luxury" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif-luxury text-lg font-bold tracking-wide mb-6 text-brand-orange">
              Explore Shop
            </h4>
            <ul className="space-y-4 text-sm text-brand-bg/85 font-light">
              <li>
                <Link href="/shop" className="hover:text-brand-orange transition-luxury">Cold Pressed Oils</Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-brand-orange transition-luxury">Bilona Ghee</Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-brand-orange transition-luxury">Wild Honey</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-orange transition-luxury">Traditional Process</Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif-luxury text-lg font-bold tracking-wide mb-6 text-brand-orange">
              Customer Support
            </h4>
            <ul className="space-y-4 text-sm text-brand-bg/85 font-light">
              <li>
                <Link href="/contact" className="hover:text-brand-orange transition-luxury">Contact Us</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-orange transition-luxury">Our Story & Farm</Link>
              </li>
              <li>
                <a href="#" className="hover:text-brand-orange transition-luxury">FAQs & Help</a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-orange transition-luxury">Shipping & Returns Policy</a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact details */}
          <div>
            <h4 className="font-serif-luxury text-lg font-bold tracking-wide mb-6 text-brand-orange">
              Newsletter
            </h4>
            <p className="text-sm text-brand-bg/75 mb-4 leading-relaxed font-light">
              Subscribe to receive updates on fresh farm harvests, traditional recipes, and wellness articles.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#3a302a] text-brand-bg placeholder-brand-bg/40 text-sm border border-brand-bg/10 rounded-lg focus:outline-none focus:border-brand-orange transition-luxury"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1.5 bg-brand-orange hover:bg-brand-orange-hover text-brand-bg text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md transition-luxury"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : "Join"}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#4ade80] animate-logo-fade font-medium">
                  Welcome to Sreeva Naturals circle!
                </p>
              )}
            </form>
          </div>
        </div>

        <hr className="border-brand-bg/10 my-8" />

        {/* Contact Info Footer Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-brand-bg/60 font-light mb-8">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-orange" />
            <span>{settings.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-brand-orange" />
            <span>{settings.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-orange" />
            <span>{settings.address}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-brand-bg/50">
          <p>© {new Date().getFullYear()} Sreeva Naturals. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-brand-orange transition-luxury">Privacy Policy</a>
            <a href="#" className="hover:text-brand-orange transition-luxury">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
