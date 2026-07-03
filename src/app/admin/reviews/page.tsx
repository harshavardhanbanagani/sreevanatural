"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { MessageSquare, Check, X, Trash2, Star, Award } from "lucide-react";

export default function AdminReviewsPage() {
  const { reviews, updateReviewStatus, toggleReviewFeature, deleteReview } = useApp();

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif-luxury text-3xl font-bold text-brand-green">Manage Customer Reviews</h1>
          <p className="text-xs font-semibold text-brand-dark/50 uppercase tracking-widest mt-1">Review validation and featuring</p>
        </div>
      </div>

      {/* Reviews List Table */}
      <div className="bg-white border border-brand-green/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-brand-dark/5 text-brand-dark/65 font-bold uppercase tracking-wider text-[10px] bg-brand-cream/40">
                <th className="p-4">Product Info</th>
                <th className="p-4">Author</th>
                <th className="p-4">Review content</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-dark/5 font-light text-brand-dark/85">
              {reviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-brand-cream/20">
                  
                  {/* Product */}
                  <td className="p-4">
                    <h5 className="font-serif-luxury font-bold text-brand-green">{rev.productName}</h5>
                    <span className="text-[10px] text-brand-dark/50 font-semibold">ID: {rev.productId}</span>
                  </td>

                  {/* Author */}
                  <td className="p-4 font-semibold text-brand-dark/75">{rev.author}</td>

                  {/* Rating Stars & Comment */}
                  <td className="p-4 max-w-sm space-y-1.5">
                    {/* Stars */}
                    <div className="flex text-[#D4AF37]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <p className="text-brand-dark/80 line-clamp-2 leading-relaxed">{rev.comment}</p>
                    <span className="text-[10px] text-brand-dark/45 font-semibold mt-1 block">Date: {rev.date}</span>
                  </td>

                  {/* Status Badges */}
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      rev.status === "Approved"
                        ? "bg-green-150 text-green-700"
                        : rev.status === "Rejected"
                        ? "bg-red-150 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}>
                      {rev.status}
                    </span>
                    {rev.isFeatured && (
                      <span className="block text-[8px] uppercase tracking-wider text-brand-orange font-bold mt-1.5 flex items-center gap-0.5">
                        <Award className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right space-x-1">
                    {rev.status !== "Approved" && (
                      <button
                        onClick={() => updateReviewStatus(rev.id, "Approved")}
                        className="p-1.5 text-green-700 hover:bg-green-50 rounded-lg transition-colors inline-flex items-center"
                        title="Approve Review"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    {rev.status !== "Rejected" && (
                      <button
                        onClick={() => updateReviewStatus(rev.id, "Rejected")}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                        title="Reject Review"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => toggleReviewFeature(rev.id)}
                      className={`p-1.5 rounded-lg transition-colors inline-flex items-center ${
                        rev.isFeatured ? "text-brand-orange hover:bg-brand-orange/5" : "text-brand-dark/45 hover:bg-brand-dark/5"
                      }`}
                      title={rev.isFeatured ? "Unfeature Review" : "Feature Review"}
                    >
                      <Award className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteReview(rev.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center border border-transparent"
                      title="Delete Review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>

                </tr>
              ))}
              {reviews.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-brand-dark/50">No customer reviews submitted.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
