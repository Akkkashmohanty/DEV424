"""enhance crop intelligence fields

Revision ID: 99204c22ffca
Revises: 7aacb7d1cdad
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "99204c22ffca"
down_revision: Union[str, Sequence[str], None] = "7aacb7d1cdad"
branch_labels = None
depends_on = None


def upgrade() -> None:

    op.add_column(
        "crops",
        sa.Column(
            "humidity_min",
            sa.Integer(),
            nullable=False,
            server_default="40",
        ),
    )

    op.add_column(
        "crops",
        sa.Column(
            "humidity_max",
            sa.Integer(),
            nullable=False,
            server_default="80",
        ),
    )

    op.add_column(
        "crops",
        sa.Column(
            "rainfall_preference",
            sa.String(length=30),
            nullable=False,
            server_default="Medium",
        ),
    )

    op.add_column(
        "crops",
        sa.Column(
            "companion_plants",
            sa.Text(),
            nullable=True,
        ),
    )

    op.add_column(
        "crops",
        sa.Column(
            "common_diseases",
            sa.Text(),
            nullable=True,
        ),
    )


def downgrade() -> None:

    op.drop_column(
        "crops",
        "common_diseases",
    )

    op.drop_column(
        "crops",
        "companion_plants",
    )

    op.drop_column(
        "crops",
        "rainfall_preference",
    )

    op.drop_column(
        "crops",
        "humidity_max",
    )

    op.drop_column(
        "crops",
        "humidity_min",
    )