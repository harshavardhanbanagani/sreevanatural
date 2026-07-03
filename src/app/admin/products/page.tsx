"use client";

import React, { useState } from "react";
import { useApp, Product } from "@/context/AppContext";
import { Plus, Edit2, Copy, Trash2, X, PlusCircle, Sparkles } from "lucide-react";
import Image from "next/image";

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, duplicateProduct } = useApp();

  // Dialog Overlay States
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [benefitsInput, setBenefitsInput] = useState(""); // comma separated
  const [ingredientsInput, setIngredientsInput] = useState(""); // comma separated
  const [category, setCategory] = useState("Oils");
  const [imageString, setImageString] = useState("/honey.jpg");
  const [stock, setStock] = useState(10);

  // File Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImageString(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Opens form for fresh creation
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setName("");
    setPrice(250);
    setDescription("");
    setBenefitsInput("100% natural extraction, Zero chemicals added");
    setIngredientsInput("Cold Pressed Raw Seeds");
    setCategory("Oils");
    setImageString("/groundnut_oil.jpg");
    setStock(20);
    setShowForm(true);
  };

  // Opens form for editing
  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setPrice(p.price);
    setDescription(p.description);
    setBenefitsInput(p.benefits.join(", "));
    setIngredientsInput(p.ingredients.join(", "));
    setCategory(p.category);
    setImageString(p.image);
    setStock(p.stock);
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const benefits = benefitsInput.split(",").map((s) => s.trim()).filter(Boolean);
    const ingredients = ingredientsInput.split(",").map((s) => s.trim()).filter(Boolean);

    const payload = {
      name,
      price: Number(price),
      description,
      benefits,
      ingredients,
      category,
      image: imageString,
      stock: Number(stock)
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }

    setShowForm(false);
  };


  return (
    <div className="space-y-8">
      
      {/* Header with actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif-luxury text-3xl font-bold text-brand-green">Manage Products</h1>
          <p className="text-xs font-semibold text-brand-dark/50 uppercase tracking-widest mt-1">Catalog and inventory inventory</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-xs font-bold uppercase tracking-widest rounded-lg transition-luxury shadow-md shadow-brand-green/10"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products list table */}
      <div className="bg-white border border-brand-green/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-brand-dark/5 text-brand-dark/65 font-bold uppercase tracking-wider text-[10px] bg-brand-cream/40">
                <th className="p-4">Product Info</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock Level</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-dark/5 font-light text-brand-dark/85">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-brand-cream/20">
                  
                  {/* Photo & Name */}
                  <td className="p-4 flex items-center gap-3">
                    <div className="relative w-10 h-10 bg-brand-cream border border-brand-dark/5 p-0.5 rounded flex-shrink-0">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif-luxury font-bold text-brand-green text-sm">{p.name}</h4>
                      <span className="text-[10px] text-brand-dark/50 font-semibold">ID: {p.id}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-4 font-semibold text-brand-dark/75">{p.category}</td>

                  {/* Price */}
                  <td className="p-4 font-bold text-brand-green text-sm">₹{p.price}</td>

                  {/* Stock Level */}
                  <td className="p-4">
                    {p.stock === 0 ? (
                      <span className="px-2.5 py-0.5 rounded bg-red-100 text-red-700 font-bold uppercase tracking-wider text-[9px]">
                        Out of Stock
                      </span>
                    ) : p.stock < 15 ? (
                      <span className="px-2.5 py-0.5 rounded bg-orange-100 text-orange-700 font-bold uppercase tracking-wider text-[9px]">
                        Low: {p.stock} units
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded bg-green-100 text-green-700 font-bold uppercase tracking-wider text-[9px]">
                        In Stock: {p.stock}
                      </span>
                    )}
                  </td>

                  {/* Action Buttons */}
                  <td className="p-4 text-right space-x-1.5">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-2 text-brand-green hover:bg-brand-green/5 rounded-lg transition-colors inline-flex items-center"
                      title="Edit Product"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => duplicateProduct(p.id)}
                      className="p-2 text-brand-orange hover:bg-brand-orange/5 rounded-lg transition-colors inline-flex items-center"
                      title="Duplicate Product"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE & EDIT FORM OVERLAY MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-brand-dark/50 backdrop-blur-sm p-4 animate-reveal-up">
          <div className="bg-brand-bg rounded-2xl max-w-2xl w-full border border-brand-dark/10 overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Close */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 p-2 bg-brand-cream/80 hover:bg-brand-orange hover:text-brand-bg text-brand-dark rounded-full transition-luxury z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="p-6 bg-brand-cream border-b border-brand-dark/5 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-orange" />
              <h2 className="font-serif-luxury text-xl font-bold text-brand-green">
                {editingProduct ? `Edit Product: ${editingProduct.name}` : "Create Fresh Product"}
              </h2>
            </div>

            {/* Form Body */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mustard Oil"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-semibold"
                  />
                </div>

                {/* Category select */}
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-semibold"
                  >
                    <option value="Oils">Oils</option>
                    <option value="Ghee">Ghee</option>
                    <option value="Honey">Honey</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Price */}
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Price (₹)</label>
                  <input
                    type="number"
                    required
                    min="10"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-bold text-brand-green"
                  />
                </div>

                {/* Stock */}
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Stock Inventory</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-semibold"
                  />
                </div>

                {/* Image Upload Option */}
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85 block">Product Image</label>
                  <div className="flex items-center gap-3 mt-1">
                    {imageString && (
                      <div className="relative w-9 h-9 border border-brand-dark/10 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                        <img
                          src={imageString}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <label className="flex-grow flex items-center justify-center px-3 py-2 border border-dashed border-brand-green/20 hover:border-brand-green bg-brand-green/5 hover:bg-brand-green/10 text-brand-green rounded-lg cursor-pointer transition-colors text-xs font-bold uppercase tracking-wider">
                      <span>Upload File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Story Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell the story of how this wellness food is sourced and processed..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-light"
                />
              </div>

              {/* Benefits (comma sep) */}
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Benefits (Comma Separated)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 100% Raw, Natural cold press, Boosts heart health"
                  value={benefitsInput}
                  onChange={(e) => setBenefitsInput(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-light"
                />
              </div>

              {/* Ingredients (comma sep) */}
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/85">Ingredients (Comma Separated)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Raw Mustard Seeds"
                  value={ingredientsInput}
                  onChange={(e) => setIngredientsInput(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-brand-bg border border-brand-dark/10 rounded-lg focus:outline-none focus:border-brand-green font-light"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-brand-dark/5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 border border-brand-dark/10 hover:bg-brand-cream text-xs font-bold uppercase tracking-wider rounded-lg transition-luxury"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-green hover:bg-brand-green-hover text-brand-bg text-xs font-bold uppercase tracking-wider rounded-lg transition-luxury"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
