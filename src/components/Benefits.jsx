import Image from "next/image";
import Link from "next/link";
import { ListChecks, Ruler, Truck, MessageCircle, ArrowRight } from "lucide-react";

const benefits = [
  { icon: ListChecks, title: "Clear product information", text: "Origin, ingredients and shelf life are listed on every product page." },
  { icon: Ruler, title: "Pack sizes that fit", text: "Choose the size you need, from small packs to larger ones." },
  { icon: Truck, title: "Delivery across India", text: "Orders ship to addresses across India." },
  { icon: MessageCircle, title: "Help when you need it", text: "Questions about an order or a spice? Our contact page has the details." },
];

// Editorial layout on a cream ground: heading and action on one line, the four reasons as plain columns
// separated by thin rules (stacked rows on phones), then one wide photograph.
export default function Benefits() {
  return (
    <section aria-labelledby="benefits-heading" className="bg-[#FAF7EF] px-4 py-16 text-[#123B22] sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading row */}
        <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#3f6a12]">Why Idukki Spices</p>
            <h2 id="benefits-heading" className="mt-3 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Shopping made
              <span className="ml-3 font-script text-[1.25em] font-bold text-[#B87919]">simple</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-[#123B22]/85 sm:text-lg">
              From our hills to your home, a smooth and trusted shopping experience.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href="/contact"
                className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#123B22] px-7 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1c5336] active:scale-95"
              >
                Contact us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <span className="text-xs text-[#123B22]/75 sm:text-sm">For shipping, returns and payment questions.</span>
            </div>
          </div>
        </div>

        {/* The four reasons */}
        <ol className="mt-12 grid border-y border-[#123B22]/15 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className="flex gap-4 border-b border-[#123B22]/15 py-6 last:border-b-0 sm:flex-col sm:gap-5 sm:px-6 sm:py-8 sm:[&:nth-child(2n)]:border-l lg:border-b-0 lg:first:pl-0 lg:[&:not(:first-child)]:border-l"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#F5B900] text-[#062D1B]">
                <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold tabular-nums tracking-[0.2em] text-[#B87919]">0{i + 1}</p>
                <h3 className="mt-1 font-serif text-xl font-semibold leading-snug sm:text-2xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#123B22]/80 sm:text-base">{text}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Wide photograph */}
        <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[1.5rem] sm:mt-14 sm:aspect-[21/9] sm:rounded-[2.25rem]">
          <Image
            src="/images/Idukki Spices_ Pepper and Aromatic Treasures.png"
            alt="Wooden bowls of black pepper, cardamom and turmeric with cinnamon, cloves and red chillies"
            fill
            loading="lazy"
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover object-[60%_85%]"
          />
        </div>
      </div>
    </section>
  );
}
