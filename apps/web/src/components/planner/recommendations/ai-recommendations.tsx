"use client"

import { useState } from "react"
import {
  Sparkles,
  ArrowRight,
  Leaf,
  Droplets,
  Sun,
  Loader2,
  AlertCircle,
} from "lucide-react"

import { useRecommendations } from "@/features/planner/hooks/use-planner"

type Recommendation = {
  id: number
  crop: string
  category: string
  difficulty: string
  harvest_days: number
  water_requirement: string
  sunlight_requirement: string
  recommendation_score: number
}

const seasons = ["Spring", "Summer", "Monsoon", "Autumn", "Winter"]

const sunlightOptions = [
  "Full Sun",
  "Partial Sun",
]

const waterOptions = [
  "Low",
  "Medium",
  "High",
]

export default function AIRecommendations() {
  const [season, setSeason] = useState("Summer")
  const [sunlight, setSunlight] = useState("Full")
  const [water, setWater] = useState("Medium")

  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useRecommendations(
    season,
    sunlight,
    water,
  )

  const recommendations =
    data as Recommendation[]

  return (
    <div className="rounded-3xl border border-green-600/20 bg-card p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/10">
            <Sparkles className="h-5 w-5 text-green-600" />
          </span>

          <div>
            <h3 className="text-xl font-bold">
              AI Crop Recommendations
            </h3>

            <p className="text-xs text-muted-foreground">
              Personalized recommendations from your Farm Planner
            </p>
          </div>
        </div>

        <button
          onClick={() => refetch()}
          className="rounded-lg border px-3 py-2 text-sm hover:bg-muted"
        >
          Refresh
        </button>

      </div>

      {/* Filters */}

      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div>
          <label className="text-xs font-semibold text-muted-foreground">
            Season
          </label>

          <select
            className="mt-2 w-full rounded-xl border bg-background px-3 py-2"
            value={season}
            onChange={(e) =>
              setSeason(e.target.value)
            }
          >
            {seasons.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground">
            Sunlight
          </label>

          <select
            className="mt-2 w-full rounded-xl border bg-background px-3 py-2"
            value={sunlight}
            onChange={(e) =>
              setSunlight(e.target.value)
            }
          >
            {sunlightOptions.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground">
            Water
          </label>

          <select
            className="mt-2 w-full rounded-xl border bg-background px-3 py-2"
            value={water}
            onChange={(e) =>
              setWater(e.target.value)
            }
          >
            {waterOptions.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Loading */}

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      )}

      {/* Error */}

      {!isLoading && isError && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
          <h4 className="font-semibold">Unable to load recommendations</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Please try refreshing or changing the filters.
          </p>
        </div>
      )}

      {/* Empty */}

      {!isLoading &&
        !isError &&
        recommendations.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Leaf className="h-10 w-10 text-green-600 mb-3" />
            <h4 className="font-semibold">
              No matching crops found
            </h4>

            <p className="text-sm text-muted-foreground mt-2">
              Try changing season, sunlight or water availability.
            </p>
          </div>
        )}

      {/* Cards */}

      {!isLoading &&
        !isError &&
        recommendations.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recommendations.map((crop) => (
              <div
                key={crop.id}
                className="rounded-2xl border border-green-600/10 bg-background p-5 hover:border-green-500/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>

                    <h4 className="font-bold text-lg">
                      {crop.crop}
                    </h4>

                    <p className="text-xs text-muted-foreground">
                      {crop.category}
                    </p>

                  </div>

                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-700">
                    {crop.recommendation_score}%
                  </span>
                </div>

                <div className="mt-5 space-y-3">

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-green-600" />
                      Difficulty
                    </span>

                    <span className="font-medium">
                      {crop.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-amber-500" />
                      Sunlight
                    </span>

                    <span className="font-medium">
                      {crop.sunlight_requirement}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      Water
                    </span>

                    <span className="font-medium">
                      {crop.water_requirement}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span>
                      Harvest
                    </span>

                    <span className="font-semibold text-green-700">
                      {crop.harvest_days} days
                    </span>
                  </div>

                </div>

                <div className="mt-5 border-t pt-4 flex items-center justify-between">

                  <span className="text-xs text-muted-foreground">
                    AI Match Score
                  </span>

                  <ArrowRight className="h-4 w-4 text-green-600" />

                </div>

              </div>
            ))}
          </div>
        )}
      {/* Footer */}

      <div className="mt-8 border-t border-border pt-4">
        <div className="flex items-start gap-2 rounded-xl bg-green-50 dark:bg-green-950/20 p-4">
          <Sparkles className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />

          <div>
            <p className="text-sm font-semibold">
              Smart Recommendation Engine
            </p>

            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Recommendations are calculated using season compatibility,
              sunlight requirements and water availability from your crop
              database. Crops with the highest recommendation score are shown
              first.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}