import Image from "next/image";
import Link from "next/link";
import { ListChecks, Ruler, Truck, MessageCircle, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const benefits = [
  {
    icon: ListChecks,
    title: "Clear product information",
    text: "Origin, ingredients and shelf life are listed on every product page.",
    image: "/images/shopping/08-product-information-card.jpg",
    alt: "Clear spice origin labeling and ingredient transparency",
  },
  {
    icon: Ruler,
    title: "Pack sizes that fit",
    text: "Choose the size you need, from small packs to larger ones.",
    image: "/images/shopping/09-pack-sizes-card.jpg",
    alt: "Tailored spice pack sizes and pouches",
  },
  {
    icon: Truck,
    title: "Delivery across India",
    text: "Orders ship to addresses across India.",
    image: "/images/shopping/10-delivery-card.jpg",
    alt: "Carefully packed spices dispatching nationwide across India",
  },
  {
    icon: MessageCircle,
    title: "Help when you need it",
    text: "Questions about an order or a spice? Our contact page has the details.",
    image: "/images/shopping/11-customer-support-card.jpg",
    alt: "Dedicated customer support and spice consultation",
  },
];

export default function Benefits() {
  return (
    <section className="relative isolate overflow-hidden bg-white text-[#0B3328] py-16 sm:py-24">
      {/* Background: Soft mist-covered Idukki hills smoothly blended into crisp white */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* <Image
          // src="/images/shopping/07-hills-landscape-background.jpg"
          alt="Misty spice hills and tea gardens of Idukki"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center opacity-20 mix-blend-multiply"
        /> */}
        {/* Gradients to ensure seamless white background and crisp readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/85 to-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <Reveal className="mb-12 text-center max-w-2xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#B87919]">
            Why Idukki Spices
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 text-[#0B3328]">
            Shopping made simple
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#555650]">
            From our hills to your home — a smooth and trusted shopping experience.
          </p>
        </Reveal>

        {/* 4 Benefit Cards in One Desktop Row */}
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text, image, alt }, i) => (
            <li key={title} className="h-full">
              <Reveal delay={i * 70} className="h-full">
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8DFCF] bg-[#FAF7F2] shadow-xs transition-all duration-300 hover:shadow-lg hover:border-[#B87919] hover:-translate-y-1">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F0EAE0]">
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Subtle gold line icon badge */}
                    <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 border border-[#E8DFCF] text-[#B87919] shadow-xs backdrop-blur-xs">
                      <Icon className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-lg font-bold text-[#0B3328] group-hover:text-[#B87919] transition-colors leading-snug">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#555650]">
                      {text}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Centred Gold CTA */}
        <Reveal delay={280} className="mt-12 text-center">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[#B87919] px-7 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-[#9a6414] hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
          >
            <span>Contact us</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-3 text-xs sm:text-sm text-[#748078]">
            For shipping, returns and payment questions.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
