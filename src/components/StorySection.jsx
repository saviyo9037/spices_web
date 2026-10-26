import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf as LeafIcon, Users, Sprout, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import Leaf from "./BotanicalLeaf";

const highlights = [
  { icon: Users, title: "Local Farmers", text: "Directly sourced" },
  { icon: Sprout, title: "Pure & Natural", text: "No artificial additives" },
  { icon: MapPin, title: "From Idukki", text: "Rich in flavour" },
];

export default function StorySection() {
  return (
    <section id="story" className="relative isolate overflow-hidden bg-[#F8F3E8] text-[#0B3328] py-16 sm:py-24">
      <Image
        src="/images/story-hills-sunrise.jpg"
        alt="Misty spice plantation in the hills of Idukki at sunrise"
        fill
        loading="lazy"
        sizes="100vw"
        className="-z-10 object-cover object-[center_35%]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#F8F3E8]/95 via-[#F8F3E8]/85 to-[#F8F3E8]/20 lg:bg-gradient-to-r lg:from-[#F8F3E8] lg:via-[#F8F3E8]/90 lg:via-40% lg:to-transparent lg:to-70%" />
      <Leaf className="pointer-events-none absolute -left-8 bottom-0 h-56 w-56 text-forest/[0.07] rotate-12" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        <Reveal className="lg:col-span-5">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C58A27]">
            <LeafIcon className="w-4 h-4" aria-hidden="true" /> Our Story
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mt-4">
            Rooted in the
            <br />
            Hills of <span className="text-[#C58A27]">Idukki</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#6b6d65] max-w-md">
            Idukki Spices brings you spices from the high ranges of Kerala, sourced from trusted
            farmers and carefully processed to keep their natural aroma, flavour and goodness intact.
          </p>
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#C58A27] px-8 py-3.5 text-sm font-bold text-[#0B3328] transition-all duration-300 hover:bg-[#d79a35] hover:-translate-y-0.5 active:scale-95"
          >
            Discover Our Story
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <ul className="mt-10 grid grid-cols-1 gap-5 border-t border-[#0B3328]/15 pt-6 sm:flex sm:flex-wrap sm:gap-x-8">
            {highlights.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-center gap-3">
                <Icon className="h-7 w-7 shrink-0 text-[#C58A27]" strokeWidth={1.4} aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold">{title}</p>
                  <p className="text-xs text-[#6b6d65]">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <div className="relative h-[380px] sm:h-[500px] lg:h-[540px]">
            {/* Pure Spices script text */}
            <div className="absolute bottom-4 left-2 sm:bottom-8 sm:left-4 z-10">
              <p className="font-script text-3xl sm:text-4xl lg:text-5xl leading-none text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)] -rotate-3 select-none">
                Pure Spices
                <br />
                <span className="ml-4">Pure Kerala</span>
              </p>
            </div>

            {/* Peppercorn Card */}
            <div className="absolute right-0 top-0 h-[46%] w-[48%] sm:w-[44%] rotate-3 overflow-hidden rounded-2xl border-4 border-white shadow-xl transition-transform hover:rotate-0 hover:scale-105 duration-300">
              <Image
                src="/images/story-green-peppercorn.jpg"
                alt="Hands holding freshly harvested green pepper"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 45vw, 22vw"
                className="object-cover"
              />
            </div>

            {/* Cardamom Card */}
            <div className="absolute right-[4%] sm:right-[6%] bottom-0 h-[46%] w-[48%] sm:w-[44%] -rotate-3 overflow-hidden rounded-2xl border-4 border-white shadow-xl transition-transform hover:rotate-0 hover:scale-105 duration-300">
              <Image
                src="/images/story-cardamom-bowl.jpg"
                alt="Green cardamom pods"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 45vw, 22vw"
                className="object-cover"
              />
            </div>

            {/* Supporting Local Farmers Badge */}
            <div className="absolute right-[36%] sm:right-[38%] top-[38%] flex h-22 w-22 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-paper shadow-lg ring-1 ring-gold/40 z-20">
              <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <defs>
                  <path id="badge-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
                </defs>
                <text className="fill-forest" fontSize="10" fontWeight="700" letterSpacing="2.4">
                  <textPath href="#badge-circle">SUPPORTING LOCAL FARMERS &#8226; </textPath>
                </text>
              </svg>
              <LeafIcon className="h-6 w-6 sm:h-7 sm:w-7 text-gold-ink" strokeWidth={1.4} aria-hidden="true" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
