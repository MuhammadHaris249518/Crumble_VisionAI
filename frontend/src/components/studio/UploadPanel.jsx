import { useCallback, useRef, useState } from "react";
import { UploadCloud, X, ImageIcon } from "lucide-react";

const ACCEPTED_TYPES = ["image/jpeg", "image/png"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // mirrors the backend rule defined in KPI 2

export default function UploadPanel({ image, onImageChange }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);

  const validateAndSet = useCallback(
    (file) => {
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
      onImageChange({
        id: null, // real id comes from POST /api/v1/images — see KPI 2
        file,
        name: file.name,
        size: file.size,
        previewUrl: URL.createObjectURL(file),
      });
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
    <div className="rounded-card border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-text-primary">1. Upload Image</h2>

      {!image ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex w-full flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed px-4 py-10 text-center transition-colors ${
            isDragging ? "border-accent bg-accent/5" : "border-gray-300 bg-surface"
          }`}
        >
          <UploadCloud className="h-8 w-8 text-text-secondary" />
          <p className="text-sm font-medium text-text-primary">
            Drag &amp; drop a cookie or biscuit image
          </p>
          <p className="text-xs text-text-secondary">
            or click to browse · JPG/PNG · up to 10MB
          </p>
        </button>
      ) : (
        <div className="flex items-center gap-3 rounded-card border border-gray-200 p-3">
          <img
            src={image.previewUrl}
            alt="Uploaded preview"
            className="h-16 w-16 rounded-card object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-text-primary">{image.name}</p>
            <p className="text-xs text-text-secondary">{(image.size / 1024).toFixed(0)} KB</p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove image"
            className="rounded-full p-1.5 text-text-secondary hover:bg-surface hover:text-alert"
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

      {error && <p className="mt-2 text-xs font-medium text-alert">{error}</p>}
      {!image && !error && (
        <p className="mt-2 flex items-center gap-1 text-xs text-text-secondary">
          <ImageIcon className="h-3.5 w-3.5" /> No image selected yet
        </p>
      )}
    </div>
  );
}