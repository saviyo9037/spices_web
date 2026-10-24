"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
          p.origin.toLowerCase().includes(query.toLowerCase())
      )
    : products.slice(0, 3);

  const filteredCategories = query.trim()
    ? categories.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      )
    : categories.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#e6dfd5] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#e6dfd5] flex items-center gap-3 bg-[#faf7f2]">
          <Search className="w-5 h-5 text-[#87978f] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search spices, turmeric, tellicherry pepper, cardamom, cinnamon..."
            className="flex-1 bg-transparent text-[#143627] placeholder-[#87978f] text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-[#87978f] hover:text-[#16201b]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-[#e6dfd5] hover:bg-[#d8d0c2] text-[#143627] font-semibold px-2.5 py-1 rounded-md transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-5 space-y-6">
          {/* Categories Quick Chips */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#87978f] mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c69238]" />
              <span>Browse Spice Categories</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filteredCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={onClose}
                  className="px-3 py-1.5 rounded-full bg-[#f3eee4] hover:bg-[#143627] text-[#143627] hover:text-white text-xs font-semibold transition-all border border-[#e6dfd5]"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Products List */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#87978f] mb-3">
              {query.trim() ? `Search Results (${filteredProducts.length})` : "Popular Spices"}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-[#5c6c64] text-sm">
                No spices found matching &quot;{query}&quot;. Try searching for &quot;turmeric&quot;, &quot;pepper&quot;, or &quot;cardamom&quot;.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-[#faf7f2] transition-colors border border-transparent hover:border-[#e6dfd5] group"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#f3eee4] shrink-0 border border-[#e6dfd5]">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="56px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-sm font-bold text-[#143627] group-hover:text-[#c69238] transition-colors truncate">
                          {p.name}
                        </h4>
                        <span className="text-[10px] bg-[#143627]/10 text-[#143627] font-semibold px-1.5 py-0.5 rounded">
                          {p.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#5c6c64] truncate mt-0.5">
                        {p.shortDescription}
                      </p>
                      <div className="text-xs font-bold text-[#143627] mt-1">
                        From ₹{p.price}{" "}
                        <span className="line-through text-[#87978f] font-normal text-[11px]">
                          ₹{p.originalPrice}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#87978f] group-hover:text-[#143627] group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#faf7f2] border-t border-[#e6dfd5] text-center text-xs text-[#5c6c64]">
          <Link
            href="/shop"
            onClick={onClose}
            className="font-semibold text-[#143627] hover:underline"
          >
            View all spices in the shop &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
