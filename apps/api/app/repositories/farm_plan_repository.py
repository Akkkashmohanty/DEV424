from datetime import datetime

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

    def get_dashboard_summary(
        self,
        user_id: int,
    ):
        plans = self.get_by_user(user_id)

        active_crops = 0
        water_today = 0
        harvest_soon = 0
        planner_tasks = 0

        for plan in plans:
            active_crops += len(plan.crops)

            for crop in plan.crops:
                planner_tasks += 1

                if crop.status.upper() == "ACTIVE":
                    water_today += 1

                if crop.status.upper() == "HARVEST":
                    harvest_soon += 1

        return {
            "active_crops": active_crops,
            "water_today": water_today,
            "harvest_soon": harvest_soon,
            "planner_tasks": planner_tasks,
        }

    def get_harvest_timeline(
        self,
        user_id: int,
    ):
        plans = self.get_by_user(user_id)

        timeline = []

        for plan in plans:
            for crop in plan.crops:
                timeline.append(crop)

        return sorted(
            timeline,
            key=lambda item: item.expected_harvest_date,
        )

    def get_water_schedule(
        self,
        user_id: int,
    ):
        plans = self.get_by_user(user_id)

        schedule = []

        for plan in plans:
            for crop in plan.crops:
                schedule.append(crop)

        return schedule

    def get_crop_lifecycle(
        self,
        user_id: int,
    ):
        plans = self.get_by_user(user_id)

        lifecycle = []

        today = datetime.today().date()

        for plan in plans:
            for crop in plan.crops:
                try:
                    planting = datetime.strptime(
                        crop.planting_date,
                        "%Y-%m-%d",
                    ).date()

                    harvest = datetime.strptime(
                        crop.expected_harvest_date,
                        "%Y-%m-%d",
                    ).date()

                    total_days = max(
                        (harvest - planting).days,
                        1,
                    )

                    completed_days = max(
                        min(
                            (today - planting).days,
                            total_days,
                        ),
                        0,
                    )

                    progress = int(
                        (completed_days / total_days) * 100
                    )

                except ValueError:
                    progress = 0

                lifecycle.append(
                    {
                        "crop_name": crop.crop_name,
                        "planting_date": crop.planting_date,
                        "expected_harvest_date": crop.expected_harvest_date,
                        "status": crop.status,
                        "progress": progress,
                    }
                )

        return lifecycle
