import datetime
from typing import Annotated
from sqlalchemy.orm import mapped_column
from sqlalchemy import func
from sqlalchemy import (
    BIGINT
)
import uuid

idpk = Annotated[int, mapped_column(BIGINT, primary_key=True, nullable=False, autoincrement=True,
                                    comment='Уникальный идентификатор дела')]
active = Annotated[bool, mapped_column(nullable=False, default=True, comment='Статус активности')]
created_at = Annotated[
    datetime.datetime, mapped_column(nullable=False, comment='Дата создания', server_default=func.now())]
deactivated_at = Annotated[datetime.datetime, mapped_column(nullable=True, comment='Дата Деактивации')]
alias = Annotated[uuid.UUID, mapped_column(nullable=False, unique=True,
                                           comment='Универсальный уникальный идентификатор')]
