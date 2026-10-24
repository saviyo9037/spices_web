"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Building,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function CheckoutPage() {
  const { items, cartSubtotal, cartCount, clearCart } = useCart();
  const { addToast } = useToast();

  const [step, setStep] = useState("form"); // 'form' or 'confirmed'
  const [orderId, setOrderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "Rohan",
    lastName: "Menon",
    email: "rohan.menon@example.com",
    phone: "9876543210",
    address: "Flat 402, Green Glen Layout, Bellandur",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560103",
  });

  const [paymentMethod, setPaymentMethod] = useState("upi"); // upi, card, netbanking, cod

  const freeShippingThreshold = 499;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingCost = cartCount > 0 ? (isFreeShipping ? 0 : 49) : 0;
  const grandTotal = cartSubtotal + shippingCost;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (
      !shippingInfo.firstName ||
      !shippingInfo.email ||
      !shippingInfo.phone ||
      !shippingInfo.address ||
      !shippingInfo.pincode
    ) {
      addToast("Please complete all shipping address fields.", "error");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = "MS-" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setIsSubmitting(false);
      setStep("confirmed");
      clearCart();
      addToast(`Order ${generatedId} placed successfully!`, "success");
    }, 1200);
  };

  if (step === "confirmed") {
    return (
      <div className="bg-[#faf7f2] min-h-[80vh] flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#e6dfd5] shadow-xl max-w-lg w-full text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Order Confirmed</span>
            </div>
            <h1 className="font-serif text-3xl font-black text-[#143627]">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-[#5c6c64] mt-2">
              Your plantation-fresh spice box is being prepared for express dispatch.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e6dfd5] text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-[#87978f]">Order ID:</span>
              <strong className="text-[#143627] font-mono">{orderId}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#87978f]">Recipient:</span>
              <span className="text-[#143627] font-semibold">
                {shippingInfo.firstName} {shippingInfo.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#87978f]">Delivery Address:</span>
              <span className="text-[#143627] font-semibold text-right max-w-xs">
                {shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#87978f]">Payment Method:</span>
              <span className="text-[#143627] uppercase font-bold">
                {paymentMethod === "upi" ? "Instant UPI" : paymentMethod}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#e6dfd5] font-bold text-sm text-[#143627]">
              <span>Amount Paid:</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 text-left flex items-start gap-2">
            <Truck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              Expected delivery: <strong>2 - 3 business days</strong> with tracking updates sent to {shippingInfo.email}.
            </span>
          </div>

          <Link
            href="/"
            className="w-full py-3.5 rounded-xl bg-[#143627] hover:bg-[#1c4b37] text-white text-xs font-bold uppercase tracking-wider transition-all block text-center shadow-md"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#faf7f2] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-3xl p-10 text-center border border-[#e6dfd5] max-w-md w-full shadow-xs">
          <ShoppingBag className="w-12 h-12 text-[#87978f] mx-auto mb-3" />
          <h2 className="font-serif text-xl font-bold text-[#143627] mb-2">
            Your basket is empty
          </h2>
          <p className="text-xs text-[#5c6c64] mb-6">
            Please add some spices to your basket before checking out.
          </p>
          <Link
            href="/shop"
            className="px-6 py-2.5 rounded-full bg-[#143627] text-white text-xs font-bold uppercase tracking-wider"
          >
            Explore Spices
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#faf7f2] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#c69238] mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#143627]">
            Complete Your Order
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Shipping & Payment (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Shipping Address Section */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e6dfd5] shadow-xs">
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-[#f3eee4]">
                  <div className="w-8 h-8 rounded-full bg-[#143627] text-[#dfa84a] flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#143627]">
                    Shipping &amp; Delivery Address
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#143627] mb-1.5">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.firstName}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          firstName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-sm text-[#143627] focus:outline-none focus:border-[#143627]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#143627] mb-1.5">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.lastName}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          lastName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-sm text-[#143627] focus:outline-none focus:border-[#143627]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#143627] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-sm text-[#143627] focus:outline-none focus:border-[#143627]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#143627] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-sm text-[#143627] focus:outline-none focus:border-[#143627]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#143627] mb-1.5">
                      Street Address &amp; Apartment *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          address: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-sm text-[#143627] focus:outline-none focus:border-[#143627]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#143627] mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.city}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          city: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-sm text-[#143627] focus:outline-none focus:border-[#143627]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#143627] mb-1.5">
                      State &amp; PIN Code *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            state: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-sm text-[#143627] focus:outline-none focus:border-[#143627]"
                      />
                      <input
                        type="text"
                        required
                        value={shippingInfo.pincode}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            pincode: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-sm text-[#143627] focus:outline-none focus:border-[#143627]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e6dfd5] shadow-xs">
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-[#f3eee4]">
                  <div className="w-8 h-8 rounded-full bg-[#143627] text-[#dfa84a] flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#143627]">
                    Select Payment Method
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* UPI Option */}
                  <label
                    className={`flex items-center gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "upi"
                        ? "border-[#143627] bg-[#faf7f2] shadow-xs"
                        : "border-[#e6dfd5] hover:bg-[#faf7f2]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="text-[#143627] focus:ring-[#143627]"
                    />
                    <div className="w-10 h-10 rounded-xl bg-[#143627]/10 flex items-center justify-center text-[#143627] shrink-0">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-[#143627]">
                        Instant UPI (Google Pay, PhonePe, Paytm, BHIM)
                      </div>
                      <div className="text-xs text-[#5c6c64]">
                        Zero transaction fees &bull; Instant confirmation
                      </div>
                    </div>
                  </label>

                  {/* Card Option */}
                  <label
                    className={`flex items-center gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "card"
                        ? "border-[#143627] bg-[#faf7f2] shadow-xs"
                        : "border-[#e6dfd5] hover:bg-[#faf7f2]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="text-[#143627] focus:ring-[#143627]"
                    />
                    <div className="w-10 h-10 rounded-xl bg-[#143627]/10 flex items-center justify-center text-[#143627] shrink-0">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-[#143627]">
                        Credit / Debit Cards
                      </div>
                      <div className="text-xs text-[#5c6c64]">
                        Visa, Mastercard, RuPay, American Express
                      </div>
                    </div>
                  </label>

                  {/* Net Banking */}
                  <label
                    className={`flex items-center gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "netbanking"
                        ? "border-[#143627] bg-[#faf7f2] shadow-xs"
                        : "border-[#e6dfd5] hover:bg-[#faf7f2]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="netbanking"
                      checked={paymentMethod === "netbanking"}
                      onChange={() => setPaymentMethod("netbanking")}
                      className="text-[#143627] focus:ring-[#143627]"
                    />
                    <div className="w-10 h-10 rounded-xl bg-[#143627]/10 flex items-center justify-center text-[#143627] shrink-0">
                      <Building className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-[#143627]">
                        Net Banking (All Indian Banks)
                      </div>
                      <div className="text-xs text-[#5c6c64]">
                        HDFC, SBI, ICICI, Axis, Kotak &amp; 50+ Banks
                      </div>
                    </div>
                  </label>

                  {/* COD */}
                  <label
                    className={`flex items-center gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-[#143627] bg-[#faf7f2] shadow-xs"
                        : "border-[#e6dfd5] hover:bg-[#faf7f2]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="text-[#143627] focus:ring-[#143627]"
                    />
                    <div className="w-10 h-10 rounded-xl bg-[#143627]/10 flex items-center justify-center text-[#143627] shrink-0">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-[#143627]">
                        Cash on Delivery (COD)
                      </div>
                      <div className="text-xs text-[#5c6c64]">
                        Pay cash or UPI upon delivery at your doorstep
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Review Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e6dfd5] shadow-xs space-y-5">
                <h3 className="font-serif text-xl font-bold text-[#143627] pb-3 border-b border-[#f3eee4]">
                  Order Items ({cartCount})
                </h3>

                {/* Items Mini List */}
                <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.weight}`}
                      className="flex items-center gap-3 text-xs"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#faf7f2] border border-[#e6dfd5] shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[#143627] truncate">
                          {item.name}
                        </div>
                        <div className="text-[#87978f]">
                          {item.weight} &times; {item.quantity}
                        </div>
                      </div>
                      <div className="font-bold text-[#143627]">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cost Breakdown */}
                <div className="pt-4 border-t border-[#f3eee4] space-y-2 text-xs text-[#5c6c64]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#16201b]">₹{cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Express Air Courier</span>
                    <span className="font-bold text-emerald-700">
                      {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (GST)</span>
                    <span className="text-[#87978f]">Included</span>
                  </div>
                  <div className="pt-3 border-t border-[#f3eee4] flex justify-between text-base font-black text-[#143627]">
                    <span>Total Due</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#143627] hover:bg-[#1c4b37] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#143627]/20 hover:scale-[1.01]"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>Place Spice Order &bull; ₹{grandTotal}</span>
                      <ArrowRight className="w-4 h-4 text-[#dfa84a]" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#87978f]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Safe &amp; Secure Direct Plantation Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
