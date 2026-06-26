"use client"

import Link from "next/link"

import ProtectedRoute from "@/components/auth/protected-route"

import DashboardSidebar from "@/components/dashboard/layout/dashboard-sidebar"
import MobileBottomNav from "@/components/dashboard/layout/mobile-bottom-nav"

import AnalyticsCard from "@/components/dashboard/widgets/analytics-card"
import ProgressRing from "@/components/dashboard/widgets/progress-ring"

import ActivityTimeline from "@/components/dashboard/activity/activity-timeline"
import BadgeGrid from "@/components/dashboard/badges/badge-grid"
import NotificationCenter from "@/components/dashboard/notifications/notification-center"
import WaterUsageCard from "@/components/dashboard/water/water-usage-card"

import { useDashboardSummary } from "@/features/dashboard/hooks/use-dashboard"

function DashboardContent() {
  const {
    data,
    isLoading,
    error,
  } = useDashboardSummary()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading dashboard...
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Failed to load dashboard
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 p-4 pb-24 md:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black">
            Dashboard
          </h1>

          <p className="mt-2 text-muted-foreground">
            Track your farming journey.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Link
            href="/planner"
            className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-green-600"
          >
            <div className="text-2xl">📅</div>

            <h3 className="mt-3 font-bold">
              Planner
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Manage farming tasks
            </p>
          </Link>

          <Link
            href="/community"
            className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-green-600"
          >
            <div className="text-2xl">🌱</div>

            <h3 className="mt-3 font-bold">
              Community
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Share harvest updates
            </p>
          </Link>

          <Link
            href="/marketplace"
            className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-green-600"
          >
            <div className="text-2xl">🛒</div>

            <h3 className="mt-3 font-bold">
              Marketplace
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Buy farming products
            </p>
          </Link>

          <Link
            href="/learn"
            className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-green-600"
          >
            <div className="text-2xl">🎓</div>

            <h3 className="mt-3 font-bold">
              Learning
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Learn farming skills
            </p>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <AnalyticsCard
            title="Total Tasks"
            value={String(data.total_tasks)}
            subtitle="Created"
          />

          <AnalyticsCard
            title="Completed"
            value={String(data.completed_tasks)}
            subtitle="Finished"
          />

          <AnalyticsCard
            title="Pending"
            value={String(data.pending_tasks)}
            subtitle="Remaining"
          />

          <AnalyticsCard
            title="Streak"
            value={`${data.streak_days} Days`}
            subtitle="Keep Growing"
          />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-xl font-bold">
                Account Progress
              </h3>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <AnalyticsCard
                  title="XP Points"
                  value={String(data.xp_points)}
                  subtitle="Experience"
                />

                <AnalyticsCard
                  title="Level"
                  value={String(data.level)}
                  subtitle="Current Level"
                />
              </div>
            </div>
          </div>

          <ProgressRing
            progress={Math.round(data.completion_rate)}
          />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <ActivityTimeline />
          <NotificationCenter />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <BadgeGrid />
          <WaterUsageCard />
        </div>
      </main>

      <MobileBottomNav />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}