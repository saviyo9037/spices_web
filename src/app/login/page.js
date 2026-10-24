"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function LoginPage() {
  const router = useRouter();
  const { addToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDemoFill = () => {
    setEmail("connoisseur@malabarspices.demo");
    setPassword("SpiceHeritage2025");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast("Please fill in email and password.", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast("Successfully logged in to Spices Heritage!", "success");
      router.push("/shop");
    }, 800);
  };

  return (
    <div className="bg-[#faf7f2] min-h-[85vh] flex items-center justify-center py-16 px-4">
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
            <span>Customer Portal</span>
          </div>
          <h1 className="font-serif text-3xl font-black text-[#143627]">
            Welcome Back
          </h1>
          <p className="text-xs text-[#5c6c64] mt-1">
            Log in to manage orders, saved spice favorites, and quick checkout.
          </p>
        </div>

        {/* Demo Credentials Quick Fill */}
        <div className="mb-6 p-3 rounded-2xl bg-[#faf7f2] border border-[#e6dfd5] flex items-center justify-between text-xs">
          <span className="text-[#5c6c64]">Testing demo account?</span>
          <button
            type="button"
            onClick={handleDemoFill}
            className="text-xs font-bold text-[#143627] hover:text-[#c69238] underline"
          >
            Auto-fill demo
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#143627] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#87978f] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-sm text-[#143627] focus:outline-none focus:border-[#143627]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#143627]">
                Password
              </label>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  addToast("Password reset link sent to demo email.", "info");
                }}
                className="text-xs text-[#87978f] hover:text-[#143627]"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#87978f] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
              <span>Signing in...</span>
            ) : (
              <>
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4 text-[#dfa84a]" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link to Signup */}
        <div className="mt-8 pt-6 border-t border-[#f3eee4] text-center text-xs text-[#5c6c64]">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/signup"
            className="font-bold text-[#143627] hover:text-[#c69238] underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
