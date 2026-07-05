"use client"

import { BarChart3 } from "lucide-react"

export default function AnalyticsEmpty() {
    return (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-24">
            <BarChart3 className="mb-4 h-12 w-12 text-muted-foreground" />

            <h2 className="text-2xl font-bold">
                No Analytics Available
            </h2>

            <p className="mt-3 text-muted-foreground">
                Create and complete a few farming tasks to generate analytics.
            </p>
        </div>
    )
}