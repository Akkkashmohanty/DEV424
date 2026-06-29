"""create_activity_logs

Revision ID: c0bb3360e556
Revises: 7c61c31477ab
Create Date: 2026-06-27

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "c0bb3360e556"
down_revision: Union[str, Sequence[str], None] = "7c61c31477ab"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "activity_logs",

        sa.Column(
            "id",
            sa.Integer(),
            primary_key=True,
        ),

        sa.Column(
            "user_id",
            sa.Integer(),
            sa.ForeignKey("users.id"),
            nullable=False,
        ),

        sa.Column(
            "action",
            sa.String(100),
            nullable=False,
        ),

        sa.Column(
            "description",
            sa.String(255),
            nullable=False,
        ),

        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )

    op.create_index(
        "ix_activity_logs_id",
        "activity_logs",
        ["id"],
    )

    op.create_index(
        "ix_activity_logs_user_id",
        "activity_logs",
        ["user_id"],
    )


def downgrade() -> None:
    op.drop_index(
        "ix_activity_logs_user_id",
        table_name="activity_logs",
    )

    op.drop_index(
        "ix_activity_logs_id",
        table_name="activity_logs",
    )

    op.drop_table(
        "activity_logs",
    )