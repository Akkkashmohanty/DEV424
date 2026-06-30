"use client"

import { useQuery } from "@tanstack/react-query"

import { analyticsApi } from "../api/analytics.api"

export function useAnalyticsOverview() {
    return useQuery({
        queryKey: ["analytics-overview"],
        queryFn: analyticsApi.getOverview,
    })
}

export function usePriorityAnalytics() {
    return useQuery({
        queryKey: ["priority-analytics"],
        queryFn:
            analyticsApi.getPriorityDistribution,
    })
}

export function useCropAnalytics() {
    return useQuery({
        queryKey: ["crop-analytics"],
        queryFn:
            analyticsApi.getCropDistribution,
    })
}


