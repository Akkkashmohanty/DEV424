"use client"

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import { plannerApi } from "../api/planner.api"

import {
  CreateTaskPayload,
} from "../api/planner.api"

import {
  UpdateTaskPayload,
} from "../types/planner.types"

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
    },
  })
}