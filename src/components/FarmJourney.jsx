"use client";

import { useState } from "react";
import Image from "next/image";
import { Sprout, ClipboardCheck, Cog, Package, Truck } from "lucide-react";
import SectionHead from "./SectionHead";
import TornEdge from "./TornEdge";

// General process stages. Specific methods are deliberately not claimed here; add them once the
// business has confirmed them.
const stages = [
  { icon: Sprout, title: "Growing and harvesting", text: "Spices are grown and harvested in the hills of Idukki, Kerala.", image: "/images/story-farm.jpg", alt: "Spice plantation in the hills" },
  { icon: ClipboardCheck, title: "Selection and sourcing", text: "Each lot is selected before it is accepted for our range.", image: "/images/story-pepper-harvest.jpg", alt: "Freshly harvested pepper" },
  { icon: Cog, title: "Processing", text: "Whole spices are cleaned and, where the product calls for it, ground.", image: "/images/category-ground-spices.jpg", alt: "Ground spices" },
  { icon: Package, title: "Packaging", text: "Packed in the pack sizes you see on each product page.", image: "/images/category-spice-blends.jpg", alt: "Packed spice blends" },
  { icon: Truck, title: "Delivery", text: "Shipped to your door across India.", image: "/images/category-whole-spices.jpg", alt: "Whole spices ready to ship" },
];

// Phones: five stacked steps joined by a line, each with its own photo.
// Desktop: a step list on the left; choosing a step (hover, click or keyboard) shows its photo large on the right.
export default function FarmJourney() {
  const [active, setActive] = useState(0);

  return (
    <section id="farm-to-kitchen" className="relative overflow-hidden bg-[#092515] py-20 text-white sm:py-28 lg:py-32">
      <TornEdge position="top" fill="#FFFFFF" seed={2} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_80%_30%,rgba(112,168,44,0.16),transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          tone="dark"
          eyebrow="Farm to kitchen"
          title="The journey of"
          accent="your spices"
          text="From the hills of Idukki to your kitchen, in five steps."
          className="mb-12 sm:mb-16"
        />

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Steps */}
          <ol className="relative lg:col-span-5">
            {/* the line that joins the step numbers */}
            <span aria-hidden="true" className="absolute bottom-8 left-[21px] top-8 w-px bg-gradient-to-b from-[#F5B900]/70 via-[#F5B900]/30 to-[#F5B900]/10" />
            {stages.map(({ icon: Icon, title, text, image, alt }, i) => {
              const on = active === i;
              return (
                <li key={title} className="relative">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-pressed={on}
                    className={`group flex w-full cursor-pointer touch-manipulation items-start gap-4 rounded-2xl p-3 text-left transition-colors duration-200 sm:p-4 ${
                      on ? "lg:bg-white/[0.07]" : "lg:hover:bg-white/[0.04]"
                    }`}
                  >
                    <span
                      className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-[#F5B900]/50 bg-[#092515] text-[#F5B900] transition-colors duration-200 ${
                        on ? "lg:border-[#F5B900] lg:bg-[#F5B900] lg:text-[#062D1B]" : ""
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                    </span>

                    {/* phone: a small photo beside the text */}
                    <span className="relative mt-0.5 block h-20 w-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/15 lg:hidden">
                      <Image src={image} alt={alt} fill loading="lazy" sizes="80px" className="object-cover" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#F5B900]">Step {i + 1}</span>
                      <span className="mt-0.5 block font-serif text-lg font-semibold leading-snug sm:text-xl">{title}</span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-white/75">{text}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Large photo (desktop): the five photos are stacked and the chosen one fades in */}
          <div className="relative hidden lg:col-span-7 lg:block">
            <div className="relative aspect-[5/4.4] overflow-hidden rounded-[2rem] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/15">
              {stages.map((s, i) => (
                <Image
                  key={s.image}
                  src={s.image}
                  alt={active === i ? s.alt : ""}
                  aria-hidden={active === i ? undefined : true}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1280px) 640px, 55vw"
                  className={`object-cover transition-opacity duration-500 ease-out ${active === i ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <span aria-hidden="true" className="absolute bottom-5 left-5 grid h-14 w-14 place-items-center rounded-full bg-[#F5B900] font-serif text-2xl font-bold text-[#062D1B] shadow-lg">
                {active + 1}
              </span>
            </div>
          </div>
        </div>
      </div>

      <TornEdge position="bottom" fill="#08271d" seed={5} className="z-20 h-[56px] sm:h-[72px]" />
    </section>
  );
}
