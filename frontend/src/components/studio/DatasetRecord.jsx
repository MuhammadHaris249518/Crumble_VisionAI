import { Database, ImageDown, Clock } from "lucide-react";

const DEFECT_KEYWORDS = [
  ["burned", "burned"],
  ["crack", "cracked"],
  ["broken", "broken edge"],
  ["mold", "moldy"],
  ["underbak", "underbaked"],
  ["chocolate", "chocolate chips"],
];

function detectDefectClass(prompt) {
  const p = prompt.toLowerCase();
  const match = DEFECT_KEYWORDS.find(([needle]) => p.includes(needle));
  return match ? match[1] : "custom";
}

function formatTimestamp(date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function DatasetRecord({ image, prompt, result }) {
  if (!result?.url) return null;

  const recordId = image?.id ? `syn_${image.id.slice(0, 8)}` : "syn_unknown";
  const defectClass = detectDefectClass(prompt);
  const createdAt = result.createdAt ? new Date(result.createdAt) : new Date();

  return (
    <div className="rounded-panel border border-line bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-text-muted" />
          <p className="text-[13px] font-medium text-text-primary">Dataset record</p>
        </div>
        <span className="rounded-card border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-text-secondary">
          MVP · 1 image
        </span>
      </div>

      <div className="mb-3 grid grid-cols-4 gap-2.5">
        <div className="rounded-card bg-surface-sunken p-2.5">
          <p className="mb-0.5 text-[11px] text-text-muted">Defect class</p>
          <p className="text-[15px] font-medium capitalize text-text-primary">{defectClass}</p>
        </div>
        <div className="rounded-card bg-surface-sunken p-2.5">
          <p className="mb-0.5 text-[11px] text-text-muted">Status</p>
          <p className="text-[15px] font-medium text-success">Ready</p>
        </div>
        <div className="rounded-card bg-surface-sunken p-2.5">
          <p className="mb-0.5 text-[11px] text-text-muted">Format</p>
          <p className="text-[15px] font-medium text-text-primary">PNG</p>
        </div>
        <div className="rounded-card bg-surface-sunken p-2.5">
          <p className="mb-0.5 text-[11px] text-text-muted">Record ID</p>
          <p className="truncate font-mono text-[13px] font-medium text-text-primary">{recordId}</p>
        </div>
      </div>

      <div className="flex gap-3 rounded-card border border-line p-3">
        <img
          src={result.url}
          alt="Generated dataset sample"
          className="h-24 w-24 flex-shrink-0 rounded-card object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
              AI generated
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-text-muted">
              <Clock className="h-3 w-3" />
              {formatTimestamp(createdAt)}
            </span>
          </div>
          <p className="line-clamp-2 text-[12px] text-text-secondary">{prompt}</p>
          <p className="mt-1 truncate font-mono text-[11px] text-text-muted">
            source · {image?.name || "unknown"}
          </p>
        </div>
        <a
          href={result.url}
          download={`${recordId}.png`}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center self-start rounded-card border border-line text-text-secondary transition-colors hover:border-accent hover:text-accent"
          aria-label="Download dataset image"
        >
          <ImageDown className="h-4 w-4" />
        </a>
      </div>

      <p className="mt-2.5 text-[11px] text-text-muted">
        This MVP produces one record per generation. Batch export and validation pass-rate
        views are out of scope until the model is served (Workstream B).
      </p>
    </div>
  );
}