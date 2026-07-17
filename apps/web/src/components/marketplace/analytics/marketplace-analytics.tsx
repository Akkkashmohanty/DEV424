"use client"

import {
    Package,
    ShoppingCart,
    IndianRupee,
    AlertTriangle,
} from "lucide-react"

import {
    useMarketplaceSummary,
} from "@/features/marketplace/hooks/use-marketplace-analytics"

export default function MarketplaceAnalytics() {
    const {
        data,
        isLoading,
        isError,
    } = useMarketplaceSummary()

    if (isLoading) {
        return (
            <div className="rounded-3xl border bg-card p-6">
                Loading marketplace analytics...
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="rounded-3xl border bg-card p-6 text-red-600">
                Failed to load marketplace analytics.
            </div>
        )
    }

    const cards = [
        {
            title: "Products",
            value: data.total_products,
            icon: Package,
        },
        {
            title: "Orders",
            value: data.total_orders,
            icon: ShoppingCart,
        },
        {
            title: "Revenue",
            value: `₹${Number(data.total_revenue).toLocaleString()}`,
            icon: IndianRupee,
        },
        {
            title: "Low Stock",
            value: data.low_stock_products,
            icon: AlertTriangle,
        },
    ]

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icon

                return (
                    <div
                        key={card.title}
                        className="rounded-3xl border bg-card p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm text-muted-foreground">
                                {card.title}
                            </h4>

                            <Icon className="h-5 w-5 text-green-600" />
                        </div>

                        <p className="mt-6 text-3xl font-bold">
                            {card.value}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}