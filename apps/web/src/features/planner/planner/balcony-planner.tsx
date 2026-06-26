export default function BalconyPlanner() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-semibold">
        Balcony Planner
      </h3>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="aspect-square rounded-xl border bg-green-100"
          />
        ))}
      </div>
    </div>
  )
}