from datetime import datetime

from pydantic import BaseModel, ConfigDict


class TaskCreate(BaseModel):
    title: str
    crop_name: str
    priority: str = "Medium"


class TaskUpdate(BaseModel):
    title: str | None = None
    crop_name: str | None = None
    priority: str | None = None
    completed: bool | None = None


class TaskResponse(BaseModel):
    id: int
    user_id: int
    title: str
    crop_name: str
    priority: str
    completed: bool
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )