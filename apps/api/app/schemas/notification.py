from datetime import datetime

from pydantic import BaseModel
from pydantic import ConfigDict


class NotificationResponse(BaseModel):
    id: int
    user_id: int

    title: str
    message: str

    scheduled_for: datetime

    is_read: bool

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )