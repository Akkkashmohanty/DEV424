"use client"

import { Loader2 } from "lucide-react"

import { usePlannerStore } from "../store/planner.store"
import { useRecommendations } from "../hooks/use-planner"

import RecommendationCard from "../cards/recommendation-card"

export default function AIRecommendations() {
  const season = usePlannerStore(
    (state) => state.season,
  )
  const sunlight = usePlannerStore(
    (state) => state.sunlight,
  )
  const waterAvailability =
    usePlannerStore(
      (state) =>
        state.waterAvailability,
    )

  const {
    data,
    isLoading,
    isError,
  } = useRecommendations(
    season,
    sunlight,
    waterAvailability,
  )

  if (
    !season ||
    !sunlight ||
    !waterAvailability
  ) {
    return (
      <div className="rounded-3xl border bg-card p-8 text-center">
        <h3 className="text-2xl font-semibold">
          AI Recommendations
        </h3>

        <p className="mt-3 text-muted-foreground">
          Complete your planner settings to receive AI-powered crop recommendations.
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
        Failed to load recommendations.
      </div>
    )
  }

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
        {data?.map((recommendation: any) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}
      </div>
    </div>
  )
}