from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.user_farm_activity import UserFarmActivity


class UserFarmActivityRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(self, activity: UserFarmActivity):
        self.db.add(activity)
        self.db.commit()
        self.db.refresh(activity)
        return activity

    def get_user_activities(self, user_id: int):
        return (
            self.db.query(UserFarmActivity)
            .filter(UserFarmActivity.user_id == user_id)
            .order_by(UserFarmActivity.completed_at.desc())
            .all()
        )

    def get_today_calories(self, user_id: int):
        calories = (
            self.db.query(
                func.coalesce(
                    func.sum(UserFarmActivity.calories_burned),
                    0,
                )
            )
            .filter(
                UserFarmActivity.user_id == user_id,
                func.date(UserFarmActivity.completed_at)
                == func.current_date(),
            )
            .scalar()
        )

        return float(calories)

    def get_total_calories(self, user_id: int):
        calories = (
            self.db.query(
                func.coalesce(
                    func.sum(UserFarmActivity.calories_burned),
                    0,
                )
            )
            .filter(
                UserFarmActivity.user_id == user_id,
            )
            .scalar()
        )

        return float(calories)

    def get_total_xp(self, user_id: int):
        xp = (
            self.db.query(
                func.coalesce(
                    func.sum(UserFarmActivity.xp_earned),
                    0,
                )
            )
            .filter(
                UserFarmActivity.user_id == user_id,
            )
            .scalar()
        )

        return int(xp)