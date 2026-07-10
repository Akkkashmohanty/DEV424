from fastapi import HTTPException, status

from app.models.farm_plan import FarmPlan

from app.repositories.farm_plan_repository import (
    FarmPlanRepository,
)

from app.schemas.farm_plan import (
    FarmPlanCreate,
    FarmPlanUpdate,
)


class FarmPlanService:
    def __init__(
        self,
        repository: FarmPlanRepository,
    ):
        self.repository = repository

    def create_farm_plan(
        self,
        user_id: int,
        payload: FarmPlanCreate,
    ):
        farm_plan = FarmPlan(
            user_id=user_id,
            city=payload.city.strip(),
            garden_type=payload.garden_type,
            garden_size=payload.garden_size,
            sunlight=payload.sunlight,
            water_availability=payload.water_availability,
            status="ACTIVE",
        )

        return self.repository.create(
            farm_plan,
        )

    def list_my_farm_plans(
        self,
        user_id: int,
    ):
        return self.repository.get_by_user(
            user_id,
        )

    def get_farm_plan(
        self,
        farm_plan_id: int,
        user_id: int,
    ):
        farm_plan = self.repository.get_by_user_and_id(
            user_id,
            farm_plan_id,
        )

        if not farm_plan:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Farm plan not found.",
            )

        return farm_plan

    def update_farm_plan(
        self,
        farm_plan_id: int,
        user_id: int,
        payload: FarmPlanUpdate,
    ):
        farm_plan = self.get_farm_plan(
            farm_plan_id,
            user_id,
        )

        data = payload.model_dump(
            exclude_unset=True,
        )

        for key, value in data.items():
            setattr(
                farm_plan,
                key,
                value,
            )

        return self.repository.save(
            farm_plan,
        )

    def delete_farm_plan(
        self,
        farm_plan_id: int,
        user_id: int,
    ):
        farm_plan = self.get_farm_plan(
            farm_plan_id,
            user_id,
        )

        self.repository.delete(
            farm_plan,
        )

        return {
            "message": "Farm plan deleted successfully."
        }