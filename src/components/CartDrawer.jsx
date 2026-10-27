"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Truck,
  Check,
  Sparkles,
  Lock,
  Tag,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { products } from "@/data/products";

const FREE_SHIPPING_AT = 499;
const SHIPPING_FEE = 49;

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    addToCart,
    cartSubtotal,
    cartCount,
    cartSavings,
  } = useCart();
  const { addToast } = useToast();
  const closeRef = useRef(null);

  // Promo code state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [showPromo, setShowPromo] = useState(false);

  // Close on ESC and lock background scroll
  useEffect(() => {
    if (!isCartOpen) return;
    const onKey = (e) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isCartOpen, closeCart]);

  // Curated complementary recommendation (1 or 2 items max, cleanly displayed)
  const upsellItem = useMemo(() => {
    const itemIds = new Set(items.map((i) => i.id));
    return products.find((p) => !itemIds.has(p.id) && (p.badge === "Bestseller" || p.badge === "Organic")) || null;
  }, [items]);

  const handleApplyCoupon = (e) => {
    if (e) e.preventDefault();
    setCouponError("");
    const clean = couponCode.trim().toUpperCase();
    if (clean === "SPICE15") {
      setAppliedCoupon({ code: "SPICE15", discountPercent: 15 });
      addToast("15% discount applied with SPICE15", "success");
      setCouponCode("");
      setShowPromo(false);
    } else {
      setCouponError("Invalid code. Use SPICE15 for 15% off.");
    }
  };

  if (!isCartOpen) return null;

  const remaining = Math.max(0, FREE_SHIPPING_AT - cartSubtotal);
  const progress = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_AT) * 100));
  const shipping = remaining === 0 || cartSubtotal === 0 ? 0 : SHIPPING_FEE;
  const couponDiscount = appliedCoupon
    ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
    : 0;
  const finalTotal = Math.max(0, cartSubtotal - couponDiscount + shipping);

  return (
    <div className="fixed inset-0 z-[120]" role="dialog" aria-modal="true" aria-label="Shopping Cart">
      {/* Dark backdrop blur */}
      <div
        className="cart-fade absolute inset-0 bg-[#0A1612]/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer Surface */}
      <aside className="cart-slide absolute inset-y-0 right-0 flex w-full max-w-[450px] flex-col bg-white text-[#11261F] shadow-2xl">
        {/* Header: Clean, refined luxury typography */}
        <header className="relative flex items-center justify-between border-b border-[#EBE3D5] px-6 py-5 bg-white">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF7F2] text-[#0F2C1F]">
              <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl font-bold tracking-tight text-[#0F2C1F]">
                  Your Cart
                </h2>
                {cartCount > 0 && (
                  <span className="rounded-full bg-[#0F2C1F] px-2 py-0.5 text-[11px] font-semibold text-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#748078] tracking-wider uppercase font-medium mt-0.5">
                Authentic Kerala Harvest
              </p>
            </div>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#748078] hover:bg-[#FAF7F2] hover:text-[#0F2C1F] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Free Shipping Milestone */}
        {items.length > 0 && (
          <div className="border-b border-[#EBE3D5] bg-[#FAF8F5] px-6 py-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-medium text-[#0F2C1F]">
                {remaining > 0 ? (
                  <>
                    <Truck className="h-3.5 w-3.5 text-[#B87919] shrink-0" />
                    <span>
                      Add <strong className="text-[#B87919] font-bold">₹{remaining}</strong> for free shipping
                    </span>
                  </>
                ) : (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-700 shrink-0 stroke-[2.5]" />
                    <span className="font-semibold text-emerald-800">
                      You have qualified for free shipping
                    </span>
                  </>
                )}
              </span>
              <span className="text-[11px] font-medium text-[#748078]">
                {progress}%
              </span>
            </div>

            {/* Delicate thin progress track (no bulky borders) */}
            <div
              className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#E8E0D2]"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                  remaining === 0 ? "bg-emerald-700" : "bg-[#B87919]"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Scrollable Cart Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
          {items.length === 0 ? (
            /* Empty State */
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF7F2] text-[#B87919] mb-4">
                <ShoppingBag className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0F2C1F]">Your cart is empty</h3>
              <p className="mt-2 max-w-xs text-xs sm:text-sm text-[#748078] leading-relaxed">
                Add single-origin spices, estate pepper or traditional blends from the hills of Idukki.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0F2C1F] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1a4431] transition-all"
              >
                <span>Browse Spices</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            /* Item List: Frameless luxury item rows with clean subtle dividers */
            <div className="divide-y divide-[#EBE3D5]">
              {items.map((item) => (
                <div key={`${item.id}-${item.weight}`} className="flex gap-4 py-4 first:pt-1 last:pb-2">
                  {/* Product Photograph */}
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={closeCart}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#FAF8F5] border border-[#EBE3D5]/60 hover:opacity-95 transition-opacity"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>

                  {/* Product Metadata & Actions */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="font-serif text-sm sm:text-base font-bold text-[#0F2C1F] hover:text-[#B87919] leading-snug transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.weight)}
                          aria-label={`Remove ${item.name}`}
                          className="text-[#9E9589] hover:text-red-600 transition-colors p-0.5"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <p className="mt-0.5 text-xs text-[#748078]">
                        Pack: <span className="font-medium text-[#0F2C1F]">{item.weight}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      {/* Minimalist Capsule Stepper */}
                      <div
                        className="inline-flex h-7 items-center rounded-full border border-[#DCD3C5] bg-[#FAF8F5] px-1"
                        role="group"
                        aria-label={`Quantity for ${item.name}`}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.weight, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="flex h-5 w-5 items-center justify-center rounded-full text-[#0F2C1F] hover:bg-white transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#0F2C1F]" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.weight, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="flex h-5 w-5 items-center justify-center rounded-full text-[#0F2C1F] hover:bg-white transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Line Item Price */}
                      <div className="text-right">
                        <span className="font-serif text-sm sm:text-base font-bold text-[#0F2C1F]">
                          ₹{item.price * item.quantity}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="ml-1.5 text-xs text-[#9E9589] line-through">
                            ₹{item.originalPrice * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Curated Single Pairing / Upsell Card (subtle & non-intrusive) */}
          {items.length > 0 && upsellItem && (
            <div className="mt-4 rounded-xl border border-[#EBE3D5] bg-[#FAF8F5] p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white border border-[#EBE3D5]/60">
                  <Image src={upsellItem.image} alt={upsellItem.name} fill sizes="48px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#B87919]">
                    Pairs Well
                  </span>
                  <p className="font-serif text-xs font-bold text-[#0F2C1F] line-clamp-1 leading-tight">
                    {upsellItem.name}
                  </p>
                  <p className="text-[11px] text-[#748078]">
                    {upsellItem.weights?.[0]?.label || "100g"} • <strong className="text-[#0F2C1F]">₹{upsellItem.weights?.[0]?.price || upsellItem.price}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => addToCart(upsellItem, upsellItem.weights?.[0], 1)}
                  className="rounded-full bg-[#0F2C1F] px-3.5 py-1 text-xs font-semibold text-white hover:bg-[#B87919] transition-colors shrink-0"
                >
                  + Add
                </button>
              </div>
            </div>
          )}

          {/* Clean Promo Code Toggle */}
          {items.length > 0 && (
            <div className="pt-2">
              {appliedCoupon ? (
                <div className="flex items-center justify-between rounded-lg bg-[#FAF8F5] px-3 py-2 text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-emerald-800">
                    <Tag className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% off)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setAppliedCoupon(null)}
                    className="text-[11px] font-semibold text-[#8C7A6B] hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  {!showPromo ? (
                    <button
                      type="button"
                      onClick={() => setShowPromo(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#748078] hover:text-[#0F2C1F] transition-colors"
                    >
                      <Tag className="h-3 w-3 text-[#B87919]" />
                      <span>Have a promo code?</span>
                    </button>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter code (e.g. SPICE15)"
                        className="flex-1 rounded-lg border border-[#DCD3C5] bg-white px-3 py-1.5 text-xs text-[#0F2C1F] uppercase placeholder:normal-case placeholder:text-[#9E9589] focus:border-[#0F2C1F] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="rounded-lg bg-[#0F2C1F] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#1a4431] transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponError && <p className="mt-1 text-[11px] text-red-600">{couponError}</p>}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer: Clean, modern checkout section without heavy nested borders */}
        {items.length > 0 && (
          <footer className="border-t border-[#EBE3D5] bg-white px-6 py-5">
            {/* Calculation summary */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#748078]">
                <span>Subtotal</span>
                <span className="font-medium text-[#0F2C1F]">₹{cartSubtotal}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Discount ({appliedCoupon.code})</span>
                  <span className="font-medium">-₹{couponDiscount}</span>
                </div>
              )}

              {cartSavings > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Savings</span>
                  <span className="font-medium">₹{cartSavings}</span>
                </div>
              )}

              <div className="flex justify-between text-[#748078]">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="font-semibold text-emerald-800">Free</span>
                  ) : (
                    <span className="font-medium text-[#0F2C1F]">₹{shipping}</span>
                  )}
                </span>
              </div>

              <div className="flex items-baseline justify-between border-t border-[#EBE3D5] pt-3 mt-2">
                <div>
                  <span className="font-serif text-base font-bold text-[#0F2C1F]">Estimated Total</span>
                  <p className="text-[10px] text-[#748078]">Taxes included</p>
                </div>
                <span className="font-serif text-2xl font-bold text-[#0F2C1F]">
                  ₹{finalTotal}
                </span>
              </div>
            </div>

            {/* Primary Action Button: Professional Dark Forest Green CTA */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="group mt-4 flex w-full items-center justify-between rounded-full bg-[#0F2C1F] px-6 py-3.5 text-sm font-semibold tracking-wide text-white hover:bg-[#183d2c] transition-all shadow-md active:scale-[0.99]"
            >
              <span className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-[#B87919]" />
                <span>Checkout</span>
              </span>
              <span className="flex items-center gap-1 font-bold">
                <span>₹{finalTotal}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            {/* View Full Cart Link */}
            <div className="mt-3 flex items-center justify-between text-xs font-medium text-[#748078]">
              <Link
                href="/cart"
                onClick={closeCart}
                className="hover:text-[#0F2C1F] underline transition-colors"
              >
                View detailed cart page
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="hover:text-[#0F2C1F] transition-colors"
              >
                Continue shopping
              </button>
            </div>

            {/* Trust statement */}
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#748078]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#B87919]" />
              <span>100% Single Origin • Direct from Kerala • Secure Payment</span>
            </div>
          </footer>
        )}
      </aside>
    </div>
  );
}
