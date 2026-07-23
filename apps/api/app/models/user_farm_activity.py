from datetime import datetime

from sqlalchemy import (
    DateTime,
    Float,
    ForeignKey,
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


class UserFarmActivity(Base):
    __tablename__ = "user_farm_activities"

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

    farm_activity_id: Mapped[int] = mapped_column(
        ForeignKey(
            "farm_activities.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    duration_minutes: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    calories_burned: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    xp_earned: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    equivalent_exercise: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    notes: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    completed_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    user = relationship(
        "User",
        back_populates="farm_activity_logs",
    )

    farm_activity = relationship(
        "FarmActivity",
        back_populates="user_activities",
    )