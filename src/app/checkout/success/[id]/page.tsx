"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { CheckCircle2, Package, Truck, Home, Calendar, Printer, ShoppingBag } from "lucide-react";

export default function OrderSuccessPage() {
  const params = useParams();
  const id = params?.id as string;
  const { orders, settings } = useApp();

  const order = useMemo(() => {
    return orders.find((o) => o.id === id);
  }, [orders, id]);

  if (!order) {
    return (
      <div className="py-24 text-center bg-brand-bg text-brand-dark min-h-screen">
        <h2 className="font-serif-luxury text-2xl font-bold mb-4">Order Not Found</h2>
        <Link href="/shop" className="text-brand-orange hover:underline uppercase tracking-wider text-sm font-semibold">
          Back to Shop
        </Link>
      </div>
    );
  }

  // Delivery estimation (e.g. 5 days from order date)
  const deliveryEstimate = useMemo(() => {
    const d = new Date(order.date.split(" ")[0]);
    d.setDate(d.getDate() + 5);
    return d.toLocaleDateString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }, [order.date]);

  // Determine timeline indexes
  const timelineStages = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered"];
  const currentStageIdx = timelineStages.indexOf(order.status);
  const isCancelled = order.status === "Cancelled";

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="py-16 bg-brand-bg text-brand-dark min-h-screen print:p-0 print:m-0 print:min-h-0 print:bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 print-invoice-container">


        
        {/* Print-only Invoice Header */}
        <div className="hidden print:flex justify-between items-center border-b-2 border-brand-green pb-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="relative w-28 h-10 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Sreeva Naturals Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-brand-green">SREEVA NATURALS</h1>
              <p className="text-[10px] uppercase tracking-widest text-brand-orange font-semibold">From Nature To Nourishment</p>
            </div>
          </div>
          <div className="text-right text-xs text-brand-dark/70">
            <p className="font-bold text-brand-green">INVOICE</p>
            <p>Order ID: {order.id}</p>
            <p>Date: {order.date}</p>
          </div>
        </div>


        {/* Screen-only Success Header */}
        <div className="text-center space-y-4 mb-12 print:hidden">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto animate-logo-fade" />
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-brand-green">
            Thank You for Your Order!
          </h1>
          <p className="text-sm font-light text-brand-dark/75">
            Your purchase supports traditional wood-press extractions and indigenous farming communities.
          </p>
          <div className="inline-block bg-brand-cream border border-brand-dark/5 px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider">
            Order Reference: <span className="text-brand-orange font-bold">{order.id}</span>
          </div>
        </div>

        {/* Dynamic Timeline Tracker (Screen only) */}
        {!isCancelled && (
          <div className="bg-brand-cream border border-brand-dark/5 p-8 rounded-3xl mb-12 print:hidden">
            <h3 className="font-serif-luxury text-lg font-bold text-brand-green mb-8 flex items-center gap-2">
              <Truck className="w-5 h-5 text-brand-orange" />
              <span>Track Your Package</span>
            </h3>

            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-2">
              {/* Connector Bar */}
              <div className="hidden md:block absolute top-6 left-8 right-8 h-1 bg-gray-200 z-0">
                <div
                  className="h-full bg-brand-green transition-all duration-1000"
                  style={{ width: `${(currentStageIdx / (timelineStages.length - 1)) * 100}%` }}
                />
              </div>

              {timelineStages.map((stage, idx) => {
                const isActive = idx <= currentStageIdx;
                const isCurrent = idx === currentStageIdx;
                
                return (
                  <div key={stage} className="flex md:flex-col items-center gap-4 md:gap-2 relative z-10 md:w-32 text-center group">
                    {/* Circle Icon */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-sm transition-luxury ${
                        isCurrent
                          ? "bg-brand-orange border-brand-orange text-brand-bg scale-110 ring-4 ring-brand-orange/15"
                          : isActive
                          ? "bg-brand-green border-brand-green text-brand-bg"
                          : "bg-white border-gray-250 text-gray-400"
                      }`}
                    >
                      {idx === 0 && <Package className="w-5 h-5" />}
                      {idx === 1 && <CheckCircle2 className="w-5 h-5" />}
                      {idx === 2 && <Package className="w-5 h-5" />}
                      {idx === 3 && <Truck className="w-5 h-5" />}
                      {idx === 4 && <Home className="w-5 h-5" />}
                    </div>

                    <div>
                      <p className={`text-xs uppercase tracking-wider font-bold ${isActive ? "text-brand-green" : "text-gray-400"}`}>
                        {stage}
                      </p>
                      {isCurrent && (
                        <span className="text-[10px] text-brand-orange font-semibold block uppercase">Active Status</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 border-t border-brand-dark/5 pt-6 flex items-center gap-2 text-xs font-semibold text-brand-dark/80">
              <Calendar className="w-4 h-4 text-brand-orange" />
              <span>Estimated Delivery: <span className="text-brand-green font-bold">{deliveryEstimate}</span></span>
            </div>
          </div>
        )}

        {isCancelled && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl mb-12 text-center print:hidden">
            <h3 className="text-lg font-bold text-red-700">Order Cancelled</h3>
            <p className="text-xs text-red-500 font-light mt-1">This order was cancelled by the store administrator.</p>
          </div>
        )}

        {/* Invoice Grid Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Shipping Address */}
          <div className="bg-brand-cream border border-brand-dark/5 p-6 rounded-2xl">
            <h4 className="font-serif-luxury text-sm font-bold uppercase tracking-wider text-brand-green border-b border-brand-dark/5 pb-2 mb-3">
              Shipping Destination
            </h4>
            <div className="text-xs space-y-1 font-light leading-relaxed">
              <p className="font-bold text-brand-green">{order.customerName}</p>
              <p className="text-brand-dark/85">{order.address}</p>
              <p className="text-brand-dark/85">{order.city} - {order.postalCode}</p>
              <p className="text-brand-dark/70 mt-3">Phone: {order.customerPhone}</p>
              <p className="text-brand-dark/70">Email: {order.customerEmail}</p>
            </div>
          </div>

          {/* Payment & Invoice meta */}
          <div className="bg-brand-cream border border-brand-dark/5 p-6 rounded-2xl">
            <h4 className="font-serif-luxury text-sm font-bold uppercase tracking-wider text-brand-green border-b border-brand-dark/5 pb-2 mb-3">
              Payment & Invoice Details
            </h4>
            <div className="text-xs space-y-2 font-light">
              <div className="flex justify-between">
                <span className="text-brand-dark/65">Order Date</span>
                <span className="font-semibold">{order.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-dark/65">Payment Method</span>
                <span className="font-semibold">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-dark/65">Payment Status</span>
                <span className="text-green-700 font-bold uppercase tracking-wider text-[10px]">Paid</span>
              </div>
              {order.couponCode && (
                <div className="flex justify-between text-brand-orange">
                  <span>Promo Code Applied</span>
                  <span className="font-bold">{order.couponCode}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Invoice Summary Items Table */}
        <div className="bg-brand-cream border border-brand-dark/5 rounded-2xl overflow-hidden mb-10">
          <div className="p-4 bg-brand-green text-brand-bg text-[10px] uppercase tracking-wider font-semibold grid grid-cols-12 gap-4">
            <span className="col-span-6">Harvest Item</span>
            <span className="col-span-2 text-center">Unit Price</span>
            <span className="col-span-2 text-center">Qty</span>
            <span className="col-span-2 text-right">Subtotal</span>
          </div>

          <div className="divide-y divide-brand-dark/5 p-4 space-y-4">
            {order.items.map((item) => (
              <div key={item.productId} className="grid grid-cols-12 gap-4 items-center text-xs font-light py-2">
                <div className="col-span-6 flex items-center gap-3">
                  <div className="relative w-10 h-10 bg-brand-bg border border-brand-dark/5 p-0.5 rounded flex-shrink-0 print:hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h5 className="font-serif-luxury font-bold text-brand-green">{item.name}</h5>
                  </div>
                </div>
                <span className="col-span-2 text-center">₹{item.price}</span>
                <span className="col-span-2 text-center font-bold">{item.quantity}</span>
                <span className="col-span-2 text-right font-bold text-brand-green">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="p-6 bg-brand-cream border-t border-brand-dark/5 space-y-3 text-xs text-brand-dark/85 font-light">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold">₹{order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-brand-orange font-medium">
                <span>Discount Code</span>
                <span>- ₹{order.discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>GST ({settings.taxRate}%)</span>
              <span className="font-semibold">₹{order.tax}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping & Handling</span>
              <span>{order.shipping === 0 ? "FREE" : `₹${order.shipping}`}</span>
            </div>
            <div className="flex justify-between items-end border-t border-brand-dark/5 pt-3 text-sm font-bold text-brand-green">
              <span className="font-serif-luxury text-base">Grand Total Paid</span>
              <span className="text-lg">₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions (Screen only) */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 border-t border-brand-dark/5 print:hidden">
          <button
            onClick={handlePrintInvoice}
            className="w-full sm:w-auto px-6 py-3 border border-brand-green/20 text-brand-green hover:bg-brand-cream rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-luxury"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>

          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-3.5 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-xs font-bold uppercase tracking-widest rounded-full text-center transition-luxury flex items-center justify-center gap-1.5 shadow-lg shadow-brand-green/10"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Return to Shop</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
