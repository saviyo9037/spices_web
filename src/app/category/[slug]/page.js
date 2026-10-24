import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { ArrowLeft, Sparkles } from "lucide-react";

export function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} — Pure & Single Origin | Spices`,
    description: category.description,
  };
}

export default async function CategoryDetailPage({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  // Find products matching category, or show related
  let categoryProducts = getProductsByCategory(category.slug);
  if (categoryProducts.length === 0) {
    categoryProducts = products.slice(0, 3);
  }

  return (
    <div className="bg-[#faf7f2] min-h-screen pb-20">
      {/* Category Hero Banner */}
      <div className="relative h-72 sm:h-96 w-full bg-[#0f2c1f] overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2c1f] via-[#0f2c1f]/70 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#dfa84a] hover:underline mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Categories</span>
          </Link>
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#dfa84a] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{category.itemCount}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            {category.name}
          </h1>
          <p className="text-sm sm:text-base text-white/85 max-w-2xl mt-2 leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Products in this Category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#143627]">
            Available in {category.name}
          </h2>
          <span className="text-xs text-[#5c6c64]">
            Showing {categoryProducts.length} items
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
