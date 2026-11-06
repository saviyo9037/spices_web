import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import TornEdge from "./TornEdge";

const facts = [
  { value: "3,500 ft", label: "high in the Western Ghats" },
  { value: "240+", label: "native farming families" },
  { value: "100%", label: "natural sun curing" },
];

// Three photo "sheets" (nutmeg in hand, misty spice forest, coffee cherries). As the page scrolls they stack one on top of the other: each sheet sticks a
// little lower than the last, slightly turned, so a corner of the one underneath stays visible.
const sheets = [
  {
    src: "/rootedhills/web-nutmeg.jpg",
    alt: "A hand holding a ripe nutmeg fruit split open to show the red mace",
    fit: "object-cover object-[50%_35%]",
    turn: "-rotate-2 -translate-x-2 sm:-translate-x-4",
    peek: "01",
  },
  {
    src: "/rootedhills/web-estate.jpg",
    alt: "Mist drifting through shaded trees above a spice plantation in the hills",
    fit: "object-cover object-center",
    turn: "rotate-[1.8deg] translate-x-2 sm:translate-x-4",
    peek: "02",
  },
  {
    src: "/rootedhills/web-coffee.jpg",
    alt: "Ripe red coffee cherries beside roasted coffee beans",
    fit: "object-cover object-center",
    turn: "-rotate-2 -translate-x-2 sm:-translate-x-4",
    peek: "03",
  },
];

export default function StorySection() {
  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="relative isolate overflow-x-clip bg-[#092515] pb-24 pt-20 text-white sm:pb-32 sm:pt-28"
    >
      <TornEdge position="top" fill="#FAF7EF" seed={4} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_85%_20%,rgba(112,168,44,0.20),transparent_70%),radial-gradient(ellipse_40%_40%_at_5%_95%,rgba(245,185,0,0.08),transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Copy: stays in view while the photo sheets stack up on the right */}
          <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
            <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.3em] text-[#F5B900]">
              <Leaf className="h-4 w-4 text-[#70A82C]" aria-hidden="true" />
              Our heritage and origin
            </p>
            <h2 id="story-heading" className="mt-5 font-serif text-4xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
              Rooted in the
              <span className="mt-1 block font-script text-[1.3em] font-bold leading-[0.95] text-[#F5B900]">Hills of Idukki</span>
            </h2>
            <p className="mt-7 text-base leading-relaxed text-white/85 sm:text-lg">
              Our spices grow in the cool, misty Western Ghats, where volcanic soil and mountain rain give pepper,
              cardamom and cloves their strong aroma. Local families grow them in the shade, pick them by hand and dry
              them in the sun on bamboo mats.
            </p>

            <dl className="mt-9 grid grid-cols-3 divide-x divide-white/15 border-y border-white/15 py-5">
              {facts.map(({ value, label }) => (
                <div key={value} className="px-3 first:pl-0 sm:px-5">
                  <dt className="font-serif text-2xl font-semibold text-[#F5B900] sm:text-3xl">{value}</dt>
                  <dd className="mt-1.5 text-xs leading-snug text-white/75 sm:text-sm">{label}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
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

          {/* Photo sheets: each one sticks and stacks over the one before it at the top */}
          <ol className="relative mx-auto w-full max-w-[520px] pb-12 sm:pb-20 lg:col-span-7 lg:max-w-none lg:pl-10 lg:pb-28">
            {sheets.map((s, i) => (
              <li
                key={s.src}
                className={`sticky ${i < sheets.length - 1 ? "mb-[34vh] lg:mb-[42vh]" : "mb-[32vh] lg:mb-[38vh]"}`}
                style={{
                  top: `calc(4.75rem + ${i * 8}px)`,
                  zIndex: i + 1,
                }}
              >
                <div className={`relative mx-auto aspect-[4/4.6] w-full max-w-[520px] overflow-hidden rounded-[1.6rem] border-[10px] border-[#FAF7EF] bg-[#FAF7EF] shadow-[0_18px_36px_-14px_rgba(0,0,0,0.75)] sm:rounded-[2rem] sm:border-[12px] ${s.turn}`}>
                  <div className="relative h-full w-full overflow-hidden rounded-[1rem] sm:rounded-[1.4rem]">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1024px) 480px, (min-width: 640px) 440px, 80vw"
                      className={s.fit}
                    />
                  </div>
                  <span aria-hidden="true" className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-[#F5B900] font-serif text-sm font-bold text-[#062D1B] shadow-md sm:left-4 sm:top-4">
                    {s.peek}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <TornEdge position="bottom" fill="#FFFFFF" seed={3} className="z-20 h-[56px] sm:h-[72px]" />
    </section>
  );
}
