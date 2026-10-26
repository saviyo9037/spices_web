import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Scale, Archive, UtensilsCrossed } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import Reveal from "./Reveal";

const storagePost = blogPosts.find((p) => p.slug.includes("storing"));

// Quick guides link only to pages that already exist.
const guides = [
  { icon: UtensilsCrossed, title: "Choosing the right spice", text: "Filter by cooking use and pack size.", href: "/spices" },
  { icon: Scale, title: "Whole spices vs powders", text: "Compare whole and ground spices.", href: "/spices?form=whole-spices" },
  { icon: Archive, title: "Spice storage tips", text: "How to keep spices fresh longer.", href: storagePost ? `/blog/${storagePost.slug}` : "/blog" },
  { icon: BookOpen, title: "All recipes & guides", text: "Everything in the Idukki Spices journal.", href: "/blog" },
];

export default function RecipeGuide() {
  return (
    <section id="recipes" className="bg-white text-forest py-16 sm:py-24 border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-gold-ink">The Idukki Spices Journal</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">Spice Stories &amp; Recipes</h2>
          </div>
          <Link href="/blog" className="group inline-flex items-center gap-2 text-sm font-semibold text-gold-ink hover:text-forest">
            Read the journal
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {blogPosts.map((post, i) => (
              <Reveal key={post.id} delay={i * 90}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, 28vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[11px] font-semibold tracking-wider uppercase text-gold-ink">{post.category}</p>
                    <h3 className="font-serif text-lg font-bold leading-snug mt-1.5 group-hover:text-gold-ink transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-forest/70">{post.excerpt}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold text-gold-ink">Read More <ArrowRight className="h-3.5 w-3.5" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <ul className="grid gap-3 lg:col-span-5 content-start">
            {guides.map(({ icon: Icon, title, text, href }, i) => (
              <li key={title}>
                <Reveal delay={i * 70}>
                  <Link
                    href={href}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-paper p-4 transition-colors hover:border-gold"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-ink">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{title}</span>
                      <span className="block text-sm text-forest/65">{text}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 shrink-0 text-forest/40 transition-all group-hover:translate-x-1 group-hover:text-gold-ink" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
