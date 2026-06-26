import Link from "next/link"
import Container from "@/components/shared/container"

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-20">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-green-400/10 blur-[120px]" />
      </div>

      <Container>
        <div className="relative z-10 grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-black text-white">
              Farm<span className="text-emerald-400">Gym</span>
            </h2>

            <p className="mt-5 max-w-md leading-relaxed text-gray-400">
              Turning urban farming into a health-positive lifestyle.
              Burn calories, grow food, support communities and build
              greener cities.
            </p>

            <div className="mt-6 flex gap-4">
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
                🌱 Sustainability
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
                💪 Wellness
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Platform
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/planner"
                className="text-gray-400 transition hover:text-emerald-400"
              >
                AI Planner
              </Link>

              <Link
                href="/community"
                className="text-gray-400 transition hover:text-emerald-400"
              >
                Community
              </Link>

              <Link
                href="/marketplace"
                className="text-gray-400 transition hover:text-emerald-400"
              >
                Marketplace
              </Link>

              <Link
                href="/donation"
                className="text-gray-400 transition hover:text-emerald-400"
              >
                Donations
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Company
            </h3>

            <div className="flex flex-col gap-3">
              <a
                href="#about"
                className="text-gray-400 transition hover:text-emerald-400"
              >
                About
              </a>

              <a
                href="#features"
                className="text-gray-400 transition hover:text-emerald-400"
              >
                Features
              </a>

              <a
                href="#contact"
                className="text-gray-400 transition hover:text-emerald-400"
              >
                Contact
              </a>

              <a
                href="#impact"
                className="text-gray-400 transition hover:text-emerald-400"
              >
                Impact
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
          <p>
            © 2026 FarmGym. All rights reserved.
          </p>

          <p>
            Built for healthier people, stronger communities, and greener
            cities.
          </p>
        </div>
      </Container>
    </footer>
  )
}