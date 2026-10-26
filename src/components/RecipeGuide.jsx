import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

// Four journal links with thumbnails from public/images/journal
const journalLinks = [
  {
    title: "Choosing the right spice",
    text: "Filter by cooking use and pack size.",
    href: "/spices",
    image: "/images/journal/03-spice-finder-spices.jpg",
    alt: "Assorted aromatic whole spices for filtering",
  },
  {
    title: "Whole spices vs powders",
    text: "Compare whole and ground spices.",
    href: "/spices?form=whole-spices",
    image: "/images/journal/04-whole-vs-powder-spices.jpg",
    alt: "Whole spice pods compared with fine powders",
  },
  {
    title: "Spice storage tips",
    text: "How to keep spices fresh longer.",
    href: "/blog/storing-and-cooking-whole-spices",
    image: "/images/journal/05-spice-storage-still-life.jpg",
    alt: "Airtight glass jars storing whole cardamom and cloves",
  },
  {
    title: "All recipes & guides",
    text: "Everything in the Idukki Spices journal.",
    href: "/blog",
    image: "/images/journal/06-journal-books-spices.jpg",
    alt: "Kerala spice recipe journal and culinary notebooks",
  },
];

export default function RecipeGuide() {
  return (
    <section id="recipes" className="relative isolate overflow-hidden bg-deep text-white pt-16 pb-8 sm:pt-24 sm:pb-12 border-t border-gold/15">
      {/* Subtle ambient gold glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(217,164,65,0.07),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Link */}
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
              The Idukki Spices Journal
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 text-white">
              Spice Stories &amp; Recipes
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/75 max-w-xl">
              Discover guides, recipes and tips to bring the authentic flavours of Idukki to your kitchen.
            </p>
          </div>
          <Link
            href="/blog"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-light self-start sm:self-auto"
          >
            <span>Read the journal</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {/* 3-Column Desktop Layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Card 1: Culinary Guide */}
          <Reveal delay={0} className="h-full">
            <Link
              href="/blog/storing-and-cooking-whole-spices"
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8DFCF] bg-[#FAF7F2] transition-all duration-300 hover:shadow-lg hover:border-[#B87919] hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F0EAE0]">
                <Image
                  src="/images/journal/01-spice-journal-still-life.jpg"
                  alt="Whole spices, peppercorns and mortar on rustic kitchen surface"
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#B87919]">
                  Culinary Guide
                </p>
                <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug text-[#0B3328] mt-2 group-hover:text-[#B87919] transition-colors">
                  The Connoisseur’s Guide to Storing and Cooking with Whole Spices
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#555650] line-clamp-3">
                  Unlock the full aromatic potential of your pantry. Learn how whole spices retain essential oils, the chemistry of gentle roasting, and optimal glass storage methods.
                </p>
                <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#B87919] transition-all group-hover:gap-2.5 group-hover:text-[#0B3328]">
                  Read More <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Card 2: Recipes & Blends */}
          <Reveal delay={90} className="h-full">
            <Link
              href="/blog/signature-masala-blends-at-home"
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8DFCF] bg-[#FAF7F2] transition-all duration-300 hover:shadow-lg hover:border-[#B87919] hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F0EAE0]">
                <Image
                  src="/images/journal/02-heritage-masala-recipe.jpg"
                  alt="Kerala-style heritage masala dish with fresh herbs"
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#B87919]">
                  Recipes &amp; Blends
                </p>
                <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug text-[#0B3328] mt-2 group-hover:text-[#B87919] transition-colors">
                  5 Signature Heritage Masala Blends You Can Craft at Home
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#555650] line-clamp-3">
                  Discover time-honoured spice ratios passed down through generations. From Kerala Garam Masala to fragrant Chettinad blend and aromatic roasted masalas.
                </p>
                <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#B87919] transition-all group-hover:gap-2.5 group-hover:text-[#0B3328]">
                  Read More <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Column 3: Four Horizontal Journal Links */}
          <div className="flex flex-col justify-between gap-3 sm:gap-3.5 h-full">
            {journalLinks.map(({ title, text, href, image, alt }, i) => (
              <Reveal key={title} delay={i * 60} className="flex-1 flex">
                <Link
                  href={href}
                  className="group flex flex-1 items-center gap-3.5 sm:gap-4 rounded-2xl border border-[#E8DFCF] bg-[#FAF7F2] p-3.5 sm:p-4 transition-all duration-300 hover:border-[#B87919] hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl bg-[#F0EAE0] border border-[#E8DFCF]/70">
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      loading="lazy"
                      sizes="64px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-serif text-sm sm:text-base font-bold text-[#0B3328] group-hover:text-[#B87919] transition-colors leading-snug line-clamp-1">
                      {title}
                    </h4>
                    <p className="mt-1 text-xs text-[#748078] line-clamp-1">{text}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#B87919] transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
