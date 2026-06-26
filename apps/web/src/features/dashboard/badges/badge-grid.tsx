import { badges } from "@/features/dashboard/mock/dashboard.mock"

export default function BadgeGrid() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-semibold">
        Achievement Badges
      </h3>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="rounded-2xl border p-4"
          >
            <h4 className="font-semibold">
              {badge.title}
            </h4>

            <p className="mt-2 text-sm text-muted-foreground">
              {badge.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}