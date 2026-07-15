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


class CropAdvice(BaseModel):
    crop_name: str

    summary: str

    why_this_crop: str

    watering_strategy: str

    fertilizer_plan: str

    disease_prevention: str

    harvesting_tips: str

    balcony_tips: str

    common_mistakes: list[str]

    model_config = ConfigDict(
        from_attributes=True,
    )


class FarmAdviceResponse(BaseModel):
    advice: CropAdvice