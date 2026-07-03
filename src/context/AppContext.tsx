"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

// Types
export interface ToastInfo {
  message: string;
  type: "success" | "info" | "error";
  id: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  benefits: string[];
  ingredients: string[];
  category: string;
  image: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
  isFeatured?: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minSpend: number;
  expiryDate: string;
  usageLimit: number;
  usageCount: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  postalCode: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  couponCode?: string;
  status: "Pending" | "Confirmed" | "Packed" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
  paymentMethod: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city?: string;
  postalCode?: string;
  password?: string;
  role: "customer" | "admin";
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  taxRate: number;
  shippingFee: number;
  freeShippingThreshold: number;
}

interface AppContextType {
  products: Product[];
  reviews: Review[];
  coupons: Coupon[];
  orders: Order[];
  settings: StoreSettings;
  cart: { productId: string; quantity: number }[];
  wishlist: string[];
  activeCoupon: Coupon | null;
  
  // Auth state
  currentUser: UserAccount | null;
  users: UserAccount[];
  isAdmin: boolean;

  
  // Actions
  addProduct: (product: Omit<Product, "id" | "rating" | "reviewsCount">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;
  
  addReview: (review: Omit<Review, "id" | "date" | "status">) => void;
  updateReviewStatus: (id: string, status: Review["status"]) => void;
  toggleReviewFeature: (id: string) => void;
  deleteReview: (id: string) => void;
  
  addCoupon: (coupon: Omit<Coupon, "id" | "usageCount">) => void;
  updateCoupon: (id: string, coupon: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  applyCouponCode: (code: string, cartSubtotal: number) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  placeOrder: (customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    paymentMethod: string;
  }) => Order;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  updateSettings: (settings: Partial<StoreSettings>) => void;
  resetAllData: () => void;

  // Auth actions
  registerUser: (userData: Omit<UserAccount, "id" | "role">) => { success: boolean; message: string };
  loginUser: (email: string, password: string) => { success: boolean; message: string };
  logoutUser: () => void;
  updateUserProfile: (profileData: Partial<UserAccount>) => { success: boolean; message: string };
  
  toast: ToastInfo | null;
  triggerToast: (message: string, type?: "success" | "info" | "error") => void;

}

// Initial Data Seeds
const seedProducts: Product[] = [
  {
    id: "prod-1",
    name: "Pure Wild Forest Honey",
    price: 650,
    description: "Our forest honey is collected from the deep deciduous forests of Central India by traditional tribal honey hunters. Naturally ripened on the hive, unprocessed and raw, it preserves all health-giving enzymes, pollen, and natural antioxidants.",
    benefits: [
      "Natural immunity booster containing raw wild pollens.",
      "Rich in natural antioxidants and wild nectar properties.",
      "Acts as a natural remedy for cough, throat irritation, and digestion."
    ],
    ingredients: ["100% Pure Wild Deciduous Forest Honey"],
    category: "Honey",
    image: "/honey.jpg",
    stock: 45,
    rating: 4.8,
    reviewsCount: 34,
    isFeatured: true
  },
  {
    id: "prod-2",
    name: "A2 Desi Cow Bilona Ghee",
    price: 1850,
    description: "Prepared using the traditional Vedic Bilona method from curd churned from milk of free-grazing native Indian Hallikar and Gir cows. Slowly heated in clay pots over firewood, resulting in rich granular texture and aroma.",
    benefits: [
      "Extremely rich in A2 beta-casein protein, highly digestible.",
      "Vedic wood-fired cooking yields high butyric acid promoting gut lining health.",
      "Contains heart-healthy fats, vital vitamins A, D, E, and K."
    ],
    ingredients: ["A2 Curd Churned Butterfat from Indian Desi Breed Cows"],
    category: "Ghee",
    image: "/ghee.jpg",
    stock: 20,
    rating: 4.9,
    reviewsCount: 56,
    isFeatured: true
  },
  {
    id: "prod-3",
    name: "Cold Pressed Groundnut Oil",
    price: 380,
    description: "Extracted from premium sun-dried organic groundnuts using traditional Vagai wood Ghani presses. No external heat is applied during extraction to preserve the oil's high monounsaturated fatty acids and original nutty aroma.",
    benefits: [
      "Rich in phytosterols and vitamin E to guard cardiovascular health.",
      "High smoke point, making it perfect for clean traditional frying.",
      "Zero chemicals, artificial trans-fats, or industrial refining processes."
    ],
    ingredients: ["100% Sun-Dried Organic Groundnut Kernels"],
    category: "Oils",
    image: "/groundnut_oil.jpg",
    stock: 60,
    rating: 4.6,
    reviewsCount: 22,
    isFeatured: false
  },
  {
    id: "prod-4",
    name: "Virgin Cold Pressed Coconut Oil",
    price: 420,
    description: "Extracted from high-grade dried sulfur-free coconut copra using wooden Kachi Ghani presses. Filtered naturally without heat or refining chemicals, delivering the absolute purest form of edible coconut lipids.",
    benefits: [
      "Composed of Medium Chain Triglycerides (MCTs) supporting instant metabolism.",
      "Naturally rich in Lauric Acid (found in mother's milk) protecting gut biomes.",
      "Ideal for premium skin moisturizing, hair care, and raw keto cooking."
    ],
    ingredients: ["Premium Sulfur-Free Dried Coconut Copra"],
    category: "Oils",
    image: "/coconut_oil.jpg",
    stock: 35,
    rating: 4.7,
    reviewsCount: 18,
    isFeatured: false
  }
];

const seedReviews: Review[] = [
  {
    id: "rev-1",
    productId: "prod-2",
    productName: "A2 Desi Cow Bilona Ghee",
    author: "Aditya Verma",
    rating: 5,
    comment: "This is the most authentic Bilona Ghee I've ever purchased online. The aroma instantly took me back to my childhood days in the village. Incredible granular texture!",
    date: "2026-06-25",
    status: "Approved",
    isFeatured: true
  },
  {
    id: "rev-2",
    productId: "prod-1",
    productName: "Pure Wild Forest Honey",
    author: "Dr. Meera Nair",
    rating: 5,
    comment: "The taste is complex, distinct, and woody—unlike anything sold in commercial bottles. It has helped with my chronic throat congestion significantly.",
    date: "2026-06-22",
    status: "Approved",
    isFeatured: true
  },
  {
    id: "rev-3",
    productId: "prod-4",
    productName: "Virgin Cold Pressed Coconut Oil",
    author: "Siddharth Sen",
    rating: 5,
    comment: "Used it for both culinary dressings and skin application. Extremely light texture, sweet clean smell of raw coconuts. Worth every rupee.",
    date: "2026-06-20",
    status: "Approved",
    isFeatured: true
  }
];

const seedCoupons: Coupon[] = [
  {
    id: "cp-1",
    code: "PURE20",
    discountType: "percentage",
    discountValue: 20,
    minSpend: 999,
    expiryDate: "2028-12-31",
    usageLimit: 500,
    usageCount: 0
  },
  {
    id: "cp-2",
    code: "WELCOME100",
    discountType: "fixed",
    discountValue: 100,
    minSpend: 499,
    expiryDate: "2028-12-31",
    usageLimit: 1000,
    usageCount: 0
  }
];

const seedOrders: Order[] = [
  {
    id: "ORD-8713",
    customerName: "Rajesh Kumar",
    customerEmail: "rajesh@gmail.com",
    customerPhone: "+91 98765 43210",
    address: "12, Kasturba Gandhi Marg, Connaught Place",
    city: "New Delhi",
    postalCode: "110001",
    items: [
      {
        productId: "prod-2",
        name: "A2 Desi Cow Bilona Ghee",
        price: 1850,
        quantity: 1,
        image: "/ghee.jpg"
      },
      {
        productId: "prod-1",
        name: "Pure Wild Forest Honey",
        price: 650,
        quantity: 1,
        image: "/honey.jpg"
      }
    ],
    subtotal: 2500,
    discount: 100,
    tax: 120,
    shipping: 0,
    total: 2520,
    couponCode: "WELCOME100",
    status: "Delivered",
    date: "2026-06-29 11:30",
    paymentMethod: "UPI (Razorpay)"
  }
];

const initialSettings: StoreSettings = {
  storeName: "Sreeva Naturals",
  tagline: "From Nature To Nourishment",
  email: "care@sreevanaturals.com",
  phone: "+91 90001 90001",
  address: "Sreeva Organic Farms, Western Ghats Region, India",
  taxRate: 5, // 5% GST
  shippingFee: 60,
  freeShippingThreshold: 1500
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(initialSettings);
  const [cart, setCart] = useState<{ productId: string; quantity: number }[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  
  // Auth state
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const isAdmin = currentUser?.role === "admin";

  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<ToastInfo | null>(null);

  const triggerToast = (message: string, type: "success" | "info" | "error" = "success") => {
    setToast({ message, type, id: Date.now() });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Load data from localStorage or seed fallback
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProducts = localStorage.getItem("sreeva_products");
      const storedReviews = localStorage.getItem("sreeva_reviews");
      const storedCoupons = localStorage.getItem("sreeva_coupons");
      const storedOrders = localStorage.getItem("sreeva_orders");
      const storedSettings = localStorage.getItem("sreeva_settings");
      const storedCart = localStorage.getItem("sreeva_cart");
      const storedWishlist = localStorage.getItem("sreeva_wishlist");
      const storedUsers = localStorage.getItem("sreeva_users");
      const storedCurrentUser = localStorage.getItem("sreeva_current_user");

      const defaultUsers: UserAccount[] = [
        {
          id: "usr-admin",
          name: "Sreeva Administrator",
          email: "admin@sreevanaturals.com",
          phone: "9000190001",
          address: "Sreeva Organic Farms, India",
          role: "admin",
          password: "admin123"
        },
        {
          id: "usr-cust",
          name: "Hari Prasad",
          email: "customer@test.com",
          phone: "9876543210",
          address: "12, MG Road",
          city: "Bangalore",
          postalCode: "560001",
          role: "customer",
          password: "customer123"
        }
      ];

      setProducts(storedProducts ? JSON.parse(storedProducts) : seedProducts);
      setReviews(storedReviews ? JSON.parse(storedReviews) : seedReviews);
      setCoupons(storedCoupons ? JSON.parse(storedCoupons) : seedCoupons);
      setOrders(storedOrders ? JSON.parse(storedOrders) : seedOrders);
      setSettings(storedSettings ? JSON.parse(storedSettings) : initialSettings);
      setCart(storedCart ? JSON.parse(storedCart) : []);
      setWishlist(storedWishlist ? JSON.parse(storedWishlist) : []);
      setUsers(storedUsers ? JSON.parse(storedUsers) : defaultUsers);
      setCurrentUser(storedCurrentUser ? JSON.parse(storedCurrentUser) : null);

      setLoading(false);
    }
  }, []);

