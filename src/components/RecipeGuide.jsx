import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import TornEdge from "./TornEdge";
import { blogPosts } from "@/data/blogPosts";

// Four journal links with thumbnails from public/images/journal
const journalLinks = [
  {
    title: "Choosing the right spice",
    text: "Filter by cooking use and pack size.",
    href: "/spices",
    image: "/images/journal/v2-spice-finder-spices.jpg",
    alt: "Assorted aromatic whole spices for filtering",
  },
  {
    title: "Whole spices vs powders",
    text: "Compare whole and ground spices.",
    href: "/spices?form=whole-spices",
    image: "/images/journal/v2-whole-vs-powder-spices.jpg",
    alt: "Whole spice pods compared with fine powders",
  },
  {
    title: "Spice storage tips",
    text: "How to keep spices fresh longer.",
    href: "/blog/storing-and-cooking-whole-spices",
    image: "/images/journal/v2-spice-storage-still-life.jpg",
    alt: "Airtight glass jars storing whole cardamom and cloves",
  },
  {
    title: "All recipes & guides",
    text: "Everything in the Idukki Spices journal.",
    href: "/blog",
    image: "/images/journal/v2-journal-books-spices.jpg",
    alt: "Kerala spice recipe journal and culinary notebooks",
  },
];

export default function RecipeGuide() {
  const [featured, second] = blogPosts;
  return (
    <section id="recipes" aria-labelledby="journal-heading" className="relative isolate overflow-hidden bg-deep pb-12 pt-16 text-white sm:pb-14 sm:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#F5B900]">The Idukki Spices journal</p>
            <h2 id="journal-heading" className="mt-3 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Spice stories <span className="font-script text-[1.2em] font-bold text-[#F5B900]">&amp; recipes</span>
            </h2>
          </div>
          <Link href="/blog" className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-white/90 hover:text-[#F5B900]">
            Read the journal
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {/* Lead story: photo with the text on top */}
          <Reveal variant="left" className="lg:col-span-7">
            <Link
              href={`/blog/${featured.slug}`}
              className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[1.75rem] p-6 sm:min-h-[32rem] sm:p-10"
            >
              <Image src={featured.image} alt="" fill sizes="(min-width: 1024px) 700px, 100vw" loading="lazy" className="-z-10 object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#062D1B] via-[#062D1B]/55 to-transparent" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F5B900]">{featured.category}</span>
              <h3 className="mt-2 max-w-xl font-serif text-2xl font-semibold leading-snug sm:text-4xl">{featured.title}</h3>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#F5B900]">
                {featured.readTime} · Read the article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>

          {/* Numbered list: the second story and the guides */}
          <Reveal variant="right" delay={100} className="lg:col-span-5">
            <ol className="divide-y divide-white/15 rounded-[1.75rem] bg-white/[0.06] ring-1 ring-white/10">
              {[
                { title: second.title, text: second.category + " · " + second.readTime, href: `/blog/${second.slug}`, image: second.image },
                ...journalLinks,
              ].map((item, i) => (
                <li key={item.href}>
                  <Link href={item.href} className="group flex items-center gap-4 p-4 transition-colors hover:bg-white/[0.06] sm:p-5">
                    <span className="font-serif text-2xl font-semibold tabular-nums text-[#F5B900]/80">0{i + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-serif text-base font-semibold leading-snug sm:text-lg">{item.title}</span>
                      <span className="mt-0.5 block text-xs text-white/70 sm:text-sm">{item.text}</span>
                    </span>
                    <span className="relative hidden h-14 w-14 shrink-0 overflow-hidden rounded-xl sm:block">
                      <Image src={item.image} alt="" fill sizes="56px" loading="lazy" className="object-cover" />
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#F5B900] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
      <TornEdge position="bottom" fill="#FAF7EF" seed={7} className="z-20 h-[56px] sm:h-[72px]" />
    </section>
  );
}
