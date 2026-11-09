import Image from "next/image";
import Link from "next/link";
import { ListChecks, Ruler, Truck, MessageCircle, ArrowRight } from "lucide-react";

const benefits = [
  { icon: ListChecks, title: "Clear product information", text: "Origin, ingredients and shelf life are listed on every product page." },
  { icon: Ruler, title: "Pack sizes that fit", text: "Choose the size you need, from small packs to larger ones." },
  { icon: Truck, title: "Delivery across India", text: "Orders ship to addresses across India." },
  { icon: MessageCircle, title: "Help when you need it", text: "Questions about an order or a spice? Our contact page has the details." },
];

// One rounded green panel: a photo with the heading and action on the left, the four reasons as a clean
// numbered list on the right. On phones the photo panel sits on top and the list follows.
export default function Benefits() {
  return (
    <section aria-labelledby="benefits-heading" className="bg-white px-4 py-14 text-[#123B22] sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.75rem] bg-[#123B22] text-white shadow-[0_30px_60px_-30px_rgba(9,37,21,0.6)] sm:rounded-[2.25rem] lg:grid-cols-2">
        {/* Left: photo, heading, action */}
        <div className="relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden p-6 sm:min-h-[26rem] sm:p-10 lg:min-h-[34rem] lg:p-12">
          <Image
            src="/images/peppercorn-spoon.webp"
            alt=""
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 640px, 100vw"
            className="-z-10 object-cover object-[70%_50%]"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#092515] via-[#092515]/65 to-[#092515]/25" />

          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#F5B900]">Why Idukki Spices</p>
          <h2 id="benefits-heading" className="mt-3 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            Shopping made
            <span className="ml-2 font-script text-[1.25em] font-bold text-[#F5B900]">simple</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
            From our hills to your home, a smooth and trusted shopping experience.
          </p>
          <div className="mt-7">
            <Link
              href="/contact"
              className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#F5B900] px-8 text-sm font-extrabold text-[#062D1B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffcb2e] active:scale-95"
            >
              Contact us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <p className="mt-3 text-xs text-white/75 sm:text-sm">For shipping, returns and payment questions.</p>
          </div>
        </div>

        {/* Right: the four reasons */}
        <ol className="flex flex-col justify-center divide-y divide-white/10 p-6 sm:p-10 lg:p-12">
          {benefits.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="flex items-start gap-4 py-5 first:pt-0 last:pb-0 sm:gap-5 sm:py-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#F5B900]/50 text-[#F5B900] sm:h-14 sm:w-14">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold tabular-nums tracking-[0.2em] text-[#F5B900]">0{i + 1}</p>
                <h3 className="mt-1 font-serif text-xl font-semibold leading-snug sm:text-2xl">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75 sm:text-base">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
