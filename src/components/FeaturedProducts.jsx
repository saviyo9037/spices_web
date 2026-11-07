"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { FORMS } from "@/lib/catalog";
import ProductCardAdvanced from "./ProductCardAdvanced";
import SectionHead from "./SectionHead";
//...............
function buildFilters() {
  const filters = [
    {
      id: "all",
      label: "All Spices",
      test: () => true,
      count: products.length,
    },
  ];
  const bestsellers = products.filter((p) => p.badge === "Bestseller");
  if (bestsellers.length > 0) {
    filters.push({
      id: "best",
      label: "Bestsellers",
      test: (p) => p.badge === "Bestseller",
      count: bestsellers.length,
    });
  }
  FORMS.forEach((f) => {
    const matches = products.filter((p) => p.category === f.id);
    if (matches.length > 0) {
      filters.push({
        id: f.id,
        label:
          f.id === "spice-blends"
            ? "Spice Blends"
            : f.id === "whole-spices"
            ? "Whole Spices"
            : "Ground Spices",
        test: (p) => p.category === f.id,
        count: matches.length,
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
      className="relative isolate overflow-hidden bg-white pb-20 pt-14 text-[#123B22] sm:pb-32 sm:pt-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-24 -z-10 h-80 w-80 rounded-full bg-[#70A82C]/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-40 -z-10 h-96 w-96 rounded-full bg-[#F5B900]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 px-1 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <SectionHead
            eyebrow="Featured Selection"
            title="Handpicked for"
            accent="Your Kitchen"
            text="Directly sourced from estate harvests in Idukki, packed to retain pure freshness and unadulterated aroma."
          />
          <Link
            href="/shop"
            className="group hidden shrink-0 items-center gap-2 rounded-full border border-[#123B22]/25 px-6 py-3 text-sm font-bold text-[#123B22] transition-all duration-300 hover:border-[#123B22] hover:bg-[#123B22] hover:text-white active:scale-95 sm:inline-flex"
          >
            View All Spices
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        {/* Filter chips: edge-to-edge scroller on phones, 44px touch targets */}
        <div
          role="group"
          aria-label="Filter spices"
          className="no-scrollbar -mx-3 mb-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mb-10 sm:flex-wrap sm:px-1"
        >
          {FILTERS.map((f) => {
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                aria-pressed={isActive}
                className={`inline-flex min-h-[44px] shrink-0 cursor-pointer touch-manipulation items-center gap-2 rounded-full px-5 text-[13px] font-bold transition-all duration-300 active:scale-95 sm:text-sm ${
                  isActive
                    ? "bg-[#123B22] text-white shadow-lg shadow-[#123B22]/25"
                    : "border border-[#123B22]/15 bg-white text-[#123B22]/75 hover:border-[#70A82C] hover:text-[#123B22]"
                }`}
              >
                {f.label}
                <span
                  className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[10px] font-extrabold ${
                    isActive ? "bg-[#F5B900] text-[#062D1B]" : "bg-[#123B22]/10 text-[#123B22]/80"
                  }`}
                >
                  {f.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Products grid: 2 per row on phones, 3 per row from tablets up */}
        <div key={active} className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:gap-6">
          {shown.map((product, i) => (
            <div key={product.id} className="rise-in h-full" style={{ animationDelay: `${Math.min(i, 8) * 55}ms` }}>
              <ProductCardAdvanced product={product} />
            </div>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Link
            href="/shop"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#F5B900] px-8 text-sm font-extrabold text-[#062D1B] shadow-lg shadow-[#F5B900]/25 transition-all active:scale-95"
          >
            View All Spices
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
