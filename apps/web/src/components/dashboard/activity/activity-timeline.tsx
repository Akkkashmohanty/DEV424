"use client"

import {
  Calendar,
  PlusCircle,
  CheckCircle2,
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
        <PlusCircle className="h-5 w-5 text-blue-600" />
      )

    case "TASK_COMPLETED":
      return (
        <CheckCircle2 className="h-5 w-5 text-green-600" />
      )

    case "TASK_DELETED":
      return (
        <Trash2 className="h-5 w-5 text-red-600" />
      )

    default:
      return (
        <Calendar className="h-5 w-5" />
      )
  }
}

export default function ActivityTimeline() {
  const {
    data: activities = [],
    isLoading,
  } = useActivities()

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold">
          Recent Activity
        </h3>

        <span className="text-xs text-muted-foreground">
          Live Activity Feed
        </span>
      </div>

      {isLoading && (
        <p className="text-sm text-muted-foreground">
          Loading activities...
        </p>
      )}

      {!isLoading &&
        activities.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No activity yet.
          </p>
        )}

      <div className="space-y-4">
        {activities.map(
          (activity: Activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 rounded-xl border p-3"
            >
              <ActivityIcon
                action={activity.action}
              />

              <div className="flex-1">
                <p className="font-medium">
                  {activity.description}
                </p>

                <p className="text-xs text-muted-foreground">
                  {new Date(
                    activity.created_at,
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  )
}