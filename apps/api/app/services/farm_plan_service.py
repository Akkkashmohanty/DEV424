from fastapi import HTTPException, status

from app.models.farm_plan import FarmPlan

from app.repositories.crop_repository import CropRepository

from app.repositories.farm_plan_repository import (
    FarmPlanRepository,
)

from app.schemas.farm_plan import (
    FarmPlanCreate,
    FarmPlanUpdate,
    FarmDashboardResponse,
    CropRecommendationResponse,
)


class FarmPlanService:
    def __init__(
        self,
        repository: FarmPlanRepository,
        crop_repository: CropRepository,
    ):
        self.repository = repository
        self.crop_repository = crop_repository

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

    def get_dashboard_summary(
        self,
        user_id: int,
    ) -> FarmDashboardResponse:
        return self.repository.get_dashboard_summary(
            user_id,
        )

    def get_harvest_timeline(
        self,
        user_id: int,
    ):
        return self.repository.get_harvest_timeline(
            user_id,
        )

    def get_watering_schedule(
        self,
        user_id: int,
    ):
        return self.repository.get_watering_schedule(
            user_id,
        )

    def get_crop_lifecycle(
        self,
        user_id: int,
    ):
        return self.repository.get_crop_lifecycle(
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

    def get_recommendations(
        self,
        season: str,
        sunlight: str,
        water: str,
    ):
        crops = self.crop_repository.list_active()

        recommendations = []

        for crop in crops:
            score = 0

            crop_seasons = {
                s.season.lower()
                for s in crop.seasons
            }

            if season.lower() in crop_seasons:
                score += 40

            if (
                crop.sunlight_requirement.lower()
                == sunlight.lower()
            ):
                score += 30

            if (
                crop.water_requirement.lower()
                == water.lower()
            ):
                score += 30

            if score == 0:
                continue

            recommendations.append(
                {
                    "id": crop.id,
                    "crop": crop.name,
                    "category": crop.category,
                    "difficulty": crop.difficulty,
                    "harvest_days": crop.harvest_days,
                    "water_requirement": crop.water_requirement,
                    "sunlight_requirement": crop.sunlight_requirement,
                    "recommendation_score": score,
                }
            )

        recommendations.sort(
            key=lambda item: item["recommendation_score"],
            reverse=True,
        )

        return recommendations