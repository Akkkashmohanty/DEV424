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