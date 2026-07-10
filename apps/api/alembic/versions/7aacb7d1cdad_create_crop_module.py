"""create crop module

Revision ID: 7aacb7d1cdad
Revises: bda80135fe44
Create Date: 2026-07-10

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "7aacb7d1cdad"
down_revision: Union[str, Sequence[str], None] = "bda80135fe44"
branch_labels = None
depends_on = None


def upgrade() -> None:

    op.create_table(
        "crops",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("scientific_name", sa.String(length=150), nullable=True),
        sa.Column("category", sa.String(length=100), nullable=False),
        sa.Column("difficulty", sa.String(length=30), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("ideal_temperature_min", sa.Float(), nullable=False),
        sa.Column("ideal_temperature_max", sa.Float(), nullable=False),
        sa.Column("sunlight_requirement", sa.String(length=50), nullable=False),
        sa.Column("water_requirement", sa.String(length=50), nullable=False),
        sa.Column("soil_type", sa.String(length=100), nullable=False),
        sa.Column("ph_min", sa.Float(), nullable=False),
        sa.Column("ph_max", sa.Float(), nullable=False),
        sa.Column("spacing_cm", sa.Integer(), nullable=False),
        sa.Column("harvest_days", sa.Integer(), nullable=False),
        sa.Column("image_url", sa.String(length=500), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        "ix_crops_id",
        "crops",
        ["id"],
    )

    op.create_index(
        "ix_crops_name",
        "crops",
        ["name"],
        unique=True,
    )

    op.create_index(
        "ix_crops_category",
        "crops",
        ["category"],
    )

    op.create_table(
        "crop_seasons",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("crop_id", sa.Integer(), nullable=False),
        sa.Column("season", sa.String(length=50), nullable=False),
        sa.ForeignKeyConstraint(
            ["crop_id"],
            ["crops.id"],
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        "ix_crop_seasons_id",
        "crop_seasons",
        ["id"],
    )

    op.create_index(
        "ix_crop_seasons_crop_id",
        "crop_seasons",
        ["crop_id"],
    )

    op.create_table(
        "crop_tasks",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("crop_id", sa.Integer(), nullable=False),
        sa.Column("day_number", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=150), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.ForeignKeyConstraint(
            ["crop_id"],
            ["crops.id"],
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        "ix_crop_tasks_id",
        "crop_tasks",
        ["id"],
    )

    op.create_index(
        "ix_crop_tasks_crop_id",
        "crop_tasks",
        ["crop_id"],
    )


def downgrade() -> None:

    op.drop_index(
        "ix_crop_tasks_crop_id",
        table_name="crop_tasks",
    )

    op.drop_index(
        "ix_crop_tasks_id",
        table_name="crop_tasks",
    )

    op.drop_table("crop_tasks")

    op.drop_index(
        "ix_crop_seasons_crop_id",
        table_name="crop_seasons",
    )

    op.drop_index(
        "ix_crop_seasons_id",
        table_name="crop_seasons",
    )

    op.drop_table("crop_seasons")

    op.drop_index(
        "ix_crops_category",
        table_name="crops",
    )

    op.drop_index(
        "ix_crops_name",
        table_name="crops",
    )

    op.drop_index(
        "ix_crops_id",
        table_name="crops",
    )

    op.drop_table("crops")