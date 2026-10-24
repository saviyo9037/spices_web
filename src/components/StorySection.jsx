import Image from "next/image";
import Link from "next/link";
import {
  Play,
  ArrowRight,
  Leaf,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
} from "lucide-react";

export default function StorySection() {
  return (
    <section className="py-14 sm:py-20 bg-[#faf7f2] border-b border-[#e6dfd5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: story-pepper-harvest.jpg with Watch Our Story overlay */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/3 sm:aspect-5/4 rounded-3xl overflow-hidden shadow-md border border-[#e6dfd5] group">
              <Image
                src="/images/story-pepper-harvest.jpg"
                alt="Hands holding fresh green pepper harvest"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

              {/* Watch Our Story Play Button Overlay matching reference */}
              <div className="absolute bottom-5 left-5 flex items-center gap-3">
                <button
                  aria-label="Play story video"
                  className="w-11 h-11 rounded-full bg-black/70 hover:bg-[#dfa84a] text-white hover:text-[#143627] flex items-center justify-center border border-white/25 transition-all shadow-md group-hover:scale-110"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </button>
                <div className="text-white">
                  <span className="font-bold text-xs sm:text-sm block leading-tight">
                    Watch Our Story
                  </span>
                  <span className="text-[11px] text-white/70">2 min video</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Narrative matching reference text */}
          <div className="lg:col-span-4 space-y-4">
            <div className="eyebrow">
              <Leaf className="w-3.5 h-3.5" />
              <span>OUR STORY 🌿</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#181818] leading-tight tracking-tight">
              From Nature
              <br />
              to Your Table
            </h2>

            <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
              At Spices, we believe in the power of pure, natural ingredients. Our spices are sourced from trusted farmers, carefully processed, and packed with care to preserve their natural aroma, flavor, and health benefits.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1c4b37] hover:bg-[#0f2c1f] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Feature items with soft green circular icons matching reference */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#f7ecd3] text-[#b07d22] flex items-center justify-center shrink-0 mt-0.5">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#181818] leading-snug">
                  Naturally Sourced
                </h4>
                <p className="text-[11px] text-[#666666] mt-0.5">
                  From trusted farms
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#f7ecd3] text-[#b07d22] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#181818] leading-snug">
                  Pure &amp; Authentic
                </h4>
                <p className="text-[11px] text-[#666666] mt-0.5">
                  No artificial additives
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#f7ecd3] text-[#b07d22] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#181818] leading-snug">
                  Rich in Flavor
                </h4>
                <p className="text-[11px] text-[#666666] mt-0.5">
                  Enhance your everyday meals
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#f7ecd3] text-[#b07d22] flex items-center justify-center shrink-0 mt-0.5">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#181818] leading-snug">
                  Support Local Farmers
                </h4>
                <p className="text-[11px] text-[#666666] mt-0.5">
                  Ethical and sustainable sourcing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
