"""4 relationship

Revision ID: 219e7c2f933c
Revises: ef56cd7f9787
Create Date: 2024-05-08 18:31:04.286153

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '219e7c2f933c'
down_revision: Union[str, None] = 'ef56cd7f9787'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('statistics', sa.Column('user_id', sa.BIGINT(), nullable=False, comment='Ссылка на юзера'))
    op.create_foreign_key(None, 'statistics', 'users', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'statistics', type_='foreignkey')
    op.drop_column('statistics', 'user_id')
    # ### end Alembic commands ###
