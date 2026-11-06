import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import TornEdge from "./TornEdge";

const facts = [
  { value: "3,500 ft", label: "high in the Western Ghats" },
  { value: "240+", label: "native farming families" },
  { value: "100%", label: "natural sun curing" },
];

// Three equal arches on one line: pepper in the hand, the Munnar hills, coffee cherries.
const photos = [
  {
    src: "/rootedhills/web-graamya.jpg",
    alt: "A hand holding freshly picked pepper berries",
    fit: "origin-right scale-[1.55] object-cover object-right",
  },
  {
    src: "/rootedhills/web-munnar.jpg",
    alt: "Terraced hillsides and a winding road in Munnar, Idukki, at dusk",
    fit: "object-cover object-center",
  },
  {
    src: "/rootedhills/web-coffee.jpg",
    alt: "Ripe red coffee cherries beside roasted coffee beans",
    fit: "object-cover object-center",
  },
];

export default function StorySection() {
  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="relative isolate overflow-hidden bg-[#092515] py-20 text-white sm:py-28 lg:py-32"
    >
      <TornEdge position="top" fill="#FAF7EF" seed={4} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_85%_20%,rgba(112,168,44,0.20),transparent_70%),radial-gradient(ellipse_40%_40%_at_5%_95%,rgba(245,185,0,0.08),transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Row 1: heading on the left, copy and actions on the right, same top edge */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.3em] text-[#F5B900]">
              <Leaf className="h-4 w-4 text-[#70A82C]" aria-hidden="true" />
              Our heritage and origin
            </p>
            <h2 id="story-heading" className="mt-5 font-serif text-4xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.4rem]">
              Rooted in the
              <span className="mt-1 block font-script text-[1.3em] font-bold leading-[0.95] text-[#F5B900]">Hills of Idukki</span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-9">
            <p className="text-base leading-relaxed text-white/85 sm:text-lg">
              Our spices grow in the cool, misty Western Ghats, where volcanic soil and mountain rain give pepper,
              cardamom and cloves their strong aroma. Local families grow them in the shade, pick them by hand and dry
              them in the sun on bamboo mats.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/about"
                className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#F5B900] px-8 text-sm font-extrabold text-[#062D1B] shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffcb2e] active:scale-95"
              >
                Read our story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link href="#farm-to-kitchen" className="group inline-flex items-center gap-2 text-sm font-bold text-white/90 transition-colors hover:text-[#F5B900]">
                See how it reaches you
                <span aria-hidden="true" className="h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
              </Link>
            </div>
          </div>
        </div>

        {/* Row 2: three equal arch photographs on one line */}
        <ul className="mt-14 grid grid-cols-3 gap-2.5 sm:mt-16 sm:gap-6 lg:gap-8">
          {photos.map((p, i) => (
            <li key={p.src}>
              <div>
                <div className="group relative aspect-[3/4.4] overflow-hidden rounded-t-[999px] rounded-b-2xl shadow-[0_30px_60px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/15 sm:rounded-b-3xl">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1280px) 400px, 33vw"
                    className={`${p.fit} transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]`}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Row 3: the three facts under the photographs, on the same grid lines */}
        <dl className="mt-12 grid grid-cols-3 gap-2.5 border-t border-white/15 pt-8 sm:gap-6 lg:gap-8">
          {facts.map(({ value, label }) => (
            <div key={value}>
              <dt className="font-serif text-2xl font-semibold text-[#F5B900] sm:text-5xl">{value}</dt>
              <dd className="mt-2 text-xs leading-snug text-white/75 sm:text-base">{label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <TornEdge position="bottom" fill="#FFFFFF" seed={3} className="z-20 h-[56px] sm:h-[72px]" />
    </section>
  );
}
