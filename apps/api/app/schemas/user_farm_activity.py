from datetime import datetime

from pydantic import BaseModel
from pydantic import ConfigDict


class UserFarmActivityCreate(BaseModel):

    farm_activity_id: int
    duration_minutes: int
    notes: str | None = None


class UserFarmActivityResponse(BaseModel):

    id: int

    user_id: int

    farm_activity_id: int

    duration_minutes: int

    calories_burned: float

    xp_earned: int

    equivalent_exercise: str

    notes: str | None

    completed_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )