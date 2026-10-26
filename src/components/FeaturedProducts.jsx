"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { FORMS } from "@/lib/catalog";
import ProductCard from "./ProductCard";

// Only filters that match real catalogue data are offered.
function buildFilters() {
  const filters = [{ id: "all", label: "All", test: () => true }];
  if (products.some((p) => p.badge === "Bestseller")) {
    filters.push({ id: "best", label: "Best Sellers", test: (p) => p.badge === "Bestseller" });
  }
  FORMS.forEach((f) => {
    if (products.some((p) => p.category === f.id)) {
      filters.push({
        id: f.id,
        label: f.id === "spice-blends" ? "Spice Blends" : f.id === "whole-spices" ? "Whole Spices" : "Ground Spices",
        test: (p) => p.category === f.id,
      });
    }
  });
  return filters;
}
const FILTERS = buildFilters();

export default function FeaturedProducts() {
  const [active, setActive] = useState("all");
  const shown = useMemo(() => {
    const f = FILTERS.find((x) => x.id === active) || FILTERS[0];
    return products.filter(f.test);
  }, [active]);

  return (
    <section id="featured" className="relative isolate overflow-hidden bg-deep text-white py-14 sm:py-20">
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(217,164,65,0.08),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">Featured Products</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 text-white">Handpicked for Your Kitchen</h2>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-light self-start sm:self-auto"
          >
            <span>View all products</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div role="group" aria-label="Filter products" className="mb-8 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              aria-pressed={active === f.id}
              className={`shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                active === f.id
                  ? "border-gold bg-gold text-night font-semibold shadow-xs"
                  : "border-white/20 bg-white/10 text-white/90 hover:border-gold/60 hover:text-white hover:bg-white/15"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {shown.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
