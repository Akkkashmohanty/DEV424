import AnalyticsCard from "@/components/dashboard/widgets/analytics-card"

export default function CreatorAnalytics() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <AnalyticsCard
        title="Views"
        value="250K"
        subtitle="+18%"
      />

      <AnalyticsCard
        title="Subscribers"
        value="18K"
        subtitle="+7%"
      />

      <AnalyticsCard
        title="Revenue"
        value="₹45,000"
        subtitle="+21%"
      />

      <AnalyticsCard
        title="Watch Hours"
        value="8.4K"
        subtitle="+14%"
      />
    </div>
  )
}