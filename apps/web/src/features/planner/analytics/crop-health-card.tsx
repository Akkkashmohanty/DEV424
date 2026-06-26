import { healthStatuses } from "@/features/planner/mock/planner.mock"

export default function CropHealthCard() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-semibold">
        Crop Health Tracking
      </h3>

      <div className="mt-6 space-y-5">
        {healthStatuses.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between"
          >
            <span>{item.crop}</span>

            <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-600">
              {item.health}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}