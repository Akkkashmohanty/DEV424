"use client"

import {
  Activity,
  CalendarDays,
  Leaf,
  ShieldCheck,
} from "lucide-react"

import {
  useCropLifecycle,
} from "@/features/planner/hooks/use-planner"

export default function CropHealthCard() {
  const {
    data,
    isLoading,
  } = useCropLifecycle()

  const crops = data ?? []

  const averageHealth =
    crops.length === 0
      ? 0
      : Math.round(
          crops.reduce(
            (sum, crop) => sum + crop.progress,
            0,
          ) / crops.length,
        )

  const activeCrops = crops.filter(
    crop => crop.status === "ACTIVE",
  ).length

  const harvestReady = crops.filter(
    crop => crop.status === "HARVEST",
  ).length

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6">
        <div className="animate-pulse space-y-4">

          <div className="h-8 w-48 rounded bg-muted" />

          <div className="grid gap-4">

            {Array.from({
              length: 4,
            }).map((_, index) => (
              <div
                key={index}
                className="h-28 rounded-2xl bg-muted"
              />
            ))}

          </div>

        </div>
      </div>
    )
  }

  if (crops.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center">

        <Leaf className="mx-auto mb-4 h-10 w-10 text-green-600" />

        <h3 className="text-xl font-bold">

          No Crop Health Data

        </h3>

        <p className="mt-2 text-sm text-muted-foreground">

          Save a farm plan to begin
          monitoring crop health.

        </p>

      </div>
    )
  }

  return (
  <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">

    {/* Header */}

    <div className="mb-6 flex items-center justify-between">

      <div>

        <h3 className="text-xl font-bold tracking-tight">
          Crop Health Analytics
        </h3>

        <p className="mt-1 text-xs text-muted-foreground">
          Live health metrics generated from your crop lifecycle.
        </p>

      </div>

      <span className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-700">

        <ShieldCheck className="h-4 w-4" />

        Overall Health {averageHealth}%

      </span>

    </div>

    {/* Summary */}

    <div className="mb-6 grid gap-4 md:grid-cols-3">

      <div className="rounded-2xl border bg-muted/10 p-4">

        <div className="text-xs text-muted-foreground">
          Overall Progress
        </div>

        <div className="mt-2 text-3xl font-extrabold text-green-600">
          {averageHealth}%
        </div>

      </div>

      <div className="rounded-2xl border bg-muted/10 p-4">

        <div className="text-xs text-muted-foreground">
          Active Crops
        </div>

        <div className="mt-2 text-3xl font-extrabold">
          {activeCrops}
        </div>

      </div>

      <div className="rounded-2xl border bg-muted/10 p-4">

        <div className="text-xs text-muted-foreground">
          Harvest Ready
        </div>

        <div className="mt-2 text-3xl font-extrabold text-amber-600">
          {harvestReady}
        </div>

      </div>

    </div>

    {/* Crop Cards */}

    <div className="space-y-4">

      {crops.map((crop) => {

        const badgeClass =
          crop.status === "HARVEST"
            ? "bg-amber-500/10 text-amber-700"
            : crop.status === "ACTIVE"
            ? "bg-green-500/10 text-green-700"
            : "bg-blue-500/10 text-blue-700"

        return (

          <div
            key={crop.crop_name}
            className="rounded-2xl border border-border/50 bg-muted/10 p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <Activity className="h-5 w-5 text-green-600" />

                  <h4 className="font-bold text-lg">
                    {crop.crop_name}
                  </h4>

                </div>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${badgeClass}`}
              >
                {crop.status}
              </span>

            </div>

            <div className="mt-5">

              <div className="mb-2 flex items-center justify-between">

                <span className="text-sm font-medium">
                  Growth Progress
                </span>

                <span className="text-sm font-bold">
                  {crop.progress}%
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-muted">

                <div
                  className="h-full rounded-full bg-green-600 transition-all"
                  style={{
                    width: `${crop.progress}%`,
                  }}
                />

              </div>

            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">

              <div className="flex items-center gap-3 rounded-xl border bg-background p-3">

                <CalendarDays className="h-4 w-4 text-blue-600" />

                <div>

                  <div className="text-xs text-muted-foreground">
                    Planting Date
                  </div>

                  <div className="font-semibold">
                    {crop.planting_date}
                  </div>

                </div>

              </div>

              <div className="flex items-center gap-3 rounded-xl border bg-background p-3">

                <Leaf className="h-4 w-4 text-green-600" />

                <div>

                  <div className="text-xs text-muted-foreground">
                    Expected Harvest
                  </div>

                  <div className="font-semibold">
                    {crop.expected_harvest_date}
                  </div>

                </div>

              </div>

            </div>

          </div>

        )

      })}

    </div>

    {/* Footer */}

    <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/5 p-4">

      <div className="flex items-start gap-3">

        <ShieldCheck className="mt-0.5 h-5 w-5 text-green-600" />

        <div>

          <h4 className="font-semibold">
            AI Health Summary
          </h4>

          <p className="mt-1 text-sm text-muted-foreground">

            Crop health is calculated from the real crop lifecycle
            data stored in FarmGym. As crops progress from planting
            toward harvest, this dashboard updates automatically
            using backend lifecycle information instead of mock
            sensor values.

          </p>

        </div>

      </div>

    </div>

  </div>
)
}