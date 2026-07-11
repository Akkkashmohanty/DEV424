from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.repositories.farm_intelligence_repository import (
    FarmIntelligenceRepository,
)

from app.services.farm_intelligence_service import (
    FarmIntelligenceService,
)

from app.schemas.farm_intelligence import (
    FarmRecommendationRequest,
    FarmRecommendationResponse,
)


router = APIRouter(
    prefix="/farm-intelligence",
    tags=["Farm Intelligence"],
)


def get_farm_intelligence_service(
    db: Session = Depends(get_db),
) -> FarmIntelligenceService:
    return FarmIntelligenceService(
        repository=FarmIntelligenceRepository(db),
    )


@router.post(
    "/recommend",
    response_model=FarmRecommendationResponse,
)
def recommend_crops(
    payload: FarmRecommendationRequest,
    service: FarmIntelligenceService = Depends(
        get_farm_intelligence_service,
    ),
):
    return service.recommend_crops(
        payload,
    )