import { create } from "zustand"
import { Activity } from "../types/dashboard.types"

interface DashboardState {
  activities: Activity[]
  setActivities: (activities: Activity[]) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  activities: [],
  setActivities: (activities) =>
    set({
      activities,
    }),
}))