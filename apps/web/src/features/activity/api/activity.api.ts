import { api } from "@/lib/axios/client"

import { Activity } from "../types/activity.types"

export const activityApi = {
    async getActivities() {
        const response =
            await api.get<Activity[]>(
                "/activities",
            )

        return response.data
    },
}