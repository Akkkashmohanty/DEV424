"""add notification schedule"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "96170caa5d23"
down_revision: Union[str, Sequence[str], None] = "7dcf517dbee9"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:

    op.add_column(
        "notifications",
        sa.Column(
            "scheduled_for",
            sa.DateTime(),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )

    op.alter_column(
        "notifications",
        "scheduled_for",
        server_default=None,
    )


def downgrade() -> None:

    op.drop_column(
        "notifications",
        "scheduled_for",
    )