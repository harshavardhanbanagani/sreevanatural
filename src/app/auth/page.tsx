"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Lock, Mail, User, ShieldCheck, ArrowRight, ArrowLeft, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  const router = useRouter();
  const { currentUser, loginUser, registerUser } = useApp();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect based on role
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/account");
      }
    }
  }, [currentUser, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    // Add artificial delay to feel premium
    setTimeout(() => {
      if (isSignUp) {
        const res = registerUser({
          name: name || "Customer",
          email,
          phone: phone || "9000000000",
          address: address || "No address provided",
          password
        });
        if (res.success) {
          setIsSignUp(false); // Switch to sign in
        }
      } else {
        const res = loginUser(email, password);
        if (res.success) {
          const target = email.toLowerCase().trim() === "admin@sreevanaturals.com" ? "/admin" : "/account";
          router.push(target);
        }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg text-brand-dark px-4 py-16">
      {/* Return Home link */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-dark/60 hover:text-brand-orange transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Shop</span>
      </Link>

      <div className="w-full max-w-md bg-white border border-[#2A211C]/15 rounded-2xl p-8 md:p-10 shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-brand-orange/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-brand-green/5 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-orange font-bold mb-2 block">
            Sreeva Naturals
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-brand-green">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-xs text-brand-dark/70 font-light mt-2 leading-relaxed">
            {isSignUp 
              ? "Join us to save wishlists, track orders, and experience farm-pure extracts." 
              : "Access your account, track deliveries, and manage your custom sandbox."}
          </p>
        </div>

        {/* Demo credentials hint */}
        {!isSignUp && (
          <div className="mb-6 p-4 bg-brand-cream border border-brand-dark/5 rounded-xl text-[11px] space-y-1 text-brand-dark/75 leading-normal">
            <p className="font-bold text-brand-green text-[10px] uppercase tracking-wider mb-1">Demo sandbox account:</p>
            <p><span className="font-semibold text-brand-green">Customer:</span> customer@test.com / <span className="font-mono">customer123</span></p>
          </div>
        )}


        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {isSignUp && (
            <>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-brand-dark/80">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/40" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-brand-bg/50 border border-brand-dark/10 rounded-xl text-sm placeholder-brand-dark/40 focus:outline-none focus:border-brand-green transition-colors"
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
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-brand-bg/50 border border-brand-dark/10 rounded-xl text-sm placeholder-brand-dark/40 focus:outline-none focus:border-brand-green transition-colors"
                  />
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
                    placeholder="Apartment, Street Name, City, Pincode"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    className="w-full pl-11 pr-4 py-3 bg-brand-bg/50 border border-brand-dark/10 rounded-xl text-sm placeholder-brand-dark/40 focus:outline-none focus:border-brand-green transition-colors resize-none"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-brand-dark/80">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/40" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-brand-bg/50 border border-brand-dark/10 rounded-xl text-sm placeholder-brand-dark/40 focus:outline-none focus:border-brand-green transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-brand-dark/80">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/40" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-brand-bg/50 border border-brand-dark/10 rounded-xl text-sm placeholder-brand-dark/40 focus:outline-none focus:border-brand-green transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-xs font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{isSignUp ? "Register" : "Sign In"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-brand-dark/5 pt-6 relative z-10">
          <p className="text-xs text-brand-dark/70 font-light">
            {isSignUp ? "Already have an account?" : "New to Sreeva Naturals?"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-1.5 text-brand-orange hover:text-brand-orange-hover font-semibold hover:underline"
            >
              {isSignUp ? "Sign In Instead" : "Create Account"}
            </button>
          </p>
        </div>

        {/* Secure badge */}
        <div className="flex items-center justify-center gap-1.5 mt-6 text-[10px] text-brand-dark/50 font-light relative z-10">
          <ShieldCheck className="w-4 h-4 text-brand-green" />
          <span>Local Sandbox Session Secure</span>
        </div>
      </div>
    </div>
  );
}
