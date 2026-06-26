"use client"

import Calendar from "react-calendar"

import "react-calendar/dist/Calendar.css"

import { usePlannerStore } from "@/features/planner/store/planner.store"

export default function PlantingCalendar() {
  const {
    selectedDate,
    setSelectedDate,
  } = usePlannerStore()

  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-semibold">
        Planting Calendar
      </h3>

      <div className="mt-6">
        <Calendar
          value={selectedDate}
          onChange={(date) =>
            setSelectedDate(date as Date)
          }
        />
      </div>
    </div>
  )
}