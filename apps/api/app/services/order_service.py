from fastapi import HTTPException, status

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
        from app.models.order import Order
        from app.models.order_item import OrderItem

        user = self.user_repository.get_by_id(
            user_id,
        )

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        order = Order(
            user_id=user_id,
            shipping_address=payload.shipping_address,
            total_amount=0,
            status="PENDING",
            payment_status="PENDING",
        )

        self.order_repository.create(
            order,
            commit=False,
        )

        self.order_repository.flush()

        total_amount = 0

        order_items: list[OrderItem] = []

        product_ids = [
            item.product_id
            for item in payload.items
        ]

        products = {
            product.id: product
            for product in self.product_repository.get_by_ids(
                product_ids,
            )
        }

        for item in payload.items:
            product = products.get(
                item.product_id,
            )

            if not product:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Product {item.product_id} not found",
                )

            if product.stock < item.quantity:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Insufficient stock for {product.name}",
                )

            total_amount += (
                product.price * item.quantity
            )

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

        self.product_repository.flush()

        self.order_item_repository.flush()

        self.order_repository.flush()

        self.order_repository.db.commit()

        self.order_repository.db.refresh(
            order,
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

        return self.order_repository.get_by_id(
            order.id,
        )
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