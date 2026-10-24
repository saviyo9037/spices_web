import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import BestsellersSection from "@/components/BestsellersSection";
import StorySection from "@/components/StorySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";

export const metadata = {
  title: "Spices — Nature's Finest Spices for a Healthier Life",
  description:
    "Discover premium quality spices sourced from nature, carefully processed to preserve their natural aroma, flavor, and health benefits.",
};

export default function HomePage() {
  return (
    <main className="w-full overflow-hidden bg-[#faf7f2]">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Categories Section ("Explore Our Premium Spices 🌿") */}
      <CategorySection />

      {/* 3. Featured Products Section ("Pure Spices Pure Wellness" + 5 Products) */}
      <BestsellersSection />

      {/* 4. Story Section ("From Nature to Your Table") */}
      <StorySection />

      {/* 5. Testimonials Section ("What Our Customers Say") */}
      <TestimonialsSection />

      {/* 6. Newsletter Section ("Stay Updated") */}
      <NewsletterSection />
    </main>
  );
}
