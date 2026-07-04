"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { Mail, Phone, MapPin, CheckCircle2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const { settings } = useApp();
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setTimeout(() => setSubmitted(false), 5000);
      }, 1200);
    }
  };

  return (
    <div className="bg-[#F7F3ED] text-[#1B1815] min-h-[calc(100vh-5rem)] flex items-center py-12 lg:py-0 font-sans relative overflow-hidden">
      
      {/* Subtle leaf shadow backdrop */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
        <Image
          src="/luxury_hero_bg.png"
          alt="Leaf shadow texture"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Brand Letterhead & Contact Info */}
          <div className="lg:col-span-5 space-y-10 text-left">
            <div className="space-y-4">
              <span className="text-[#6D7553] uppercase tracking-[0.3em] text-[10px] font-bold block">
                Get in Touch
              </span>
              <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-[#1B1815] leading-tight">
                LET'S START A<br />
                <span className="text-[#B86B2D]">CONVERSATION.</span>
              </h1>
              <div className="w-16 h-0.5 bg-[#B86B2D] mt-6" />
              <p className="text-xs font-light text-[#4A433C] leading-relaxed max-w-sm pt-2">
                Connect with Sreeva Naturals client desks for order updates, partnerships, bulk inquiries, or direct farm logistics.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-6">
              
              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-[#EFE7DB]/30 border border-[#1B1815]/5 rounded-2xl hover:border-[#B86B2D]/20 transition-all duration-300 group">
                <div className="p-2.5 bg-[#EFE7DB] text-[#B86B2D] rounded-xl transition-colors group-hover:bg-[#B86B2D] group-hover:text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#6D7553] uppercase tracking-wider text-[9px] mb-0.5">Email Support</h4>
                  <p className="text-xs font-semibold text-[#1B1815]">{settings.email}</p>
                  <p className="text-[9px] text-[#4A433C]/60 mt-0.5">Assistance response in 12h</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-4 bg-[#EFE7DB]/30 border border-[#1B1815]/5 rounded-2xl hover:border-[#B86B2D]/20 transition-all duration-300 group">
                <div className="p-2.5 bg-[#EFE7DB] text-[#B86B2D] rounded-xl transition-colors group-hover:bg-[#B86B2D] group-hover:text-white">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#6D7553] uppercase tracking-wider text-[9px] mb-0.5">Direct Hotline</h4>
                  <p className="text-xs font-semibold text-[#1B1815]">{settings.phone}</p>
                  <p className="text-[9px] text-[#4A433C]/60 mt-0.5">Mon - Sat, 9 AM - 6 PM IST</p>
                </div>
              </div>

              {/* Coordinates / Map Address */}
              <div className="flex items-start gap-4 p-4 bg-[#EFE7DB]/30 border border-[#1B1815]/5 rounded-2xl hover:border-[#B86B2D]/20 transition-all duration-300 group">
                <div className="p-2.5 bg-[#EFE7DB] text-[#B86B2D] rounded-xl transition-colors group-hover:bg-[#B86B2D] group-hover:text-white">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#6D7553] uppercase tracking-wider text-[9px] mb-0.5">HQ Coordinates</h4>
                  <p className="text-xs font-semibold text-[#1B1815]">{settings.address}</p>
                  <p className="text-[9px] font-mono text-[#B86B2D] mt-1 tracking-wider">13.0827° N, 80.2707° E</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Inquiries Form Panel */}
          <div className="lg:col-span-7 bg-[#FAF6EE] border border-[#1B1815]/5 p-8 sm:p-10 rounded-3xl shadow-sm relative z-20">
            <h3 className="font-serif-luxury text-2xl font-bold text-[#1B1815] mb-6">
              Send an Inquiry
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[#6D7553]">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full py-2 bg-transparent border-b border-[#1B1815]/10 text-xs focus:outline-none focus:border-[#B86B2D] transition-colors placeholder-[#1B1815]/20 font-light"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[#6D7553]">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full py-2 bg-transparent border-b border-[#1B1815]/10 text-xs focus:outline-none focus:border-[#B86B2D] transition-colors placeholder-[#1B1815]/20 font-light"
                  />
                </div>

              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#6D7553]">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 bg-transparent border-b border-[#1B1815]/10 text-xs focus:outline-none focus:border-[#B86B2D] transition-colors placeholder-[#1B1815]/20 font-light"
                />
              </div>

              {/* Message / Inquiry */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#6D7553]">Your Message</label>
                <textarea
                  required
                  rows={3}
                  placeholder="How can Sreeva help you? Tell us about your request..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full py-2 bg-transparent border-b border-[#1B1815]/10 text-xs focus:outline-none focus:border-[#B86B2D] transition-colors placeholder-[#1B1815]/20 font-light resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center gap-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 bg-[#B86B2D] hover:bg-[#a05a22] text-[#FDFBF7] text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#B86B2D]/20 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-[#FDFBF7] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3 h-3" />
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-green-700 text-xs font-semibold"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Thank you! We will reply shortly.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </form>
          </div>

        </div>
      </div>

    </div>
  );
}
