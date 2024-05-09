from typing import Optional, List

from fastapi import HTTPException
from pydantic import constr, BaseModel, EmailStr, validator, UUID4, Field
import uuid
import datetime


class Statistic:
    alias = Field(description="Уникальный идентификатор записи", example=uuid.uuid4())
    indicators = Field(description='Показатели',
                       example="Организация идеологической, воспитательной работы и информационной работы на кафедре")
    control_period = Field(description='Период контроля (отчетный)', example="Март")
    value_of_indicators = Field(description='Значения показателей',
                                example="Участие в организации диалоговых площадок,Дни открытых дверей, профработа со школьникамиПросмотры фильмов")
    max_amount_of_additional_bonus = Field(description='Максимальный размер доп премии (в % от оклада)', example="5%")
    note = Field(description='Примечание',
                 example="устанавливается и выплачивается ежемесячно, в течение квартала, следующего за отчетным")
    proposed_amount_of_additional_bonus = Field(description='Предпалагаемый размер дополнительной премии', example="5%")
    active = Field(description="", example=True)
    created_at = Field(description="", example="2024-03-29 13:16:06.670")
    deactivated_at = Field(description="", example="2024-03-29 13:16:06.670")
    user_id = Field(description='Ссылка на юзера')


class CreateStatistic(BaseModel):
    indicators: Optional[str] = Statistic.indicators
    control_period: Optional[str] = Statistic.control_period
    value_of_indicators: Optional[str] = Statistic.value_of_indicators
    max_amount_of_additional_bonus: Optional[str] = Statistic.max_amount_of_additional_bonus
    note: Optional[str] = Statistic.note
    proposed_amount_of_additional_bonus: Optional[str] = Statistic.proposed_amount_of_additional_bonus


class ResponseStatistic(BaseModel):
    alias: UUID4 = Statistic.alias
    indicators: str = Statistic.indicators
    control_period: str = Statistic.control_period
    value_of_indicators: str = Statistic.value_of_indicators
    max_amount_of_additional_bonus: str = Statistic.max_amount_of_additional_bonus
    note: str = Statistic.note
    proposed_amount_of_additional_bonus: str = Statistic.proposed_amount_of_additional_bonus
    user_id: int = Statistic.user_id


class ResponseStatistics(BaseModel):
    statistics: List[ResponseStatistic]


class UpdateStatistic(BaseModel):
    indicators: Optional[str] = None
    control_period: Optional[str] = None
    value_of_indicators: Optional[str] = None
    max_amount_of_additional_bonus: Optional[str] = None
    note: Optional[str] = None
    proposed_amount_of_additional_bonus: Optional[str] = None
