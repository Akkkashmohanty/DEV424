from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import (
    get_current_user,
)

from app.db.database import get_db

from app.models.user import User

from app.repositories.notification_repository import (
    NotificationRepository,
)

from app.schemas.notification import (
    NotificationResponse,
)

from app.services.notification_service import (
    NotificationService,
)

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)


def get_notification_service(
    db: Session,
) -> NotificationService:
    repository = NotificationRepository(db)

    return NotificationService(
        repository,
    )


@router.get(
    "",
    response_model=list[NotificationResponse],
)
def list_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_notification_service(db)

    return service.list(
        current_user.id,
    )


@router.patch(
    "/{notification_id}/read",
    response_model=NotificationResponse,
)
def mark_notification_read(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_notification_service(db)

    return service.mark_as_read(
        notification_id,
        current_user.id,
    )