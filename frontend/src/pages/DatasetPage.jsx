import { ArrowLeft, FolderOpen } from "lucide-react";
import DatasetRecord from "../components/studio/DatasetRecord";

export default function DatasetPage({ studio, onBack }) {
  const hasResult = Boolean(studio.result?.url);

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:py-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 text-[12px] font-medium text-text-secondary transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to studio
      </button>

      <div className="mb-4">
        <h2 className="text-[15px] font-semibold text-text-primary">Dataset record</h2>
        <p className="text-[13px] text-text-secondary">
          The generated defect image, ready for use as synthetic training data.
        </p>
      </div>

      {hasResult ? (
        <DatasetRecord image={studio.image} prompt={studio.prompt} result={studio.result} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-panel border border-dashed border-line-strong bg-white px-6 py-16 text-center">
          <FolderOpen className="h-8 w-8 text-text-muted" />
          <p className="text-[13px] font-medium text-text-primary">No dataset record yet</p>
          <p className="max-w-xs text-[12px] text-text-secondary">
            Upload an image, describe a defect, and generate a result in the Studio tab —
            it will appear here automatically.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="mt-1 rounded-card border border-accent bg-accent-soft px-3.5 py-1.5 text-[12px] font-medium text-accent transition-colors hover:bg-accent hover:text-white"
          >
            Go to studio
          </button>
        </div>
      )}
    </main>
  );
}