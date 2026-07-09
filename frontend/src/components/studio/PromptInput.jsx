import StepBadge from "./StepBadge";
import GenerateButton from "./GenerateButton";
import ProgressIndicator from "./ProgressIndicator";

const MAX_LENGTH = 300;

export default function PromptInput({
  value,
  onChange,
  disabled,
  canGenerate,
  status,
  onGenerate,
}) {
  return (
    <div className="rounded-panel border border-line bg-white p-3.5 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StepBadge n={3} />
          <p className="text-[13px] font-medium text-text-primary">Describe the Defect</p>
        </div>
        <span className="font-mono text-[11px] text-text-muted">
          {value.length}/{MAX_LENGTH}
        </span>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_LENGTH))}
        disabled={disabled}
        rows={3}
        placeholder='e.g. "Make the selected area appear burned."'
        className="w-full resize-none rounded-card border border-line bg-surface p-3 text-[13px] text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-60"
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-0.5 text-[11px] text-text-muted">Try</span>
          {["cracked", "moldy", "underbaked", "chocolate chips", "broken edge"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line bg-surface px-2 py-0.5 text-[11px] text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <ProgressIndicator status={status} inline />
          <GenerateButton disabled={!canGenerate} status={status} onClick={onGenerate} compact />
        </div>
      </div>

      {disabled && (
        <p className="mt-2 text-[11px] text-text-muted">Upload an image to enable prompting.</p>
      )}
    </div>
  );
}