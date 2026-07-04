"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useApp, Product } from "@/context/AppContext";
import { Heart, ShoppingBag, Star, ShieldCheck, Leaf, RotateCcw, Check, Sparkles, MessageSquare } from "lucide-react";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { products, addToCart, toggleWishlist, isInWishlist, reviews, addReview } = useApp();

  // Find product
  const product = useMemo(() => {
    return products.find((p) => p.id === id);
  }, [products, id]);

  // Review Form States
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  // Dynamic Seed-to-Bottle Process Timeline content
  const timelineSteps = useMemo(() => {
    if (!product) return [];
    
    if (product.category === "Ghee") {
      return [
        {
          title: "A2 Milk Harvesting",
          description: "Fresh milk collected from free-grazing indigenous cows (Gir & Hallikar) at sunrise.",
          icon: "🥛"
        },
        {
          title: "Traditional Bilona Churning",
          description: "Whole curd is hand-churned bi-directionally with a wooden churner to separate butter.",
          icon: "🌀"
        },
        {
          title: "Slow Fire Melting",
          description: "Pure makhan is boiled slowly over low-heat firewood stoves to extract premium golden ghee.",
          icon: "🔥"
        },
        {
          title: "Hand-Filtered Packaging",
          description: "Filtered through traditional muslin cloths and sealed in amber glass jars.",
          icon: "🏺"
        }
      ];
    } else if (product.category === "Honey") {
      return [
        {
          title: "Wild Comb Harvesting",
          description: "Harvested by indigenous forest tribes from wild hives in deep Western Ghats forests.",
          icon: "🐝"
        },
        {
          title: "Raw Mesh Straining",
          description: "Gently strained through organic cotton meshes to separate bee wax, leaving pollen intact.",
          icon: "☀️"
        },
        {
          title: "No Heating (Pasteurless)",
          description: "Kept 100% raw and unheated to preserve live enzymes and natural wellness properties.",
          icon: "🌿"
        },
        {
          title: "Sterilized Glass Sealing",
          description: "Jarred in chemical-free containers to preserve its raw organic compounds indefinitely.",
          icon: "🏺"
        }
      ];
    } else { // Oils
      return [
        {
          title: "Organic Seed Sourcing",
          description: "Sourced directly from rain-fed indigenous farms practicing multi-cropping methods.",
          icon: "🌱"
        },
        {
          title: "Cold Vaagai Wood Pressing",
          description: "Slowly crushed in a Vaagai wood press (Chekku) under 35°C to avoid thermal nutrient loss.",
          icon: "🪵"
        },
        {
          title: "Sun Sedimentation",
          description: "Settled naturally in sunlit chambers for 4 days without refining or artificial bleach.",
          icon: "🏺"
        },
        {
          title: "Glass Amber Bottling",
          description: "Packed in dark luxury amber bottles to prevent light-based oxidation and store premium oils.",
          icon: "🧴"
        }
      ];
    }
  }, [product]);

  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [addedNotify, setAddedNotify] = useState(false);

  // Filter approved reviews for this product
  const productReviews = useMemo(() => {
    return reviews.filter((r) => r.productId === id && r.status === "Approved");
  }, [reviews, id]);

  // Related products
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id && (p.category === product.category || p.isFeatured))
      .slice(0, 4);
  }, [products, product]);

  if (!product) {
    return (
      <div className="py-24 text-center bg-brand-bg text-brand-dark min-h-screen">
        <h2 className="font-serif-luxury text-2xl font-bold mb-4">Product Not Found</h2>
        <Link href="/shop" className="text-brand-orange hover:underline uppercase tracking-wider text-sm font-semibold">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id, 1);
    setAddedNotify(true);
    setTimeout(() => setAddedNotify(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product.id, 1);
    router.push("/cart");
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewAuthor.trim() && reviewComment.trim()) {
      addReview({
        productId: product.id,
        productName: product.name,
        author: reviewAuthor,
        rating: reviewRating,
        comment: reviewComment
      });
      setReviewSubmitted(true);
      setReviewAuthor("");
      setReviewComment("");
      setReviewRating(5);
      setTimeout(() => setReviewSubmitted(false), 5000);
    }
  };

  return (
    <div className="py-16 bg-brand-bg text-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs uppercase tracking-widest font-semibold text-brand-dark/50 mb-10">
          <Link href="/" className="hover:text-brand-orange transition-luxury">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-brand-orange transition-luxury">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-brand-dark/80">{product.name}</span>
        </nav>

        {/* Product Core Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          
          {/* Gallery image container */}
          <div className="relative aspect-square w-full bg-brand-cream border border-brand-dark/5 p-8 rounded-2xl flex items-center justify-center overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8"
              priority
            />
            {/* Wishlist overlay */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-6 right-6 p-3 bg-brand-bg/95 backdrop-blur-sm rounded-full shadow-md text-brand-dark/60 hover:text-brand-orange hover:scale-105 transition-luxury z-10 border border-brand-dark/5"
            >
              <Heart
                className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-brand-orange text-brand-orange" : ""}`}
              />
            </button>
          </div>

          {/* Product Details info panel */}
          <div className="space-y-6 flex flex-col justify-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">
                {product.category}
              </span>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-brand-green mt-1">
                {product.name}
              </h1>

              {/* Review Stars & Count */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-brand-gold text-brand-gold" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-brand-dark/80">
                  {product.rating} <span className="text-brand-dark/50 font-normal">({productReviews.length} Approved Reviews)</span>
                </span>
              </div>

              {/* Price display */}
              <div className="text-3xl font-bold text-brand-green mt-6">
                ₹{product.price}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm font-light text-brand-dark/80 leading-relaxed">
              {product.description}
            </p>

            {/* Stock status indicator */}
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="text-brand-dark/60">Availability:</span>
              {product.stock === 0 ? (
                <span className="text-red-700 bg-red-100/50 px-2 py-0.5 rounded">Out of Stock</span>
              ) : product.stock < 15 ? (
                <span className="text-orange-700 bg-orange-100/50 px-2 py-0.5 rounded">Low Stock ({product.stock} items remaining)</span>
              ) : (
                <span className="text-green-700 bg-green-100/50 px-2 py-0.5 rounded">In Stock</span>
              )}
            </div>

            {/* Actions: Add to cart, Buy now */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-brand-dark/5">
              <button
                disabled={product.stock === 0}
                onClick={handleAddToCart}
                className={`flex-grow flex items-center justify-center gap-2 py-4 text-sm font-bold uppercase tracking-wider rounded-full transition-luxury ${
                  product.stock === 0
                    ? "bg-brand-dark/15 text-brand-dark/45 cursor-not-allowed"
                    : addedNotify
                    ? "bg-[#4ade80] text-brand-bg shadow-md shadow-[#4ade80]/10"
                    : "bg-brand-green hover:bg-brand-green-hover text-brand-bg shadow-lg shadow-brand-green/10"
                }`}
              >
                {addedNotify ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                disabled={product.stock === 0}
                onClick={handleBuyNow}
                className={`flex-grow py-4 border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-brand-bg text-sm font-bold uppercase tracking-wider rounded-full transition-luxury ${
                  product.stock === 0 ? "border-brand-dark/10 text-brand-dark/30 cursor-not-allowed" : ""
                }`}
              >
                Buy It Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-brand-dark/5 text-center text-xs text-brand-dark/75">
              <div className="flex flex-col items-center p-3 bg-brand-cream rounded-xl">
                <Leaf className="w-5 h-5 text-brand-green mb-1.5" />
                <span className="font-semibold text-[10px] uppercase tracking-wider">100% Organic</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-brand-cream rounded-xl">
                <ShieldCheck className="w-5 h-5 text-brand-green mb-1.5" />
                <span className="font-semibold text-[10px] uppercase tracking-wider">Zero Chemical</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-brand-cream rounded-xl">
                <RotateCcw className="w-5 h-5 text-brand-green mb-1.5" />
                <span className="font-semibold text-[10px] uppercase tracking-wider">Easy Returns</span>
              </div>
            </div>

          </div>
        </div>

        {/* Benefits & Ingredients Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 bg-brand-cream border border-brand-dark/5 p-8 sm:p-12 rounded-3xl">
          <div className="space-y-4">
            <h3 className="font-serif-luxury text-xl font-bold text-brand-green flex items-center gap-2 border-b border-brand-dark/5 pb-2">
              <Sparkles className="w-5 h-5 text-brand-orange" />
              <span>Wellness Benefits</span>
            </h3>
            <ul className="text-sm text-brand-dark/85 font-light space-y-2.5 list-disc pl-5 leading-relaxed">
              {product.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif-luxury text-xl font-bold text-brand-green flex items-center gap-2 border-b border-brand-dark/5 pb-2">
              <Leaf className="w-5 h-5 text-brand-orange" />
              <span>Pure Ingredients</span>
            </h3>
            <ul className="text-sm text-brand-dark/85 font-light space-y-2.5 list-disc pl-5 leading-relaxed">
              {product.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cinematic Seed-to-Bottle Dynamic Process Timeline */}
        {timelineSteps.length > 0 && (
          <div className="mb-20 bg-white border border-[#2A211C]/10 p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-sm">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="text-center max-w-xl mx-auto mb-12 relative z-10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-orange font-bold mb-2 block">
                Pure Craftsmanship
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-brand-green">
                Traditional Seed-to-Bottle Process
              </h2>
              <p className="text-xs text-brand-dark/70 font-light mt-2 leading-relaxed">
                We craft each batch with ancestral patience. See how your {product.name.toLowerCase()} journeys from raw harvest to your kitchen.
              </p>
            </div>

            {/* Horizontal Timeline Steps wrapper */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10 mt-8">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center group">
                  {/* Step Connector Line (Only for desktop between columns) */}
                  {idx < 3 && (
                    <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] right-[calc(-50%+28px)] h-0.5 bg-brand-green/10 z-0">
                      <div className="w-0 h-full bg-brand-orange group-hover:w-full transition-all duration-700 ease-in-out" />
                    </div>
                  )}

                  {/* Icon Circle */}
                  <div className="relative w-14 h-14 bg-brand-cream border border-brand-dark/10 rounded-full flex items-center justify-center text-2xl shadow-sm z-10 transition-all duration-500 group-hover:bg-brand-green group-hover:border-brand-green group-hover:scale-110">
                    <span className="group-hover:scale-95 transition-transform block">{step.icon}</span>
                    {/* Number badge */}
                    <span className="absolute -top-1 -right-1 bg-brand-orange text-brand-bg text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-brand-bg shadow-sm">
                      {idx + 1}
                    </span>
                  </div>

                  <h4 className="font-serif-luxury text-sm font-bold text-brand-green mt-5 mb-2 group-hover:text-brand-orange transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs font-light text-brand-dark/70 px-4 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mb-20">
          <h2 className="font-serif-luxury text-2xl font-bold text-brand-green mb-8 flex items-center gap-2 border-b border-brand-dark/5 pb-3">
            <MessageSquare className="w-5 h-5 text-brand-orange" />
            <span>Customer Opinions</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Reviews Summary List */}
            <div className="lg:col-span-2 space-y-6">
              {productReviews.length === 0 ? (
                <div className="py-12 text-center bg-brand-cream rounded-2xl border border-brand-dark/5 font-light text-brand-dark/60 text-sm">
                  There are no approved reviews for this product yet. Write one below!
                </div>
              ) : (
                productReviews.map((rev) => (
                  <div key={rev.id} className="bg-brand-cream border border-brand-dark/5 p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-brand-green">{rev.author}</span>
                      <span className="text-xs text-brand-dark/50">{rev.date}</span>
                    </div>
                    {/* Stars */}
                    <div className="flex text-[#D4AF37] mb-3">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <p className="text-sm text-brand-dark/80 font-light leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Write a Review Form */}
            <div className="lg:col-span-1 bg-brand-cream border border-brand-dark/5 p-6 rounded-2xl h-fit space-y-4">
              <h4 className="font-serif-luxury text-lg font-bold text-brand-green border-b border-brand-dark/5 pb-2">
                Write a Review
              </h4>
              
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Rating</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-semibold text-[#D4AF37]"
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                    <option value={2}>★★☆☆☆ (2 Stars)</option>
                    <option value={1}>★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Comment</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Share your experience with this product..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-light"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-brand-bg text-xs font-bold uppercase tracking-widest rounded-lg transition-luxury shadow-md shadow-brand-orange/10"
                >
                  Submit Review
                </button>

                {reviewSubmitted && (
                  <p className="text-xs text-green-700 font-semibold text-center animate-logo-fade mt-2">
                    Review submitted! It will appear once approved by an Admin.
                  </p>
                )}
              </form>
            </div>

          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-serif-luxury text-2xl font-bold text-brand-green mb-8 flex items-center justify-between border-b border-brand-dark/5 pb-3">
              <span>Related Collection</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-brand-cream border border-brand-dark/5 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-brand-dark/5 transition-luxury group flex flex-col h-full"
                >
                  <div className="relative aspect-square w-full bg-brand-cream overflow-hidden">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                    />
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className="absolute top-4 right-4 p-2 bg-brand-bg/85 backdrop-blur-sm rounded-full shadow-md text-brand-dark/60 hover:text-brand-orange transition-luxury z-10"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${isInWishlist(prod.id) ? "fill-brand-orange text-brand-orange" : ""}`}
                      />
                    </button>
                  </div>
                  <div className="p-4 flex flex-col flex-grow bg-brand-bg">
                    <span className="text-[9px] uppercase tracking-widest text-brand-orange font-bold">
                      {prod.category}
                    </span>
                    <h4 className="font-serif-luxury text-sm font-bold mt-1 mb-2 group-hover:text-brand-green transition-colors">
                      <Link href={`/product/${prod.id}`}>{prod.name}</Link>
                    </h4>
                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-brand-dark/5">
                      <span className="text-sm font-bold text-brand-green">₹{prod.price}</span>
                      <button
                        onClick={() => addToCart(prod.id, 1)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-[10px] font-bold uppercase tracking-wider rounded-md transition-luxury"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
