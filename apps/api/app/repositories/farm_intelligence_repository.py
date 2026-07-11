from sqlalchemy.orm import (
    Session,
    joinedload,
)

from app.models.crop import Crop


class FarmIntelligenceRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def get_all_crops(
        self,
    ) -> list[Crop]:

        return (
            self.db.query(Crop)
            .options(
                joinedload(Crop.seasons),
                joinedload(Crop.tasks),
            )
            .filter(
                Crop.is_active == True,
            )
            .all()
        )