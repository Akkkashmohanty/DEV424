from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
)


class FarmPlanCropCreate(BaseModel):
    crop_name: str
    planting_date: str
    expected_harvest_date: str
    watering_frequency: str


class FarmPlanCreate(BaseModel):
    city: str
    garden_type: str
    garden_size: str
    sunlight: str
    water_availability: str
    crops: list[FarmPlanCropCreate]


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