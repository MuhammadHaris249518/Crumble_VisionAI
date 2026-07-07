# Repo path: Backend/app/db/models.py  (NEW FILE)
"""
No `models` file existed in the scaffold, so this is a new module.
It's imported once, from app.main, so Base.metadata is aware of it
before create_all() runs.
"""
import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String

from app.db.base import Base


class Image(Base):
    __tablename__ = "images"

    id = Column(String(36), primary_key=True, index=True)
    original_filename = Column(String(255), nullable=False)
    content_type = Column(String(50), nullable=False)
    size_bytes = Column(Integer, nullable=False)
    storage_path = Column(String(500), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class Generation(Base):
    """
    One row per generation request (FR-13 / session persistence).

    mask_reference stores the path to the annotation-derived mask on disk.
    Today that mask comes from the in-browser brush annotator; the column
    is intentionally source-agnostic so it can hold a Roboflow-exported
    mask later with no schema change.
    """

    __tablename__ = "generations"

    id = Column(String(36), primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    image_id = Column(String(36), ForeignKey("images.id"), nullable=False, index=True)
    prompt = Column(String(1000), nullable=False)
    mask_reference = Column(String(500), nullable=True)
    status = Column(String(20), nullable=False, default="pending")  # pending|processing|complete|failed
    result_path = Column(String(500), nullable=True)
    error_message = Column(String(1000), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )