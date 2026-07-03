"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Settings, Save, RefreshCw, CheckCircle } from "lucide-react";

export default function AdminSettingsPage() {
  const { settings, updateSettings, resetAllData } = useApp();

  // Settings fields
  const [storeName, setStoreName] = useState(settings.storeName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [email, setEmail] = useState(settings.email);
  const [phone, setPhone] = useState(settings.phone);
  const [address, setAddress] = useState(settings.address);
  const [taxRate, setTaxRate] = useState(settings.taxRate);
  const [shippingFee, setShippingFee] = useState(settings.shippingFee);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(settings.freeShippingThreshold);

  // Status triggers
  const [saved, setSaved] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      storeName,
      tagline,
      email,
      phone,
      address,
      taxRate: Number(taxRate),
      shippingFee: Number(shippingFee),
      freeShippingThreshold: Number(freeShippingThreshold)
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResetData = () => {
    if (window.confirm("Are you absolutely sure you want to reset all store data? This will revert products, reviews, coupons, and orders to their default seed values.")) {
      resetAllData();
      setResetDone(true);
      setTimeout(() => {
        setResetDone(false);
        window.location.reload(); // reload to re-read seeds
      }, 1500);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif-luxury text-3xl font-bold text-brand-green">Store Settings</h1>
          <p className="text-xs font-semibold text-brand-dark/50 uppercase tracking-widest mt-1">Configure metadata and checkout constants</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Settings form panel */}
        <div className="lg:col-span-2 bg-white border border-brand-green/10 p-8 rounded-2xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Store Information */}
            <div className="space-y-4">
              <h3 className="font-serif-luxury text-base font-bold text-brand-green border-b border-brand-dark/5 pb-2">
                Brand Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/80">Store Name</label>
                  <input
                    type="text"
                    required
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/80">Store Tagline</label>
                  <input
                    type="text"
                    required
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-light"
                  />
                </div>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-4 pt-4">
              <h3 className="font-serif-luxury text-base font-bold text-brand-green border-b border-brand-dark/5 pb-2">
                Store Helpline & Address
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/80">Helpline Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/80">Helpline Phone</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/80">Physical Headquarters Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-light"
                />
              </div>
            </div>

            {/* Logistics constants */}
            <div className="space-y-4 pt-4">
              <h3 className="font-serif-luxury text-base font-bold text-brand-green border-b border-brand-dark/5 pb-2">
                Checkout Calculations Constants
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/80">Tax Rate (GST %)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-semibold text-brand-green"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/80">Shipping Fee (₹)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={shippingFee}
                    onChange={(e) => setShippingFee(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/80">Free Shipping Limit (₹)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={freeShippingThreshold}
                    onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Save trigger */}
            <div className="pt-6 border-t border-brand-dark/5 flex items-center justify-between">
              {saved ? (
                <div className="flex items-center gap-1.5 text-green-700 bg-green-50 px-3 py-1.5 rounded-lg text-xs font-semibold animate-logo-fade">
                  <CheckCircle className="w-4 h-4" />
                  <span>Settings Saved Successfully!</span>
                </div>
              ) : (
                <div />
              )}
              <button
                type="submit"
                className="px-6 py-3 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-xs font-bold uppercase tracking-widest rounded-lg flex items-center gap-1.5 transition-luxury shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Save Store Config</span>
              </button>
            </div>

          </form>
        </div>

        {/* Database reset section */}
        <div className="lg:col-span-1 bg-white border border-red-200 p-6 rounded-2xl shadow-sm h-fit space-y-4">
          <h3 className="font-serif-luxury text-base font-bold text-red-700 border-b border-red-100 pb-2 flex items-center gap-2">
            <RefreshCw className="w-4.5 h-4.5" />
            <span>Danger Zone Reset</span>
          </h3>
          <p className="text-xs text-brand-dark/70 leading-relaxed font-light">
            If you want to clear out your testing orders, custom products, or mock reviews and reload the initial luxury seeds, use the reset trigger below.
          </p>

          <button
            onClick={handleResetData}
            className="w-full py-3 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold uppercase tracking-wider rounded-lg transition-luxury flex items-center justify-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${resetDone ? "animate-spin" : ""}`} />
            <span>Reset Console Data</span>
          </button>
          
          {resetDone && (
            <p className="text-[10px] text-red-500 font-semibold text-center animate-logo-fade">
              Store reset completed. Reloading console...
            </p>
          )}
        </div>

      </div>

    </div>
  );
}
