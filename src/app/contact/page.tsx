"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Mail, Phone, MapPin, CheckCircle, Send } from "lucide-react";

export default function ContactPage() {
  const { settings } = useApp();
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="bg-brand-bg text-brand-dark min-h-screen">
      
      {/* Header banner */}
      <section className="py-20 bg-brand-dark text-brand-bg text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-brand-orange uppercase tracking-[0.25em] text-xs font-semibold block mb-2">Get In Touch</span>
          <h1 className="font-serif-luxury text-4xl font-bold">
            Connect With Sreeva
          </h1>
          <div className="w-12 h-0.5 bg-brand-orange mx-auto mt-4" />
        </div>
      </section>

      {/* Grid container */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Direct contact info */}
          <div className="lg:col-span-1 bg-brand-cream border border-brand-dark/5 p-8 rounded-2xl h-fit space-y-8">
            <h3 className="font-serif-luxury text-xl font-bold text-brand-green border-b border-brand-dark/5 pb-3">
              Office & Farm Details
            </h3>

            <div className="space-y-6 text-sm font-light leading-relaxed">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-brand-green/5 text-brand-green rounded-lg flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-green uppercase tracking-wider text-[10px] mb-1">Email Inquiry</h4>
                  <p className="text-brand-dark/85">{settings.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-brand-green/5 text-brand-green rounded-lg flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-green uppercase tracking-wider text-[10px] mb-1">Phone Helpline</h4>
                  <p className="text-brand-dark/85">{settings.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-brand-green/5 text-brand-green rounded-lg flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-green uppercase tracking-wider text-[10px] mb-1">Address Details</h4>
                  <p className="text-brand-dark/85">{settings.address}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-brand-dark/5 pt-6 text-[10px] text-brand-dark/50 uppercase tracking-widest font-semibold">
              * Active support response within 24 business hours.
            </div>
          </div>

          {/* Right Column: Inquiries Form */}
          <div className="lg:col-span-2 bg-brand-cream border border-brand-dark/5 p-8 sm:p-10 rounded-2xl">
            <h3 className="font-serif-luxury text-xl font-bold text-brand-green border-b border-brand-dark/5 pb-3 mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/80">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-brand-bg border border-brand-dark/10 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/80">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="9000090000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-brand-bg border border-brand-dark/10 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/80">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-brand-bg border border-brand-dark/10 rounded-lg text-sm focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/80">Message / Inquiry</label>
                <textarea
                  required
                  rows={5}
                  placeholder="How can Sreeva help you? Let us know your feedback or question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-brand-bg border border-brand-dark/10 rounded-lg text-sm focus:outline-none focus:border-brand-green font-light"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-xs font-bold uppercase tracking-widest rounded-full transition-luxury flex items-center justify-center gap-2 shadow-lg shadow-brand-green/10"
              >
                <span>Send Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>

              {submitted && (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-4 py-3 rounded-lg text-xs font-semibold animate-logo-fade">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Your message was sent successfully! Our care team will contact you shortly.</span>
                </div>
              )}
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
