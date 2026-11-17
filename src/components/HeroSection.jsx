"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, BadgeCheck, Leaf, MapPin, Sprout } from "lucide-react";

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
const HERO_MOBILE = {
  src: "/images/Condimente.jpg",
  alt: "Wooden bowls of turmeric, chilli and other spice powders with cinnamon, star anise and cardamom on burlap",
};

const HERO = {
  src: "/images/Idukki Spices_ Pepper and Aromatic Treasures.png",
  alt: "Hanging green peppercorns and wooden bowls of black pepper, cardamom, turmeric, cinnamon, cloves and red chillies",
  pos: "object-center",
};

export default function HeroSection() {
  const rootRef = useRef(null);

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

  const perks = [
    [Sprout, "Naturally grown"],
    [MapPin, "Directly sourced"],
    [BadgeCheck, "Premium quality"],
  ];

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-[#062D1B] text-white sm:min-h-[720px] lg:min-h-[800px]"
    >
      {/* Phones get a portrait photo, larger screens the wide scene */}
      <Image src={HERO_MOBILE.src} alt={HERO_MOBILE.alt} fill sizes="100vw" priority className="-z-10 object-cover object-bottom sm:hidden" />
      <Image src={HERO.src} alt={HERO.alt} fill sizes="100vw" priority className={`-z-10 hidden object-cover sm:block ${HERO.pos}`} />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(6,45,27,0.78),rgba(6,45,27,0.55)_60%,rgba(6,45,27,0.85))]" />

      <div className="mx-auto w-full max-w-4xl px-5 pb-36 pt-32 text-center sm:px-8 sm:pb-40">
        <div data-reveal className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 ring-1 ring-white/20 backdrop-blur-sm">
          <Leaf className="h-4 w-4 text-[#9bd24a]" aria-hidden="true" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F5B900] sm:text-xs">From the hills of Idukki</span>
        </div>

        <h1 id="hero-heading" data-reveal className="mt-6 font-serif text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[1] tracking-tight">
          Idukki, the land
          <span className="block font-script text-[1.2em] font-bold leading-[0.95] text-[#F5B900]">of spices</span>
        </h1>

        <p data-reveal className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
          Handpicked, naturally grown spices from the misty hills of Idukki, Kerala.
        </p>

        <div data-reveal className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/spices"
            className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#F5B900] px-8 text-sm font-bold text-[#062D1B] shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffcb2e] active:scale-95"
          >
            Explore our spices
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            href="/shop"
            className="inline-flex min-h-[52px] items-center rounded-full border border-white/50 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F5B900] hover:text-[#F5B900] active:scale-95"
          >
            Shop now
          </Link>
        </div>
      </div>

      {/* Bottom bar: perks and slide controls */}
      <div className="absolute inset-x-0 bottom-14 z-10 sm:bottom-20">
        <div className="mx-auto flex max-w-7xl justify-center px-5 sm:px-8 lg:px-12">
          <ul data-reveal className="hidden flex-wrap justify-center gap-x-8 gap-y-2 sm:flex">
            {perks.map(([Icon, label]) => (
              <li key={label} className="flex items-center gap-2.5 text-sm font-semibold text-white/95">
                <Icon className="h-5 w-5 text-[#F5B900]" strokeWidth={1.75} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
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
