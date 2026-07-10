from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError

from app.core.constants import (
    OrderStatus,
    PaymentStatus,
)

from app.repositories.order_repository import OrderRepository
from app.repositories.order_item_repository import OrderItemRepository
from app.repositories.product_repository import ProductRepository
from app.repositories.user_repository import UserRepository

from app.services.activity_service import ActivityService
from app.services.notification_service import NotificationService

from app.schemas.order import OrderCreate

from app.models.order import Order
from app.models.order_item import OrderItem


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
        self.order_item_repository = order_item_repository
        self.product_repository = product_repository
        self.user_repository = user_repository
        self.activity_service = activity_service
        self.notification_service = notification_service

    def create_order(
        self,
        user_id: int,
        payload: OrderCreate,
    ):
        user = self.user_repository.get_by_id(user_id)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        if not payload.items:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Order must contain at least one item.",
            )

        try:
            order = Order(
                user_id=user_id,
                shipping_address=payload.shipping_address,
                total_amount=0,
                status=OrderStatus.PLACED.value,
                payment_status=PaymentStatus.PENDING.value,
            )

            self.order_repository.create(
                order,
                commit=False,
            )

            self.order_repository.flush()

            total_amount = 0
            order_items: list[OrderItem] = []

            product_ids = [item.product_id for item in payload.items]

            products = {
                product.id: product
                for product in self.product_repository.get_by_ids(
                    product_ids
                )
            }

            for item in payload.items:

                if item.quantity <= 0:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Quantity must be greater than zero.",
                    )

                product = products.get(item.product_id)

                if not product:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Product {item.product_id} not found.",
                    )

                if not product.is_active:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=f"{product.name} is unavailable.",
                    )

                if product.stock < item.quantity:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=f"Insufficient stock for {product.name}.",
                    )

                total_amount += product.price * item.quantity

                order_items.append(
                    OrderItem(
                        order_id=order.id,
                        product_id=product.id,
                        quantity=item.quantity,
                        price=product.price,
                    )
                )

                product.stock -= item.quantity

                self.product_repository.save(
                    product,
                    commit=False,
                )

            self.order_item_repository.create_many(
                order_items,
                commit=False,
            )

            order.total_amount = total_amount

            self.order_repository.save(
                order,
                commit=False,
            )

            self.order_repository.db.commit()

            self.order_repository.db.refresh(order)

        except SQLAlchemyError:
            self.order_repository.db.rollback()

            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create order.",
            )

        self.activity_service.log(
            user_id=user_id,
            action="ORDER_CREATED",
            description=f"Created order #{order.id}",
        )

        self.notification_service.notify(
            user_id=user_id,
            title="Order Created",
            message=f"Your order #{order.id} has been placed successfully.",
        )

        return self.order_repository.get_by_id(order.id)

    def list_orders(
        self,
        user_id: int,
    ):
        return self.order_repository.get_by_user(user_id)

    def get_order(
        self,
        order_id: int,
        user_id: int,
    ):
        order = self.order_repository.get_by_user_and_id(
            user_id,
            order_id,
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
        order = self.order_repository.get_by_user_and_id(
            user_id,
            order_id,
        )

        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found",
            )

        if order.status in [
            OrderStatus.CANCELLED.value,
            OrderStatus.DELIVERED.value,
        ]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Order cannot be cancelled because it is {order.status.lower()}.",
            )

        try:

            for item in order.items:
                product = self.product_repository.get_by_id(
                    item.product_id,
                )

                if product:
                    product.stock += item.quantity

                    self.product_repository.save(
                        product,
                        commit=False,
                    )

            order.status = OrderStatus.CANCELLED.value

            if order.payment_status == PaymentStatus.PAID.value:
                order.payment_status = PaymentStatus.REFUND_PENDING.value

            self.order_repository.save(
                order,
                commit=False,
            )

            self.order_repository.db.commit()

            self.order_repository.db.refresh(order)

        except SQLAlchemyError:
            self.order_repository.db.rollback()

            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to cancel order.",
            )

        self.activity_service.log(
            user_id=user_id,
            action="ORDER_CANCELLED",
            description=f"Cancelled order #{order.id}",
        )

        self.notification_service.notify(
            user_id=user_id,
            title="Order Cancelled",
            message=f"Order #{order.id} has been cancelled successfully.",
        )

        return order

    def list_seller_orders(
        self,
        seller_id: int,
    ):
        return self.order_repository.get_by_seller(
            seller_id,
        )

    def update_order_status(
        self,
        order_id: int,
        seller_id: int,
        status_in: str,
    ):
        order = self.order_repository.get_by_id(
            order_id,
        )

        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found.",
            )

        seller_has_access = False

        for item in order.items:
            product = self.product_repository.get_by_id(
                item.product_id,
            )

            if product and product.seller_id == seller_id:
                seller_has_access = True
                break

        if not seller_has_access:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not allowed to manage this order.",
            )

        if order.status in [
            OrderStatus.CANCELLED.value,
            OrderStatus.DELIVERED.value,
        ]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Order is already {order.status.lower()}.",
            )

        allowed_statuses = {
            OrderStatus.CONFIRMED.value,
            OrderStatus.PROCESSING.value,
            OrderStatus.PACKED.value,
            OrderStatus.SHIPPED.value,
            OrderStatus.DELIVERED.value,
            OrderStatus.CANCELLED.value,
        }

        if status_in not in allowed_statuses:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid order status.",
            )

        if order.status == status_in:
            return order

        order = self.order_repository.update_status(
            order,
            status_in,
            commit=False,
        )

        self.order_repository.db.commit()
        self.order_repository.db.refresh(order)

        self.activity_service.log(
            user_id=order.user_id,
            action="ORDER_STATUS_UPDATED",
            description=f"Order #{order.id} updated to {status_in}.",
        )

        self.notification_service.notify(
            user_id=order.user_id,
            title="Order Updated",
            message=f"Your order #{order.id} is now {status_in}.",
        )

        return order
