"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Mountain, ShieldCheck, Truck } from "lucide-react";

const SPICES = [
  {
    slug: "black-pepper",
    name: "Black Pepper",
    theme: "green",
    badge: { icon: "👑", label: "Bestseller", color: "text-[#D97706]" },
    description: "Bold, aromatic pepper from the misty hills of Idukki.",
    image: "/images/explorer/black-pepper-transparent.png",
  },
  {
    slug: "cardamom",
    name: "Green Cardamom",
    theme: "orange",
    badge: { icon: "⭐", label: "Premium", color: "text-[#D97706]" },
    description: "Aromatic and flavorful cardamom, naturally grown in Idukki.",
    image: "/images/explorer/green-cardamom-transparent.png",
  },
  {
    slug: "cinnamon-sticks",
    name: "Cinnamon",
    theme: "green",
    badge: null,
    description: "Rich, warm and fragrant cinnamon with natural essential oils.",
    image: "/images/explorer/cinnamon-transparent.png",
  },
  {
    slug: "cloves",
    name: "Cloves",
    theme: "orange",
    badge: null,
    description: "Strong, aromatic cloves with high essential oil content.",
    image: "/images/explorer/cloves-transparent.png",
  },
  {
    slug: "turmeric-powder",
    name: "Turmeric",
    theme: "green",
    badge: null,
    description: "Pure and high-curcumin turmeric from the hills of Idukki.",
    image: "/images/explorer/turmeric-transparent.png",
  },
  {
    slug: "red-chilli-powder",
    name: "Red Chilli",
    theme: "orange",
    badge: { icon: "🔥", label: "Popular", color: "text-[#DC2626]" },
    description: "Vibrant, naturally dried red chillies with rich flavor and color.",
    image: "/images/explorer/red-chilli-transparent.png",
  },
];

export default function CategorySection() {
  return (
    <section id="categories" className="bg-[#FAF8F5] py-14 sm:py-20 text-[#143627]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-8 sm:pb-10">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Leaf className="w-4 h-4 text-[#163A12] fill-[#163A12]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#163A12]">
                Category Explorer
              </span>
              <span className="w-12 h-px bg-[#163A12]/30" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#143627] tracking-tight leading-[1.08]">
              Shop by <span className="font-serif italic font-normal text-[#E28003]">Spice</span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-[#506357] max-w-xl font-medium">
              Six signature spices, each one traced back to the hills of Kerala.
            </p>
          </div>

          <Link
            href="/spices"
            className="self-start sm:self-auto inline-flex items-center gap-2 rounded-full border border-[#143627]/70 bg-white px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#143627] shadow-2xs transition-all duration-300 hover:bg-[#143627] hover:text-white active:scale-95"
          >
            <span>Open the Spice Finder</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Spice Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-4">
          {SPICES.map((spice) => {
            const isGreen = spice.theme === "green";
            return (
              <Link
                key={spice.slug}
                href={`/product/${spice.slug}`}
                className={`group relative rounded-[28px] overflow-hidden p-4 sm:p-5 flex flex-col justify-between shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl active:scale-[0.98] ${
                  isGreen
                    ? "bg-[#183B14] hover:bg-[#153412]"
                    : "bg-[#F59702] hover:bg-[#e68d00]"
                }`}
              >
                {/* Top Badge (if any) or Empty Spacer */}
                <div className="h-6 flex items-start">
                  {spice.badge ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-extrabold shadow-xs text-slate-800 backdrop-blur-xs">
                      <span>{spice.badge.icon}</span>
                      <span className={spice.badge.color}>{spice.badge.label}</span>
                    </span>
                  ) : null}
                </div>

                {/* Spice Bowl Artwork */}
                <div className="relative w-full aspect-[4/3] my-1 sm:my-2 flex items-center justify-center">
                  <Image
                    src={spice.image}
                    alt={spice.name}
                    width={220}
                    height={160}
                    className="object-contain drop-shadow-md transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>

                {/* Text Content */}
                <div className="pt-2 flex flex-col text-left">
                  <h3 className="font-serif text-base sm:text-lg lg:text-[18px] font-bold text-white tracking-tight leading-tight">
                    {spice.name}
                  </h3>
                  <p className="mt-1.5 text-[11px] sm:text-xs text-white/90 leading-snug line-clamp-2 font-normal">
                    {spice.description}
                  </p>

                  {/* Circular White Arrow Button */}
                  <div className="mt-4 flex justify-center w-full">
                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#143627] flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FAF7EE] group-hover:shadow-lg">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Trust / Feature Pill Bar */}
        <div className="mt-12 sm:mt-16 w-full max-w-5xl mx-auto rounded-3xl sm:rounded-full bg-white border border-slate-200/90 shadow-sm py-4 px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            {/* Item 1 */}
            <div className="flex items-center gap-3 px-2 sm:px-4 py-1">
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-[#163A12] shrink-0" strokeWidth={1.8} />
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#143627] leading-tight">100% Natural</div>
                <div className="text-[10px] sm:text-[11px] text-[#55695E] leading-tight mt-0.5">
                  No Additives or Preservatives
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-3 px-2 sm:px-4 py-1 pt-3 md:pt-1">
              <Mountain className="w-5 h-5 sm:w-6 sm:h-6 text-[#163A12] shrink-0" strokeWidth={1.8} />
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#143627] leading-tight">Sourced from Idukki</div>
                <div className="text-[10px] sm:text-[11px] text-[#55695E] leading-tight mt-0.5">
                  Kerala
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-3 px-2 sm:px-4 py-1 pt-3 md:pt-1">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#163A12] shrink-0" strokeWidth={1.8} />
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#143627] leading-tight">Premium Quality</div>
                <div className="text-[10px] sm:text-[11px] text-[#55695E] leading-tight mt-0.5">
                  Handpicked & Cleaned
                </div>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-center gap-3 px-2 sm:px-4 py-1 pt-3 md:pt-1">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#163A12] shrink-0" strokeWidth={1.8} />
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#143627] leading-tight">Pan India Delivery</div>
                <div className="text-[10px] sm:text-[11px] text-[#55695E] leading-tight mt-0.5">
                  Safe & Reliable
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
