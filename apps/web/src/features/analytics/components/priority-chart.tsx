"use client"

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts"

import {
    PriorityAnalytics,
} from "../types/analytics.types"

interface Props {
    data: PriorityAnalytics[]
}

export default function PriorityChart({
    data,
}: Props) {
    if (data.length === 0) {
        return (
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-bold">
                    Priority Distribution
                </h2>

                <p className="text-muted-foreground">
                    No priority data available.
                </p>
            </div>
        )
    }

    return (
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold">
                Priority Distribution
            </h2>

            <div className="h-80">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart data={data}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis dataKey="priority" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="count"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}