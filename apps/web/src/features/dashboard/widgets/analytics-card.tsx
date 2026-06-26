interface Props {
  title: string
  value: string
  subtitle: string
}

export default function AnalyticsCard({
  title,
  value,
  subtitle,
}: Props) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="mt-4 text-4xl font-bold text-gray-900">
        {value}
      </h3>

      <p className="mt-2 text-sm font-medium text-green-600">
        {subtitle}
      </p>
    </div>
  )
}