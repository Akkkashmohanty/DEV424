from fastapi import (
    APIRouter,
    Depends,
    Query,
)
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.db.database import get_db

from app.models.user import User

from app.repositories.product_repository import (
    ProductRepository,
)

from app.schemas.product import (
    ProductCreate,
    ProductUpdate,
    ProductResponse,
)

from app.services.product_service import (
    ProductService,
)

router = APIRouter(
    prefix="/products",
    tags=["Products"],
)


def get_product_service(
    db: Session,
) -> ProductService:
    repository = ProductRepository(db)

    return ProductService(
        repository,
    )


@router.post(
    "",
    response_model=ProductResponse,
)
def create_product(
    payload: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_product_service(db)

    return service.create_product(
        current_user.id,
        payload,
    )


@router.get(
    "",
    response_model=list[ProductResponse],
)
def list_products(
    search: str | None = Query(
        default=None,
    ),
    category: str | None = Query(
        default=None,
    ),
    min_price: float | None = Query(
        default=None,
        ge=0,
    ),
    max_price: float | None = Query(
        default=None,
        ge=0,
    ),
    page: int = Query(
        default=1,
        ge=1,
    ),
    limit: int = Query(
        default=10,
        ge=1,
        le=100,
    ),
    db: Session = Depends(get_db),
):
    service = get_product_service(db)

    return service.list_products(
        search=search,
        category=category,
        min_price=min_price,
        max_price=max_price,
        page=page,
        limit=limit,
    )


@router.get(
    "/me",
    response_model=list[ProductResponse],
)
def list_my_products(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_product_service(db)

    return service.list_my_products(
        current_user.id,
    )


@router.get(
    "/{product_id}",
    response_model=ProductResponse,
)
def get_product(
    product_id: int,
    db: Session = Depends(get_db),
):
    service = get_product_service(db)

    return service.get_product(
        product_id,
    )


@router.patch(
    "/{product_id}",
    response_model=ProductResponse,
)
def update_product(
    product_id: int,
    payload: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_product_service(db)

    return service.update_product(
        product_id,
        current_user.id,
        payload,
    )


@router.delete(
    "/{product_id}",
)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_product_service(db)

    service.delete_product(
        product_id,
        current_user.id,
    )

    return {
        "message": "Product deleted successfully",
    }