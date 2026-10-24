"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Tag,
  Package,
  BookOpen,
  Heart,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      addToast("Please enter a valid email address.", "error");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      addToast("Thank you for subscribing to Spices updates!", "success");
      setEmail("");
    }, 600);
  };

  return (
    <section className="relative py-12 sm:py-16 bg-[#143627] text-white overflow-hidden">
      {/* Background Image: newsletter-background.jpg */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/newsletter-background.jpg"
          alt="Spices Banner Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#143627]/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left/Center: Form matching reference */}
          <div className="w-full lg:max-w-xl text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-white mb-2">
              <span className="text-[#dfa84a]">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                </svg>
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Stay Updated
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-white/70 mb-6">
              Get the latest offers, new arrivals and spice tips straight to your inbox.
            </p>

            {status === "success" ? (
              <div className="inline-flex items-center gap-2 p-3 rounded-full bg-[#1c4b37] text-[#f0c274] text-xs font-semibold border border-[#1c4b37]">
                <CheckCircle2 className="w-4 h-4" />
                <span>You are subscribed! Welcome to Spices.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative max-w-md mx-auto lg:mx-0">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-5 pr-32 py-3 rounded-full bg-white text-[#181818] placeholder-[#888888] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#dfa84a] shadow-md"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="absolute right-1 px-5 py-2 rounded-full bg-[#dfa84a] hover:bg-[#c69238] text-[#143627] font-bold text-xs transition-all duration-200 flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{status === "loading" ? "..." : "Subscribe"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: 4 circular feature icons with labels matching reference */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 shrink-0 text-center">
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-[#dfa84a] mb-2">
                <Tag className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium text-white/80">
                Exclusive Offers
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-[#dfa84a] mb-2">
                <Package className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium text-white/80">
                New Arrivals
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-[#dfa84a] mb-2">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium text-white/80">
                Recipe Tips
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-[#dfa84a] mb-2">
                <Heart className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium text-white/80">
                Health Benefits
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
