"""create farm planner

Revision ID: bda80135fe44
Revises: 8c1382462353
Create Date: 2026-07-07 12:51:16.589855

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "bda80135fe44"
down_revision: Union[str, Sequence[str], None] = "8c1382462353"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "farm_plans",

        sa.Column(
            "id",
            sa.Integer(),
            nullable=False,
        ),

        sa.Column(
            "user_id",
            sa.Integer(),
            nullable=False,
        ),

        sa.Column(
            "city",
            sa.String(length=100),
            nullable=False,
        ),

        sa.Column(
            "garden_type",
            sa.String(length=30),
            nullable=False,
        ),

        sa.Column(
            "garden_size",
            sa.String(length=50),
            nullable=False,
        ),

        sa.Column(
            "sunlight",
            sa.String(length=30),
            nullable=False,
        ),

        sa.Column(
            "water_availability",
            sa.String(length=30),
            nullable=False,
        ),

        sa.Column(
            "status",
            sa.String(length=30),
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

        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
            ondelete="CASCADE",
        ),

        sa.PrimaryKeyConstraint(
            "id",
        ),
    )

    op.create_index(
        "ix_farm_plans_id",
        "farm_plans",
        ["id"],
    )

    op.create_index(
        "ix_farm_plans_user_id",
        "farm_plans",
        ["user_id"],
    )

    op.create_table(
        "farm_plan_crops",

        sa.Column(
            "id",
            sa.Integer(),
            nullable=False,
        ),

        sa.Column(
            "farm_plan_id",
            sa.Integer(),
            nullable=False,
        ),

        sa.Column(
            "crop_name",
            sa.String(length=100),
            nullable=False,
        ),

        sa.Column(
            "planting_date",
            sa.String(length=50),
            nullable=False,
        ),

        sa.Column(
            "expected_harvest_date",
            sa.String(length=50),
            nullable=False,
        ),

        sa.Column(
            "watering_frequency",
            sa.String(length=50),
            nullable=False,
        ),

        sa.Column(
            "status",
            sa.String(length=30),
            nullable=False,
        ),

        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=False,
            server_default=sa.func.now(),
        ),

        sa.ForeignKeyConstraint(
            ["farm_plan_id"],
            ["farm_plans.id"],
            ondelete="CASCADE",
        ),

        sa.PrimaryKeyConstraint(
            "id",
        ),
    )

    op.create_index(
        "ix_farm_plan_crops_id",
        "farm_plan_crops",
        ["id"],
    )


def downgrade() -> None:

    op.drop_index(
        "ix_farm_plan_crops_id",
        table_name="farm_plan_crops",
    )

    op.drop_table(
        "farm_plan_crops",
    )

    op.drop_index(
        "ix_farm_plans_user_id",
        table_name="farm_plans",
    )

    op.drop_index(
        "ix_farm_plans_id",
        table_name="farm_plans",
    )

    op.drop_table(
        "farm_plans",
    )