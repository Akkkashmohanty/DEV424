"use client"

import { Sparkles, ArrowRight, Lightbulb, Sun, Droplet, Layers } from "lucide-react"

const adviceList = [
  {
    title: "Optimize Sunlight for Spinach",
    desc: "Shift your spinach bed from East Balcony Slot B2 to West Balcony Slot A1. Spinach requires at least 4 hours of morning sun, which Slot A1 receives 30% more of currently.",
    icon: Sun,
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    title: "Automated Crop Companionship",
    desc: "Plant Sweet Basil right next to your Cherry Tomatoes. Basil naturally deters thrips and hornworms, improving tomato yield by up to 20% while saving soil space.",
    icon: Layers,
    color: "text-purple-500 bg-purple-500/10",
  },
  {
    title: "Nutrient Adjustment Schedule",
    desc: "Soil nitrogen in Slot C3 (Curry Leaves) is slightly depleted. Apply organic seaweed extract or spent coffee grounds during tomorrow morning's watering workout.",
    icon: Droplet,
    color: "text-blue-500 bg-blue-500/10",
  },
]

export default function AIRecommendations() {
  return (
    <div className="rounded-3xl border border-green-600/20 bg-green-500/[0.01] p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 text-green-600">
            <Sparkles className="h-4.5 w-4.5 text-green-600 animate-pulse" />
          </span>
          <h3 className="text-xl font-bold tracking-tight bg-gradient-to-r from-green-800 to-emerald-800 dark:from-green-300 dark:to-emerald-300 bg-clip-text text-transparent">
            AI Crop Recommendations
          </h3>
        </div>
        <span className="text-xs font-semibold text-green-700 dark:text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
          Powered by AgriGym AI v1.2
        </span>
      </div>

      {/* Advice List Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {adviceList.map((adv, idx) => {
          const Icon = adv.icon
          return (
            <div
              key={idx}
              className="flex flex-col justify-between border border-green-600/10 hover:border-green-600/30 bg-card p-5 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${adv.color} mb-4`}>
                  <Icon className="h-4.5 w-4.5" />
                </span>

                <h4 className="font-semibold text-sm leading-snug text-foreground">
                  {adv.title}
                </h4>

                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  {adv.desc}
                </p>
              </div>

              <div className="mt-6 border-t border-border/40 pt-3 flex items-center justify-between">
                <span className="text-[10px] text-green-600 dark:text-green-400 font-bold flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" />
                  Smart Recommendation
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground hover:text-green-600 transition" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
