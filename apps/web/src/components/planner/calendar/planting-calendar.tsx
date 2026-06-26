"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Sprout, Award, HelpCircle } from "lucide-react"

interface CalendarEvent {
  day: number
  title: string
  crop: string
  type: "sow" | "transplant" | "harvest"
  color: string
}

const events: CalendarEvent[] = [
  { day: 4, title: "Sow Baby Spinach seeds", crop: "Spinach", type: "sow", color: "bg-blue-500" },
  { day: 12, title: "Transplant Chili Seedlings", crop: "Chili", type: "transplant", color: "bg-purple-500" },
  { day: 18, title: "Harvest Cherry Tomatoes", crop: "Tomatoes", type: "harvest", color: "bg-green-600" },
  { day: 26, title: "Sow Mint stems in pot", crop: "Mint", type: "sow", color: "bg-blue-500" },
]

export default function PlantingCalendar() {
  const [currentMonth, setCurrentMonth] = useState("May 2026")
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1)
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // We start May 2026 on a Friday (5 empty slots before Day 1)
  const emptySlots = Array.from({ length: 5 }, (_, i) => i)

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 text-green-700">
            <Calendar className="h-4.5 w-4.5" />
          </span>
          <h3 className="text-xl font-bold tracking-tight">Planting Calendar</h3>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-1.5 border border-border hover:bg-muted rounded-lg transition">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs font-bold text-foreground min-w-[70px] text-center">{currentMonth}</span>
          <button className="p-1.5 border border-border hover:bg-muted rounded-lg transition">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-2 text-center text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-2">
        {weekdays.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty slots for spacing */}
        {emptySlots.map((val) => (
          <div key={`empty-${val}`} className="aspect-square bg-muted/5 border border-transparent rounded-xl" />
        ))}

        {/* Days */}
        {daysInMonth.map((day) => {
          const dayEvents = events.filter((e) => e.day === day)
          const isToday = day === 26

          return (
            <div
              key={day}
              className={`aspect-square flex flex-col justify-between p-1.5 border rounded-xl relative transition-all ${
                isToday
                  ? "border-green-600 bg-green-500/[0.03] ring-1 ring-green-600"
                  : "border-border/60 hover:border-green-600/35 bg-card hover:bg-muted/10 hover:shadow-sm"
              }`}
            >
              <span className={`text-[10px] font-bold ${isToday ? "text-green-700" : "text-muted-foreground"}`}>
                {day}
              </span>

              {/* Event indicators */}
              <div className="flex flex-wrap gap-0.5 justify-end mt-1">
                {dayEvents.map((evt, idx) => (
                  <span
                    key={idx}
                    title={`${evt.crop}: ${evt.title}`}
                    className={`h-1.5 w-1.5 rounded-full shrink-0 ${evt.color}`}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Event Details Legend */}
      <div className="mt-6 border-t border-border pt-6">
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Key Season Reminders</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {events.map((evt) => {
            let badgeColor = "bg-blue-500/10 text-blue-600"
            if (evt.type === "harvest") badgeColor = "bg-green-500/10 text-green-700"
            if (evt.type === "transplant") badgeColor = "bg-purple-500/10 text-purple-600"

            return (
              <div key={evt.day} className="flex items-center justify-between p-2.5 border border-border/50 rounded-xl text-xs bg-muted/10">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[10px] text-muted-foreground bg-muted h-5 w-5 flex items-center justify-center rounded-md">
                    {evt.day}
                  </span>
                  <span className="font-semibold text-foreground">{evt.title}</span>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${badgeColor}`}>
                  {evt.type}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}