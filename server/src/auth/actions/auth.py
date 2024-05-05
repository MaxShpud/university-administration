from typing import Union
from datetime import timedelta

from fastapi import Depends
from fastapi import HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from jose import JWTError
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from src.config import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, SECRET_KEY
from src.db.dals.UsersDAL import UsersDAL
from src.db.models.users import Users
from src.db.session import get_db
from src.auth.hasher import Hasher
from src.auth.security import create_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login/token")


async def _get_user_by_email_for_auth(login: str, session: AsyncSession):
    async with session.begin():
        user_dal = UsersDAL(session)
        return await user_dal.get_user_by_login(login=login)


async def get_current_user_from_token(token: str = Depends(oauth2_scheme),
                                      db: AsyncSession = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        login: str = payload.get("sub")
        if login is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = await _get_user_by_email_for_auth(login=login, session=db)
    if user is None:
        raise credentials_exception
    return user


async def authenticate_user(
        login: str, password: str, db: AsyncSession
) -> Union[Users, None]:
    user = await _get_user_by_email_for_auth(login=login, session=db)
    if user is None:
        return
    if not Hasher.verify_password(password, user.hashed_password):
        return
    return user


async def _gen_access_token(login):
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": login, "other_custom_data": [1, 2, 3, 4]},
        expires_delta=access_token_expires,
    )
    return access_token
