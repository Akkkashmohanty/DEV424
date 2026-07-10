"""enhance products table"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "7dcf517dbee9"
down_revision: Union[str, Sequence[str], None] = "99204c22ffca"
branch_labels = None
depends_on = None


def upgrade() -> None:

    op.add_column(
        "products",
        sa.Column(
            "sku",
            sa.String(length=50),
            nullable=False,
            server_default="TEMP-SKU",
        ),
    )

    op.create_index(
        "ix_products_sku",
        "products",
        ["sku"],
        unique=True,
    )

    op.add_column(
        "products",
        sa.Column(
            "brand",
            sa.String(length=100),
            nullable=True,
        ),
    )

    op.add_column(
        "products",
        sa.Column(
            "unit",
            sa.String(length=20),
            nullable=False,
            server_default="Piece",
        ),
    )

    op.add_column(
        "products",
        sa.Column(
            "reserved_stock",
            sa.Integer(),
            nullable=False,
            server_default="0",
        ),
    )

    op.add_column(
        "products",
        sa.Column(
            "minimum_stock",
            sa.Integer(),
            nullable=False,
            server_default="5",
        ),
    )

    op.add_column(
        "products",
        sa.Column(
            "updated_at",
            sa.DateTime(),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )


def downgrade() -> None:

    op.drop_column("products", "updated_at")
    op.drop_column("products", "minimum_stock")
    op.drop_column("products", "reserved_stock")
    op.drop_column("products", "unit")
    op.drop_column("products", "brand")

    op.drop_index(
        "ix_products_sku",
        table_name="products",
    )

    op.drop_column("products", "sku")