from app.core.constants import (
    XP_PER_LEVEL,
    XP_PER_TASK,
)

from app.models.user import User

from app.repositories.user_repository import (
    UserRepository,
)


class GamificationService:
    def __init__(
        self,
        repository: UserRepository,
    ):
        self.repository = repository

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

        return self.repository.save(user)




        