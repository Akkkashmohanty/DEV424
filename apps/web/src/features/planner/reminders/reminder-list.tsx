"use client"

import { useTasks } from "../hooks/use-planner"

export default function ReminderList() {
  const {
    data: tasks,
    isLoading,
  } = useTasks()

  if (isLoading) {
    return (
      <div className="rounded-3xl border bg-card p-6">
        <h3 className="text-2xl font-semibold">
          Smart Reminders
        </h3>

        <p className="mt-6 text-muted-foreground">
          Loading reminders...
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-semibold">
        Smart Reminders
      </h3>

      <div className="mt-6 space-y-4">
        {!tasks || tasks.length === 0 ? (
          <p className="text-muted-foreground">
            No reminders available.
          </p>
        ) : (
          tasks.map((task: any) => (
            <div
              key={task.id}
              className="rounded-2xl bg-muted p-4"
            >
              <h4 className="font-medium">
                {task.title}
              </h4>

              <p className="mt-2 text-sm text-muted-foreground">
                {task.crop_name}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Priority: {task.priority}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}