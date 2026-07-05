"use client"

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts"

import {
    CropAnalytics,
} from "../types/analytics.types"

interface Props {
    data: CropAnalytics[]
}

const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6",
]

export default function CropChart({
    data,
}: Props) {
    if (data.length === 0) {
        return (
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-bold">
                    Crop Distribution
                </h2>

                <p className="text-muted-foreground">
                    No crop data available.
                </p>
            </div>
        )
    }

    return (
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold">
                Crop Distribution
            </h2>

            <div className="h-80">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="count"
                            nameKey="crop_name"
                            outerRadius={100}
                            label
                        >
                            {data.map(
                                (_, index) => (
                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[
                                            index %
                                            COLORS.length
                                            ]
                                        }
                                    />
                                ),
                            )}
                        </Pie>

                        <Tooltip />

                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}