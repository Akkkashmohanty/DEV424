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

export interface WaterScheduleItem {
  crop_name: string
  watering_frequency: string
  next_watering: string
  status: string
}

export interface CropLifecycleItem {
  crop_name: string
  planting_date: string
  expected_harvest_date: string
  status: string
  progress: number
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
  // Dashboard
  // -----------------------------

  async getDashboardSummary() {
    const response = await api.get(
      "/farm-plans/dashboard",
    )

    return response.data
  },

  // -----------------------------
  // Farm Plans
  // -----------------------------

  async getFarmPlans() {
    const response = await api.get("/farm-plans")
    return response.data
  },

  async getFarmPlan(
    id: number,
  ) {
    const response =
      await api.get(`/farm-plans/${id}`)

    return response.data
  },

  async deleteFarmPlan(
    id: number,
  ) {
    const response =
      await api.delete(`/farm-plans/${id}`)

    return response.data
  },

  async getCropLifecycle() {
    const response =
      await api.get<CropLifecycleItem[]>(
        "/farm-plans/crop-lifecycle",
      )

    return response.data
  },

  // -----------------------------
  // Recommendations
  // -----------------------------

  async getRecommendations(
    season: string,
    sunlight: string,
    water: string,
  ) {
    const response =
      await api.get(
        "/farm-plans/recommendations",
        {
          params: {
            season,
            sunlight,
            water,
          },
        },
      )

    return response.data
  },

  // -----------------------------
  // Water Schedule
  // -----------------------------

  async getWaterSchedule() {
    const response =
      await api.get<WaterScheduleItem[]>(
        "/farm-plans/watering",
      )

    return response.data
  },

  // -----------------------------
  // Timeline
  // -----------------------------

  async getHarvestTimeline() {
    const response =
      await api.get(
        "/farm-plans/timeline",
      )

    return response.data
  },

  // -----------------------------
  // Sustainability
  // -----------------------------

  async getSustainability(
    planId: number,
  ) {
    const response =
      await api.get(
        `/farm-plans/${planId}/sustainability`,
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

