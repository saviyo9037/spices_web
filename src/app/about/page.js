import Image from "next/image";
import Link from "next/link";
import { Sparkles, Leaf, ShieldCheck, HeartHandshake, Award, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Story & Heritage — Sourced From Kerala's Spice Coast | Spices",
  description:
    "Learn about our heritage roots in the Western Ghats, our direct farmer partnerships, sustainable sun-drying traditions, and zero-adulteration commitment.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#faf7f2] min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative py-20 lg:py-28 bg-[#0f2c1f] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-luminosity">
          <Image
            src="/images/hero-banner.jpg"
            alt="Spice Plantation Panorama"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2c1f] via-[#0f2c1f]/90 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1b4332]/90 border border-[#dfa84a]/40 text-[#dfa84a] text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Centuries of Spice Mastery</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            Born in Kerala. Crafted by Nature.
          </h1>
          <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto">
            We started with an uncompromising vision: to bring the unadulterated aroma, natural essential oils, and heritage of single-estate Indian spices directly into your kitchen.
          </p>
        </div>
      </div>

      {/* Main Narrative with story-farm.jpg */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-xl border border-[#e6dfd5]">
              <Image
                src="/images/story-farm.jpg"
                alt="Kerala Spice Plantation Hillside"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase font-bold text-[#dfa84a] tracking-wider block mb-1">
                  Single Origin Provenance
                </span>
                <p className="font-serif text-lg font-bold">
                  Cardamom Hills &amp; Wayanad Mountain Estates
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#c69238]">
              <Leaf className="w-3.5 h-3.5" />
              <span>Sustainable Agriculture</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#143627] leading-tight">
              Where Rainforest Mist Meets Volcanic Soil
            </h2>
            <p className="text-sm sm:text-base text-[#5c6c64] leading-relaxed">
              India&apos;s Malabar Coast has enchanted travelers and traders for millennia. The combination of intense monsoon deluges, high-altitude shade canopy, and nutrient-dense humus creates the ideal microclimate for peppercorns, cardamom, ginger, and turmeric.
            </p>
            <p className="text-sm sm:text-base text-[#5c6c64] leading-relaxed">
              Unlike industrial spice processing that blends low-grade harvests from across countries to lower costs, we only package single-estate harvests from certified multi-generation family farms.
            </p>
          </div>
        </div>
      </div>

      {/* Second Story Split with story-pepper-harvest.jpg */}
      <div className="bg-white border-y border-[#e6dfd5] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#c69238]">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>The Human Touch</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#143627] leading-tight">
                Hand-Harvested with Reverence and Respect
              </h2>
              <p className="text-sm sm:text-base text-[#5c6c64] leading-relaxed">
                Every Tellicherry peppercorn vine is climbed manually using traditional bamboo ladders. Green cardamom pods are picked selectively one by one only when their seeds turn jet-black with concentrated essential oils.
              </p>
              <p className="text-sm sm:text-base text-[#5c6c64] leading-relaxed">
                By bypassing predatory brokers and paying 25% above standard market prices, we empower over 450 farmer families with stable living incomes, healthcare support, and organic farming inputs.
              </p>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 relative">
              <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-xl border border-[#e6dfd5]">
                <Image
                  src="/images/story-pepper-harvest.jpg"
                  alt="Pepper Harvesting & Sorting in Kerala"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase font-bold text-[#dfa84a] tracking-wider block mb-1">
                    Artisanal Sorting
                  </span>
                  <p className="font-serif text-lg font-bold">
                    Grade-Graded for Aroma and Size
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#143627]">
            Our Four Guiding Commitments
          </h2>
          <p className="text-sm text-[#5c6c64] mt-2">
            The values that shape every batch we harvest, mill, and deliver.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#e6dfd5] shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#143627] text-[#dfa84a] flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#143627] mb-2">
              Purity First
            </h3>
            <p className="text-xs text-[#5c6c64] leading-relaxed">
              Never dyed, never chemically fumigated, and 100% free of starch fillers or anti-caking additives.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#e6dfd5] shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#143627] text-[#dfa84a] flex items-center justify-center mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#143627] mb-2">
              Farmer Dignity
            </h3>
            <p className="text-xs text-[#5c6c64] leading-relaxed">
              Ethical trade partnerships that invest back in local educational infrastructure and regenerative agriculture.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#e6dfd5] shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#143627] text-[#dfa84a] flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#143627] mb-2">
              Cold Processing
            </h3>
            <p className="text-xs text-[#5c6c64] leading-relaxed">
              Gentle milling speeds that protect volatile terpenes from thermal damage, locking in pure fragrance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#e6dfd5] shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#143627] text-[#dfa84a] flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#143627] mb-2">
              Peak Freshness
            </h3>
            <p className="text-xs text-[#5c6c64] leading-relaxed">
              Dispatched in nitrogen-flushed barrier bags straight from the harvest season to your kitchen doorstep.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#143627] hover:bg-[#1c4b37] text-white font-bold text-sm tracking-wide uppercase transition-all shadow-md"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
