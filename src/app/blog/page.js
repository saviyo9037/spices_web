import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";
import { Clock, ArrowRight, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Recipes & Spice Journal",
  description:
    "Recipes, storage tips and guides for cooking with whole spices and masala blends from Idukki Spices.",
};

// Quick links into the rest of the site, with the journal thumbnails.
const guides = [
  { title: "Choosing the right spice", text: "Filter by cooking use and pack size.", href: "/spices", image: "/images/journal/03-spice-finder-spices.jpg" },
  { title: "Whole spices vs powders", text: "Compare whole and ground spices.", href: "/spices?form=whole-spices", image: "/images/journal/04-whole-vs-powder-spices.jpg" },
  { title: "Spice storage tips", text: "How to keep spices fresh longer.", href: "/blog/storing-and-cooking-whole-spices", image: "/images/journal/05-spice-storage-still-life.jpg" },
  { title: "Build a spice combo", text: "Pick several spices and add them together.", href: "/combos", image: "/images/journal/01-spice-journal-still-life.jpg" },
];

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="bg-white text-forest">
      <section className="relative isolate overflow-hidden bg-night text-white">
        <Image src="/images/journal/06-journal-books-spices.jpg" alt="" fill priority sizes="100vw" className="-z-10 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/95 via-night/80 to-night/40" />
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 sm:pb-28 sm:pt-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/65">
            <Link href="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-white">Recipes</span>
          </nav>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">The Spice Journal</p>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold leading-[1.1] sm:text-6xl">
            Recipes, guides <span className="text-gold">&amp; spice stories</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Learn how to store, toast and blend spices, and cook with the spices of Idukki.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        {featured && (
          <article className="group grid overflow-hidden rounded-3xl border border-line bg-white shadow-2xl shadow-forest/10 lg:grid-cols-[1.1fr_1fr]">
            <Link href={`/blog/${featured.slug}`} className="relative block aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]" aria-label={featured.title}>
              <Image src={featured.image} alt="" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-5 top-5 rounded-full bg-gold px-3.5 py-1 text-[11px] font-bold uppercase tracking-wide text-night">Featured</span>
            </Link>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-ink">{featured.category}</p>
              <h2 className="mt-3 font-serif text-2xl font-bold leading-tight sm:text-4xl">
                <Link href={`/blog/${featured.slug}`} className="hover:text-gold-ink">{featured.title}</Link>
              </h2>
              <p className="mt-4 leading-relaxed text-forest/70">{featured.excerpt}</p>
              <p className="mt-5 flex items-center gap-1.5 text-sm text-forest/60">
                <Clock className="h-4 w-4" aria-hidden="true" /> {featured.readTime}
              </p>
              <Link
                href={`/blog/${featured.slug}`}
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-night transition-colors hover:bg-gold-light"
              >
                Read the article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        )}
      </div>

      {rest.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8" aria-labelledby="more-articles">
          <h2 id="more-articles" className="font-serif text-3xl font-bold">More to read</h2>
          <div className={`mt-6 grid gap-6 ${rest.length > 1 ? "md:grid-cols-2 lg:grid-cols-3" : ""}`}>
            {rest.map((post) => (
              <article key={post.id} className={`group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-xl ${rest.length === 1 ? "md:grid md:grid-cols-[1fr_1.1fr]" : ""}`}>
                <Link href={`/blog/${post.slug}`} className={`relative block overflow-hidden ${rest.length === 1 ? "aspect-[16/10] md:aspect-auto md:min-h-[300px]" : "aspect-[16/10]"}`} aria-label={post.title}>
                  <Image src={post.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </Link>
                <div className={`flex flex-1 flex-col ${rest.length === 1 ? "p-5 md:justify-center md:p-9" : "p-5"}`}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-ink">{post.category}</p>
                  <h3 className="mt-2 font-serif text-xl font-bold leading-snug">
                    <Link href={`/blog/${post.slug}`} className="hover:text-gold-ink">{post.title}</Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-forest/70">{post.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between pt-5 text-sm">
                    <span className="flex items-center gap-1.5 text-forest/55"><Clock className="h-4 w-4" aria-hidden="true" /> {post.readTime}</span>
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1.5 font-semibold text-gold-ink hover:text-forest">
                      Read more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pb-24 lg:px-8" aria-labelledby="quick-guides">
        <h2 id="quick-guides" className="font-serif text-3xl font-bold">Quick guides</h2>
        <p className="mt-2 text-forest/65">Shortcuts to help you pick and use the right spice.</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guides.map((g) => (
            <li key={g.title}>
              <Link href={g.href} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={g.image} alt="" fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/40 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <span className="block font-serif text-lg font-bold leading-tight">{g.title}</span>
                  <span className="mt-0.5 block text-xs text-white/75">{g.text}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-gold">
                    Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
