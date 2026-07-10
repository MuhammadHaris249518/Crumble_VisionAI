import { Database, ImageDown, Clock, Layers, Sparkles, ExternalLink } from "lucide-react";
import FloatingCard3D from "./FloatingCard3D";

const DEFECT_KEYWORDS = [
  ["burned",     "burned"],
  ["crack",      "cracked"],
  ["broken",     "broken edge"],
  ["mold",       "moldy"],
  ["underbak",   "underbaked"],
  ["chocolate",  "chocolate chips"],
];

function detectDefectClass(prompt) {
  const p = prompt.toLowerCase();
  const match = DEFECT_KEYWORDS.find(([needle]) => p.includes(needle));
  return match ? match[1] : "custom";
}

function formatTimestamp(date) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function ImageEntry({ url, downloadName, Icon, badgeLabel, badgeClass, title, subtitle }) {
  return (
    <div className="flex gap-4 rounded-panel border border-line bg-surface-sunken p-4 transition-all hover:border-line-strong hover:shadow-card">
      {/* 3D tilt thumbnail */}
      <FloatingCard3D intensity={10} className="h-24 w-24 flex-shrink-0 rounded-card">
        <div className="h-24 w-24 overflow-hidden rounded-card border border-line bg-surface-card shadow-card">
          {url ? (
            <img src={url} alt={title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] text-text-muted">N/A</div>
          )}
        </div>
      </FloatingCard3D>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <span className={`badge mb-2 ${badgeClass}`}>
          <Icon className="h-2.5 w-2.5" />
          {badgeLabel}
        </span>
        <p className="text-[13px] font-semibold text-text-primary">{title}</p>
        <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-text-muted">{subtitle}</p>
      </div>

      {/* Download */}
      {url ? (
        <a
          href={url}
          download={downloadName}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center self-start rounded-card border border-line bg-surface-card text-text-muted shadow-card transition-all hover:border-accent hover:bg-accent/5 hover:text-accent hover:shadow-accent"
          aria-label={`Download ${title}`}
        >
          <ImageDown className="h-3.5 w-3.5" />
        </a>
      ) : (
        <div className="h-8 w-8 flex-shrink-0 self-start rounded-card border border-line bg-surface-card opacity-30" />
      )}
    </div>
  );
}

export default function DatasetRecord({ image, prompt, result, maskUrl }) {
  if (!result?.url) return null;

  const recordId    = image?.id ? `syn_${image.id.slice(0, 8)}` : "syn_unknown";
  const defectClass = detectDefectClass(prompt);
  const createdAt   = result.createdAt ? new Date(result.createdAt) : new Date();
  const imageCount  = [result.url, maskUrl].filter(Boolean).length;

  return (
    <div className="card p-5 animate-slide-up">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-text-muted" />
          <p className="text-[14px] font-semibold text-text-primary">Dataset record</p>
        </div>
        <span className="badge border border-line bg-surface-sunken font-mono text-text-muted">
          {imageCount} image{imageCount !== 1 ? "s" : ""} · {defectClass}
        </span>
      </div>

      {/* Stats grid */}
      <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { label: "Defect class", value: defectClass,    cls: "capitalize" },
          { label: "Status",       value: "Ready",        cls: "text-success font-semibold" },
          { label: "Format",       value: "PNG",          cls: "" },
          { label: "Record ID",    value: recordId,       cls: "font-mono text-[12px]" },
        ].map(({ label, value, cls }) => (
          <div key={label} className="rounded-card border border-line bg-surface-sunken p-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-text-muted">{label}</p>
            <p className={`text-[14px] text-text-primary ${cls}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Timestamp row */}
      <div className="mb-4 flex items-center gap-2 text-[11px] text-text-muted">
        <Clock className="h-3 w-3 flex-shrink-0" />
        <span>{formatTimestamp(createdAt)}</span>
        <span className="mx-1 text-line-strong">·</span>
        <span className="truncate">Source: {image?.name || "unknown"}</span>
      </div>

      {/* Image entries */}
      <div className="flex flex-col gap-3">
        <ImageEntry
          url={maskUrl}
          downloadName={`${recordId}_mask.png`}
          Icon={Layers}
          badgeLabel="Annotation mask"
          badgeClass="bg-violet-50 text-violet-600"
          title="Segmentation mask"
          subtitle="White = annotated region sent to model · Black = pixels left untouched"
        />
        <ImageEntry
          url={result.url}
          downloadName={`${recordId}_result.png`}
          Icon={Sparkles}
          badgeLabel="AI generated · Camber Cloud"
          badgeClass="bg-accent/10 text-accent"
          title="Synthetic defect image"
          subtitle={`Prompt: "${prompt}"`}
        />
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-[11px] text-text-muted">
        <ExternalLink className="h-3 w-3 flex-shrink-0" />
        Generated by SDXL inpainting via Camber Cloud · mask boundary strictly respected
      </p>
    </div>
  );
}