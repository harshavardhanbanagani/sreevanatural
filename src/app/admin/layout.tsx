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
  const { currentUser } = useApp();

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      router.push("/auth");
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-green animate-pulse">
          Verifying Admin Credentials...
        </p>
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
      <aside className="w-full md:w-64 bg-brand-dark text-brand-bg flex-shrink-0 border-r border-brand-green/10 flex flex-col">
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
      <main className="flex-grow p-6 sm:p-10 overflow-y-auto max-h-screen">
        {children}
      </main>

    </div>
  );
}
