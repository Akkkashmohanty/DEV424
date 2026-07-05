"use client"

import {
    Award,
    CheckCircle2,
    Clock3,
    Flame,
    ListTodo,
} from "lucide-react"

import {
    useAnalyticsOverview,
    useCropAnalytics,
    usePriorityAnalytics,
} from "../hooks/use-analytics"

import AnalyticsKpiCard from "./analytics-kpi-card"
import AnalyticsLoading from "./analytics-loading"
import AnalyticsEmpty from "./analytics-empty"
import PriorityChart from "./priority-chart"
import CropChart from "./crop-chart"

export default function AnalyticsOverview() {
    const overview = useAnalyticsOverview()

    const priority = usePriorityAnalytics()

    const crops = useCropAnalytics()

    if (
        overview.isLoading ||
        priority.isLoading ||
        crops.isLoading
    ) {
        return <AnalyticsLoading />
    }

    if (!overview.data) {
        return <AnalyticsEmpty />
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-black">
                    Analytics
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Real-time insights from your FarmGym account.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <AnalyticsKpiCard
                    title="Total Tasks"
                    value={overview.data.total_tasks}
                    subtitle="All created tasks"
                    icon={<ListTodo className="h-7 w-7" />}
                />

                <AnalyticsKpiCard
                    title="Completed"
                    value={overview.data.completed_tasks}
                    subtitle={`${overview.data.completion_rate}% completed`}
                    icon={<CheckCircle2 className="h-7 w-7" />}
                />

                <AnalyticsKpiCard
                    title="XP"
                    value={overview.data.xp_points}
                    subtitle={`Level ${overview.data.level}`}
                    icon={<Award className="h-7 w-7" />}
                />

                <AnalyticsKpiCard
                    title="Current Streak"
                    value={overview.data.streak_days}
                    subtitle="Days"
                    icon={<Flame className="h-7 w-7" />}
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <PriorityChart
                    data={priority.data ?? []}
                />

                <CropChart
                    data={crops.data ?? []}
                />
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3">
                    <Clock3 className="h-6 w-6 text-emerald-500" />

                    <div>
                        <h2 className="text-xl font-bold">
                            Pending Tasks
                        </h2>

                        <p className="text-muted-foreground">
                            Tasks waiting to be completed
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-5xl font-black">
                    {overview.data.pending_tasks}
                </div>
            </div>
        </div>
    )
}