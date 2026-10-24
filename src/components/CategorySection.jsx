import { categories } from "@/data/categories";
import CategoryCard from "./CategoryCard";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Leaf } from "lucide-react";

export default function CategorySection() {
  return (
    <section className="py-12 sm:py-16 bg-[#faf7f2] border-b border-[#e6dfd5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="eyebrow mb-1.5">
              <Leaf className="w-3.5 h-3.5" />
              <span>OUR CATEGORIES</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181818] tracking-tight">
              Explore Our Premium Spices 🌿
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-1">
              Handpicked spices for authentic taste and a healthier lifestyle.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <Link
              href="/categories"
              className="text-xs font-bold text-[#181818] hover:text-[#b07d22] transition-colors flex items-center gap-1"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Slider arrows matching reference */}
            <div className="hidden md:flex items-center gap-1.5">
              <button
                aria-label="Previous categories"
                className="w-8 h-8 rounded-full border border-[#e6dfd5] bg-white hover:bg-[#f3eee4] flex items-center justify-center text-[#555555] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                aria-label="Next categories"
                className="w-8 h-8 rounded-full border border-[#e6dfd5] bg-white hover:bg-[#f3eee4] flex items-center justify-center text-[#555555] transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
