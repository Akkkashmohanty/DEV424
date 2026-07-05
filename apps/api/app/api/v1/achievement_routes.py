from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.db.database import get_db

from app.models.user import User

from app.repositories.achievement_repository import (
    AchievementRepository,
)

from app.schemas.achievement import (
    AchievementResponse,
)

from app.services.achievement_service import (
    AchievementService,
)

router = APIRouter(
    prefix="/achievements",
    tags=["Achievements"],
)


def get_achievement_service(
    db: Session,
) -> AchievementService:
    repository = AchievementRepository(db)

    return AchievementService(
        repository,
    )


@router.get(
    "",
    response_model=list[AchievementResponse],
)
def list_achievements(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_achievement_service(
        db,
    )

    return service.list_achievements(
        current_user.id,
    )