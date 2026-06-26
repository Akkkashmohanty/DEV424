const timeline = [
  {
    crop: "Tomatoes",
    time: "45 Days",
  },
  {
    crop: "Spinach",
    time: "30 Days",
  },
]

export default function HarvestTimeline() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-semibold">
        Harvest Predictions
      </h3>

      <div className="mt-6 space-y-6">
        {timeline.map((item) => (
          <div
            key={item.crop}
            className="flex items-center justify-between border-b pb-4"
          >
            <span>{item.crop}</span>

            <span className="font-medium text-green-600">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}