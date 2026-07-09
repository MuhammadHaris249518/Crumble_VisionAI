import { Sparkles, Loader2 } from "lucide-react";
import { STATUS } from "../../state/studioStore";

export default function GenerateButton({ disabled, status, onClick, compact = false }) {
  const isGenerating = status === STATUS.GENERATING;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 rounded-card border border-accent bg-white text-[13px] font-semibold text-accent transition-colors hover:bg-accent-soft disabled:cursor-not-allowed disabled:border-line disabled:bg-surface-sunken disabled:text-text-muted ${
        compact ? "px-4 py-2" : "w-full px-4 py-3"
      }`}
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating…
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          Generate
        </>
      )}
    </button>
  );
}