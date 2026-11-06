"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Crown,
  Flame,
  Heart,
  Leaf,
  Eye,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { defaultWeight } from "@/lib/catalog";
import QuickViewModal from "./QuickViewModal";

// Map badge text → visual config
function getBadgeConfig(badge) {
  if (!badge) return null;
  const b = badge.toLowerCase();
  if (b.includes("bestseller") || b.includes("best seller"))
    return { label: badge, icon: Crown, bg: "#103B2D", text: "#F5C842" };
  if (b.includes("organic"))
    return { label: badge, icon: Leaf, bg: "#166534", text: "#BBF7D0" };
  if (b.includes("popular") || b.includes("hot"))
    return { label: badge, icon: Flame, bg: "#9A3412", text: "#FED7AA" };
  if (b.includes("harvest"))
    return { label: badge, icon: Sparkles, bg: "#7C2D12", text: "#FED7AA" };
  return { label: badge, icon: Sparkles, bg: "#92400E", text: "#FEF3C7" };
}

export default function ProductCard({ product, compact = false }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const weights = product.weights || [];
  const [selected, setSelected] = useState(defaultWeight(product));
  const [addedAnim, setAddedAnim] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const isFavorited = isInWishlist(product.id);

  const price = selected ? selected.price : product.price;
  const originalPrice = selected ? selected.originalPrice : product.originalPrice;
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPct = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const badge = getBadgeConfig(product.badge);
  const BadgeIcon = badge?.icon;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selected, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1600);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-white shadow-[0_1px_2px_rgba(9,37,21,0.06),0_14px_30px_-18px_rgba(9,37,21,0.35)] ring-1 ring-[#123B22]/10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_2px_4px_rgba(9,37,21,0.06),0_28px_44px_-20px_rgba(9,37,21,0.45)] hover:ring-[#70A82C]/50 sm:rounded-[1.6rem]">
      {/* IMAGE (framed inside the card) */}
      <div className="p-1.5 sm:p-2">
        <div className={`relative ${compact ? "aspect-[4/3]" : "aspect-square"} w-full overflow-hidden rounded-[1rem] bg-gradient-to-br from-[#F4F8EC] to-[#F6F1E4] sm:rounded-[1.2rem]`}>
          <Link
            href={`/product/${product.slug}`}
            tabIndex={-1}
            aria-hidden="true"
            className="absolute inset-0 block"
          >
            <Image
              src={product.image}
              alt=""
              fill
              loading="lazy"
              sizes="(max-width: 480px) 46vw, (max-width: 1280px) 30vw, 22vw"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
            />
          </Link>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/25 to-transparent" />

          {badge && (
            <span
              className="pointer-events-none absolute left-2 top-2 z-10 inline-flex max-w-[calc(100%-3.25rem)] items-center gap-1 rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-wider shadow-md sm:left-2.5 sm:top-2.5 sm:text-[10px]"
              style={{ backgroundColor: badge.bg, color: badge.text }}
            >
              <BadgeIcon className="h-2.5 w-2.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{badge.label}</span>
            </span>
          )}

          <button
            type="button"
            onClick={handleWishlistToggle}
            aria-label={isFavorited ? "Remove from wishlist" : "Save to wishlist"}
            aria-pressed={isFavorited}
            className={`absolute right-1.5 top-1.5 z-10 grid h-10 w-10 cursor-pointer touch-manipulation place-items-center rounded-full backdrop-blur-md transition-all duration-200 active:scale-90 sm:right-2 sm:top-2 ${
              isFavorited ? "bg-white text-rose-500 shadow-lg" : "bg-white/85 text-[#123B22]/80 shadow hover:bg-white hover:text-rose-500"
            }`}
          >
            <Heart className={`h-[18px] w-[18px] transition-transform duration-200 ${isFavorited ? "scale-110 fill-rose-500" : "fill-transparent"}`} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickOpen(true);
            }}
            aria-label={`Quick view ${product.name}`}
            className="absolute bottom-1.5 right-1.5 z-10 grid h-10 w-10 cursor-pointer touch-manipulation place-items-center rounded-full bg-white/90 text-[#123B22] shadow-md backdrop-blur-md transition-all duration-200 hover:bg-[#F5B900] active:scale-90 sm:bottom-2 sm:right-2 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:focus-visible:translate-y-0 sm:focus-visible:opacity-100"
          >
            <Eye className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>

          {discountPct > 0 && (
            <span className="pointer-events-none absolute bottom-2 left-2 z-10 rounded-full bg-[#F5B900] px-2.5 py-1 text-[10px] font-extrabold tracking-tight text-[#062D1B] shadow-md sm:bottom-2.5 sm:left-2.5 sm:text-[11px]">
              {discountPct}% OFF
            </span>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-1 flex-col px-3 pb-3 pt-1.5 sm:px-4 sm:pb-4">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[10px] font-bold uppercase tracking-[0.16em] text-[#3f6a12]">
            {product.categoryName || "Spice"}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#123B22]" aria-label={`Rated ${product.rating || 4.8} out of 5`}>
            <Star className="h-3 w-3 fill-[#F5B900] text-[#F5B900]" aria-hidden="true" />
            {product.rating || "4.8"}
            <span className="hidden font-medium text-[#123B22]/80 min-[420px]:inline">({product.reviewsCount || 120})</span>
          </span>
        </div>

        <h3 className="mt-1.5 font-serif text-[15px] font-semibold leading-snug text-[#123B22] sm:text-[17px]">
          <Link
            href={`/product/${product.slug}`}
            className="line-clamp-2 transition-colors duration-200 after:absolute after:inset-0 after:z-0 hover:text-[#B07D22] focus:outline-none focus-visible:text-[#B07D22]"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-0.5 line-clamp-1 text-[11px] font-medium text-[#123B22]/80 sm:text-xs">
          {product.subtitle || product.tagline}
        </p>

        {/* Weight selector: scrollable chips, 34px+ touch height */}
        {weights.length > 1 && (
          <div
            role="group"
            aria-label={`Weight options for ${product.name}`}
            className="relative z-10 -mx-1 mt-3 flex gap-1.5 overflow-x-auto px-1 pb-0.5 no-scrollbar"
          >
            {weights.slice(0, 4).map((w) => {
              const isActive = selected?.label === w.label;
              return (
                <button
                  key={w.label}
                  type="button"
                  onClick={() => setSelected(w)}
                  aria-pressed={isActive}
                  className={`min-h-[34px] shrink-0 cursor-pointer touch-manipulation rounded-full border px-3 text-[11px] font-bold transition-all duration-150 sm:text-xs ${
                    isActive
                      ? "border-[#123B22] bg-[#123B22] text-white shadow-sm"
                      : "border-[#123B22]/15 bg-white text-[#123B22]/80 hover:border-[#70A82C] hover:text-[#123B22]"
                  }`}
                >
                  {w.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Price + add to cart */}
        <div className="relative z-10 mt-auto pt-3.5">
          <div className="mb-2.5 flex items-end justify-between gap-2">
            <div className="flex flex-wrap items-baseline gap-x-1.5">
              <span className="font-serif text-xl font-bold leading-none text-[#123B22] sm:text-2xl">₹{price}</span>
              {hasDiscount && <span className="text-xs leading-none text-[#123B22]/80 line-through">₹{originalPrice}</span>}
            </div>
            {hasDiscount && (
              <span className="hidden shrink-0 rounded-full bg-[#70A82C]/15 px-2 py-1 text-[10px] font-extrabold text-[#3f6a12] min-[400px]:inline">
                Save ₹{originalPrice - price}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={addedAnim ? "Added to cart" : `Add ${product.name} to cart`}
            className={`flex min-h-[46px] w-full cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-full text-[13px] font-extrabold transition-all duration-300 active:scale-[0.96] ${
              addedAnim
                ? "bg-[#70A82C] text-white shadow-lg shadow-[#70A82C]/30"
                : "bg-[#123B22] text-white shadow-lg shadow-[#123B22]/25 hover:bg-[#F5B900] hover:text-[#062D1B] hover:shadow-[#F5B900]/30"
            }`}
          >
            {addedAnim ? (
              <>
                <Check className="h-4 w-4 shrink-0" strokeWidth={2.75} aria-hidden="true" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                <span>Add to cart</span>
              </>
            )}
          </button>
        </div>
      </div>

      {quickOpen && (
        <QuickViewModal
          product={product}
          selected={selected}
          onSelect={setSelected}
          onAdd={handleAddToCart}
          added={addedAnim}
          onClose={() => setQuickOpen(false)}
        />
      )}
    </article>
  );
}
