import { PenTool, Lock, Brush, Eraser, Sparkles, Undo2, Redo2 } from "lucide-react";
import StepBadge from "./StepBadge";

export default function AnnotationPanel({ image, mask }) {
  return (
    <div className="flex h-full flex-col rounded-panel border border-line bg-white p-3.5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StepBadge n={2} />
          <p className="text-[13px] font-medium text-text-primary">Annotate region</p>
        </div>
        <span className={`font-mono text-[11px] ${mask ? "text-success" : "text-text-muted"}`}>
          {mask ? "Mask ready" : "No mask yet"}
        </span>
      </div>

      <div className="flex min-h-[220px] flex-1 flex-col items-center justify-center gap-2 rounded-card border border-dashed border-line-strong bg-surface text-center">
        {!image ? (
          <>
            <Lock className="h-7 w-7 text-text-muted" />
            <p className="text-[13px] font-medium text-text-primary">
              Upload an image to begin annotation
            </p>
            <p className="max-w-xs text-[11px] text-text-secondary">
              The Roboflow annotation interface will load here once an image is uploaded.
            </p>
          </>
        ) : (
          <>
            <PenTool className="h-7 w-7 text-text-muted" />
            <p className="text-[13px] font-medium text-text-primary">
              Roboflow annotation interface loads here
            </p>
            <p className="max-w-xs text-[11px] text-text-secondary">
              Integration pending — see KPI 5 (embed) &amp; KPI 6 (mask export).
            </p>
          </>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <button type="button" disabled className="tool-btn">
          <Brush className="h-3.5 w-3.5" /> Brush
        </button>
        <button type="button" disabled className="tool-btn">
          <Eraser className="h-3.5 w-3.5" /> Eraser
        </button>
        <button type="button" disabled className="tool-btn">
          <Sparkles className="h-3.5 w-3.5" /> AI select
        </button>
        <span className="flex-1" />
        <button type="button" disabled aria-label="Undo" className="tool-btn !px-2">
          <Undo2 className="h-3.5 w-3.5" />
        </button>
        <button type="button" disabled aria-label="Redo" className="tool-btn !px-2">
          <Redo2 className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          disabled
          className="flex-1 rounded-card border border-line px-3 py-1.5 text-[11px] font-medium text-text-secondary disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
        >
          Clear
        </button>
        <button
          type="button"
          disabled
          className="flex-1 rounded-card border border-line px-3 py-1.5 text-[11px] font-medium text-text-secondary disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
        >
          Reset
        </button>
      </div>
    </div>
  );
}