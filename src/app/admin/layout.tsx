"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  LayoutDashboard,
  ShoppingBag,
  ListOrdered,
  Users,
  MessageSquare,
  Ticket,
  Settings,
  Store,
  ChevronRight
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, loginUser, logoutUser, users } = useApp();

  const [adminEmail, setAdminEmail] = React.useState("");
  const [adminPassword, setAdminPassword] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  const [authLoading, setAuthLoading] = React.useState(false);

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setAuthLoading(true);

    setTimeout(() => {
      const res = loginUser(adminEmail, adminPassword);
      if (!res.success) {
        setLoginError(res.message || "Invalid credentials");
      } else {
        const emailLower = adminEmail.toLowerCase().trim();
        const user = users.find((u) => u.email.toLowerCase() === emailLower);
        if (user && user.role !== "admin") {
          setLoginError("Access denied. Customer accounts cannot access the admin console.");
          logoutUser();
        }
      }
      setAuthLoading(false);
    }, 800);
  };

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3EFE9] text-brand-dark px-4 py-16">
        <Link 
          href="/" 
          className="absolute top-8 left-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-dark/60 hover:text-brand-orange transition-colors"
        >
          <Store className="w-4.5 h-4.5" />
          <span>Return to Storefront</span>
        </Link>

        <div className="w-full max-w-md bg-white border border-[#2A211C]/15 rounded-2xl p-8 md:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-brand-orange/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-brand-green/5 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center mb-8 relative z-10">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-orange font-bold mb-2 block">
              Sreeva Admin Console
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-brand-green">
              Administrative Access
            </h2>
            <p className="text-xs text-brand-dark/70 font-light mt-2 leading-relaxed">
              Authorized personnel only. Please sign in with your administrative account to access catalog settings, orders, and review approvals.
            </p>
          </div>

          {currentUser ? (
            <div className="space-y-5 relative z-10">
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs space-y-2 text-red-750">
                <p className="font-bold uppercase tracking-wider text-[10px] text-red-800">Access Restricted</p>
                <p>You are currently logged in as a Customer:</p>
                <p className="font-mono bg-red-100/50 p-1.5 rounded">{currentUser.name} ({currentUser.email})</p>
                <p>Customer accounts are not authorized to view the administrative panel.</p>
              </div>

              <button
                onClick={() => logoutUser()}
                className="w-full py-4 bg-brand-orange hover:bg-brand-orange-hover text-brand-bg text-xs font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Switch to Admin Account</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleAdminLoginSubmit} className="space-y-5 relative z-10">
              {loginError && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-brand-dark/80">
                  Admin Email
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/40 text-sm">@</span>
                  <input
                    type="email"
                    required
                    placeholder="admin@sreevanaturals.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-brand-bg/50 border border-brand-dark/10 rounded-xl text-sm focus:outline-none focus:border-brand-green transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-brand-dark/80">
                  Admin Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-dark/10 rounded-xl text-sm focus:outline-none focus:border-brand-green transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-4 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-xs font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {authLoading ? "Verifying Credentials..." : "Authenticate Admin"}
              </button>
            </form>
          )}

          <div className="text-center mt-6 text-[10px] text-brand-dark/45 font-light relative z-10 flex items-center justify-center gap-1.5">
            <span>Console session secured locally</span>
          </div>
        </div>
      </div>
    );
  }



  const menuItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Orders", href: "/admin/orders", icon: ListOrdered },
    { name: "Reviews", href: "/admin/reviews", icon: MessageSquare },
    { name: "Coupons", href: "/admin/coupons", icon: Ticket },
    { name: "Store Settings", href: "/admin/settings", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#F3EFE9] text-brand-dark flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-brand-dark text-brand-bg flex-shrink-0 border-r border-brand-green/10 flex flex-col print:hidden">
        {/* Header */}
        <div className="p-6 border-b border-brand-bg/10 flex items-center justify-between">
          <div>
            <span className="font-serif text-lg font-bold tracking-widest text-brand-bg">
              SREEVA
            </span>
            <span className="block text-[9px] uppercase tracking-[0.25em] text-brand-orange font-bold -mt-0.5">
              ADMIN CONSOLE
            </span>
          </div>
          <Link
            href="/"
            className="p-1.5 rounded-lg bg-[#3a302a] text-brand-orange hover:bg-brand-orange hover:text-brand-bg transition-colors"
            title="Go to store"
          >
            <Store className="w-4 h-4" />
          </Link>
        </div>

        {/* Menu list */}
        <nav className="flex-grow p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-luxury ${
                  isActive
                    ? "bg-brand-orange text-brand-bg shadow-md"
                    : "text-brand-bg/75 hover:bg-[#3a302a] hover:text-brand-bg"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 opacity-40 transition-transform ${isActive ? "translate-x-1" : ""}`} />
              </Link>
            );
          })}
        </nav>

        {/* Console footer */}
        <div className="p-4 border-t border-brand-bg/10 text-center text-[10px] text-brand-bg/40 font-semibold tracking-wider">
          SREEVA NATURALS v1.0.0
        </div>
      </aside>

      {/* Main Admin Workspace Panel Content */}
      <main className="flex-grow p-6 sm:p-10 overflow-y-auto max-h-screen print:p-0 print:overflow-visible print:max-h-none">
        {children}
      </main>


    </div>
  );
}
