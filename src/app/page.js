import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import SpiceMarquee from "@/components/SpiceMarquee";
import CategorySection from "@/components/CategorySection";
import StorySection from "@/components/StorySection";
import GallerySection from "@/components/GallerySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import FarmJourney from "@/components/FarmJourney";
import VideoBanner from "@/components/VideoBanner";
import RecipeGuide from "@/components/RecipeGuide";
import Benefits from "@/components/Benefits";
import BulkEnquiry from "@/components/BulkEnquiry";
import NewsletterSection from "@/components/NewsletterSection";

export const metadata = {
  title: "Idukki Spices — From the Hills of Idukki to Your Kitchen",
  description:
    "Discover authentic Kerala spices, carefully selected for their aroma, flavour and freshness.",
};

export default function HomePage() {
  return (
    <main className="w-full overflow-x-clip bg-night">
      <HeroSection />
      <IntroSection />
      <SpiceMarquee />
      <CategorySection />
      <StorySection />
      <GallerySection />
      <FeaturedProducts />
      <FarmJourney />
      <VideoBanner />
      <RecipeGuide />
      <Benefits />
      <BulkEnquiry />
      <NewsletterSection />
    </main>
  );
}
