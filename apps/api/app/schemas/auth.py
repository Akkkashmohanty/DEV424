from enum import Enum

from pydantic import BaseModel, EmailStr


class UserRole(str, Enum):
    USER = "USER"
    FARMER = "FARMER"
    SELLER = "SELLER"
    CREATOR = "CREATOR"
    ADMIN = "ADMIN"


class UserRegister(BaseModel):
    email: EmailStr
    full_name: str
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: UserRole