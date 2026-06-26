import {
  Recommendation,
  Reminder,
  HealthStatus,
} from "../types/planner.types"

export const recommendations: Recommendation[] = [
  {
    id: "1",
    crop: "Tomatoes",
    season: "Summer",
    difficulty: "Easy",
    waterLevel: "Medium",
  },
  {
    id: "2",
    crop: "Spinach",
    season: "Winter",
    difficulty: "Easy",
    waterLevel: "Low",
  },
]

export const reminders: Reminder[] = [
  {
    id: "1",
    title: "Water tomato plants",
    date: "Tomorrow",
  },
]

export const healthStatuses: HealthStatus[] = [
  {
    id: "1",
    crop: "Tomatoes",
    health: "Healthy",
  },
]