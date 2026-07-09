import { useCallback, useRef, useState } from "react";
import { UploadCloud, X, ImageIcon, Loader2 } from "lucide-react";
import { uploadImage } from "../../services/api";
import StepBadge from "./StepBadge";

const ACCEPTED_TYPES = ["image/jpeg", "image/png"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // mirrors the backend rule defined in KPI 2

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
        setError("Image must be smaller than 10MB.");
        return;
      }
      setError(null);

      // Show preview immediately for responsiveness
      onImageChange((prev) => ({
        ...(prev || {}),
        id: null,
        file,
        name: file.name,
        size: file.size,
        previewUrl: URL.createObjectURL(file),
      }));

      // Upload to backend to get a real image_id
      setUploading(true);
      try {
        const result = await uploadImage(file);
        onImageChange((prev) => ({
          ...(prev || {}),
          id: result.image_id,
        }));
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
    <div className="flex h-full flex-col rounded-panel border border-line bg-white p-3.5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <StepBadge n={1} />
        <p className="text-[13px] font-medium text-text-primary">Upload image</p>
      </div>

      {!image ? (
        <button
          type="button"
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          disabled={uploading}
          className={`flex w-full flex-1 flex-col items-center justify-center gap-2 rounded-card border border-dashed px-4 py-9 text-center transition-colors disabled:cursor-wait ${
            isDragging ? "border-accent bg-accent-soft/40" : "border-line-strong bg-surface"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
              <p className="text-[13px] font-medium text-text-primary">Uploading to server…</p>
            </>
          ) : (
            <>
              <UploadCloud className="h-8 w-8 text-text-muted" />
              <p className="text-[13px] font-medium text-text-primary">
                Drag & drop a cookie or biscuit image
              </p>
              <p className="text-[11px] text-text-secondary">
                or click to browse · JPG/PNG · up to 10MB
              </p>
            </>
          )}
        </button>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-card border border-line bg-surface p-4">
          <img
            src={image.previewUrl}
            alt="Uploaded preview"
            className="h-40 w-full max-w-xs rounded-card object-cover"
          />
          <div className="flex w-full max-w-xs items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-text-primary">{image.name}</p>
              <p className="mt-0.5 font-mono text-[11px] text-text-secondary">
                {(image.size / 1024).toFixed(0)} KB
                {image.id ? (
                  <span className="ml-2 text-success">✓ synced</span>
                ) : (
                  <span className="ml-2 text-warning">⟳ syncing…</span>
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove image"
              className="rounded-full p-1.5 text-text-muted transition-colors hover:bg-surface-sunken hover:text-alert"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={(e) => validateAndSet(e.target.files?.[0])}
      />

      {error && <p className="mt-2 text-[11px] font-medium text-alert">{error}</p>}
      {!image && !error && (
        <p className="mt-2 flex items-center gap-1 text-[11px] text-text-muted">
          <ImageIcon className="h-3.5 w-3.5" /> No image selected yet
        </p>
      )}
    </div>
  );
}