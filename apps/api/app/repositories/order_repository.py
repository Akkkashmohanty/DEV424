from sqlalchemy.orm import (
    Session,
    joinedload,
)

from app.models.order import Order


class OrderRepository:
    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create(
        self,
        order: Order,
        commit: bool = True,
    ) -> Order:
        self.db.add(order)

        if commit:
            self.db.commit()
            self.db.refresh(order)

        return order

    def save(
        self,
        order: Order,
        commit: bool = True,
    ) -> Order:
        if commit:
            self.db.commit()
            self.db.refresh(order)

        return order

    def get_by_id(
        self,
        order_id: int,
    ) -> Order | None:
        return (
            self.db.query(Order)
            .options(
                joinedload(Order.items),
            )
            .filter(
                Order.id == order_id,
            )
            .first()
        )

    def get_by_user_and_id(
        self,
        user_id: int,
        order_id: int,
    ) -> Order | None:
        return (
            self.db.query(Order)
            .options(
                joinedload(Order.items),
            )
            .filter(
                Order.user_id == user_id,
                Order.id == order_id,
            )
            .first()
        )

    def get_by_user(
        self,
        user_id: int,
    ) -> list[Order]:
        return (
            self.db.query(Order)
            .options(
                joinedload(Order.items),
            )
            .filter(
                Order.user_id == user_id,
            )
            .order_by(
                Order.created_at.desc(),
            )
            .all()
        )

    def list_all(
        self,
    ) -> list[Order]:
        return (
            self.db.query(Order)
            .options(
                joinedload(Order.items),
            )
            .order_by(
                Order.created_at.desc(),
            )
            .all()
        )

    def delete(
        self,
        order: Order,
        commit: bool = True,
    ) -> None:
        self.db.delete(order)

        if commit:
            self.db.commit()

    def flush(
        self,
    ) -> None:
        self.db.flush()

        