"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Ticket, Plus, Trash2, X, Sparkles } from "lucide-react";

export default function AdminCouponsPage() {
  const { coupons, addCoupon, deleteCoupon } = useApp();

  // Form states
  const [showCreate, setShowCreate] = useState(false);
  const [code, setCode] = useState("");
  const [discountValue, setDiscountValue] = useState(15);
  const [minSpend, setMinSpend] = useState(500);
  const [usageLimit, setUsageLimit] = useState(100);
  const [expiryDate, setExpiryDate] = useState("2026-12-31");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    addCoupon({
      code: code.trim().toUpperCase(),
      discountType: "percentage",
      discountValue: Number(discountValue),
      minSpend: Number(minSpend),
      expiryDate,
      usageLimit: Number(usageLimit)
    });

    setShowCreate(false);
    setCode("");
    setDiscountValue(15);
    setMinSpend(500);
    setUsageLimit(100);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif-luxury text-3xl font-bold text-brand-green">Manage Discount Coupons</h1>
          <p className="text-xs font-semibold text-brand-dark/50 uppercase tracking-widest mt-1">Discount codes and rules</p>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-xs font-bold uppercase tracking-widest rounded-lg transition-luxury shadow-md shadow-brand-green/10"
        >
          <Plus className="w-4 h-4" />
          <span>Create Coupon</span>
        </button>
      </div>

      {/* Coupons List Table */}
      <div className="bg-white border border-brand-green/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-brand-dark/5 text-brand-dark/65 font-bold uppercase tracking-wider text-[10px] bg-brand-cream/40">
                <th className="p-4">Coupon Code</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Min Spend</th>
                <th className="p-4">Usage Tracker</th>
                <th className="p-4">Expiry Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-dark/5 font-light text-brand-dark/85">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-brand-cream/20">
                  
                  {/* Code */}
                  <td className="p-4">
                    <span className="font-bold border border-brand-green/15 px-3 py-1 rounded bg-brand-cream text-brand-orange uppercase text-xs font-serif tracking-wider">
                      {c.code}
                    </span>
                  </td>

                  {/* Discount */}
                  <td className="p-4 font-bold text-brand-green text-sm">
                    {c.discountValue}% Off
                  </td>

                  {/* Min Spend */}
                  <td className="p-4 font-semibold text-brand-dark/75">
                    ₹{c.minSpend}
                  </td>

                  {/* Usage */}
                  <td className="p-4 font-semibold">
                    <span className="text-brand-green">{c.usageCount}</span>
                    <span className="text-brand-dark/45 font-normal"> / {c.usageLimit} times used</span>
                  </td>

                  {/* Expiry */}
                  <td className="p-4 font-semibold text-brand-dark/70">
                    {c.expiryDate}
                  </td>

                  {/* Action */}
                  <td className="p-4 text-right">
                    <button
                      onClick={() => deleteCoupon(c.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                      title="Delete Coupon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>

                </tr>
              ))}
              {coupons.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-brand-dark/50">No coupon codes registered.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE COUPON DIALOG MODAL */}
      {showCreate && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-brand-dark/50 backdrop-blur-sm p-4 animate-reveal-up">
          <div className="bg-brand-bg rounded-2xl max-w-md w-full border border-brand-dark/10 overflow-hidden shadow-2xl relative">
            
            {/* Close */}
            <button
              onClick={() => setShowCreate(false)}
              className="absolute top-4 right-4 p-2 bg-brand-cream/80 hover:bg-brand-orange hover:text-brand-bg text-brand-dark rounded-full transition-luxury z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="p-6 bg-brand-cream border-b border-brand-dark/5 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-orange" />
              <h2 className="font-serif-luxury text-lg font-bold text-brand-green">Create Promo Code</h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              {/* Code */}
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Promo Code Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EXTRA15"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-bold uppercase tracking-wider text-brand-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Discount */}
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Discount (%)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="100"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-semibold"
                  />
                </div>

                {/* Min Spend */}
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Min Spend (₹)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={minSpend}
                    onChange={(e) => setMinSpend(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Usage Limit */}
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Usage Limit (Times)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-semibold"
                  />
                </div>

                {/* Expiry Date */}
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Expiry Date</label>
                  <input
                    type="date"
                    required
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-semibold"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-brand-dark/5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 border border-brand-dark/10 hover:bg-brand-cream text-xs font-bold uppercase tracking-wider rounded-lg transition-luxury"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-xs font-bold uppercase tracking-wider rounded-lg transition-luxury"
                >
                  Create Code
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
