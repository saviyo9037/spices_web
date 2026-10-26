"use client";

import Image from "next/image";
import { Star, Leaf } from "lucide-react";
import { testimonials } from "@/data/features";

export default function TestimonialsSection() {
  return (
    <section className="relative py-14 sm:py-20 bg-paper border-t border-line overflow-hidden">
      {/* Decorative Botanical & Spices Background on Edges using testimonials-decoration.jpg */}
      <div className="absolute -left-16 top-0 bottom-0 w-48 opacity-25 pointer-events-none mix-blend-multiply hidden md:block">
        <Image
          src="/images/testimonials-decoration.jpg"
          alt="Decorative spice branches"
          fill
          sizes="200px"
          className="object-cover object-left"
        />
      </div>
      <div className="absolute -right-16 top-0 bottom-0 w-48 opacity-25 pointer-events-none mix-blend-multiply hidden md:block">
        <Image
          src="/images/testimonials-decoration.jpg"
          alt="Decorative spice branches"
          fill
          sizes="200px"
          className="object-cover object-right"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="eyebrow mb-1.5">
              <Leaf className="w-3.5 h-3.5" />
              <span>TESTIMONIALS</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181818] tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-1">
              Kind words from customers who cook with Idukki Spices.
            </p>
          </div>

        </div>

        {/* 3 Testimonial Cards matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white border border-[#e6dfd5] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <p className="text-xs sm:text-sm text-[#444444] leading-relaxed italic mb-5">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* 5 Gold Stars */}
                <div className="flex items-center text-amber-400 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              {/* Author with Avatar matching reference */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#f3eee4]">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#f7ecd3] text-[#1c4b37] font-bold text-xs flex items-center justify-center shrink-0 border border-[#e6dfd5]">
                  <span className="z-0">
                    {item.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  {item.avatar && (
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover z-10"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#181818] leading-tight">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-[#888888] block mt-0.5">
                    {item.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
