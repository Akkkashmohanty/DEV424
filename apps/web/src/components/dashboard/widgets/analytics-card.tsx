interface AnalyticsCardProps {
  title: string
  value: string
  subtitle: string
}

export default function AnalyticsCard({
  title,
  value,
  subtitle,
}: AnalyticsCardProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <p className="text-sm font-medium text-muted-foreground">
        {title}
      </p>

      <h3 className="mt-3 text-4xl font-black text-foreground">
        {value}
      </h3>

      <p className="mt-2 text-sm font-semibold text-green-600">
        {subtitle}
      </p>
    </div>
  )
}