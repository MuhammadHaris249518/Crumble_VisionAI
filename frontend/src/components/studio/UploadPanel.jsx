import { useCallback, useRef, useState } from "react";
import { UploadCloud, X, ImageIcon, Loader2, CheckCircle2 } from "lucide-react";
import { uploadImage } from "../../services/api";
import StepBadge from "./StepBadge";

const ACCEPTED_TYPES = ["image/jpeg", "image/png"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

export default function UploadPanel({ image, onImageChange }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const validateAndSet = useCallback(
    async (file) => {
      if (!file) return;
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError("Only JPG and PNG images are supported.");
        return;
      }
      if (file.size > MAX_SIZE_BYTES) {
        setError("Image must be smaller than 10 MB.");
        return;
      }
      setError(null);
      onImageChange((prev) => ({
        ...(prev || {}),
        id: null,
        file,
        name: file.name,
        size: file.size,
        previewUrl: URL.createObjectURL(file),
      }));
      setUploading(true);
      try {
        const result = await uploadImage(file);
        onImageChange((prev) => ({ ...(prev || {}), id: result.image_id }));
      } catch (err) {
        setError(err.message || "Upload to server failed.");
      } finally {
        setUploading(false);
      }
    },
    [onImageChange]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndSet(e.dataTransfer.files?.[0]);
  };

  const handleRemove = () => {
    if (image?.previewUrl) URL.revokeObjectURL(image.previewUrl);
    onImageChange(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
  <div className="card p-5 animate-fade-in h-full flex flex-col">
      {/* Step label */}
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">1</span>
        <h2 className="text-sm font-semibold text-text-primary">Upload Image</h2>
      </div>

      {!image ? (
        <button
          type="button"
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          disabled={uploading}
          className={`group relative flex w-full flex-1 flex-col items-center justify-center gap-3 overflow-hidden rounded-panel border-2 border-dashed px-4 py-12 text-center transition-all duration-200 disabled:cursor-wait ${
            isDragging
              ? "border-accent bg-accent/5 shadow-accent"
              : "border-line-strong bg-surface-sunken hover:border-accent hover:bg-accent/[0.03]"
          }`}
        >
          {/* Animated gradient bg on drag */}
          {isDragging && (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
          )}

          {uploading ? (
            <>
              <Loader2 className="h-10 w-10 animate-spin text-accent" />
              <div>
                <p className="text-sm font-semibold text-text-primary">Uploading…</p>
                <p className="text-xs text-text-muted">Sending to backend</p>
              </div>
            </>
          ) : (
            <>
              <div className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                isDragging ? "border-accent bg-accent/10" : "border-line-strong bg-surface-card group-hover:border-accent group-hover:bg-accent/5"
              }`}>
                <UploadCloud className={`h-6 w-6 transition-colors ${isDragging ? "text-accent" : "text-text-muted group-hover:text-accent"}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  {isDragging ? "Release to upload" : "Drag & drop a cookie image"}
                </p>
                <p className="mt-0.5 text-xs text-text-muted">
                  or <span className="text-accent underline underline-offset-2">click to browse</span> · JPG / PNG · max 10 MB
                </p>
              </div>
            </>
          )}
        </button>
      ) : (
        <div className="group flex items-center gap-3 rounded-panel border border-line bg-surface-sunken p-3 transition-all animate-slide-up">
          <div className="relative h-16 w-16 flex-shrink-0">
            <img
              src={image.previewUrl}
              alt="Uploaded preview"
              className="h-full w-full rounded-card object-cover shadow-card"
            />
            {image.id && (
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-success ring-2 ring-surface-card">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-text-primary">{image.name}</p>
            <p className="text-xs text-text-muted">{(image.size / 1024).toFixed(0)} KB</p>
            <p className="mt-0.5 text-xs font-medium">
              {image.id ? (
                <span className="text-success">✓ Synced with backend</span>
              ) : (
                <span className="text-warning">⟳ Syncing…</span>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove image"
            className="rounded-full p-1.5 text-text-muted transition-colors hover:bg-alert/10 hover:text-alert"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={(e) => validateAndSet(e.target.files?.[0])}
      />

      {error && (
        <div className={`mt-3 flex items-start gap-2 rounded-card border px-3 py-2.5 ${
          /ngrok|backend|reach|network|tunnel/i.test(error)
            ? "border-warning/30 bg-warning/5"
            : "border-alert/20 bg-alert/5"
        }`}>
          <span className={`mt-0.5 text-sm flex-shrink-0 ${
            /ngrok|backend|reach|network|tunnel/i.test(error) ? "text-warning" : "text-alert"
          }`}>
            {/ngrok|backend|reach|network|tunnel/i.test(error) ? "⚡" : "⚠"}
          </span>
          <div>
            <p className={`text-xs font-semibold ${
              /ngrok|backend|reach|network|tunnel/i.test(error) ? "text-warning" : "text-alert"
            }`}>
              {/ngrok|backend|reach|network|tunnel/i.test(error)
                ? "Backend unreachable — check ngrok URL in vite.config.js"
                : error}
            </p>
            {/ngrok|backend|reach|network|tunnel/i.test(error) && (
              <p className="mt-0.5 text-[10px] text-warning/70">
                The image was previewed locally but could not be registered with the server.
                Update NGROK_TARGET and restart Vite, then re-upload.
              </p>
            )}
          </div>
        </div>
      )}
      {!image && !error && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-text-muted">
          <ImageIcon className="h-3.5 w-3.5" />
          No image selected yet
        </p>
      )}
    </div>
  );
}
