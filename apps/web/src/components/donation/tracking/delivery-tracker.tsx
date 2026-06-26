const tracking = [
  "Pickup Scheduled",
  "Driver Assigned",
  "On The Way",
  "Delivered",
]

export default function DeliveryTracker() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h2 className="text-3xl font-bold">
        Delivery Tracking
      </h2>

      <div className="mt-8 space-y-6">
        {tracking.map((step, index) => (
          <div
            key={step}
            className="flex items-center gap-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">
              {index + 1}
            </div>

            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}