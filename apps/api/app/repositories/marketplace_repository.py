from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.product import Product
from app.models.order import Order
from app.models.order_item import OrderItem

from app.core.constants import (
    OrderStatus,
)


class MarketplaceRepository:
    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def total_products(self) -> int:
        return (
            self.db.query(
                func.count(Product.id)
            )
            .scalar()
            or 0
        )

    def active_products(self) -> int:
        return (
            self.db.query(
                func.count(Product.id)
            )
            .filter(
                Product.is_active.is_(True)
            )
            .scalar()
            or 0
        )

    def low_stock_products(
        self,
    ) -> int:
        return (
            self.db.query(
                func.count(Product.id)
            )
            .filter(
                Product.stock <= Product.minimum_stock,
                Product.is_active.is_(True),
            )
            .scalar()
            or 0
        )

    def total_orders(self) -> int:
        return (
            self.db.query(
                func.count(Order.id)
            )
            .scalar()
            or 0
        )

    def completed_orders(self) -> int:
        return (
            self.db.query(
                func.count(Order.id)
            )
            .filter(
                Order.status == OrderStatus.DELIVERED.value,
            )
            .scalar()
            or 0
        )

    def pending_orders(self) -> int:
        return (
            self.db.query(
                func.count(Order.id)
            )
            .filter(
                Order.status.in_(
                    [
                        OrderStatus.PLACED.value,
                        OrderStatus.CONFIRMED.value,
                        OrderStatus.PROCESSING.value,
                        OrderStatus.PACKED.value,
                        OrderStatus.SHIPPED.value,
                    ]
                )
            )
            .scalar()
            or 0
        )

    def cancelled_orders(self) -> int:
        return (
            self.db.query(
                func.count(Order.id)
            )
            .filter(
                Order.status == OrderStatus.CANCELLED.value,
            )
            .scalar()
            or 0
        )

    def total_revenue(self) -> float:
        revenue = (
            self.db.query(
                func.sum(Order.total_amount)
            )
            .filter(
                Order.status == OrderStatus.DELIVERED.value,
            )
            .scalar()
        )

        return float(revenue or 0)

    def top_products(
        self,
        limit: int = 5,
    ):
        return (
            self.db.query(
                Product.id,
                Product.name,
                func.sum(
                    OrderItem.quantity
                ).label(
                    "sold_quantity"
                ),
            )
            .join(
                OrderItem,
                Product.id == OrderItem.product_id,
            )
            .group_by(
                Product.id,
                Product.name,
            )
            .order_by(
                func.sum(
                    OrderItem.quantity
                ).desc()
            )
            .limit(limit)
            .all()
        )

    def order_status_summary(
        self,
    ):
        rows = (
            self.db.query(
                Order.status,
                func.count(
                    Order.id
                ),
            )
            .group_by(
                Order.status,
            )
            .all()
        )

        return {
            status: count
            for status, count in rows
        }