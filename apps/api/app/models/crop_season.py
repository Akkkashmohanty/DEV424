from sqlalchemy import (
    ForeignKey,
    Integer,
    String,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.db.base import Base


class CropSeason(Base):
    __tablename__ = "crop_seasons"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    crop_id: Mapped[int] = mapped_column(
        ForeignKey(
            "crops.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    season: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    crop = relationship(
        "Crop",
        back_populates="seasons",
    )