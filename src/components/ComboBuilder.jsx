"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingBag, Plus, X, ChevronRight, MousePointerClick, Ruler, ShoppingCart } from "lucide-react";
import { products } from "@/data/products";
import { defaultWeight } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

const STEPS = [
  { icon: MousePointerClick, title: "Pick your spices", text: "Tap the ones you cook with." },
  { icon: Ruler, title: "Choose pack sizes", text: "Each spice has its own sizes." },
  { icon: ShoppingCart, title: "Add them together", text: "One tap puts the lot in your cart." },
];

export default function ComboBuilder() {
  const { addToCart, openCart } = useCart();
  const { addToast } = useToast();

  const [picked, setPicked] = useState({}); // { [productId]: true }
  const [sizes, setSizes] = useState({}); // { [productId]: weight label }

  const sizeOf = (p) => sizes[p.id] || (defaultWeight(p) || p.weights?.[0])?.label || "";
  const weightOf = (p) => (p.weights || []).find((w) => w.label === sizeOf(p)) || null;
  const priceOf = (p) => weightOf(p)?.price ?? p.price;

  const toggle = (p) =>
    setPicked((prev) => {
      const next = { ...prev };
      if (next[p.id]) delete next[p.id];
      else next[p.id] = true;
      return next;
    });

  const lines = useMemo(
    () =>
      products
        .filter((p) => picked[p.id])
        .map((p) => {
          const label = sizes[p.id] || (defaultWeight(p) || p.weights?.[0])?.label;
          const w = (p.weights || []).find((x) => x.label === label) || null;
          return { product: p, weight: w, price: w ? w.price : p.price };
        }),
    [picked, sizes]
  );
  const total = lines.reduce((sum, l) => sum + l.price, 0);

  const addAll = () => {
    if (!lines.length) return;
    lines.forEach((l) => addToCart(l.product, l.weight, 1));
    addToast(`${lines.length} ${lines.length === 1 ? "item" : "items"} added to your cart`, "success");
    setPicked({});
    openCart();
  };

  const summary = (
    <>
      {lines.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-line bg-paper/60 p-5 text-center">
          <ShoppingBag className="mx-auto h-6 w-6 text-forest/35" aria-hidden="true" />
          <p className="mt-2 text-sm text-forest/65">Nothing selected yet. Tap <strong>Add</strong> on the spices you want.</p>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {lines.map((l) => (
            <li key={l.product.id} className="flex items-center gap-3">
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-paper-deep">
                <Image src={l.product.image} alt="" fill sizes="48px" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1 text-sm">
                <span className="block truncate font-semibold">{l.product.name}</span>
                <span className="text-xs text-forest/60">{l.weight?.label}</span>
              </span>
              <span className="text-sm font-bold">₹{l.price}</span>
              <button
                type="button"
                onClick={() => toggle(l.product)}
                aria-label={`Remove ${l.product.name}`}
                className="flex h-7 w-7 items-center justify-center rounded-full text-forest/50 hover:bg-paper hover:text-forest"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
        <span className="text-sm text-forest/70">Total</span>
        <span className="text-3xl font-black">₹{total}</span>
      </div>
      <p className="mt-1 text-xs text-forest/55">You pay the listed price of each pack. No bundle pricing is applied.</p>
      <button
        type="button"
        onClick={addAll}
        disabled={lines.length === 0}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-night shadow-lg shadow-gold/20 transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:bg-line disabled:text-forest/40 disabled:shadow-none"
      >
        <ShoppingBag className="h-4 w-4" />
        {lines.length > 0 ? `Add ${lines.length} ${lines.length === 1 ? "item" : "items"} to cart` : "Add to cart"}
      </button>
      {lines.length > 0 && (
        <button type="button" onClick={() => setPicked({})} className="mt-3 w-full text-center text-xs font-semibold text-gold-ink hover:underline">
          Clear selection
        </button>
      )}
    </>
  );

  return (
    <div className="bg-white text-forest">
      <section className="relative isolate overflow-hidden bg-night text-white">
        <Image src="/images/idukki-landscape.webp" alt="" fill priority sizes="100vw" className="-z-10 object-cover object-[70%_45%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/95 via-night/80 to-night/40" />
        <div className="mx-auto max-w-7xl px-4 pb-28 pt-10 sm:px-6 sm:pb-32 sm:pt-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/65">
            <Link href="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-white">Combos</span>
          </nav>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Spice Combos</p>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold leading-[1.1] sm:text-6xl">
            Build your own <span className="text-gold">spice combo</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Pick the spices you cook with and a pack size for each, then add them to your cart together.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <ol className="grid gap-3 rounded-2xl border border-line bg-white p-4 shadow-2xl shadow-forest/10 sm:grid-cols-3 sm:p-5">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="flex items-center gap-3.5">
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-gold">
                <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] font-bold text-night">{i + 1}</span>
              </span>
              <span>
                <span className="block text-sm font-bold">{title}</span>
                <span className="text-xs text-forest/60">{text}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 pb-32 pt-10 sm:px-6 lg:grid-cols-[1fr_22rem] lg:px-8 lg:pb-20">
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          {products.map((p) => {
            const on = Boolean(picked[p.id]);
            return (
              <li
                key={p.id}
                className={`flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                  on ? "border-gold shadow-lg shadow-gold/20 ring-1 ring-gold" : "border-line hover:shadow-md"
                }`}
              >
                <button type="button" onClick={() => toggle(p)} aria-pressed={on} aria-label={`${on ? "Remove" : "Add"} ${p.name}`} className="group relative block aspect-[5/4] w-full overflow-hidden bg-paper">
                  <Image src={p.image} alt="" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span
                    className={`absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                      on ? "border-gold bg-gold text-night" : "border-white/80 bg-black/25 text-white backdrop-blur-sm"
                    }`}
                  >
                    {on ? <Check className="h-4 w-4" strokeWidth={3} /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                <div className="flex flex-1 flex-col p-3.5">
                  <h2 className="font-serif text-[15px] font-bold leading-snug sm:text-base">{p.name}</h2>
                  <p className="mt-0.5 text-[11px] text-forest/55">{p.categoryName}</p>

                  <div role="group" aria-label={`Pack size for ${p.name}`} className="mt-3 flex flex-wrap gap-1.5">
                    {(p.weights || []).map((w) => (
                      <button
                        key={w.label}
                        type="button"
                        onClick={() => setSizes((prev) => ({ ...prev, [p.id]: w.label }))}
                        aria-pressed={sizeOf(p) === w.label}
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                          sizeOf(p) === w.label ? "border-forest bg-forest text-white" : "border-line bg-white text-forest hover:border-gold"
                        }`}
                      >
                        {w.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                    <span className="text-lg font-black">₹{priceOf(p)}</span>
                    <button
                      type="button"
                      onClick={() => toggle(p)}
                      aria-pressed={on}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                        on ? "bg-forest text-white" : "bg-gold text-night hover:bg-gold-light"
                      }`}
                    >
                      {on ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      {on ? "Added" : "Add"}
                    </button>
                  </div>
                  <Link href={`/product/${p.slug}`} className="mt-2.5 text-center text-[11px] font-semibold text-gold-ink hover:underline">
                    View details
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="hidden rounded-3xl border border-line bg-white p-6 shadow-xl shadow-forest/5 lg:sticky lg:top-24 lg:block" aria-live="polite" aria-label="Your combo">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold">Your combo</h2>
            {lines.length > 0 && (
              <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-forest px-2 text-xs font-bold text-white">{lines.length}</span>
            )}
          </div>
          {summary}
        </aside>
      </div>

      {/* Phone / tablet: pinned summary bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pt-3 safe-bottom shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-forest/60">
              {lines.length === 0 ? "Pick your spices" : `${lines.length} ${lines.length === 1 ? "spice" : "spices"} selected`}
            </p>
            <p className="text-xl font-black leading-tight">₹{total}</p>
          </div>
          <button
            type="button"
            onClick={addAll}
            disabled={lines.length === 0}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-night disabled:cursor-not-allowed disabled:bg-line disabled:text-forest/40"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
