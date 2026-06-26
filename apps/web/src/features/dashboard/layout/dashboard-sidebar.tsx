"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  Activity,
  BarChart3,
  Bell,
} from "lucide-react"

const items = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Activities",
    href: "/activities",
    icon: Activity,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
]

export default function DashboardSidebar() {
  return (
    <aside className="hidden h-screen w-72 border-r bg-card lg:block">
      <div className="p-6">
        <h2 className="text-3xl font-bold text-green-600">
          FarmGym
        </h2>

        <div className="mt-10 space-y-3">
          {items.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-muted"
              >
                <Icon className="h-5 w-5" />

                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </aside>
  )
}