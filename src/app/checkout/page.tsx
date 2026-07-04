"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { ShieldCheck, ArrowRight, CreditCard, Landmark, QrCode, Sparkles, X, CheckCircle2 } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, products, activeCoupon, settings, placeOrder, currentUser } = useApp();

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  // Pre-fill profile details if customer is logged in
  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
      setPhone(currentUser.phone || "");
      setAddress(currentUser.address || "");
      setCity(currentUser.city || "");
      setPostalCode(currentUser.postalCode || "");
    }
  }, [currentUser]);


  // Razorpay simulation state
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [razorpayMethod, setRazorpayMethod] = useState("upi"); // upi, card
  const [simulatingPayment, setSimulatingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Cart items details
  const cartItems = useMemo(() => {
    return cart.map((item) => {
      const prod = products.find((p) => p.id === item.productId)!;
      return {
        ...prod,
        quantity: item.quantity
      };
    }).filter(Boolean);
  }, [cart, products]);

  // Financial calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  }, [cartItems]);

  const discount = useMemo(() => {
    if (!activeCoupon) return 0;
    if (activeCoupon.discountType === "percentage") {
      return Math.round(subtotal * (activeCoupon.discountValue / 100));
    }
    return activeCoupon.discountValue;
  }, [activeCoupon, subtotal]);

  const tax = useMemo(() => {
    return Math.round((subtotal - discount) * (settings.taxRate / 100));
  }, [subtotal, discount, settings.taxRate]);

  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    return (subtotal - discount) >= settings.freeShippingThreshold ? 0 : settings.shippingFee;
  }, [subtotal, discount, settings]);

  const total = useMemo(() => {
    return subtotal - discount + tax + shipping;
  }, [subtotal, discount, tax, shipping]);

  const handlePlaceOrderClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !address || !city || !postalCode) return;
    
    // Launch Razorpay Simulation Overlay
    setShowRazorpay(true);
  };

  const handleSimulatePayment = () => {
    setSimulatingPayment(true);
    
    // Simulate transaction delay
    setTimeout(() => {
      setSimulatingPayment(false);
      setPaymentSuccess(true);
      
      // Simulate success delay before completing order creation
      setTimeout(() => {
        const order = placeOrder({
          name,
          email,
          phone,
          address,
          city,
          postalCode,
          paymentMethod: `${paymentMethod} (Razorpay)`
        });
        
        // Hide overlay and redirect to Success tracking page
        setShowRazorpay(false);
        router.push(`/checkout/success/${order.id}`);
      }, 1500);

    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-24 text-center bg-brand-bg text-brand-dark min-h-screen">
        <h2 className="font-serif-luxury text-2xl font-bold mb-4">No items to checkout</h2>
        <Link href="/shop" className="text-brand-orange hover:underline uppercase tracking-wider text-sm font-semibold">
          Explore Shop
        </Link>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="py-24 max-w-md mx-auto text-center bg-brand-bg text-brand-dark min-h-screen flex flex-col justify-center items-center px-6">
        <div className="p-4 bg-brand-green/5 text-brand-green rounded-full mb-6">
          <ShieldCheck className="w-12 h-12" />
        </div>
        <h2 className="font-serif-luxury text-2xl font-bold text-brand-green mb-3">Secure Checkout Lock</h2>
        <p className="text-sm font-light text-brand-dark/70 leading-relaxed mb-8">
          We require a verified customer session to secure your harvest shipping tracks. Please sign in or register to complete your order.
        </p>
        <Link
          href="/auth?redirect=/checkout"
          className="w-full py-4 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-xs font-bold uppercase tracking-widest rounded-full transition-luxury shadow-lg shadow-brand-green/10 text-center"
        >
          Sign In / Create Account
        </Link>
        <Link href="/cart" className="text-xs uppercase tracking-wider text-brand-dark/50 hover:text-brand-orange mt-6 font-semibold transition-colors">
          Return to Shopping Cart
        </Link>
      </div>
    );
  }

  return (

    <div className="py-16 bg-brand-bg text-brand-dark min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-brand-green mb-10 border-b border-brand-dark/5 pb-4">
          Shipping & Payment
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Billing / Shipping Details Form */}
          <form onSubmit={handlePlaceOrderClick} className="lg:col-span-2 space-y-8">
            
            {/* Customer Details */}
            <div className="bg-brand-cream border border-brand-dark/5 p-8 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-serif-luxury text-lg font-bold text-brand-green border-b border-brand-dark/5 pb-3">
                1. Customer Details
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-brand-bg border border-brand-dark/15 rounded-lg text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 focus:shadow-md transition-all duration-300 text-brand-dark font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Phone Number</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="9000090000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-brand-bg border border-brand-dark/15 rounded-lg text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 focus:shadow-md transition-all duration-300 text-brand-dark font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-brand-bg border border-brand-dark/15 rounded-lg text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 focus:shadow-md transition-all duration-300 text-brand-dark font-semibold"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-brand-cream border border-brand-dark/5 p-8 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-serif-luxury text-lg font-bold text-brand-green border-b border-brand-dark/5 pb-3">
                2. Shipping Address
              </h3>
              
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="Flat No, Apartment, Street Name"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 bg-brand-bg border border-brand-dark/15 rounded-lg text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 focus:shadow-md transition-all duration-300 text-brand-dark font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">City</label>
                  <input
                    type="text"
                    required
                    placeholder="Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 bg-brand-bg border border-brand-dark/15 rounded-lg text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 focus:shadow-md transition-all duration-300 text-brand-dark font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Postal Code (PIN)</label>
                  <input
                    type="text"
                    required
                    pattern="[0-9]{6}"
                    placeholder="400001"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-4 py-2.5 bg-brand-bg border border-brand-dark/15 rounded-lg text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 focus:shadow-md transition-all duration-300 text-brand-dark font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Payment Options Selection */}
            <div className="bg-brand-cream border border-brand-dark/5 p-8 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-serif-luxury text-lg font-bold text-brand-green border-b border-brand-dark/5 pb-3">
                3. Choose Payment Method
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "UPI", name: "UPI / QR Code", icon: QrCode },
                  { id: "Card", name: "Credit / Debit Card", icon: CreditCard },
                  { id: "NetBanking", name: "Net Banking", icon: Landmark }
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-luxury ${
                      paymentMethod === item.id
                        ? "border-brand-orange bg-brand-orange/5 text-brand-orange"
                        : "border-brand-dark/10 bg-brand-bg text-brand-dark/80 hover:bg-brand-dark/5"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_type"
                      value={item.id}
                      checked={paymentMethod === item.id}
                      onChange={() => setPaymentMethod(item.id)}
                      className="sr-only"
                    />
                    <item.icon className="w-5 h-5 mb-2" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-center">{item.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4.5 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-sm font-bold uppercase tracking-widest rounded-full transition-luxury flex items-center justify-center gap-2 shadow-lg shadow-brand-green/10"
            >
              <span>Verify & Place Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Checkout Right Side Sidebar Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-brand-cream border border-brand-dark/5 p-6 rounded-2xl shadow-sm space-y-6">
              <h3 className="font-serif-luxury text-lg font-bold text-brand-green border-b border-brand-dark/5 pb-3">
                Order Review
              </h3>

              {/* Items List */}
              <div className="max-h-[250px] overflow-y-auto divide-y divide-brand-dark/5 pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-3 flex items-center gap-3">
                    <div className="relative w-12 h-12 bg-brand-bg border border-brand-dark/5 p-1 rounded flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-serif-luxury text-xs font-bold text-brand-green line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-brand-dark/65 mt-0.5">
                        {item.quantity} x ₹{item.price}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-brand-green">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="border-t border-brand-dark/5 pt-4 space-y-3.5 text-xs font-light text-brand-dark/85">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-brand-orange font-medium">
                    <span>Discount Code</span>
                    <span>- ₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>GST ({settings.taxRate}%)</span>
                  <span className="font-semibold">₹{tax}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  {shipping === 0 ? (
                    <span className="font-bold text-green-700">FREE</span>
                  ) : (
                    <span className="font-semibold">₹{shipping}</span>
                  )}
                </div>
              </div>

              {/* Order total */}
              <div className="border-t border-brand-dark/5 pt-4 flex justify-between items-end">
                <span className="font-serif-luxury text-base font-bold text-brand-green">Order Total</span>
                <span className="text-xl font-bold text-brand-green">₹{total}</span>
              </div>

              {/* Secure strip */}
              <div className="flex items-center justify-center gap-1.5 pt-2 text-[10px] text-brand-green/80 font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-brand-green" />
                <span>Secure SSL Checkouts by Razorpay</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* RAZORPAY GATEWAY SIMULATION OVERLAY MODAL */}
      {showRazorpay && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-brand-dark/65 backdrop-blur-sm p-4 animate-reveal-up">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden text-brand-dark font-sans border border-gray-200">
            
            {/* Header */}
            <div className="bg-brand-green text-brand-bg px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 bg-brand-bg rounded-full p-1 overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Sreeva Naturals"
                    fill
                    className="object-contain p-0.5"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold tracking-wider leading-none">Sreeva Naturals</h3>
                  <span className="text-[9px] uppercase tracking-widest text-brand-orange font-bold">Razorpay Secure</span>
                </div>
              </div>
              <button
                onClick={() => setShowRazorpay(false)}
                className="p-1 hover:bg-brand-green-hover rounded-full text-brand-bg/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Amount details strip */}
            <div className="bg-gray-50 border-b border-gray-150 px-6 py-4 flex items-center justify-between">
              <div className="text-xs font-semibold text-gray-500">Order Amount</div>
              <div className="text-lg font-bold text-brand-green">₹{total}.00</div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              
              {/* Payment Info / QR */}
              {paymentSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto animate-logo-fade" />
                  <h4 className="font-bold text-base text-green-700">Payment Successful</h4>
                  <p className="text-xs text-gray-500">Confirming your transaction with Sreeva...</p>
                </div>
              ) : simulatingPayment ? (
                <div className="text-center py-8 space-y-4">
                  {/* CSS loader spinner */}
                  <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm font-semibold text-gray-600">Simulating authorization gateway...</p>
                  <p className="text-xs text-gray-400">Do not refresh this screen</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Select option tabs */}
                  <div className="flex border-b border-gray-150 text-xs">
                    <button
                      onClick={() => setRazorpayMethod("upi")}
                      className={`flex-grow py-2.5 font-bold uppercase tracking-wider text-center ${
                        razorpayMethod === "upi"
                          ? "border-b-2 border-brand-green text-brand-green"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      UPI / QR Scan
                    </button>
                    <button
                      onClick={() => setRazorpayMethod("card")}
                      className={`flex-grow py-2.5 font-bold uppercase tracking-wider text-center ${
                        razorpayMethod === "card"
                          ? "border-b-2 border-brand-green text-brand-green"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      Credit Card
                    </button>
                  </div>

                  {/* UPI QR Display */}
                  {razorpayMethod === "upi" ? (
                    <div className="text-center py-3 space-y-3">
                      <div className="relative w-36 h-36 bg-gray-100 border border-gray-200 p-2 mx-auto rounded-lg flex items-center justify-center">
                        <QrCode className="w-28 h-28 text-brand-dark" />
                        <div className="absolute inset-0 bg-brand-dark/5 flex items-center justify-center rounded-lg">
                          <span className="bg-white/95 px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase border border-gray-200 rounded shadow">
                            Razorpay API Sandbox
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 font-light leading-relaxed">
                        Scan this QR with any UPI app (GPay, PhonePe, BHIM) to test transaction.
                      </p>
                    </div>
                  ) : (
                    // Card Mock Form
                    <div className="space-y-3 text-xs">
                      <div className="space-y-1">
                        <label className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Card Number</label>
                        <input
                          type="text"
                          disabled
                          value="4111 2222 3333 4444"
                          className="w-full px-3 py-2 border border-gray-200 bg-gray-55 rounded focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Expiry</label>
                          <input
                            type="text"
                            disabled
                            value="12 / 29"
                            className="w-full px-3 py-2 border border-gray-200 bg-gray-55 rounded focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">CVV</label>
                          <input
                            type="password"
                            disabled
                            value="123"
                            className="w-full px-3 py-2 border border-gray-200 bg-gray-55 rounded focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Simulator triggers */}
                  <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                    <button
                      onClick={handleSimulatePayment}
                      className="w-full py-3 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Simulate Successful Payment</span>
                    </button>
                    <button
                      onClick={() => setShowRazorpay(false)}
                      className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
                    >
                      Cancel Payment
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
