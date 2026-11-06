"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import Image from "next/image";

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
    <div className="bg-[#FAF6EE] px-4 py-10 sm:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-[#062D1B]/15 ring-1 ring-[#123B22]/10 lg:grid-cols-5">
        {/* Brand panel */}
        <div className="relative isolate hidden overflow-hidden bg-[#062D1B] p-10 text-white lg:col-span-2 lg:flex lg:flex-col lg:justify-between">
          <Image src="/gallary/web-clove-buds.jpg" alt="" fill sizes="400px" className="-z-10 object-cover opacity-35" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#062D1B]/70 via-[#062D1B]/60 to-[#062D1B]" />
          <Link href="/" className="font-serif text-2xl font-semibold">Idukki Spices</Link>
          <div>
            <h2 className="font-serif text-3xl font-semibold leading-tight">
              Join the club,
              <span className="mt-1 block font-script text-[1.3em] font-bold text-[#F5B900]">save on your first order</span>
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-white/85">
              <li className="flex items-start gap-2.5"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F5B900]" aria-hidden="true" />15% welcome discount with coupon SPICE15</li>
              <li className="flex items-start gap-2.5"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F5B900]" aria-hidden="true" />Early access to reserve single-estate batches</li>
              <li className="flex items-start gap-2.5"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F5B900]" aria-hidden="true" />Faster checkout and saved favourites</li>
            </ul>
          </div>
        </div>

        <div className="p-7 sm:p-12 lg:col-span-3">
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#B87919]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Heritage club</span>
            </div>
            <h1 className="mt-2 font-serif text-3xl font-semibold text-[#123B22] sm:text-4xl">Create an account</h1>
            <p className="mt-2 text-sm text-[#123B22]/80">Enjoy 15% off your first order, member tastings and faster checkout.</p>
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
    </div>
  );
}
