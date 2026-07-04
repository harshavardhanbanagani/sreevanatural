"use client";

import React, { useState } from "react";
import { useApp, Order } from "@/context/AppContext";
import { ListOrdered, Eye, Calendar, User, Printer, X, FileText } from "lucide-react";
import Image from "next/image";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, settings } = useApp();

  // Invoice modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handlePrintSelectedInvoice = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      
      {/* Wrapper to completely hide list view on paper print */}
      <div className="space-y-8 print:hidden">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif-luxury text-3xl font-bold text-brand-green">Manage Customer Orders</h1>
            <p className="text-xs font-semibold text-brand-dark/50 uppercase tracking-widest mt-1">Order tracking and status updates</p>
          </div>
        </div>

        {/* Orders List Table */}
        <div className="bg-white border border-brand-green/10 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-brand-dark/5 text-brand-dark/65 font-bold uppercase tracking-wider text-[10px] bg-brand-cream/40">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Paid Total</th>
                  <th className="p-4">Status Dispatch</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-dark/5 font-light text-brand-dark/85">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-brand-cream/20">
                    
                    {/* ID */}
                    <td className="p-4 font-bold text-brand-green text-sm">{ord.id}</td>

                    {/* Customer */}
                    <td className="p-4 space-y-1">
                      <p className="font-bold text-brand-green">{ord.customerName}</p>
                      <p className="text-[10px] text-brand-dark/60 font-semibold">{ord.customerEmail}</p>
                      <p className="text-[10px] text-brand-dark/60 font-semibold">{ord.customerPhone}</p>
                    </td>

                    {/* Date */}
                    <td className="p-4 font-semibold text-brand-dark/70">{ord.date}</td>

                    {/* Amount */}
                    <td className="p-4 font-bold text-brand-green text-sm">₹{ord.total}</td>

                    {/* Status Dropdown selector */}
                    <td className="p-4">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as Order["status"])}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1.5 rounded-lg border focus:outline-none ${
                          ord.status === "Delivered"
                            ? "bg-green-50 border-green-200 text-green-700"
                            : ord.status === "Cancelled"
                            ? "bg-red-50 border-red-200 text-red-700"
                            : ord.status === "Shipped"
                            ? "bg-blue-50 border-blue-200 text-blue-700"
                            : "bg-orange-50 border-orange-250 text-orange-700"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* View invoice action */}
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-brand-green/20 text-brand-green hover:bg-brand-green hover:text-brand-bg rounded-lg font-semibold uppercase tracking-wider text-[10px] ml-auto transition-luxury"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Invoice</span>
                      </button>
                    </td>

                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-brand-dark/50">No customer orders recorded.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FULL INVOICE VIEW MODAL */}

      {selectedOrder && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-brand-dark/50 backdrop-blur-sm p-4 animate-reveal-up print:absolute print:inset-0 print:bg-white print:p-0">
          <div className="bg-brand-bg rounded-2xl max-w-2xl w-full border border-brand-dark/10 overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto print:border-none print:shadow-none print:max-h-none print:overflow-visible print-invoice-container">
            
            {/* Close (Screen only) */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-2 bg-brand-cream/80 hover:bg-brand-orange hover:text-brand-bg text-brand-dark rounded-full transition-luxury z-10 print:hidden"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Print Header banner (Screen only) */}
            <div className="p-6 bg-brand-cream border-b border-brand-dark/5 flex items-center justify-between print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-orange" />
                <h2 className="font-serif-luxury text-lg font-bold text-brand-green">
                  Order Invoice: {selectedOrder.id}
                </h2>
              </div>
              <button
                onClick={handlePrintSelectedInvoice}
                className="flex items-center gap-1.5 px-4 py-2 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-xs font-bold uppercase tracking-wider rounded-lg transition-luxury mr-8"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>

            {/* Print-only Invoice Header */}
            <div className="hidden print:flex justify-between items-center border-b-2 border-brand-green p-8 mb-6 bg-white">
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
                <p>Order ID: {selectedOrder.id}</p>
                <p>Date: {selectedOrder.date}</p>
              </div>
            </div>


            {/* Invoice Body Content */}
            <div className="p-8 space-y-6 bg-white">
              
              <div className="grid grid-cols-2 gap-6 text-xs font-light leading-relaxed">
                <div>
                  <h4 className="font-serif-luxury font-bold text-brand-green text-sm uppercase tracking-wide border-b border-brand-dark/5 pb-1 mb-2">
                    Shipping Details
                  </h4>
                  <p className="font-bold text-brand-green">{selectedOrder.customerName}</p>
                  <p>{selectedOrder.address}</p>
                  <p>{selectedOrder.city} - {selectedOrder.postalCode}</p>
                  <p className="mt-2 font-semibold">Phone: {selectedOrder.customerPhone}</p>
                </div>
                <div>
                  <h4 className="font-serif-luxury font-bold text-brand-green text-sm uppercase tracking-wide border-b border-brand-dark/5 pb-1 mb-2">
                    Order Information
                  </h4>
                  <p><span className="font-semibold">Invoice Date:</span> {selectedOrder.date}</p>
                  <p><span className="font-semibold">Payment Option:</span> {selectedOrder.paymentMethod}</p>
                  <p><span className="font-semibold">Status:</span> <span className="font-bold uppercase text-[9px]">{selectedOrder.status}</span></p>
                </div>
              </div>

              {/* Items List Table */}
              <div className="border border-brand-dark/5 rounded-xl overflow-hidden mt-6">
                <div className="p-3 bg-brand-green text-brand-bg text-[9px] uppercase tracking-wider font-semibold grid grid-cols-12 gap-3">
                  <span className="col-span-8">Product Name</span>
                  <span className="col-span-2 text-center">Qty</span>
                  <span className="col-span-2 text-right">Subtotal</span>
                </div>
                <div className="divide-y divide-brand-dark/5 p-3 space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.productId} className="grid grid-cols-12 gap-3 items-center text-xs font-light py-1">
                      <span className="col-span-8 font-serif-luxury font-bold text-brand-green">{item.name}</span>
                      <span className="col-span-2 text-center font-bold">{item.quantity}</span>
                      <span className="col-span-2 text-right font-bold text-brand-green">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-brand-cream border-t border-brand-dark/5 space-y-2.5 text-xs text-brand-dark/85 font-light">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span>₹{selectedOrder.subtotal}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-brand-orange font-medium">
                      <span>Discount</span>
                      <span>- ₹{selectedOrder.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>GST ({settings.taxRate}%)</span>
                    <span>₹{selectedOrder.tax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span>{selectedOrder.shipping === 0 ? "FREE" : `₹${selectedOrder.shipping}`}</span>
                  </div>
                  <div className="flex justify-between items-end border-t border-brand-dark/5 pt-2 text-sm font-bold text-brand-green">
                    <span className="font-serif-luxury text-sm">Grand Total</span>
                    <span>₹{selectedOrder.total}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Printable Logo Watermark (Faint print seal overlay) */}
            <div className="hidden print:flex absolute inset-0 items-center justify-center pointer-events-none z-50 opacity-[0.12]">
              <div className="relative w-96 h-96">
                <Image
                  src="/logo.png"
                  alt="Sreeva Naturals Watermark"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Printable Barcode (Only visible when printing) */}
            <div className="hidden print:flex flex-col items-center justify-center pt-8 border-t border-dashed border-brand-dark/15 mt-8">
              <span className="font-mono text-xl tracking-[0.3em] text-brand-dark/50 font-light select-none">
                ||||| | |||| ||| | ||| ||||| | ||
              </span>
              <span className="text-[8px] font-mono tracking-[0.25em] text-brand-dark/50 uppercase mt-1.5">
                * Sreeva Naturals Order dispatch code *
              </span>
            </div>

            {/* Print Footer Notice (Print only) */}
            <div className="hidden print:block text-center text-[10px] text-brand-dark/50 mt-12 border-t border-gray-200 pt-4">
              Thank you for choosing Sreeva Naturals. Organic food extracts settled naturally.
            </div>

          </div>
        </div>
      )}


    </div>
  );
}
