import { PenTool, Lock } from "lucide-react";

export default function AnnotationPanel({ image, mask }) {
  return (
    <div className="rounded-card border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text-primary">2. Annotate Region</h2>
        {mask && (
          <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
            Mask ready
          </span>
        )}
      </div>

      <div className="flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-card border border-dashed border-gray-300 bg-surface text-center">
        {!image ? (
          <>
            <Lock className="h-7 w-7 text-text-secondary" />
            <p className="text-sm font-medium text-text-primary">
              Upload an image to begin annotation
            </p>
            <p className="max-w-xs text-xs text-text-secondary">
              The Roboflow annotation interface will load here once an image is uploaded.
            </p>
          </>
        ) : (
          <>
            <PenTool className="h-7 w-7 text-text-secondary" />
            <p className="text-sm font-medium text-text-primary">
              Roboflow annotation interface loads here
            </p>
            <p className="max-w-xs text-xs text-text-secondary">
              Integration pending — see KPI 5 (embed) &amp; KPI 6 (mask export).
            </p>
          </>
        )}
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          disabled
          className="flex-1 rounded-card border border-gray-200 px-3 py-1.5 text-xs font-medium text-text-secondary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear
        </button>
        <button
          type="button"
          disabled
          className="flex-1 rounded-card border border-gray-200 px-3 py-1.5 text-xs font-medium text-text-secondary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}