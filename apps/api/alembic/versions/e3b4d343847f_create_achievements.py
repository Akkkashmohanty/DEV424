"""create_achievements

Revision ID: e3b4d343847f
Revises: d562aefd863a
Create Date: 2026-07-02 10:19:23.676512

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "e3b4d343847f"
down_revision: Union[str, Sequence[str], None] = "d562aefd863a"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "achievements",
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
            sa.String(length=100),
            nullable=False,
        ),
        sa.Column(
            "description",
            sa.String(length=255),
            nullable=False,
        ),
        sa.Column(
            "icon",
            sa.String(length=50),
            nullable=False,
        ),
        sa.Column(
            "xp_reward",
            sa.Integer(),
            nullable=False,
            server_default="0",
        ),
        sa.Column(
            "unlocked",
            sa.Boolean(),
            nullable=False,
            server_default=sa.false(),
        ),
        sa.Column(
            "unlocked_at",
            sa.DateTime(),
            nullable=True,
        ),
    )


def downgrade() -> None:
    op.drop_table(
        "achievements",
    )