"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  Expand,
  Grid as GridIcon,
  Heart,
  Layers,
  Leaf,
  MapPin,
  Mountain,
  Share2,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { GALLERY_CATEGORIES, GALLERY_PHOTOS } from "@/data/gallery";
import Reveal from "@/components/Reveal";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);
  const [layoutMode, setLayoutMode] = useState("masonry"); // 'masonry' or 'grid'
  const closeBtnRef = useRef(null);
  const touchStartX = useRef(null);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "all") return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const currentPhoto = openIndex !== null ? filteredPhotos[openIndex] : null;

  const openLightbox = (index) => {
    setOpenIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setOpenIndex(null);
  }, []);

  const navigateLightbox = useCallback(
    (direction) => {
      setOpenIndex((prev) => {
        if (prev === null) return null;
        const total = filteredPhotos.length;
        return (prev + direction + total) % total;
      });
    },
    [filteredPhotos.length]
  );

  // Keyboard navigation & body scroll locking
  useEffect(() => {
    if (openIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "ArrowLeft") navigateLightbox(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [openIndex, closeLightbox, navigateLightbox]);

  return (
    <div className="min-h-screen bg-[#FAF7EF] text-[#123B22] selection:bg-[#F5B900] selection:text-[#062D1B]">
      {/* ── HERO BANNER ─────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#072417] py-20 text-white sm:py-28 lg:py-32">
        {/* Soft background glow & organic curves */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_15%,rgba(112,168,44,0.22),transparent_70%),radial-gradient(ellipse_40%_40%_at_85%_75%,rgba(245,185,0,0.14),transparent_70%)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-6 -z-10 select-none font-serif text-[clamp(6rem,18vw,16rem)] font-bold tracking-tighter text-white/[0.03]"
        >
          FLORA
        </span>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 backdrop-blur-md">
              <Leaf className="h-3.5 w-3.5 text-[#70A82C]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F5B900]">
                Botanical Archive &amp; Terroir
              </span>
            </div>

            <h1 className="mt-5 font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              Life Among the
              <span className="block font-script text-[1.2em] font-normal text-[#F5B900] mt-1 sm:mt-2">
                Mist &amp; Spices
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed font-normal">
              A photographic exploration of the Western Ghats hillside canopy: the climbing vines,
              shade-grown pods, aromatic blossoms, and wild fruits that give Idukki spices their soul.
            </p>
          </Reveal>

          {/* Quick Estate Stats Pill Strip */}
          <Reveal delay={120}>
            <div className="mt-10 inline-grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 rounded-3xl border border-white/15 bg-black/30 px-6 sm:px-10 py-5 backdrop-blur-md shadow-2xl">
              <div className="text-center">
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#F5B900]">
                  3,500 ft
                </span>
                <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">
                  Altitude Elevation
                </span>
              </div>
              <div className="text-center">
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#F5B900]">
                  100%
                </span>
                <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">
                  Shade-Grown
                </span>
              </div>
              <div className="text-center">
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#F5B900]">
                  7+
                </span>
                <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">
                  Heritage Species
                </span>
              </div>
              <div className="text-center">
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#F5B900]">
                  Estate
                </span>
                <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">
                  Direct Reserve
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FILTER & CONTROLS BAR ─────────────────────────────────── */}
      <section className="sticky top-16 z-30 border-b border-[#E8DFC8] bg-[#FAF7EF]/95 backdrop-blur-md py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div
            role="tablist"
            className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar"
          >
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === "all"
                  ? GALLERY_PHOTOS.length
                  : GALLERY_PHOTOS.filter((p) => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#103B2D] text-white shadow-sm ring-1 ring-[#103B2D]"
                      : "bg-white border border-[#E0D5BE] text-[#345041] hover:border-[#103B2D] hover:bg-stone-50"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      isActive ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Layout Toggle (Desktop) */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#546E60]">
            <span>Layout:</span>
            <div className="inline-flex rounded-full border border-[#E0D5BE] bg-white p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setLayoutMode("masonry")}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition-all ${
                  layoutMode === "masonry"
                    ? "bg-[#103B2D] text-white"
                    : "text-[#546E60] hover:text-[#103B2D]"
                }`}
              >
                <Layers className="h-3 w-3" />
                <span>Masonry</span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode("grid")}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition-all ${
                  layoutMode === "grid"
                    ? "bg-[#103B2D] text-white"
                    : "text-[#546E60] hover:text-[#103B2D]"
                }`}
              >
                <GridIcon className="h-3 w-3" />
                <span>Uniform</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY SHOWCASE ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {layoutMode === "masonry" ? (
          /* Masonry Columns */
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredPhotos.map((photo, i) => (
              <div key={photo.id} className="break-inside-avoid">
                <Reveal delay={(i % 3) * 100}>
                  <div className="group relative overflow-hidden rounded-3xl bg-white border border-[#EAE2CE] shadow-[0_10px_30px_-15px_rgba(9,37,21,0.12)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(9,37,21,0.22)] hover:border-[#BFA87E]">
                    {/* Image Area */}
                    <div
                      className="relative w-full cursor-zoom-in overflow-hidden bg-[#0A2616]"
                      onClick={() => openLightbox(i)}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.title}
                        width={photo.w}
                        height={photo.h}
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="block h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 pointer-events-none">
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#F5B900] border border-white/20 shadow-md">
                          <Mountain className="h-2.5 w-2.5" />
                          <span>{photo.altitude}</span>
                        </span>
                        <span className="inline-flex items-center rounded-full bg-emerald-950/70 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold text-white/90 border border-emerald-500/30 shadow-md">
                          {photo.tag}
                        </span>
                      </div>

                      {/* Expand FAB button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(i);
                        }}
                        aria-label={`Enlarge ${photo.title}`}
                        className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-md transition-all duration-300 hover:bg-[#F5B900] hover:text-[#062D1B] hover:scale-110 active:scale-90"
                      >
                        <Expand className="h-4 w-4" />
                      </button>

                      {/* Bottom Gradient Scrim */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-80 transition-opacity group-hover:opacity-100"
                      />

                      {/* Overlay Botanical Title on Image */}
                      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                        <span className="block font-mono text-[10px] italic text-[#F5B900]/90">
                          {photo.botanical}
                        </span>
                        <h3 className="font-serif text-lg font-bold leading-tight drop-shadow-sm group-hover:text-[#F5B900] transition-colors">
                          {photo.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Narrative Body */}
                    <div className="p-4 sm:p-5 flex flex-col justify-between bg-white">
                      <p className="text-xs text-[#526659] leading-relaxed line-clamp-3">
                        {photo.story}
                      </p>

                      <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold text-[#8B9C90] uppercase tracking-wider">
                          {photo.harvest}
                        </span>

                        <Link
                          href={`/product/${photo.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#103B2D] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#062D1B] active:scale-95"
                        >
                          <ShoppingBag className="h-3 w-3" />
                          <span>Shop {photo.productName.split(" ")[0]}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        ) : (
          /* Uniform Grid Mode */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, i) => (
              <Reveal key={photo.id} delay={(i % 3) * 100}>
                <div className="group relative overflow-hidden rounded-3xl bg-white border border-[#EAE2CE] shadow-[0_10px_30px_-15px_rgba(9,37,21,0.12)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(9,37,21,0.22)]">
                  <div
                    className="relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-[#0A2616]"
                    onClick={() => openLightbox(i)}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-[#F5B900] border border-white/20 shadow-md">
                        {photo.altitude}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="block text-[10px] italic text-[#F5B900]">
                        {photo.botanical}
                      </span>
                      <h3 className="font-serif text-base font-bold leading-tight line-clamp-1">
                        {photo.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col justify-between">
                    <p className="text-xs text-[#526659] line-clamp-2">{photo.story}</p>
                    <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[10.5px] font-medium text-stone-400">
                        {photo.harvest}
                      </span>
                      <Link
                        href={`/product/${photo.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#103B2D] hover:text-[#C58A27]"
                      >
                        <span>View Spice</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ── TERROIR JOURNAL BANNER ───────────────────────────────── */}
      <section className="relative my-12 overflow-hidden bg-[#08271D] py-16 text-white sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(245,185,0,0.12),transparent_75%)]"
        />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center relative z-10">
          <Leaf className="mx-auto h-8 w-8 text-[#70A82C]" />
          <blockquote className="mt-6 font-serif italic text-2xl sm:text-4xl lg:text-5xl font-normal leading-snug text-[#FAF7EF]">
            “Every dewdrop that clings to these high-altitude vines carries the aroma of centuries
            of volcanic soil and monsoon rains.”
          </blockquote>
          <p className="mt-5 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#F5B900]">
            — Estate Master Planter, Idukki Range
          </p>
        </div>
      </section>

      {/* ── CTA TO SHOP ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <div className="rounded-3xl bg-white border border-[#EAE2CE] p-8 sm:p-14 shadow-lg">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#103B2D]">
            Bring the Hills of Idukki to Your Kitchen
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-[#526659]">
            From sun-cured Tellicherry black peppercorns to hand-graded emerald cardamom pods,
            experience pure unadulterated freshness delivered to your door.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-[#103B2D] px-8 py-3.5 text-sm font-bold text-white shadow-xl transition-all hover:bg-[#062D1B] hover:-translate-y-0.5 active:scale-95"
            >
              <span>Shop All Harvests</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/spices"
              className="inline-flex items-center gap-2 rounded-full border border-[#103B2D]/40 bg-white px-7 py-3.5 text-sm font-semibold text-[#103B2D] transition-all hover:border-[#103B2D] hover:bg-stone-50"
            >
              <Compass className="h-4 w-4 text-[#C58A27]" />
              <span>Interactive Spice Finder</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FULL-SCREEN INTERACTIVE LIGHTBOX ─────────────────────── */}
      {currentPhoto && (
        <div
          data-lightbox
          role="dialog"
          aria-modal="true"
          aria-label={`Photo lightbox: ${currentPhoto.title}`}
          className="fixed inset-0 z-[100] flex flex-col bg-[#03100D]/95 backdrop-blur-xl animate-fade-in"
          onClick={closeLightbox}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const diff = e.changedTouches[0].clientX - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(diff) > 40) navigateLightbox(diff < 0 ? 1 : -1);
          }}
        >
          {/* Top Control Bar */}
          <div
            className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/10 text-white z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-[#F5B900]">
                {String(openIndex + 1).padStart(2, "0")} / {String(filteredPhotos.length).padStart(2, "0")}
              </span>
              <span className="hidden sm:inline text-xs text-white/60">
                • {currentPhoto.altitude}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/product/${currentPhoto.slug}`}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#F5B900] px-4 py-1.5 text-xs font-bold text-[#062D1B] shadow-md transition hover:bg-[#ffcb2e]"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Shop This Spice</span>
              </Link>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeLightbox}
                aria-label="Close photo view"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Center Stage with Image & Arrows */}
          <div
            className="relative flex-1 min-h-0 flex items-center justify-center p-2 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
              <Image
                key={currentPhoto.src}
                src={currentPhoto.src}
                alt={currentPhoto.title}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Left Nav Arrow */}
            <button
              type="button"
              onClick={() => navigateLightbox(-1)}
              aria-label="Previous photo"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-xl transition hover:bg-[#F5B900] hover:text-[#062D1B] active:scale-95 cursor-pointer z-20"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Right Nav Arrow */}
            <button
              type="button"
              onClick={() => navigateLightbox(1)}
              aria-label="Next photo"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-xl transition hover:bg-[#F5B900] hover:text-[#062D1B] active:scale-95 cursor-pointer z-20"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Bottom Story & Caption Panel */}
          <div
            className="px-4 sm:px-8 py-4 sm:py-5 border-t border-white/10 bg-black/40 text-white z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto max-w-4xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="block font-mono text-[11px] italic text-[#F5B900]">
                  {currentPhoto.botanical} • {currentPhoto.tag}
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-bold leading-tight">
                  {currentPhoto.title}
                </h4>
                <p className="mt-1 text-xs text-white/70 max-w-2xl hidden sm:block">
                  {currentPhoto.story}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 shrink-0">
                <Link
                  href={`/product/${currentPhoto.slug}`}
                  className="sm:hidden inline-flex items-center gap-1.5 rounded-full bg-[#F5B900] px-4 py-2 text-xs font-bold text-[#062D1B]"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span>Shop Spice</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

