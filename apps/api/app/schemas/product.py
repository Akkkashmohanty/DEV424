from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
)


class ProductCreate(BaseModel):
    name: str

    description: str

    price: float

    stock: int

    category: str

    image_url: str | None = None


class ProductUpdate(BaseModel):
    name: str | None = None

    description: str | None = None

    price: float | None = None

    stock: int | None = None

    category: str | None = None

    image_url: str | None = None

    is_active: bool | None = None


class ProductResponse(BaseModel):
    id: int

    seller_id: int

    name: str

    description: str

    price: float

    stock: int

    category: str

    image_url: str | None

    is_active: bool

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )