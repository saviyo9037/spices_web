"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { products } from "@/data/products";
import { FORMS } from "@/lib/catalog";
import ProductCard from "./ProductCard";

// Only filters that match real catalogue data are offered.
function buildFilters() {
  const filters = [{ id: "all", label: "All Spices", test: () => true }];
  if (products.some((p) => p.badge === "Bestseller")) {
    filters.push({ id: "best", label: "Bestsellers", test: (p) => p.badge === "Bestseller" });
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
    <section
      id="featured"
      aria-labelledby="featured-heading"
      className="relative isolate overflow-hidden bg-white text-[#143627] pt-12 pb-20 sm:pt-16 sm:pb-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Leaf className="w-4 h-4 text-[#70A82C] fill-[#70A82C]" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#143627]">
                Featured Selection
              </span>
              <span className="w-10 h-px bg-[#143627]/30" />
            </div>

            <h2
              id="featured-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#143627] tracking-tight leading-[1.08]"
            >
              Handpicked for{" "}
              <span className="font-serif italic font-normal text-[#C58A27]">Your Kitchen</span>
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm text-[#526659] max-w-xl font-medium">
              Directly sourced from estate harvests in Idukki, packed to retain pure freshness and unadulterated aroma.
            </p>
          </div>

          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 rounded-full border border-[#143627]/70 bg-white px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#143627] shadow-2xs transition-all duration-300 hover:bg-[#143627] hover:text-white self-start sm:self-auto active:scale-95"
          >
            <span>View All Spices</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div
          role="group"
          aria-label="Filter spices"
          className="mb-8 sm:mb-10 flex gap-2.5 overflow-x-auto pb-2 no-scrollbar"
        >
          {FILTERS.map((f) => {
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                aria-pressed={isActive}
                className={`shrink-0 rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#0B3320] text-white shadow-sm ring-1 ring-[#0B3320]"
                    : "bg-slate-50 border border-slate-200/90 text-slate-700 hover:border-[#0B3320]/40 hover:bg-slate-100 hover:text-[#0B3320]"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {shown.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
