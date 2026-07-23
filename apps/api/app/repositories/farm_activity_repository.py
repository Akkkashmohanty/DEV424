from sqlalchemy.orm import Session

from app.models.farm_activity import FarmActivity


class FarmActivityRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, activity_id: int) -> FarmActivity | None:
        return (
            self.db.query(FarmActivity)
            .filter(
                FarmActivity.id == activity_id,
                FarmActivity.is_active.is_(True),
            )
            .first()
        )

    def get_all(self):
        return (
            self.db.query(FarmActivity)
            .filter(
                FarmActivity.is_active.is_(True),
            )
            .order_by(
                FarmActivity.category,
                FarmActivity.name,
            )
            .all()
        )