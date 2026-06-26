import Container from "@/components/shared/layout/container"

const values = [
  {
    title: "Sustainability",
    icon: "🌱",
    description:
      "Grow fresh food where you live while reducing transportation emissions and food waste.",
  },
  {
    title: "Wellness",
    icon: "🔥",
    description:
      "Transform everyday gardening activities into meaningful calorie-burning exercise.",
  },
  {
    title: "Community",
    icon: "🤝",
    description:
      "Share harvests, support NGOs, and build stronger local communities through food.",
  },
]

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-32"
    >
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-400 backdrop-blur-xl">
            About FarmGym
          </div>

          <h2 className="mt-8 text-4xl font-black tracking-tight text-white md:text-6xl">
            The Future Of Fitness
            <br />
            Is Productive
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-400">
            Every movement contributes to healthier people, stronger
            communities, and greener cities. FarmGym combines sustainability,
            wellness, and food production into a single lifestyle ecosystem.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {values.map((item) => (
            <div
              key={item.title}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                p-8
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-emerald-500/30
              "
            >
              <div
                className="
                  absolute
                  inset-0
                  opacity-0
                  transition
                  duration-500
                  group-hover:opacity-100
                  bg-gradient-to-br
                  from-emerald-500/10
                  to-green-400/5
                "
              />

              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-3xl">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 leading-relaxed text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}