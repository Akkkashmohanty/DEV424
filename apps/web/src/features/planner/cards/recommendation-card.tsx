import { Recommendation } from "@/features/planner/types/planner.types"

interface Props {
  recommendation: Recommendation
}

export default function RecommendationCard({
  recommendation,
}: Props) {
  return (
    <div className="rounded-3xl border bg-card p-6 transition hover:shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">
          {recommendation.crop}
        </h3>

        <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-600">
          {recommendation.season}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-muted-foreground">
          Difficulty: {recommendation.difficulty}
        </p>

        <p className="text-muted-foreground">
          Water Need: {recommendation.waterLevel}
        </p>
      </div>
    </div>
  )
}