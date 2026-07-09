import { STATUS } from "../../state/studioStore";

const LABELS = {
  [STATUS.GENERATING]: "Generating…",
  [STATUS.COMPLETE]: "Generation complete",
  [STATUS.FAILED]: "Generation failed",
};

export default function ProgressIndicator({ status, inline = false }) {
  const label = LABELS[status];
  const isFailed = status === STATUS.FAILED;
  const isComplete = status === STATUS.COMPLETE;

  if (inline) {
    return (
      <span
        className={`font-mono text-[11px] ${
          isFailed ? "text-alert" : isComplete ? "text-success" : "text-text-muted"
        }`}
      >
        {label || "No generation in progress"}
      </span>
    );
  }

  if (!label) {
    return <p className="font-mono text-[11px] text-text-muted">No generation in progress</p>;
  }

  return (
    <div className="rounded-card border border-line bg-surface p-3">
      <div className="mb-2 text-[13px] font-medium">
        <span className={isFailed ? "text-alert" : isComplete ? "text-success" : "text-text-primary"}>
          {label}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
        <div
          className={`h-full rounded-full transition-all ${
            isFailed ? "w-full bg-alert" : isComplete ? "w-full bg-success" : "w-2/3 animate-pulse bg-accent"
          }`}
        />
      </div>
    </div>
  );
}