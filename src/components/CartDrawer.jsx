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
  Lock,
  Tag,
  ShieldCheck,
  Sparkles,
  Gift,
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

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [showPromo, setShowPromo] = useState(false);

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

  const upsellItem = useMemo(() => {
    const itemIds = new Set(items.map((i) => i.id));
    return (
      products.find(
        (p) => !itemIds.has(p.id) && (p.badge === "Bestseller" || p.badge === "Organic")
      ) || null
    );
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
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={closeCart}
      />

      <aside
        className="cart-slide absolute inset-y-0 right-0 flex h-dvh w-full max-w-[420px] flex-col shadow-[0_0_80px_rgba(0,0,0,0.35)]"
        style={{
          background: "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(250,247,240,0.92) 50%, rgba(243,238,228,0.95) 100%)",
          backdropFilter: "blur(32px) saturate(180%)",
          WebkitBackdropFilter: "blur(32px) saturate(180%)",
          borderLeft: "1px solid rgba(255,255,255,0.6)",
        }}
      >
        {/* Decorative orbs */}
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #dfa84a 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -left-8 top-1/2 h-32 w-32 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #143627 0%, transparent 70%)" }}
        />

        {/* HEADER */}
        <header
          className="relative z-10 flex items-center justify-between px-6 py-5"
          style={{
            background: "linear-gradient(135deg, rgba(20,54,39,0.97) 0%, rgba(10,32,22,0.99) 100%)",
            boxShadow: "0 4px 24px rgba(20,54,39,0.25)",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #dfa84a, #c69238)",
                boxShadow: "0 4px 12px rgba(223,168,74,0.4)",
              }}
            >
              <ShoppingBag className="h-5 w-5 text-white" strokeWidth={1.75} />
            </span>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="font-serif text-xl font-bold tracking-tight text-white">Your Cart</h2>
                {cartCount > 0 && (
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-bold text-[#11261F]"
                    style={{ background: "linear-gradient(135deg, #dfa84a, #c69238)" }}
                  >
                    {cartCount}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-[10px] tracking-[0.2em] uppercase font-medium text-white/50">
                Authentic Kerala Harvest
              </p>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-all hover:bg-white/15 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* FREE SHIPPING BAR */}
        {items.length > 0 && (
          <div
            className="relative z-10 px-6 py-3.5"
            style={{
              background: "linear-gradient(90deg, rgba(20,54,39,0.06) 0%, rgba(223,168,74,0.08) 100%)",
              borderBottom: "1px solid rgba(230,223,213,0.6)",
            }}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-semibold text-[#0F2C1F]">
                {remaining > 0 ? (
                  <>
                    <Truck className="h-3.5 w-3.5 text-[#B87919] shrink-0" />
                    <span>Add <strong className="font-extrabold text-[#B87919]">Rs.{remaining}</strong> more for free shipping</span>
                  </>
                ) : (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 stroke-[2.5]" />
                    <span className="font-bold text-emerald-700">Free shipping unlocked!</span>
                  </>
                )}
              </span>
              <span className="text-[11px] font-bold text-[#B87919]">{progress}%</span>
            </div>
            <div
              className="mt-2 h-1.5 w-full overflow-hidden rounded-full"
              style={{ background: "rgba(184,121,25,0.15)" }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${progress}%`,
                  background: remaining === 0
                    ? "linear-gradient(90deg, #16a34a, #15803d)"
                    : "linear-gradient(90deg, #dfa84a, #B87919)",
                  boxShadow: remaining === 0
                    ? "0 0 8px rgba(22,163,74,0.5)"
                    : "0 0 8px rgba(223,168,74,0.6)",
                }}
              />
            </div>
          </div>
        )}

        {/* SCROLLABLE BODY */}
        <div className="relative z-10 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-16">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-3xl mb-5"
                style={{
                  background: "linear-gradient(135deg, rgba(223,168,74,0.15), rgba(20,54,39,0.08))",
                  border: "1.5px dashed rgba(223,168,74,0.4)",
                }}
              >
                <ShoppingBag className="h-8 w-8 text-[#B87919]/70" strokeWidth={1.3} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0F2C1F]">Your cart is empty</h3>
              <p className="mt-2 max-w-[220px] text-xs text-[#748078] leading-relaxed">
                Add single-origin spices, estate pepper or traditional blends from the hills of Idukki.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #143627, #0F2C1F)",
                  boxShadow: "0 8px 24px rgba(20,54,39,0.3)",
                }}
              >
                <Sparkles className="h-3.5 w-3.5 text-[#dfa84a]" />
                Browse Spices
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[#e6dfd5]/50">
              {items.map((item) => (
                <div key={`${item.id}-${item.weight}`} className="flex gap-4 py-4 first:pt-1 last:pb-2 group">
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={closeCart}
                    className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-2xl transition-all hover:scale-105"
                    style={{
                      boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
                      border: "1.5px solid rgba(223,168,74,0.2)",
                    }}
                  >
                    <Image src={item.image} alt={item.name} fill sizes="72px" className="object-cover" />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="font-serif text-sm font-bold text-[#0F2C1F] hover:text-[#B87919] leading-snug transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.weight)}
                        aria-label={`Remove ${item.name}`}
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[#9E9589] opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div
                      className="mt-1 inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-semibold text-[#143627]"
                      style={{ background: "rgba(20,54,39,0.08)" }}
                    >
                      {item.weight}
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      <div
                        className="inline-flex h-7 items-center rounded-full px-1 gap-0.5"
                        style={{
                          background: "rgba(255,255,255,0.8)",
                          border: "1px solid rgba(230,223,213,0.8)",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                        }}
                        role="group"
                        aria-label={`Quantity for ${item.name}`}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.weight, item.quantity - 1)}
                          aria-label="Decrease"
                          className="flex h-5 w-5 items-center justify-center rounded-full text-[#0F2C1F] hover:bg-[#143627] hover:text-white transition-all"
                        >
                          <Minus className="h-2.5 w-2.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-[#0F2C1F]" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.weight, item.quantity + 1)}
                          aria-label="Increase"
                          className="flex h-5 w-5 items-center justify-center rounded-full text-[#0F2C1F] hover:bg-[#143627] hover:text-white transition-all"
                        >
                          <Plus className="h-2.5 w-2.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-base font-bold text-[#0F2C1F]">Rs.{item.price * item.quantity}</span>
                        {item.originalPrice > item.price && (
                          <span className="ml-1.5 text-[11px] text-[#9E9589] line-through">Rs.{item.originalPrice * item.quantity}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Upsell */}
              {upsellItem && (
                <div
                  className="mt-1 rounded-2xl p-3.5"
                  style={{
                    background: "linear-gradient(135deg, rgba(223,168,74,0.1), rgba(20,54,39,0.06))",
                    border: "1px solid rgba(223,168,74,0.25)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl"
                      style={{ border: "1px solid rgba(223,168,74,0.3)", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                    >
                      <Image src={upsellItem.image} alt={upsellItem.name} fill sizes="44px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-[#B87919]">Pairs Well</span>
                      <p className="font-serif text-xs font-bold text-[#0F2C1F] line-clamp-1 leading-tight">{upsellItem.name}</p>
                      <p className="text-[11px] text-[#748078]">
                        {upsellItem.weights?.[0]?.label || "100g"} • <strong className="text-[#0F2C1F]">Rs.{upsellItem.weights?.[0]?.price || upsellItem.price}</strong>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToCart(upsellItem, upsellItem.weights?.[0], 1)}
                      className="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold text-white transition-all hover:scale-105 active:scale-95"
                      style={{ background: "linear-gradient(135deg, #143627, #0F2C1F)", boxShadow: "0 4px 10px rgba(20,54,39,0.3)" }}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              )}

              {/* Promo */}
              <div className="pt-3 pb-1">
                {appliedCoupon ? (
                  <div
                    className="flex items-center justify-between rounded-xl px-4 py-2.5 text-xs"
                    style={{
                      background: "linear-gradient(135deg, rgba(22,163,74,0.1), rgba(15,140,57,0.05))",
                      border: "1px solid rgba(22,163,74,0.3)",
                    }}
                  >
                    <span className="flex items-center gap-2 font-semibold text-emerald-800">
                      <Gift className="h-3.5 w-3.5 text-emerald-600" />
                      Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% off)
                    </span>
                    <button type="button" onClick={() => setAppliedCoupon(null)} className="text-[11px] font-bold text-emerald-700 hover:text-red-600 transition-colors">
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    {!showPromo ? (
                      <button
                        type="button"
                        onClick={() => setShowPromo(true)}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-[#748078] hover:text-[#B87919] transition-colors"
                      >
                        <Tag className="h-3.5 w-3.5 text-[#B87919]" />
                        Have a promo code?
                      </button>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter code (e.g. SPICE15)"
                          autoFocus
                          className="flex-1 rounded-xl px-3.5 py-2 text-xs text-[#0F2C1F] uppercase placeholder:normal-case placeholder:text-[#9E9589] focus:outline-none transition-all"
                          style={{
                            background: "rgba(255,255,255,0.85)",
                            border: "1.5px solid rgba(230,223,213,0.9)",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                          }}
                        />
                        <button
                          type="submit"
                          className="rounded-xl px-4 py-2 text-xs font-bold text-white transition-all hover:scale-105"
                          style={{ background: "linear-gradient(135deg, #143627, #0F2C1F)" }}
                        >
                          Apply
                        </button>
                      </form>
                    )}
                    {couponError && <p className="mt-1.5 text-[11px] font-medium text-red-500">{couponError}</p>}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        {items.length > 0 && (
          <footer
            className="safe-bottom-lg relative z-10 px-6 pt-5"
            style={{
              background: "linear-gradient(180deg, rgba(250,247,240,0.5) 0%, rgba(243,238,228,0.9) 100%)",
              borderTop: "1px solid rgba(230,223,213,0.7)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-xs text-[#748078]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#0F2C1F]">Rs.{cartSubtotal}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-xs text-emerald-700">
                  <span>Discount ({appliedCoupon.code})</span>
                  <span className="font-semibold">-Rs.{couponDiscount}</span>
                </div>
              )}
              {cartSavings > 0 && (
                <div className="flex justify-between text-xs text-emerald-700">
                  <span>You save</span>
                  <span className="font-semibold">Rs.{cartSavings}</span>
                </div>
              )}
              <div className="flex justify-between text-xs text-[#748078]">
                <span>Shipping</span>
                <span>
                  {shipping === 0
                    ? <span className="font-bold text-emerald-700">Free</span>
                    : <span className="font-semibold text-[#0F2C1F]">Rs.{shipping}</span>}
                </span>
              </div>
              <div
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 mt-1"
                style={{
                  background: "linear-gradient(135deg, rgba(20,54,39,0.07), rgba(223,168,74,0.08))",
                  border: "1px solid rgba(20,54,39,0.1)",
                }}
              >
                <div>
                  <span className="font-serif text-sm font-bold text-[#0F2C1F]">Total</span>
                  <p className="text-[10px] text-[#748078]">Taxes included</p>
                </div>
                <span className="font-serif text-2xl font-extrabold text-[#0F2C1F]">Rs.{finalTotal}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="group flex w-full items-center justify-between rounded-2xl px-6 py-4 text-sm font-bold tracking-wide text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #143627 0%, #0a1e14 100%)",
                boxShadow: "0 8px 32px rgba(20,54,39,0.35), 0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              <span className="flex items-center gap-2.5">
                <Lock className="h-4 w-4 text-[#dfa84a]" />
                <span>Checkout Securely</span>
              </span>
              <span className="flex items-center gap-1.5 font-extrabold">
                <span>Rs.{finalTotal}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>

            <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-[#748078]">
              <Link href="/cart" onClick={closeCart} className="hover:text-[#0F2C1F] underline underline-offset-2 transition-colors">
                View full cart
              </Link>
              <button type="button" onClick={closeCart} className="hover:text-[#0F2C1F] transition-colors">
                Continue shopping ->
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-[#9E9589]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#B87919]" />
              <span>100% Single Origin - Direct from Kerala - Secure Payment</span>
            </div>
          </footer>
        )}
      </aside>

      <style jsx global>{`
        .cart-slide {
          animation: cart-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes cart-in {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0%);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}