  const saveToLocal = (key: string, data: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  // Products CRUD
  const addProduct = (newProd: Omit<Product, "id" | "rating" | "reviewsCount">) => {
    const fresh: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0
    };
    const updated = [fresh, ...products];
    setProducts(updated);
    saveToLocal("sreeva_products", updated);
    triggerToast(`Added product "${fresh.name}" to catalog.`, "success");
  };

  const updateProduct = (id: string, fields: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...fields } : p));
    setProducts(updated);
    saveToLocal("sreeva_products", updated);
    const prod = products.find(p => p.id === id);
    triggerToast(`Updated product "${prod?.name || 'details'}".`, "success");
  };

  const deleteProduct = (id: string) => {
    const prod = products.find(p => p.id === id);
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveToLocal("sreeva_products", updated);
    triggerToast(`Deleted product "${prod?.name || 'item'}" from catalog.`, "info");
  };

  const duplicateProduct = (id: string) => {
    const original = products.find((p) => p.id === id);
    if (original) {
      const duplicate: Product = {
        ...original,
        id: `prod-${Date.now()}`,
        name: `${original.name} (Copy)`,
        stock: original.stock > 0 ? original.stock : 0
      };
      const updated = [duplicate, ...products];
      setProducts(updated);
      saveToLocal("sreeva_products", updated);
      triggerToast(`Duplicated "${original.name}" successfully.`, "success");
    }
  };

  // Reviews actions
  const addReview = (review: Omit<Review, "id" | "date" | "status">) => {
    const fresh: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: "Pending"
    };
    const updated = [fresh, ...reviews];
    setReviews(updated);
    saveToLocal("sreeva_reviews", updated);
    triggerToast("Review submitted successfully. Pending approval.", "success");
  };

  const updateReviewStatus = (id: string, status: Review["status"]) => {
    const updated = reviews.map((r) => {
      if (r.id === id) {
        if (status === "Approved" && r.status !== "Approved") {
          const prod = products.find((p) => p.id === r.productId);
          if (prod) {
            const newCount = prod.reviewsCount + 1;
            const newRating = parseFloat(((prod.rating * prod.reviewsCount + r.rating) / newCount).toFixed(1));
            updateProduct(r.productId, { rating: newRating, reviewsCount: newCount });
          }
        }
        return { ...r, status };
      }
      return r;
    });
    setReviews(updated);
    saveToLocal("sreeva_reviews", updated);
    triggerToast(`Review status updated to: ${status}`, "success");
  };

  const toggleReviewFeature = (id: string) => {
    const rev = reviews.find(r => r.id === id);
    if (rev) {
      const newFeatured = !rev.isFeatured;
      const updated = reviews.map((r) => (r.id === id ? { ...r, isFeatured: newFeatured } : r));
      setReviews(updated);
      saveToLocal("sreeva_reviews", updated);
      triggerToast(newFeatured ? "Review featured on homepage." : "Review removed from featured list.", "success");
    }
  };

  const deleteReview = (id: string) => {
    const updated = reviews.filter((x) => x.id !== id);
    setReviews(updated);
    saveToLocal("sreeva_reviews", updated);
    triggerToast("Review deleted successfully.", "info");
  };

  // Coupons Actions
  const addCoupon = (coupon: Omit<Coupon, "id" | "usageCount">) => {
    const fresh: Coupon = {
      ...coupon,
      id: `cp-${Date.now()}`,
      usageCount: 0
    };
    const updated = [fresh, ...coupons];
    setCoupons(updated);
    saveToLocal("sreeva_coupons", updated);
    triggerToast(`Coupon code "${fresh.code}" added successfully.`, "success");
  };

  const updateCoupon = (id: string, fields: Partial<Coupon>) => {
    const updated = coupons.map((c) => (c.id === id ? { ...c, ...fields } : c));
    setCoupons(updated);
    saveToLocal("sreeva_coupons", updated);
  };

  const deleteCoupon = (id: string) => {
    const updated = coupons.filter((c) => c.id !== id);
    setCoupons(updated);
    saveToLocal("sreeva_coupons", updated);
    triggerToast("Coupon deleted successfully.", "info");
  };

  const applyCouponCode = (code: string, subtotal: number) => {
    const coupon = coupons.find((c) => c.code.toUpperCase() === code.toUpperCase());
    if (!coupon) {
      triggerToast(`Coupon code "${code}" is invalid.`, "error");
      return { success: false, message: "Coupon code does not exist" };
    }
    
    const today = new Date();
    const expiry = new Date(coupon.expiryDate);
    if (today > expiry) {
      triggerToast(`Coupon code has expired.`, "error");
      return { success: false, message: "Coupon has expired" };
    }

    if (coupon.usageCount >= coupon.usageLimit) {
      triggerToast(`Coupon usage limit reached.`, "error");
      return { success: false, message: "Coupon limit reached" };
    }

    if (subtotal < coupon.minSpend) {
      triggerToast(`Minimum spend of ₹${coupon.minSpend} required.`, "error");
      return { success: false, message: `Minimum spend of ₹${coupon.minSpend} required` };
    }

    setActiveCoupon(coupon);
    triggerToast(`Coupon applied: ${coupon.code}`, "success");
    return { success: true, message: `Coupon applied: ₹${coupon.discountValue}${coupon.discountType === "percentage" ? "%" : ""} discount` };
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
  };

  // Orders Actions
  const placeOrder = (details: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    paymentMethod: string;
  }) => {
    const orderItems: OrderItem[] = cart.map((item) => {
      const prod = products.find((p) => p.id === item.productId)!;
      return {
        productId: prod.id,
        name: prod.name,
        price: prod.price,
        quantity: item.quantity,
        image: prod.image
      };
    });

    const subtotal = orderItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    let discount = 0;
    if (activeCoupon) {
      if (activeCoupon.discountType === "percentage") {
        discount = Math.round(subtotal * (activeCoupon.discountValue / 100));
      } else {
        discount = activeCoupon.discountValue;
      }
      updateCoupon(activeCoupon.id, { usageCount: activeCoupon.usageCount + 1 });
    }

    const tax = Math.round((subtotal - discount) * (settings.taxRate / 100));
    const shipping = (subtotal - discount) >= settings.freeShippingThreshold ? 0 : settings.shippingFee;
    const total = subtotal - discount + tax + shipping;

    const freshOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: details.name,
      customerEmail: details.email,
      customerPhone: details.phone,
      address: details.address,
      city: details.city,
      postalCode: details.postalCode,
      items: orderItems,
      subtotal,
      discount,
      tax,
      shipping,
      total,
      couponCode: activeCoupon?.code,
      status: "Pending",
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      paymentMethod: details.paymentMethod
    };

    // Deduct stock
    orderItems.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId);
      if (prod) {
        updateProduct(prod.id, { stock: Math.max(0, prod.stock - item.quantity) });
      }
    });

    const updated = [freshOrder, ...orders];
    setOrders(updated);
    saveToLocal("sreeva_orders", updated);
    
    clearCart();
    setActiveCoupon(null);
    triggerToast(`Order placed successfully! ID: ${freshOrder.id}`, "success");
    return freshOrder;
  };

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
    setOrders(updated);
    saveToLocal("sreeva_orders", updated);
    triggerToast(`Order #${id} status updated to: ${status}`, "success");
  };

  // Cart actions
  const addToCart = (productId: string, quantity: number = 1) => {
    const existing = cart.find((item) => item.productId === productId);
    let updated;
    if (existing) {
      updated = cart.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      updated = [...cart, { productId, quantity }];
    }
    setCart(updated);
    saveToLocal("sreeva_cart", updated);

    const prod = products.find(p => p.id === productId);
    triggerToast(`"${prod?.name || 'Item'}" added to cart.`, "success");
  };

  const removeFromCart = (productId: string) => {
    const updated = cart.filter((item) => item.productId !== productId);
    setCart(updated);
    saveToLocal("sreeva_cart", updated);

    const prod = products.find(p => p.id === productId);
    triggerToast(`"${prod?.name || 'Item'}" removed from cart.`, "info");
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    const updated = cart.map((item) =>
      item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(updated);
    saveToLocal("sreeva_cart", updated);
  };

  const clearCart = () => {
    setCart([]);
    saveToLocal("sreeva_cart", []);
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    let updated;
    const added = !wishlist.includes(productId);
    if (wishlist.includes(productId)) {
      updated = wishlist.filter((id) => id !== productId);
    } else {
      updated = [...wishlist, productId];
    }
    setWishlist(updated);
    saveToLocal("sreeva_wishlist", updated);

    const prod = products.find(p => p.id === productId);
    triggerToast(
      added ? `"${prod?.name || 'Item'}" saved to wishlist.` : `"${prod?.name || 'Item'}" removed from wishlist.`,
      "success"
    );
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  // Settings
  const updateSettings = (fields: Partial<StoreSettings>) => {
    const updated = { ...settings, ...fields };
    setSettings(updated);
    saveToLocal("sreeva_settings", updated);
    triggerToast("Settings saved successfully.", "success");
  };

  const resetAllData = () => {
    localStorage.removeItem("sreeva_products");
    localStorage.removeItem("sreeva_reviews");
    localStorage.removeItem("sreeva_coupons");
    localStorage.removeItem("sreeva_orders");
    localStorage.removeItem("sreeva_settings");
    localStorage.removeItem("sreeva_cart");
    localStorage.removeItem("sreeva_wishlist");
    
    setProducts(seedProducts);
    setReviews(seedReviews);
    setCoupons(seedCoupons);
    setOrders(seedOrders);
    setSettings(initialSettings);
    setCart([]);
    setWishlist([]);
    setActiveCoupon(null);
    triggerToast("Sandbox database reset to defaults.", "info");
  };

  // Auth Functions implementation
  const registerUser = (userData: Omit<UserAccount, "id" | "role">) => {
    const emailLower = userData.email.toLowerCase().trim();
    const exists = users.some((u) => u.email.toLowerCase() === emailLower);
    if (exists) {
      triggerToast("An account with this email already exists.", "error");
      return { success: false, message: "Email already registered" };
    }

    const newUser: UserAccount = {
      ...userData,
      id: `usr-${Date.now()}`,
      role: "customer"
    };

    const updated = [...users, newUser];
    setUsers(updated);
    saveToLocal("sreeva_users", updated);
    triggerToast("Registration successful! You can now log in.", "success");
    return { success: true, message: "Registration successful" };
  };

  const loginUser = (email: string, password: string) => {
    const emailLower = email.toLowerCase().trim();
    const user = users.find((u) => u.email.toLowerCase() === emailLower);
    if (!user) {
      triggerToast("No account found with this email.", "error");
      return { success: false, message: "Account not found" };
    }

    if (user.password !== password) {
      triggerToast("Incorrect password.", "error");
      return { success: false, message: "Invalid credentials" };
    }

    setCurrentUser(user);
    saveToLocal("sreeva_current_user", user);
    triggerToast(`Welcome back, ${user.name}!`, "success");
    return { success: true, message: "Login successful" };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("sreeva_current_user");
    }
    setCart([]);
    setWishlist([]);
    setActiveCoupon(null);
    triggerToast("Logged out successfully.", "info");
  };

  const updateUserProfile = (profileData: Partial<UserAccount>) => {
    if (!currentUser) {
      return { success: false, message: "No active session" };
    }

    const updatedUser = { ...currentUser, ...profileData };
    setCurrentUser(updatedUser);
    saveToLocal("sreeva_current_user", updatedUser);

    const updatedUsers = users.map((u) => u.id === currentUser.id ? updatedUser : u);
    setUsers(updatedUsers);
    saveToLocal("sreeva_users", updatedUsers);

    triggerToast("Profile details updated.", "success");
    return { success: true, message: "Profile updated" };
  };

  return (
    <AppContext.Provider
      value={{
        products,
        reviews,
        coupons,
        orders,
        settings,
        cart,
        wishlist,
        activeCoupon,
        currentUser,
        users,
        isAdmin,
        registerUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        addReview,
        updateReviewStatus,
        toggleReviewFeature,
        deleteReview,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        applyCouponCode,
        removeCoupon,
        placeOrder,
        updateOrderStatus,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        updateSettings,
        resetAllData,
        toast,
        triggerToast
      }}
    >

      {!loading && children}

      {/* Global Premium Responsive Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:right-6 sm:left-auto z-[99999] animate-reveal-up max-w-sm w-auto sm:w-80 bg-brand-dark/95 border border-brand-bg/10 rounded-xl shadow-2xl p-4 pl-5 flex items-start gap-3 backdrop-blur-md overflow-hidden text-brand-bg">
          {/* Left indicator bar */}
          <div className={`absolute left-0 top-0 bottom-0 w-1 ${
            toast.type === "success" ? "bg-brand-green" : toast.type === "error" ? "bg-brand-orange" : "bg-brand-orange/40"
          }`} />

          {toast.type === "success" && (
            <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
          )}
          {toast.type === "error" && (
            <AlertCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
          )}
          {toast.type === "info" && (
            <Info className="w-5 h-5 text-brand-orange/60 flex-shrink-0 mt-0.5" />
          )}

          <div className="flex-grow pr-1">
            <p className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em] mb-1">
              {toast.type === "success" ? "Success" : toast.type === "error" ? "Warning" : "Notice"}
            </p>
            <p className="text-xs font-light text-brand-bg/90 leading-relaxed">
              {toast.message}
            </p>
          </div>

          <button 
            onClick={() => setToast(null)}
            className="text-brand-bg/30 hover:text-brand-bg transition-colors cursor-pointer p-0.5"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
