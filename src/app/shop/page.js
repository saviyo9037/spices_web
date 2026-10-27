"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, Heart, X, ChevronDown, ChevronRight, Leaf, MapPin, Truck, Sparkles, RotateCcw } from "lucide-react";
import { products } from "@/data/products";
import { FORMS, USE_TAGS, productUses, productSizes, allSizes } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";

const FORM_LABEL = {
  "whole-spices": "Whole Spices",
  "ground-spices": "Ground Spices",
  "spice-blends": "Spice Blends",
};

// Spice shortcuts for the category strip.
const STRIP = [
  { id: "all", label: "All Spices", image: "/images/spice-shop-interior.jpg", count: products.length },
  ...[
    ["black-pepper", "Pepper"],
    ["cardamom", "Cardamom"],
    ["turmeric-powder", "Turmeric"],
    ["cinnamon-sticks", "Cinnamon"],
    ["cloves", "Cloves"],
    ["nutmeg", "Nutmeg"],
    ["red-chilli-powder", "Red Chilli"],
    ["spice-blends", "Masala Blends"],
  ]
    .map(([slug, label]) => ({ id: slug, label, image: products.find((p) => p.slug === slug)?.image }))
    .filter((c) => c.image),
];

const FORM_IDS = FORMS.filter((x) => products.some((p) => p.category === x.id)).map((x) => x.id);
const isValidCategory = (v) => STRIP.some((c) => c.id === v) || FORM_IDS.includes(v);
const categoryLabel = (v) => STRIP.find((c) => c.id === v)?.label || FORM_LABEL[v] || v;
const USES = USE_TAGS.map((u) => ({ ...u, count: products.filter((p) => productUses(p).includes(u.id)).length })).filter((u) => u.count > 0);
const SIZES = allSizes();
const BADGES = [...new Set(products.map((p) => p.badge).filter(Boolean))];
const MAX_PRICE = Math.ceil(Math.max(...products.map((p) => p.price)) / 10) * 10;

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "name", label: "Name: A to Z" },
];

const chip = (on) =>
  `rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
    on ? "border-forest bg-forest text-white shadow-xs" : "border-line bg-paper/50 text-forest/80 hover:border-gold hover:bg-white hover:text-forest"
  }`;

