"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  MapPin,
  Truck,
  Leaf,
  ArrowLeft,
  KeyRound,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Single-Origin",
    subtitle: "Pure, lab-certified spices",
  },
  {
    icon: MapPin,
    title: "Direct from Idukki Farmers",
    subtitle: "High-altitude Munnar & Kumily harvest",
  },
  {
    icon: Truck,
    title: "Pan-India Express Delivery",
    subtitle: "Aroma-locked sealed packaging",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { addToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleDemoFill = () => {
    setEmail("connoisseur@malabarspices.demo");
    setPassword("SpiceHeritage2025");
    addToast("Demo account credentials filled into form.", "info");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast("Please fill in both email and password.", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast("Welcome back! Signed in to Idukki Spices.", "success");
      router.push("/shop");
    }, 750);
  };

  return (
    <main className="min-h-[calc(100dvh-68px)] flex items-center justify-center py-4 px-3 sm:px-6 bg-[#faf8f5]">
      {/* Centered Master Card with Balanced Dimensions */}
      <div className="w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(8,39,29,0.14)] border border-[#e6dfd5]/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* ========================================================================= */}
        {/* LEFT BRAND PANEL (Visual Storytelling - approx 46% on desktop)            */}
        {/* ========================================================================= */}
        <div className="relative isolate lg:col-span-5 flex flex-col justify-between p-5 sm:p-6 lg:p-7 text-white overflow-hidden min-h-[340px] lg:min-h-full bg-[#08271d]">
          {/* Background Image: Idukki hills, golden sunset, cardamom, peppercorns */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/golden-spice-valley.png"
              alt="Golden Spice Valley sunset over Idukki hills"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center"
            />

            {/* Cinematic Multi-Tier Gradient Overlays */}
            <div
              className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#051c15]/95 via-[#08271d]/75 to-transparent"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-[#08271d]/40 mix-blend-multiply"
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#051c15] via-[#08271d]/85 to-transparent"
              aria-hidden="true"
            />
          </div>

          {/* Top Brand Logo & Seal */}
          <div className="relative z-10 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group"
              aria-label="Idukki Spices Home"
            >
              <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-xl border border-white/25 shadow-md flex items-center justify-center text-[#dfa84a] group-hover:scale-105 transition-all">
                <svg
                  className="w-4 h-4 fill-current text-[#dfa84a]"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                </svg>
              </div>
              <div>
                <span className="block font-serif text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#dfa84a] transition-colors leading-none">
                  Idukki Spices
                </span>
                <span className="block text-[9px] font-mono tracking-[0.2em] text-[#dfa84a] uppercase mt-0.5 font-semibold">
                  Estate Reserve
                </span>
              </div>
            </Link>

            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[9px] font-mono font-semibold tracking-wider text-white/80 uppercase">
              Est. 1984
            </span>
          </div>

          {/* Middle Storytelling & Headline */}
          <div className="relative z-10 my-4 sm:my-5">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#dfa84a]/20 backdrop-blur-md border border-[#dfa84a]/30 text-[10px] font-semibold text-[#f0c274] tracking-wide mb-2.5">
              <Sparkles className="w-3 h-3 text-[#dfa84a]" />
              <span>Single-Origin Heritage</span>
            </div>

            <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              Authentic Spices from{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f0c274] via-[#dfa84a] to-[#c69238]">
                Idukki
              </span>
            </h2>

            <p className="text-white/85 text-[11px] sm:text-xs mt-1.5 max-w-sm leading-relaxed">
              Bring the rich flavours of Idukki straight to your kitchen.
            </p>

            {/* Feature Cards - Compact Glass Design */}
            <div className="mt-3.5 space-y-2">
              {features.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-black/25 backdrop-blur-xl border border-white/15 hover:border-[#dfa84a]/40 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#dfa84a]/25 to-[#dfa84a]/5 border border-[#dfa84a]/30 text-[#dfa84a] flex items-center justify-center shrink-0">
                      <IconComponent className="w-3.5 h-3.5 text-[#dfa84a]" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-white leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-white/70 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Footnote */}
          <div className="relative z-10 pt-3 border-t border-white/15 flex items-center justify-between text-[10px] text-white/75">
            <span className="flex items-center gap-1 truncate">
              <Leaf className="w-3 h-3 text-[#dfa84a] shrink-0" />
              <span className="truncate">Wood-fired cured</span>
            </span>
            <span className="font-mono text-[#dfa84a] font-bold shrink-0 tracking-wider">
              100% PURE
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT LOGIN PANEL (Warm Ivory #FAF6EE, Compact & Elegant)                 */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 bg-[#FAF6EE] p-5 sm:p-6 lg:p-7 xl:p-8 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            
            {/* Top Quick Navigation Breadcrumb */}
            <div className="flex items-center justify-between mb-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#5c6c64] hover:text-[#08271d] transition-colors group"
              >
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                <span>Return to Shop</span>
              </Link>

              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#08271d]/6 border border-[#08271d]/12 text-[9px] font-mono font-bold uppercase tracking-wider text-[#08271d]">
                <Sparkles className="w-2.5 h-2.5 text-[#dfa84a]" />
                <span>Customer Portal</span>
              </div>
            </div>

            {/* Heading & Subtitle */}
            <div className="mb-3.5">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#08271d] tracking-tight leading-tight">
                Welcome Back
              </h1>
              <p className="text-[11px] sm:text-xs text-[#5c6c64] mt-1 leading-normal">
                Log in to manage orders, saved spice favorites, and quick checkout.
              </p>
            </div>

            {/* Testing Demo Account Banner */}
            <div className="mb-3.5 px-3 py-1.5 rounded-xl bg-white border border-[#dfa84a]/40 bg-gradient-to-r from-amber-50/50 to-white flex items-center justify-between text-xs shadow-2xs">
              <div className="flex items-center gap-1.5 text-[#08271d]">
                <KeyRound className="w-3.5 h-3.5 text-[#dfa84a] shrink-0" />
                <span className="font-medium text-[11px]">Demo account?</span>
              </div>
              <button
                type="button"
                onClick={handleDemoFill}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#08271d] hover:bg-[#103b2d] text-white text-[10px] font-bold tracking-wide transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <span>Auto-fill demo</span>
                <Sparkles className="w-2.5 h-2.5 text-[#dfa84a]" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-3">
              
              {/* Email Address */}
              <div>
                <label
                  htmlFor="email-address"
                  className="block text-[10px] font-bold uppercase tracking-wider text-[#08271d] mb-1 font-mono"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="email-address"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-8.5 pr-3 h-10 rounded-lg bg-white border border-[#e6dfd5] hover:border-slate-300 text-xs font-medium text-[#08271d] placeholder:text-slate-400 focus:outline-none focus:border-[#08271d] focus:ring-2 focus:ring-[#08271d]/10 transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label
                    htmlFor="password-field"
                    className="text-[10px] font-bold uppercase tracking-wider text-[#08271d] font-mono"
                  >
                    Password
                  </label>
                  <a
                    href="#forgot-password"
                    onClick={(e) => {
                      e.preventDefault();
                      addToast(
                        "Password reset instructions sent to your email.",
                        "info"
                      );
                    }}
                    className="text-[11px] font-semibold text-[#5c6c64] hover:text-[#08271d] hover:underline transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="password-field"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-8.5 pr-9 h-10 rounded-lg bg-white border border-[#e6dfd5] hover:border-slate-300 text-xs font-medium text-[#08271d] placeholder:text-slate-400 focus:outline-none focus:border-[#08271d] focus:ring-2 focus:ring-[#08271d]/10 transition-all shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#08271d] p-0.5 rounded transition-colors cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-1.5 pt-0.5">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-[#08271d] border-slate-300 focus:ring-[#08271d] accent-[#08271d] cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="text-[11px] text-[#5c6c64] font-medium cursor-pointer select-none"
                >
                  Remember this device for 30 days
                </label>
              </div>

              {/* Primary Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 h-10.5 rounded-lg bg-gradient-to-r from-[#061d15] via-[#0a271c] to-[#061d15] hover:from-[#0d3324] hover:to-[#123e2d] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#08271d]/20 active:scale-[0.99] cursor-pointer disabled:opacity-75"
              >
                {loading ? (
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <>
                    <span>SIGN IN TO ACCOUNT</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#dfa84a]" />
                  </>
                )}
              </button>
            </form>

            {/* Create Account Divider & Link */}
            <div className="mt-3.5 pt-3 border-t border-[#e6dfd5] text-center text-[11px] text-[#5c6c64]">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/signup"
                className="font-bold text-[#08271d] hover:text-[#dfa84a] underline decoration-[#dfa84a]/40 underline-offset-4 transition-colors"
              >
                Create an account &rarr;
              </Link>
            </div>

            {/* Bottom Security Trust Bar */}
            <div className="mt-2.5 pt-2 border-t border-[#e6dfd5]/60 flex items-center justify-center gap-4 text-[10px] text-[#5c6c64]">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#08271d]" />
                <span>256-Bit SSL Encrypted</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#dfa84a]" />
                <span>Verified Portal</span>
              </span>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
