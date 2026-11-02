import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

// The six hero spices, taken from the real catalogue so names, photos and links stay in sync.
const SPICES = [
  { slug: "black-pepper", label: "Black Pepper", text: "Sun-cured bold black peppercorns from the high ranges of Idukki.", pos: "center" },
  { slug: "cardamom", label: "Green Cardamom", text: "Hand-graded from the high altitudes of Munnar. Exquisite aroma and taste.", pos: "center" },
  { slug: "cinnamon-sticks", label: "Cinnamon", text: "True Ceylon Cinnamon with sweet, subtle woody notes.", pos: "center" },
  { slug: "cloves", label: "Cloves", text: "Deep mahogany whole cloves with intact crown and rich aroma.", pos: "center 60%" },
  { slug: "turmeric-powder", label: "Turmeric", text: "Sun-dried in small batches and cold-milled to preserve natural goodness.", pos: "center 35%" },
  { slug: "red-chilli-powder", label: "Red Chilli", text: "Stone-ground from authentic Kashmiri chillies. Vibrant colour and heat.", pos: "center 40%" },
];

const cards = SPICES.map((s) => ({ ...s, product: products.find((p) => p.slug === s.slug) })).filter((c) => c.product);

export default function CategorySection() {
  return (
    <section id="categories" className="bg-[#FAF7EF] py-16 text-[#092A20] sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-14">
          <SectionHead eyebrow="Category Explorer" title="Shop by" accent="Spice" text="Six signature spices, each one traced back to the hills of Kerala." />
          <Reveal>
            <Link
              href="/spices"
              className="group inline-flex items-center gap-2 rounded-full border border-[#123B22]/25 px-5 py-2.5 text-sm font-bold text-[#123B22] transition-all hover:border-[#123B22] hover:bg-[#123B22] hover:text-white"
            >
              Open the Spice Finder
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>

      <ul className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 sm:scroll-px-6 sm:px-6 md:mx-auto md:grid md:max-w-7xl md:grid-cols-3 md:gap-5 md:overflow-visible lg:px-8 xl:grid-cols-6">
        {cards.map(({ slug, label, text, pos, product }, i) => (
          <li key={slug} className={`w-[68%] shrink-0 snap-start sm:w-[40%] md:w-auto ${i % 2 === 1 ? "xl:mt-10" : ""}`}>
            <Reveal delay={i * 70} className="h-full">
              <Link
                href={`/product/${slug}`}
                className="group relative block aspect-[3/4.3] overflow-hidden rounded-[1.6rem] bg-[#123B22] shadow-[0_18px_40px_-22px_rgba(9,37,21,0.6)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_50px_-20px_rgba(9,37,21,0.7)]"
              >
                <Image
                  src={product.image}
                  alt={`${label} from Idukki Spices`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 68vw, (max-width: 768px) 40vw, (max-width: 1280px) 33vw, 16vw"
                  style={{ objectPosition: pos }}
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062D1B] via-[#062D1B]/35 to-transparent" />
                <span className="absolute left-4 top-4 font-script text-2xl font-bold text-[#F5B900]/90">0{i + 1}</span>
                <span className="absolute right-4 top-4 grid h-9 w-9 -translate-y-1 place-items-center rounded-full bg-[#F5B900] text-[#062D1B] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-serif text-xl font-semibold leading-tight text-white">{label}</h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-[13px] leading-relaxed text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100 max-md:max-h-24 max-md:opacity-100">
                    {text}
                  </p>
                  <span className="mt-3 block h-[3px] w-10 rounded-full bg-[#70A82C] transition-all duration-500 group-hover:w-20 group-hover:bg-[#F5B900]" />
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
