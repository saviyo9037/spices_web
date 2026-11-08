import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/data/categories";
import Link from "next/link";
import { getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PageHero from "@/components/PageHero";

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

  const categoryProducts = getProductsByCategory(category.slug);

  return (
    <div className="bg-white min-h-screen pb-20">
      <PageHero
        crumb={category.name}
        eyebrow={category.itemCount}
        title={category.name}
        text={category.description}
        image={category.image}
        imageAlt={category.name}
        circleImage="/gallary/web-black-pepper.jpg"
        watermark="Spices"
        className="pb-20 sm:pb-24"
      />

      {/* Products in this Category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#143627]">
            Available in {category.name}
          </h2>
          <span className="text-xs text-[#5c6c64]">
            {categoryProducts.length} {categoryProducts.length === 1 ? "item" : "items"}
          </span>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {categoryProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#123B22]/10 bg-[#FAF7EF] p-8 text-center sm:p-12">
            <h3 className="font-serif text-2xl font-semibold text-[#123B22]">No products in {category.name} yet</h3>
            <p className="mx-auto mt-2 max-w-md text-[#123B22]/80">Nothing is listed here at the moment. Browse the full range to see what is available.</p>
            <Link href="/shop" className="mt-6 inline-flex min-h-[48px] items-center rounded-full bg-[#123B22] px-8 text-sm font-bold text-white transition hover:bg-[#1c5336]">
              Shop all spices
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
