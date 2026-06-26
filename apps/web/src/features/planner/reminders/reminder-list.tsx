import { reminders } from "@/features/planner/mock/planner.mock"

export default function ReminderList() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-semibold">
        Smart Reminders
      </h3>

      <div className="mt-6 space-y-4">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="rounded-2xl bg-muted p-4"
          >
            <h4 className="font-medium">
              {reminder.title}
            </h4>

            <p className="mt-2 text-sm text-muted-foreground">
              {reminder.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}