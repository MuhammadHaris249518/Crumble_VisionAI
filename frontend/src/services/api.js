const BASE = "/api/v1";

/**
 * Upload an image to the backend.
 * Returns { image_id, original_filename, content_type, size_bytes, created_at }
 */
export async function uploadImage(file) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${BASE}/images/upload`, {
    method: "POST",
    body: form,
  });

  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.detail || "Upload failed");
  }

  return body;
}

/**
 * Generate a synthetic defect image.
 * Currently uses a stub endpoint that echoes back the original image
 * (since the AI model is not yet implemented — Workstream B).
 *
 * In the future this will accept { image_id, roboflow_mask, prompt }.
 */
export async function generateImage({ imageId, prompt }) {
  const res = await fetch(`${BASE}/generations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image_id: imageId,
      prompt: prompt,
    }),
  });

  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.detail || "Generation failed");
  }

  return body;
}