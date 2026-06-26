"use client"

import { Hourglass, Calendar, Sprout, ShoppingBag, Info } from "lucide-react"

const crops = [
  {
    name: "Baby Spinach",
    planted: "12 days ago",
    stage: "Leafy Growth",
    remainingDays: 12,
    progress: 70,
    yieldEst: "1.2 kg",
    color: "bg-green-500",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    name: "Cherry Tomatoes",
    planted: "45 days ago",
    stage: "Flowering Phase",
    remainingDays: 25,
    progress: 65,
    yieldEst: "3.5 kg",
    color: "bg-red-500",
    gradient: "from-orange-500 to-red-500",
  },
  {
    name: "Organic Green Chili",
    planted: "28 days ago",
    stage: "Fruiting Phase",
    remainingDays: 15,
    progress: 75,
    yieldEst: "0.8 kg",
    color: "bg-amber-500",
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    name: "Sweet Basil Pots",
    planted: "8 days ago",
    stage: "Seedling Sprout",
    remainingDays: 22,
    progress: 30,
    yieldEst: "0.5 kg",
    color: "bg-teal-500",
    gradient: "from-teal-500 to-cyan-500",
  },
]

export default function HarvestTimeline() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold tracking-tight">Harvest Timeline</h3>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Hourglass className="h-3.5 w-3.5" />
            Growth Progression
          </span>
        </div>

        <div className="space-y-6">
          {crops.map((crop) => (
            <div key={crop.name} className="border border-border/50 bg-muted/15 rounded-2xl p-4 transition-all hover:bg-muted/30">
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-500/10 text-green-700">
                    <Sprout className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-bold text-foreground">{crop.name}</span>
                </div>
                <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full shrink-0">
                  {crop.stage}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex justify-between items-center text-[10px] text-muted-foreground mb-1 font-medium">
                  <span>{crop.planted}</span>
                  <span className="text-foreground font-bold">{crop.remainingDays} days remaining</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${crop.gradient}`}
                    style={{ width: `${crop.progress}%` }}
                  />
                </div>
              </div>

              {/* Yield estimate */}
              <div className="flex items-center justify-between mt-3 text-[10px] text-muted-foreground border-t border-border/40 pt-2.5">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Planted: {crop.planted}
                </span>
                <span className="flex items-center gap-1 text-green-700 dark:text-green-400 font-semibold">
                  <ShoppingBag className="h-3 w-3" />
                  Yield Est: {crop.yieldEst}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-4 flex gap-2 items-start text-[11px] text-muted-foreground leading-relaxed">
        <Info className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
        <span>Timelines are dynamically estimated based on local solar levels and average balcony heat retention.</span>
      </div>
    </div>
  )
}
