from pydantic import BaseModel


class AnalyticsOverview(BaseModel):
    total_tasks: int
    completed_tasks: int
    pending_tasks: int

    completion_rate: float

    xp_points: int
    level: int
    streak_days: int


class PriorityAnalytics(BaseModel):
    priority: str
    count: int


class CropAnalytics(BaseModel):
    crop_name: str
    count: int