import ModernAnimatedHeroSection from "@/components/ui/modern-animated-hero-section"
import { LogoCloud } from "@/components/ui/logo-cloud"
import { FeaturesShowcase } from "@/components/ui/features-showcase"
import { HowItWorksSection } from "@/components/ui/how-it-works-section"
import { ReleaseTimelineSection } from "@/components/ui/release-timeline-section"
import { CommunityShowcase } from "@/components/ui/community-showcase"
import { TestimonialsSection } from "@/components/ui/testimonials-section"

export default function HomePage() {
  return (
    <>
      <ModernAnimatedHeroSection />
      <LogoCloud />
      <FeaturesShowcase />
      <HowItWorksSection />
      <ReleaseTimelineSection />
      <CommunityShowcase />
      <TestimonialsSection />
    </>
  )
}

