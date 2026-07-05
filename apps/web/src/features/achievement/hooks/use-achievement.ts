"use client"

import { useQuery } from "@tanstack/react-query"

import { achievementApi } from "../api/achievement.api"

export function useAchievements() {
    return useQuery({
        queryKey: ["achievements"],
        queryFn:
            achievementApi.getAchievements,
    })
}