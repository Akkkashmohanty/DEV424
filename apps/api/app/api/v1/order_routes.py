from fastapi import (
    APIRouter,
    Depends,
)
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.db.database import get_db

from app.models.user import User

from app.repositories.order_repository import (
    OrderRepository,
)
from app.repositories.order_item_repository import (
    OrderItemRepository,
)
from app.repositories.product_repository import (
    ProductRepository,
)
from app.repositories.user_repository import (
    UserRepository,
)
from app.repositories.activity_repository import (
    ActivityRepository,
)
from app.repositories.notification_repository import (
    NotificationRepository,
)

from app.services.activity_service import (
    ActivityService,
)
from app.services.notification_service import (
    NotificationService,
)
from app.services.order_service import (
    OrderService,
)

from app.schemas.order import (
    OrderCreate,
    OrderResponse,
)

router = APIRouter(
    prefix="/orders",
    tags=["Orders"],
)


def get_order_service(
    db: Session,
) -> OrderService:
    return OrderService(
        order_repository=OrderRepository(db),
        order_item_repository=OrderItemRepository(db),
        product_repository=ProductRepository(db),
        user_repository=UserRepository(db),
        activity_service=ActivityService(
            ActivityRepository(db),
        ),
        notification_service=NotificationService(
            NotificationRepository(db),
        ),
    )


@router.post(
    "",
    response_model=OrderResponse,
)
def create_order(
    payload: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_order_service(db)

    return service.create_order(
        current_user.id,
        payload,
    )


@router.get(
    "",
    response_model=list[OrderResponse],
)
def list_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_order_service(db)

    return service.list_orders(
        current_user.id,
    )


@router.get(
    "/{order_id}",
    response_model=OrderResponse,
)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_order_service(db)

    return service.get_order(
        order_id,
        current_user.id,
    )


@router.delete(
    "/{order_id}",
)
def cancel_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = get_order_service(db)

    return service.cancel_order(
        order_id,
        current_user.id,
    )