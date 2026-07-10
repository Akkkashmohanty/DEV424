from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
)


# ==========================================================
# CREATE
# ==========================================================

class CropCreate(BaseModel):
    name: str
    scientific_name: str | None = None
    category: str
    difficulty: str

    description: str | None = None

    ideal_temperature_min: float
    ideal_temperature_max: float

    sunlight_requirement: str
    water_requirement: str

    soil_type: str

    ph_min: float
    ph_max: float

    spacing_cm: int

    harvest_days: int

    image_url: str | None = None

    humidity_min: int
    humidity_max: int

    rainfall_preference: str

    companion_plants: str | None = None

    common_diseases: str | None = None

    


# ==========================================================
# UPDATE
# ==========================================================

class CropUpdate(BaseModel):
    name: str | None = None
    scientific_name: str | None = None
    category: str | None = None
    difficulty: str | None = None

    description: str | None = None

    ideal_temperature_min: float | None = None
    ideal_temperature_max: float | None = None

    sunlight_requirement: str | None = None
    water_requirement: str | None = None

    soil_type: str | None = None

    ph_min: float | None = None
    ph_max: float | None = None

    spacing_cm: int | None = None

    harvest_days: int | None = None

    image_url: str | None = None

    is_active: bool | None = None

    humidity_min: int | None = None
    humidity_max: int | None = None

    rainfall_preference: str | None = None

    companion_plants: str | None = None

    common_diseases: str | None = None


# ==========================================================
# RESPONSE
# ==========================================================

class CropResponse(BaseModel):
    id: int

    name: str
    scientific_name: str | None

    category: str
    difficulty: str

    description: str | None

    ideal_temperature_min: float
    ideal_temperature_max: float

    sunlight_requirement: str
    water_requirement: str

    soil_type: str

    ph_min: float
    ph_max: float

    spacing_cm: int

    harvest_days: int

    image_url: str | None

    is_active: bool

    humidity_min: int
    humidity_max: int

    rainfall_preference: str

    companion_plants: str | None

    common_diseases: str | None

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )