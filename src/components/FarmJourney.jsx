import Image from "next/image";
import { Sprout, ClipboardCheck, Cog, Package, Truck } from "lucide-react";
import Reveal from "./Reveal";

// General process stages. Specific methods are deliberately not claimed here; add them once the
// business has confirmed them.
const stages = [
  { icon: Sprout, title: "Growing & harvesting", text: "Spices are grown and harvested in the hills of Idukki, Kerala.", image: "/images/story-farm.jpg", alt: "Spice plantation in the hills" },
  { icon: ClipboardCheck, title: "Selection & sourcing", text: "Each lot is selected before it is accepted for our range.", image: "/images/story-pepper-harvest.jpg", alt: "Freshly harvested pepper" },
  { icon: Cog, title: "Processing", text: "Whole spices are cleaned and, where the product calls for it, ground.", image: "/images/category-ground-spices.jpg", alt: "Ground spices" },
  { icon: Package, title: "Packaging", text: "Packed in the pack sizes you see on each product page.", image: "/images/category-spice-blends.jpg", alt: "Packed spice blends" },
  { icon: Truck, title: "Delivery", text: "Shipped to your door across India.", image: "/images/category-whole-spices.jpg", alt: "Whole spices ready to ship" },
];

export default function FarmJourney() {
  return (
    <section id="farm-to-kitchen" className="bg-paper text-forest py-16 sm:py-24 border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mb-12">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-gold-ink">Farm to Kitchen</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">The journey of your spices</h2>
          <p className="mt-4 text-forest/70">From the hills of Idukki to your kitchen, in five stages.</p>
        </Reveal>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stages.map(({ icon: Icon, title, text, image, alt }, i) => (
            <li key={title}>
              <Reveal delay={i * 80} className="h-full">
                <div className="group h-full overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-lg">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-forest text-xs font-bold text-gold">
                      {i + 1}
                    </span>
                  </div>
                  <div className="p-5">
                    <Icon className="w-5 h-5 text-gold-ink" strokeWidth={1.6} aria-hidden="true" />
                    <h3 className="font-serif text-lg font-bold mt-2">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-forest/70">{text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
