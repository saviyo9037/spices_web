"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { Search, SlidersHorizontal, Sparkles, Heart } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialTab = searchParams.get("tab") || "all";

  const { wishlistIds } = useWishlist();

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [onlyWishlist, setOnlyWishlist] = useState(initialTab === "wishlist");

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== "all" && p.category !== selectedCategory) {
          return false;
        }
        // Wishlist filter
        if (onlyWishlist && !wishlistIds.includes(p.id)) {
          return false;
        }
        // Organic filter
        if (onlyOrganic && !p.organic) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q) ||
            p.origin.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return b.reviewsCount - a.reviewsCount; // popular
      });
  }, [selectedCategory, onlyWishlist, onlyOrganic, searchQuery, sortBy, wishlistIds]);

  return (
    <div className="bg-[#faf7f2] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#c69238] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Farm Direct Catalog</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#143627] tracking-tight">
            The Spice Market
          </h1>
          <p className="text-sm sm:text-base text-[#5c6c64] max-w-2xl mt-2">
            Explore our complete collection of single-origin Indian whole spices, small-batch cold-milled powders, and artisanal heritage masalas.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#e6dfd5] shadow-xs mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <Search className="w-4 h-4 text-[#87978f] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, region, or spice..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-sm text-[#143627] placeholder-[#87978f] focus:outline-none focus:border-[#143627]"
              />
            </div>

            {/* Sort & Quick Toggles */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              {/* Wishlist Toggle Button */}
              <button
                onClick={() => setOnlyWishlist(!onlyWishlist)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                  onlyWishlist
                    ? "bg-[#c69238] text-[#143627] border-[#c69238]"
                    : "bg-[#faf7f2] text-[#5c6c64] border-[#e6dfd5] hover:bg-white"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${onlyWishlist ? "fill-current" : ""}`} />
                <span>Wishlist ({wishlistIds.length})</span>
              </button>

              {/* Organic Toggle */}
              <label className="flex items-center gap-2 text-xs font-semibold text-[#143627] cursor-pointer select-none bg-[#faf7f2] px-3.5 py-2 rounded-xl border border-[#e6dfd5]">
                <input
                  type="checkbox"
                  checked={onlyOrganic}
                  onChange={(e) => setOnlyOrganic(e.target.checked)}
                  className="rounded text-[#143627] focus:ring-[#143627]"
                />
                <span>Organic Only</span>
              </label>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#87978f] hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-xs font-semibold text-[#143627] focus:outline-none"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Categories Pill Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-[#f3eee4] no-scrollbar">
            <span className="text-xs font-bold uppercase tracking-wider text-[#87978f] shrink-0 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" />
              Category:
            </span>
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-[#143627] text-white"
                  : "bg-[#faf7f2] text-[#5c6c64] hover:bg-[#e6dfd5]"
              }`}
            >
              All Spices ({products.length})
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === c.slug
                    ? "bg-[#143627] text-white"
                    : "bg-[#faf7f2] text-[#5c6c64] hover:bg-[#e6dfd5]"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#5c6c64] mb-6 px-1">
          <span>
            Showing <strong className="text-[#143627]">{filteredProducts.length}</strong> spices
            {onlyWishlist && " in your wishlist"}
            {selectedCategory !== "all" && ` under "${selectedCategory}"`}
          </span>
          {(selectedCategory !== "all" || onlyWishlist || onlyOrganic || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                setOnlyWishlist(false);
                setOnlyOrganic(false);
                setSearchQuery("");
              }}
              className="text-[#c69238] hover:underline font-semibold"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#e6dfd5] max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#faf7f2] text-[#87978f] flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#143627] mb-2">
              No spices matched your filter
            </h3>
            <p className="text-xs text-[#5c6c64] mb-6">
              Try adjusting your search criteria, switching categories, or clearing wishlist filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setOnlyWishlist(false);
                setOnlyOrganic(false);
                setSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-full bg-[#143627] text-white text-xs font-bold uppercase tracking-wider"
            >
              Show All Spices
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-20 text-center font-serif text-lg text-[#143627]">Loading Spice Market...</div>}>
      <ShopContent />
    </Suspense>
  );
}
