"use client"

export default function PickupScheduler() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h2 className="text-3xl font-bold">
        Schedule Pickup
      </h2>

      <div className="mt-6 space-y-5">
        <input
          type="date"
          className="h-12 w-full rounded-2xl border px-4"
        />

        <input
          type="time"
          className="h-12 w-full rounded-2xl border px-4"
        />

        <button className="w-full rounded-2xl bg-green-600 py-4 text-white">
          Schedule Pickup
        </button>
      </div>
    </div>
  )
}