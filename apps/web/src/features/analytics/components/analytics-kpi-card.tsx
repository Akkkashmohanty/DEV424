"use client"

import { ReactNode } from "react"

interface AnalyticsKpiCardProps {
    title: string
    value: string | number
    subtitle?: string
    icon: ReactNode
}

export default function AnalyticsKpiCard({
    title,
    value,
    subtitle,
    icon,
}: AnalyticsKpiCardProps) {
    return (
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <h2 className="mt-2 text-3xl font-black">
                        {value}
                    </h2>

                    {subtitle && (
                        <p className="mt-2 text-sm text-muted-foreground">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="rounded-2xl bg-emerald-500/10 p-4 text-emerald-500">
                    {icon}
                </div>
            </div>
        </div>
    )
}