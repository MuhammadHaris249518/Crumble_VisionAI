import GenerateButton from "./GenerateButton";

const MAX_LENGTH = 300;

const QUICK_TAGS = ["cracked", "moldy", "underbaked", "chocolate chips", "broken edge", "burned"];

export default function PromptInput({ value, onChange, disabled, canGenerate, status, onGenerate }) {
  return (
    <div className="card p-5">
      {/* Step label */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">3</span>
          <h2 className="text-sm font-semibold text-text-primary">Describe the Defect</h2>
        </div>
        <span className={`font-mono text-xs transition-colors ${value.length > MAX_LENGTH * 0.85 ? "text-warning" : "text-text-muted"}`}>
          {value.length}/{MAX_LENGTH}
        </span>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_LENGTH))}
        disabled={disabled}
        rows={3}
        placeholder='e.g. "Make the selected area appear burned and darkened."'
        className="w-full resize-none rounded-card border border-line bg-surface-sunken p-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-150 focus:border-accent focus:bg-surface-card focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50"
      />

      {/* Quick-tag chips */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="text-[11px] text-text-muted self-center mr-1">Quick&nbsp;pick:</span>
        {QUICK_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            disabled={disabled}
            onClick={() => onChange(tag)}
            className="rounded-pill border border-line bg-surface-card px-2.5 py-0.5 text-[11px] font-medium text-text-secondary transition-all hover:border-accent hover:bg-accent/5 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            {tag}
          </button>
        ))}
      </div>

      {disabled && (
        <p className="mt-3 text-[11px] text-text-muted">Upload an image first to enable prompting.</p>
      )}

      <div className="mt-4">
        <GenerateButton disabled={!canGenerate} status={status} onClick={onGenerate} />
      </div>
    </div>
  );
}