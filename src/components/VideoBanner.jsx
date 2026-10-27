"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, ArrowRight, MapPin, ClipboardCheck, Package } from "lucide-react";

// An illustrative camera pass through the shop render. It is not documentary footage, and the
// banner says so.
const VIDEO_SRC = "/media/videos/shop-walkthrough-preview.mp4";

const features = [
  { icon: MapPin, label: "Rooted in Idukki" },
  { icon: ClipboardCheck, label: "Carefully Selected" },
  { icon: Package, label: "Packed with Care" },
];

export default function VideoBanner() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);
  const openerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const opener = openerRef.current;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      opener?.focus();
    };
  }, [open]);

  return (
    <section id="journey" aria-labelledby="journey-heading" className="relative isolate overflow-hidden bg-[#03100D] text-white">
      <div className="relative h-64 sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[64%]">
        <Image
          src="/images/peppercorn-spoon.webp"
          alt="A spoonful of black peppercorns and spices caught mid-air"
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 64vw, 100vw"
          className="object-cover object-[75%_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#03100D] lg:bg-gradient-to-r lg:from-[#03100D] lg:via-[#03100D]/40 lg:to-transparent" />
      </div>

      <div className="relative bg-gradient-to-b from-[#03100D] to-[#071D17] lg:bg-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-2 sm:pb-16 lg:py-24">
          <div className="lg:max-w-[46%]">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#E8B34D]">Step inside</p>
            <h2 id="journey-heading" className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mt-3 text-[#F7F3EA]">
              The Journey of
              <br />
              <span className="text-[#E8B34D]">Idukki Spices</span>
            </h2>
            <p className="mt-4 text-lg text-[#F7F3EA]">From our farms to your kitchen</p>
            <p className="mt-2 max-w-md text-sm sm:text-base leading-relaxed text-[#C9D1CB]">
              Explore the people, places and process behind our authentic Idukki spices.
            </p>

            <div className="mt-7 flex items-center gap-4">
              <button
                ref={openerRef}
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Watch the story: play the shop walkthrough preview"
                className="group flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#E8B34D] bg-[#03100D]/60 transition-all duration-300 hover:scale-105 hover:bg-[#E8B34D]"
              >
                <Play className="ml-1 h-6 w-6 fill-[#E8B34D] text-[#E8B34D] transition-colors group-hover:fill-[#03100D] group-hover:text-[#03100D]" />
              </button>
              <div>
                <p className="font-semibold text-[#F7F3EA]">Watch the Story</p>
                <p className="text-xs text-[#C9D1CB]/75">Walkthrough preview &middot; illustrative render of the shop</p>
              </div>
            </div>

            <ul className="mt-8 grid grid-cols-3 gap-3 border-t border-[#E8B34D]/25 pt-6">
              {features.map(({ icon: Icon, label }) => (
                <li key={label} className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <Icon className="h-6 w-6 shrink-0 text-[#E8B34D]" strokeWidth={1.4} aria-hidden="true" />
                  <span className="text-xs sm:text-sm leading-snug text-[#F7F3EA]">{label}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/shop"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#E8B34D] px-7 py-3.5 text-sm font-bold text-[#03100D] shadow-lg shadow-black/30 transition-colors hover:bg-[#F7F3EA]"
            >
              Explore Our Spices
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Shop walkthrough preview"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close video"
            className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            <X className="w-5 h-5" />
          </button>
          <video
            src={VIDEO_SRC}
            controls
            autoPlay
            muted
            playsInline
            preload="none"
            className="max-h-[85dvh] w-full max-w-5xl rounded-2xl bg-black shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
