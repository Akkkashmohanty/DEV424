"use client"

import {
    Calendar,
    CheckCircle2,
    PlusCircle,
    Trash2,
} from "lucide-react"

import { useActivities } from "@/features/activity/hooks/use-activities"
import { Activity } from "@/features/activity/types/activity.types"

function ActivityIcon({
    action,
}: {
    action: string
}) {
    switch (action) {
        case "TASK_CREATED":
            return (
                <PlusCircle className="h-6 w-6 text-blue-600" />
            )

        case "TASK_COMPLETED":
            return (
                <CheckCircle2 className="h-6 w-6 text-green-600" />
            )

        case "TASK_DELETED":
            return (
                <Trash2 className="h-6 w-6 text-red-600" />
            )

        default:
            return (
                <Calendar className="h-6 w-6 text-gray-500" />
            )
    }
}

export default function ActivitiesPage() {
    const {
        data: activities = [],
        isLoading,
        error,
    } = useActivities()

    if (isLoading) {
        return (
            <main className="min-h-screen bg-muted/30 p-8">
                <div className="mx-auto max-w-6xl">
                    <h1 className="text-4xl font-black">
                        Activities
                    </h1>

                    <p className="mt-6 text-muted-foreground">
                        Loading activity history...
                    </p>
                </div>
            </main>
        )
    }

    if (error) {
        return (
            <main className="min-h-screen bg-muted/30 p-8">
                <div className="mx-auto max-w-6xl">
                    <h1 className="text-4xl font-black">
                        Activities
                    </h1>

                    <p className="mt-6 text-red-600">
                        Failed to load activities.
                    </p>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-muted/30 p-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-black">
                        Activity History
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        Every farming action is recorded here.
                    </p>
                </div>

                {activities.length === 0 ? (
                    <div className="rounded-3xl border bg-card p-12 text-center shadow-sm">
                        <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

                        <h2 className="text-xl font-bold">
                            No activity yet
                        </h2>

                        <p className="mt-2 text-muted-foreground">
                            Start using FarmGym and your history will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {activities.map((activity: Activity) => (
                            <div
                                key={activity.id}
                                className="flex items-start gap-4 rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md"
                            >
                                <div className="rounded-xl bg-muted p-3">
                                    <ActivityIcon action={activity.action} />
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-semibold">
                                        {activity.description}
                                    </h3>

                                    <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                                        {activity.action.replaceAll("_", " ")}
                                    </p>

                                    <p className="mt-2 text-sm text-muted-foreground">
                                        {new Date(activity.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}