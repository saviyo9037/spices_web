"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, Heart, X, ChevronDown, ChevronRight, Leaf, MapPin, Truck } from "lucide-react";
import { products } from "@/data/products";
import { FORMS, USE_TAGS, productUses, productSizes, allSizes } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";

const FORM_LABEL = {
  "whole-spices": "Whole Spices",
  "ground-spices": "Ground Spices",
  "spice-blends": "Spice Blends",
};
// Spice shortcuts for the category strip. Each one maps to a real catalogue product, so no
// thumbnail or label points at something we do not sell. Counts are only shown for "All".
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
const MAX_PRICE = Math.ceil(Math.max(...products.map((p) => p.price)) / 10) * 10;

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "name", label: "Name: A to Z" },
];

const chip = (on) =>
  `rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
    on ? "border-forest bg-forest text-white shadow-sm" : "border-line bg-white text-forest hover:border-gold hover:text-gold-ink"
  }`;

function Section({ title, hint, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-line/80 py-5 first:pt-0 last:border-b-0 last:pb-0">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center justify-between text-left">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-forest">{title}</span>
        <span className="flex items-center gap-2">
          {hint && <span className="text-sm font-semibold text-gold-ink">{hint}</span>}
          <ChevronDown className={`h-4 w-4 text-forest/50 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </span>
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function FilterPanel({ f, set, toggleIn, wishlistCount }) {
  const fill = `${Math.round((f.maxPrice / MAX_PRICE) * 100)}%`;
  return (
    <div>
      <Section title="Cooking use">
        <div className="flex flex-wrap gap-2">
          {USES.map((u) => (
            <button key={u.id} type="button" aria-pressed={f.uses.includes(u.id)} onClick={() => toggleIn("uses", u.id)} className={chip(f.uses.includes(u.id))}>
              {u.label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Type">
        <div className="flex flex-wrap gap-2">
          {FORM_IDS.map((id) => (
            <button key={id} type="button" aria-pressed={f.category === id} onClick={() => set({ category: f.category === id ? "all" : id })} className={chip(f.category === id)}>
              {FORM_LABEL[id]}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Pack size">
        <div className="grid grid-cols-3 gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={f.sizes.includes(s)}
              onClick={() => toggleIn("sizes", s)}
              className={`rounded-xl border py-2.5 text-sm font-semibold transition-all ${
                f.sizes.includes(s) ? "border-forest bg-forest text-white shadow-sm" : "border-line bg-white text-forest hover:border-gold"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Price" hint={`Up to ₹${f.maxPrice}`}>
        <input
          aria-label="Maximum price"
          type="range"
          min={0}
          max={MAX_PRICE}
          step={10}
          value={f.maxPrice}
          onChange={(e) => set({ maxPrice: Number(e.target.value) })}
          style={{ "--fill": fill }}
          className="range-gold"
        />
        <div className="mt-2 flex justify-between text-xs text-forest/55">
          <span>₹0</span>
          <span>₹{MAX_PRICE}</span>
        </div>
      </Section>

      <Section title="Saved">
        <button
          type="button"
          role="switch"
          aria-checked={f.wishlist}
          onClick={() => set({ wishlist: !f.wishlist })}
          className="flex w-full items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-3 text-left"
        >
          <Heart className={`h-4 w-4 ${f.wishlist ? "fill-gold-ink text-gold-ink" : "text-forest/60"}`} aria-hidden="true" />
          <span className="flex-1 text-sm font-medium text-forest">
            Wishlist only <span className="text-forest/50">({wishlistCount})</span>
          </span>
          <span className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${f.wishlist ? "bg-forest" : "bg-line"}`}>
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${f.wishlist ? "left-[22px]" : "left-0.5"}`} />
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
    maxPrice: MAX_PRICE,
    wishlist: params.get("tab") === "wishlist",
    sort: "featured",
  }));
  const [drawer, setDrawer] = useState(false);

  const set = (patch) => setF((v) => ({ ...v, ...patch }));
  const toggleIn = (key, val) =>
    setF((v) => ({ ...v, [key]: v[key].includes(val) ? v[key].filter((x) => x !== val) : [...v[key], val] }));
  const reset = () => setF((v) => ({ q: "", category: "all", uses: [], sizes: [], maxPrice: MAX_PRICE, wishlist: false, sort: v.sort }));

  const shown = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    const list = products.filter((p) => {
      if (f.category !== "all" && p.slug !== f.category && p.category !== f.category) return false;
      if (f.wishlist && !wishlistIds.includes(p.id)) return false;
      if (p.price > f.maxPrice) return false;
      if (f.uses.length && !f.uses.some((u) => productUses(p).includes(u))) return false;
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

  // Removable chips for everything that is currently narrowing the list.
  const active = [];
  if (f.q.trim()) active.push({ key: "q", label: `“${f.q.trim()}”`, clear: () => set({ q: "" }) });
  if (f.category !== "all") active.push({ key: "cat", label: categoryLabel(f.category), clear: () => set({ category: "all" }) });
  f.uses.forEach((u) => active.push({ key: `u-${u}`, label: USES.find((x) => x.id === u)?.label, clear: () => toggleIn("uses", u) }));
  f.sizes.forEach((s) => active.push({ key: `s-${s}`, label: s, clear: () => toggleIn("sizes", s) }));
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
    <div className="min-h-screen bg-[#F4ECDA] [background-image:radial-gradient(900px_420px_at_92%_0%,rgba(217,160,47,0.16),transparent_70%),radial-gradient(800px_500px_at_0%_45%,rgba(16,59,45,0.09),transparent_70%),radial-gradient(900px_500px_at_100%_85%,rgba(16,59,45,0.08),transparent_70%)]">
      <section className="relative isolate overflow-hidden bg-night text-white">
        <Image src="/images/idukki-landscape.webp" alt="" fill priority sizes="100vw" className="-z-10 object-cover object-[70%_45%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/95 via-night/80 to-night/40" />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/65">
            <Link href="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-white">Shop</span>
          </nav>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Explore our spices</p>
          <h1 className="mt-3 max-w-2xl font-serif text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Pure Spices
            <br />
            <span className="text-gold">from Idukki</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
            Handpicked from the hills of Idukki, bringing authentic Kerala flavours to your kitchen.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              [Leaf, "100% Natural"],
              [MapPin, "Sourced from Idukki"],
              [Truck, "Pan India Delivery"],
            ].map(([Icon, label]) => (
              <li key={label} className="flex items-center gap-2.5 text-white">
                <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="bg-deep">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div role="group" aria-label="Browse by spice" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-14 pt-6 sm:mx-0 sm:gap-3 sm:px-0">
            {STRIP.map((c) => {
              const on = f.category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => set({ category: c.id })}
                  aria-pressed={on}
                  className={`flex shrink-0 items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-5 text-left transition-all ${
                    on
                      ? "border-gold bg-gold text-night shadow-lg shadow-black/30"
                      : "border-white/15 bg-white/[0.07] text-white hover:border-gold/70 hover:bg-white/[0.12]"
                  }`}
                >
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white/30">
                    <Image src={c.image} alt="" fill sizes="44px" className="object-cover" />
                  </span>
                  <span className="whitespace-nowrap text-sm font-semibold leading-tight">
                    {c.label}
                    {c.count != null && <span className={`ml-1.5 text-xs font-medium ${on ? "text-night/70" : "text-white/60"}`}>{c.count}</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-30 mx-auto -mt-8 max-w-[1400px] px-4 sm:px-6 lg:px-8 md:sticky md:top-[76px]">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-white p-2.5 shadow-xl shadow-forest/10 sm:flex-nowrap sm:p-3">
          <div className="relative min-w-0 flex-1 basis-full sm:basis-auto">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold-ink" aria-hidden="true" />
            <input
              type="search"
              aria-label="Search spices"
              value={f.q}
              onChange={(e) => set({ q: e.target.value })}
              placeholder="Search by name, origin or use..."
              className="w-full rounded-xl bg-paper/70 py-3.5 pl-12 pr-4 text-base text-forest placeholder:text-forest/45 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/60"
            />
          </div>
          <p className="hidden shrink-0 border-l border-line px-4 text-sm text-forest/70 md:block" aria-live="polite">
            <strong className="text-forest">{shown.length}</strong> of {products.length} spices
          </p>
          <button
            type="button"
            onClick={() => setDrawer(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-forest px-5 py-3.5 text-sm font-semibold text-white lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filters{active.length > 0 && <span className="rounded-full bg-gold px-1.5 text-xs text-night">{active.length}</span>}
          </button>
          <label className="flex shrink-0 items-center gap-2 text-sm text-forest/70">
            <span className="hidden sm:inline">Sort by</span>
            <select
              value={f.sort}
              onChange={(e) => set({ sort: e.target.value })}
              className="rounded-xl border border-line bg-white px-4 py-3.5 text-sm font-semibold text-forest focus:border-gold focus:outline-none"
            >
              {SORTS.map((x) => (
                <option key={x.id} value={x.id}>{x.label}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-10 lg:grid lg:grid-cols-[264px_1fr] lg:gap-8 lg:px-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-line bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-forest">Filters</h2>
              {active.length > 0 && (
                <button type="button" onClick={reset} className="text-xs font-semibold text-gold-ink hover:underline">Clear all</button>
              )}
            </div>
            {panel}
          </div>
        </aside>

        <div>
          {active.length > 0 && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {active.map((a) => (
                <button
                  key={a.key}
                  type="button"
                  onClick={a.clear}
                  aria-label={`Remove filter ${a.label}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-forest hover:bg-gold/20"
                >
                  {a.label}
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              ))}
              <button type="button" onClick={reset} className="text-xs font-semibold text-gold-ink hover:underline">
                Clear all
              </button>
            </div>
          )}

          {shown.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-line bg-white p-12 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-paper-deep/60">
                <Search className="h-6 w-6 text-forest/50" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-serif text-2xl font-bold text-forest">No spices match these filters</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-forest/70">
                {f.wishlist && wishlistIds.length === 0 ? "Your wishlist is empty. Tap the heart on a product to save it." : "Try removing a filter or searching for something else."}
              </p>
              <button type="button" onClick={reset} className="mt-6 rounded-full bg-forest px-7 py-3 text-sm font-bold text-white hover:bg-deep">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="shop-grid gap-3 sm:gap-5">
              {shown.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          <p className="mt-10 text-center text-sm text-forest/60">
            Need larger quantities?{" "}
            <Link href="/#bulk-order" className="font-semibold text-gold-ink hover:underline">Send a bulk enquiry</Link>
          </p>
        </div>
      </div>

      {drawer && (
        <div role="dialog" aria-modal="true" aria-label="Filters" className="fixed inset-0 z-[100] lg:hidden">
          <button type="button" aria-label="Close filters" onClick={() => setDrawer(false)} className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-3xl bg-white">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-serif text-xl font-bold text-forest">Filters</h2>
              <button type="button" onClick={() => setDrawer(false)} aria-label="Close filters" className="flex h-9 w-9 items-center justify-center rounded-full bg-paper text-forest">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-5">{panel}</div>
            <div className="flex gap-3 border-t border-line px-5 py-4">
              <button type="button" onClick={reset} className="flex-1 rounded-full border border-line bg-white py-3 text-sm font-semibold text-forest">
                Clear all
              </button>
              <button type="button" onClick={() => setDrawer(false)} className="flex-1 rounded-full bg-forest py-3 text-sm font-bold text-white">
                Show {shown.length} {shown.length === 1 ? "spice" : "spices"}
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
  // Re-mount when the URL changes (e.g. a header search or the wishlist link) so the
  // filters pick up the new query.
  return <ShopContent key={params.toString()} />;
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <Keyed />
    </Suspense>
  );
}
