"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

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
    href: "/dashboard/activities",
    icon: Activity,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    label: "Alerts",
    href: "/dashboard/notifications",
    icon: Bell,
  },
]

export default function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#020817]/95 backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`
                flex flex-col items-center gap-1 py-3 text-xs
                ${active
                  ? "text-emerald-400"
                  : "text-gray-500"
                }
              `}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}