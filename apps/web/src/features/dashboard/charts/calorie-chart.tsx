"use client"

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts"

const data = [
  {
    day: "Mon",
    calories: 120,
  },
  {
    day: "Tue",
    calories: 200,
  },
  {
    day: "Wed",
    calories: 310,
  },
  {
    day: "Thu",
    calories: 260,
  },
]

export default function CalorieChart() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-xl font-semibold">
        Weekly Calories
      </h3>

      <div className="mt-6 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="calories"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}