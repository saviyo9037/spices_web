"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Crown, Flame, Heart, Leaf, MapPin, ShoppingBag, Sparkles, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { defaultWeight } from "@/lib/catalog";

function getBadgeConfig(badge) {
  if (!badge) return null;
  const b = badge.toLowerCase();
  if (b.includes("bestseller") || b.includes("best")) {
    return {
      label: badge,
      icon: Crown,
      className: "bg-[#103B2D] text-white border-white/20",
    };
  }
  if (b.includes("organic")) {
    return {
      label: badge,
      icon: Leaf,
      className: "bg-emerald-700 text-white border-white/20",
    };
  }
  if (b.includes("popular") || b.includes("hot")) {
    return {
      label: badge,
      icon: Flame,
      className: "bg-amber-600 text-white border-white/20",
    };
  }
  return {
    label: badge,
    icon: Sparkles,
    className: "bg-[#C58A27] text-white border-white/20",
  };
}

export default function ProductCard({ product, compact = false }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const weights = product.weights || [];
  const [selected, setSelected] = useState(defaultWeight(product));
  const [addedAnim, setAddedAnim] = useState(false);
  const isFavorited = isInWishlist(product.id);

  const price = selected ? selected.price : product.price;
  const originalPrice = selected ? selected.originalPrice : product.originalPrice;
  const discountPct =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const badgeConfig = getBadgeConfig(product.badge);
  const BadgeIcon = badgeConfig?.icon;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selected, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1500);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#103B2D]/35 hover:shadow-[0_20px_35px_-12px_rgba(16,59,45,0.13)] ring-1 ring-black/[0.02]">
      {/* Product Image Stage */}
      <div className={`relative ${compact ? "aspect-[5/4]" : "aspect-square"} w-full overflow-hidden bg-gradient-to-b from-[#FAF8F3] to-[#F1ECE2]`}>
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0 block"
          aria-label={`View ${product.name}`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          {/* Subtle top vignette for badge contrast */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/25 via-black/5 to-transparent"
          />
        </Link>

        {/* Badges Stack (Top-Left) */}
        <div className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {badgeConfig && (
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wide shadow-xs border ${badgeConfig.className}`}
            >
              <BadgeIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              <span>{badgeConfig.label}</span>
            </span>
          )}
          {discountPct > 0 && (
            <span className="inline-flex self-start items-center rounded-full bg-rose-600 text-white px-2 py-0.5 text-[9.5px] sm:text-[10px] font-extrabold tracking-tight shadow-xs">
              -{discountPct}%
            </span>
          )}
        </div>

        {/* Wishlist Button (Top-Right) */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isFavorited}
          className={`absolute right-2.5 top-2.5 sm:right-3 sm:top-3 z-10 flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-full backdrop-blur-md shadow-xs border transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer ${
            isFavorited
              ? "bg-rose-50 text-rose-600 border-rose-200"
              : "bg-white/85 text-stone-500 border-stone-200/60 hover:bg-white hover:text-rose-600"
          }`}
        >
          <Heart
            className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors ${
              isFavorited ? "fill-rose-500 text-rose-500" : ""
            }`}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className={`flex flex-1 flex-col ${compact ? "p-3" : "p-3 sm:p-4"}`}>
        {/* Origin Tag & Rating Row */}
        <div className="flex items-center justify-between gap-1.5 mb-1.5">
          <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-stone-400 truncate">
            <MapPin className="h-2.5 w-2.5 text-[#C58A27] shrink-0" />
            <span className="truncate">{product.origin ? product.origin.split(",")[0] : "Idukki, Kerala"}</span>
          </span>

          <div className="inline-flex items-center gap-1 rounded-md bg-amber-50/90 border border-amber-200/50 px-1.5 py-0.5 text-[10.5px] font-bold text-amber-800 shrink-0">
            <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-amber-400 text-amber-400" />
            <span>{product.rating || "4.9"}</span>
            <span className="text-stone-400 font-normal hidden sm:inline">
              ({product.reviewsCount || 120})
            </span>
          </div>
        </div>

        {/* Product Title */}
        <Link href={`/product/${product.slug}`} className="block">
          <h3
            className={`font-serif ${
              compact ? "text-[14px]" : "text-[15px] sm:text-base"
            } font-bold leading-snug text-[#103B2D] transition-colors group-hover:text-[#C58A27] line-clamp-1`}
          >
            {product.name}
          </h3>
        </Link>

        {/* Subtitle / Tagline */}
        <p className="mt-0.5 text-[11px] sm:text-xs text-stone-500 font-medium line-clamp-1">
          {product.subtitle || product.tagline}
        </p>

        {/* Pack Size / Weights Selector */}
        {weights.length > 1 && (
          <div
            role="group"
            aria-label={`Pack size for ${product.name}`}
            className="mt-2.5 flex flex-wrap gap-1"
          >
            {weights.map((w) => (
              <button
                key={w.label}
                type="button"
                onClick={() => setSelected(w)}
                aria-pressed={selected?.label === w.label}
                className={`rounded-md border px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold transition-all duration-150 cursor-pointer ${
                  selected?.label === w.label
                    ? "border-[#103B2D] bg-[#103B2D] text-white shadow-2xs"
                    : "border-stone-200/80 bg-stone-50 text-stone-600 hover:border-stone-300 hover:bg-stone-100"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        )}

        {/* Footer: Price + Add to Cart Button */}
        <div className="mt-auto pt-3 border-t border-stone-100">
          <div className="flex items-baseline justify-between gap-1">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-base sm:text-lg font-bold text-[#103B2D]">
                ₹{price}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-[11px] sm:text-xs text-stone-400 line-through">
                  ₹{originalPrice}
                </span>
              )}
            </div>
            {originalPrice && originalPrice > price && (
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                Save ₹{originalPrice - price}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className={`mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-xl py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-95 shadow-xs ${
              addedAnim
                ? "bg-emerald-700 text-white shadow-emerald-700/20"
                : "bg-[#103B2D] hover:bg-[#08271D] text-white shadow-[#103B2D]/15 hover:shadow-md"
            }`}
          >
            {addedAnim ? (
              <>
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" strokeWidth={2} />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
