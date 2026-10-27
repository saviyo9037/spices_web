"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, RotateCcw, ChevronRight, Sparkles, X, Check, UtensilsCrossed, Package, Layers } from "lucide-react";
import { products } from "@/data/products";
import { FORMS, USE_TAGS, allSizes, productUses, productSizes } from "@/lib/catalog";
import ProductCard from "./ProductCard";

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 ${
        active
          ? "border-forest bg-forest text-white shadow-xs"
          : "border-line bg-paper/50 text-forest/80 hover:border-gold hover:bg-white hover:text-forest"
      }`}
    >
      {children}
    </button>
  );
}

function Step({ n, icon: Icon, title, children }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3.5 flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] font-bold text-night">
          {n}
        </span>
        {Icon && <Icon className="h-3.5 w-3.5 text-gold-ink" />}
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-forest">{title}</span>
      </legend>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">{children}</div>
    </fieldset>
  );
}

export default function SpiceFinder() {
  const params = useSearchParams();
  const startForm = FORMS.some((f) => f.id === params.get("form")) ? params.get("form") : "all";

  const [form, setForm] = useState(startForm);
  const [use, setUse] = useState("all");
  const [size, setSize] = useState("all");
  const [type, setType] = useState("all");

  const sizes = useMemo(() => allSizes(), []);

  const matches = useMemo(
    () =>
      products.filter(
        (p) =>
          (type === "all" || p.id === type) &&
          (form === "all" || p.category === form) &&
          (use === "all" || productUses(p).includes(use)) &&
          (size === "all" || productSizes(p).includes(size))
      ),
    [type, form, use, size]
  );

  const dirty = type !== "all" || form !== "all" || use !== "all" || size !== "all";
  const reset = () => {
    setType("all");
    setForm("all");
    setUse("all");
    setSize("all");
  };

  const selectedSpice = products.find((p) => p.id === type);
  const selectedForm = FORMS.find((f) => f.id === form);
  const selectedUse = USE_TAGS.find((u) => u.id === use);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-forest">
      {/* Hero Header */}
      <section className="relative isolate overflow-hidden bg-night text-white">
        <Image src="/images/idukki-landscape.webp" alt="" fill priority sizes="100vw" className="-z-10 object-cover object-[70%_45%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/95 via-night/85 to-night/45" />
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 sm:pb-28 sm:pt-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/65">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-white">Spice Finder</span>
          </nav>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Interactive Catalogue</p>
          <h1 className="mt-2.5 max-w-2xl font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08]">
            Find the Right Spice <span className="text-gold italic font-serif">for Your Kitchen</span>
          </h1>
          <p className="mt-3.5 max-w-xl text-sm sm:text-base leading-relaxed text-white/80">
            Select your preferences below to discover hand-harvested Kerala spices tailored to your recipes, form, and pack requirements.
          </p>
        </div>
      </section>

      {/* Floating Interactive Finder Card */}
      <div className="relative z-10 mx-auto -mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-line bg-white p-5 shadow-xl shadow-forest/10 sm:p-8">
          {/* Step 1: Spice Avatar Carousel */}
          <Step n="1" title="Choose a spice">
            <div className="no-scrollbar -mx-2 flex w-full gap-3 overflow-x-auto px-2 pb-2 pt-1">
              {[{ id: "all", name: "All Spices", image: "/images/spice-shop-interior.jpg" }, ...products].map((p) => {
                const on = type === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setType(p.id)}
                    aria-pressed={on}
                    className="group flex w-[84px] shrink-0 flex-col items-center gap-2 text-center sm:w-24 transition-all"
                  >
                    <span
                      className={`relative block h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                        on
                          ? "border-gold ring-4 ring-gold/25 shadow-md scale-105"
                          : "border-line bg-paper/40 group-hover:border-gold/60 group-hover:scale-102"
                      }`}
                    >
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {on && (
                        <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-night shadow-xs">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </span>
                      )}
                    </span>
                    <span className={`line-clamp-2 text-xs font-semibold leading-tight ${on ? "text-gold-ink font-bold" : "text-forest/80"}`}>
                      {p.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </Step>

          {/* Steps 2, 3, 4 */}
          <div className="mt-6 grid gap-6 border-t border-line/70 pt-6 md:grid-cols-3">
            <Step n="2" icon={Layers} title="Whole or Powder">
              <Chip active={form === "all"} onClick={() => setForm("all")}>All forms</Chip>
              {FORMS.map((f) => (
                <Chip key={f.id} active={form === f.id} onClick={() => setForm(f.id)}>{f.label}</Chip>
              ))}
            </Step>
            <Step n="3" icon={UtensilsCrossed} title="Cooking Use">
              <Chip active={use === "all"} onClick={() => setUse("all")}>Any use</Chip>
              {USE_TAGS.map((t) => (
                <Chip key={t.id} active={use === t.id} onClick={() => setUse(t.id)}>{t.label}</Chip>
              ))}
            </Step>
            <Step n="4" icon={Package} title="Pack Size">
              <Chip active={size === "all"} onClick={() => setSize("all")}>Any size</Chip>
              {sizes.map((s) => (
                <Chip key={s} active={size === s} onClick={() => setSize(s)}>{s}</Chip>
              ))}
            </Step>
          </div>

          {/* Active Chips & Match Summary Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-4" aria-live="polite">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 text-xs font-semibold text-forest">
                <Sparkles className="h-3.5 w-3.5 text-gold-ink" />
                <span>
                  <strong className="text-forest font-bold">{matches.length}</strong> {matches.length === 1 ? "matching spice" : "matching spices"}
                </span>
              </span>

              {dirty && (
                <>
                  {type !== "all" && selectedSpice && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-forest">
                      {selectedSpice.name}
                      <button type="button" onClick={() => setType("all")} aria-label="Clear spice selection">
                        <X className="h-3 w-3 text-gold-ink hover:text-forest" />
                      </button>
                    </span>
                  )}
                  {form !== "all" && selectedForm && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-forest">
                      {selectedForm.label}
                      <button type="button" onClick={() => setForm("all")} aria-label="Clear form selection">
                        <X className="h-3 w-3 text-gold-ink hover:text-forest" />
                      </button>
                    </span>
                  )}
                  {use !== "all" && selectedUse && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-forest">
                      {selectedUse.label}
                      <button type="button" onClick={() => setUse("all")} aria-label="Clear use selection">
                        <X className="h-3 w-3 text-gold-ink hover:text-forest" />
                      </button>
                    </span>
                  )}
                  {size !== "all" && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-forest">
                      {size}
                      <button type="button" onClick={() => setSize("all")} aria-label="Clear size selection">
                        <X className="h-3 w-3 text-gold-ink hover:text-forest" />
                      </button>
                    </span>
                  )}
                </>
              )}
            </div>

            {dirty && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper/40 px-3.5 py-1.5 text-xs font-semibold text-gold-ink hover:bg-paper hover:text-forest transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset all</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">Recommended Spices</h2>
            <p className="text-xs sm:text-sm text-forest/65 mt-0.5">Matched from our authentic Idukki harvest</p>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-semibold text-gold-ink hover:text-forest transition-colors flex items-center gap-1"
          >
            <span>View all in shop</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {matches.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line bg-white p-12 text-center shadow-xs">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-paper-deep/60 text-forest/50">
              <Search className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-serif text-2xl font-bold text-forest">No spices match all these selections</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-forest/70">
              Try removing one or two filters, or reset choices to view all available spices.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={reset}
                className="rounded-full bg-forest px-6 py-2.5 text-sm font-bold text-white hover:bg-deep shadow-xs"
              >
                Reset choices
              </button>
              <Link
                href="/shop"
                className="rounded-full border border-line bg-white px-6 py-2.5 text-sm font-semibold text-forest hover:border-gold"
              >
                Browse full shop
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {matches.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
