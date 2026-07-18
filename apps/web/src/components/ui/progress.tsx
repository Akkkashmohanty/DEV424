"use client"

import * as React from "react"

interface ProgressProps {
    value?: number
    className?: string
}

export function Progress({
    value = 0,
    className = "",
}: ProgressProps) {
    const progress = Math.max(0, Math.min(100, value))

    return (
        <div
            className={`relative h-2 w-full overflow-hidden rounded-full bg-muted ${className}`}
        >
            <div
                className="h-full bg-green-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}