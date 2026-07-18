"use client"

import { Droplets } from "lucide-react"

import { useWaterSchedule } from "../hooks/use-planner"

export default function WateringSchedule() {
  const {
    data = [],
    isLoading,
    isError,
  } = useWaterSchedule()

  return (
    <div className="rounded-3xl border bg-card p-6">
      <div className="flex items-center gap-2">
        <Droplets className="h-5 w-5 text-blue-500" />

        <h3 className="text-2xl font-semibold">
          Water Schedule
        </h3>
      </div>

      {isLoading && (
        <p className="mt-6 text-muted-foreground">
          Loading...
        </p>
      )}

      {isError && (
        <p className="mt-6 text-red-500">
          Failed to load watering schedule.
        </p>
      )}

      {!isLoading &&
        !isError &&
        data.length === 0 && (
          <p className="mt-6 text-muted-foreground">
            No watering schedule available.
          </p>
        )}

      <div className="mt-6 space-y-4">
        {data.map((item) => (
          <div
            key={`${item.crop_name}-${item.next_watering}`}
            className="flex items-center justify-between border-b pb-3"
          >
            <div>
              <p className="font-medium">
                {item.crop_name}
              </p>

              <p className="text-sm text-muted-foreground">
                {item.watering_frequency}
              </p>
            </div>

            <div className="text-right">
              <p className="text-blue-600 font-medium">
                {item.next_watering}
              </p>

              <p className="text-xs uppercase text-muted-foreground">
                {item.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
