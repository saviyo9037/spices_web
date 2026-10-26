import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Leaf, Package, Truck } from "lucide-react";

// Trust points supported by the catalogue (origin, ingredients, pack sizes) and the site's
// existing delivery copy.
const trust = [
  { icon: MapPin, label: "Sourced from Idukki, Kerala" },
  { icon: Leaf, label: "Ingredients listed on every pack" },
  { icon: Package, label: "Pack sizes for every kitchen" },
  { icon: Truck, label: "Delivery across India" },
];

export default function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate bg-night text-white">
      <div className="relative min-h-[88svh] flex items-end md:items-center overflow-hidden">
        <Image
          src="/images/idukki-spices-hero.png"
          alt="A bowl of golden turmeric powder with cinnamon sticks, star anise, cardamom and bay leaves"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[68%_50%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/95 via-night/60 to-night/10 md:bg-gradient-to-r md:from-night/85 md:via-night/35 md:via-45% md:to-transparent" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/60 to-transparent" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 md:pb-20">
          <div className="max-w-xl">
            <p className="rise-in text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-gold">
              Pure flavours from the hills
            </p>
            <h1
              id="hero-heading"
              className="rise-in mt-4 font-serif font-bold leading-[1.05] tracking-tight text-[clamp(2.4rem,5.6vw,4.4rem)]"
              style={{ animationDelay: "100ms" }}
            >
              Authentic Idukki Spices
            </h1>
            <p
              className="rise-in mt-5 max-w-md text-base sm:text-lg leading-relaxed text-white"
              style={{ animationDelay: "200ms" }}
            >
              Naturally grown. Traditionally sourced. From the green hills of Idukki to your kitchen.
            </p>
            <div className="rise-in mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "300ms" }}>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-3.5 text-sm font-bold text-night shadow-xl shadow-black/30 transition-all duration-300 hover:bg-gold-light hover:-translate-y-0.5 active:scale-95"
              >
                Shop Our Spices
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#journey"
                className="inline-flex items-center rounded-full border border-white/40 bg-black/20 px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:border-gold hover:text-gold active:scale-95"
              >
                Watch Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-deep border-t border-gold/20">
        <ul aria-label="Why shop with Idukki Spices" className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 px-4 sm:px-6 lg:px-8">
          {trust.map(({ icon: Icon, label }, i) => (
            <li
              key={label}
              className={`flex items-center gap-3 py-4 px-2 sm:px-4 text-xs sm:text-sm text-white/85 ${
                i % 2 === 1 ? "border-l border-white/10" : ""
              } ${i >= 2 ? "border-t border-white/10 lg:border-t-0" : ""} ${i > 0 ? "lg:border-l lg:border-white/10" : ""}`}
            >
              <Icon className="w-5 h-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
