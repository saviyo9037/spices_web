"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

// Hero carousel slides — 4 high-quality spice images
const SLIDES = [
  {
    src: "/images/Idukki Spices_ Pepper and Aromatic Treasures.png",
    alt: "Hanging green peppercorns and wooden bowls of black pepper, cardamom, turmeric, cinnamon, cloves and red chillies",
    mobilePos: "object-bottom",
    desktopPos: "object-[78%_center] lg:object-right",
  },
  {
    src: "/hero-slides/hero-slide-1.jpg",
    alt: "Colourful assortment of Indian spices — turmeric, red chilli, cumin, star anise and cinnamon on dark slate",
    mobilePos: "object-center",
    desktopPos: "object-center",
  },
  {
    src: "/hero-slides/hero-slide-3.jpg",
    alt: "Golden turmeric and red chilli powder in wooden spoons and bowls",
    mobilePos: "object-center",
    desktopPos: "object-center",
  },
  {
    src: "/hero-slides/hero-slide-2.jpg",
    alt: "Close-up of premium green cardamom pods from Idukki, Kerala",
    mobilePos: "object-center",
    desktopPos: "object-center",
  },
  {
    src: "/images/hero-banner.jpg",
    alt: "Wooden bowls of turmeric, red chilli and spices with lush green Idukki hill plantation at golden sunset",
    mobilePos: "object-bottom",
    desktopPos: "object-center",
  },
];

export default function HeroSection() {
  const rootRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoRef = useRef(null);
  // Touch swipe state
  const touchStartX = useRef(null);

  const goTo = useCallback((idx) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((idx + SLIDES.length) % SLIDES.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    autoRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(autoRef.current);
  }, []);

  // Reset timer when user manually navigates
  const resetAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
  }, []);

  const handlePrev = () => { prev(); resetAuto(); };
  const handleNext = () => { next(); resetAuto(); };
  const handleDot = (i) => { goTo(i); resetAuto(); };

  // Touch swipe handlers
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? handleNext() : handlePrev(); }
    touchStartX.current = null;
  };

  // GSAP entrance animation (runs once)
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-reveal]",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 0.2 }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-[#062D1B] text-white min-h-[640px] sm:min-h-[700px] lg:min-h-[760px] flex items-center"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Ambient bokeh glows ── */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(245,185,0,0.25)_0%,rgba(245,185,0,0.08)_40%,transparent_70%)] blur-2xl z-10" />
      <div aria-hidden="true" className="pointer-events-none absolute top-12 left-28 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(112,168,44,0.22)_0%,transparent_70%)] blur-xl z-10" />
      <div aria-hidden="true" className="pointer-events-none absolute top-28 left-4 h-24 w-24 rounded-full bg-[#F5B900]/20 blur-lg z-10" />

      {/* ── Slide images (cross-fade) ── */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== current}
          className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Mobile: full-bleed cover */}
          <div className="absolute inset-0 sm:hidden">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              className={`object-cover ${slide.mobilePos}`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#062D1B] via-[#062D1B]/80 via-50% to-[#062D1B]/20" />
          </div>

          {/* Tablet & desktop: right-side panel */}
          <div className="absolute top-0 bottom-0 right-0 hidden h-full w-full sm:block sm:w-[72%] lg:w-[65%] xl:w-[68%]">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(min-width: 1024px) 68vw, 72vw"
              priority={i === 0}
              className={`object-cover ${slide.desktopPos}`}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#062D1B] via-[#062D1B]/40 to-transparent via-25% lg:via-20%" />
          </div>
        </div>
      ))}

      {/* ── Hero Content Left Column ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-32 sm:pt-36 lg:pt-32 pb-24 sm:pb-28">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Eyebrow */}
          <div data-reveal className="inline-flex items-center gap-2">
            <Leaf className="h-4 w-4 text-[#70A82C]" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#F5B900]">
              From the Hills of Idukki —
            </span>
          </div>

          {/* Headline */}
          <h1
            id="hero-heading"
            data-reveal
            className="mt-4 font-serif text-[clamp(2.75rem,6.2vw,5rem)] font-bold italic leading-[1.02] tracking-tight text-white"
          >
            Idukki, The Land
            <span className="relative block not-italic text-[#F5B900] mt-1">
              Of Spices
              <svg aria-hidden="true" viewBox="0 0 280 20" fill="none" className="absolute -bottom-2 left-0 w-44 sm:w-60 h-auto text-[#70A82C]">
                <path d="M4 14C55 5 160 3 276 11C230 16 120 18 4 14Z" fill="currentColor" />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p data-reveal className="mt-6 max-w-md sm:max-w-lg text-sm sm:text-base leading-relaxed text-white/90 font-medium">
            Handpicked, naturally grown spices from the misty hills of Idukki, Kerala.
          </p>

          {/* 3 Feature Badges */}
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

        {/* ── Carousel Controls Row ── */}
        <div data-reveal className="mt-10 sm:mt-12 flex items-center justify-between w-full pt-4">
          {/* Prev / Next arrows */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-white/25 bg-black/30 backdrop-blur-xs flex items-center justify-center text-white/80 hover:bg-black/50 hover:text-white transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-white/25 bg-black/30 backdrop-blur-xs flex items-center justify-center text-white/80 hover:bg-black/50 hover:text-white transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Slide indicators">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => handleDot(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === current
                    ? "h-2 w-6 sm:w-7 bg-[#F5B900]"
                    : "h-2 w-2 bg-white/60 hover:bg-white/90"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Torn-paper bottom edge ── */}
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
