from sqlalchemy.orm import Session

from app.models.order_item import OrderItem


class OrderItemRepository:
    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create(
        self,
        item: OrderItem,
        commit: bool = True,
    ) -> OrderItem:
        self.db.add(item)

        if commit:
            self.db.commit()
            self.db.refresh(item)

        return item

    def create_many(
        self,
        items: list[OrderItem],
        commit: bool = True,
    ) -> list[OrderItem]:
        self.db.add_all(items)

        if commit:
            self.db.commit()

            for item in items:
                self.db.refresh(item)

        return items

    def get_by_order(
        self,
        order_id: int,
    ) -> list[OrderItem]:
        return (
            self.db.query(OrderItem)
            .filter(
                OrderItem.order_id == order_id,
            )
            .all()
        )

    def delete(
        self,
        item: OrderItem,
        commit: bool = True,
    ) -> None:
        self.db.delete(item)

        if commit:
            self.db.commit()

    def flush(
        self,
    ) -> None:
        self.db.flush()