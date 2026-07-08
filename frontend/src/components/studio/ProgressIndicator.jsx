import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { STATUS } from "../../state/studioStore";

const LABELS = {
  [STATUS.GENERATING]: "Generating your image…",
  [STATUS.COMPLETE]: "Generation complete",
  [STATUS.FAILED]: "Generation failed",
};

export default function ProgressIndicator({ status }) {
  const label = LABELS[status];

  if (!label) {
    return (
      <div className="rounded-card border border-dashed border-line bg-paper/60 px-4 py-3 text-center font-mono text-xs text-text-secondary">
        No generation in progress
      </div>
    );
  }

  const isFailed = status === STATUS.FAILED;
  const isComplete = status === STATUS.COMPLETE;

  const Icon = isFailed ? AlertTriangle : isComplete ? CheckCircle2 : Loader2;
  const tone = isFailed ? "text-clay" : isComplete ? "text-success" : "text-accent-dark";

  return (
    <div className="rounded-card border border-line bg-paper p-4 shadow-card">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium">
        <Icon className={`h-4 w-4 ${tone} ${!isFailed && !isComplete ? "animate-spin" : ""}`} />
        <span className={tone}>{label}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${
            isFailed
              ? "w-full bg-clay"
              : isComplete
              ? "w-full bg-success"
              : "w-2/3 animate-pulse bg-accent"
          }`}
        />
      </div>
    </div>
  );
}