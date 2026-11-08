"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Sprout, ClipboardCheck, Cog, Package, Truck } from "lucide-react";
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

const N = stages.length;

// The section is pinned to the screen while the visitor scrolls. Each stretch of scrolling shows exactly one
// step: its photo fades in and its text replaces the previous one. The dots (and arrow keys on them) jump to a step.
export default function FarmJourney() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setActive(Math.min(N - 1, Math.floor(progress * N)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const jumpTo = useCallback((i) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / N) * scrollable, behavior: "smooth" });
  }, []);

  return (
    <section ref={sectionRef} id="farm-to-kitchen" aria-labelledby="journey-heading" className="relative bg-[#092515] text-white" style={{ height: `${N * 75 + 25}vh` }}>
      <TornEdge position="top" fill="#FFFFFF" seed={2} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_30%,rgba(112,168,44,0.16),transparent_70%)]" />

      {/* pinned stage: stays on screen while the section scrolls past */}
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-4 pb-6 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <div className="grid items-center gap-5 lg:grid-cols-12 lg:gap-14">
            {/* Text: the heading stays, one step at a time below it */}
            <div className="lg:col-span-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#F5B900]">Farm to kitchen</p>
              <h2 id="journey-heading" className="mt-2 font-serif text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                The journey of
                <span className="ml-2 font-script text-[1.25em] font-bold text-[#F5B900]">your spices</span>
              </h2>

              <div className="relative mt-5 min-h-[10.5rem] sm:mt-8 sm:min-h-[12rem]" aria-live="polite">
                {stages.map(({ icon: Icon, title, text }, i) => (
                  <div
                    key={title}
                    aria-hidden={active === i ? undefined : true}
                    className={`absolute inset-0 transition-all duration-500 ease-out motion-reduce:transition-none ${
                      active === i ? "translate-y-0 opacity-100" : i < active ? "-translate-y-4 opacity-0" : "translate-y-4 opacity-0"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-[#F5B900] text-[#062D1B]">
                        <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5B900]">
                        Step {i + 1} of {N}
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug sm:mt-4 sm:text-4xl">{title}</h3>
                    <p className="mt-2 max-w-md text-base leading-relaxed text-white/80 sm:mt-3 sm:text-lg">{text}</p>
                  </div>
                ))}
              </div>

              {/* progress: one dot per step */}
              <div className="mt-4 flex items-center gap-2 sm:mt-6" role="group" aria-label="Journey steps">
                {stages.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-label={`Go to step ${i + 1}: ${s.title}`}
                    aria-current={active === i ? "step" : undefined}
                    className="grid h-8 min-w-8 cursor-pointer touch-manipulation place-items-center"
                  >
                    <span className={`block h-1.5 rounded-full transition-all duration-300 ${active === i ? "w-9 bg-[#F5B900]" : "w-3 bg-white/35"}`} />
                  </button>
                ))}
                <span className="ml-1 text-xs font-bold tabular-nums text-white/70">
                  {active + 1}/{N}
                </span>
              </div>
            </div>

            {/* Photo: the five photos are stacked; the active one fades in */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4rem] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/15 sm:rounded-[2rem] lg:aspect-[5/4.2]">
                {stages.map((s, i) => (
                  <Image
                    key={s.image}
                    src={s.image}
                    alt={active === i ? s.alt : ""}
                    aria-hidden={active === i ? undefined : true}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1280px) 640px, (min-width: 1024px) 55vw, 92vw"
                    className={`object-cover transition-opacity duration-500 ease-out motion-reduce:transition-none ${active === i ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
                <span aria-hidden="true" className="absolute bottom-3 left-3 grid h-11 w-11 place-items-center rounded-full bg-[#F5B900] font-serif text-xl font-bold text-[#062D1B] shadow-lg sm:bottom-5 sm:left-5 sm:h-14 sm:w-14 sm:text-2xl">
                  {active + 1}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TornEdge position="bottom" fill="#08271d" seed={5} className="z-20 h-[56px] sm:h-[72px]" />
    </section>
  );
}
