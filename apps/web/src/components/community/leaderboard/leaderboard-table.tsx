import { leaderboard } from "@/features/community/mock/community.mock"

export default function LeaderboardTable() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h2 className="text-3xl font-bold">
        Leaderboard
      </h2>

      <div className="mt-8 space-y-5">
        {leaderboard.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between rounded-2xl bg-muted p-4"
          >
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold">
                #{index + 1}
              </span>

              <span>{user.name}</span>
            </div>

            <span className="font-semibold text-green-600">
              {user.points} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}