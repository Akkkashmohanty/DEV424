"use client"

import { Trophy } from "lucide-react"

import { useAchievements } from "@/features/achievement/hooks/use-achievement"

export default function BadgeGrid() {
  const {
    data: achievements,
    isLoading,
  } = useAchievements()

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-bold">
          Achievements
        </h2>

        <p className="mt-4 text-muted-foreground">
          Loading achievements...
        </p>
      </div>
    )
  }

  if (!achievements || achievements.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-bold">
          Achievements
        </h2>

        <div className="mt-8 flex flex-col items-center justify-center py-8">
          <Trophy className="mb-4 h-10 w-10 text-muted-foreground" />

          <p className="text-muted-foreground">
            No achievements unlocked yet.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Achievements
        </h2>

        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
          {achievements.length} Unlocked
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {achievements.map(
          (achievement) => (
            <div
              key={achievement.id}
              className="rounded-2xl border border-border bg-background p-4 transition hover:border-emerald-500"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl">
                  {achievement.icon}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold">
                    {achievement.title}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {achievement.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                      +{achievement.xp_reward} XP
                    </span>

                    <span className="text-xs text-emerald-600">
                      Unlocked
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  )
}