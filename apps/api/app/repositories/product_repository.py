from sqlalchemy.orm import Session

from app.models.product import Product


class ProductRepository:
    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create(
        self,
        product: Product,
    ):
        self.db.add(product)
        self.db.commit()
        self.db.refresh(product)

        return product

    def get_all(
        self,
    ):
        return (
            self.db.query(Product)
            .filter(
                Product.is_active.is_(True),
            )
            .order_by(
                Product.created_at.desc(),
            )
            .all()
        )

    def get_by_id(
        self,
        product_id: int,
    ):
        return (
            self.db.query(Product)
            .filter(
                Product.id == product_id,
            )
            .first()
        )

    def get_by_ids(
        self,
        product_ids: list[int],
    ):
        return (
            self.db.query(Product)
            .filter(
                Product.id.in_(product_ids),
                Product.is_active.is_(True),
            )
            .all()
        )

    def get_by_seller(
        self,
        seller_id: int,
    ):
        return (
            self.db.query(Product)
            .filter(
                Product.seller_id == seller_id,
            )
            .order_by(
                Product.created_at.desc(),
            )
            .all()
        )

    def save(
        self,
        product: Product,
        commit: bool = True,
    ):
        if commit:
            self.db.commit()
            self.db.refresh(product)

        return product

    def delete(
        self,
        product: Product,
        commit: bool = True,
    ):
        self.db.delete(product)

        if commit:
            self.db.commit()

    def flush(
        self,
    ) -> None:
        self.db.flush()



        