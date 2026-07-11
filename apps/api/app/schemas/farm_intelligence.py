from pydantic import BaseModel, ConfigDict


# ==========================================================
# REQUEST
# ==========================================================

class FarmRecommendationRequest(BaseModel):
    city: str
    garden_type: str
    garden_size: str
    sunlight: str
    water_availability: str
    temperature: float
    humidity: float
    season: str


# ==========================================================
# RESPONSE
# ==========================================================

class CropRecommendation(BaseModel):
    id: int
    name: str
    category: str
    score: int
    reason: str

    model_config = ConfigDict(
        from_attributes=True,
    )


class FarmRecommendationResponse(BaseModel):
    recommendations: list[CropRecommendation]