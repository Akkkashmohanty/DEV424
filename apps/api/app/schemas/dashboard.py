from pydantic import BaseModel


class DashboardSummary(BaseModel):
    # Productivity
    total_tasks: int
    completed_tasks: int
    pending_tasks: int
    completion_rate: float

    # Gamification
    xp_points: int
    level: int
    streak_days: int

    # Marketplace
    total_products: int
    active_products: int
    inactive_products: int

    total_orders: int
    pending_orders: int
    processing_orders: int
    shipped_orders: int
    delivered_orders: int
    cancelled_orders: int

    total_inventory: int
    low_stock_products: int