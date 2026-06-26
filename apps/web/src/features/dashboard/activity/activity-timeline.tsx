import { activities } from "@/features/dashboard/mock/dashboard.mock"

export default function ActivityTimeline() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-semibold">
        Recent Activities
      </h3>

      <div className="mt-8 space-y-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div>
              <p className="font-medium capitalize">
                {activity.type}
              </p>

              <p className="text-sm text-muted-foreground">
                {activity.duration} mins
              </p>
            </div>

            <div className="text-green-600">
              {activity.calories} kcal
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}