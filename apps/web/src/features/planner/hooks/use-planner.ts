"use client"

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import {
  plannerApi,
  type FarmPlanRequest,
  type CreateFarmPlanPayload,
  type CropLifecycleItem,
  type WaterScheduleItem,
  type FarmAdviceRequest,
  type FarmAdviceResponse,
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

export function useWeather(city: string) {
  return useQuery({
    queryKey: ["weather", city],

    queryFn: () =>
      plannerApi.getWeather(city),

    enabled: city.trim().length > 0,

    staleTime: 1000 * 60 * 10,
  })
}

// ======================================================
// FARM PLAN
// ======================================================

export function useCreateFarmPlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (
      payload: CreateFarmPlanPayload,
    ) =>
      plannerApi.createFarmPlan(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["farm-plans"],
      })

      queryClient.invalidateQueries({
        queryKey: ["planner-dashboard"],
      })

      queryClient.invalidateQueries({
        queryKey: ["crop-lifecycle"],
      })

      queryClient.invalidateQueries({
        queryKey: ["watering-schedule"],
      })

      queryClient.invalidateQueries({
        queryKey: ["harvest-timeline"],
      })
    },
  })
}

export function useFarmPlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (
      payload: FarmPlanRequest,
    ) =>
      plannerApi.generateFarmPlan(
        payload,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["farm-plans"],
      })

      queryClient.invalidateQueries({
        queryKey: ["planner-dashboard"],
      })

      queryClient.invalidateQueries({
        queryKey: ["crop-lifecycle"],
      })

      queryClient.invalidateQueries({
        queryKey: ["watering-schedule"],
      })

      queryClient.invalidateQueries({
        queryKey: ["harvest-timeline"],
      })
    },
  })
}

// ======================================================
// AI ADVICE
// ======================================================

export function useFarmAdvice() {
  return useMutation<
    FarmAdviceResponse,
    Error,
    FarmAdviceRequest
  >({
    mutationFn: plannerApi.getFarmAdvice,
  })
}

// ======================================================
// DASHBOARD
// ======================================================

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["planner-dashboard"],

    queryFn:
      plannerApi.getDashboardSummary,

    staleTime: 1000 * 60 * 5,
  })
}

// ======================================================
// FARM PLANS
// ======================================================

export function useFarmPlans() {
  return useQuery({
    queryKey: ["farm-plans"],

    queryFn:
      plannerApi.getFarmPlans,
  })
}

// ======================================================
// RECOMMENDATIONS
// ======================================================

export function useRecommendations(
  season: string,
  sunlight: string,
  water: string,
) {
  return useQuery({
    queryKey: [
      "recommendations",
      season,
      sunlight,
      water,
    ],

    queryFn: () =>
      plannerApi.getRecommendations(
        season,
        sunlight,
        water,
      ),

    enabled:
      season.length > 0 &&
      sunlight.length > 0 &&
      water.length > 0,
  })
}

// ======================================================
// HARVEST TIMELINE
// ======================================================

export function useHarvestTimeline() {
  return useQuery<CropLifecycleItem[]>({
    queryKey: ["harvest-timeline"],

    queryFn:
      plannerApi.getHarvestTimeline,
  })
}

// ======================================================
// WATER SCHEDULE
// ======================================================

export function useWaterSchedule() {
  return useQuery<WaterScheduleItem[]>({
    queryKey: ["watering-schedule"],

    queryFn:
      plannerApi.getWaterSchedule,
  })
}

// ======================================================
// CROP LIFECYCLE
// ======================================================

export function useCropLifecycle() {
  return useQuery<CropLifecycleItem[]>({
    queryKey: ["crop-lifecycle"],

    queryFn:
      plannerApi.getCropLifecycle,
  })
}