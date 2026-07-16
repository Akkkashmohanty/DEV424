"use client"

import {
  Droplets,
  Wind,
  ShieldAlert,
  ThermometerSun,
  SunDim,
} from "lucide-react"

import { useWeather } from "@/features/planner/hooks/use-planner"

export default function WeatherWidget() {
  const {
    data,
    isLoading,
    isError,
  } = useWeather("Bengaluru")

  if (isLoading) {
    return (
      <div className="rounded-3xl border bg-card p-6">
        <p className="text-muted-foreground">
          Loading weather...
        </p>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="rounded-3xl border bg-card p-6">
        <p className="text-red-500">
          Unable to load weather.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">

      {/* Header */}

      <div>

        <div className="flex items-center justify-between mb-4">

          <h3 className="text-xl font-bold tracking-tight">
            Weather Forecast
          </h3>

          <span className="text-xs font-semibold text-muted-foreground">
            {data.city}
          </span>

        </div>

        {/* Temperature */}

        <div className="mt-4 flex items-center justify-between border-b border-border pb-6">

          <div className="flex items-center gap-3">

            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">

              <SunDim className="h-8 w-8" />

            </span>

            <div>

              <span className="text-4xl font-extrabold text-foreground">
                {Math.round(data.temperature)}°C
              </span>

              <p className="mt-0.5 text-xs font-medium text-muted-foreground">
                {data.weather} • RealFeel {Math.round(data.feels_like)}°C
              </p>

            </div>

          </div>

        </div>

        {/* Metrics */}

        <div className="grid grid-cols-3 gap-4 border-b border-border py-6 text-center">

          <div>

            <span className="block text-[10px] font-medium text-muted-foreground">
              HUMIDITY
            </span>

            <span className="mt-1 flex items-center justify-center gap-1 text-sm font-bold">

              <Droplets className="h-3.5 w-3.5 text-blue-500" />

              {data.humidity}%

            </span>

          </div>

          <div className="border-x border-border">

            <span className="block text-[10px] font-medium text-muted-foreground">
              WIND
            </span>

            <span className="mt-1 flex items-center justify-center gap-1 text-sm font-bold">

              <Wind className="h-3.5 w-3.5 text-gray-500" />

              {data.wind_speed} m/s

            </span>

          </div>

          <div>

            <span className="block text-[10px] font-medium text-muted-foreground">
              PRESSURE
            </span>

            <span className="mt-1 flex items-center justify-center gap-1 text-sm font-bold">

              <ThermometerSun className="h-3.5 w-3.5 text-orange-500" />

              {data.pressure} hPa

            </span>

          </div>

        </div>

      </div>

      {/* Advisory */}

      <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/5 p-4">

        <div className="flex items-start gap-3">

          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-600">

            <ShieldAlert className="h-4.5 w-4.5" />

          </span>

          <div>

            <h5 className="text-xs font-bold">
              Seasonal Recommendation
            </h5>

            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              Current season: <strong>{data.season}</strong>. Weather is{" "}
              <strong>{data.weather}</strong>. Monitor soil moisture and adjust
              watering based on rainfall and humidity.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}