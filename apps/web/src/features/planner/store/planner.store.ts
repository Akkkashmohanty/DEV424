import { create } from "zustand"

interface PlannerState {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

export const usePlannerStore =
  create<PlannerState>((set) => ({
    selectedDate: new Date(),

    setSelectedDate: (date) =>
      set({
        selectedDate: date,
      }),
  }))