"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Eye, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { defaultWeight } from "@/lib/catalog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import QuickViewModal from "./QuickViewModal";

// Minimal featured product card: photo, name, price, a small pack-size dropdown (shadcn DropdownMenu)
// and one add button. The add button turns into a quantity stepper once the chosen pack is in the cart.
export default function ProductCardAdvanced({ product }) {
  const { items, addToCart, updateQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const weights = product.weights || [];
  const [selected, setSelected] = useState(defaultWeight(product));
  const [quickOpen, setQuickOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const price = selected ? selected.price : product.price;
  const originalPrice = selected ? selected.originalPrice : product.originalPrice;
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPct = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const packLabel = selected?.label || "Standard";
  const inCart = items.find((i) => i.id === product.id && i.weight === packLabel);
  const qty = inCart?.quantity || 0;
  const fav = isInWishlist(product.id);

  const add = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    addToCart(product, selected, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };
  const step = (d) => updateQuantity(product.id, packLabel, qty + d);

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-[#123B22]/10 bg-white p-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#123B22]/25 sm:p-2.5">
      {/* Photo */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#F4F8EC]">
        <Link href={`/product/${product.slug}`} tabIndex={-1} aria-hidden="true" className="absolute inset-0 block">
          <Image
            src={product.image}
            alt=""
            fill
            loading="lazy"
            sizes="(max-width: 767px) 46vw, (max-width: 1279px) 30vw, 380px"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
          />
        </Link>
        {discountPct > 0 && (
          <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-bold text-[#123B22] shadow-sm">
            {discountPct}% off
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={fav ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={fav}
          className="absolute right-1 top-1 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-full transition active:scale-90"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/95 shadow-sm">
            <Heart className={`h-4 w-4 ${fav ? "fill-rose-500 text-rose-500" : "text-[#123B22]/80"}`} aria-hidden="true" />
          </span>
        </button>
        <button
          type="button"
          onClick={() => setQuickOpen(true)}
          aria-label={`Quick view ${product.name}`}
          className="absolute bottom-2 right-2 z-10 hidden h-9 w-9 cursor-pointer place-items-center rounded-full bg-white/95 text-[#123B22] shadow-sm transition hover:bg-[#F5B900] active:scale-90 md:grid md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100"
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col px-1 pb-1 pt-3">
        <h3 className="min-h-[2.5rem] font-serif text-[15px] font-semibold leading-snug text-[#123B22] sm:min-h-[1.75rem] sm:text-lg">
          <Link href={`/product/${product.slug}`} className="line-clamp-2 after:absolute after:inset-0 after:z-0 hover:text-[#B07D22] focus:outline-none focus-visible:text-[#B07D22]">
            {product.name}
          </Link>
        </h3>

        {/* price on the left, pack-size dropdown on the right */}
        <div className="relative z-10 mt-2 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-baseline gap-1.5">
            <span className="font-serif text-xl font-bold leading-none text-[#123B22] sm:text-2xl">₹{price}</span>
            {hasDiscount && <span className="text-xs leading-none text-[#123B22]/60 line-through">₹{originalPrice}</span>}
          </div>

          {weights.length > 1 ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label={`Pack size for ${product.name}: ${packLabel} selected`}
                className="group inline-flex h-9 shrink-0 cursor-pointer touch-manipulation items-center gap-1 text-sm font-bold text-[#123B22] outline-none transition hover:text-[#B07D22] focus-visible:underline focus-visible:decoration-[#F5B900] focus-visible:decoration-2 focus-visible:underline-offset-4 data-[state=open]:text-[#B07D22]"
              >
                {packLabel}
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Pack size</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={packLabel} onValueChange={(v) => setSelected(weights.find((w) => w.label === v) || selected)}>
                  {weights.map((w) => (
                    <DropdownMenuRadioItem key={w.label} value={w.label}>
                      <span>{w.label}</span>
                      <span className="text-xs font-semibold text-[#123B22]/70">₹{w.price}</span>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <span className="shrink-0 text-xs font-bold text-[#123B22]/70">{packLabel}</span>
          )}
        </div>

        {/* one action */}
        <div className="relative z-10 mt-auto pt-3">
          {qty > 0 ? (
            <div role="group" aria-label={`${product.name} quantity in cart`} className="flex min-h-[44px] w-full items-center justify-between rounded-full border border-[#123B22] p-0.5 text-[#123B22]">
              <button type="button" onClick={() => step(-1)} aria-label="Remove one" className="grid h-10 w-10 cursor-pointer touch-manipulation place-items-center rounded-full transition hover:bg-[#123B22]/10 active:scale-90">
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="text-sm font-extrabold" aria-live="polite">
                {qty}
                <span className="hidden sm:inline"> in cart</span>
              </span>
              <button type="button" onClick={() => step(1)} aria-label="Add one more" className="grid h-10 w-10 cursor-pointer touch-manipulation place-items-center rounded-full bg-[#123B22] text-white transition hover:bg-[#1c5336] active:scale-90">
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={add}
              aria-label={`Add ${product.name} ${packLabel} to cart`}
              className={`flex min-h-[44px] w-full cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-full text-sm font-bold transition-all duration-200 active:scale-[0.97] ${
                justAdded ? "bg-[#70A82C] text-white" : "bg-[#123B22] text-white hover:bg-[#1c5336]"
              }`}
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              {justAdded ? "Added" : "Add to cart"}
            </button>
          )}
        </div>
      </div>

      {quickOpen && (
        <QuickViewModal product={product} selected={selected} onSelect={setSelected} onAdd={add} added={justAdded} onClose={() => setQuickOpen(false)} />
      )}
    </article>
  );
}
