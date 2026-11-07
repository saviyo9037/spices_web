"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { defaultWeight } from "@/lib/catalog";
import QuickViewModal from "./QuickViewModal";

// "250g" / "1kg" -> grams, so a price per 100 g can be worked out from the real pack prices.
function grams(label) {
  const m = /(\d+(?:\.\d+)?)\s*(kg|g)\b/i.exec(label || "");
  if (!m) return null;
  return m[2].toLowerCase() === "kg" ? parseFloat(m[1]) * 1000 : parseFloat(m[1]);
}

// Featured product card, built to sit two to a row on a phone.
// Phones: a compact vertical card. The pack sizes are a 2-column grid of weight-only chips (every size
// visible, nothing scrolls) and the price and a short "Add" button follow.
// From sm: the roomier card with taste notes, price on each chip, quick view and price per 100 g.
// The add button turns into a quantity stepper once the chosen pack is in the cart.
export default function ProductCardAdvanced({ product }) {
  const { items, addToCart, updateQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const weights = (product.weights || []).slice(0, 4);
  const [selected, setSelected] = useState(defaultWeight(product));
  const [quickOpen, setQuickOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const price = selected ? selected.price : product.price;
  const originalPrice = selected ? selected.originalPrice : product.originalPrice;
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPct = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const g = grams(selected?.label);
  const per100 = g ? Math.round((price / g) * 100) : null;

  const packLabel = selected?.label || "Standard";
  const inCart = items.find((i) => i.id === product.id && i.weight === packLabel);
  const qty = inCart?.quantity || 0;
  const fav = isInWishlist(product.id);
  const notes = (product.tastingNotes || []).slice(0, 2);

  const add = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    addToCart(product, selected, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };
  const step = (d) => updateQuantity(product.id, packLabel, qty + d);

  const cta =
    qty > 0 ? (
      <div role="group" aria-label={`${product.name} quantity in cart`} className="flex min-h-[44px] w-full items-center justify-between rounded-full bg-[#123B22] p-0.5 text-white sm:min-h-[46px] sm:p-1">
        <button type="button" onClick={() => step(-1)} aria-label="Remove one" className="grid h-10 w-10 cursor-pointer touch-manipulation place-items-center rounded-full transition hover:bg-white/15 active:scale-90">
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>
        <span className="text-sm font-extrabold" aria-live="polite">
          {qty}
          <span className="hidden sm:inline"> in cart</span>
        </span>
        <button type="button" onClick={() => step(1)} aria-label="Add one more" className="grid h-10 w-10 cursor-pointer touch-manipulation place-items-center rounded-full bg-[#F5B900] text-[#062D1B] transition hover:bg-[#ffcb2e] active:scale-90">
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    ) : (
      <button
        type="button"
        onClick={add}
        aria-label={`Add ${product.name} ${selected?.label || ""} to cart`}
        className={`flex min-h-[44px] w-full cursor-pointer touch-manipulation items-center justify-center gap-1.5 rounded-full px-3 text-sm font-extrabold transition-all duration-300 active:scale-[0.96] sm:min-h-[46px] sm:gap-2 sm:px-5 ${
          justAdded ? "bg-[#70A82C] text-white" : "bg-[#123B22] text-white shadow-lg shadow-[#123B22]/20 hover:bg-[#F5B900] hover:text-[#062D1B]"
        }`}
      >
        <ShoppingBag className="h-4 w-4" aria-hidden="true" />
        {justAdded ? (
          "Added"
        ) : (
          <>
            Add<span className="hidden sm:inline"> to cart</span>
          </>
        )}
      </button>
    );

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.1rem] bg-white p-1.5 shadow-[0_1px_2px_rgba(9,37,21,0.06),0_10px_22px_-16px_rgba(9,37,21,0.4)] ring-1 ring-[#123B22]/10 transition-all duration-300 hover:-translate-y-1 hover:ring-[#70A82C]/50 sm:rounded-[1.6rem] sm:p-2">
      {/* Photo */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[0.8rem] bg-gradient-to-br from-[#F4F8EC] to-[#F6F1E4] sm:rounded-[1.2rem]">
        <Link href={`/product/${product.slug}`} tabIndex={-1} aria-hidden="true" className="absolute inset-0 block">
          <Image
            src={product.image}
            alt=""
            fill
            loading="lazy"
            sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 22vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
          />
        </Link>
        {discountPct > 0 && (
          <span className="pointer-events-none absolute bottom-1.5 left-1.5 rounded-full bg-[#F5B900] px-2 py-0.5 text-[10px] font-extrabold text-[#062D1B] shadow sm:bottom-2 sm:left-2 sm:px-2.5 sm:py-1 sm:text-[11px]">
            {discountPct}% OFF
          </span>
        )}
        {product.badge && (
          <span className="pointer-events-none absolute left-1.5 top-1.5 max-w-[calc(100%-3rem)] truncate rounded-full bg-[#123B22] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#F5C842] shadow sm:left-2 sm:top-2 sm:max-w-[calc(100%-3.5rem)] sm:px-2.5 sm:py-1 sm:text-[10px]">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={fav ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={fav}
          className="absolute right-1 top-1 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-full transition active:scale-90 sm:right-2 sm:top-2"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow backdrop-blur sm:h-9 sm:w-9">
            <Heart className={`h-4 w-4 sm:h-[18px] sm:w-[18px] ${fav ? "fill-rose-500 text-rose-500" : "text-[#123B22]/80"}`} aria-hidden="true" />
          </span>
        </button>
        <button
          type="button"
          onClick={() => setQuickOpen(true)}
          aria-label={`Quick view ${product.name}`}
          className="absolute bottom-2 right-2 z-10 hidden h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/90 text-[#123B22] shadow-md backdrop-blur transition hover:bg-[#F5B900] active:scale-90 sm:grid sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:focus-visible:translate-y-0 sm:focus-visible:opacity-100"
        >
          <Eye className="h-[18px] w-[18px]" aria-hidden="true" />
        </button>
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col px-1 pb-1 pt-2.5 sm:px-2.5 sm:pb-2.5 sm:pt-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="hidden truncate text-[10px] font-bold uppercase tracking-[0.16em] text-[#3f6a12] sm:block">{product.categoryName}</span>
          <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#123B22]">
            <Star className="h-3 w-3 fill-[#F5B900] text-[#F5B900]" aria-hidden="true" />
            {product.rating}
          </span>
        </div>

        <h3 className="mt-1 min-h-[2.5rem] font-serif text-[15px] font-semibold leading-snug text-[#123B22] sm:min-h-0 sm:text-lg">
          <Link href={`/product/${product.slug}`} className="line-clamp-2 after:absolute after:inset-0 after:z-0 hover:text-[#B07D22] focus:outline-none focus-visible:text-[#B07D22]">
            {product.name}
          </Link>
        </h3>

        {notes.length > 0 && (
          <ul className="mt-2 hidden flex-wrap gap-1.5 sm:flex">
            {notes.map((n) => (
              <li key={n} className="rounded-full bg-[#70A82C]/12 px-2.5 py-0.5 text-[11px] font-semibold text-[#3f6a12]">{n}</li>
            ))}
          </ul>
        )}

        {/* pack sizes: a 2-column grid of weight chips on phones, one row of weight + price chips from sm */}
        {weights.length > 1 && (
          <div role="group" aria-label={`Pack size for ${product.name}`} className="relative z-10 mt-2 grid grid-cols-2 gap-1.5 sm:mt-3 sm:grid-cols-4">
            {weights.map((w, i) => {
              const on = selected?.label === w.label;
              const alone = weights.length % 2 === 1 && i === weights.length - 1;
              return (
                <button
                  key={w.label}
                  type="button"
                  onClick={() => setSelected(w)}
                  aria-pressed={on}
                  aria-label={`${w.label}, ${w.price} rupees`}
                  className={`flex min-h-[38px] cursor-pointer touch-manipulation flex-col items-center justify-center rounded-xl border px-1 py-1 leading-tight transition-all sm:min-h-[52px] sm:rounded-2xl sm:py-1.5 ${alone ? "col-span-2 sm:col-span-1" : ""} ${
                    on ? "border-[#123B22] bg-[#123B22] text-white shadow-md" : "border-[#123B22]/20 bg-white text-[#123B22] hover:border-[#70A82C]"
                  }`}
                >
                  <span className="text-[13px] font-extrabold">{w.label}</span>
                  <span className={`mt-0.5 hidden text-[11px] font-semibold sm:block ${on ? "text-[#F5B900]" : "text-[#123B22]/70"}`}>₹{w.price}</span>
                </button>
              );
            })}
          </div>
        )}

        <div className="relative z-10 mt-auto pt-3 sm:pt-3.5">
          <div className="mb-2 sm:mb-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-xl font-bold leading-none text-[#123B22] sm:text-2xl">₹{price}</span>
              {hasDiscount && <span className="text-xs leading-none text-[#123B22]/60 line-through">₹{originalPrice}</span>}
            </div>
            {per100 && <p className="mt-1 hidden text-[11px] font-medium text-[#123B22]/70 sm:block">₹{per100} per 100 g</p>}
          </div>
          {cta}
        </div>
      </div>

      {quickOpen && (
        <QuickViewModal product={product} selected={selected} onSelect={setSelected} onAdd={add} added={justAdded} onClose={() => setQuickOpen(false)} />
      )}
    </article>
  );
}
