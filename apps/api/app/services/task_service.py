from fastapi import HTTPException, status

from app.repositories.task_repository import TaskRepository
from app.repositories.user_repository import UserRepository
from app.repositories.activity_repository import ActivityRepository
from app.repositories.notification_repository import NotificationRepository

from app.schemas.task import (
    TaskCreate,
    TaskUpdate,
)

from app.services.gamification_service import (
    GamificationService,
)

from app.services.activity_service import (
    ActivityService,
)

from app.services.notification_service import (
    NotificationService,
)


class TaskService:
    def __init__(
        self,
        repository: TaskRepository,
        user_repository: UserRepository,
        activity_repository: ActivityRepository,
        notification_repository: NotificationRepository,
    ):
        self.repository = repository
        self.user_repository = user_repository

        self.gamification = GamificationService(
            user_repository,
        )

        self.activity = ActivityService(
            activity_repository,
        )

        self.notification = NotificationService(
            notification_repository,
        )

    def create_task(
        self,
        user_id: int,
        payload: TaskCreate,
    ):
        task = self.repository.create(
            user_id=user_id,
            payload=payload,
        )

        self.activity.log(
            user_id=user_id,
            action="TASK_CREATED",
            description=f"Created task '{task.title}'",
        )

        self.notification.notify(
            user_id=user_id,
            title="Task Created",
            message=f"Task '{task.title}' has been created.",
        )

        return task

    def list_tasks(
        self,
        user_id: int,
    ):
        return self.repository.get_all_by_user(
            user_id=user_id,
        )

    def get_task(
        self,
        task_id: int,
        user_id: int,
    ):
        task = self.repository.get_by_id(
            task_id=task_id,
            user_id=user_id,
        )

        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found",
            )

        return task

    def update_task(
        self,
        task_id: int,
        user_id: int,
        payload: TaskUpdate,
    ):
        task = self.get_task(
            task_id,
            user_id,
        )

        was_completed = task.completed

        updated_task = self.repository.update(
            task,
            payload,
        )

        if (
            not was_completed
            and updated_task.completed
        ):
            user = self.user_repository.get_by_id(
                user_id,
            )

            self.gamification.award_task_xp(
                user,
            )

            self.activity.log(
                user_id=user_id,
                action="TASK_COMPLETED",
                description=f"Completed task '{updated_task.title}'",
            )

            self.notification.notify(
                user_id=user_id,
                title="Task Completed",
                message=f"You completed '{updated_task.title}'.",
            )

        return updated_task

    def delete_task(
        self,
        task_id: int,
        user_id: int,
    ):
        task = self.get_task(
            task_id,
            user_id,
        )

        self.repository.delete(
            task,
        )

        self.activity.log(
            user_id=user_id,
            action="TASK_DELETED",
            description=f"Deleted task '{task.title}'",
        )

        self.notification.notify(
            user_id=user_id,
            title="Task Deleted",
            message=f"Task '{task.title}' was deleted.",
        )

