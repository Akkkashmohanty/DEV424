from sqlalchemy.orm import Session
from sqlalchemy import or_

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
    ) -> Product:
        self.db.add(product)
        self.db.commit()
        self.db.refresh(product)
        return product

    def get_all(
        self,
        *,
        search: str | None = None,
        category: str | None = None,
        min_price: float | None = None,
        max_price: float | None = None,
        page: int = 1,
        limit: int = 10,
    ):
        query = self.db.query(Product).filter(
            Product.is_active.is_(True)
        )

        if search:
            query = query.filter(
                or_(
                    Product.name.ilike(f"%{search}%"),
                    Product.description.ilike(f"%{search}%"),
                )
            )

        if category:
            query = query.filter(
                Product.category == category
            )

        if min_price is not None:
            query = query.filter(
                Product.price >= min_price
            )

        if max_price is not None:
            query = query.filter(
                Product.price <= max_price
            )

        return (
            query.order_by(Product.created_at.desc())
            .offset((page - 1) * limit)
            .limit(limit)
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
                Product.is_active.is_(True),
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
                Product.is_active.is_(True),
            )
            .order_by(Product.created_at.desc())
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
        product.is_active = False

        if commit:
            self.db.commit()
            self.db.refresh(product)

        return product

    def flush(
        self,
    ):
        self.db.flush()