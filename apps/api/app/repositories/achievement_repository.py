from sqlalchemy.orm import Session

from app.models.achievement import Achievement


class AchievementRepository:
    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def get_all(
        self,
        user_id: int,
    ):
        return (
            self.db.query(Achievement)
            .filter(
                Achievement.user_id == user_id,
            )
            .order_by(
                Achievement.id.asc(),
            )
            .all()
        )

    def get_by_title(
        self,
        user_id: int,
        title: str,
    ):
        return (
            self.db.query(Achievement)
            .filter(
                Achievement.user_id == user_id,
                Achievement.title == title,
            )
            .first()
        )

    def create(
        self,
        achievement: Achievement,
    ):
        self.db.add(
            achievement,
        )

        self.db.commit()

        self.db.refresh(
            achievement,
        )

        return achievement

    def update(
        self,
        achievement: Achievement,
    ):
        self.db.commit()

        self.db.refresh(
            achievement,
        )

        return achievement