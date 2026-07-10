import { ImageOff, Loader2, Layers, Sparkles } from "lucide-react";
import FloatingCard3D from "./FloatingCard3D";

function ImageSlot({ label, url, emptyText, badge, badgeClass, isLoading }) {
  return (
    <div className="flex-1 min-w-0">
      {/* Slot header */}
      <div className="mb-2.5 flex items-center gap-2">
        <p className="text-xs font-bold uppercase tracking-widest text-text-muted">{label}</p>
        {badge && (
          <span className={`badge ${badgeClass}`}>{badge}</span>
        )}
      </div>

      {/* 3D tilt card */}
      <FloatingCard3D intensity={6} className="rounded-panel">
        <div
          className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-panel border border-line bg-surface-sunken shadow-panel transition-shadow duration-300 hover:shadow-glow"
        >
          {isLoading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-accent/30" />
                <Loader2 className="relative h-8 w-8 animate-spin text-accent" />
              </div>
              <p className="text-xs font-semibold text-accent">AI processing…</p>
            </div>
          ) : url ? (
            <>
              <img
                src={url}
                alt={label}
                className="h-full w-full object-cover transition-all duration-500"
              />
              {/* Inner glow ring on loaded images */}
              <div className="pointer-events-none absolute inset-0 rounded-panel ring-1 ring-inset ring-white/20" />
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 px-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-line-strong bg-surface-card">
                <ImageOff className="h-5 w-5 text-text-muted opacity-50" />
              </div>
              <p className="text-xs leading-relaxed text-text-muted">{emptyText}</p>
            </div>
          )}
        </div>
      </FloatingCard3D>
    </div>
  );
}

export default function ComparisonView({ originalUrl, maskUrl, resultUrl, isGenerating }) {
  return (
    <div className="card p-5">
      {/* Step header */}
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
          4
        </span>
        <h2 className="text-sm font-semibold text-text-primary">Compare Result</h2>
        {resultUrl && (
          <span className="badge ml-auto bg-success/10 text-success">
            ✓ Generation complete
          </span>
        )}
        {isGenerating && (
          <span className="badge ml-auto animate-pulse bg-accent/10 text-accent">
            ⟳ Generating…
          </span>
        )}
      </div>

      <div className="flex flex-col gap-5 sm:flex-row">
        <ImageSlot
          label="Original"
          url={originalUrl}
          emptyText="Upload an image to begin"
        />
        <ImageSlot
          label="Mask"
          url={maskUrl}
          badge={<><Layers className="h-2.5 w-2.5" /> region</>}
          badgeClass="bg-violet-50 text-violet-600"
          isLoading={isGenerating && !maskUrl}
          emptyText="Mask appears after generation"
        />
        <ImageSlot
          label="Generated"
          url={resultUrl}
          badge={<><Sparkles className="h-2.5 w-2.5" /> AI output</>}
          badgeClass="bg-accent/10 text-accent"
          isLoading={isGenerating && !resultUrl}
          emptyText="AI result appears here"
        />
      </div>
    </div>
  );
}