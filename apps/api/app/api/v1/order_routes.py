from fastapi import (
    APIRouter,
    Depends,
)
from sqlalchemy.orm import Session

from app.auth.dependencies import (
    get_current_user,
)
from app.db.database import get_db

from app.models.user import User

router = APIRouter(
    prefix="/orders",
    tags=["Orders"],
)