from sqlalchemy.orm import Session

from app.models.task import Task
from app.models.user import User


class DashboardRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_summary(
        self,
        user_id: int,
    ):
        user = (
            self.db.query(User)
            .filter(User.id == user_id)
            .first()
        )

        total_tasks = (
            self.db.query(Task)
            .filter(Task.user_id == user_id)
            .count()
        )

        completed_tasks = (
            self.db.query(Task)
            .filter(
                Task.user_id == user_id,
                Task.completed == True,
            )
            .count()
        )

        pending_tasks = (
            total_tasks - completed_tasks
        )

        completion_rate = 0.0

        if total_tasks > 0:
            completion_rate = round(
                (completed_tasks / total_tasks)
                * 100,
                2,
            )

        return {
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "pending_tasks": pending_tasks,
            "completion_rate": completion_rate,
            "xp_points": user.xp_points,
            "level": user.level,
            "streak_days": user.streak_days,
        }