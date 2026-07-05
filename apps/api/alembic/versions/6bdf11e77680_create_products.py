"""create_products

Revision ID: 6bdf11e77680
Revises: e3b4d343847f
Create Date: 2026-07-03 15:36:47.965426
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "6bdf11e77680"
down_revision: Union[str, Sequence[str], None] = "e3b4d343847f"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "products",

        sa.Column(
            "id",
            sa.Integer(),
            primary_key=True,
        ),

        sa.Column(
            "seller_id",
            sa.Integer(),
            sa.ForeignKey("users.id"),
            nullable=False,
        ),

        sa.Column(
            "name",
            sa.String(150),
            nullable=False,
        ),

        sa.Column(
            "description",
            sa.Text(),
            nullable=False,
        ),

        sa.Column(
            "price",
            sa.Float(),
            nullable=False,
        ),

        sa.Column(
            "stock",
            sa.Integer(),
            nullable=False,
            server_default="0",
        ),

        sa.Column(
            "category",
            sa.String(80),
            nullable=False,
        ),

        sa.Column(
            "image_url",
            sa.String(500),
            nullable=True,
        ),

        sa.Column(
            "is_active",
            sa.Boolean(),
            nullable=False,
            server_default=sa.true(),
        ),

        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.func.now(),
            nullable=False,
        ),
    )


def downgrade() -> None:
    op.drop_table(
        "products",
    )