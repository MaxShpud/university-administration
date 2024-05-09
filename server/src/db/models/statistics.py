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



class Statistics(Base):
    __tablename__ = 'statistics'
    __table_args__ = {
        'comment': 'Данные для расчета статистики о КПД'
    }

    id: Mapped[idpk]
    alias: Mapped[alias]
    indicators: Mapped[str] = mapped_column(nullable=True, comment='Показатели', default="")
    control_period: Mapped[str] = mapped_column(nullable=True, comment='Период контроля (отчетный)', default="")
    value_of_indicators: Mapped[str] = mapped_column(nullable=True, comment='Значения показателей', default="")
    max_amount_of_additional_bonus: Mapped[str] = mapped_column(nullable=True, comment='Максимальный размер доп премии (в % от оклада)', default="")
    note: Mapped[str] = mapped_column(nullable=True, comment='Примечание', default="")
    proposed_amount_of_additional_bonus: Mapped[str] = mapped_column(nullable=True, comment='Предпалагаемый размер дополнительной премии', default="")
    active: Mapped[active]
    created_at: Mapped[created_at]
    deactivated_at: Mapped[deactivated_at]
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, comment='Ссылка на юзера кто создал запись')

    user = relationship("Users", back_populates="statistic")

