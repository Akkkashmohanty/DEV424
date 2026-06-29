from app.repositories.activity_repository import (
    ActivityRepository,
)


class ActivityService:
    def __init__(
        self,
        repository: ActivityRepository,
    ):
        self.repository = repository

    def log(
        self,
        user_id: int,
        action: str,
        description: str,
    ):
        return self.repository.create(
            user_id=user_id,
            action=action,
            description=description,
        )

    def list(
        self,
        user_id: int,
    ):
        return self.repository.get_all(
            user_id=user_id,
        )