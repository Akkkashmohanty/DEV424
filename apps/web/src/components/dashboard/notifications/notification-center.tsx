"use client"

import {
  Award,
  Bell,
  ShieldAlert,
  Sprout,
} from "lucide-react"

import {
  useNotifications,
  useMarkNotificationRead,
} from "@/features/notification/hooks/use-notifications"

export default function NotificationCenter() {
  const {
    data: notifications = [],
    isLoading,
  } = useNotifications()

  const markReadMutation =
    useMarkNotificationRead()

  const unreadCount =
    notifications.filter(
      (notification) => !notification.is_read,
    ).length

  const markAllRead = async () => {
    for (const notification of notifications) {
      if (!notification.is_read) {
        await markReadMutation.mutateAsync(
          notification.id,
        )
      }
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        Loading notifications...
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold tracking-tight">
            Notifications
          </h3>

          {unreadCount > 0 && (
            <span className="flex h-5 items-center justify-center rounded-full bg-green-500 px-2 text-[10px] font-extrabold text-white animate-pulse">
              {unreadCount} New
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs font-semibold text-green-600 transition hover:text-green-700"
          >
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center text-muted-foreground">
          <Bell className="h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm">
            No notifications yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map(
            (notification) => {
              let Icon = Bell

              let color =
                "text-green-600 bg-green-500/10 border-green-200/50"

              if (
                notification.title.includes(
                  "Completed",
                )
              ) {
                Icon = Award

                color =
                  "text-yellow-600 bg-yellow-500/10 border-yellow-200/50"
              }

              if (
                notification.title.includes(
                  "Deleted",
                )
              ) {
                Icon = ShieldAlert

                color =
                  "text-red-600 bg-red-500/10 border-red-200/50"
              }

              if (
                notification.title.includes(
                  "Created",
                )
              ) {
                Icon = Sprout

                color =
                  "text-green-600 bg-green-500/10 border-green-200/50"
              }

              return (
                <div
                  key={notification.id}
                  className={`flex gap-3 rounded-2xl border p-3 transition-all ${notification.is_read
                    ? "border-border/40 bg-muted/10 opacity-70"
                    : "border-border bg-card shadow-sm"
                    }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${color}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold">
                        {notification.title}
                      </h4>

                      {!notification.is_read && (
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      )}
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {notification.message}
                    </p>

                    <p className="mt-2 text-[10px] text-muted-foreground">
                      {new Date(
                        notification.created_at,
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              )
            },
          )}
        </div>
      )}
    </div>
  )
}