import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory, products } from "@/data/products";
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

  // Find products matching category, or show related
  let categoryProducts = getProductsByCategory(category.slug);
  if (categoryProducts.length === 0) {
    categoryProducts = products.slice(0, 3);
  }

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
            Showing {categoryProducts.length} items
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {categoryProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
