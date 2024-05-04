from fastapi import FastAPI
import uvicorn
from fastapi.routing import APIRouter

from src.api.handlers.login import login_router
from src.api.handlers.auth import user_router

app = FastAPI(title="University administration")

main_api_router = APIRouter(prefix='/universityAdministration/api/v1')

main_api_router.include_router(login_router, prefix="/token", tags=["Token"])
main_api_router.include_router(user_router, prefix="/user", tags=["AUTH"])

app.include_router(main_api_router)

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
