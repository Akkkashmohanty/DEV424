import { api } from "@/lib/axios/client"

export interface OrderItemPayload {
    product_id: number
    quantity: number
}

export interface CreateOrderPayload {
    items: OrderItemPayload[]
}

export const orderApi = {
    async createOrder(payload: CreateOrderPayload) {
        const response = await api.post(
            "/orders",
            payload,
        )

        return response.data
    },
}