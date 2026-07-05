from datetime import datetime

from pydantic import BaseModel, ConfigDict


class AchievementResponse(BaseModel):
    id: int

    title: str

    description: str

    icon: str

    xp_reward: int

    unlocked: bool

    unlocked_at: datetime | None

    model_config = ConfigDict(
        from_attributes=True,
    )