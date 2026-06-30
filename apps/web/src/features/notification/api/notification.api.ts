import { api } from "@/lib/axios/client"

import { Notification } from "../types/notification.types"

export const notificationApi = {
    async getNotifications() {
        const response =
            await api.get<Notification[]>(
                "/notifications",
            )

        return response.data
    },

    async markAsRead(
        notificationId: number,
    ) {
        const response =
            await api.patch<Notification>(
                `/notifications/${notificationId}/read`,
            )

        return response.data
    },
}