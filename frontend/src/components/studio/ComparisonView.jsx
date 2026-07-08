import { ImageOff, Sparkles } from "lucide-react";

function ImageSlot({ label, url, emptyText, tag }) {
  return (
    <div className="flex-1">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-wideish text-text-secondary">
          {label}
        </p>
        {tag && url && (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-medium text-accent-dark">
            <Sparkles className="h-2.5 w-2.5" /> AI generated
          </span>
        )}
      </div>
      <div
        className="corner-frame flex aspect-square w-full items-center justify-center overflow-hidden rounded-card border border-line bg-muted/40"
        style={{ "--corner-color": tag ? "#B5482A" : "#3E7C74" }}
      >
        {url ? (
          <img src={url} alt={label} className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-text-secondary">
            <ImageOff className="h-6 w-6" />
            <p className="text-xs">{emptyText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ComparisonView({ originalUrl, resultUrl }) {
  return (
    <div className="rounded-card border border-line bg-paper p-4 shadow-card">
      <div className="mb-3 flex items-center gap-2">
        <span className="step-tag">04</span>
        <h2 className="font-display text-[15px] font-semibold text-text-primary">
          Compare Result
        </h2>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <ImageSlot label="Original" url={originalUrl} emptyText="No image uploaded yet" />
        <ImageSlot
          label="Generated"
          url={resultUrl}
          emptyText="Your generated result will appear here"
          tag
        />
      </div>
    </div>
  );
}