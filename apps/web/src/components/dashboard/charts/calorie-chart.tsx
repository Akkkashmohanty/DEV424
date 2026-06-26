"use client"

const data = [120, 180, 220, 160, 260, 300, 240]

export default function CalorieChart() {
  const max = Math.max(...data)

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <h3 className="text-2xl font-bold text-foreground">
        Weekly Calories Burned
      </h3>

      <p className="mt-1 text-sm text-muted-foreground">
        Last 7 days activity
      </p>

      <div className="mt-10 flex h-72 items-end justify-between gap-4">
        {data.map((value, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
          >
            <div
              className="flex items-end"
              style={{
                height: "240px",
              }}
            >
              <div
                className="w-12 rounded-t-xl bg-green-600 transition-all hover:bg-green-500"
                style={{
                  height: `${(value / max) * 220}px`,
                }}
              />
            </div>

            <span className="mt-3 text-xs font-medium text-muted-foreground">
              D{index + 1}
            </span>

            <span className="mt-1 text-[10px] text-green-600 font-semibold">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}