const BASE = "/api/v1";

/**
 * ngrok free-tier: adds the header that bypasses the HTML interstitial page.
 * Without it, any request returns an HTML page → res.json() → parse crash.
 */
const NGROK_HEADERS = { "ngrok-skip-browser-warning": "true" };

/**
 * Safe fetch wrapper:
 *   1. Reads the raw response text first (never throws on empty body)
 *   2. Tries to parse as JSON — falls back to plain text for the error message
 *   3. Throws a human-readable Error for any non-2xx status
 */
async function apiFetch(url, options = {}) {
  let res;
  try {
    res = await fetch(url, {
      ...options,
      headers: {
        ...NGROK_HEADERS,
        ...(options.headers || {}),
      },
    });
  } catch (networkErr) {
    // Completely unreachable (no internet, backend stopped, CORS preflight killed)
    throw new Error(
      "Cannot reach the backend — make sure the Camber notebook is running " +
      "and the ngrok URL in vite.config.js is current."
    );
  }

  // Read body as text first — never throws even on empty body
  const raw = await res.text();

  // Try to parse as JSON; fall back to the raw text as the error detail
  let body;
  try {
    body = raw ? JSON.parse(raw) : null;
  } catch {
    // Non-JSON body (HTML error page, empty string, etc.)
    if (!res.ok) {
      const hint = raw.includes("ngrok")
        ? " The ngrok tunnel may have expired — update NGROK_TARGET in vite.config.js."
        : "";
      throw new Error(`Backend returned ${res.status} with a non-JSON body.${hint}`);
    }
    throw new Error(`Unexpected response from server (status ${res.status}).`);
  }

  if (!res.ok) {
    const detail = body?.detail || body?.message || raw || `HTTP ${res.status}`;
    throw new Error(detail);
  }

  return body;
}

/* ─────────────────────────────────────────── */

/**
 * Uploads an image file to the backend.
 * Returns { image_id, original_filename, content_type, size_bytes, created_at }.
 */
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  return apiFetch(`${BASE}/images/upload`, {
    method: "POST",
    body: formData,
  });
}

/**
 * Submits a generation request (image + mask + prompt).
 * Returns { id, image_id, prompt, status, result_url, mask_url, created_at }.
 */
export async function generateImage({ imageId, prompt, maskDataUrl }) {
  return apiFetch(`${BASE}/generations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image_id: imageId,
      prompt,
      mask_data: maskDataUrl,
    }),
  });
}

/**
 * Creates (or reuses) a Roboflow annotation session for an uploaded image.
 * Returns { roboflow_image_id, annotate_url }.
 */
export async function createRoboflowSession(imageId) {
  return apiFetch(
    `${BASE}/annotations/session?image_id=${encodeURIComponent(imageId)}`,
    { method: "POST" }
  );
}

/**
 * Polls Roboflow (via backend) for a finished annotation.
 * Returns { ready, mask_data, message }.
 */
export async function fetchRoboflowMask(imageId) {
  return apiFetch(`${BASE}/annotations/mask/${encodeURIComponent(imageId)}`);
}

/**
 * Runs MobileSAM box-prompted segmentation.
 * Returns { mask_data } — a data: URL PNG mask.
 */
export async function segmentWithSam({ imageId, box, point }) {
  return apiFetch(`${BASE}/sam/segment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image_id: imageId,
      box,
      ...(point ? { point } : {}),
    }),
  });
}