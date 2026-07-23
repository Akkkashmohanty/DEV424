"""user farm activity

Revision ID: 5d9ce05cd8a3
Revises: e1fd35f2fcf6
Create Date: 2026-07-23

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "5d9ce05cd8a3"
down_revision: Union[str, Sequence[str], None] = "e1fd35f2fcf6"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ------------------------------------------------------------------
    # Farm Activities
    # ------------------------------------------------------------------

    op.create_table(
        "farm_activities",
        sa.Column(
            "id",
            sa.Integer(),
            primary_key=True,
            nullable=False,
        ),
        sa.Column(
            "name",
            sa.String(length=100),
            nullable=False,
            unique=True,
        ),
        sa.Column(
            "description",
            sa.String(length=500),
            nullable=False,
        ),
        sa.Column(
            "category",
            sa.String(length=50),
            nullable=False,
        ),
        sa.Column(
            "calories_per_hour",
            sa.Float(),
            nullable=False,
        ),
        sa.Column(
            "xp_reward",
            sa.Integer(),
            nullable=False,
            server_default="10",
        ),
        sa.Column(
            "equivalent_exercise",
            sa.String(length=100),
            nullable=False,
        ),
        sa.Column(
            "icon",
            sa.String(length=255),
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
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(),
            nullable=False,
        ),
    )

    op.create_index(
        "ix_farm_activities_id",
        "farm_activities",
        ["id"],
    )

    # ------------------------------------------------------------------
    # User Farm Activities
    # ------------------------------------------------------------------

    op.create_table(
        "user_farm_activities",
        sa.Column(
            "id",
            sa.Integer(),
            primary_key=True,
            nullable=False,
        ),
        sa.Column(
            "user_id",
            sa.Integer(),
            nullable=False,
        ),
        sa.Column(
            "farm_activity_id",
            sa.Integer(),
            nullable=False,
        ),
        sa.Column(
            "duration_minutes",
            sa.Integer(),
            nullable=False,
        ),
        sa.Column(
            "calories_burned",
            sa.Float(),
            nullable=False,
        ),
        sa.Column(
            "xp_earned",
            sa.Integer(),
            nullable=False,
        ),
        sa.Column(
            "equivalent_exercise",
            sa.String(length=100),
            nullable=False,
        ),
        sa.Column(
            "notes",
            sa.Text(),
            nullable=True,
        ),
        sa.Column(
            "completed_at",
            sa.DateTime(),
            nullable=False,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["farm_activity_id"],
            ["farm_activities.id"],
            ondelete="CASCADE",
        ),
    )

    op.create_index(
        "ix_user_farm_activities_id",
        "user_farm_activities",
        ["id"],
    )

    op.create_index(
        "ix_user_farm_activities_user_id",
        "user_farm_activities",
        ["user_id"],
    )

    op.create_index(
        "ix_user_farm_activities_farm_activity_id",
        "user_farm_activities",
        ["farm_activity_id"],
    )


def downgrade() -> None:

    op.drop_index(
        "ix_user_farm_activities_farm_activity_id",
        table_name="user_farm_activities",
    )

    op.drop_index(
        "ix_user_farm_activities_user_id",
        table_name="user_farm_activities",
    )

    op.drop_index(
        "ix_user_farm_activities_id",
        table_name="user_farm_activities",
    )

    op.drop_table(
        "user_farm_activities",
    )

    op.drop_index(
        "ix_farm_activities_id",
        table_name="farm_activities",
    )

    op.drop_table(
        "farm_activities",
    )