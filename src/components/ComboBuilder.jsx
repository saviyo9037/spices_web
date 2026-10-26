"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingBag, Plus } from "lucide-react";
import { products } from "@/data/products";
import { defaultWeight } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function ComboBuilder() {
  const { addToCart, openCart } = useCart();
  const { addToast } = useToast();

  // picked: { [productId]: weightLabel }
  const [picked, setPicked] = useState({});

  const toggle = (p) =>
    setPicked((prev) => {
      const next = { ...prev };
      if (next[p.id]) delete next[p.id];
      else next[p.id] = (defaultWeight(p) || p.weights?.[0])?.label;
      return next;
    });

  const setSize = (p, label) => setPicked((prev) => ({ ...prev, [p.id]: label }));

  const lines = useMemo(
    () =>
      products
        .filter((p) => picked[p.id])
        .map((p) => {
          const w = (p.weights || []).find((x) => x.label === picked[p.id]) || null;
          return { product: p, weight: w, price: w ? w.price : p.price };
        }),
    [picked]
  );
  const total = lines.reduce((sum, l) => sum + l.price, 0);

  const addAll = () => {
    lines.forEach((l) => addToCart(l.product, l.weight, 1));
    addToast(`${lines.length} ${lines.length === 1 ? "item" : "items"} added to your cart`, "success");
    setPicked({});
    openCart();
  };

  return (
    <div className="bg-paper text-forest">
      <section className="bg-deep text-white pt-14 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">Spice Combos</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-3 max-w-2xl">Build your own spice combo</h1>
          <p className="mt-4 max-w-xl text-white/75">
            Pick the spices you cook with and the pack size for each, then add them to your cart together.
            You pay the listed price of each pack &mdash; no bundle pricing is applied.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 grid gap-8 lg:grid-cols-[1fr_22rem] items-start">
        <ul className="grid gap-3 sm:grid-cols-2">
          {products.map((p) => {
            const on = Boolean(picked[p.id]);
            return (
              <li
                key={p.id}
                className={`rounded-2xl border bg-white p-4 transition-colors ${on ? "border-gold ring-1 ring-gold" : "border-line"}`}
              >
                <div className="flex gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-paper-deep">
                    <Image src={p.image} alt={p.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-serif text-lg font-bold leading-tight">{p.name}</h2>
                    <p className="mt-0.5 text-xs text-forest/60">{p.categoryName}</p>
                    <Link href={`/product/${p.slug}`} className="mt-1 inline-block text-xs font-semibold text-gold-ink hover:underline">
                      View details
                    </Link>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <label className="sr-only" htmlFor={`size-${p.id}`}>Pack size for {p.name}</label>
                  <select
                    id={`size-${p.id}`}
                    value={picked[p.id] || (defaultWeight(p) || p.weights?.[0])?.label || ""}
                    onChange={(e) => (on ? setSize(p, e.target.value) : setPicked((prev) => ({ ...prev, [p.id]: e.target.value })))}
                    className="min-w-0 flex-1 rounded-xl border border-line bg-paper px-3 py-2.5 text-sm"
                  >
                    {(p.weights || []).map((w) => (
                      <option key={w.label} value={w.label}>
                        {w.label} &mdash; ₹{w.price}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => toggle(p)}
                    aria-pressed={on}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                      on ? "bg-forest text-white" : "bg-gold text-night hover:bg-gold-light"
                    }`}
                  >
                    {on ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {on ? "Added" : "Add"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="lg:sticky lg:top-28 rounded-3xl border border-line bg-white p-6" aria-live="polite">
          <h2 className="font-serif text-2xl font-bold">Your combo</h2>
          {lines.length === 0 ? (
            <p className="mt-3 text-sm text-forest/65">
              Nothing selected yet. Choose a pack size and press <strong>Add</strong> on the spices you want.
            </p>
          ) : (
            <>
              <ul className="mt-4 divide-y divide-line">
                {lines.map((l) => (
                  <li key={l.product.id} className="flex items-start justify-between gap-3 py-2.5 text-sm">
                    <span>
                      {l.product.name}
                      <span className="block text-xs text-forest/60">{l.weight?.label}</span>
                    </span>
                    <span className="font-semibold">₹{l.price}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                <span className="text-sm text-forest/70">Total</span>
                <span className="text-xl font-bold">₹{total}</span>
              </div>
            </>
          )}
          <button
            type="button"
            onClick={addAll}
            disabled={lines.length === 0}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ShoppingBag className="w-4 h-4" />
            Add {lines.length > 0 ? lines.length : ""} to cart
          </button>
        </aside>
      </div>
    </div>
  );
}
