"use client"

import { useState } from "react"
import { Bell, Sprout, ShieldAlert, Award, X, Droplet } from "lucide-react"

interface Notif {
  id: number
  title: string
  desc: string
  time: string
  type: "warning" | "success" | "info" | "alert"
  read: boolean
}

const initialNotifs: Notif[] = [
  {
    id: 1,
    title: "Watering schedule alert",
    desc: "Your North Balcony Spinach needs watering in 30 minutes to stay at optimal moisture.",
    time: "10m ago",
    type: "alert",
    read: false,
  },
  {
    id: 2,
    title: "Surplus Produce Collected!",
    desc: "NGO GreenLife successfully picked up your 2kg donated Mint surplus.",
    time: "2h ago",
    type: "success",
    read: false,
  },
  {
    id: 3,
    title: "High UV Warning Tomorrow",
    desc: "Expect direct sunlight and UV rating 8. Implement partial canopy shading by 11:00 AM.",
    time: "4h ago",
    type: "warning",
    read: true,
  },
  {
    id: 4,
    title: "Community League Active",
    desc: "Weekly Balcony Streaks challenge is live. Plant 2 new beds to enter.",
    time: "1d ago",
    type: "info",
    read: true,
  },
]

export default function NotificationCenter() {
  const [notifs, setNotifs] = useState<Notif[]>(initialNotifs)

  const markAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })))
  }

  const deleteNotif = (id: number) => {
    setNotifs(notifs.filter((n) => n.id !== id))
  }

  const unreadCount = notifs.filter((n) => !n.read).length

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold tracking-tight">System Alerts</h3>
          {unreadCount > 0 && (
            <span className="flex h-5 px-1.5 items-center justify-center rounded-full bg-green-500 text-white font-extrabold text-[10px] animate-pulse">
              {unreadCount} New
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs font-semibold text-green-600 hover:text-green-700 transition"
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="space-y-4">
        {notifs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground flex flex-col items-center gap-2">
            <Bell className="h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm">All caught up! No recent alerts.</p>
          </div>
        ) : (
          notifs.map((n) => {
            let Icon = Bell
            let color = "text-gray-600 bg-gray-500/10 border-gray-200"

            if (n.type === "alert") {
              Icon = Droplet
              color = "text-blue-600 bg-blue-500/10 border-blue-200/50"
            } else if (n.type === "success") {
              Icon = Sprout
              color = "text-green-600 bg-green-500/10 border-green-200/50"
            } else if (n.type === "warning") {
              Icon = ShieldAlert
              color = "text-red-600 bg-red-500/10 border-red-200/50"
            } else if (n.type === "info") {
              Icon = Award
              color = "text-yellow-600 bg-yellow-500/10 border-yellow-200/50"
            }

            return (
              <div
                key={n.id}
                className={`relative flex gap-3 p-3.5 border rounded-2xl transition-all ${
                  n.read ? "bg-muted/10 border-border/40 opacity-75" : "bg-card border-border shadow-sm"
                }`}
              >
                {/* Visual Icon */}
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${color}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>

                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm leading-none">{n.title}</h4>
                    {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-snug">{n.desc}</p>
                  <span className="text-[10px] text-muted-foreground/80 mt-2 block">{n.time}</span>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => deleteNotif(n.id)}
                  className="absolute right-3 top-3 text-muted-foreground/60 hover:text-foreground hover:bg-muted p-1 rounded-lg transition"
                  aria-label="Delete alert"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
