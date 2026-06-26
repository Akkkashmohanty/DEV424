import { recommendations } from "@/features/planner/mock/planner.mock"

import RecommendationCard from "../cards/recommendation-card"

export default function AIRecommendations() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          AI Recommendations
        </h2>

        <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-600">
          AI Powered
        </span>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}
      </div>
    </div>
  )
}