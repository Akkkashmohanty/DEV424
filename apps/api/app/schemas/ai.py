from pydantic import BaseModel, ConfigDict


class FarmAdviceRequest(BaseModel):
    city: str
    crop_name: str
    garden_type: str
    garden_size: str
    sunlight: str
    water_availability: str
    temperature: float
    humidity: float
    season: str

    # NEW
    budget: float | None = None
    experience_level: str = "Beginner"
    goals: list[str] = []
    preferred_crops: list[str] = []
    avoid_crops: list[str] = []
    organic_only: bool = False


class CropAdvice(BaseModel):

    crop_name: str

    summary: str

    why_this_crop: str

    recommended_crops: list[str] = []

    companion_plants: list[str] = []

    watering_strategy: str

    watering_schedule: list[str] = []

    fertilizer_plan: str

    fertilizer_schedule: list[str] = []

    disease_prevention: str

    harvesting_tips: str

    harvest_timeline: str = ""

    estimated_yield: str = ""

    seasonal_warnings: list[str] = []

    sustainability_tips: list[str] = []

    next_actions: list[str] = []

    balcony_tips: str

    common_mistakes: list[str]

    model_config = ConfigDict(from_attributes=True)


class FarmAdviceResponse(BaseModel):
    advice: CropAdvice