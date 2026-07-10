from app.repositories.marketplace_repository import (
    MarketplaceRepository,
)


class MarketplaceService:
    def __init__(
        self,
        repository: MarketplaceRepository,
    ):
        self.repository = repository

    def get_summary(
        self,
    ):
        return {
            "total_products": self.repository.total_products(),
            "active_products": self.repository.active_products(),
            "low_stock_products": self.repository.low_stock_products(),
            "total_orders": self.repository.total_orders(),
            "completed_orders": self.repository.completed_orders(),
            "pending_orders": self.repository.pending_orders(),
            "cancelled_orders": self.repository.cancelled_orders(),
            "total_revenue": self.repository.total_revenue(),
        }

    def get_top_products(
        self,
        limit: int = 5,
    ):
        products = self.repository.top_products(
            limit,
        )

        return [
            {
                "product_id": product.id,
                "product_name": product.name,
                "sold_quantity": product.sold_quantity,
            }
            for product in products
        ]

    def get_order_status_summary(
        self,
    ):
        return self.repository.order_status_summary()