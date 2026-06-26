"use client"

import { CheckCircle2, Circle, Calendar } from "lucide-react"

import { useTasks } from "@/features/planner/hooks/use-planner"
import { Task } from "@/features/planner/types/planner.types"

export default function ActivityTimeline() {
  const {
    data: tasks,
    isLoading,
  } = useTasks()

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-tight">
          Recent Tasks
        </h3>

        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          Live From Planner
        </span>
      </div>

      {isLoading && (
        <p className="text-sm text-muted-foreground">
          Loading tasks...
        </p>
      )}

      <div className="space-y-4">
        {tasks?.slice(0, 5).map((task: Task) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-xl border p-3"
          >
            <div className="flex items-center gap-3">
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5" />
              )}

              <div>
                <p className="font-medium">
                  {task.title}
                </p>

                <p className="text-xs text-muted-foreground">
                  {task.crop_name}
                </p>
              </div>
            </div>

            <span className="text-xs text-muted-foreground">
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}