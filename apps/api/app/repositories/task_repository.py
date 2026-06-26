from sqlalchemy.orm import Session

from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate


class TaskRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        user_id: int,
        payload: TaskCreate,
    ) -> Task:

        task = Task(
            user_id=user_id,
            title=payload.title,
            crop_name=payload.crop_name,
            priority=payload.priority,
        )

        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)

        return task

    def get_all_by_user(
        self,
        user_id: int,
    ) -> list[Task]:

        return (
            self.db.query(Task)
            .filter(Task.user_id == user_id)
            .order_by(Task.created_at.desc())
            .all()
        )

    def get_by_id(
        self,
        task_id: int,
        user_id: int,
    ) -> Task | None:

        return (
            self.db.query(Task)
            .filter(
                Task.id == task_id,
                Task.user_id == user_id,
            )
            .first()
        )

    def update(
        self,
        task: Task,
        payload: TaskUpdate,
    ) -> Task:

        update_data = payload.model_dump(
            exclude_unset=True
        )

        for field, value in update_data.items():
            setattr(task, field, value)

        self.db.commit()
        self.db.refresh(task)

        return task

    def delete(
        self,
        task: Task,
    ) -> None:

        self.db.delete(task)
        self.db.commit()