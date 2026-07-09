"""create_orders

Revision ID: 8c1382462353
Revises: 6bdf11e77680
Create Date: 2026-07-05
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "8c1382462353"
down_revision: Union[str, Sequence[str], None] = "6bdf11e77680"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "orders",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column(
            "user_id",
            sa.Integer(),
            sa.ForeignKey("users.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column(
            "total_amount",
            sa.Float(),
            nullable=False,
            server_default="0",
        ),
        sa.Column(
            "status",
            sa.String(length=50),
            nullable=False,
            server_default="PENDING",
        ),
        sa.Column(
            "payment_status",
            sa.String(length=50),
            nullable=False,
            server_default="PENDING",
        ),
        sa.Column(
            "shipping_address",
            sa.Text(),
            nullable=False,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=False,
            server_default=sa.func.now(),
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )

    op.create_index(
        "ix_orders_id",
        "orders",
        ["id"],
    )

    op.create_table(
        "order_items",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column(
            "order_id",
            sa.Integer(),
            sa.ForeignKey("orders.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column(
            "product_id",
            sa.Integer(),
            sa.ForeignKey("products.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column(
            "quantity",
            sa.Integer(),
            nullable=False,
            server_default="1",
        ),
        sa.Column(
            "price",
            sa.Float(),
            nullable=False,
        ),
    )

    op.create_index(
        "ix_order_items_id",
        "order_items",
        ["id"],
    )


def downgrade() -> None:
    op.drop_index(
        "ix_order_items_id",
        table_name="order_items",
    )

    op.drop_table("order_items")

    op.drop_index(
        "ix_orders_id",
        table_name="orders",
    )

    op.drop_table("orders")