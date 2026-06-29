"""create_notifications

Revision ID: d562aefd863a
Revises: c0bb3360e556
Create Date: 2026-06-28

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "d562aefd863a"
down_revision: Union[str, Sequence[str], None] = "c0bb3360e556"
branch_labels = None
depends_on = None


def upgrade() -> None:

    op.create_table(
        "notifications",

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
            "title",
            sa.String(150),
            nullable=False,
        ),

        sa.Column(
            "message",
            sa.String(255),
            nullable=False,
        ),

        sa.Column(
            "is_read",
            sa.Boolean(),
            nullable=False,
            server_default=sa.false(),
        ),

        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )

    op.create_index(
        "ix_notifications_id",
        "notifications",
        ["id"],
    )

    op.create_index(
        "ix_notifications_user_id",
        "notifications",
        ["user_id"],
    )


def downgrade() -> None:

    op.drop_index(
        "ix_notifications_user_id",
        table_name="notifications",
    )

    op.drop_index(
        "ix_notifications_id",
        table_name="notifications",
    )

    op.drop_table(
        "notifications",
    )