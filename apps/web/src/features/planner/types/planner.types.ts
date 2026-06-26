export interface Task {
  id: number
  user_id: number
  title: string
  crop_name: string
  priority: string
  completed: boolean
  created_at: string
}

export interface CreateTaskPayload {
  title: string
  crop_name: string
  priority: string
}

export interface UpdateTaskPayload {
  title?: string
  crop_name?: string
  priority?: string
  completed?: boolean
}

/*
|--------------------------------------------------------------------------
| Legacy Planner Types
|--------------------------------------------------------------------------
| Keep these until the Planner UI is fully migrated
| from mock data to FastAPI.
|--------------------------------------------------------------------------
*/

export interface Recommendation {
  id: string
  crop: string
  season: string
  difficulty: string
  waterLevel: string
}

export interface Reminder {
  id: string
  title: string
  date: string
}

export interface HealthStatus {
  id: string
  crop: string
  health: string
}