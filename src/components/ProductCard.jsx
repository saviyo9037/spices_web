"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [addedAnim, setAddedAnim] = useState(false);
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, null, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1500);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white border border-[#e6dfd5] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300">
      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-[#faf7f2] overflow-hidden p-4 flex items-center justify-center">
        <Link href={`/product/${product.slug}`} className="relative w-full h-full block">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Top-left Badge matching reference */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[#143627] text-[10px] font-bold tracking-wide uppercase shadow-xs ${
                product.badgeColor || "bg-[#dfa84a]"
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Top-right Wishlist Heart Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-xs transition-colors z-10 text-[#666666] hover:text-red-500"
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              isFavorited ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>
      </div>

      {/* Product Information */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-white border-t border-[#f3eee4]">
        <div>
          {/* Product Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-bold text-xs sm:text-sm text-[#181818] group-hover:text-[#b07d22] transition-colors leading-tight line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Subtitle / Spec */}
          <span className="text-[11px] text-[#888888] block mt-0.5">
            {product.subtitle || product.tagline}
          </span>

          {/* Star Rating and Count */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? "fill-current"
                      : "text-stone-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-[#666666]">
              {product.rating} ({product.reviewsCount})
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-base font-black text-[#181818]">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#999999] line-through font-normal">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button matching reference: dark green pill button with cart icon */}
        <button
          onClick={handleAddToCart}
          className={`w-full mt-3.5 py-2 px-3 rounded-lg font-bold text-xs transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs ${
            addedAnim
              ? "bg-[#dfa84a] text-[#143627]"
              : "bg-[#1c4b37] hover:bg-[#0f2c1f] text-white"
          }`}
        >
          {addedAnim ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
