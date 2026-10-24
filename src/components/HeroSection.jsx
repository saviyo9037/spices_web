import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Leaf, Award, Truck, Users } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="grain relative min-h-[90vh] lg:min-h-[94vh] flex flex-col justify-between bg-[#143627] overflow-hidden text-white">
      {/* Background Image: hero-banner.jpg */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Golden Spice Farm at Sunset.png"
          alt="Nature's Finest Spices"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient overlay — left side readable, right side shows image clearly */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#143627]/90 via-[#143627]/50 to-[#143627]/10" />
      </div>

      {/* Floating 100% Natural Badge on Upper Right */}
      <div className="absolute top-8 right-8 sm:top-12 sm:right-16 z-20 hidden sm:flex flex-col items-center justify-center w-20 h-20 rounded-full border border-white/20 bg-black/40 backdrop-blur-md shadow-xl text-center">
        <span className="text-xs font-black tracking-tight text-white leading-tight">
          100%
        </span>
        <span className="text-[9px] uppercase font-bold tracking-widest text-white/80">
          Natural
        </span>
        <div className="text-[#dfa84a] mt-0.5">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
          </svg>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-2xl relative">
          {/* Spaced Header Tag */}
          <div className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-white/70 uppercase mb-4">
            PURE &bull; NATURAL &bull; AUTHENTIC
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.12] tracking-tight mb-5">
            Nature&apos;s
            <br />
            Finest Spices
            <br />
            for a <span className="text-[#f0c274]">Healthier Life</span>
          </h1>

          {/* Floating Script Text (Matching reference image position) */}
          <div className="hidden md:block absolute -top-4 left-[340px] lg:left-[400px] text-[#e0b776] font-script text-3xl lg:text-4xl -rotate-6 select-none pointer-events-none drop-shadow">
            Good Spices
            <br />
            <span className="ml-6">Better Living</span>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-white/80 font-normal leading-relaxed mb-8 max-w-lg">
            Discover premium quality spices sourced from nature, carefully processed to preserve their natural aroma, flavor, and health benefits.
          </p>

          {/* CTAs matching reference */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Shop Now Button in Leaf Green */}
            <Link
              href="/shop"
              className="px-7 py-3 rounded-full bg-[#dfa84a] hover:bg-[#c69238] text-[#143627] font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-lg shadow-[#dfa84a]/30 flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Explore Our Story in Dark Glass Pill with Play Button */}
            <Link
              href="/about"
              className="px-6 py-3 rounded-full bg-black/35 hover:bg-black/50 text-white border border-white/25 hover:border-white/40 font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 backdrop-blur-md flex items-center gap-2.5"
            >
              <span>Explore Our Story</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Trust Bar matching reference */}
      <div className="relative z-10 w-full border-t border-white/10 bg-black/35 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[#dfa84a] shrink-0">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">
                  100% Natural
                </div>
                <div className="text-[11px] text-white/60">No preservatives</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[#dfa84a] shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">
                  Premium Quality
                </div>
                <div className="text-[11px] text-white/60">Carefully sourced</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[#dfa84a] shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">
                  Fast Delivery
                </div>
                <div className="text-[11px] text-white/60">Across India</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[#dfa84a] shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">
                  Trusted by 50K+
                </div>
                <div className="text-[11px] text-white/60">Happy customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
