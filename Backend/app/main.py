# Repo path: Backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import images
from app.core.config import get_settings
from app.db import models  # noqa: F401  (registers models on Base.metadata)
from app.db.base import Base
from app.db.session import engine

settings = get_settings()

# Dev-friendly table creation. Swap for Alembic migrations once the schema
# needs versioned changes.
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(images.router, prefix="/api/v1")


@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok"}