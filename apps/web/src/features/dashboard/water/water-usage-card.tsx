export default function WaterUsageCard() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-semibold">
        Water Usage
      </h3>

      <div className="mt-6">
        <h4 className="text-5xl font-bold">
          120L
        </h4>

        <p className="mt-2 text-muted-foreground">
          Weekly water consumption
        </p>
      </div>
    </div>
  )
}