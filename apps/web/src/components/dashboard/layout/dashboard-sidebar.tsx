"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

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
    href: "/dashboard/activities",
    icon: Activity,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    label: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden h-screen w-72 border-r border-white/10 bg-[#020817]/95 backdrop-blur-xl lg:block">
      <div className="flex h-full flex-col p-8">
        <div>
          <h2 className="text-3xl font-black text-white">
            Farm<span className="text-emerald-400">Gym</span>
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Urban Farming Dashboard
          </p>
        </div>

        <nav className="mt-12 space-y-3">
          {items.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  flex items-center gap-3 rounded-2xl px-4 py-3
                  transition-all duration-200
                  ${active
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm text-gray-400">
            Calories Burned
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            2,540
          </h3>

          <p className="mt-1 text-sm text-emerald-400">
            +18% this month
          </p>
        </div>
      </div>
    </aside>
  )
}