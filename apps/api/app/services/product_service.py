from fastapi import HTTPException, status

from app.models.product import Product

from app.repositories.product_repository import (
    ProductRepository,
)

from app.schemas.product import (
    ProductCreate,
    ProductUpdate,
)


class ProductService:
    def __init__(
        self,
        repository: ProductRepository,
    ):
        self.repository = repository

    def create_product(
        self,
        seller_id: int,
        payload: ProductCreate,
    ):
        product = Product(
            seller_id=seller_id,
            name=payload.name,
            description=payload.description,
            price=payload.price,
            stock=payload.stock,
            category=payload.category,
            image_url=payload.image_url,
        )

        return self.repository.create(
            product,
        )

    def list_products(
        self,
    ):
        return self.repository.get_all()

    def list_my_products(
        self,
        seller_id: int,
    ):
        return self.repository.get_by_seller(
            seller_id,
        )

    def get_product(
        self,
        product_id: int,
    ):
        product = self.repository.get_by_id(
            product_id,
        )

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found",
            )

        return product

    def update_product(
        self,
        product_id: int,
        seller_id: int,
        payload: ProductUpdate,
    ):
        product = self.get_product(
            product_id,
        )

        if product.seller_id != seller_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not allowed",
            )

        data = payload.model_dump(
            exclude_unset=True,
        )

        for key, value in data.items():
            setattr(
                product,
                key,
                value,
            )

        return self.repository.save(
            product,
        )

    def delete_product(
        self,
        product_id: int,
        seller_id: int,
    ):
        product = self.get_product(
            product_id,
        )

        if product.seller_id != seller_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not allowed",
            )

        self.repository.delete(
            product,
        )