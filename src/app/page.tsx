import ThreeDCarHero from "@/components/ThreeDCarHero";
import BrandStory from "@/components/BrandStory";
import ThreeDShowcase from "@/components/ThreeDShowcase";
import PerformanceStats from "@/components/PerformanceStats";
import FeatureShowcase from "@/components/FeatureShowcase";
import InteriorExperience from "@/components/InteriorExperience";
import GallerySection from "@/components/GallerySection";
import ManufacturingProcess from "@/components/ManufacturingProcess";
import TestimonialsSection from "@/components/TestimonialsSection";
import Specifications from "@/components/Specifications";
export default function Home() {
  return (
    <main className="w-full bg-black text-white relative">
      <ThreeDCarHero />
      <BrandStory />
      <ThreeDShowcase />
      <PerformanceStats />
      <FeatureShowcase />
      <InteriorExperience />
      <GallerySection />
      <ManufacturingProcess />
      <TestimonialsSection />
      <Specifications />
    </main>
  );
}
