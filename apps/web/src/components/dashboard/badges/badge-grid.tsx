"use client"

import { Award, Flame, Sprout, Droplet, Sparkles } from "lucide-react"

const badges = [
  {
    title: "Balcony Pioneer",
    desc: "Planted first 4 crop beds successfully.",
    status: "unlocked",
    progress: 100,
    gradient: "from-green-500 to-emerald-500",
    icon: Sprout,
  },
  {
    title: "Calorie Crusher",
    desc: "Burned 2,000 active farming calories.",
    status: "unlocked",
    progress: 100,
    gradient: "from-orange-500 to-red-500",
    icon: Flame,
  },
  {
    title: "Water Master",
    desc: "Achieved 95% water saving efficiency.",
    status: "in-progress",
    progress: 80,
    gradient: "from-blue-500 to-indigo-500",
    icon: Droplet,
  },
  {
    title: "NGO Guardian",
    desc: "Donated over 10 kg of organic produce.",
    status: "in-progress",
    progress: 40,
    gradient: "from-purple-500 to-pink-500",
    icon: Award,
  },
]

export default function BadgeGrid() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold tracking-tight">Achievements & Badges</h3>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
          2 / 4 Unlocked
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {badges.map((badge) => {
          const Icon = badge.icon
          const isLocked = badge.status === "locked"
          const isInProgress = badge.status === "in-progress"

          return (
            <div
              key={badge.title}
              className="flex flex-col justify-between border border-border/60 bg-muted/20 hover:bg-muted/40 p-4 rounded-2xl transition-all hover:shadow-md"
            >
              <div className="flex gap-3">
                {/* Badge Visual Icon */}
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${badge.gradient} text-white shadow-sm`}>
                  <Icon className="h-6 w-6" />
                </div>

                <div>
                  <h4 className="font-semibold text-sm leading-none">{badge.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-snug">{badge.desc}</p>
                </div>
              </div>

              {/* Progress and status */}
              <div className="mt-4">
                <div className="flex justify-between items-center text-[10px] text-muted-foreground mb-1">
                  <span>{badge.status === "unlocked" ? "Unlocked" : "In Progress"}</span>
                  <span>{badge.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${badge.gradient}`}
                    style={{ width: `${badge.progress}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
