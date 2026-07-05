import { api } from "@/lib/axios/client"

import { Achievement } from "../types/achievement.types"

export const achievementApi = {
    async getAchievements() {
        const response =
            await api.get<Achievement[]>(
                "/achievements",
            )

        return response.data
    },
}