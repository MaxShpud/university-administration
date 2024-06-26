from src.api.schemas.auth import ShowUser, UserCreate, CurrentUserInfo
from src.db.dals.UsersDAL import UsersDAL
from src.auth.hasher import Hasher
from typing import Union
from src.db.models.users import Users, Roles
from fastapi import HTTPException
import uuid


async def _create_new_user(body: UserCreate, session) -> ShowUser:
    users_dal = UsersDAL(session)

    if await users_dal.check_existing_login(body.login):
        raise HTTPException(
            status_code=400,
            detail="Логин уже занят"
        )
    user = await users_dal.create_user(
        login=body.login,
        hashed_password=Hasher.get_password_hash(body.password),
        name=body.name,
        surname=body.surname,
        patronymic=body.patronymic,
        role=body.role,
    )
    return ShowUser(
        alias=user.alias,
        surname=user.surname,
        name=user.name,
        patronymic=user.patronymic,
        role=user.role
    )

# async def _get_user_by_id(user_id, session) -> Union[User, None]:
#     async with session.begin():
#         user_dal = UserDAL(session)
#         user = await user_dal.get_user_by_id(
#             user_id=user_id
#         )
#         if user is not None:
#             return user
#
#
# async def _delete_user(user_id, session) -> Union[int, None]:
#     async with session.begin():
#         user_dal = UserDAL(session)
#         deleted_user_id = await user_dal.delete_user(
#             user_id=user_id
#         )
#         return deleted_user_id
#
#
# async def _update_user(
#         updated_user_params: dict, user_id: int, session
# ) -> Union[int, None]:
#     async with session.begin():
#         user_dal = UserDAL(session)
#         updated_user_id = await user_dal.update_user(
#             user_id=user_id, **updated_user_params
#         )
#         return updated_user_id
#
#
# async def check_user_permission(target_user: User, current_user: User) -> bool:
#     if target_user.id != current_user.id:
#         if Role.ROLE_ADMIN in current_user.role:
#             return False
#         if (
#                 Role.ROLE_ADMIN in target_user.role
#                 and Role.ROLE_ADMIN in current_user.role
#         ):
#             return False
#     return True
#
#

