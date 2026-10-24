import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CategoryCard({ category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-[#e6dfd5] shadow-xs hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Category Image */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#f3eee4]">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Card Footer matching reference: Title + count on left, round arrow button on right */}
      <div className="p-3.5 flex items-center justify-between bg-white">
        <div>
          <h3 className="font-bold text-xs sm:text-sm text-[#181818] group-hover:text-[#b07d22] transition-colors leading-tight">
            {category.name}
          </h3>
          <span className="text-[11px] text-[#888888] block mt-0.5">
            {category.itemCount}
          </span>
        </div>

        <div className="w-7 h-7 rounded-full border border-[#e6dfd5] group-hover:border-[#dfa84a] group-hover:bg-[#dfa84a] group-hover:text-[#143627] flex items-center justify-center text-[#555555] transition-all shrink-0">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}
