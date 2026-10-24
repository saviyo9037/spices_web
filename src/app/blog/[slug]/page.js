import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/data/blogPosts";
import { Calendar, Clock, ArrowLeft, User, Sparkles, Share2 } from "lucide-react";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: `${post.title} | Spices Journal`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const otherPosts = blogPosts.filter((p) => p.id !== post.id);

  return (
    <article className="bg-[#faf7f2] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#5c6c64] hover:text-[#143627] mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Articles</span>
        </Link>

        {/* Article Header */}
        <header className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#c69238] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{post.category}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#143627] leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#e6dfd5] text-xs text-[#5c6c64]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#143627] text-[#dfa84a] flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-[#143627] block text-sm">
                  {post.author}
                </span>
                <span className="text-[11px] text-[#87978f]">
                  {post.authorRole}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[#87978f]">
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
          </div>
        </header>

        {/* Article Hero Image */}
        <div className="relative aspect-16/9 w-full rounded-3xl overflow-hidden bg-white border border-[#e6dfd5] shadow-lg mb-12">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover object-center"
          />
        </div>

        {/* Article Body Content */}
        <div
          className="prose prose-stone prose-lg max-w-none text-[#16201b] leading-relaxed space-y-6 [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-[#143627] [&>h2]:pt-6 [&>p.lead]:text-lg [&>p.lead]:font-medium [&>p.lead]:text-[#5c6c64] [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Article Share / Footer */}
        <div className="mt-14 pt-6 border-t border-[#e6dfd5] flex items-center justify-between">
          <div className="text-xs text-[#5c6c64]">
            Tagged under: <span className="font-semibold text-[#143627]">{post.category}</span>
          </div>
          <Link
            href="/shop"
            className="px-5 py-2.5 rounded-full bg-[#143627] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1c4b37] transition-colors"
          >
            Shop Featured Spices &rarr;
          </Link>
        </div>

        {/* Other Articles Recommendation */}
        {otherPosts.length > 0 && (
          <div className="mt-20 pt-10 border-t border-[#e6dfd5]">
            <h3 className="font-serif text-2xl font-bold text-[#143627] mb-6">
              More from The Spice Journal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherPosts.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="p-5 rounded-2xl bg-white border border-[#e6dfd5] hover:border-[#dfa84a] shadow-xs transition-all group flex gap-4 items-center"
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#faf7f2] shrink-0">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="96px"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#c69238] block mb-1">
                      {p.category}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#143627] group-hover:text-[#c69238] line-clamp-2 transition-colors">
                      {p.title}
                    </h4>
                    <span className="text-[11px] text-[#87978f] mt-1 block">
                      {p.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
