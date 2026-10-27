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
  Check,
  ArrowLeft,
  KeyRound,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Single-Origin",
    subtitle: "Pure, lab-certified whole & ground spices",
  },
  {
    icon: MapPin,
    title: "Direct from Idukki Farmers",
    subtitle: "High-altitude harvest from Munnar & Kumily",
  },
  {
    icon: Truck,
    title: "Pan-India Express Delivery",
    subtitle: "Aroma-locked nitrogen sealed packaging",
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
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center py-6 sm:py-10 lg:py-14 px-4 sm:px-6 lg:px-8 bg-[#faf8f5]">
      {/* Centered Master Card with Layered Shadow */}
      <div className="w-full max-w-5xl xl:max-w-6xl bg-white rounded-3xl shadow-[0_30px_90px_-20px_rgba(8,39,29,0.18)] border border-[#e6dfd5]/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[660px]">
        
        {/* ========================================================================= */}
        {/* LEFT BRAND PANEL (Visual Storytelling & Depth - approx 48% on desktop)     */}
        {/* ========================================================================= */}
        <div className="relative isolate lg:col-span-5 xl:col-span-6 flex flex-col justify-between p-7 sm:p-10 lg:p-12 text-white overflow-hidden min-h-[460px] lg:min-h-full bg-[#08271d]">
          {/* Background Image: Idukki hills, golden sunset, cardamom, peppercorns, cinnamon sticks */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/golden-spice-valley.png"
              alt="Golden Spice Valley sunset over Idukki hills with fresh cardamom, pepper, and cinnamon"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center scale-102 transition-transform duration-1000 ease-out"
            />

            {/* Cinematic Multi-Tier Gradient Overlays */}
            {/* Top vignette for logo readability */}
            <div
              className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#051c15]/95 via-[#08271d]/75 to-transparent"
              aria-hidden="true"
            />
            {/* Overall ambient warmth */}
            <div
              className="absolute inset-0 bg-[#08271d]/45 mix-blend-multiply"
              aria-hidden="true"
            />
            {/* Bottom dark gradient to anchor the text and spices */}
            <div
              className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#051c15] via-[#08271d]/85 to-transparent"
              aria-hidden="true"
            />
          </div>

          {/* Top Brand Logo & Seal */}
          <div className="relative z-10 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group"
              aria-label="Idukki Spices Home"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/25 shadow-lg flex items-center justify-center text-[#dfa84a] group-hover:scale-105 group-hover:border-[#dfa84a]/50 transition-all duration-300">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#dfa84a]"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                </svg>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#dfa84a] transition-colors leading-none">
                  Idukki Spices
                </span>
                <span className="block text-[10px] font-mono tracking-[0.25em] text-[#dfa84a] uppercase mt-1 font-semibold">
                  Estate Reserve • Kerala
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-mono font-semibold tracking-wider text-white/80 uppercase">
              Est. 1984
            </span>
          </div>

          {/* Middle Storytelling & Headline */}
          <div className="relative z-10 my-6 sm:my-8 lg:my-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfa84a]/20 backdrop-blur-md border border-[#dfa84a]/30 text-[11px] font-semibold text-[#f0c274] tracking-wide mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#dfa84a]" />
              <span>Direct From Kerala Highlands</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl xl:text-4xl font-bold tracking-tight text-white leading-[1.15]">
              Authentic Spices from{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f0c274] via-[#dfa84a] to-[#c69238]">
                Idukki
              </span>
            </h2>

            <p className="text-white/85 text-xs sm:text-sm mt-3 max-w-md leading-relaxed font-normal">
              Bring the rich flavours of Idukki straight to your kitchen.
            </p>

            {/* Feature Cards - Refined Glassmorphism with Micro-Details */}
            <div className="mt-5 sm:mt-6 space-y-2.5">
              {features.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-3.5 p-2.5 sm:p-3 rounded-2xl bg-black/25 backdrop-blur-xl border border-white/15 hover:border-[#dfa84a]/40 hover:bg-black/35 transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#dfa84a]/25 to-[#dfa84a]/5 border border-[#dfa84a]/35 text-[#dfa84a] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                      <IconComponent className="w-4 h-4 text-[#dfa84a]" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#f0c274] transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-white/70 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Footnote / Farmer Trust Tag */}
          <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-white/75">
            <span className="flex items-center gap-1.5 truncate">
              <Leaf className="w-3.5 h-3.5 text-[#dfa84a] shrink-0" />
              <span className="truncate">Cured in traditional wood-fired kilns</span>
            </span>
            <span className="font-mono text-[10px] text-[#dfa84a] font-bold shrink-0 tracking-wider">
              100% PURE & UNADULTERATED
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT LOGIN PANEL (Warm Ivory #FAF6EE, Professional & High-Conversion)    */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 xl:col-span-6 bg-[#FAF6EE] p-6 sm:p-10 md:p-12 xl:p-14 flex flex-col justify-between">
          
          {/* Top Quick Navigation Breadcrumb */}
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5c6c64] hover:text-[#08271d] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Return to Shop</span>
            </Link>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#08271d]/6 border border-[#08271d]/12 text-[10px] font-mono font-bold uppercase tracking-wider text-[#08271d]">
              <Sparkles className="w-3 h-3 text-[#dfa84a]" />
              <span>Customer Portal</span>
            </div>
          </div>

          {/* Main Form Block */}
          <div className="max-w-md mx-auto w-full my-auto py-2">
            
            {/* Heading & Subtitle */}
            <div className="mb-6">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#08271d] tracking-tight">
                Welcome Back
              </h1>
              <p className="text-xs sm:text-sm text-[#5c6c64] mt-1.5 leading-relaxed">
                Log in to manage orders, saved spice favorites, and quick checkout.
              </p>
            </div>

            {/* Testing Demo Account Banner - Designed with Precision */}
            <div className="mb-6 p-3 sm:p-3.5 rounded-2xl bg-white border border-[#dfa84a]/40 bg-gradient-to-r from-amber-50/60 to-white flex items-center justify-between text-xs shadow-2xs">
              <div className="flex items-center gap-2 text-[#08271d]">
                <KeyRound className="w-4 h-4 text-[#dfa84a] shrink-0" />
                <span className="font-medium text-[11px] sm:text-xs">Testing demo account?</span>
              </div>
              <button
                type="button"
                onClick={handleDemoFill}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#08271d] hover:bg-[#103b2d] text-white text-[11px] font-bold tracking-wide transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
              >
                <span>Auto-fill demo</span>
                <Sparkles className="w-3 h-3 text-[#dfa84a]" />
              </button>
            </div>

            {/* The Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Email Address */}
              <div>
                <label
                  htmlFor="email-address"
                  className="block text-[11px] font-bold uppercase tracking-wider text-[#08271d] mb-1.5 font-mono"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="email-address"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 h-12 rounded-xl bg-white border border-[#e6dfd5] hover:border-slate-300 text-sm font-medium text-[#08271d] placeholder:text-slate-400 focus:outline-none focus:border-[#08271d] focus:ring-4 focus:ring-[#08271d]/8 transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label
                    htmlFor="password-field"
                    className="text-[11px] font-bold uppercase tracking-wider text-[#08271d] font-mono"
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
                    className="text-xs font-semibold text-[#5c6c64] hover:text-[#08271d] hover:underline transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="password-field"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 h-12 rounded-xl bg-white border border-[#e6dfd5] hover:border-slate-300 text-sm font-medium text-[#08271d] placeholder:text-slate-400 focus:outline-none focus:border-[#08271d] focus:ring-4 focus:ring-[#08271d]/8 transition-all shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#08271d] p-1 rounded-md transition-colors cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-2 pt-0.5">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#08271d] border-slate-300 focus:ring-[#08271d] accent-[#08271d] cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="text-xs text-[#5c6c64] font-medium cursor-pointer select-none"
                >
                  Remember this device for 30 days
                </label>
              </div>

              {/* Primary Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 h-12 sm:h-13 rounded-xl bg-gradient-to-r from-[#061d15] via-[#0a271c] to-[#061d15] hover:from-[#0d3324] hover:to-[#123e2d] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl shadow-[#08271d]/25 active:scale-[0.99] cursor-pointer disabled:opacity-75 group ring-1 ring-white/10"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </div>
                ) : (
                  <>
                    <span>SIGN IN TO ACCOUNT</span>
                    <ArrowRight className="w-4 h-4 text-[#dfa84a] group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Create Account Divider & Link */}
            <div className="mt-6 pt-5 border-t border-[#e6dfd5] text-center text-xs text-[#5c6c64]">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/signup"
                className="font-bold text-[#08271d] hover:text-[#dfa84a] underline decoration-[#dfa84a]/40 underline-offset-4 transition-colors"
              >
                Create an account &rarr;
              </Link>
            </div>
          </div>

          {/* Bottom Security Trust Bar */}
          <div className="mt-4 pt-4 border-t border-[#e6dfd5]/70 flex items-center justify-center gap-6 text-[11px] text-[#5c6c64]">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#08271d]" />
              <span>256-Bit SSL Encrypted</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#dfa84a]" />
              <span>Verified Portal</span>
            </span>
          </div>

        </div>
      </div>
    </main>
  );
}
