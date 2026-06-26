import { api } from "@/lib/axios/client"

export interface CreateTaskPayload {
  title: string
  crop_name: string
  priority: string
}

export const plannerApi = {
  async getTasks() {
    const response = await api.get("/tasks")
    return response.data
  },

  async createTask(payload: CreateTaskPayload) {
    const response = await api.post("/tasks", payload)
    return response.data
  },

  async deleteTask(taskId: number) {
    const response = await api.delete(`/tasks/${taskId}`)
    return response.data
  },

  async updateTask(taskId: number, payload: Partial<CreateTaskPayload>) {
    const response = await api.patch(`/tasks/${taskId}`, payload)
    return response.data
  },

  async completeTask(taskId: number) {
    const response = await api.patch(`/tasks/${taskId}`, {
      completed: true,
    })

    return response.data
  },
}