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
        if payload.price <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Price must be greater than zero.",
            )

        if payload.stock < 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Stock cannot be negative.",
            )

        product = Product(
            seller_id=seller_id,

            name=payload.name.strip(),

            description=payload.description.strip(),

            sku=payload.sku.strip(),

            brand=payload.brand,

            unit=payload.unit,

            category=payload.category.strip(),

            price=payload.price,

            stock=payload.stock,

            image_url=payload.image_url,
)

        return self.repository.create(product)

    def list_products(
        self,
        *,
        search: str | None = None,
        category: str | None = None,
        min_price: float | None = None,
        max_price: float | None = None,
        page: int = 1,
        limit: int = 10,
    ):
        if page < 1:
            page = 1

        if limit < 1:
            limit = 10

        if limit > 100:
            limit = 100

        return self.repository.get_all(
            search=search,
            category=category,
            min_price=min_price,
            max_price=max_price,
            page=page,
            limit=limit,
        )

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
        product = self.get_product(product_id)

        if product.seller_id != seller_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not allowed to update this product.",
            )

        data = payload.model_dump(
            exclude_unset=True,
        )

        if "price" in data and data["price"] <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Price must be greater than zero.",
            )

        if "stock" in data and data["stock"] < 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Stock cannot be negative.",
            )

        for key, value in data.items():
            setattr(product, key, value)

        return self.repository.save(product)

    def delete_product(
        self,
        product_id: int,
        seller_id: int,
    ):
        product = self.get_product(product_id)

        if product.seller_id != seller_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not allowed to delete this product.",
            )

        return self.repository.delete(product)