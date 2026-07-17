"use client"

import { useQuery } from "@tanstack/react-query"

import { analyticsApi } from "../api/analytics.api"

export function useMarketplaceSummary() {
    return useQuery({
        queryKey: ["marketplace-summary"],
        queryFn: analyticsApi.getSummary,
    })
}

export function useTopProducts() {
    return useQuery({
        queryKey: ["marketplace-top-products"],
        queryFn: analyticsApi.getTopProducts,
    })
}

export function useOrderStatus() {
    return useQuery({
        queryKey: ["marketplace-order-status"],
        queryFn: analyticsApi.getOrderStatus,
    })
}