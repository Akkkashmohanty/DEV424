from pydantic import BaseModel


class MarketplaceSummary(BaseModel):
    total_products: int
    active_products: int
    low_stock_products: int

    total_orders: int
    completed_orders: int
    pending_orders: int
    cancelled_orders: int

    total_revenue: float


class TopProduct(BaseModel):
    product_id: int
    product_name: str
    sold_quantity: int


class OrderStatusSummary(BaseModel):
    PLACED: int = 0
    CONFIRMED: int = 0
    PROCESSING: int = 0
    PACKED: int = 0
    SHIPPED: int = 0
    DELIVERED: int = 0
    CANCELLED: int = 0