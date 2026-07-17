import { create } from "zustand"

export interface PlannerTask {
  id: string
  title: string
  completed: boolean
  dueDate: string
}

export interface WateringSchedule {
  crop: string
  frequency: string
  nextWatering: string
}

export interface CropRecommendation {
  crop: string
  score: number
  reason: string
}

interface PlannerState {
  selectedDate: Date
  city: string
  gardenSize: number
  season: string

  selectedCrops: string[]

  recommendations: CropRecommendation[]

  wateringSchedule: WateringSchedule[]

  monthlyTasks: PlannerTask[]

  sustainabilityScore: number

  loading: boolean

  setSelectedDate: (date: Date) => void
  setCity: (city: string) => void
  setGardenSize: (size: number) => void
  setSeason: (season: string) => void

  setSelectedCrops: (crops: string[]) => void

  setRecommendations: (
    recommendations: CropRecommendation[]
  ) => void

  setWateringSchedule: (
    schedule: WateringSchedule[]
  ) => void

  setMonthlyTasks: (
    tasks: PlannerTask[]
  ) => void

  setSustainabilityScore: (
    score: number
  ) => void

  setLoading: (
    loading: boolean
  ) => void
}

export const usePlannerStore =
  create<PlannerState>((set) => ({
    selectedDate: new Date(),

    city: "",

    gardenSize: 50,

    season: "Summer",

    selectedCrops: [],

    recommendations: [],

    wateringSchedule: [],

    monthlyTasks: [],

    sustainabilityScore: 0,

    loading: false,

    setSelectedDate: (selectedDate) =>
      set({ selectedDate }),

    setCity: (city) =>
      set({ city }),

    setGardenSize: (gardenSize) =>
      set({ gardenSize }),

    setSeason: (season) =>
      set({ season }),

    setSelectedCrops: (selectedCrops) =>
      set({ selectedCrops }),

    setRecommendations: (recommendations) =>
      set({ recommendations }),

    setWateringSchedule: (wateringSchedule) =>
      set({ wateringSchedule }),

    setMonthlyTasks: (monthlyTasks) =>
      set({ monthlyTasks }),

    setSustainabilityScore: (
      sustainabilityScore
    ) =>
      set({
        sustainabilityScore,
      }),

    setLoading: (loading) =>
      set({ loading }),
  }))