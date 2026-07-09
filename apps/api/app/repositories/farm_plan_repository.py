from sqlalchemy.orm import Session

from app.models.farm_plan import FarmPlan


class FarmPlanRepository:
    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create(
        self,
        plan: FarmPlan,
    ) -> FarmPlan:
        self.db.add(plan)
        self.db.commit()
        self.db.refresh(plan)
        return plan

    def save(
        self,
        plan: FarmPlan,
    ) -> FarmPlan:
        self.db.commit()
        self.db.refresh(plan)
        return plan

    def get_by_id(
        self,
        plan_id: int,
    ) -> FarmPlan | None:
        return (
            self.db.query(FarmPlan)
            .filter(
                FarmPlan.id == plan_id,
            )
            .first()
        )

    def get_by_user(
        self,
        user_id: int,
    ) -> list[FarmPlan]:
        return (
            self.db.query(FarmPlan)
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
        plan: FarmPlan,
    ) -> None:
        self.db.delete(plan)
        self.db.commit()