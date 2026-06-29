from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.health import router as health_router
from app.api.v1.auth_routes import router as auth_router
from app.api.v1.task_routes import router as task_router
from app.api.v1.dashboard_routes import router as dashboard_router
from app.api.v1.activity_routes import router as activity_router
from app.api.v1.notification_routes import (
    router as notification_router,
)


app = FastAPI(
    title="FarmGym API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    health_router,
    prefix="/api/v1",
)

app.include_router(
    auth_router,
    prefix="/api/v1",
)

app.include_router(
    task_router,
    prefix="/api/v1",
)

app.include_router(
    dashboard_router,
    prefix="/api/v1",
)

app.include_router(
    activity_router,
    prefix="/api/v1",
)

app.include_router(
    notification_router,
    prefix="/api/v1",
)


@app.get("/")
def root():
    return {
        "message": "FarmGym API Running",
    }