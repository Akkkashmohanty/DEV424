import CreatorAnalytics from "@/components/learning/analytics/creator-analytics"
import CreatorProfile from "@/components/learning/creator/creator-profile"

export default function CreatorDashboardPage() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <CreatorProfile />

        <div className="mt-8">
          <CreatorAnalytics />
        </div>
      </div>
    </main>
  )
}