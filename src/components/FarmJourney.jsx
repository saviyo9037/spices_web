import Image from "next/image";
import { Sprout, ClipboardCheck, Cog, Package, Truck } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import TornEdge from "./TornEdge";

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
    <section id="farm-to-kitchen" className="relative overflow-hidden bg-[#F6F1E4] py-20 text-[#123B22] sm:py-32">
      <TornEdge position="top" fill="#08271d" seed={2} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          align="center"
          eyebrow="Farm to Kitchen"
          title="The journey of"
          accent="your spices"
          text="From the hills of Idukki to your kitchen, in five stages."
          className="mb-14 sm:mb-20"
        />

        <ol className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {/* connecting dotted trail (desktop) */}
          <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-[88px] hidden border-t-2 border-dashed border-[#B87919]/45 lg:block" />
          {stages.map(({ icon: Icon, title, text, image, alt }, i) => (
            <li key={title} className="relative">
              <Reveal delay={i * 110} className="flex flex-col items-center text-center">
                <div className="group relative">
                  <div className="relative h-44 w-36 overflow-hidden rounded-t-[4.5rem] rounded-b-2xl border-4 border-white shadow-[0_18px_34px_-18px_rgba(9,37,21,0.55)] sm:h-48 sm:w-40">
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      loading="lazy"
                      sizes="160px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <span className="absolute -bottom-5 left-1/2 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full border-4 border-[#F6F1E4] bg-[#123B22] text-[#F5B900] shadow-md">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                </div>
                <span className="mt-9 font-script text-3xl font-bold text-[#B87919]">0{i + 1}</span>
                <h3 className="font-serif text-lg font-semibold leading-snug">{title}</h3>
                <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-[#123B22]/70">{text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
