from app.core.constants import (
    XP_PER_LEVEL,
    XP_PER_TASK,
)

from app.models.user import User

from app.repositories.user_repository import (
    UserRepository,
)

from app.repositories.achievement_repository import (
    AchievementRepository,
)

from app.services.achievement_service import (
    AchievementService,
)


class GamificationService:
    def __init__(
        self,
        repository: UserRepository,
        achievement_repository: AchievementRepository,
    ):
        self.repository = repository

        self.achievement_service = (
            AchievementService(
                achievement_repository,
            )
        )

    def award_task_xp(
        self,
        user: User,
    ) -> User:
        """
        Award XP for completing a task.
        """

        user.xp_points += XP_PER_TASK

        user.level = (
            user.xp_points
            // XP_PER_LEVEL
        ) + 1

        user = self.repository.save(
            user,
        )

        self.__check_achievements(
            user,
        )

        return user

    def __check_achievements(
        self,
        user: User,
    ) -> None:
        """
        Unlock achievements based on user progress.
        """

        if user.xp_points >= XP_PER_TASK:
            self.achievement_service.unlock(
                user_id=user.id,
                title="First Harvest",
                description="Completed your first farming task.",
                icon="🌱",
                xp_reward=25,
            )

        if user.xp_points >= 100:
            self.achievement_service.unlock(
                user_id=user.id,
                title="Rising Farmer",
                description="Earned 100 XP.",
                icon="⭐",
                xp_reward=50,
            )

        if user.level >= 5:
            self.achievement_service.unlock(
                user_id=user.id,
                title="Green Master",
                description="Reached Level 5.",
                icon="🏆",
                xp_reward=100,
            )

        if user.streak_days >= 7:
            self.achievement_service.unlock(
                user_id=user.id,
                title="Consistency Champion",
                description="Maintained a 7-day streak.",
                icon="🔥",
                xp_reward=75,
            )