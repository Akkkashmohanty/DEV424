import AnalyticsCard from "@/components/dashboard/widgets/analytics-card"

export default function SellerDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <AnalyticsCard
        title="Revenue"
        value="₹85K"
        subtitle="+12%"
      />

      <AnalyticsCard
        title="Orders"
        value="420"
        subtitle="+8%"
      />

      <AnalyticsCard
        title="Products"
        value="34"
        subtitle="+5%"
      />

      <AnalyticsCard
        title="Customers"
        value="1.2K"
        subtitle="+17%"
      />
    </div>
  )
}