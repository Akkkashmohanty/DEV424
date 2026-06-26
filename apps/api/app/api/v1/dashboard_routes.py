from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import (
    get_current_user,
)
from app.db.database import get_db

from app.models.user import User

from app.repositories.dashboard_repository import (
    DashboardRepository,
)

from app.services.dashboard_service import (
    DashboardService,
)

from app.schemas.dashboard import (
    DashboardSummary,
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "/summary",
    response_model=DashboardSummary,
)
def get_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    repository = DashboardRepository(
        db,
    )

    service = DashboardService(
        repository,
    )

    return service.get_summary(
        current_user.id,
    )