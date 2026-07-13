from datetime import date
from pydantic import BaseModel


class FarmPlanGeneratorRequest(BaseModel):
    city: str
    garden_type: str
    garden_size: str
    sunlight: str
    water_availability: str


class CropTaskResponse(BaseModel):
    day: int
    title: str
    description: str | None = None


class WateringScheduleResponse(BaseModel):
    day: str
    time: str


class TimelineResponse(BaseModel):
    day: int
    title: str
    description: str


class ProgressResponse(BaseModel):
    current_day: int
    total_days: int
    remaining_days: int


class GeneratedCropPlan(BaseModel):

    crop_id: int

    crop_name: str

    score: int

    planting_date: date

    expected_harvest_date: date

    watering_frequency: str

    watering_schedule: list[WateringScheduleResponse]

    timeline: list[TimelineResponse]

    tasks: list[CropTaskResponse]

    sustainability_tips: list[str]

    progress: ProgressResponse


class FarmPlanGeneratorResponse(BaseModel):

    recommendations: list[GeneratedCropPlan]