# Repo path: Backend/app/api/v1/generations.py  (NEW FILE)
"""
Stub generation endpoint (KPI 9).

Until Workstream B delivers the real fine-tuned model, this endpoint
accepts a generation request and returns a stub response that matches
the agreed contract shape — so the frontend can be fully integrated
and tested end-to-end.

When the real model is ready, swap the logic in generate_defect()
for a call to the served model endpoint. No frontend changes needed.
"""
import shutil
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.db import repository

router = APIRouter(prefix="/generations", tags=["generations"])


class GenerationRequest(BaseModel):
    image_id: str
    prompt: str


class GenerationResponse(BaseModel):
    image_id: str
    result_url: str
    prompt: str
    status: str = "complete"


@router.post("", response_model=GenerationResponse, summary="Generate a synthetic defect (stub)")
async def create_generation(
    req: GenerationRequest,
    db: Session = Depends(get_db),
):
    # 1. Verify the source image exists
    image = repository.get_image_by_id(db, req.image_id)
    if not image:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Image with id '{req.image_id}' not found.",
        )

    # 2. Stub: copy the original image as the "generated" result
    #    In production this would call the fine-tuned model.
    source_path = Path(image.storage_path)
    if not source_path.exists():
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Source image file not found on disk.",
        )

    result_dir = Path("storage/results")
    result_dir.mkdir(parents=True, exist_ok=True)
    result_path = result_dir / f"result_{req.image_id}{source_path.suffix}"
    shutil.copy2(str(source_path), str(result_path))

    # 3. Return the result URL (served as static file or via endpoint)
    #    For development, we serve from the /storage path via a mount.
    result_url = f"/storage/results/result_{req.image_id}{source_path.suffix}"

    return GenerationResponse(
        image_id=req.image_id,
        result_url=result_url,
        prompt=req.prompt,
        status="complete",
    )