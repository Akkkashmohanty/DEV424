"use client"

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query"

import { notificationApi } from "../api/notification.api"

export function useNotifications() {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: notificationApi.getNotifications,
    })
}

export function useMarkNotificationRead() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: notificationApi.markAsRead,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            })
        },
    })
}