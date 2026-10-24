import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "The Spice Journal — Recipes, Techniques & Heritage Guides | Spices",
  description:
    "Explore culinary wisdom from estate chefs and master blenders. Learn proper spice toasting techniques, storage secrets, and authentic regional recipes.",
};

export default function BlogPage() {
  return (
    <div className="bg-[#faf7f2] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#c69238] mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Spice Journal</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#143627] tracking-tight">
            Stories, Recipes &amp; Spice Alchemy
          </h1>
          <p className="text-sm sm:text-base text-[#5c6c64] mt-3">
            Deep dive into the botanical origins, health virtues, and kitchen craft of India&apos;s finest culinary spices.
          </p>
        </div>

        {/* Featured Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#e6dfd5] shadow-xs hover:shadow-xl hover:border-[#dfa84a]/50 transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden bg-[#faf7f2]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#143627]/90 text-[#dfa84a] text-xs font-bold tracking-wide uppercase backdrop-blur-md">
                  {post.category}
                </span>
              </div>

              <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-[#87978f] mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#143627] group-hover:text-[#c69238] transition-colors leading-snug mb-3">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-sm text-[#5c6c64] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f3eee4] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#143627] block">
                      {post.author}
                    </span>
                    <span className="text-[11px] text-[#87978f]">
                      {post.authorRole}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#143627] group-hover:text-[#c69238] transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
