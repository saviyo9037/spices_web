"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ShoppingBag, Zap, Truck, ListChecks, MapPin, Check, ChevronRight, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { defaultWeight } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";

const TABS = [
  { id: "overview", label: "Description" },
  { id: "culinary", label: "Taste & uses" },
  { id: "specs", label: "Details" },
];

export default function ProductDetailClient({ product, relatedProducts }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedWeight, setSelectedWeight] = useState(defaultWeight(product));
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("overview");
  const [added, setAdded] = useState(false);

  const fav = isInWishlist(product.id);
  const price = selectedWeight ? selectedWeight.price : product.price;
  const original = selectedWeight ? selectedWeight.originalPrice : product.originalPrice;
  const discount = original && original > price ? Math.round(((original - price) / original) * 100) : 0;
  const total = price * quantity;

  const add = () => {
    addToCart(product, selectedWeight, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };
  const buyNow = () => {
    addToCart(product, selectedWeight, quantity);
    router.push("/checkout");
  };

  const facts = [
    product.origin && { icon: MapPin, label: "Origin", value: product.origin },
    product.shelfLife && { icon: ListChecks, label: "Shelf life", value: product.shelfLife },
    { icon: Truck, label: "Delivery", value: "Across India" },
  ].filter(Boolean);

  const specs = [
    ["Ingredients", product.ingredients],
    ["Origin", product.origin],
    ["Harvest", product.harvestYear],
    ["Shelf life", product.shelfLife],
    ["Pack sizes", (product.weights || []).map((w) => w.label).join(", ")],
    ["Storage", "Store in a cool, dry place, away from direct sunlight, in an airtight container."],
  ].filter(([, v]) => v);

  return (
    <div className="bg-white text-forest">
      <div className="border-b border-line bg-paper/50">
        <nav aria-label="Breadcrumb" className="mx-auto flex max-w-7xl items-center gap-1.5 overflow-x-auto whitespace-nowrap px-4 py-3.5 text-xs text-forest/60 sm:px-6 lg:px-8">
          <Link href="/" className="hover:text-gold-ink">Home</Link>
          <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
          <Link href="/shop" className="hover:text-gold-ink">Shop</Link>
          <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
          <Link href={`/category/${product.category}`} className="hover:text-gold-ink">{product.categoryName}</Link>
          <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
          <span className="font-semibold text-forest">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-14 lg:px-8">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="group relative aspect-square w-full overflow-hidden rounded-3xl border border-line bg-paper shadow-xl shadow-forest/10">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-gold px-3.5 py-1 text-[11px] font-bold uppercase tracking-wide text-night shadow">
                {product.badge}
              </span>
            )}
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-pressed={fav}
              aria-label={fav ? "Remove from wishlist" : "Add to wishlist"}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-lg transition-colors hover:text-red-500"
            >
              <Heart className={`h-5 w-5 ${fav ? "fill-red-500 text-red-500" : "text-forest/70"}`} />
            </button>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-ink">{product.categoryName}</p>
          <h1 className="mt-2 font-serif text-3xl font-bold leading-[1.1] sm:text-5xl">{product.name}</h1>
          {(product.subtitle || product.tagline) && <p className="mt-2 text-lg text-forest/65">{product.subtitle || product.tagline}</p>}

          <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-1 border-y border-line py-5">
            <span className="text-4xl font-black">₹{price}</span>
            {discount > 0 && (
              <>
                <span className="pb-1 text-lg text-forest/45 line-through">₹{original}</span>
                <span className="mb-1 rounded-full bg-gold/20 px-3 py-0.5 text-xs font-bold text-gold-ink">Save {discount}%</span>
              </>
            )}
            <span className="ml-auto pb-1 text-xs text-forest/50">Inclusive of taxes</span>
          </div>

          <p className="mt-5 leading-relaxed text-forest/75">{product.shortDescription}</p>

          {product.weights?.length > 0 && (
            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="font-bold">Pack size</span>
                <span className="text-forest/60">{selectedWeight?.label}</span>
              </div>
              <div role="group" aria-label="Pack size" className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {product.weights.map((w) => {
                  const on = selectedWeight?.label === w.label;
                  return (
                    <button
                      key={w.label}
                      type="button"
                      onClick={() => setSelectedWeight(w)}
                      aria-pressed={on}
                      className={`rounded-xl border-2 px-3 py-3 text-center transition-all ${
                        on ? "border-forest bg-forest text-white shadow-lg" : "border-line bg-white hover:border-gold"
                      }`}
                    >
                      <span className="block text-sm font-bold">{w.label}</span>
                      <span className={`block text-xs ${on ? "text-gold" : "text-forest/60"}`}>₹{w.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-7 flex items-stretch gap-3">
            <div className="flex items-center rounded-xl border-2 border-line bg-white" role="group" aria-label="Quantity">
              <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="flex h-12 w-11 items-center justify-center text-forest/70 hover:text-forest">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-bold" aria-live="polite">{quantity}</span>
              <button type="button" onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity" className="flex h-12 w-11 items-center justify-center text-forest/70 hover:text-forest">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={add}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all ${
                added ? "bg-gold text-night" : "bg-forest text-white hover:bg-deep"
              }`}
            >
              {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4 text-gold" />}
              {added ? "Added to cart" : `Add to cart · ₹${total}`}
            </button>
          </div>
          <button
            type="button"
            onClick={buyNow}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-bold text-night shadow-lg shadow-gold/25 transition-colors hover:bg-gold-light"
          >
            <Zap className="h-4 w-4" /> Buy now
          </button>

          <ul className="mt-7 grid gap-3 sm:grid-cols-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-start gap-3 rounded-2xl border border-line bg-paper/50 p-4">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-ink" strokeWidth={1.5} aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.15em] text-forest/55">{label}</span>
                  <span className="text-sm font-semibold leading-snug">{value}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="border-t border-line bg-paper/40 py-12 sm:py-16" aria-label="Product details">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div role="tablist" aria-label="Product information" className="flex justify-center gap-2 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`shrink-0 rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
                  tab === t.id ? "bg-forest text-white shadow-md" : "bg-white text-forest/70 ring-1 ring-line hover:text-forest"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div role="tabpanel" className="mt-8 rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-10">
            {tab === "overview" && (
              <div>
                <h2 className="font-serif text-2xl font-bold sm:text-3xl">About {product.name}</h2>
                <p className="mt-4 text-lg leading-relaxed text-forest/75">{product.fullDescription || product.shortDescription}</p>
              </div>
            )}

            {tab === "culinary" && (
              <div className="space-y-8">
                {product.tastingNotes?.length > 0 && (
                  <div>
                    <h2 className="font-serif text-2xl font-bold">Tasting notes</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {product.tastingNotes.map((n) => (
                        <span key={n} className="rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-semibold">{n}</span>
                      ))}
                    </div>
                  </div>
                )}
                {product.culinaryUses?.length > 0 && (
                  <div>
                    <h2 className="font-serif text-2xl font-bold">How to use it</h2>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {product.culinaryUses.map((u) => (
                        <li key={u} className="flex items-start gap-3 rounded-xl border border-line bg-paper/50 p-4 text-sm">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-night">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          {u}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {tab === "specs" && (
              <div>
                <h2 className="font-serif text-2xl font-bold">Product details</h2>
                <dl className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line">
                  {specs.map(([k, v], i) => (
                    <div key={k} className={`grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr] ${i % 2 ? "bg-white" : "bg-paper/50"}`}>
                      <dt className="text-sm font-semibold text-forest/60">{k}</dt>
                      <dd className="text-sm">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </section>

      {relatedProducts?.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-4 py-14 pb-28 sm:px-6 sm:py-20 lg:px-8 lg:pb-20" aria-labelledby="related">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-ink">Keep exploring</p>
              <h2 id="related" className="mt-2 font-serif text-3xl font-bold sm:text-4xl">You may also like</h2>
            </div>
            <Link href="/shop" className="text-sm font-semibold text-gold-ink hover:underline">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} compact />
            ))}
          </div>
        </section>
      )}

      {/* Phone: pinned buy bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pt-3 safe-bottom shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-forest/60">{product.name} · {selectedWeight?.label}</p>
            <p className="text-xl font-black leading-tight">₹{total}</p>
          </div>
          <button type="button" onClick={add} className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold ${added ? "bg-gold text-night" : "bg-forest text-white"}`}>
            {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4 text-gold" />}
            {added ? "Added" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
