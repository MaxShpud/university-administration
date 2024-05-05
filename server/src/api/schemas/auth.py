from typing import Optional

from fastapi import HTTPException
from pydantic import constr, BaseModel, EmailStr, validator, UUID4, Field
import uuid
import re

LETTER_MATCH_PATTERN = re.compile(r"^[а-яА-Яa-zA-Z\-]+$")


class User:
    alias = Field(description="Универсальный уникальный идентификатор", example=uuid.uuid4())
    login = Field(description="Логин", example="")
    surname = Field(description='Фамилия', example="")
    name = Field(description='Имя', example="")
    patronymic = Field(description='Фамилия', example="")
    password = Field(description='Пароль', example="12321Max")
    role = Field(description='Роль', example="ADMIN")


class ShowUser(BaseModel):
    alias: UUID4 = User.alias
    surname: str = User.surname
    name: str = User.name
    patronymic: Optional[str] = User.patronymic
    role: str = User.role


class CurrentUserInfo(BaseModel):
    alias: UUID4 = User.alias
    login: str = User.login
    surname: str = User.surname
    name: str = User.name
    patronymic: Optional[str] = User.patronymic


class UserCreate(BaseModel):
    login: str = User.login
    password: str
    surname: str = User.surname
    name: str = User.name
    patronymic: Optional[str] = User.patronymic
    role: str

    @validator("login")
    def validate_login(cls, value):
        if not LETTER_MATCH_PATTERN.match(value):
            raise HTTPException(
                status_code=422, detail="Login should contains only letters"
            )
        return value

    @validator("surname")
    def validate_surname(cls, value):
        if not LETTER_MATCH_PATTERN.match(value):
            raise HTTPException(
                status_code=422, detail="Surname should contains only letters"
            )
        return value

    @validator("name")
    def validate_name(cls, value):
        if not LETTER_MATCH_PATTERN.match(value):
            raise HTTPException(
                status_code=422, detail="Name should contains only letters"
            )
        return value

    @validator("patronymic")
    def validate_patronymic(cls, value):
        if not LETTER_MATCH_PATTERN.match(value):
            raise HTTPException(
                status_code=422, detail="Patronymic should contains only letters"
            )
        return value


class DeleteUserResponse(BaseModel):
    deleted_user_id: int


class UpdatedUserResponse(BaseModel):
    updated_user_id: int


class UpdateUserRequest(BaseModel):
    name: Optional[constr(min_length=1)]
    surname: Optional[constr(min_length=1)]
    phone_number: Optional[constr(min_length=0)]
    about_me: Optional[constr(min_length=0)]

    @validator("name")
    def validate_name(cls, value):
        if not LETTER_MATCH_PATTERN.match(value):
            raise HTTPException(
                status_code=422, detail="Name should contains only letters"
            )
        return value

    @validator("surname")
    def validate_surname(cls, value):
        if not LETTER_MATCH_PATTERN.match(value):
            raise HTTPException(
                status_code=422, detail="Surname should contains only letters"
            )
        return value
