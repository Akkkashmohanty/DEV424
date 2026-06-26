import Container from "@/components/shared/layout/container"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-12 backdrop-blur-xl md:p-20">
          {/* Background Glow */}
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-emerald-500/30 blur-3xl" />

          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-green-400/20 blur-3xl" />

          <div className="relative text-center">
            <div className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-400">
              Start Today
            </div>

            <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
              Transform Your Balcony Into
              <br />
              A Fitness Farm
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
              Burn calories, grow fresh food, contribute to your community,
              and build a healthier lifestyle through sustainable urban farming.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="rounded-2xl bg-emerald-500 px-8 hover:bg-emerald-400"
              >
                Start Farming Today
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl border-white/20 bg-white/5 px-8 text-white hover:bg-white/10"
              >
                Explore Features
              </Button>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 text-sm text-gray-400 md:flex-row md:gap-8">
              <span>✓ Beginner Friendly</span>
              <span>✓ No Gym Equipment Needed</span>
              <span>✓ Sustainable Lifestyle</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}