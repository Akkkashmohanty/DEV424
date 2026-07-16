"use client"

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import {
  plannerApi,
  FarmPlanRequest,
} from "../api/planner.api"

import {
  UpdateTaskPayload,
} from "../types/planner.types"

// ======================================================
// TASKS
// ======================================================

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: plannerApi.getTasks,
  })
}

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: plannerApi.createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      })

      queryClient.invalidateQueries({
        queryKey: ["dashboard-summary"],
      })
    },
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      taskId,
      payload,
    }: {
      taskId: number
      payload: UpdateTaskPayload
    }) =>
      plannerApi.updateTask(
        taskId,
        payload,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      })

      queryClient.invalidateQueries({
        queryKey: ["dashboard-summary"],
      })
    },
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: plannerApi.deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      })

      queryClient.invalidateQueries({
        queryKey: ["dashboard-summary"],
      })
    },
  })
}

// ======================================================
// WEATHER
// ======================================================

export function useWeather(
  city: string,
) {
  return useQuery({
    queryKey: [
      "weather",
      city,
    ],

    queryFn: () =>
      plannerApi.getWeather(
        city,
      ),

    enabled: city.trim().length > 0,

    staleTime: 1000 * 60 * 10,
  })
}

// ======================================================
// FARM PLAN
// ======================================================

export function useFarmPlan() {
  return useMutation({
    mutationFn: (
      payload: FarmPlanRequest,
    ) =>
      plannerApi.generateFarmPlan(
        payload,
      ),
  })
}

// ======================================================
// AI ADVICE
// ======================================================

export function useAIAdvice() {
  return useMutation({
    mutationFn: (
      payload: any,
    ) =>
      plannerApi.getAIAdvice(
        payload,
      ),
  })
}