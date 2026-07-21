"use client"

import {
  Leaf,
  Droplets,
  Recycle,
  CloudRain,
  Sprout,
  Trees,
} from "lucide-react"

import { useFarmPlans } from "@/features/planner/hooks/use-planner"

type FarmPlanCrop = {
  crop_name: string
  watering_frequency: string
}

type FarmPlan = {
  garden_type: string
  water_availability: string
  crops: FarmPlanCrop[]
}

export default function SustainabilityCard() {
  const {
    data,
    isLoading,
  } = useFarmPlans()

  const plans = (data ?? []) as FarmPlan[]

  const totalPlans = plans.length

  const totalCrops = plans.reduce(
    (sum, plan) => sum + plan.crops.length,
    0,
  )

  const highWater = plans.some(plan =>
    plan.crops.some(
      crop =>
        crop.watering_frequency.toLowerCase() ===
        "high",
    ),
  )

  const balcony = plans.some(
    plan =>
      plan.garden_type.toLowerCase() ===
      "balcony",
  )

  const terrace = plans.some(
    plan =>
      plan.garden_type.toLowerCase() ===
      "terrace",
  )

  const backyard = plans.some(
    plan =>
      plan.garden_type.toLowerCase() ===
      "backyard",
  )

  let score = 60

  if (!highWater) score += 15

  if (totalCrops >= 3) score += 10

  if (plans.some(p => p.water_availability === "High"))
    score += 5

  if (score > 100) score = 100

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6">
        <div className="animate-pulse space-y-4">

          <div className="h-6 w-48 rounded bg-muted" />

          <div className="h-28 rounded-xl bg-muted" />

          <div className="h-28 rounded-xl bg-muted" />

        </div>
      </div>
    )
  }

  if (plans.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center">

        <Leaf className="mx-auto mb-4 h-8 w-8 text-green-600" />

        <h3 className="text-lg font-bold">

          No Sustainability Data

        </h3>

        <p className="mt-2 text-sm text-muted-foreground">

          Save a Farm Plan to receive
          sustainability recommendations.

        </p>

      </div>
    )
  }
    return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">
            Sustainability Insights
          </h2>

          <p className="text-sm text-muted-foreground">
            Recommendations generated from your saved farm plans.
          </p>
        </div>

        <div className="rounded-full bg-green-100 px-4 py-2 text-lg font-bold text-green-700">
          {score}%
        </div>
      </div>

      <div className="mb-6 h-3 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-green-600 transition-all"
          style={{
            width: `${score}%`,
          }}
        />
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">

        <div className="rounded-xl border p-4">
          <div className="mb-2 flex items-center gap-2">
            <Recycle className="h-5 w-5 text-green-600" />
            <span className="font-semibold">
              Compost
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            Compost vegetable scraps and dry leaves to
            naturally improve soil fertility and reduce waste.
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <div className="mb-2 flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-600" />
            <span className="font-semibold">
              Water Usage
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            {highWater
              ? "Some crops require frequent watering. Mulching and drip irrigation can reduce water consumption."
              : "Your crop selection is water-efficient. Continue monitoring moisture before watering."}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <div className="mb-2 flex items-center gap-2">
            <CloudRain className="h-5 w-5 text-cyan-600" />
            <span className="font-semibold">
              Rainwater Harvesting
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            Collect rainwater for irrigation to reduce dependence
            on municipal water and improve sustainability.
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <div className="mb-2 flex items-center gap-2">
            <Trees className="h-5 w-5 text-emerald-600" />
            <span className="font-semibold">
              Garden Recommendation
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            {balcony &&
              "Use vertical planters and self-watering pots to maximize small spaces."}

            {terrace &&
              "Grow companion crops and install drip irrigation for efficient water use."}

            {backyard &&
              "Practice crop rotation and mulch regularly to maintain healthy soil."}

            {!balcony && !terrace && !backyard &&
              "Diversify crops and use organic compost to improve long-term sustainability."}
          </p>
        </div>

      </div>

      <div className="rounded-xl border bg-muted/40 p-4">
        <div className="mb-3 flex items-center gap-2">
          <Sprout className="h-5 w-5 text-green-600" />
          <span className="font-semibold">
            Farm Summary
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">

          <div>
            <p className="text-2xl font-bold">
              {totalPlans}
            </p>

            <p className="text-sm text-muted-foreground">
              Saved Plans
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold">
              {totalCrops}
            </p>

            <p className="text-sm text-muted-foreground">
              Planned Crops
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold">
              {score}%
            </p>

            <p className="text-sm text-muted-foreground">
              Sustainability Score
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}