"use client"

import { useQuery } from "@tanstack/react-query"

import { activityApi } from "../api/activity.api"

export function useActivities() {
    return useQuery({
        queryKey: ["activities"],

        queryFn:
            activityApi.getActivities,
    })
}


