"""create_orders

Revision ID: <KEEP_YOUR_REVISION_ID>
Revises: 6bdf11e77680
Create Date: <KEEP_YOUR_DATE>
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "<KEEP_YOUR_REVISION_ID>"
down_revision: Union[str, Sequence[str], None] = "6bdf11e77680"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "orders",
        sa.Column("id", sa.Integer(), primary_key=True, index=True),
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
            server_default=sa.func.now(),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(),
            server_default=sa.func.now(),
            nullable=False,
        ),
    )

    op.create_table(
        "order_items",
        sa.Column("id", sa.Integer(), primary_key=True, index=True),
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


def downgrade() -> None:
    op.drop_table("order_items")
    op.drop_table("orders")