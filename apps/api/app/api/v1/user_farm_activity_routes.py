from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user

from app.db.database import get_db

from app.models.user import User

from app.repositories.farm_activity_repository import (
    FarmActivityRepository,
)

from app.repositories.user_farm_activity_repository import (
    UserFarmActivityRepository,
)

from app.schemas.user_farm_activity import (
    UserFarmActivityCreate,
    UserFarmActivityResponse,
)

from app.services.user_farm_activity_service import (
    UserFarmActivityService,
)

router = APIRouter(
    prefix="/farm-activities",
    tags=["Farm Activities"],
)


def get_service(
    db: Session,
):

    return UserFarmActivityService(
        FarmActivityRepository(db),
        UserFarmActivityRepository(db),
    )


@router.post(
    "",
    response_model=UserFarmActivityResponse,
)
def create_activity(
    request: UserFarmActivityCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    service = get_service(db)

    return service.log_activity(
        user_id=current_user.id,
        farm_activity_id=request.farm_activity_id,
        duration_minutes=request.duration_minutes,
        notes=request.notes,
    )


@router.get(
    "",
    response_model=list[UserFarmActivityResponse],
)
def list_activities(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    service = get_service(db)

    return service.list(
        current_user.id,
    )


@router.get("/summary")
def summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    service = get_service(db)

    return service.dashboard_summary(
        current_user.id,
    )