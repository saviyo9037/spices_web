import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import Reveal from "./Reveal";

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
    <section id="categories" className="bg-[#FAF7EF] text-[#092A20] py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8 sm:mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#B87919]">Category Explorer</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">Shop by Spice</h2>
          </div>
          <Link
            href="/spices"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#B87919] transition-colors hover:text-[#092A20]"
          >
            <span><span className="hidden sm:inline">Open the </span>Spice Finder</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <ul className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 sm:scroll-px-6 gap-3 overflow-x-auto px-4 pb-2 sm:px-6 md:mx-auto md:grid md:max-w-7xl md:grid-cols-3 md:overflow-visible lg:px-8 xl:grid-cols-6 sm:gap-4 md:gap-5">
        {cards.map(({ slug, label, text, pos, product }) => (
          <li key={slug} className="w-[72%] shrink-0 snap-start sm:w-[44%] md:w-auto">
            <Link
              href={`/product/${slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8E0D2] bg-white"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E8E0D2]">
                <Image
                  src={product.image}
                  alt={`${label} from Idukki Spices`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 72vw, (max-width: 768px) 44vw, (max-width: 1280px) 33vw, 16vw"
                  style={{ objectPosition: pos }}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col border-t border-[#E8E0D2] p-4">
                <h3 className="font-serif text-xl font-bold leading-tight">{label}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#555650]">{text}</p>
                <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#B87919] transition-all group-hover:gap-2.5 group-hover:text-[#092A20]">
                  Shop now <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
