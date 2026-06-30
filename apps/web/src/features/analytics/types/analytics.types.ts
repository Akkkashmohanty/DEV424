export interface AnalyticsOverview {
    total_tasks: number

    completed_tasks: number

    pending_tasks: number

    completion_rate: number

    xp_points: number

    level: number

    streak_days: number
}

export interface PriorityAnalytics {
    priority: string

    count: number
}

export interface CropAnalytics {
    crop_name: string

    count: number
}