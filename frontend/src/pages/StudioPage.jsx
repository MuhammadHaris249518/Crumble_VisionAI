import { useMemo, useCallback } from "react";
import { Database, AlertCircle, PenLine, WifiOff, ExternalLink } from "lucide-react";
import UploadPanel from "../components/studio/UploadPanel";
import AnnotationPanel from "../components/studio/AnnotationPanel";
import PromptInput from "../components/studio/PromptInput";
import ComparisonView from "../components/studio/ComparisonView";
import DownloadButton from "../components/studio/DownloadButton";
import { STATUS } from "../state/studioStore";
import { generateImage } from "../services/api";

export default function StudioPage({ studio, onViewDataset }) {
  const canGenerate = useMemo(() => {
    return (
      Boolean(studio.image) &&
      Boolean(studio.image.id) &&
      Boolean(studio.mask?.dataUrl) &&
      studio.prompt.trim().length > 0 &&
      studio.status !== STATUS.GENERATING
    );
  }, [studio.image, studio.prompt, studio.status]);

  const handleGenerate = useCallback(async () => {
    if (!studio.image?.id) return;
    if (!studio.mask?.dataUrl) return;
    studio.setStatus(STATUS.GENERATING);
    studio.setError(null);
    try {
      const result = await generateImage({
        imageId: studio.image.id,
        prompt: studio.prompt,
        maskDataUrl: studio.mask.dataUrl,
      });
      studio.setResult({
        url: result.result_url,
        maskUrl: result.mask_url || null,
        createdAt: new Date().toISOString(),
      });
      studio.setStatus(STATUS.COMPLETE);
    } catch (err) {
      studio.setError(err.message || "Generation failed.");
      studio.setStatus(STATUS.FAILED);
    }
  }, [studio]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">

      {/* Workflow step grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <UploadPanel image={studio.image} onImageChange={studio.setImage} />
        </div>
        <div className="lg:col-span-8">
          <AnnotationPanel image={studio.image} mask={studio.mask} onMaskChange={studio.setMask} />
        </div>
      </div>

      {/* Hint: no mask yet */}
      {studio.image && !studio.mask && studio.status !== STATUS.GENERATING && (
        <div className="mt-3 flex items-center gap-2 rounded-card border border-line bg-surface-card px-4 py-2.5">
          <PenLine className="h-4 w-4 flex-shrink-0 text-accent" />
          <p className="text-xs font-medium text-text-secondary">
            Paint or draw a mask over the cookie region you want the AI to modify.
          </p>
        </div>
      )}

      {/* Prompt + Generate */}
      <div className="mt-4">
        <PromptInput
          value={studio.prompt}
          onChange={studio.setPrompt}
          disabled={!studio.image}
          canGenerate={canGenerate}
          status={studio.status}
          onGenerate={handleGenerate}
        />
      </div>

      {/* Error banners */}
      {studio.error && (() => {
        const isConnErr = /ngrok|backend|reach|network|tunnel/i.test(studio.error);
        return isConnErr ? (
          <div className="mt-3 flex items-start gap-3 rounded-card border border-warning/30 bg-warning/5 px-4 py-3 animate-slide-up">
            <WifiOff className="mt-0.5 h-4 w-4 flex-shrink-0 text-warning" />
            <div>
              <p className="text-sm font-semibold text-warning">Backend unreachable</p>
              <p className="mt-0.5 text-xs text-warning/80">
                The Camber Cloud ngrok tunnel may have expired. In your Camber notebook, print the
                new public URL and update <code className="rounded bg-warning/10 px-1 font-mono">NGROK_TARGET</code> in{" "}
                <code className="rounded bg-warning/10 px-1 font-mono">vite.config.js</code>, then restart Vite.
              </p>
              <a
                href="https://dashboard.ngrok.com/tunnels"
                target="_blank"
                rel="noreferrer"
                className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-warning underline underline-offset-2"
              >
                <ExternalLink className="h-3 w-3" /> ngrok dashboard
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex items-start gap-3 rounded-card border border-alert/20 bg-alert/5 px-4 py-3 animate-slide-up">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-alert" />
            <div>
              <p className="text-sm font-semibold text-alert">Generation failed</p>
              <p className="text-xs text-alert/80">{studio.error}</p>
            </div>
          </div>
        );
      })()}

      {/* Comparison */}
      <div className="mt-4">
        <ComparisonView
          originalUrl={studio.image?.previewUrl}
          maskUrl={studio.result?.maskUrl}
          resultUrl={studio.result?.url}
          isGenerating={studio.status === STATUS.GENERATING}
        />
      </div>

      {/* Action row */}
      <div className="mt-4 flex items-center justify-end gap-3">
        {studio.result && onViewDataset && (
          <button
            type="button"
            onClick={onViewDataset}
            className="btn-ghost"
          >
            <Database className="h-4 w-4" />
            View dataset record
          </button>
        )}
        <DownloadButton resultUrl={studio.result?.url} disabled={!studio.result} />
      </div>
    </main>
  );
}