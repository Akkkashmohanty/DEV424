from app.models.user_farm_activity import UserFarmActivity

from app.repositories.farm_activity_repository import (
    FarmActivityRepository,
)

from app.repositories.user_farm_activity_repository import (
    UserFarmActivityRepository,
)


class UserFarmActivityService:

    def __init__(
        self,
        activity_repository: FarmActivityRepository,
        repository: UserFarmActivityRepository,
    ):
        self.activity_repository = activity_repository
        self.repository = repository

    def log_activity(
        self,
        user_id: int,
        farm_activity_id: int,
        duration_minutes: int,
        notes: str | None = None,
    ):

        farm_activity = self.activity_repository.get_by_id(
            farm_activity_id
        )

        if farm_activity is None:
            raise ValueError("Farm activity not found.")

        calories = round(
            (farm_activity.calories_per_hour / 60)
            * duration_minutes,
            2,
        )

        activity = UserFarmActivity(
            user_id=user_id,
            farm_activity_id=farm_activity.id,
            duration_minutes=duration_minutes,
            calories_burned=calories,
            xp_earned=farm_activity.xp_reward,
            equivalent_exercise=farm_activity.equivalent_exercise,
            notes=notes,
        )

        return self.repository.create(activity)

    def list(self, user_id: int):
        return self.repository.get_user_activities(user_id)

    def dashboard_summary(self, user_id: int):
        return {
            "today_calories": self.repository.get_today_calories(user_id),
            "total_calories": self.repository.get_total_calories(user_id),
            "total_xp": self.repository.get_total_xp(user_id),
        }