import uuid

from sqlalchemy import (
    ForeignKey,
    String,
    Boolean
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.models.CONFIG import idpk, active, created_at, deactivated_at, alias
from src.db.session import Base
from enum import Enum, unique
from src.db.models.statistics import Statistics

@unique
class Roles(str, Enum):
    DEAN = "DEAN"
    HEAD_OF_THE_DEPARTMENT = "HEAD_OF_THE_DEPARTMENT"
    ADMIN = "ADMIN"

class Users(Base):
    __tablename__ = 'users'
    __table_args__ = {
        'comment': 'Пользователи'
    }

    id: Mapped[idpk]
    alias: Mapped[alias]
    login: Mapped[str] = mapped_column(String(30), unique=True, nullable=False, comment='Логин')
    hashed_password: Mapped[str] = mapped_column(String, nullable=False, comment='Пароль')
    surname: Mapped[str] = mapped_column(String(60), nullable=False, comment='Фамилия')
    name: Mapped[str] = mapped_column(String(100), nullable=False, comment='Имя')
    patronymic: Mapped[str] = mapped_column(String(100), nullable=True, comment='Отчество')
    role: Mapped[str] = mapped_column(String(100), nullable=False, comment='Роль')
    active: Mapped[active]
    created_at: Mapped[created_at]
    deactivated_at: Mapped[deactivated_at]

    statistic = relationship("Statistics", back_populates="user")
