import { api } from "@/lib/axios/client"

export interface MarketplaceSummary {
    total_products: number
    active_products: number
    low_stock_products: number
    total_orders: number
    completed_orders: number
    pending_orders: number
    cancelled_orders: number
    total_revenue: number
}

export interface TopProduct {
    product_id: number
    product_name: string
    sold_quantity: number
}

export interface OrderStatusSummary {
    pending: number
    completed: number
    cancelled: number
}

export const analyticsApi = {
    async getSummary() {
        const { data } =
            await api.get<MarketplaceSummary>(
                "/marketplace/analytics/summary",
            )

        return data
    },

    async getTopProducts() {
        const { data } =
            await api.get<TopProduct[]>(
                "/marketplace/analytics/top-products",
            )

        return data
    },

    async getOrderStatus() {
        const { data } =
            await api.get<OrderStatusSummary>(
                "/marketplace/analytics/order-status",
            )

        return data
    },
}