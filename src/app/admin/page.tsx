"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  IndianRupee,
  ShoppingBag,
  Users,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  PackageCheck
} from "lucide-react";

export default function AdminDashboardPage() {
  const { orders, products } = useApp();

  // 1. Calculations
  const stats = useMemo(() => {
    // Total Revenue (approved/shipped/delivered/confirmed orders - excludes cancelled)
    const activeOrders = orders.filter((o) => o.status !== "Cancelled");
    const totalRevenue = activeOrders.reduce((acc, o) => acc + o.total, 0);

    // Total Orders count
    const totalOrders = orders.length;

    // Unique Customers list
    const emails = new Set(orders.map((o) => o.customerEmail));
    const totalCustomers = emails.size;

    // Total Products count
    const totalProducts = products.length;

    // Low stock count (stock < 15)
    const lowStockCount = products.filter((p) => p.stock < 15).length;

    return {
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
      lowStockCount
    };
  }, [orders, products]);

  // 2. Recent orders list
  const recentOrders = useMemo(() => {
    return orders.slice(0, 5);
  }, [orders]);

  // 3. Low stock items table listing
  const lowStockItems = useMemo(() => {
    return products.filter((p) => p.stock < 15).slice(0, 4);
  }, [products]);

  // 4. Monthly/Category Sales Breakdown for custom premium bar chart
  const categorySales = useMemo(() => {
    const categoriesMap: { [key: string]: number } = { Oils: 0, Ghee: 0, Honey: 0 };
    orders
      .filter((o) => o.status !== "Cancelled")
      .forEach((o) => {
        o.items.forEach((item) => {
          const prod = products.find((p) => p.id === item.productId);
          const cat = prod?.category || "Oils";
          categoriesMap[cat] = (categoriesMap[cat] || 0) + item.price * item.quantity;
        });
      });

    const maxSales = Math.max(...Object.values(categoriesMap), 1);

    return Object.entries(categoriesMap).map(([name, value]) => ({
      name,
      value,
      percentage: Math.round((value / maxSales) * 100)
    }));
  }, [orders, products]);

  return (
    <div className="space-y-8">
      
      {/* Page Title Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif-luxury text-3xl font-bold text-brand-green">Console Overview</h1>
          <p className="text-xs font-semibold text-brand-dark/50 uppercase tracking-widest mt-1">Real-Time Store Performance</p>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        
        {/* Total Revenue */}
        <div className="bg-white border border-brand-green/10 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-dark/65">Total Revenue</span>
            <span className="p-2 bg-brand-green/5 text-brand-green rounded-lg"><IndianRupee className="w-4 h-4" /></span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-brand-green">₹{stats.totalRevenue}</h3>
            <span className="text-[10px] text-green-700 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +14.2% this month
            </span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white border border-brand-green/10 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-dark/65">Total Orders</span>
            <span className="p-2 bg-brand-green/5 text-brand-green rounded-lg"><ShoppingBag className="w-4 h-4" /></span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-brand-green">{stats.totalOrders}</h3>
            <span className="text-[10px] text-brand-orange font-semibold flex items-center gap-1 mt-1">
              <PackageCheck className="w-3 h-3" /> Active Processing
            </span>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white border border-brand-green/10 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-dark/65">Customers</span>
            <span className="p-2 bg-brand-green/5 text-brand-green rounded-lg"><Users className="w-4 h-4" /></span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-brand-green">{stats.totalCustomers}</h3>
            <span className="text-[10px] text-brand-dark/50 mt-1 block">Registered buyers</span>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white border border-brand-green/10 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-dark/65">Products</span>
            <span className="p-2 bg-brand-green/5 text-brand-green rounded-lg"><ShoppingBag className="w-4 h-4" /></span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-brand-green">{stats.totalProducts}</h3>
            <span className="text-[10px] text-brand-dark/50 mt-1 block">Items in catalog</span>
          </div>
        </div>

        {/* Low Stock count */}
        <div className="bg-white border border-brand-green/10 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-dark/65">Alerts</span>
            <span className={`p-2 rounded-lg ${stats.lowStockCount > 0 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className={`text-2xl font-bold ${stats.lowStockCount > 0 ? "text-red-600" : "text-brand-green"}`}>
              {stats.lowStockCount}
            </h3>
            <span className="text-[10px] text-brand-dark/50 mt-1 block">Low Stock Warnings</span>
          </div>
        </div>

      </div>

      {/* Main workspace layout: Charts & recent lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Category Revenue Bar Chart Panel */}
        <div className="lg:col-span-1 bg-white border border-brand-green/10 p-6 rounded-2xl shadow-sm space-y-6">
          <div>
            <h3 className="font-serif-luxury text-lg font-bold text-brand-green">Revenue by Category</h3>
            <p className="text-[10px] font-semibold text-brand-dark/50 uppercase tracking-widest mt-1">Earnings breakdown</p>
          </div>

          {/* Render CSS Custom Bar Chart */}
          <div className="space-y-5 pt-4">
            {categorySales.map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-brand-dark/85">
                  <span>{item.name} Collection</span>
                  <span className="font-bold text-brand-green">₹{item.value}</span>
                </div>
                {/* Custom Bar progress track */}
                <div className="w-full h-3 bg-brand-cream rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-green rounded-full transition-all duration-1000"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Placed Orders Panel */}
        <div className="lg:col-span-2 bg-white border border-brand-green/10 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-brand-green">Recent Checkout Orders</h3>
              <p className="text-[10px] font-semibold text-brand-dark/50 uppercase tracking-widest mt-1">Latest purchases</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs uppercase tracking-wider font-bold text-brand-orange hover:text-brand-orange-hover flex items-center gap-1 transition-luxury"
            >
              <span>Manage Orders</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-brand-dark/5 text-brand-dark/65 font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-dark/5 font-light text-brand-dark/85">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-brand-cream/20">
                    <td className="py-3 font-bold text-brand-green">{ord.id}</td>
                    <td className="py-3">{ord.customerName}</td>
                    <td className="py-3 text-[10px] font-semibold text-brand-dark/60">{ord.date.split(" ")[0]}</td>
                    <td className="py-3 font-semibold">₹{ord.total}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        ord.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : ord.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : ord.status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-brand-dark/50">No orders registered yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Second Row: Low Stock Items */}
      {lowStockItems.length > 0 && (
        <div className="bg-white border border-brand-green/10 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-serif-luxury text-lg font-bold">Low Stock Warning Indicators</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {lowStockItems.map((item) => (
              <div key={item.id} className="bg-brand-cream border border-brand-dark/5 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-serif-luxury text-sm font-bold text-brand-green line-clamp-1">{item.name}</h4>
                  <span className="text-[10px] text-brand-dark/65 font-bold uppercase mt-1 block">Category: {item.category}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-red-600 block">{item.stock}</span>
                  <span className="text-[9px] uppercase tracking-wider text-red-500 font-bold block">Units Left</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
