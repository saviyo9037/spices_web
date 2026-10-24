"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Check,
  Tag,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartCount,
    cartSavings,
  } = useCart();
  const { addToast } = useToast();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    const clean = couponCode.trim().toUpperCase();

    if (clean === "SPICE15") {
      setAppliedCoupon({ code: "SPICE15", discountPercent: 15 });
      addToast("Coupon SPICE15 applied! You get 15% off.", "success");
    } else {
      setCouponError("Invalid promo code. Try using 'SPICE15'.");
    }
  };

  const freeShippingThreshold = 499;
  const discountAmount = appliedCoupon
    ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
    : 0;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingFee = cartCount > 0 ? (isFreeShipping ? 0 : 49) : 0;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  return (
    <div className="bg-[#faf7f2] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#c69238] mb-1">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Review Your Selection</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#143627]">
              Shopping Basket ({cartCount})
            </h1>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#143627] hover:text-[#c69238] transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#e6dfd5] max-w-lg mx-auto shadow-xs">
            <div className="w-20 h-20 rounded-full bg-[#faf7f2] text-[#87978f] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#143627] mb-2">
              Your basket is empty
            </h2>
            <p className="text-sm text-[#5c6c64] mb-8">
              Looks like you haven&apos;t added any estate spices yet. Explore our fresh harvest catalog!
            </p>
            <Link
              href="/shop"
              className="px-8 py-3.5 rounded-full bg-[#143627] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1c4b37] transition-all inline-block shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Shipping Alert */}
              <div className="p-4 rounded-2xl bg-white border border-[#e6dfd5] shadow-xs">
                <div className="flex items-center justify-between text-xs font-semibold text-[#143627] mb-2">
                  <span>
                    {isFreeShipping
                      ? "🎉 You have earned FREE Express Delivery across India!"
                      : `Add ₹${freeShippingThreshold - cartSubtotal} more to qualify for FREE shipping`}
                  </span>
                  <span className="font-bold">
                    {Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100))}%
                  </span>
                </div>
                <div className="w-full h-2 bg-[#f3eee4] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#143627] rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        (cartSubtotal / freeShippingThreshold) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-3xl border border-[#e6dfd5] overflow-hidden shadow-xs divide-y divide-[#f3eee4]">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.weight}`}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#faf7f2] border border-[#e6dfd5] shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/product/${item.slug}`}
                          className="font-serif text-base font-bold text-[#143627] hover:text-[#c69238] transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-[#f3eee4] text-[#143627] font-semibold px-2 py-0.5 rounded">
                            {item.weight}
                          </span>
                          <span className="text-xs text-[#87978f] line-through">
                            ₹{item.originalPrice}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#143627] block mt-1 sm:hidden">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#e6dfd5] rounded-xl bg-[#faf7f2] p-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.weight, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-[#5c6c64] hover:text-[#16201b]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#143627]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.weight, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-[#5c6c64] hover:text-[#16201b]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="hidden sm:block text-right min-w-[70px]">
                        <span className="font-bold text-base text-[#143627]">
                          ₹{item.price * item.quantity}
                        </span>
                        <span className="text-[10px] text-[#87978f] block">
                          (₹{item.price}/ea)
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id, item.weight)}
                        className="text-[#87978f] hover:text-red-600 transition-colors p-2"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Action */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={clearCart}
                  className="text-xs text-[#87978f] hover:text-red-600 transition-colors underline"
                >
                  Clear all items from basket
                </button>
              </div>
            </div>

            {/* Order Summary Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Promo Code Box */}
              <div className="p-6 rounded-3xl bg-white border border-[#e6dfd5] shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#143627] mb-3">
                  <Tag className="w-4 h-4 text-[#c69238]" />
                  <span>Have a Promo Code?</span>
                </div>

                {appliedCoupon ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% OFF)</span>
                    </div>
                    <button
                      onClick={() => setAppliedCoupon(null)}
                      className="text-emerald-700 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Try 'SPICE15'"
                        className="flex-1 px-3.5 py-2 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-xs uppercase font-bold text-[#143627] focus:outline-none focus:border-[#143627]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#143627] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1c4b37]"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] text-red-600">{couponError}</p>
                    )}
                  </form>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e6dfd5] shadow-xs space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#143627] pb-3 border-b border-[#f3eee4]">
                  Order Summary
                </h3>

                <div className="space-y-2 text-xs sm:text-sm text-[#5c6c64]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#16201b]">₹{cartSubtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Promo Discount ({appliedCoupon?.code})</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Express Shipping</span>
                    <span className="font-bold text-[#16201b]">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-700">FREE</span>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span className="text-[#87978f]">Included in price</span>
                  </div>

                  <div className="pt-3 border-t border-[#f3eee4] flex justify-between text-base sm:text-lg font-bold text-[#143627]">
                    <span>Estimated Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-4 rounded-xl bg-[#143627] hover:bg-[#1c4b37] text-white font-bold text-xs uppercase tracking-wider text-center transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#143627]/20 hover:scale-[1.01]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#dfa84a]" />
                </Link>

                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#87978f]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Safe &amp; Encrypted 256-bit Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
