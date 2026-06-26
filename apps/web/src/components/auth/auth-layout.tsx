import { ReactNode } from "react"

export default function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020817]">
      {/* Background Grid */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),
          linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
          bg-[size:48px_48px]
        "
      />

      {/* Glow Effects */}
      <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-emerald-500/15 blur-[120px]" />
      <div className="absolute right-0 bottom-20 h-96 w-96 rounded-full bg-green-400/10 blur-[120px]" />

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden flex-col justify-between p-16 lg:flex">
          <div>
            <h1 className="text-4xl font-black text-white">
              Farm<span className="text-emerald-400">Gym</span>
            </h1>
          </div>

          <div>
            <div className="mb-6 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
              🌱 Urban Farming Meets Fitness
            </div>

            <h2 className="max-w-lg text-6xl font-black leading-tight text-white">
              Grow Food.
              <br />
              Burn Calories.
              <br />
              Change Cities.
            </h2>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-gray-400">
              Join a community transforming balconies into productive,
              healthy and sustainable urban ecosystems.
            </p>
          </div>

          <div className="flex gap-6">
            <div>
              <p className="text-3xl font-bold text-white">
                15K+
              </p>

              <p className="text-gray-400">
                Urban Farmers
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold text-white">
                2.5M+
              </p>

              <p className="text-gray-400">
                Calories Burned
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}