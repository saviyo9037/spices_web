import { ListChecks, Ruler, Truck, MessageCircle } from "lucide-react";
import Link from "next/link";
import Reveal from "./Reveal";

// Benefits that can be checked on the site itself.
const items = [
  { icon: ListChecks, title: "Clear product information", text: "Origin, ingredients and shelf life are listed on every product page." },
  { icon: Ruler, title: "Pack sizes that fit", text: "Choose the size you need, from small packs to larger ones." },
  { icon: Truck, title: "Delivery across India", text: "Orders ship to addresses across India." },
  { icon: MessageCircle, title: "Help when you need it", text: "Questions about an order or a spice? Our contact page has the details." },
];

export default function Benefits() {
  return (
    <section className="bg-paper text-forest py-16 sm:py-20 border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 text-center">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-gold-ink">Why Idukki Spices</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3">Shopping made simple</h2>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 70} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-white p-6">
                  <Icon className="w-6 h-6 text-gold-ink" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="font-serif text-lg font-bold mt-4">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-forest/70">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm text-forest/60">
          <Link href="/contact" className="font-semibold text-gold-ink hover:underline">Contact us</Link> for shipping, returns and payment questions.
        </p>
      </div>
    </section>
  );
}
