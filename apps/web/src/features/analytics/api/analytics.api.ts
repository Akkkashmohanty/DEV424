import { api } from "@/lib/axios/client"

import {
    AnalyticsOverview,
    PriorityAnalytics,
    CropAnalytics,
} from "../types/analytics.types"

export const analyticsApi = {
    async getOverview() {
        const response =
            await api.get<AnalyticsOverview>(
                "/analytics/overview",
            )

        return response.data
    },

    async getPriorityDistribution() {
        const response =
            await api.get<PriorityAnalytics[]>(
                "/analytics/priority",
            )

        return response.data
    },

    async getCropDistribution() {
        const response =
            await api.get<CropAnalytics[]>(
                "/analytics/crops",
            )

        return response.data
    },
}