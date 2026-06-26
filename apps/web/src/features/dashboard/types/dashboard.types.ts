export interface Activity {
  id: string
  type:
  | "digging"
  | "planting"
  | "watering"
  | "weeding"
  | "harvesting"
  | "composting"

  duration: number
  calories: number
  date: string
}

export interface Goal {
  id: string
  title: string
  target: number
  current: number
}

export interface Badge {
  id: string
  title: string
  description: string
}

export interface DashboardSummary {
  total_tasks: number
  completed_tasks: number
  pending_tasks: number
  completion_rate: number

  xp_points: number
  level: number
  streak_days: number
}