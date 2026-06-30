from app.repositories.analytics_repository import (
    AnalyticsRepository,
)


class AnalyticsService:
    def __init__(
        self,
        repository: AnalyticsRepository,
    ):
        self.repository = repository

    def get_overview(
        self,
        user_id: int,
    ):
        return self.repository.get_overview(
            user_id,
        )

    def get_priority_distribution(
        self,
        user_id: int,
    ):
        return self.repository.get_priority_distribution(
            user_id,
        )

    def get_crop_distribution(
        self,
        user_id: int,
    ):
        return self.repository.get_crop_distribution(
            user_id,
        )