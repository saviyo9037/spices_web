"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, BadgeCheck, ChevronLeft, ChevronRight, Leaf, MapPin, Sprout } from "lucide-react";

// Deterministic torn-paper edge path generator for seamless transition into white page sections
const TORN_PATH = (() => {
  const W = 1440;
  const pts = [];
  for (let x = 0; x <= W; x += 18) {
    const n =
      Math.sin(x * 0.011) * 9 +
      Math.sin(x * 0.047 + 1.3) * 7 +
      Math.sin(x * 0.19 + 0.4) * 4 +
      Math.sin(x * 0.53) * 2.5;
    pts.push(`${x},${(46 + n).toFixed(1)}`);
  }
  return `M0,100 L0,46 L${pts.join(" L")} L${W},100 Z`;
})();

export default function HeroSection() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-reveal]",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 0.2 }
      );
      gsap.fromTo("[data-photo]", { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power2.out" });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-[#062D1B] text-white min-h-[640px] sm:min-h-[700px] lg:min-h-[760px] flex items-center"
    >
      {/* Sunbeam & bokeh ambient lighting in top-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(245,185,0,0.25)_0%,rgba(245,185,0,0.08)_40%,transparent_70%)] blur-2xl z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-28 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(112,168,44,0.22)_0%,transparent_70%)] blur-xl z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-28 left-4 h-24 w-24 rounded-full bg-[#F5B900]/20 blur-lg z-10"
      />

      {/* Right side spice photo: full height, right-aligned, seamlessly blended on the left */}
      <div
        data-photo
        className="hero-photo absolute top-0 bottom-0 right-0 w-full sm:w-[72%] lg:w-[65%] xl:w-[68%] h-full z-0 pointer-events-none"
      >
        <Image
          src="/images/Idukki Spices_ Pepper and Aromatic Treasures.png"
          alt="Hanging green peppercorns and leaves above wooden bowls of black pepper, cardamom and turmeric with cinnamon, cloves, star anise and red chillies"
          fill
          priority
          sizes="(min-width: 1024px) 68vw, 100vw"
          className="object-cover object-[78%_center] lg:object-right"
        />

        {/* Seamless blend gradient along the left & top-left edges of the image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#062D1B] via-[#062D1B]/40 to-transparent via-25% lg:via-20%"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#062D1B]/80 via-transparent to-[#062D1B]/35 sm:hidden"
        />
      </div>

      {/* Hero Content Left Column */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-32 sm:pt-36 lg:pt-32 pb-24 sm:pb-28">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Eyebrow Tagline */}
          <div data-reveal className="inline-flex items-center gap-2">
            <Leaf className="h-4 w-4 text-[#70A82C]" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#F5B900]">
              From the Hills of Idukki —
            </span>
          </div>

          {/* Main Headline */}
          <h1
            id="hero-heading"
            data-reveal
            className="mt-4 font-serif text-[clamp(2.75rem,6.2vw,5rem)] font-bold italic leading-[1.02] tracking-tight text-white"
          >
            Idukki, The Land
            <span className="relative block not-italic text-[#F5B900] mt-1">
              Of Spices
              {/* Organic brush swoosh underline */}
              <svg
                aria-hidden="true"
                viewBox="0 0 280 20"
                fill="none"
                className="absolute -bottom-2 left-0 w-44 sm:w-60 h-auto text-[#70A82C]"
              >
                <path
                  d="M4 14C55 5 160 3 276 11C230 16 120 18 4 14Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            data-reveal
            className="mt-6 max-w-md sm:max-w-lg text-sm sm:text-base leading-relaxed text-white/90 font-medium"
          >
            Handpicked, naturally grown spices from the misty hills of Idukki, Kerala.
          </p>

          {/* 3 Feature Badges in a Row with subtle dividers */}
          <div data-reveal className="mt-7 flex items-center">
            <div className="flex flex-col items-center text-center gap-1.5 pr-6 sm:pr-8">
              <Sprout className="h-5 w-5 text-[#F5B900]" strokeWidth={1.75} aria-hidden="true" />
              <span className="text-xs font-semibold text-white/95 leading-tight">Naturally<br />Grown</span>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="flex flex-col items-center text-center gap-1.5 px-6 sm:px-8">
              <MapPin className="h-5 w-5 text-[#F5B900]" strokeWidth={1.75} aria-hidden="true" />
              <span className="text-xs font-semibold text-white/95 leading-tight">Directly<br />Sourced</span>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="flex flex-col items-center text-center gap-1.5 pl-6 sm:pr-8">
              <BadgeCheck className="h-5 w-5 text-[#F5B900]" strokeWidth={1.75} aria-hidden="true" />
              <span className="text-xs font-semibold text-white/95 leading-tight">Premium<br />Quality</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div data-reveal className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href="/spices"
              className="group inline-flex items-center gap-2 rounded-full bg-[#F5B900] px-6 sm:px-7 py-3 text-sm font-bold text-[#062D1B] shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffcb2e] active:scale-95"
            >
              Explore Our Spices
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center rounded-full border border-white/40 bg-black/25 backdrop-blur-xs px-6 sm:px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F5B900] hover:text-[#F5B900] active:scale-95"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Bottom controls row (carousel arrows & pagination dots) */}
        <div data-reveal className="mt-10 sm:mt-12 flex items-center justify-between w-full pt-4">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              aria-label="Previous slide"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-white/25 bg-black/30 backdrop-blur-xs flex items-center justify-center text-white/80 hover:bg-black/50 hover:text-white transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-white/25 bg-black/30 backdrop-blur-xs flex items-center justify-center text-white/80 hover:bg-black/50 hover:text-white transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-2 w-6 sm:w-7 rounded-full bg-[#F5B900]" />
            <span className="h-2 w-2 rounded-full bg-white/75" />
            <span className="h-2 w-2 rounded-full bg-white/75" />
            <span className="h-2 w-2 rounded-full bg-white/75" />
          </div>
        </div>
      </div>

      {/* Torn-paper bottom edge transition */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-px left-0 z-20 h-[56px] w-full sm:h-[72px]"
      >
        <path d={TORN_PATH} fill="#FFFFFF" />
      </svg>
    </section>
  );
}
