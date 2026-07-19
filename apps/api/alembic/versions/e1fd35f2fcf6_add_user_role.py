"""add user role

Revision ID: e1fd35f2fcf6
Revises: 96170caa5d23
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers
revision: str = "e1fd35f2fcf6"
down_revision: Union[str, Sequence[str], None] = "96170caa5d23"
branch_labels = None
depends_on = None


user_role_enum = postgresql.ENUM(
    "USER",
    "FARMER",
    "SELLER",
    "CREATOR",
    "ADMIN",
    name="userrole",
    create_type=True,
)


def upgrade() -> None:
    # Create PostgreSQL enum type
    user_role_enum.create(op.get_bind(), checkfirst=True)

    # Add column with a temporary server default so existing rows are valid
    op.add_column(
        "users",
        sa.Column(
            "role",
            user_role_enum,
            nullable=False,
            server_default="USER",
        ),
    )

    # Remove the server default (SQLAlchemy model default will be used)
    op.alter_column(
        "users",
        "role",
        server_default=None,
    )


def downgrade() -> None:
    op.drop_column("users", "role")
    user_role_enum.drop(op.get_bind(), checkfirst=True)