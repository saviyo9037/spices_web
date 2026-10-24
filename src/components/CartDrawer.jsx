"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartCount,
    cartSavings,
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 499;
  const progressToFreeShipping = Math.min(
    100,
    Math.round((cartSubtotal / freeShippingThreshold) * 100)
  );
  const remainingForFree = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#faf7f2] shadow-2xl flex flex-col border-l border-[#e6dfd5]">
          {/* Header */}
          <div className="p-5 border-b border-[#e6dfd5] bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#143627]/10 flex items-center justify-center text-[#143627]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#143627]">
                  Your Spice Basket
                </h3>
                <p className="text-xs text-[#5c6c64]">
                  {cartCount} {cartCount === 1 ? "item" : "items"} selected
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="w-9 h-9 rounded-full bg-[#faf7f2] hover:bg-[#e6dfd5] flex items-center justify-center text-[#5c6c64] hover:text-[#16201b] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-[#f3eee4] px-5 py-3 border-b border-[#e6dfd5]">
            <div className="flex items-center justify-between text-xs font-medium text-[#143627] mb-1.5">
              <span>
                {remainingForFree > 0
                  ? `Add ₹${remainingForFree} more for FREE Express Delivery`
                  : "🎉 You have qualified for FREE Express Delivery!"}
              </span>
              <span className="font-bold">{progressToFreeShipping}%</span>
            </div>
            <div className="w-full h-2 bg-[#e6dfd5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#143627] rounded-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-[#f3eee4] flex items-center justify-center text-[#87978f] mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#143627] mb-2">
                  Your basket is empty
                </h4>
                <p className="text-xs text-[#5c6c64] max-w-xs mb-6">
                  Explore our single-origin whole spices, cold-stone milled powders, and aromatic heritage blends.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-full bg-[#143627] hover:bg-[#1c4b37] text-white text-sm font-semibold transition-colors"
                >
                  <Link href="/shop" onClick={closeCart}>
                    Explore Collection
                  </Link>
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.id}-${item.weight}`}
                  className="bg-white p-3.5 rounded-xl border border-[#e6dfd5] shadow-xs flex gap-3.5 items-center relative group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#faf7f2] shrink-0 border border-[#e6dfd5]/60">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeCart}
                      className="font-serif text-sm font-bold text-[#143627] hover:text-[#c69238] transition-colors line-clamp-1 block"
                    >
                      {item.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs bg-[#f3eee4] text-[#143627] font-medium px-2 py-0.5 rounded">
                        {item.weight}
                      </span>
                      <span className="text-xs text-[#87978f] line-through">
                        ₹{item.originalPrice}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      <span className="text-sm font-bold text-[#143627]">
                        ₹{item.price * item.quantity}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#e6dfd5] rounded-lg bg-[#faf7f2]">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.weight, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-[#5c6c64] hover:text-[#16201b] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-[#143627]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.weight, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-[#5c6c64] hover:text-[#16201b] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.weight)}
                    className="text-[#87978f] hover:text-red-600 transition-colors self-start p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-[#e6dfd5] space-y-3">
              {cartSavings > 0 && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>You are saving ₹{cartSavings} on this order!</span>
                </div>
              )}

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-[#5c6c64]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#16201b]">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between text-[#5c6c64]">
                  <span>Shipping</span>
                  <span className="font-semibold text-emerald-700">
                    {remainingForFree === 0 ? "FREE" : "₹49"}
                  </span>
                </div>
                <div className="border-t border-[#e6dfd5] pt-2 flex justify-between text-base font-bold text-[#143627]">
                  <span>Total</span>
                  <span>₹{cartSubtotal + (remainingForFree === 0 ? 0 : 49)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="px-4 py-2.5 rounded-xl border border-[#143627] text-[#143627] hover:bg-[#faf7f2] font-semibold text-xs tracking-wider uppercase text-center transition-colors flex items-center justify-center"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="px-4 py-2.5 rounded-xl bg-[#143627] hover:bg-[#1c4b37] text-white font-semibold text-xs tracking-wider uppercase text-center transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-[#143627]/20"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#87978f]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Secure Checkout | Direct Plantation Quality</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
