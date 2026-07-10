import { Sparkles, Loader2 } from "lucide-react";
import { STATUS } from "../../state/studioStore";

export default function GenerateButton({ disabled, status, onClick, compact = false }) {
  const isGenerating = status === STATUS.GENERATING;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group relative w-full overflow-hidden rounded-card py-3 text-sm font-semibold transition-all duration-200 ${
        disabled
          ? "cursor-not-allowed bg-line text-text-muted"
          : isGenerating
          ? "cursor-wait bg-accent text-white"
          : "bg-accent text-white shadow-sm hover:opacity-90 hover:shadow-glow active:scale-[0.99]"
      }`}
    >
      {/* Shimmer sweep on hover when idle+enabled */}
      {!disabled && !isGenerating && (
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-700 group-hover:translate-x-full"
          aria-hidden="true"
        />
      )}

      {/* Pulse overlay while generating */}
      {isGenerating && (
        <span className="absolute inset-0 animate-pulse rounded-card bg-accent-hover/30" aria-hidden="true" />
      )}

      <span className="relative flex items-center justify-center gap-2">
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating…
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Generate Synthetic Defect
          </>
        )}
      </span>
    </button>
  );
}