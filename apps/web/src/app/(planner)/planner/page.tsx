"use client"

import {
  CalendarDays,
  Leaf,
  Sprout,
  Droplets,
} from "lucide-react"

import ProtectedRoute from "@/components/auth/protected-route"

import PlantingCalendar from "@/components/planner/calendar/planting-calendar"
import WeatherWidget from "@/components/planner/weather/weather-widget"
import ReminderList from "@/components/planner/reminders/reminder-list"
import BalconyPlanner from "@/components/planner/planner/balcony-planner"
import HarvestTimeline from "@/components/planner/timeline/harvest-timeline"
import AIRecommendations from "@/components/planner/recommendations/ai-recommendations"
import CropHealthCard from "@/components/planner/analytics/crop-health-card"

import WateringSchedule from "@/features/planner/weather/watering-schedule"

import { useDashboardSummary } from "@/features/planner/hooks/use-planner"

import CropLifecycleCard from "@/features/planner/lifecycle/crop-lifecycle-card"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function PlannerContent() {
  const {
    data: dashboard,
    isLoading,
  } = useDashboardSummary()

  return (
    <main className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              🌱 AI Farm Planner
            </h1>

            <p className="mt-2 text-muted-foreground">
              Plan your crops, monitor progress,
              manage watering schedules and receive
              intelligent seasonal recommendations.
            </p>
          </div>
        </div>

        {/* Summary Cards */}

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">
                Active Crops
              </CardTitle>

              <Sprout className="h-5 w-5" />
            </CardHeader>

            <CardContent>

              <p className="text-3xl font-bold">
                {isLoading
                  ? "--"
                  : dashboard?.active_crops ?? 0}
              </p>

              <p className="text-sm text-muted-foreground">
                Currently growing
              </p>

            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">

              <CardTitle className="text-base">
                Water Today
              </CardTitle>

              <Droplets className="h-5 w-5" />

            </CardHeader>

            <CardContent>

              <p className="text-3xl font-bold">
                {isLoading
                  ? "--"
                  : dashboard?.water_today ?? 0}
              </p>

              <p className="text-sm text-muted-foreground">
                Plants scheduled
              </p>

            </CardContent>

          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">

              <CardTitle className="text-base">
                Harvest Soon
              </CardTitle>

              <Leaf className="h-5 w-5" />

            </CardHeader>

            <CardContent>

              <p className="text-3xl font-bold">
                {isLoading
                  ? "--"
                  : dashboard?.harvest_soon ?? 0}
              </p>

              <p className="text-sm text-muted-foreground">
                Ready within 7 days
              </p>

            </CardContent>

          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">

              <CardTitle className="text-base">
                Planner Tasks
              </CardTitle>

              <CalendarDays className="h-5 w-5" />

            </CardHeader>

            <CardContent>

              <p className="text-3xl font-bold">
                {isLoading
                  ? "--"
                  : dashboard?.planner_tasks ?? 0}
              </p>

              <p className="text-sm text-muted-foreground">
                Scheduled this month
              </p>

            </CardContent>

          </Card>

        </section>

        {/* Weather + Calendar */}

        <section className="grid gap-6 xl:grid-cols-3">

          <div className="xl:col-span-2">
            <PlantingCalendar />
          </div>

          <WeatherWidget />

        </section>

        {/* Reminder + Water Schedule + Harvest */}

        <section className="grid gap-6 xl:grid-cols-3">

          <ReminderList />

          <WateringSchedule />

          <HarvestTimeline />

        </section>

        {/* AI */}

        <section>

          <AIRecommendations />

        </section>

        {/* Bottom */}

        <section className="grid gap-6 xl:grid-cols-3">

          <BalconyPlanner />

          <CropLifecycleCard />

          <CropHealthCard />

        </section>

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