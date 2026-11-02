import Link from "next/link";
import { ListChecks, Ruler, Truck, MessageCircle, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const benefits = [
  { icon: ListChecks, title: "Clear product information", text: "Origin, ingredients and shelf life are listed on every product page." },
  { icon: Ruler, title: "Pack sizes that fit", text: "Choose the size you need, from small packs to larger ones." },
  { icon: Truck, title: "Delivery across India", text: "Orders ship to addresses across India." },
  { icon: MessageCircle, title: "Help when you need it", text: "Questions about an order or a spice? Our contact page has the details." },
];

export default function Benefits() {
  return (
    <section className="relative overflow-hidden bg-white py-16 text-[#123B22] sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#70A82C]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          align="center"
          eyebrow="Why Idukki Spices"
          title="Shopping made"
          accent="simple"
          text="From our hills to your home — a smooth and trusted shopping experience."
          className="mb-12 sm:mb-16"
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="h-full">
              <Reveal delay={i * 80} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-[1.6rem] border border-[#123B22]/10 bg-gradient-to-b from-[#F4F8EC] to-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#70A82C]/60 hover:shadow-[0_24px_44px_-24px_rgba(18,59,34,0.45)]">
                  <span aria-hidden="true" className="absolute -right-2 -top-4 font-script text-[6.5rem] font-bold leading-none text-[#123B22]/[0.06] transition-colors duration-500 group-hover:text-[#F5B900]/30">
                    {i + 1}
                  </span>
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-[#123B22] text-[#F5B900] shadow-lg shadow-[#123B22]/25 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                    <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="relative mt-6 font-serif text-xl font-semibold leading-snug">{title}</h3>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-[#123B22]/70">{text}</p>
                  <span aria-hidden="true" className="relative mt-6 block h-[3px] w-10 rounded-full bg-[#70A82C] transition-all duration-500 group-hover:w-full group-hover:bg-[#F5B900]" />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={280} className="mt-12 text-center">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#F5B900] px-8 py-3.5 text-sm font-extrabold text-[#062D1B] shadow-lg shadow-[#F5B900]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffcb2e] active:scale-95"
          >
            Contact us
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-3 text-xs text-[#123B22]/55 sm:text-sm">For shipping, returns and payment questions.</p>
        </Reveal>
      </div>
    </section>
  );
}
