from sqlalchemy.orm import Session

from app.models.notification import Notification


class NotificationRepository:
    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create(
        self,
        user_id: int,
        title: str,
        message: str,
    ) -> Notification:

        notification = Notification(
            user_id=user_id,
            title=title,
            message=message,
        )

        self.db.add(notification)
        self.db.commit()
        self.db.refresh(notification)

        return notification

    def get_all(
        self,
        user_id: int,
    ) -> list[Notification]:

        return (
            self.db.query(Notification)
            .filter(
                Notification.user_id == user_id,
            )
            .order_by(
                Notification.created_at.desc(),
            )
            .all()
        )

    def mark_as_read(
        self,
        notification: Notification,
    ) -> Notification:

        notification.is_read = True

        self.db.commit()
        self.db.refresh(notification)

        return notification

    def get_by_id(
        self,
        notification_id: int,
        user_id: int,
    ) -> Notification | None:

        return (
            self.db.query(Notification)
            .filter(
                Notification.id == notification_id,
                Notification.user_id == user_id,
            )
            .first()
        )