from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.user_farm_activity import (
    UserFarmActivity,
)

from app.models.task import Task
from app.models.user import User
from app.models.product import Product
from app.models.order import Order


class DashboardRepository:
    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def get_summary(
        self,
        user_id: int,
    ):
        user = (
            self.db.query(User)
            .filter(
                User.id == user_id,
            )
            .first()
        )

        total_tasks = (
            self.db.query(Task)
            .filter(
                Task.user_id == user_id,
            )
            .count()
        )

        completed_tasks = (
            self.db.query(Task)
            .filter(
                Task.user_id == user_id,
                Task.completed.is_(True),
            )
            .count()
        )

        pending_tasks = (
            total_tasks - completed_tasks
        )

        completion_rate = (
            round(
                (completed_tasks / total_tasks) * 100,
                2,
            )
            if total_tasks
            else 0.0
        )

        # ------------------------
        # Marketplace
        # ------------------------

        total_products = (
            self.db.query(Product)
            .filter(
                Product.seller_id == user_id,
            )
            .count()
        )

        active_products = (
            self.db.query(Product)
            .filter(
                Product.seller_id == user_id,
                Product.is_active.is_(True),
            )
            .count()
        )

        inactive_products = (
            total_products - active_products
        )

        products = (
            self.db.query(Product)
            .filter(
                Product.seller_id == user_id,
            )
            .all()
        )

        total_inventory = sum(
            product.stock
            for product in products
        )

        low_stock_products = sum(
            1
            for product in products
            if product.stock <= product.minimum_stock
        )

        total_orders = (
            self.db.query(Order)
            .filter(
                Order.user_id == user_id,
            )
            .count()
        )

        pending_orders = (
            self.db.query(Order)
            .filter(
                Order.user_id == user_id,
                Order.status == "PENDING",
            )
            .count()
        )

        processing_orders = (
            self.db.query(Order)
            .filter(
                Order.user_id == user_id,
                Order.status == "PROCESSING",
            )
            .count()
        )

        shipped_orders = (
            self.db.query(Order)
            .filter(
                Order.user_id == user_id,
                Order.status == "SHIPPED",
            )
            .count()
        )

        delivered_orders = (
            self.db.query(Order)
            .filter(
                Order.user_id == user_id,
                Order.status == "DELIVERED",
            )
            .count()
        )

        cancelled_orders = (
            self.db.query(Order)
            .filter(
                Order.user_id == user_id,
                Order.status == "CANCELLED",
            )
            .count()
        )

        today_calories = (
            self.db.query(
                func.coalesce(
                    func.sum(
                        UserFarmActivity.calories_burned
                    ),
                    0,
                )
            )
            .filter(
                UserFarmActivity.user_id == user_id,
                func.date(
                    UserFarmActivity.completed_at
                ) == func.current_date(),
            )
            .scalar()
        )

        total_calories = (
            self.db.query(
                func.coalesce(
                    func.sum(
                        UserFarmActivity.calories_burned
                    ),
                    0,
                )
            )
            .filter(
                UserFarmActivity.user_id == user_id,
            )
            .scalar()
        )

        total_farming_minutes = (
            self.db.query(
                func.coalesce(
                    func.sum(
                        UserFarmActivity.duration_minutes
                    ),
                    0,
                )
            )
            .filter(
                UserFarmActivity.user_id == user_id,
            )
            .scalar()
        )

        return {
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "pending_tasks": pending_tasks,
            "completion_rate": completion_rate,
            "xp_points": user.xp_points,
            "level": user.level,
            "streak_days": user.streak_days,
            "total_products": total_products,
            "active_products": active_products,
            "inactive_products": inactive_products,
            "total_orders": total_orders,
            "pending_orders": pending_orders,
            "processing_orders": processing_orders,
            "shipped_orders": shipped_orders,
            "delivered_orders": delivered_orders,
            "cancelled_orders": cancelled_orders,
            "total_inventory": total_inventory,
            "low_stock_products": low_stock_products,
            "today_calories": today_calories,
            "total_calories": total_calories,
            "total_farming_minutes": total_farming_minutes,
        }