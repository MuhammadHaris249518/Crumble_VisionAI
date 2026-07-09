import { useMemo, useCallback } from "react";
import { Database } from "lucide-react";
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
      studio.prompt.trim().length > 0 &&
      studio.status !== STATUS.GENERATING
    );
  }, [studio.image, studio.prompt, studio.status]);

  const handleGenerate = useCallback(async () => {
    if (!studio.image?.id) return;
    studio.setStatus(STATUS.GENERATING);
    studio.setError(null);
    try {
      const result = await generateImage({ imageId: studio.image.id, prompt: studio.prompt });
      studio.setResult({ url: result.result_url, createdAt: new Date().toISOString() });
      studio.setStatus(STATUS.COMPLETE);
    } catch (err) {
      studio.setError(err.message || "Generation failed.");
      studio.setStatus(STATUS.FAILED);
    }
  }, [studio]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <UploadPanel image={studio.image} onImageChange={studio.setImage} />
        </div>
        <div className="lg:col-span-8">
          <AnnotationPanel image={studio.image} mask={studio.mask} />
        </div>
      </div>

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

      <div className="mt-4">
        <ComparisonView originalUrl={studio.image?.previewUrl} resultUrl={studio.result?.url} />
      </div>

      <div className="mt-4 flex items-center justify-end gap-3">
        {studio.result && onViewDataset && (
          <button
            type="button"
            onClick={onViewDataset}
            className="flex items-center gap-2 rounded-card border border-line bg-white px-4 py-2 text-[13px] font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
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