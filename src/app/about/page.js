import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Users, Sprout, MapPin, ListChecks } from "lucide-react";
import { products } from "@/data/products";
import { allSizes } from "@/lib/catalog";
import FarmJourney from "@/components/FarmJourney";

export const metadata = {
  title: "About Idukki Spices",
  description:
    "Idukki Spices brings you spices from the high ranges of Kerala, sourced from trusted farmers and carefully processed to keep their natural aroma, flavour and goodness intact.",
};

// Every figure here is counted from the catalogue, not written by hand.
const stats = [
  { value: products.length, label: "spices in our range" },
  { value: new Set(products.map((p) => p.category)).size, label: "product categories" },
  { value: allSizes().length, label: "pack sizes" },
  { value: "India", label: "wide delivery" },
];

const values = [
  { icon: Users, title: "Local farmers", text: "Directly sourced." },
  { icon: Sprout, title: "Pure & natural", text: "No artificial additives." },
  { icon: MapPin, title: "From Idukki", text: "Rich in flavour." },
  { icon: ListChecks, title: "Clear information", text: "Origin, ingredients and shelf life on every product page." },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-forest">
      <section className="relative isolate overflow-hidden bg-night text-white">
        <Image src="/images/idukki-landscape.webp" alt="" fill priority sizes="100vw" className="-z-10 object-cover object-[70%_45%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/95 via-night/80 to-night/40" />
        <div className="mx-auto max-w-7xl px-4 pb-28 pt-10 sm:px-6 sm:pb-32 sm:pt-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/65">
            <Link href="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-white">About</span>
          </nav>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">About Idukki Spices</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold leading-[1.1] sm:text-6xl">
            Rooted in the hills <span className="text-gold">of Idukki</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Spices from the high ranges of Kerala, brought to your kitchen with their natural aroma and flavour intact.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 divide-x divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white shadow-2xl shadow-forest/10 lg:grid-cols-4 lg:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="px-5 py-6 text-center sm:py-8">
              <dt className="font-serif text-3xl font-bold text-gold-ink sm:text-4xl">{s.value}</dt>
              <dd className="mt-1 text-sm text-forest/65">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:px-8" aria-labelledby="our-story">
        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-forest/15">
            <Image src="/images/story-hills-sunrise.jpg" alt="Sunrise over the misty hills and spice plantations of Idukki" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-2 hidden h-36 w-44 rotate-3 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:block lg:-right-6">
            <Image src="/images/story-green-peppercorn.jpg" alt="Fresh green peppercorns held in a hand" fill sizes="176px" className="object-cover" />
          </div>
        </div>

        <div className="lg:col-span-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-ink">Our story</p>
          <h2 id="our-story" className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-5xl">Rooted in the Hills of Idukki</h2>
          <p className="mt-6 text-lg leading-relaxed text-forest/80">
            Idukki Spices brings you spices from the high ranges of Kerala, sourced from trusted farmers and carefully
            processed to keep their natural aroma, flavour and goodness intact.
          </p>
          <p className="mt-4 leading-relaxed text-forest/70">
            The cool, misty hills of Idukki are known for spices such as pepper and cardamom. We bring a
            selection of them to you as whole spices, ground spices and blends, in pack sizes that suit a home kitchen.
          </p>
          <p className="mt-4 leading-relaxed text-forest/70">
            We keep things simple: tell you where each spice comes from, list what is in every pack, and make it easy to
            choose the size you need.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-night transition-colors hover:bg-gold-light">
              Shop our spices <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-bold text-forest transition-colors hover:border-gold">
              Read recipes &amp; guides
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-deep py-16 text-white sm:py-24" aria-labelledby="values">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">What we stand for</p>
            <h2 id="values" className="mt-3 font-serif text-3xl font-bold sm:text-5xl">Simple, honest spices</h2>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm transition-colors hover:border-gold/50 hover:bg-white/10">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-night">
                  <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-serif text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FarmJourney />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-label="Photo gallery">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["/images/story-green-peppercorn.jpg", "Hands holding fresh green peppercorns on the vine"],
            ["/images/story-cardamom-bowl.jpg", "Green cardamom pods in a wooden bowl"],
            ["/images/story-farm.jpg", "Spice plantation on the hills"],
          ].map(([src, alt]) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={src} alt={alt} fill loading="lazy" sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-night py-16 text-white sm:py-20">
        <Image src="/images/clove-bulk-background.webp" alt="" fill loading="lazy" sizes="100vw" className="-z-10 object-cover object-[12%_85%]" />
        <div className="absolute inset-0 -z-10 bg-night/75" />
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-bold sm:text-5xl">
            Bring Idukki <span className="text-gold">to your kitchen</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">Browse the range, or get in touch if you have a question about an order or a spice.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-bold text-night transition-colors hover:bg-gold-light">
              Explore the shop <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center rounded-full border border-white/40 px-8 py-3.5 text-sm font-bold text-white transition-colors hover:border-gold hover:text-gold">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
