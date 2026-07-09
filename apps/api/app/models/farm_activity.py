from datetime import datetime

from sqlalchemy import (
    DateTime,
    Float,
    Integer,
    String,
    Boolean,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.db.base import Base


class FarmActivity(Base):
    __tablename__ = "farm_activities"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        unique=True,
    )

    description: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
    )

    category: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    calories_per_hour: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    xp_reward: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=10,
    )

    equivalent_exercise: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    icon: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    user_activities = relationship(
        "UserFarmActivity",
        back_populates="farm_activity",
        cascade="all, delete-orphan",
    )