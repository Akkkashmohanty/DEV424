const notifications = [
  "Water your tomatoes today",
  "You completed 5 day streak",
  "New seasonal recommendation available",
]

export default function NotificationCenter() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-semibold">
        Notifications
      </h3>

      <div className="mt-6 space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification}
            className="rounded-2xl bg-muted p-4"
          >
            {notification}
          </div>
        ))}
      </div>
    </div>
  )
}