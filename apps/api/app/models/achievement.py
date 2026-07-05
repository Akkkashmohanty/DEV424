from datetime import datetime

from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    String,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.db.base import Base


class Achievement(Base):
    __tablename__ = "achievements"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    title: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    description: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    icon: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    xp_reward: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    unlocked: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    unlocked_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )