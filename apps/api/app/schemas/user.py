from datetime import datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict, EmailStr


class UserRole(str, Enum):
    USER = "USER"
    FARMER = "FARMER"
    SELLER = "SELLER"
    CREATOR = "CREATOR"
    ADMIN = "ADMIN"


class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    password: str


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: UserRole
    xp_points: int
    level: int
    streak_days: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )