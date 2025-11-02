import { Navbar } from "@/components/ui/navbar"
import { HeroSection } from "@/components/ui/hero-section-3"
import { CommunityShowcase } from "@/components/ui/community-showcase"
import { LandingFooter } from "@/components/ui/landing-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <CommunityShowcase />
      <LandingFooter />
    </div>
  )
}

