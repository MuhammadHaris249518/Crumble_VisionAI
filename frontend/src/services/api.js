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
 *
 * Sends { image_id, prompt, mask_data } where mask_data is the base64 PNG
 * data URI produced by the in-browser annotation tool (white = region to
 * edit, black = untouched).
 */
export async function generateImage({ imageId, prompt, maskDataUrl }) {
  const res = await fetch(`${BASE}/generations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image_id: imageId,
      prompt: prompt,
      mask_data: maskDataUrl,
    }),
  });

  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.detail || "Generation failed");
  }

  return body;
}