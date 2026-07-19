import { LucideIcon, TrendingUp } from "lucide-react"

interface AnalyticsCardProps {
  title: string
  value: string
  subtitle: string
  icon?: LucideIcon
  trend?: string
}

export default function AnalyticsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
}: AnalyticsCardProps) {
  return (
    <div className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <h3 className="mt-3 text-4xl font-black text-foreground">
            {value}
          </h3>
        </div>

        {Icon && (
          <div className="rounded-2xl bg-emerald-100 p-3 dark:bg-emerald-500/15">
            <Icon className="h-6 w-6 text-emerald-600" />
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm font-semibold text-emerald-600">
          {subtitle}
        </p>

        {trend && (
          <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </div>
        )}
      </div>
    </div>
  )
}