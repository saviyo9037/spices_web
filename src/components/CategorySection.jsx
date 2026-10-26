import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import Reveal from "./Reveal";

// The six hero spices, taken from the real catalogue so names, photos and links stay in sync.
const SPICES = [
  { slug: "black-pepper", label: "Black Pepper" },
  { slug: "cardamom", label: "Green Cardamom" },
  { slug: "cinnamon-sticks", label: "Cinnamon" },
  { slug: "cloves", label: "Cloves" },
  { slug: "turmeric-powder", label: "Turmeric" },
  { slug: "red-chilli-powder", label: "Red Chilli" },
];

const cards = SPICES.map((s) => ({ ...s, product: products.find((p) => p.slug === s.slug) })).filter((c) => c.product);

export default function CategorySection() {
  return (
    <section id="categories" className="bg-deep text-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">Category Explorer</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">Shop by Spice</h2>
          </div>
          <Link
            href="/spices"
            className="group hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-light"
          >
            Open the Spice Finder
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <ul className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:px-6 md:mx-auto md:grid md:max-w-7xl md:grid-cols-3 md:overflow-visible lg:px-8 xl:grid-cols-6 sm:gap-4">
        {cards.map(({ slug, label, product }) => (
          <li key={slug} className="w-[68%] shrink-0 snap-start sm:w-[44%] md:w-auto">
            <Link
              href={`/product/${slug}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-night"
            >
              <Image
                src={product.image}
                alt={`${label} from Idukki Spices`}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 68vw, (max-width: 768px) 44vw, (max-width: 1280px) 33vw, 16vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-serif text-xl font-bold">{label}</h3>
                <p className="mt-1 text-[11px] leading-snug text-white/75 line-clamp-2">{product.shortDescription}</p>
                <span className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-gold transition-all group-hover:gap-2.5">
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
