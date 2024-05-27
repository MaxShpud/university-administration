from src.db.dals.StatisticsDAL import StatisticsDAL
from src.api.schemas.statistic import (ResponseStatistic,
                                       ResponseStatistics)


async def _create_statistic(data, user_id, session) -> ResponseStatistic:
    statistic_dal = StatisticsDAL(session)
    statistic = await statistic_dal.create_user(data, user_id)
    return ResponseStatistic(
        alias=statistic.alias,
        indicators=statistic.indicators,
        control_period=statistic.control_period,
        value_of_indicators=statistic.value_of_indicators,
        max_amount_of_additional_bonus=statistic.max_amount_of_additional_bonus,
        note=statistic.note,
        proposed_amount_of_additional_bonus=statistic.proposed_amount_of_additional_bonus,
        user_id=statistic.user_id
    )


async def _get_statistic(alias, session) -> ResponseStatistic:
    statistic_dal = StatisticsDAL(session)
    statistic = await statistic_dal.get_statistic_by_alias(alias)
    if statistic is not None:
        return ResponseStatistic(
            alias=statistic.alias,
            indicators=statistic.indicators,
            control_period=statistic.control_period,
            value_of_indicators=statistic.value_of_indicators,
            max_amount_of_additional_bonus=statistic.max_amount_of_additional_bonus,
            note=statistic.note,
            proposed_amount_of_additional_bonus=statistic.proposed_amount_of_additional_bonus,
            user_id=statistic.user_id
        )
    return statistic


async def _get_statistic_by_control_period(control_period, session) -> ResponseStatistics:
    statistic_dal = StatisticsDAL(session)
    statistics = await statistic_dal.get_statistic_by_control_period(control_period)
    statistics_list = []
    if statistics is not None:
        for statistic in statistics:
            statistics_list.append(
                ResponseStatistic(
                    alias=statistic.alias,
                    indicators=statistic.indicators,
                    control_period=statistic.control_period,
                    value_of_indicators=statistic.value_of_indicators,
                    max_amount_of_additional_bonus=statistic.max_amount_of_additional_bonus,
                    note=statistic.note,
                    proposed_amount_of_additional_bonus=statistic.proposed_amount_of_additional_bonus,
                    user_id=statistic.user_id
                )
            )
    return ResponseStatistics(statistics=statistics_list)


async def _update_statistic(data, alias, session):
    statistic_dal = StatisticsDAL(session)
    print(data)
    await statistic_dal.update_statistic(alias, **data)

async def _deactivate_statistic(alias, session):
    statistic_dal = StatisticsDAL(session)
    await statistic_dal.deactivate_statistic(alias)
