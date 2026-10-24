import Image from "next/image";
import Link from "next/link";
import {
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  Truck,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { features } from "@/data/features";

export default function WhyChooseUs() {
  const iconMap = {
    Leaf: Leaf,
    MapPin: MapPin,
    ShieldCheck: ShieldCheck,
    Sparkles: Sparkles,
    Truck: Truck,
    HeartHandshake: HeartHandshake,
  };

  return (
    <section className="py-20 md:py-28 bg-white border-b border-[#e6dfd5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#c69238] mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Spices Difference</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#143627] tracking-tight">
            Why Discerning Chefs &amp; Families Choose Us
          </h2>
          <p className="text-sm sm:text-base text-[#5c6c64] mt-3">
            Pure botanical heritage, uncompromised ethical standards, and fresh small-batch processing designed for culinary excellence and daily vitality.
          </p>
        </div>

        {/* Layout: Promotional Image on left (or center) and Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Promotional Visual using why-choose-spices.jpg */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[480px] sm:h-[560px] w-full rounded-3xl overflow-hidden shadow-2xl border border-[#e6dfd5] group">
              <Image
                src="/images/why-choose-spices.jpg"
                alt="Why Choose Spices - Authentic Pure Spices Board"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f2c1f]/90 via-[#0f2c1f]/30 to-transparent" />
              
              {/* Overlay Content */}
              <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
                <div className="inline-block px-3 py-1 rounded-full bg-[#dfa84a] text-[#0f2c1f] font-bold text-xs uppercase tracking-wider">
                  Guaranteed Pure
                </div>
                <h3 className="font-serif text-2xl font-bold leading-snug">
                  From Plantation Soil Straight to Your Table
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Every grain, pod, and quill is scrutinized under stringent laboratory tests for pesticide residues, moisture levels, and essential volatile oil concentration.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#dfa84a] hover:text-white transition-colors pt-2"
                >
                  <span>Experience The Purity</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Feature Grid: 6 Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feature) => {
              const IconComponent = iconMap[feature.icon] || Sparkles;
              return (
                <div
                  key={feature.id}
                  className="p-5 rounded-2xl bg-[#faf7f2] border border-[#e6dfd5] hover:border-[#dfa84a]/60 hover:shadow-lg hover:bg-white transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#143627] text-[#dfa84a] flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:bg-[#dfa84a] group-hover:text-[#143627] transition-all">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#143627] group-hover:text-[#c69238] transition-colors mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-[#5c6c64] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
