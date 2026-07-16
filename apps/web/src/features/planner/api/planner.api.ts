import { api } from "@/lib/axios/client"

import { WeatherResponse } from "../types/weather.types"

export interface CreateTaskPayload {
  title: string
  crop_name: string
  priority: string
}

export interface FarmPlanRequest {
  city: string
  garden_type: string
  garden_size: string
  sunlight: string
  water_availability: string
}

export const plannerApi = {
  // -----------------------------
  // Tasks
  // -----------------------------

  async getTasks() {
    const response = await api.get("/tasks")
    return response.data
  },

  async createTask(
    payload: CreateTaskPayload,
  ) {
    const response = await api.post(
      "/tasks",
      payload,
    )

    return response.data
  },

  async deleteTask(
    taskId: number,
  ) {
    const response = await api.delete(
      `/tasks/${taskId}`,
    )

    return response.data
  },

  async updateTask(
    taskId: number,
    payload: Partial<CreateTaskPayload>,
  ) {
    const response = await api.patch(
      `/tasks/${taskId}`,
      payload,
    )

    return response.data
  },

  async completeTask(
    taskId: number,
  ) {
    const response = await api.patch(
      `/tasks/${taskId}`,
      {
        completed: true,
      },
    )

    return response.data
  },

  // -----------------------------
  // Weather
  // -----------------------------

  async getWeather(
    city: string,
  ): Promise<WeatherResponse> {

    const response =
      await api.get<WeatherResponse>(
        `/weather/${city}`,
      )

    return response.data
  },

  // -----------------------------
  // Farm Planner
  // -----------------------------

  async generateFarmPlan(
    payload: FarmPlanRequest,
  ) {

    const response =
      await api.post(
        "/farm-plans/generate",
        payload,
      )

    return response.data
  },

  // -----------------------------
  // AI
  // -----------------------------

  async getAIAdvice(
    payload: any,
  ) {

    const response =
      await api.post(
        "/ai/farm-advice",
        payload,
      )

    return response.data
  },
}