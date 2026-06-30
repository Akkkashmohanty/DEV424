from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.task import Task
from app.models.user import User


class AnalyticsRepository:
    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def get_overview(
        self,
        user_id: int,
    ):
        user = (
            self.db.query(User)
            .filter(
                User.id == user_id,
            )
            .first()
        )

        total_tasks = (
            self.db.query(Task)
            .filter(
                Task.user_id == user_id,
            )
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
                (
                    completed_tasks
                    / total_tasks
                )
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

    def get_priority_distribution(
        self,
        user_id: int,
    ):
        rows = (
            self.db.query(
                Task.priority,
                func.count(Task.id),
            )
            .filter(
                Task.user_id == user_id,
            )
            .group_by(
                Task.priority,
            )
            .all()
        )

        return [
            {
                "priority": priority,
                "count": count,
            }
            for priority, count in rows
        ]

    def get_crop_distribution(
        self,
        user_id: int,
    ):
        rows = (
            self.db.query(
                Task.crop_name,
                func.count(Task.id),
            )
            .filter(
                Task.user_id == user_id,
            )
            .group_by(
                Task.crop_name,
            )
            .order_by(
                func.count(Task.id).desc(),
            )
            .all()
        )

        return [
            {
                "crop_name": crop,
                "count": count,
            }
            for crop, count in rows
        ]