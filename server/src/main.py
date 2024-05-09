from fastapi import FastAPI
import uvicorn
from fastapi.routing import APIRouter

from src.api.handlers.login import login_router
from src.api.handlers.auth import user_router
from src.api.handlers.statistic import statistic_router

app = FastAPI(title="University administration")

main_api_router = APIRouter(prefix='/api')

main_api_router.include_router(login_router, prefix="/login", tags=["Token"])
main_api_router.include_router(user_router, prefix="/user", tags=["AUTH"])
main_api_router.include_router(statistic_router, prefix="/statistic", tags=["STATISTIC"])

app.include_router(main_api_router)

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