function Section({ title, hint, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-line/70 py-4 first:pt-0 last:border-b-0 last:pb-0">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center justify-between text-left">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-forest">{title}</span>
        <span className="flex items-center gap-2">
          {hint && <span className="text-xs font-semibold text-gold-ink">{hint}</span>}
          <ChevronDown className={`h-4 w-4 text-forest/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </span>
      </button>
      {open && <div className="mt-3.5">{children}</div>}
    </div>
  );
}

function FilterPanel({ f, set, toggleIn, wishlistCount }) {
  const fill = `${Math.round((f.maxPrice / MAX_PRICE) * 100)}%`;
  return (
    <div className="space-y-1">
      <Section title="Cooking use">
        <div className="flex flex-wrap gap-1.5">
          {USES.map((u) => (
            <button key={u.id} type="button" aria-pressed={f.uses.includes(u.id)} onClick={() => toggleIn("uses", u.id)} className={chip(f.uses.includes(u.id))}>
              {u.label}
            </button>
          ))}
        </div>
      </Section>

      {BADGES.length > 0 && (
        <Section title="Collection">
          <div className="flex flex-wrap gap-1.5">
            {BADGES.map((b) => (
              <button key={b} type="button" aria-pressed={f.badges.includes(b)} onClick={() => toggleIn("badges", b)} className={chip(f.badges.includes(b))}>
                {b}
              </button>
            ))}
          </div>
        </Section>
      )}

      <Section title="Spice Type">
        <div className="flex flex-wrap gap-1.5">
          {FORM_IDS.map((id) => (
            <button key={id} type="button" aria-pressed={f.category === id} onClick={() => set({ category: f.category === id ? "all" : id })} className={chip(f.category === id)}>
              {FORM_LABEL[id]}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Pack size">
        <div className="grid grid-cols-3 gap-1.5">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={f.sizes.includes(s)}
              onClick={() => toggleIn("sizes", s)}
              className={`rounded-xl border py-2 text-xs font-semibold transition-all ${
                f.sizes.includes(s) ? "border-forest bg-forest text-white shadow-xs" : "border-line bg-paper/50 text-forest/80 hover:border-gold hover:bg-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Price Range" hint={`Up to ₹${f.maxPrice}`}>
        <input
          aria-label="Maximum price"
          type="range"
          min={0}
          max={MAX_PRICE}
          step={10}
          value={f.maxPrice}
          onChange={(e) => set({ maxPrice: Number(e.target.value) })}
          style={{ "--fill": fill }}
          className="range-gold w-full"
        />
        <div className="mt-2 flex justify-between text-xs text-forest/60">
          <span>₹0</span>
          <span>₹{MAX_PRICE}</span>
        </div>
      </Section>

      <Section title="Saved Spices">
        <button
          type="button"
          role="switch"
          aria-checked={f.wishlist}
          onClick={() => set({ wishlist: !f.wishlist })}
          className="flex w-full items-center gap-3 rounded-xl border border-line bg-paper/40 p-3 text-left transition-colors hover:bg-paper"
        >
          <Heart className={`h-4 w-4 ${f.wishlist ? "fill-gold-ink text-gold-ink" : "text-forest/60"}`} aria-hidden="true" />
          <span className="flex-1 text-xs font-medium text-forest">
            Wishlist only <span className="text-forest/50">({wishlistCount})</span>
          </span>
          <span className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${f.wishlist ? "bg-forest" : "bg-line"}`}>
            <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${f.wishlist ? "left-[18px]" : "left-0.5"}`} />
          </span>
        </button>
      </Section>
    </div>
  );
}

function ShopContent() {
  const params = useSearchParams();
  const { wishlistIds } = useWishlist();

  const [f, setF] = useState(() => ({
    q: params.get("q") || "",
    category: isValidCategory(params.get("category")) ? params.get("category") : "all",
    uses: [],
    sizes: [],
    badges: [],
    maxPrice: MAX_PRICE,
    wishlist: params.get("tab") === "wishlist",
    sort: "featured",
  }));
  const [drawer, setDrawer] = useState(false);

  const set = (patch) => setF((v) => ({ ...v, ...patch }));
  const toggleIn = (key, val) =>
    setF((v) => ({ ...v, [key]: v[key].includes(val) ? v[key].filter((x) => x !== val) : [...v[key], val] }));
  const reset = () => setF({ q: "", category: "all", uses: [], sizes: [], badges: [], maxPrice: MAX_PRICE, wishlist: false, sort: "featured" });

  const shown = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    const list = products.filter((p) => {
      if (f.category !== "all" && p.slug !== f.category && p.category !== f.category) return false;
      if (f.wishlist && !wishlistIds.includes(p.id)) return false;
      if (p.price > f.maxPrice) return false;
      if (f.uses.length && !f.uses.some((u) => productUses(p).includes(u))) return false;
      if (f.badges.length && !f.badges.includes(p.badge)) return false;
      if (f.sizes.length && !f.sizes.some((s) => productSizes(p).includes(s))) return false;
      if (q) {
        const hay = [p.name, p.subtitle, p.shortDescription, p.origin, ...(p.culinaryUses || [])].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (f.sort === "price-low") list.sort((a, b) => a.price - b.price);
    else if (f.sort === "price-high") list.sort((a, b) => b.price - a.price);
    else if (f.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [f, wishlistIds]);

  // Removable chips for active filters
  const active = [];
  if (f.q.trim()) active.push({ key: "q", label: `“${f.q.trim()}”`, clear: () => set({ q: "" }) });
  if (f.category !== "all") active.push({ key: "cat", label: categoryLabel(f.category), clear: () => set({ category: "all" }) });
  f.uses.forEach((u) => active.push({ key: `u-${u}`, label: USES.find((x) => x.id === u)?.label, clear: () => toggleIn("uses", u) }));
  f.sizes.forEach((s) => active.push({ key: `s-${s}`, label: s, clear: () => toggleIn("sizes", s) }));
  f.badges.forEach((b) => active.push({ key: `b-${b}`, label: b, clear: () => toggleIn("badges", b) }));
  if (f.maxPrice < MAX_PRICE) active.push({ key: "price", label: `Up to ₹${f.maxPrice}`, clear: () => set({ maxPrice: MAX_PRICE }) });
  if (f.wishlist) active.push({ key: "wl", label: "Wishlist", clear: () => set({ wishlist: false }) });

  useEffect(() => {
    if (!drawer) return;
    const onKey = (e) => e.key === "Escape" && setDrawer(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [drawer]);

  const panel = <FilterPanel f={f} set={set} toggleIn={toggleIn} wishlistCount={wishlistIds.length} />;

  return (
    <div className="min-h-screen bg-white text-forest">
      {/* Hero Header */}
      <section className="relative isolate overflow-hidden bg-night text-white">
        <Image src="/images/idukki-landscape.webp" alt="" fill priority sizes="100vw" className="-z-10 object-cover object-[70%_45%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/95 via-night/85 to-night/45" />
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/65">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-white">Shop</span>
          </nav>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Idukki Single Origin</p>
          <h1 className="mt-2.5 max-w-2xl font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08]">
            Pure Spices <span className="text-gold italic font-serif">from the Hills</span>
          </h1>
          <p className="mt-3.5 max-w-xl text-sm sm:text-base leading-relaxed text-white/80">
            Hand-harvested from high-altitude Kerala plantations. Retaining 100% of their natural essential oils, aroma and culinary heat.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 text-xs sm:text-sm text-white/90">
            {[
              [Leaf, "100% Single Origin"],
              [MapPin, "Idukki & High Ranges"],
              [Truck, "Pan-India Fresh Dispatch"],
            ].map(([Icon, label]) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Dark Forest Spice Strip */}
      <div className="bg-deep border-b border-gold/15 py-3.5 sm:py-4">
        <div className="mx-auto max-w-[1840px] px-4 sm:px-6 lg:px-5 xl:px-6">
          <div role="group" aria-label="Browse by spice" className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {STRIP.map((c) => {
              const on = f.category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => set({ category: c.id })}
                  aria-pressed={on}
                  className={`flex shrink-0 items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4 text-left transition-all ${
                    on
                      ? "border-gold bg-gold text-night shadow-md font-semibold"
                      : "border-white/15 bg-white/10 text-white/90 hover:border-gold/60 hover:text-white hover:bg-white/15"
                  }`}
                >
                  <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white/20">
                    <Image src={c.image} alt="" fill sizes="36px" className="object-cover" />
                  </span>
                  <span className="whitespace-nowrap text-xs sm:text-sm font-semibold">
                    {c.label}
                    {c.count != null && <span className={`ml-1.5 text-xs opacity-75`}>({c.count})</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Shop Layout */}
      <div className="mx-auto max-w-[1840px] px-4 py-8 sm:px-6 sm:py-10 lg:px-5 xl:px-6">
        {/* Unified Search & Toolbar (visible on all screens above the grid) */}
        <div className="mb-6 rounded-2xl border border-line bg-white p-3 shadow-xs sm:p-4 lg:hidden">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-0">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-forest/45" aria-hidden="true" />
              <input
                type="search"
                aria-label="Search spices"
                value={f.q}
                onChange={(e) => set({ q: e.target.value })}
                placeholder="Search by spice name, origin, or culinary use..."
                className="w-full rounded-xl border border-line bg-paper/50 py-2.5 pl-10 pr-9 text-sm text-forest placeholder:text-forest/45 focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
              {f.q && (
                <button
                  type="button"
                  onClick={() => set({ q: "" })}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-forest/40 hover:text-forest"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Results count, mobile filter trigger, sort */}
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              <span className="text-xs sm:text-sm font-medium text-forest/70 whitespace-nowrap">
                <strong className="text-forest font-bold">{shown.length}</strong> of {products.length} spices
              </span>

              {/* Mobile filter toggle */}
              <button
                type="button"
                onClick={() => setDrawer(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-forest px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs lg:hidden hover:bg-deep"
              >
                <SlidersHorizontal className="h-4 w-4 text-gold" aria-hidden="true" />
                <span>Filters</span>
                {active.length > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-xs font-bold text-night">
                    {active.length}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-forest/70">
                <span className="hidden md:inline font-medium">Sort:</span>
                <select
                  value={f.sort}
                  onChange={(e) => set({ sort: e.target.value })}
                  className="rounded-xl border border-line bg-paper/50 px-3 py-2.5 text-xs sm:text-sm font-semibold text-forest focus:border-gold focus:bg-white focus:outline-none cursor-pointer"
                >
                  {SORTS.map((x) => (
                    <option key={x.id} value={x.id}>{x.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {active.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-line/60 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-forest/50">Active:</span>
              {active.map((a) => (
                <button
                  key={a.key}
                  type="button"
                  onClick={a.clear}
                  aria-label={`Remove filter ${a.label}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-forest hover:bg-gold/20 transition-colors"
                >
                  <span>{a.label}</span>
                  <X className="h-3 w-3 text-gold-ink" aria-hidden="true" />
                </button>
              ))}
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1 text-xs font-semibold text-gold-ink hover:underline ml-1"
              >
                <RotateCcw className="h-3 w-3" /> Clear all
              </button>
            </div>
          )}
        </div>

        {/* Content Layout: Sidebar + Grid */}
        <div className="lg:grid lg:grid-cols-[264px_1fr] lg:gap-6">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-[88px] flex max-h-[calc(100vh-108px)] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-gold-ink" />
                  <h2 className="font-serif text-lg font-bold text-forest">Filter Spices</h2>
                </div>
                {active.length > 0 && (
                  <button type="button" onClick={reset} className="text-xs font-semibold text-gold-ink hover:underline">
                    Clear all ({active.length})
                  </button>
                )}
              </div>
              <div className="space-y-3 border-b border-line px-5 py-4">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-ink" aria-hidden="true" />
                  <input
                    type="search"
                    aria-label="Search spices"
                    value={f.q}
                    onChange={(e) => set({ q: e.target.value })}
                    placeholder="Search spices..."
                    className="w-full rounded-xl border border-line bg-paper/50 py-2.5 pl-10 pr-3 text-sm text-forest placeholder:text-forest/45 focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/30"
                  />
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.2em] text-forest/60">Sort by</span>
                  <select
                    value={f.sort}
                    onChange={(e) => set({ sort: e.target.value })}
                    className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-semibold text-forest focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                  >
                    {SORTS.map((x) => (
                      <option key={x.id} value={x.id}>{x.label}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="filter-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">{panel}</div>
            </div>
          </aside>

          {/* Products Grid */}
          <div>
            <div className="mb-5 hidden flex-wrap items-center gap-2 lg:flex">
              <p className="mr-2 text-sm text-forest/70" aria-live="polite">
                <strong className="text-forest">{shown.length}</strong> of {products.length} spices
              </p>
              {active.map((a) => (
                <button
                  key={a.key}
                  type="button"
                  onClick={a.clear}
                  aria-label={`Remove filter ${a.label}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-forest transition-colors hover:bg-gold/20"
                >
                  {a.label}
                  <X className="h-3 w-3 text-gold-ink" aria-hidden="true" />
                </button>
              ))}
            </div>
            {shown.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-line bg-white p-12 text-center shadow-xs">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-paper-deep/60 text-forest/50">
                  <Search className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-serif text-2xl font-bold text-forest">No spices match these criteria</h2>
                <p className="mx-auto mt-2 max-w-sm text-sm text-forest/70">
                  {f.wishlist && wishlistIds.length === 0
                    ? "Your wishlist is empty. Tap the heart on any spice to save it."
                    : "Try adjusting your filters, selecting 'All Spices', or broadening your search terms."}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-2.5 text-sm font-bold text-white hover:bg-deep shadow-xs"
                >
                  <RotateCcw className="h-4 w-4 text-gold" />
                  <span>Reset all filters</span>
                </button>
              </div>
            ) : (
              <div className="shop-grid gap-3 sm:gap-5">
                {shown.map((p) => (
                  <ProductCard key={p.id} product={p} compact />
                ))}
              </div>
            )}

            {/* Bottom bulk prompt */}
            <div className="mt-12 rounded-2xl border border-line bg-white p-6 text-center shadow-xs">
              <p className="text-sm text-forest/80">
                Looking for restaurant or wholesale quantities?{" "}
                <Link href="/#bulk-order" className="font-bold text-gold-ink hover:underline">
                  Send a bulk enquiry →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawer && (
        <div role="dialog" aria-modal="true" aria-label="Filters" className="fixed inset-0 z-[100] lg:hidden">
          <button type="button" aria-label="Close filters" onClick={() => setDrawer(false)} className="absolute inset-0 bg-black/60 backdrop-blur-xs" />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[85dvh] flex-col rounded-t-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-gold-ink" />
                <h2 className="font-serif text-lg font-bold text-forest">Filter Spices</h2>
              </div>
              <button
                type="button"
                onClick={() => setDrawer(false)}
                aria-label="Close filters"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-forest"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-4 flex-1">{panel}</div>
            <div className="flex gap-3 border-t border-line px-5 py-4 bg-paper/40">
              <button
                type="button"
                onClick={reset}
                className="flex-1 rounded-xl border border-line bg-white py-2.5 text-xs sm:text-sm font-semibold text-forest"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setDrawer(false)}
                className="flex-1 rounded-xl bg-forest py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs"
              >
                Show {shown.length} {shown.length === 1 ? "Spice" : "Spices"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Keyed() {
  const params = useSearchParams();
  return <ShopContent key={params.toString()} />;
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <Keyed />
    </Suspense>
  );
}
