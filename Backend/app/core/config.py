# Repo path: Backend/app/core/config.py
from functools import lru_cache
from typing import List

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "Crumb Studio AI Backend"

    # Database
    DATABASE_URL: str = "sqlite:///./crumb_studio.db"

    # Image upload (KPI 2)
    UPLOAD_DIR: str = "storage/uploads"
    MAX_UPLOAD_SIZE_MB: int = 10
    ALLOWED_IMAGE_CONTENT_TYPES: List[str] = ["image/jpeg", "image/png"]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    return Settings()