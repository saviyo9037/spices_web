import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

export default function BlogSection() {
  return (
    <section className="py-20 md:py-28 bg-[#faf7f2] border-b border-[#e6dfd5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#c69238] mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Spice Journal</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#143627] tracking-tight">
              Culinary Guides &amp; Heritage Recipes
            </h2>
            <p className="text-sm sm:text-base text-[#5c6c64] max-w-xl mt-2">
              Master the alchemy of Indian spices with our estate guides, toasting tutorials, and artisanal recipes.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#143627] hover:text-[#c69238] transition-colors self-start md:self-end group"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 2 Featured Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#e6dfd5] shadow-xs hover:shadow-xl hover:border-[#dfa84a]/50 transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden bg-[#f3eee4]">
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
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#143627] group-hover:text-[#c69238] transition-colors leading-snug mb-3">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-[#5c6c64] line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f3eee4] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#143627]">
                    By {post.author}
                  </span>
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
    </section>
  );
}
