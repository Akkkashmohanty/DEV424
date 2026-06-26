from pydantic import BaseModel


class DashboardSummary(BaseModel):
    total_tasks: int
    completed_tasks: int
    pending_tasks: int
    completion_rate: float

    xp_points: int
    level: int
    streak_days: int