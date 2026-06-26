"use client"

import ProtectedRoute from "@/components/auth/protected-route"

import PlantingCalendar from "@/components/planner/calendar/planting-calendar"
import WeatherWidget from "@/components/planner/weather/weather-widget"
import ReminderList from "@/components/planner/reminders/reminder-list"
import BalconyPlanner from "@/components/planner/planner/balcony-planner"
import HarvestTimeline from "@/components/planner/timeline/harvest-timeline"
import AIRecommendations from "@/components/planner/recommendations/ai-recommendations"
import CropHealthCard from "@/components/planner/analytics/crop-health-card"

function PlannerContent() {
  return (
    <main className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-5xl font-bold">
              AI Farm Planner
            </h1>

            <p className="mt-4 text-lg text-muted-foreground">
              Smart planning for sustainable farming.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <PlantingCalendar />
          </div>

          <WeatherWidget />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <ReminderList />
          <HarvestTimeline />
        </div>

        <div className="mt-6">
          <AIRecommendations />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <BalconyPlanner />
          <CropHealthCard />
        </div>
      </div>
    </main>
  )
}

export default function PlannerPage() {
  return (
    <ProtectedRoute>
      <PlannerContent />
    </ProtectedRoute>
  )
}