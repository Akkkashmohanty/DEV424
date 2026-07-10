from sqlalchemy.orm import (
    Session,
    joinedload,
)

from app.models.crop import Crop


class CropRepository:
    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create(
        self,
        crop: Crop,
        commit: bool = True,
    ) -> Crop:
        self.db.add(crop)

        if commit:
            self.db.commit()
            self.db.refresh(crop)

        return crop

    def save(
        self,
        crop: Crop,
        commit: bool = True,
    ) -> Crop:
        if commit:
            self.db.commit()
            self.db.refresh(crop)

        return crop

    def get_by_id(
        self,
        crop_id: int,
    ) -> Crop | None:
        return (
            self.db.query(Crop)
            .options(
                joinedload(Crop.seasons),
                joinedload(Crop.tasks),
            )
            .filter(
                Crop.id == crop_id,
            )
            .first()
        )

    def get_by_name(
        self,
        name: str,
    ) -> Crop | None:
        return (
            self.db.query(Crop)
            .filter(
                Crop.name == name,
            )
            .first()
        )

    def list_all(
        self,
    ) -> list[Crop]:
        return (
            self.db.query(Crop)
            .options(
                joinedload(Crop.seasons),
                joinedload(Crop.tasks),
            )
            .order_by(
                Crop.name.asc(),
            )
            .all()
        )

    def list_active(
        self,
    ) -> list[Crop]:
        return (
            self.db.query(Crop)
            .options(
                joinedload(Crop.seasons),
                joinedload(Crop.tasks),
            )
            .filter(
                Crop.is_active.is_(True),
            )
            .order_by(
                Crop.name.asc(),
            )
            .all()
        )

    def delete(
        self,
        crop: Crop,
        commit: bool = True,
    ):
        self.db.delete(crop)

        if commit:
            self.db.commit()

    def flush(
        self,
    ):
        self.db.flush()