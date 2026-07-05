from datetime import datetime

from pydantic import BaseModel, ConfigDict


class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int


class OrderCreate(BaseModel):
    shipping_address: str
    items: list[OrderItemCreate]


class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    price: float

    model_config = ConfigDict(
        from_attributes=True,
    )


class OrderResponse(BaseModel):
    id: int
    user_id: int
    total_amount: float
    status: str
    payment_status: str
    shipping_address: str
    created_at: datetime

    items: list[OrderItemResponse]

    model_config = ConfigDict(
        from_attributes=True,
    )