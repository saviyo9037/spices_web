"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Check,
  Star,
  TrendingUp,
} from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

const trendingSearches = [
  "Black Pepper",
  "Cardamom",
  "Turmeric",
  "Cinnamon",
  "Cloves",
  "Combos",
];

const filterTabs = [
  { id: "all", label: "All" },
  { id: "whole-spices", label: "Whole" },
  { id: "ground-spices", label: "Ground" },
  { id: "spice-blends", label: "Blends" },
  { id: "organic", label: "Organic" },
];

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [addedId, setAddedId] = useState(null);

  const { addToCart } = useCart();
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Focus input on open & handle body scroll
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setSelectedIndex(0);
      setActiveTab("all");
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Filter products based on search query and active tab
  const filteredProducts = useMemo(() => {
    let list = products;

    if (activeTab === "organic") {
      list = list.filter((p) => p.organic);
    } else if (activeTab !== "all") {
      list = list.filter((p) => p.category === activeTab);
    }

    if (!query.trim()) {
      return list.slice(0, 4);
    }

    const q = query.toLowerCase().trim();
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle?.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q) ||
        p.origin?.toLowerCase().includes(q) ||
        p.categoryName?.toLowerCase().includes(q) ||
        p.tastingNotes?.some((t) => t.toLowerCase().includes(q))
    );
  }, [query, activeTab]);

  // Keyboard navigation (ArrowDown, ArrowUp, Enter, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredProducts.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredProducts.length - 1
        );
      } else if (e.key === "Enter") {
        if (filteredProducts[selectedIndex]) {
          const target = filteredProducts[selectedIndex];
          window.location.href = `/product/${target.slug}`;
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredProducts, selectedIndex, onClose]);

  // Auto scroll to active item
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      );
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  // Handle Quick Add to Cart
  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4">
      {/* Subtle Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Compact, Perfectly Sized Modal Panel */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[70vh]">
        
        {/* Top Accent Line */}
        <div className="h-1 bg-gradient-to-r from-emerald-700 via-[#dfa84a] to-emerald-700 shrink-0" />

        {/* Compact Search Input Bar */}
        <div className="px-3.5 py-3 border-b border-slate-100 flex items-center gap-2.5 bg-white shrink-0">
          <Search className="w-4 h-4 text-emerald-800 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search spices, pepper, cardamom..."
            className="flex-1 bg-transparent text-[#08271d] placeholder-slate-400 text-sm font-medium focus:outline-none"
          />

          {query && (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={onClose}
            className="text-[10px] font-mono uppercase bg-slate-100 hover:bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded transition-colors"
            title="Press Esc to close"
          >
            Esc
          </button>
        </div>

        {/* Compact Filter Tabs */}
        <div className="px-3.5 py-1.5 border-b border-slate-100 bg-slate-50/70 flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedIndex(0);
                }}
                className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium transition-colors cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-[#08271d] text-white font-semibold"
                    : "text-slate-600 hover:text-[#08271d] hover:bg-slate-200/60"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Scrollable Results List */}
        <div ref={listRef} className="overflow-y-auto p-3 space-y-3 flex-1 divide-y divide-slate-100">
          
          {/* Trending suggestions (only when query is empty) */}
          {!query.trim() && (
            <div className="pb-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-[#dfa84a]" />
                <span>Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {trendingSearches.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setQuery(item);
                      inputRef.current?.focus();
                    }}
                    className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-900 text-[11px] font-medium transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Section */}
          <div className="pt-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
              <span>{query.trim() ? `Results (${filteredProducts.length})` : "Fresh Harvests"}</span>
              <span className="text-[9px] font-normal text-slate-400 lowercase">Use ↑ ↓ keys</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-xs">
                No spices matching &quot;{query}&quot;. Try &quot;pepper&quot; or &quot;cardamom&quot;.
              </div>
            ) : (
              <div className="space-y-1">
                {filteredProducts.map((p, index) => {
                  const isSelected = selectedIndex === index;
                  const isAdded = addedId === p.id;

                  return (
                    <Link
                      key={p.id}
                      data-index={index}
                      href={`/product/${p.slug}`}
                      onClick={onClose}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center gap-2.5 p-2 rounded-xl transition-colors ${
                        isSelected
                          ? "bg-emerald-50/80 ring-1 ring-emerald-600/20"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 truncate">
                          <h4 className="font-serif text-xs font-bold text-[#08271d] truncate">
                            {p.name}
                          </h4>
                          {p.badge && (
                            <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 shrink-0">
                              {p.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span className="font-bold text-[#08271d]">₹{p.price}</span>
                          {p.originalPrice && (
                            <span className="line-through text-slate-400 text-[10px]">
                              ₹{p.originalPrice}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 truncate">
                            {p.subtitle || p.categoryName}
                          </span>
                        </div>
                      </div>

                      {/* Quick Add Button */}
                      <button
                        onClick={(e) => handleQuickAdd(e, p)}
                        aria-label={`Quick add ${p.name}`}
                        className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                          isAdded
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-100 hover:bg-[#08271d] text-slate-600 hover:text-white"
                        }`}
                        title="Quick Add to Cart"
                      >
                        {isAdded ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <ShoppingBag className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Slim Footer */}
        <div className="px-3.5 py-2 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <span className="text-[10px] text-slate-400">
            <kbd className="px-1 py-0.5 rounded bg-white border border-slate-200 text-[9px]">↵</kbd> select · <kbd className="px-1 py-0.5 rounded bg-white border border-slate-200 text-[9px]">esc</kbd> close
          </span>

          <Link
            href="/shop"
            onClick={onClose}
            className="inline-flex items-center gap-1 font-bold text-[#08271d] hover:text-emerald-800 transition-colors"
          >
            <span>View All in Shop</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
