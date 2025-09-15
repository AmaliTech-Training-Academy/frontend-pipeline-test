import FeatureSection from "@/components/feature-section";
import HeroSection from "@/components/hero-section";
import PricingSection from "@/components/pricing-section";
import StatsSection from "@/components/stats-section";
import { TestimonialsSection } from "@/components/testimonials-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <FeatureSection />
      <TestimonialsSection />
      <PricingSection />
    </div>
  );
}
