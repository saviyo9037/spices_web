"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Expand,
  Leaf,
  Mountain,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { GALLERY_PHOTOS } from "@/data/gallery";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import TornEdge from "./TornEdge";

export default function GallerySection() {
  const [open, setOpen] = useState(null); // index of open photo, or null
  const closeRef = useRef(null);
  const touchX = useRef(null);

  const show = useCallback((i) => {
    setOpen(i);
  }, []);

  const close = useCallback(() => {
    setOpen(null);
  }, []);

  const step = useCallback(
    (d) =>
      setOpen((i) =>
        i === null ? i : (i + d + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
      ),
    []
  );

  // Keyboard, scroll lock and focus handling while the lightbox is open
  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const photo = open === null ? null : GALLERY_PHOTOS[open];

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative overflow-hidden bg-[#FAF7EF] py-16 text-[#123B22] sm:py-24 lg:py-28"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_20%_20%,rgba(112,168,44,0.08),transparent_70%),radial-gradient(ellipse_50%_50%_at_80%_80%,rgba(245,185,0,0.08),transparent_70%)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Leaf className="w-4 h-4 text-[#70A82C] fill-[#70A82C]" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#143627]">
                Nature Gallery &amp; Terroir
              </span>
              <span className="w-10 h-px bg-[#143627]/30" />
            </div>

            <h2
              id="gallery-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#143627] tracking-tight leading-[1.08]"
            >
              Life among the{" "}
              <span className="font-serif italic font-normal text-[#C58A27]">Spice Hills</span>
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm text-[#526659] max-w-xl font-medium">
              Tap any botanical portrait to look closer: the vines, pods, buds and wild leaves
              behind your spices.
            </p>
          </div>

          <Link
            href="/gallery"
            className="group self-start sm:self-auto inline-flex items-center gap-2 rounded-full border border-[#143627]/70 bg-white px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#143627] shadow-2xs transition-all duration-300 hover:bg-[#143627] hover:text-white active:scale-95"
          >
            <span>View Full Archive ({GALLERY_PHOTOS.length})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Masonry Columns */}
        <ul className="columns-2 gap-3 sm:gap-5 md:columns-3 lg:columns-4 [&>li]:mb-3 sm:[&>li]:mb-5">
          {GALLERY_PHOTOS.map((p, i) => (
            <li key={p.src} className="break-inside-avoid">
              <Reveal delay={(i % 3) * 80}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => show(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") show(i);
                  }}
                  aria-label={`Open photo: ${p.title}`}
                  className="group relative block w-full cursor-zoom-in touch-manipulation overflow-hidden rounded-2xl sm:rounded-3xl bg-[#092515] border border-[#EAE2CE] shadow-[0_10px_25px_-12px_rgba(9,37,21,0.2)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_35px_-12px_rgba(9,37,21,0.3)] hover:border-[#C58A27]/60"
                >
                  <Image
                    src={p.src}
                    alt={p.title}
                    width={p.w}
                    height={p.h}
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="block h-auto w-full transition-transform duration-[800ms] ease-out group-hover:scale-106"
                  />

                  {/* Top Altitude Pill */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2 py-0.5 text-[9px] font-bold text-[#F5B900] border border-white/20 shadow-xs">
                      <Mountain className="h-2 w-2" />
                      <span>{p.altitude}</span>
                    </span>
                  </div>

                  {/* Gradient Scrim */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#062D1B]/90 via-[#062D1B]/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                  />

                  {/* Bottom Text & Expand Button */}
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4 text-left">
                    <div>
                      <span className="block font-mono text-[9px] italic text-[#F5B900]/90">
                        {p.botanical}
                      </span>
                      <span className="font-serif text-[13px] sm:text-[15px] font-bold leading-tight text-white drop-shadow-sm group-hover:text-[#F5B900] transition-colors">
                        {p.title}
                      </span>
                    </div>

                    <span className="grid h-7 w-7 sm:h-8 sm:w-8 shrink-0 place-items-center rounded-full bg-[#F5B900] text-[#062D1B] shadow-md transition-all duration-300 group-hover:scale-110 active:scale-95">
                      <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {/* ── LIGHTBOX MODAL ─────────────────────────────────────── */}
      {photo && (
        <div
          data-lightbox
          role="dialog"
          aria-modal="true"
          aria-label={`Photo gallery: ${photo.title}`}
          className="fixed inset-0 z-[100] flex flex-col bg-[#03100D]/95 backdrop-blur-xl animate-fade-in"
          onClick={close}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          }}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-white/10 text-white z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#F5B900]">
                {String(open + 1).padStart(2, "0")} / {String(GALLERY_PHOTOS.length).padStart(2, "0")}
              </span>
              <span className="hidden sm:inline text-xs text-white/50">•</span>
              <span className="hidden sm:inline text-xs font-mono italic text-[#F5B900]/90">
                {photo.botanical}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/product/${photo.slug}`}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#F5B900] px-3.5 py-1 text-xs font-bold text-[#062D1B] transition hover:bg-[#ffcb2e]"
              >
                <ShoppingBag className="h-3 w-3" />
                <span>Shop {photo.productName.split(" ")[0]}</span>
              </Link>

              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close photo view"
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/10 transition hover:bg-[#F5B900] hover:text-[#062D1B] active:scale-95"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Photo Center */}
          <div
            className="relative flex-1 min-h-0 flex items-center justify-center p-2 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.title}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 grid h-11 w-11 sm:h-13 sm:w-13 cursor-pointer place-items-center rounded-full bg-black/60 text-white backdrop-blur border border-white/20 transition hover:bg-[#F5B900] hover:text-[#062D1B] active:scale-95 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 grid h-11 w-11 sm:h-13 sm:w-13 cursor-pointer place-items-center rounded-full bg-black/60 text-white backdrop-blur border border-white/20 transition hover:bg-[#F5B900] hover:text-[#062D1B] active:scale-95 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Bottom Caption & Story */}
          <div
            className="px-4 sm:px-8 py-3.5 sm:py-4 border-t border-white/10 bg-black/50 text-white z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto max-w-4xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <span className="block font-mono text-[10px] sm:text-[11px] italic text-[#F5B900]">
                  {photo.botanical} • {photo.altitude}
                </span>
                <h4 className="font-serif text-base sm:text-lg font-bold">{photo.title}</h4>
                <p className="mt-0.5 text-xs text-white/70 max-w-2xl hidden sm:block">
                  {photo.story}
                </p>
              </div>

              <Link
                href={`/product/${photo.slug}`}
                className="sm:hidden inline-flex self-center items-center gap-1.5 rounded-full bg-[#F5B900] px-4 py-1.5 text-xs font-bold text-[#062D1B]"
              >
                <ShoppingBag className="h-3 w-3" />
                <span>Shop Spice</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Pure White Torn Edge at bottom of GallerySection that tears into FeaturedProducts (bg-white) */}
      <TornEdge position="bottom" fill="#FFFFFF" seed={5} className="z-20 h-[56px] sm:h-[72px]" />
    </section>
  );
}
