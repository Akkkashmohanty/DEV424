"use client"

export default function AnalyticsLoading() {
    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
                <div
                    key={item}
                    className="h-36 animate-pulse rounded-3xl bg-muted"
                />
            ))}
        </div>
    )
}