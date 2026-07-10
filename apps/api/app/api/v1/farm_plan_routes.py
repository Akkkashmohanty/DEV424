from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.db.database import get_db

from app.models.user import User

from app.repositories.farm_plan_repository import (
    FarmPlanRepository,
)

from app.services.farm_plan_service import (
    FarmPlanService,
)

from app.schemas.farm_plan import (
    FarmPlanCreate,
    FarmPlanUpdate,
    FarmPlanResponse,
)

router = APIRouter(
    prefix="/farm-plans",
    tags=["Farm Planner"],
)


def get_farm_plan_service(
    db: Session,
) -> FarmPlanService:
    return FarmPlanService(
        FarmPlanRepository(db),
    )


@router.post(
    "",
    response_model=FarmPlanResponse,
)
def create_farm_plan(
    payload: FarmPlanCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = get_farm_plan_service(db)

    return service.create_farm_plan(
        current_user.id,
        payload,
    )


@router.get(
    "",
    response_model=list[FarmPlanResponse],
)
def list_my_farm_plans(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = get_farm_plan_service(db)

    return service.list_my_farm_plans(
        current_user.id,
    )


@router.get(
    "/{farm_plan_id}",
    response_model=FarmPlanResponse,
)
def get_farm_plan(
    farm_plan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = get_farm_plan_service(db)

    return service.get_farm_plan(
        farm_plan_id,
        current_user.id,
    )


@router.patch(
    "/{farm_plan_id}",
    response_model=FarmPlanResponse,
)
def update_farm_plan(
    farm_plan_id: int,
    payload: FarmPlanUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = get_farm_plan_service(db)

    return service.update_farm_plan(
        farm_plan_id,
        current_user.id,
        payload,
    )


@router.delete(
    "/{farm_plan_id}",
)
def delete_farm_plan(
    farm_plan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = get_farm_plan_service(db)

    return service.delete_farm_plan(
        farm_plan_id,
        current_user.id,
    )