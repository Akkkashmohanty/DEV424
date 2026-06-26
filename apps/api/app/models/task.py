from datetime import datetime

from sqlalchemy import (
    String,
    Boolean,
    ForeignKey,
    DateTime,
)
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.db.base import Base


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    crop_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    priority: Mapped[str] = mapped_column(
        String(20),
        default="Medium",
    )

    completed: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )