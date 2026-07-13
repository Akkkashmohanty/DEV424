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

from app.services.farm_plan_generator_service import (
    FarmPlanGeneratorService,
)

from app.schemas.farm_plan_generator import (
    FarmPlanGeneratorRequest,
    FarmPlanGeneratorResponse,
)


router = APIRouter(
    prefix="/farm-plans",
    tags=["Farm Plan Generator"],
)


def get_farm_plan_generator_service(
    db: Session = Depends(get_db),
) -> FarmPlanGeneratorService:

    intelligence_service = FarmIntelligenceService(
        repository=FarmIntelligenceRepository(db),
    )

    return FarmPlanGeneratorService(
        intelligence_service=intelligence_service,
    )


@router.post(
    "/generate",
    response_model=FarmPlanGeneratorResponse,
)
def generate_plan(
    payload: FarmPlanGeneratorRequest,
    service: FarmPlanGeneratorService = Depends(
        get_farm_plan_generator_service,
    ),
):

    return service.generate_plan(
        payload,
    )