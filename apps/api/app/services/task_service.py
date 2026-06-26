from fastapi import HTTPException, status

from app.repositories.task_repository import TaskRepository
from app.schemas.task import TaskCreate, TaskUpdate


class TaskService:
    def __init__(
        self,
        repository: TaskRepository,
    ):
        self.repository = repository

    def create_task(
        self,
        user_id: int,
        payload: TaskCreate,
    ):
        return self.repository.create(
            user_id=user_id,
            payload=payload,
        )

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

        return self.repository.update(
            task,
            payload,
        )

    def delete_task(
        self,
        task_id: int,
        user_id: int,
    ):
        task = self.get_task(
            task_id,
            user_id,
        )

        self.repository.delete(task)