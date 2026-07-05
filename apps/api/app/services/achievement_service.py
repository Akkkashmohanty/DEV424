from datetime import datetime

from app.models.achievement import Achievement

from app.repositories.achievement_repository import (
    AchievementRepository,
)


class AchievementService:
    def __init__(
        self,
        repository: AchievementRepository,
    ):
        self.repository = repository

    def list_achievements(
        self,
        user_id: int,
    ):
        return self.repository.get_all(
            user_id,
        )

    def unlock(
        self,
        user_id: int,
        title: str,
        description: str,
        icon: str,
        xp_reward: int = 0,
    ):
        achievement = self.repository.get_by_title(
            user_id=user_id,
            title=title,
        )

        if achievement:
            return achievement

        achievement = Achievement(
            user_id=user_id,
            title=title,
            description=description,
            icon=icon,
            xp_reward=xp_reward,
            unlocked=True,
            unlocked_at=datetime.utcnow(),
        )

        return self.repository.create(
            achievement,
        )