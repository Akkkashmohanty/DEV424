import HeroSection from "@/components/sections/hero-section"
import ProblemSolutionSection from "@/components/sections/problem-solution-section"
import FeaturesSection from "@/components/sections/features-section"
import KPISection from "@/components/sections/kpi-section"
import AboutSection from "@/components/sections/about-section"
import CTASection from "@/components/sections/cta-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/layout/footer"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <KPISection />
      <AboutSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </>
  )
}