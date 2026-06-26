import { Activity, Goal, Badge } from "../types/dashboard.types"

export const activities: Activity[] = [
  {
    id: "1",
    type: "planting",
    duration: 45,
    calories: 250,
    date: "2026-05-24",
  },
  {
    id: "2",
    type: "watering",
    duration: 20,
    calories: 80,
    date: "2026-05-23",
  },
]

export const goals: Goal[] = [
  {
    id: "1",
    title: "Monthly Calories",
    target: 5000,
    current: 3200,
  },
]

export const badges: Badge[] = [
  {
    id: "1",
    title: "Green Starter",
    description: "Completed first farming session",
  },
]