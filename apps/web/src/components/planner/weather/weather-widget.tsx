"use client"

import {
  Droplets,
  Wind,
  ShieldAlert,
  ThermometerSun,
  SunDim,
} from "lucide-react"

export default function WeatherWidget() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold tracking-tight">
            Weather Forecast
          </h3>

          <span className="text-xs font-semibold text-muted-foreground">
            Bengaluru, Karnataka
          </span>
        </div>

        {/* Current Temperature */}
        <div className="mt-4 flex items-center justify-between border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
              <SunDim className="h-8 w-8" />
            </span>

            <div>
              <span className="text-4xl font-extrabold text-foreground">
                32°C
              </span>

              <p className="mt-0.5 text-xs font-medium text-muted-foreground">
                Partly Sunny • RealFeel 34°C
              </p>
            </div>
          </div>
        </div>

        {/* Weather Metrics */}
        <div className="grid grid-cols-3 gap-4 border-b border-border py-6 text-center">
          <div>
            <span className="block text-[10px] font-medium text-muted-foreground">
              HUMIDITY
            </span>

            <span className="mt-1 flex items-center justify-center gap-1 text-sm font-bold text-foreground">
              <Droplets className="h-3.5 w-3.5 text-blue-500" />
              64%
            </span>
          </div>

          <div className="border-x border-border">
            <span className="block text-[10px] font-medium text-muted-foreground">
              WIND GUST
            </span>

            <span className="mt-1 flex items-center justify-center gap-1 text-sm font-bold text-foreground">
              <Wind className="h-3.5 w-3.5 text-gray-500" />
              12 km/h
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-medium text-muted-foreground">
              UV INDEX
            </span>

            <span className="mt-1 flex items-center justify-center gap-1 text-sm font-bold text-foreground">
              <ThermometerSun className="h-3.5 w-3.5 text-orange-500" />
              8 (Very High)
            </span>
          </div>
        </div>
      </div>

      {/* Warning Card */}
      <div className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/[0.03] p-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
            <ShieldAlert className="h-4.5 w-4.5" />
          </span>

          <div>
            <h5 className="text-xs font-bold text-orange-950 dark:text-orange-300">
              High Evaporation Warning
            </h5>

            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              With UV Index at 8, pot soil may dry out 40% faster than normal.
              Increase watering frequency and protect young seedlings from
              direct afternoon sunlight after 11:30 AM.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}