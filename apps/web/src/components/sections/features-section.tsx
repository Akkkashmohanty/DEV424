import Container from "@/components/shared/container"
import { FEATURES } from "@/constants/features"

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Everything Needed To Build A Greener Lifestyle
          </h2>

          <p className="mt-4 text-muted-foreground">
            FarmGym integrates sustainability, fitness and community into one
            powerful ecosystem.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className="rounded-3xl border bg-card p-8 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10">
                  <Icon className="h-7 w-7 text-green-600" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}