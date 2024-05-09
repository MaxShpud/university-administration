from typing import Union, Sequence
from sqlalchemy import and_
from sqlalchemy import select
from sqlalchemy import update
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.models.statistics import Statistics
from src.db.models.users import Users
from uuid import uuid4
import uuid
import datetime
from sqlalchemy import func


class StatisticsDAL:
    """Data Access Layer for operating statistic info"""

    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def create_user(
            self,
            data,
            user_id
    ) -> Statistics:
        now = datetime.datetime.utcnow()
        new_stat = Statistics(
            alias=uuid.uuid4(),
            indicators=data.indicators,
            control_period=data.control_period,
            value_of_indicators=data.value_of_indicators,
            max_amount_of_additional_bonus=data.max_amount_of_additional_bonus,
            note=data.note,
            proposed_amount_of_additional_bonus=data.proposed_amount_of_additional_bonus,
            created_at=now,
            user_id=user_id
        )
        self.db_session.add(new_stat)
        await self.db_session.commit()
        return new_stat

    async def get_statistic_by_alias(self, alias
                                    ) -> Statistics:
        query = select(Statistics).where(
            and_(Statistics.alias == alias, Statistics.active == True))
        result = await self.db_session.execute(query)
        statistic = result.scalar_one_or_none()
        if statistic is not None:
            return statistic

    async def get_statistic_by_control_period(self, control_period
                                              ) -> Sequence[Statistics]:
        query = select(Statistics).where(
            and_(Statistics.control_period == control_period, Statistics.active == True))
        result = await self.db_session.execute(query)
        statistics = result.scalars().all()
        return statistics


    async def update_statistic(self, alias, **kwargs):
        query = (
            update(Statistics)
            .where(and_(Statistics.alias == alias, Statistics.active == True))
            .values(kwargs)
        )
        await self.db_session.execute(query)
        await self.db_session.commit()

