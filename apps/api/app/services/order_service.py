from fastapi import HTTPException, status

from app.repositories.order_repository import OrderRepository
from app.repositories.order_item_repository import (
    OrderItemRepository,
)
from app.repositories.product_repository import (
    ProductRepository,
)
from app.repositories.user_repository import UserRepository

from app.services.activity_service import ActivityService
from app.services.notification_service import (
    NotificationService,
)

from app.schemas.order import (
    OrderCreate,
)


class OrderService:
    def __init__(
        self,
        order_repository: OrderRepository,
        order_item_repository: OrderItemRepository,
        product_repository: ProductRepository,
        user_repository: UserRepository,
        activity_service: ActivityService,
        notification_service: NotificationService,
    ):
        self.order_repository = order_repository
        self.order_item_repository = (
            order_item_repository
        )
        self.product_repository = (
            product_repository
        )
        self.user_repository = (
            user_repository
        )
        self.activity_service = (
            activity_service
        )
        self.notification_service = (
            notification_service
        )

    def create_order(
        self,
        user_id: int,
        payload: OrderCreate,
    ):
        raise NotImplementedError

    def list_orders(
        self,
        user_id: int,
    ):
        return self.order_repository.get_by_user(
            user_id,
        )

    def get_order(
        self,
        order_id: int,
        user_id: int,
    ):
        order = (
            self.order_repository.get_by_user_and_id(
                user_id,
                order_id,
            )
        )

        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found",
            )

        return order

    def cancel_order(
        self,
        order_id: int,
        user_id: int,
    ):
        order = (
            self.order_repository.get_by_user_and_id(
                user_id,
                order_id,
            )
        )

        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found",
            )

        self.order_repository.delete(
            order,
        )

        self.activity_service.log(
            user_id=user_id,
            action="ORDER_CANCELLED",
            description=f"Cancelled order #{order.id}",
        )

        self.notification_service.notify(
            user_id=user_id,
            title="Order Cancelled",
            message=f"Order #{order.id} has been cancelled.",
        )

        return {
            "message": "Order cancelled successfully",
        }