export default function WeatherWidget() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-semibold">
        Weather
      </h3>

      <div className="mt-6">
        <h4 className="text-5xl font-bold">
          28°C
        </h4>

        <p className="mt-2 text-muted-foreground">
          Sunny • Bengaluru
        </p>
      </div>
    </div>
  )
}