from sqlalchemy.orm import (
    Session,
    joinedload,
)

from app.models.farm_plan import FarmPlan


class FarmPlanRepository:
    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create(
        self,
        farm_plan: FarmPlan,
        commit: bool = True,
    ) -> FarmPlan:
        self.db.add(farm_plan)

        if commit:
            self.db.commit()
            self.db.refresh(farm_plan)

        return farm_plan

    def save(
        self,
        farm_plan: FarmPlan,
        commit: bool = True,
    ) -> FarmPlan:
        if commit:
            self.db.commit()
            self.db.refresh(farm_plan)

        return farm_plan

    def get_by_id(
        self,
        farm_plan_id: int,
    ) -> FarmPlan | None:
        return (
            self.db.query(FarmPlan)
            .options(
                joinedload(
                    FarmPlan.crops,
                )
            )
            .filter(
                FarmPlan.id == farm_plan_id,
            )
            .first()
        )

    def get_by_user_and_id(
        self,
        user_id: int,
        farm_plan_id: int,
    ) -> FarmPlan | None:
        return (
            self.db.query(FarmPlan)
            .options(
                joinedload(
                    FarmPlan.crops,
                )
            )
            .filter(
                FarmPlan.user_id == user_id,
                FarmPlan.id == farm_plan_id,
            )
            .first()
        )

    def get_by_user(
        self,
        user_id: int,
    ) -> list[FarmPlan]:
        return (
            self.db.query(FarmPlan)
            .options(
                joinedload(
                    FarmPlan.crops,
                )
            )
            .filter(
                FarmPlan.user_id == user_id,
            )
            .order_by(
                FarmPlan.created_at.desc(),
            )
            .all()
        )

    def delete(
        self,
        farm_plan: FarmPlan,
        commit: bool = True,
    ):
        self.db.delete(farm_plan)

        if commit:
            self.db.commit()

    def flush(
        self,
    ):
        self.db.flush()