import Link from "next/link"

import Container from "@/components/shared/layout/container"
import PageWrapper from "@/components/shared/layout/page-wrapper"

import HeroGradient from "@/components/shared/backgrounds/hero-gradient"
import GlowOrbs from "@/components/shared/backgrounds/glow-orbs"
import GridBackground from "@/components/shared/backgrounds/grid-background"

import Navbar from "@/components/navigation/navbar"
import HeroDashboardPreview from "@/components/landing/hero-dashboard-preview"

export default function HeroSection() {
  return (
    <PageWrapper>
      <Navbar />

      <HeroGradient />
      <GlowOrbs />
      <GridBackground />

      <section className="relative overflow-hidden py-20 sm:py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-emerald-300 backdrop-blur-xl sm:px-5 sm:text-sm">
              🌱 Urban Farming Meets Fitness
            </div>

            <h1 className="mt-8 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:mt-10 md:text-7xl">
              Burn Calories.
              <br />
              Grow Food.
              <br />
              Live Sustainably.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg md:mt-8 md:text-xl">
              FarmGym transforms urban farming into a wellness lifestyle.
              Track calories, grow fresh produce, join farming challenges,
              and build a healthier planet.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-12">
              <Link
                href="/signup"
                className="
                  w-full
                  rounded-2xl
                  bg-emerald-500
                  px-8
                  py-4
                  text-lg
                  font-semibold
                  text-white
                  transition
                  hover:scale-105
                  hover:bg-emerald-400
                  sm:w-auto
                "
              >
                Start Farming
              </Link>

              <Link
                href="/planner"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-8
                  py-4
                  text-lg
                  font-semibold
                  text-white
                  backdrop-blur-xl
                  transition
                  hover:bg-white/10
                  sm:w-auto
                "
              >
                Explore Platform
              </Link>
            </div>

            <HeroDashboardPreview />
          </div>
        </Container>
      </section>
    </PageWrapper>
  )
}