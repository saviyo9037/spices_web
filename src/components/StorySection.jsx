import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Mountain, Users, Sparkles, MapPin, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import TornEdge from "./TornEdge";

const highlights = [
  {
    icon: Mountain,
    title: "High-Altitude Terroir",
    text: "Grown at 3,500 ft in the Western Ghats, yielding rich essential oils and intense aroma.",
  },
  {
    icon: Users,
    title: "240+ Native Farming Families",
    text: "Direct, fair-trade partnerships supporting multi-generational hillside planters.",
  },
  {
    icon: Sparkles,
    title: "100% Natural Sun Curing",
    text: "Traditional shade harvesting and bamboo mat drying with zero artificial polish.",
  },
];

export default function StorySection() {
  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="relative isolate overflow-hidden bg-[#092515] py-24 text-white sm:py-32 lg:py-36"
    >
      <TornEdge position="top" fill="#FAF7EF" seed={4} />

      {/* Atmosphere: soft light, layered ridge lines, giant watermark */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_60%_at_82%_40%,rgba(112,168,44,0.20),transparent_70%),radial-gradient(ellipse_40%_40%_at_10%_90%,rgba(245,185,0,0.08),transparent_70%)]" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 top-14 -z-10 select-none font-serif text-[clamp(7rem,22vw,19rem)] font-bold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.06)]"
      >
        IDUKKI
      </span>
      <svg aria-hidden="true" viewBox="0 0 1440 220" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 w-full sm:h-56">
        <path d="M0 150 C 120 90 220 70 340 110 S 560 170 700 120 S 940 40 1080 90 S 1320 150 1440 100 V220 H0Z" fill="#0d3a22" opacity="0.65" />
        <path d="M0 190 C 160 140 260 130 400 160 S 640 200 800 160 S 1060 110 1200 150 S 1380 180 1440 160 V220 H0Z" fill="#123B22" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Narrative */}
          <Reveal className="lg:col-span-6 xl:col-span-5">
            <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.3em] text-[#F5B900]">
              <Leaf className="h-4 w-4 text-[#70A82C]" aria-hidden="true" />
              Our Heritage &amp; Origin
            </p>

            <h2 id="story-heading" className="mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[56px]">
              Rooted in the
              <span className="mt-1 block font-script text-[1.35em] font-bold leading-[0.95] text-[#F5B900]">Hills of Idukki</span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg">
              Perched high in the mist-crowned Western Ghats at 3,500 feet elevation, Idukki’s rich
              volcanic soil, mineral mountain rains, and cool climate nurture the world’s most fragrant
              and oil-dense spices.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-white/70">
              For three generations, our collective has partnered directly with native smallholder
              families — shade-growing indigenous varieties, harvesting each crop by hand, and
              sun-curing on natural bamboo mats with zero chemical additives.
            </p>

            {/* Highlights */}
            <div className="mt-8 space-y-3.5">
              {highlights.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="flex items-start gap-3.5 p-3 sm:p-3.5 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-xs transition-all hover:bg-white/10"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#F5B900]/15 text-[#F5B900] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed mt-0.5">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#F5B900] px-7 py-3.5 text-xs sm:text-sm font-bold text-[#062D1B] shadow-xl shadow-black/25 transition-all duration-300 hover:bg-[#ffcb2e] hover:-translate-y-0.5 active:scale-95"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#farm-to-kitchen"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white/90 hover:text-[#F5B900] transition-colors py-2 px-3 group"
              >
                <span>Explore Farm Journey</span>
                <span className="w-5 h-px bg-current transition-all group-hover:w-8" />
              </Link>
            </div>
          </Reveal>

          {/* Visual Showcase */}
          <Reveal delay={150} className="lg:col-span-6 xl:col-span-7">
            <div className="relative pt-6 pb-12 sm:pb-16 px-2 sm:px-6">
              {/* Main feature canvas */}
              <div className="relative h-[380px] sm:h-[460px] lg:h-[500px] w-full rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-2xl border-2 border-white/20 ring-1 ring-black/40">
                <Image
                  src="/images/Golden Spice Valley at Sunset.png"
                  alt="Misty spice plantation in the high hills of Idukki at golden hour"
                  fill
                  priority={false}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />

                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Location pill */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-[#F5B900]" />
                  <span>Western Ghats, Idukki • 3,500 ft ASL</span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 sm:left-6 sm:right-6 text-white max-w-sm">
                  <p className="font-serif italic text-lg sm:text-xl font-medium leading-snug drop-shadow-md">
                    “The soil here doesn’t just grow spices — it gives them their soul.”
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#F5B900] font-semibold tracking-wider uppercase mt-1">
                    Estate Reserve Collective
                  </p>
                </div>
              </div>

              {/* Overlapping harvest card */}
              <div className="absolute -bottom-2 right-0 sm:right-2 w-[55%] sm:w-[48%] max-w-[260px] aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-[#092515] shadow-2xl ring-1 ring-white/15 z-20 transition-transform duration-300 hover:-translate-y-1">
                <Image
                  src="/images/story-pepper-harvest.jpg"
                  alt="Hand harvesting bold black peppercorns from vines in Idukki"
                  fill
                  sizes="260px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="block text-[10px] sm:text-[11px] font-bold tracking-wide uppercase text-[#F5B900]">
                    Hand-Harvested
                  </span>
                  <span className="block text-xs font-semibold leading-tight text-white/95">
                    Peak Maturity Clusters
                  </span>
                </div>
              </div>

              {/* Single origin pill */}
              <div className="absolute bottom-4 left-0 sm:left-2 z-20 hidden sm:inline-flex items-center gap-2 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 px-4 py-2.5 shadow-lg text-white">
                <CheckCircle2 className="w-4 h-4 text-[#70A82C]" />
                <div className="text-left">
                  <span className="block text-xs font-extrabold leading-tight">100% Single-Origin</span>
                  <span className="block text-[10px] text-white/70">Direct from Idukki Valley</span>
                </div>
              </div>

              {/* Rotating seal */}
              <div className="absolute -top-2 left-2 z-30 flex h-28 w-28 items-center justify-center rounded-full bg-[#F5B900] shadow-2xl sm:left-0 sm:h-32 sm:w-32">
                <svg viewBox="0 0 120 120" className="animate-spin-slow pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                  <defs>
                    <path id="heritage-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
                  </defs>
                  <text className="fill-[#062D1B]" fontSize="8.5" fontWeight="800" letterSpacing="1.6">
                    <textPath href="#heritage-circle">ESTATE GROWN • IDUKKI • 100% PURE • </textPath>
                  </text>
                </svg>
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#062D1B]">
                  <Leaf className="h-5 w-5 fill-[#F5B900] text-[#F5B900]" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Pure White Torn Edge at bottom of StorySection that tears into FeaturedProducts */}
      <TornEdge position="bottom" fill="#FFFFFF" seed={3} className="z-20 h-[56px] sm:h-[72px]" />
    </section>
  );
}
