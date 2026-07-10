import { ArrowLeft, FolderOpen, Sparkles } from "lucide-react";
import DatasetRecord from "../components/studio/DataRecord";

export default function DatasetPage({ studio, onBack }) {
  const hasResult = Boolean(studio.result?.url);

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:py-8">
      {/* Back link */}
      <button
        type="button"
        onClick={onBack}
        className="mb-5 flex items-center gap-1.5 text-xs font-medium text-text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to studio
      </button>

      {/* Page header */}
      <div className="mb-5">
        <h2 className="text-lg font-bold text-text-primary">Dataset record</h2>
        <p className="mt-0.5 text-sm text-text-muted">
          Each generation produces one annotated record ready for YOLO/classifier training.
        </p>
      </div>

      {hasResult ? (
        <DatasetRecord
          image={studio.image}
          prompt={studio.prompt}
          result={studio.result}
          maskUrl={studio.result?.maskUrl}
        />
      ) : (
        <div className="card flex flex-col items-center justify-center gap-4 px-6 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-line-strong bg-surface-sunken">
            <FolderOpen className="h-7 w-7 text-text-muted opacity-60" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">No dataset record yet</p>
            <p className="mt-1 max-w-xs text-xs text-text-muted">
              Upload an image, annotate a region, describe a defect, and click Generate — the
              record will appear here automatically.
            </p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="mt-1 flex items-center gap-2 rounded-pill border border-accent bg-accent/5 px-4 py-2 text-xs font-semibold text-accent transition-all hover:bg-accent hover:text-white hover:shadow-glow"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Go to studio
          </button>
        </div>
      )}
    </main>
  );
}