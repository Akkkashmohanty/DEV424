from datetime import datetime

from sqlalchemy import (
    DateTime,
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


class FarmPlanCrop(Base):
    __tablename__ = "farm_plan_crops"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    farm_plan_id: Mapped[int] = mapped_column(
        ForeignKey(
            "farm_plans.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    crop_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    planting_date: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    expected_harvest_date: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    watering_frequency: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="PLANNED",
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    farm_plan = relationship(
        "FarmPlan",
        back_populates="crops",
    )