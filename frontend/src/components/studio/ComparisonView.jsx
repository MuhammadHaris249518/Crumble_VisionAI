import { ImageOff } from "lucide-react";
import StepBadge from "./StepBadge";

function ImageSlot({ label, url, emptyText, badge }) {
  return (
    <div className="flex-1">
      <div className="mb-2 flex items-center gap-2">
        <p className="font-mono text-[11px] uppercase tracking-wide text-text-muted">{label}</p>
        {badge && (
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
            AI generated
          </span>
        )}
      </div>
      <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-card border border-line bg-surface">
        {url ? (
          <img src={url} alt={label} className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-text-muted">
            <ImageOff className="h-6 w-6" />
            <p className="text-[11px]">{emptyText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ComparisonView({ originalUrl, resultUrl }) {
  return (
    <div className="rounded-panel border border-line bg-white p-3.5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <StepBadge n={4} />
        <p className="text-[13px] font-medium text-text-primary">Compare Result</p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <ImageSlot label="Original" url={originalUrl} emptyText="No image uploaded yet" />
        <ImageSlot
          label="Generated"
          url={resultUrl}
          emptyText="Your generated result will appear here"
          badge={Boolean(resultUrl)}
        />
      </div>
    </div>
  );
}