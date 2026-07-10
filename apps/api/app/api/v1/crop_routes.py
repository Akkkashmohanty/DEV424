from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.repositories.crop_repository import (
    CropRepository,
)

from app.services.crop_service import (
    CropService,
)

from app.schemas.crop import (
    CropCreate,
    CropUpdate,
    CropResponse,
)

router = APIRouter(
    prefix="/crops",
    tags=["Crop Management"],
)


def get_crop_service(
    db: Session,
) -> CropService:
    return CropService(
        CropRepository(db),
    )


@router.post(
    "",
    response_model=CropResponse,
)
def create_crop(
    payload: CropCreate,
    db: Session = Depends(get_db),
):
    service = get_crop_service(db)

    return service.create_crop(payload)


@router.get(
    "",
    response_model=list[CropResponse],
)
def list_crops(
    db: Session = Depends(get_db),
):
    service = get_crop_service(db)

    return service.list_crops()


@router.get(
    "/{crop_id}",
    response_model=CropResponse,
)
def get_crop(
    crop_id: int,
    db: Session = Depends(get_db),
):
    service = get_crop_service(db)

    return service.get_crop(crop_id)


@router.patch(
    "/{crop_id}",
    response_model=CropResponse,
)
def update_crop(
    crop_id: int,
    payload: CropUpdate,
    db: Session = Depends(get_db),
):
    service = get_crop_service(db)

    return service.update_crop(
        crop_id,
        payload,
    )


@router.delete(
    "/{crop_id}",
)
def delete_crop(
    crop_id: int,
    db: Session = Depends(get_db),
):
    service = get_crop_service(db)

    return service.delete_crop(
        crop_id,
    )