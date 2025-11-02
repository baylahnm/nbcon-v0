import { HeroSection } from "@/components/ui/hero-section-3"
import { FeaturesGrid } from "@/components/ui/features-grid"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Features Grid Section */}
      <FeaturesGrid />
    </div>
  )
}

