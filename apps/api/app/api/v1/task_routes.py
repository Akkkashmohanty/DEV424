from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.db.database import get_db

from app.models.user import User

from app.repositories.task_repository import TaskRepository
from app.repositories.user_repository import UserRepository
from app.repositories.activity_repository import ActivityRepository
from app.repositories.notification_repository import (
    NotificationRepository,
)
from app.repositories.achievement_repository import (
    AchievementRepository,
)

from app.schemas.task import (
    TaskCreate,
    TaskUpdate,
    TaskResponse,
)

from app.services.task_service import TaskService


router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
)


def get_task_service(
    db: Session,
) -> TaskService:
    task_repository = TaskRepository(db)

    user_repository = UserRepository(db)

    activity_repository = ActivityRepository(db)

    notification_repository = NotificationRepository(db)

    achievement_repository = AchievementRepository(db)

    return TaskService(
        task_repository,
        user_repository,
        activity_repository,
        notification_repository,
        achievement_repository,
    )


@router.post(
    "",
    response_model=TaskResponse,
)
def create_task(
    payload: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_task_service(db)

    return service.create_task(
        current_user.id,
        payload,
    )


@router.get(
    "",
    response_model=list[TaskResponse],
)
def list_tasks(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_task_service(db)

    return service.list_tasks(
        current_user.id,
    )


@router.get(
    "/{task_id}",
    response_model=TaskResponse,
)
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_task_service(db)

    return service.get_task(
        task_id,
        current_user.id,
    )


@router.patch(
    "/{task_id}",
    response_model=TaskResponse,
)
def update_task(
    task_id: int,
    payload: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_task_service(db)

    return service.update_task(
        task_id,
        current_user.id,
        payload,
    )


@router.delete(
    "/{task_id}",
)
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_task_service(db)

    service.delete_task(
        task_id,
        current_user.id,
    )

    return {
        "message": "Task deleted successfully",
    }