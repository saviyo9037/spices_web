"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { defaultWeight } from "@/lib/catalog";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const weights = product.weights || [];
  const [selected, setSelected] = useState(defaultWeight(product));
  const [addedAnim, setAddedAnim] = useState(false);
  const isFavorited = isInWishlist(product.id);

  const price = selected ? selected.price : product.price;
  const originalPrice = selected ? selected.originalPrice : product.originalPrice;

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
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-xs transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden bg-paper">
        <Link href={`/product/${product.slug}`} className="absolute inset-0 block" aria-label={`View ${product.name}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 17vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-night shadow-xs">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isFavorited}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#5c6c64] shadow-xs transition-colors hover:bg-white hover:text-red-500"
        >
          <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif text-base font-bold leading-snug text-forest transition-colors group-hover:text-gold-ink line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <span className="mt-0.5 block text-[11px] text-[#7d8a83] line-clamp-1">
          {product.subtitle || product.tagline}
        </span>

        {weights.length > 1 && (
          <div role="group" aria-label={`Pack size for ${product.name}`} className="mt-3 flex flex-wrap gap-1.5">
            {weights.map((w) => (
              <button
                key={w.label}
                type="button"
                onClick={() => setSelected(w)}
                aria-pressed={selected?.label === w.label}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                  selected?.label === w.label
                    ? "border-forest bg-forest text-white"
                    : "border-line bg-white text-forest hover:border-gold"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="text-lg font-black text-forest">₹{price}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-xs text-[#999999] line-through">₹{originalPrice}</span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className={`mt-auto flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-bold transition-all duration-200 active:scale-95 ${
            addedAnim ? "bg-gold text-night" : "bg-forest text-white hover:bg-deep"
          } mt-4`}
        >
          {addedAnim ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
