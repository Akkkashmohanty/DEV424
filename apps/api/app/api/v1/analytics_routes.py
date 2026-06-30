from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.db.database import get_db

from app.models.user import User

from app.repositories.analytics_repository import (
    AnalyticsRepository,
)

from app.schemas.analytics import (
    AnalyticsOverview,
    PriorityAnalytics,
    CropAnalytics,
)

from app.services.analytics_service import (
    AnalyticsService,
)

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


def get_analytics_service(
    db: Session,
) -> AnalyticsService:
    repository = AnalyticsRepository(db)

    return AnalyticsService(
        repository,
    )


@router.get(
    "/overview",
    response_model=AnalyticsOverview,
)
def get_overview(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_analytics_service(db)

    return service.get_overview(
        current_user.id,
    )


@router.get(
    "/priority",
    response_model=list[PriorityAnalytics],
)
def get_priority_distribution(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_analytics_service(db)

    return service.get_priority_distribution(
        current_user.id,
    )


@router.get(
    "/crops",
    response_model=list[CropAnalytics],
)
def get_crop_distribution(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_analytics_service(db)

    return service.get_crop_distribution(
        current_user.id,
    )