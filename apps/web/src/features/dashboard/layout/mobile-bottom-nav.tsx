"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  Activity,
  Bell,
  BarChart3,
} from "lucide-react"

const items = [
  {
    label: "Home",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Activity",
    href: "/activities",
    icon: Activity,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Alerts",
    href: "/notifications",
    icon: Bell,
  },
]

export default function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background lg:hidden">
      <div className="grid grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-1 py-3 text-xs"
            >
              <Icon className="h-5 w-5" />

              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}