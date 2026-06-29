from fastapi import HTTPException
from fastapi import status

from app.repositories.notification_repository import (
    NotificationRepository,
)


class NotificationService:
    def __init__(
        self,
        repository: NotificationRepository,
    ):
        self.repository = repository

    def notify(
        self,
        user_id: int,
        title: str,
        message: str,
    ):
        return self.repository.create(
            user_id=user_id,
            title=title,
            message=message,
        )

    def list(
        self,
        user_id: int,
    ):
        return self.repository.get_all(
            user_id=user_id,
        )

    def mark_as_read(
        self,
        notification_id: int,
        user_id: int,
    ):
        notification = self.repository.get_by_id(
            notification_id,
            user_id,
        )

        if not notification:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Notification not found",
            )

        return self.repository.mark_as_read(
            notification,
        )