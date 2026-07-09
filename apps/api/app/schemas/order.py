from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


# ==========================================================
# CREATE ORDER
# ==========================================================

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int = Field(gt=0)


class OrderCreate(BaseModel):
    shipping_address: str
    items: list[OrderItemCreate]


# ==========================================================
# UPDATE ORDER STATUS
# ==========================================================

class OrderStatusUpdate(BaseModel):
    status: str


# ==========================================================
# ORDER ITEM RESPONSE
# ==========================================================

class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    price: float

    model_config = ConfigDict(
        from_attributes=True,
    )


# ==========================================================
# ORDER RESPONSE
# ==========================================================

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


# ==========================================================
# SELLER ORDER RESPONSE
# ==========================================================

class SellerOrderResponse(OrderResponse):
    pass