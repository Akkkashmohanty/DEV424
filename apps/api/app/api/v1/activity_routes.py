from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import (
    get_current_user,
)

from app.db.database import get_db

from app.models.user import User

from app.repositories.activity_repository import (
    ActivityRepository,
)

from app.schemas.activity import (
    ActivityResponse,
)

from app.services.activity_service import (
    ActivityService,
)

router = APIRouter(
    prefix="/activities",
    tags=["Activities"],
)


def get_activity_service(
    db: Session,
) -> ActivityService:
    repository = ActivityRepository(db)

    return ActivityService(
        repository,
    )


@router.get(
    "",
    response_model=list[ActivityResponse],
)
def list_activities(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_activity_service(db)

    return service.list(
        current_user.id,
    )