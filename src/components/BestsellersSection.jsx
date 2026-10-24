import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import {
  Flame,
  ArrowRight,
  ArrowLeft,
  Leaf,
  Sprout,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function BestsellersSection() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#e6dfd5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Pure Spices Pure Wellness Promo Card matching reference image */}
          <div className="lg:col-span-3 h-full">
            <div className="relative rounded-3xl overflow-hidden shadow-md bg-[#143627] text-white p-7 sm:p-8 flex flex-col justify-between min-h-[460px] lg:h-full border border-[#0f2c1f]">
              {/* Background Image with dark overlay */}
              <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
                <Image
                  src="/images/why-choose-spices.jpg"
                  alt="Pure Spices Pure Wellness Background"
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#143627]/90 via-[#143627]/80 to-[#143627]/95" />

              <div className="relative z-10">
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-white leading-tight mb-8">
                  Pure Spices
                  <br />
                  <span className="text-[#f0c274]">Pure Wellness</span>
                </h3>

                <ul className="space-y-5">
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-[#f0c274] shrink-0">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-white/90">
                      No Preservatives
                    </span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-[#f0c274] shrink-0">
                      <Sprout className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-white/90">
                      Naturally Sourced
                    </span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-[#f0c274] shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-white/90">
                      Rich in Nutrients
                    </span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-[#f0c274] shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-white/90">
                      Authentic Taste
                    </span>
                  </li>
                </ul>
              </div>

              <div className="relative z-10 pt-8">
                <Link
                  href="/shop"
                  className="w-full py-2.5 px-5 rounded-full bg-[#dfa84a] hover:bg-[#c69238] text-[#143627] font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Products Grid */}
          <div className="lg:col-span-9 flex flex-col justify-between">
            {/* Header matching reference */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#e57a22] mb-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>BEST SELLERS</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#181818] tracking-tight">
                  Featured Products
                </h2>
                <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
                  Our most loved spices, chosen by customers across India.
                </p>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                <Link
                  href="/shop"
                  className="text-xs font-bold text-[#181818] hover:text-[#b07d22] transition-colors flex items-center gap-1"
                >
                  <span>View All Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {/* Arrow navigation buttons */}
                <div className="hidden sm:flex items-center gap-1.5">
                  <button
                    aria-label="Previous products"
                    className="w-8 h-8 rounded-full border border-[#e6dfd5] bg-white hover:bg-[#f3eee4] flex items-center justify-center text-[#555555] transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    aria-label="Next products"
                    className="w-8 h-8 rounded-full border border-[#e6dfd5] bg-white hover:bg-[#f3eee4] flex items-center justify-center text-[#555555] transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 5 Product Cards in a responsive grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
