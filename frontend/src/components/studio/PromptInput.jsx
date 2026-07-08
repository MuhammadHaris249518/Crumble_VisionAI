const MAX_LENGTH = 300;

export default function PromptInput({ value, onChange, disabled }) {
  return (
    <div className="rounded-card border border-line bg-paper p-4 shadow-card">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="step-tag">03</span>
          <h2 className="font-display text-[15px] font-semibold text-text-primary">
            Describe the Defect
          </h2>
        </div>
        <span className="font-mono text-[11px] text-text-secondary">
          {value.length}/{MAX_LENGTH}
        </span>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_LENGTH))}
        disabled={disabled}
        rows={3}
        placeholder='e.g. "Make the selected area appear burned."'
        className="w-full resize-none rounded-card border border-line bg-muted/40 p-3 text-sm text-text-primary placeholder:text-text-secondary/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
      />

      <div className="mt-2 flex flex-wrap gap-1.5">
        {["cracked", "moldy", "underbaked", "chocolate chips", "broken edge"].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line bg-muted px-2 py-0.5 font-mono text-[11px] text-text-secondary"
          >
            {tag}
          </span>
        ))}
      </div>

      {disabled && (
        <p className="mt-2 text-xs text-text-secondary">Upload an image to enable prompting.</p>
      )}
    </div>
  );
}