from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import auth, device
from app.utils import create_db_and_tables


def on_startup():
    create_db_and_tables()


@asynccontextmanager
async def lifespan(app: FastAPI):
    on_startup()
    yield


app = FastAPI(
    title=settings.app_name, debug=settings.debug, version="1.0.0", lifespan=lifespan
)

app.include_router(auth.router, prefix="/api")
app.include_router(device.router, prefix="/api")


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_hosts,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
