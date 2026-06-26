"use client"

import { Activity, Thermometer, Droplet, Sun, ShieldCheck, HelpCircle } from "lucide-react"

const metrics = [
  {
    name: "Average Soil Moisture",
    value: "78%",
    status: "Optimal",
    color: "text-blue-600 bg-blue-500/10",
    barColor: "bg-blue-500",
    progress: 78,
  },
  {
    name: "NPK Nutrient Density",
    value: "84%",
    status: "Optimal",
    color: "text-purple-600 bg-purple-500/10",
    barColor: "bg-purple-500",
    progress: 84,
  },
  {
    name: "Sunlight Exposure",
    value: "5.2 hrs/day",
    status: "Good",
    color: "text-amber-600 bg-amber-500/10",
    barColor: "bg-amber-500",
    progress: 65,
  },
  {
    name: "Soil pH Balance",
    value: "6.5 pH",
    status: "Excellent",
    color: "text-green-600 bg-green-500/10",
    barColor: "bg-green-600",
    progress: 90,
  },
]

export default function CropHealthCard() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold tracking-tight">AI Crop Health Analytics</h3>
        <span className="flex items-center gap-1.5 text-xs text-green-700 dark:text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full font-semibold">
          <ShieldCheck className="h-3.5 w-3.5" />
          Overall Index: 92%
        </span>
      </div>

      {/* Main score details */}
      <div className="grid gap-4 md:grid-cols-2">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="flex flex-col justify-between border border-border/50 bg-muted/15 hover:bg-muted/30 p-4 rounded-2xl transition-all"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground font-semibold leading-none">{metric.name}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${metric.color}`}>
                {metric.status}
              </span>
            </div>

            <div className="mt-4">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-xl font-extrabold text-foreground">{metric.value}</span>
                <span className="text-[10px] text-muted-foreground">{metric.progress}% of Target</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${metric.barColor}`}
                  style={{ width: `${metric.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Advice */}
      <div className="mt-6 border-t border-border pt-6 flex gap-2.5 items-start text-xs text-muted-foreground leading-normal">
        <HelpCircle className="h-4.5 w-4.5 text-green-600 shrink-0 mt-0.5" />
        <span>
          Sensor metrics are dynamically calibrated using AgriGym ambient moisture scanners. We advise keeping moisture above 60% for leafy microgreens.
        </span>
      </div>
    </div>
  )
}
