from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
)


# ==========================================================
# CREATE CROP
# ==========================================================

class FarmPlanCropCreate(BaseModel):
    crop_name: str
    planting_date: str
    expected_harvest_date: str
    watering_frequency: str


# ==========================================================
# CREATE FARM PLAN
# ==========================================================

class FarmPlanCreate(BaseModel):
    city: str
    garden_type: str
    garden_size: str
    sunlight: str
    water_availability: str
    crops: list[FarmPlanCropCreate] = []


# ==========================================================
# UPDATE FARM PLAN
# ==========================================================

class FarmPlanUpdate(BaseModel):
    city: str | None = None
    garden_type: str | None = None
    garden_size: str | None = None
    sunlight: str | None = None
    water_availability: str | None = None
    status: str | None = None


# ==========================================================
# FARM PLAN CROP RESPONSE
# ==========================================================

class FarmPlanCropResponse(BaseModel):
    id: int
    crop_name: str
    planting_date: str
    expected_harvest_date: str
    watering_frequency: str
    status: str

    model_config = ConfigDict(
        from_attributes=True,
    )


# ==========================================================
# FARM PLAN RESPONSE
# ==========================================================

class FarmPlanResponse(BaseModel):
    id: int
    user_id: int
    city: str
    garden_type: str
    garden_size: str
    sunlight: str
    water_availability: str
    status: str
    created_at: datetime

    crops: list[FarmPlanCropResponse]

    model_config = ConfigDict(
        from_attributes=True,
    )


class FarmDashboardResponse(BaseModel):
    active_crops: int
    water_today: int
    harvest_soon: int
    planner_tasks: int

    model_config = ConfigDict(
        from_attributes=True,
    )

class CropRecommendationResponse(BaseModel):
    id: int
    crop: str
    category: str
    difficulty: str
    harvest_days: int
    water_requirement: str
    sunlight_requirement: str
    recommendation_score: int

    model_config = ConfigDict(
        from_attributes=True,
    )


class HarvestTimelineItemResponse(BaseModel):
    crop_name: str
    planting_date: str
    expected_harvest_date: str
    status: str

    model_config = ConfigDict(
        from_attributes=True,
    )

class WaterScheduleItemResponse(BaseModel):
    crop_name: str
    watering_frequency: str
    next_watering: str
    status: str

    model_config = ConfigDict(
        from_attributes=True,
    )

class CropLifecycleItemResponse(BaseModel):
    crop_name: str
    planting_date: str
    expected_harvest_date: str
    status: str
    progress: int

    model_config = ConfigDict(from_attributes=True)

    