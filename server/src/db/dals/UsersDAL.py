from typing import Union
from sqlalchemy import and_
from sqlalchemy import select
from sqlalchemy import update
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.models.users import Users, Roles
from uuid import uuid4
import uuid
import datetime
from sqlalchemy import func
class UsersDAL:
    """Data Access Layer for operating user info"""

    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def create_user(
            self,
            login: str,
            hashed_password: str,
            name: str,
            surname: str,
            patronymic: str,
            role: str
    ) -> Users:
        now = datetime.datetime.utcnow()
        new_user = Users(
            alias=uuid.uuid4(),
            login=login,
            hashed_password=hashed_password,
            name=name,
            surname=surname,
            patronymic=patronymic,
            role=role,
            created_at=now
        )
        self.db_session.add(new_user)
        await self.db_session.commit()
        return new_user

    async def check_existing_login(self, login: str) -> bool:
        query = select(Users).filter(Users.login == login)
        result = await self.db_session.execute(query)
        return bool(result.scalar())

    async def get_user_by_login(self, login: str) -> Union[Users, None]:
        query = select(Users).where(Users.login == login)
        result = await self.db_session.execute(query)
        user_row = result.fetchone()
        if user_row is not None:
            return user_row[0]
    #
    # async def get_user_by_id(self, user_id: int) -> Union[User, None]:
    #     query = select(User).where(User.id == user_id)
    #     result = await self.db_session.execute(query)
    #     user_row = result.fetchone()
    #     if user_row is not None:
    #         return user_row[0]
    #
    # async def delete_user(self, user_id: int) -> Union[int, None]:
    #     query = (
    #         update(User)
    #         .where(and_(User.id == user_id, User.is_active == True))
    #         .values(is_active=False)
    #         .returning(User.id)
    #     )
    #     result = await self.db_session.execute(query)
    #     deleted_user_id_row = result.fetchone()
    #     if deleted_user_id_row is not None:
    #         return int(deleted_user_id_row[0])
    #
    # async def update_user(self, user_id: int, **kwargs) -> Union[int, None]:
    #     query = (
    #         update(User)
    #         .where(and_(User.id == user_id, User.is_active == True))
    #         .values(kwargs)
    #         .returning(User.id)
    #     )
    #     result = await self.db_session.execute(query)
    #     update_user_id_row = result.fetchone()
    #     if update_user_id_row is not None:
    #         return update_user_id_row[0]
