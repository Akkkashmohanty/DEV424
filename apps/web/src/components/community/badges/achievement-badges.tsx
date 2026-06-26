const badges = [
  "Green Warrior",
  "Harvest Hero",
  "Community Builder",
]

export default function AchievementBadges() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h2 className="text-3xl font-bold">
        Achievement Badges
      </h2>

      <div className="mt-8 flex flex-wrap gap-4">
        {badges.map((badge) => (
          <div
            key={badge}
            className="rounded-full bg-green-500/10 px-6 py-3 text-green-600"
          >
            {badge}
          </div>
        ))}
      </div>
    </div>
  )
}