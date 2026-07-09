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


class FarmPlan(Base):
    __tablename__ = "farm_plans"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    city: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    garden_type: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    garden_size: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    sunlight: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    water_availability: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="ACTIVE",
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

    user = relationship(
        "User",
        back_populates="farm_plans",
    )

    crops = relationship(
        "FarmPlanCrop",
        back_populates="farm_plan",
        cascade="all, delete-orphan",
    )