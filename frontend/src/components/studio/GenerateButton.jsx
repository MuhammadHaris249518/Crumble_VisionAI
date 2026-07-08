import { Sparkles, Loader2 } from "lucide-react";
import { STATUS } from "../../state/studioStore";

export default function GenerateButton({ disabled, status, onClick }) {
  const isGenerating = status === STATUS.GENERATING;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center justify-center gap-2 rounded-card bg-ink px-4 py-3 text-sm font-semibold text-text-onink shadow-card transition-all hover:bg-accent-dark active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-line disabled:text-text-secondary disabled:shadow-none"
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