from fastapi import HTTPException, status

from app.models.crop import Crop

from app.repositories.crop_repository import (
    CropRepository,
)

from app.schemas.crop import (
    CropCreate,
    CropUpdate,
)


class CropService:
    def __init__(
        self,
        repository: CropRepository,
    ):
        self.repository = repository

    def create_crop(
        self,
        payload: CropCreate,
    ):
        existing = self.repository.get_by_name(
            payload.name.strip(),
        )

        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Crop already exists.",
            )

        crop = Crop(
            name=payload.name.strip(),
            scientific_name=payload.scientific_name,
            category=payload.category,
            difficulty=payload.difficulty,
            description=payload.description,
            ideal_temperature_min=payload.ideal_temperature_min,
            ideal_temperature_max=payload.ideal_temperature_max,
            sunlight_requirement=payload.sunlight_requirement,
            water_requirement=payload.water_requirement,
            soil_type=payload.soil_type,
            ph_min=payload.ph_min,
            ph_max=payload.ph_max,
            spacing_cm=payload.spacing_cm,
            harvest_days=payload.harvest_days,
            image_url=payload.image_url,
            humidity_min=payload.humidity_min,
            humidity_max=payload.humidity_max,
            rainfall_preference=payload.rainfall_preference,
            companion_plants=payload.companion_plants,
            common_diseases=payload.common_diseases,
            is_active=True,
        )

        return self.repository.create(
            crop,
        )

    def list_crops(
        self,
    ):
        return self.repository.list_active()

    def get_crop(
        self,
        crop_id: int,
    ):
        crop = self.repository.get_by_id(
            crop_id,
        )

        if not crop:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Crop not found.",
            )

        return crop

    def update_crop(
        self,
        crop_id: int,
        payload: CropUpdate,
    ):
        crop = self.get_crop(
            crop_id,
        )

        data = payload.model_dump(
            exclude_unset=True,
        )

        for key, value in data.items():
            setattr(
                crop,
                key,
                value,
            )

        return self.repository.save(
            crop,
        )

    def delete_crop(
        self,
        crop_id: int,
    ):
        crop = self.get_crop(
            crop_id,
        )

        self.repository.delete(
            crop,
        )

        return {
            "message": "Crop deleted successfully."
        }