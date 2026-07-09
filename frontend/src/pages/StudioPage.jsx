import { useMemo, useCallback } from "react";
import Header from "../components/studio/Header";
import UploadPanel from "../components/studio/UploadPanel";
import AnnotationPanel from "../components/studio/AnnotationPanel";
import PromptInput from "../components/studio/PromptInput";
import ComparisonView from "../components/studio/ComparisonView";
import DownloadButton from "../components/studio/DownloadButton";
import { useStudioState, STATUS } from "../state/studioStore";
import { generateImage } from "../services/api";

export default function StudioPage() {
  const studio = useStudioState();

  const canGenerate = useMemo(() => {
    return (
      Boolean(studio.image) &&
      Boolean(studio.image.id) &&
      studio.prompt.trim().length > 0 &&
      studio.status !== STATUS.GENERATING
    );
    // Once Roboflow mask integration (KPI 5/6) lands, add:
    // && Boolean(studio.mask)
  }, [studio.image, studio.prompt, studio.status]);

  const handleGenerate = useCallback(async () => {
    if (!studio.image?.id) return;

    studio.setStatus(STATUS.GENERATING);
    studio.setError(null);

    try {
      const result = await generateImage({
        imageId: studio.image.id,
        prompt: studio.prompt,
      });

      studio.setResult({ url: result.result_url });
      studio.setStatus(STATUS.COMPLETE);
    } catch (err) {
      studio.setError(err.message || "Generation failed.");
      studio.setStatus(STATUS.FAILED);
    }
  }, [studio]);

  return (
    <div className="min-h-screen bg-surface">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
        {/* Row 1: Upload (left) / Annotation (right) — same height */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <UploadPanel image={studio.image} onImageChange={studio.setImage} />
          </div>

          <div className="lg:col-span-8">
            <AnnotationPanel image={studio.image} mask={studio.mask} />
          </div>
        </div>

        {/* Row 2: prompt composer + Generate */}
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

        {/* Row 3: Comparison */}
        <div className="mt-4">
          <ComparisonView
            originalUrl={studio.image?.previewUrl}
            resultUrl={studio.result?.url}
          />
        </div>

        {/* Row 4: Download */}
        <div className="mt-4 flex justify-end">
          <DownloadButton resultUrl={studio.result?.url} disabled={!studio.result} />
        </div>
      </main>
    </div>
  );
}