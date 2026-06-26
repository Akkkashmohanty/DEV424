import { api } from "@/lib/axios/client"
import { DashboardSummary } from "../types/dashboard.types"

export const dashboardApi = {
  async getSummary() {
    const response =
      await api.get<DashboardSummary>(
        "/dashboard/summary",
      )

    return response.data
  },
}