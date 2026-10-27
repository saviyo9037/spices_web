import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/data/blogPosts";
import { products } from "@/data/products";
import ReadingProgress from "@/components/ReadingProgress";
import { Clock, ChevronRight, ArrowRight, ListTree, ShoppingBag } from "lucide-react";

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
    title: post.title,
    description: post.excerpt,
  };
}

const slugify = (t) =>
  t
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Words in the article that point at a product we actually sell.
const MENTIONS = [
  { re: /pepper/i, slug: "black-pepper" },
  { re: /cardamom/i, slug: "cardamom" },
  { re: /turmeric/i, slug: "turmeric-powder" },
  { re: /cinnamon/i, slug: "cinnamon-sticks" },
  { re: /clove/i, slug: "cloves" },
  { re: /nutmeg|\bmace\b/i, slug: "nutmeg" },
  { re: /chilli|chili/i, slug: "red-chilli-powder" },
  { re: /garam masala|masala/i, slug: "spice-blends" },
];

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Give every h2 an id so the contents list can link to it.
  const toc = [];
  const html = post.content.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
    const id = slugify(inner);
    toc.push({ id, title: inner.replace(/<[^>]+>/g, "").trim() });
    return `<h2 id="${id}">${inner}</h2>`;
  });

  const text = post.content.replace(/<[^>]+>/g, " ");
  const mentioned = MENTIONS.filter((m) => m.re.test(text))
    .map((m) => products.find((p) => p.slug === m.slug))
    .filter((p, i, arr) => p && arr.indexOf(p) === i);

  const otherPosts = blogPosts.filter((p) => p.id !== post.id);

  return (
    <article className="bg-white text-forest">
      <ReadingProgress targetId="article-body" />

      <header className="relative isolate overflow-hidden bg-night text-white">
        <Image src={post.image} alt="" fill priority sizes="100vw" className="-z-10 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/80 to-night/50" />
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-white/65">
            <Link href="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <Link href="/blog" className="hover:text-gold">Recipes</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-white">{post.category}</span>
          </nav>
          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-gold px-3.5 py-1 text-[11px] font-bold uppercase tracking-wide text-night">{post.category}</span>
            <span className="flex items-center gap-1.5 text-white/80">
              <Clock className="h-4 w-4" aria-hidden="true" /> {post.readTime}
            </span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-3xl font-bold leading-[1.15] sm:text-5xl lg:text-6xl">{post.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{post.excerpt}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-14 lg:px-8">
        <div>
          {toc.length > 1 && (
            <nav aria-label="In this article" className="mb-10 rounded-2xl border border-line bg-paper/60 p-5 lg:hidden">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em]">
                <ListTree className="h-4 w-4 text-gold-ink" aria-hidden="true" /> In this article
              </p>
              <ol className="mt-3 space-y-2 text-sm">
                {toc.map((t, i) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="text-forest/80 hover:text-gold-ink">
                      {i + 1}. {t.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div id="article-body" className="article-body" dangerouslySetInnerHTML={{ __html: html }} />

          <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-2xl bg-deep p-6 text-white sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="font-serif text-2xl font-bold">Cook with the spices from this guide</p>
              <p className="mt-1 text-sm text-white/75">Browse whole spices, powders and blends from Idukki.</p>
            </div>
            <Link
              href="/shop"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-night transition-colors hover:bg-gold-light"
            >
              Shop spices <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {toc.length > 1 && (
            <nav aria-label="In this article" className="hidden rounded-2xl border border-line bg-white p-5 shadow-sm lg:block">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em]">
                <ListTree className="h-4 w-4 text-gold-ink" aria-hidden="true" /> In this article
              </p>
              <ol className="mt-4 space-y-2.5 border-l-2 border-line pl-4 text-sm">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="block leading-snug text-forest/75 transition-colors hover:text-gold-ink">
                      {t.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {mentioned.length > 0 && (
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em]">
                <ShoppingBag className="h-4 w-4 text-gold-ink" aria-hidden="true" /> Spices in this article
              </p>
              <ul className="mt-4 space-y-3">
                {mentioned.map((p) => (
                  <li key={p.id}>
                    <Link href={`/product/${p.slug}`} className="group flex items-center gap-3 rounded-xl p-1.5 transition-colors hover:bg-paper/70">
                      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-paper">
                        <Image src={p.image} alt="" fill sizes="56px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-2 text-sm font-semibold leading-snug group-hover:text-gold-ink">{p.name}</span>
                        <span className="text-xs text-forest/60">From ₹{Math.min(...(p.weights || [{ price: p.price }]).map((w) => w.price))}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 text-forest/35 group-hover:text-gold-ink" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {otherPosts.length > 0 && (
        <section className="border-t border-line bg-paper/50 py-14 sm:py-16" aria-labelledby="more-journal">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 id="more-journal" className="font-serif text-3xl font-bold">More from the journal</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {otherPosts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition-shadow hover:shadow-lg">
                  <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-paper">
                    <Image src={p.image} alt="" fill sizes="96px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gold-ink">{p.category}</span>
                    <span className="mt-1 block font-serif text-base font-bold leading-snug group-hover:text-gold-ink">{p.title}</span>
                    <span className="mt-1 block text-xs text-forest/55">{p.readTime}</span>
                  </span>
                </Link>
              ))}
            </div>
            <Link href="/blog" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold-ink hover:underline">
              &larr; Back to all recipes &amp; guides
            </Link>
          </div>
        </section>
      )}
    </article>
  );
}
