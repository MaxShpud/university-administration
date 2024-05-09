from datetime import timedelta

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from src.config import ACCESS_TOKEN_EXPIRE_MINUTES
from src.auth.actions.auth import authenticate_user
from src.api.schemas.token import Token
from src.db.session import get_db
from src.auth.security import create_access_token
from src.api.schemas.statistic import (CreateStatistic,
                                       ResponseStatistic,
                                       ResponseStatistics,
                                       UpdateStatistic)
from src.db.models.users import Users
from src.auth.actions.auth import get_current_user_from_token
from src.services.statistic import _create_statistic
from src.services.statistic import _get_statistic
from src.services.statistic import _get_statistic_by_control_period
from src.services.statistic import _update_statistic

statistic_router = APIRouter()


@statistic_router.post("", response_model=ResponseStatistic)
async def create_statistic(
        body: CreateStatistic,
        db: AsyncSession = Depends(get_db),
        current_user: Users = Depends(get_current_user_from_token)
) -> ResponseStatistic:
    if current_user.role != "ADMIN" and current_user.role != "DEAN":
        raise HTTPException(
            status_code=403,
            detail="Forbidden."
        )
    print(body)
    statistic = await _create_statistic(body, current_user.id, db)
    return statistic


@statistic_router.get("/{statistic_alias}", response_model=ResponseStatistic)
async def get_statistic(
        statistic_alias: str,
        db: AsyncSession = Depends(get_db),
        current_user: Users = Depends(get_current_user_from_token)
) -> ResponseStatistic:
    statistic = await _get_statistic(statistic_alias, db)
    if statistic is None:
        raise HTTPException(
            status_code=404, detail="Statistic not found."
        )
    return statistic


@statistic_router.get("s/{control_period}", response_model=ResponseStatistics, summary="Период контроля")
async def get_stats_by_control_period(
        control_period: str,
        db: AsyncSession = Depends(get_db),
        current_user: Users = Depends(get_current_user_from_token)
) -> ResponseStatistics:
    statistic = await _get_statistic_by_control_period(control_period, db)
    if statistic is None:
        raise HTTPException(
            status_code=404, detail="Statistics not found."
        )
    return statistic

@statistic_router.put("/{statistic_alias}")
async def update_statistic(
        statistic_alias: str,
        data: UpdateStatistic,
        db: AsyncSession = Depends(get_db),
        current_user: Users = Depends(get_current_user_from_token)
):
    try:
        updated_data = data.dict(exclude_unset=True)
        await _update_statistic(updated_data, statistic_alias, db)
    except HTTPException as error:
        raise HTTPException(
            status_code=500, detail=f"Server error: {error}"
        )
