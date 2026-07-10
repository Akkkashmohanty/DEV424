from datetime import datetime

from sqlalchemy import (
    Boolean,
    DateTime,
    Float,
    Integer,
    String,
    Text,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.db.base import Base


class Crop(Base):
    __tablename__ = "crops"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False,
        index=True,
    )

    scientific_name: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True,
    )

    category: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        index=True,
    )

    difficulty: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    ideal_temperature_min: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    ideal_temperature_max: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    sunlight_requirement: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    water_requirement: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    soil_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    ph_min: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    ph_max: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    spacing_cm: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    harvest_days: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    humidity_min: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=40,
    )

    humidity_max: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=80,
    )

    rainfall_preference: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="Medium",
    )

    companion_plants: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    common_diseases: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    image_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    seasons = relationship(
        "CropSeason",
        back_populates="crop",
        cascade="all, delete-orphan",
    )

    tasks = relationship(
        "CropTask",
        back_populates="crop",
        cascade="all, delete-orphan",
    )