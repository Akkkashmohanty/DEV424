from sqlalchemy.orm import Session

from app.models.activity_log import ActivityLog


class ActivityRepository:
    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create(
        self,
        user_id: int,
        action: str,
        description: str,
    ) -> ActivityLog:

        activity = ActivityLog(
            user_id=user_id,
            action=action,
            description=description,
        )

        self.db.add(activity)
        self.db.commit()
        self.db.refresh(activity)

        return activity

    def get_all(
        self,
        user_id: int,
    ) -> list[ActivityLog]:

        return (
            self.db.query(ActivityLog)
            .filter(
                ActivityLog.user_id == user_id,
            )
            .order_by(
                ActivityLog.created_at.desc(),
            )
            .all()
        )