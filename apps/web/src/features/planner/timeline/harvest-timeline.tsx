"use client"

import { useHarvestTimeline } from "../hooks/use-planner"
import type { HarvestTimelineItem } from "../types/planner.types"

export default function HarvestTimeline() {
  const {
    data: timeline = [],
    isLoading,
    isError,
  } = useHarvestTimeline()

  if (isLoading) {
    return (
      <div className="rounded-3xl border bg-card p-6">
        <h3 className="text-2xl font-semibold">
          Harvest Predictions
        </h3>

        <p className="mt-6 text-muted-foreground">
          Loading harvest timeline...
        </p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-3xl border bg-card p-6">
        <h3 className="text-2xl font-semibold">
          Harvest Predictions
        </h3>

        <p className="mt-6 text-destructive">
          Unable to load harvest timeline.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-semibold">
        Harvest Predictions
      </h3>

      <div className="mt-6 space-y-6">
        {timeline.length === 0 ? (
          <p className="text-muted-foreground">
            No crops available yet.
          </p>
        ) : (
          timeline.map(
            (item: HarvestTimelineItem) => (
              <div
                key={`${item.crop_name}-${item.expected_harvest_date}`}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-medium">
                    {item.crop_name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Planted: {item.planting_date}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-medium text-green-600">
                    {item.expected_harvest_date}
                  </p>

                  <p className="text-xs uppercase text-muted-foreground">
                    {item.status}
                  </p>
                </div>
              </div>
            ),
          )
        )}
      </div>
    </div>
  )
}