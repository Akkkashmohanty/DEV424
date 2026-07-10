from fastapi import (
    APIRouter,
    Depends,
    Query,
)

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.repositories.marketplace_repository import (
    MarketplaceRepository,
)

from app.services.marketplace_service import (
    MarketplaceService,
)

from app.schemas.marketplace import (
    MarketplaceSummary,
    TopProduct,
    OrderStatusSummary,
)

router = APIRouter(
    prefix="/marketplace/analytics",
    tags=["Marketplace Analytics"],
)


def get_marketplace_service(
    db: Session,
) -> MarketplaceService:
    return MarketplaceService(
        MarketplaceRepository(db),
    )


@router.get(
    "/summary",
    response_model=MarketplaceSummary,
)
def summary(
    db: Session = Depends(get_db),
):
    service = get_marketplace_service(db)

    return service.get_summary()


@router.get(
    "/top-products",
    response_model=list[TopProduct],
)
def top_products(
    limit: int = Query(
        default=5,
        ge=1,
        le=20,
    ),
    db: Session = Depends(get_db),
):
    service = get_marketplace_service(db)

    return service.get_top_products(limit)


@router.get(
    "/order-status",
    response_model=OrderStatusSummary,
)
def order_status(
    db: Session = Depends(get_db),
):
    service = get_marketplace_service(db)

    return service.get_order_status_summary()