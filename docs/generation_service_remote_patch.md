# Patch: call the Colab-hosted model instead of loading it in-process

File: `Backend/app/services/generation_service.py`

## 1. Add near the top, with the other imports

```python
import base64
import io
import os
import requests
```

## 2. Replace `_generate_with_real_model` with this version

It tries the remote Colab endpoint first (if `INPAINTING_SERVICE_URL` is set),
and falls back to the existing local-pipeline path if the env var is unset —
so this works whether or not Colab is running, with no other code changes.

```python
_INPAINTING_SERVICE_URL = os.environ.get("INPAINTING_SERVICE_URL")  # e.g. https://xxxx.ngrok-free.app


def _generate_with_remote_model(source: Image.Image, mask_img: Image.Image, prompt: str) -> Image.Image:
    def _to_b64(img: Image.Image) -> str:
        buf = io.BytesIO()
        img.save(buf, format="PNG")
        return base64.b64encode(buf.getvalue()).decode()

    resp = requests.post(
        f"{_INPAINTING_SERVICE_URL.rstrip('/')}/generate",
        json={
            "image_b64": _to_b64(source),
            "mask_b64": _to_b64(mask_img),
            "prompt": prompt,
        },
        timeout=120,  # SDXL @ 40 steps / 1024px can take 20-60s on a T4
    )
    resp.raise_for_status()
    result_b64 = resp.json()["image_b64"]
    return Image.open(io.BytesIO(base64.b64decode(result_b64)))


def _generate_with_real_model(source: Image.Image, mask_img: Image.Image, prompt: str) -> Image.Image:
    if _INPAINTING_SERVICE_URL:
        logger.info("Calling remote inpainting service at %s", _INPAINTING_SERVICE_URL)
        return _generate_with_remote_model(source, mask_img, prompt)

    # --- existing local-pipeline path (unchanged) ---
    pipe = _load_pipeline()

    init_image = source.resize((1024, 1024))
    mask_gray = mask_img.convert("L").resize((1024, 1024))
    mask_array = [255 if px > 20 else 0 for px in mask_gray.getdata()]
    mask_clean = Image.new("L", mask_gray.size)
    mask_clean.putdata(mask_array)
    mask_clean = mask_clean.filter(ImageFilter.GaussianBlur(radius=12))

    result = pipe(
        prompt=prompt,
        negative_prompt="blurry, smooth, plastic texture, cartoon, drawing, 3d render",
        image=init_image,
        mask_image=mask_clean,
        height=1024, width=1024,
        strength=0.95, guidance_scale=7.0, num_inference_steps=40,
    ).images[0]

    return result.resize(source.size)
```

## 3. Set the env var

In `Backend/.env` (or wherever your ngrok/backend env vars already live):

```
INPAINTING_SERVICE_URL=https://xxxx.ngrok-free.app
```

Paste the URL printed by cell 6 of the Colab notebook. It changes every time
you restart the Colab session, so this needs updating each time — for a
final-year-project demo that's fine; if it becomes annoying, ngrok's paid
tier gives you a fixed subdomain.

## 4. requirements.txt

Make sure `requests` is in `Backend/requirements.txt` (it's a transitive
dependency of several packages already, but pin it explicitly to be safe):

```
requests>=2.31.0
```

## Why this is the right integration point

- No change needed to `Backend/app/api/v1/generations.py` — it already just
  calls `generate_defect()`, which calls `_generate_with_real_model()`.
- The existing fallback-to-stub-effect behavior on exceptions (in
  `generate_defect`) is preserved — if the Colab tunnel is down or times out,
  `requests.post` raises, and the existing `except Exception` block in
  `generate_defect()` still catches it and falls back to the stub prompt
  effects instead of crashing the request.
- Nothing in the frontend, API contract, or database schema changes — this
  matches the "single integration point" design goal from Section 14 of the
  SAD/SRS (swap the model call, keep the contract fixed).
