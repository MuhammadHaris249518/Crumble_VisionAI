# Repo path: Backend/app/db/models.py  (NEW FILE)
"""
No `models` file existed in the scaffold, so this is a new module.
It's imported once, from app.main, so Base.metadata is aware of it
before create_all() runs.
"""
from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Integer, String

from app.db.base import Base


class Image(Base):
    __tablename__ = "images"

    id = Column(String(36), primary_key=True, index=True)
    original_filename = Column(String(255), nullable=False)
    content_type = Column(String(50), nullable=False)
    size_bytes = Column(Integer, nullable=False)
    storage_path = Column(String(500), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))