"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function SignupPage() {
  const router = useRouter();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      addToast("Please fill in all registration fields.", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast("Account created successfully! Welcome to Spices Heritage Club.", "success");
      router.push("/shop");
    }, 800);
  };

  return (
    <div className="bg-[#faf7f2] min-h-[85dvh] flex items-center justify-center py-16 px-4">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#e6dfd5] shadow-xl max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="w-10 h-10 rounded-xl bg-[#143627] flex items-center justify-center text-[#dfa84a] font-serif font-black text-xl shadow-md">
              S
            </div>
          </Link>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#c69238] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Our Heritage Club</span>
          </div>
          <h1 className="font-serif text-3xl font-black text-[#143627]">
            Create an Account
          </h1>
          <p className="text-xs text-[#5c6c64] mt-1">
            Enjoy 15% off your first harvest order, member tastings, and faster checkout.
          </p>
        </div>

        {/* Benefits Strip */}
        <div className="mb-6 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>15% Welcome Discount (Coupon <strong>SPICE15</strong>)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Early Access to Reserve Single-Estate Batches</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#143627] mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#87978f] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Rohan Menon"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-sm text-[#143627] focus:outline-none focus:border-[#143627]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#143627] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#87978f] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-sm text-[#143627] focus:outline-none focus:border-[#143627]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#143627] mb-1.5">
              Create Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#87978f] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-sm text-[#143627] focus:outline-none focus:border-[#143627]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#143627] hover:bg-[#1c4b37] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#143627]/20"
          >
            {loading ? (
              <span>Creating account...</span>
            ) : (
              <>
                <span>Create Spices Account</span>
                <ArrowRight className="w-4 h-4 text-[#dfa84a]" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link to Login */}
        <div className="mt-8 pt-6 border-t border-[#f3eee4] text-center text-xs text-[#5c6c64]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-[#143627] hover:text-[#c69238] underline"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
