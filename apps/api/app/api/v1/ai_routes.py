import traceback
from fastapi import APIRouter, HTTPException

from app.schemas.ai import (
    FarmAdviceRequest,
    FarmAdviceResponse,
)

from app.services.ai_service import AIService

router = APIRouter(
    prefix="/ai",
    tags=["AI Assistant"],
)

service = AIService()


@router.post(
    "/farm-advice",
    response_model=FarmAdviceResponse,
)
def get_farm_advice(
    payload: FarmAdviceRequest,
):
    try:
        return service.get_farm_advice(payload)
    except Exception:
        traceback.print_exc()
        raise