import { categories } from "@/data/categories";
import CategoryCard from "@/components/CategoryCard";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Spice Categories — Whole, Ground, Blends & Masalas | Spices",
  description:
    "Explore our full classification of estate-grown spices: uncrushed whole pods, cold-stone milled powders, hand-harvested herbs, and royal traditional masalas.",
};

export default function CategoriesPage() {
  return (
    <div className="bg-[#faf7f2] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#c69238] mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Classifications</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#143627] tracking-tight">
            Spice Categories
          </h1>
          <p className="text-sm sm:text-base text-[#5c6c64] mt-3">
            Every culinary tradition requires the right foundation. Discover our comprehensive range of whole botanicals, finely ground spices, and heritage spice blends.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div key={cat.id} className="flex flex-col">
              <CategoryCard category={cat} />
              <div className="p-4 bg-white rounded-b-2xl border-x border-b border-[#e6dfd5] -mt-2 pt-4">
                <p className="text-xs text-[#5c6c64] leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
