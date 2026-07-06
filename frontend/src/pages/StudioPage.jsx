import { useMemo } from "react";
import Header from "../components/studio/Header";
import UploadPanel from "../components/studio/UploadPanel";
import AnnotationPanel from "../components/studio/AnnotationPanel";
import PromptInput from "../components/studio/PromptInput";
import GenerateButton from "../components/studio/GenerateButton";
import ProgressIndicator from "../components/studio/ProgressIndicator";
import ComparisonView from "../components/studio/ComparisonView";
import DownloadButton from "../components/studio/DownloadButton";
import { useStudioState, STATUS } from "../state/studioStore";

export default function StudioPage() {
  const studio = useStudioState();

  const canGenerate = useMemo(() => {
    return (
      Boolean(studio.image) &&
      studio.prompt.trim().length > 0 &&
      studio.status !== STATUS.GENERATING
    );
    // Once Roboflow mask integration (KPI 5/6) lands, add:
    // && Boolean(studio.mask)
  }, [studio.image, studio.prompt, studio.status]);

  const handleGenerate = () => {
    // Placeholder only — wired to POST /api/v1/generations in KPI 9.
    console.log("Generate clicked with:", {
      image: studio.image,
      mask: studio.mask,
      prompt: studio.prompt,
    });
  };

  return (
    <div className="min-h-screen bg-surface">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr]">
          <section className="flex flex-col gap-6">
            <UploadPanel image={studio.image} onImageChange={studio.setImage} />
            <AnnotationPanel image={studio.image} mask={studio.mask} />
          </section>

          <section className="flex flex-col gap-6">
            <PromptInput
              value={studio.prompt}
              onChange={studio.setPrompt}
              disabled={!studio.image}
            />
            <GenerateButton
              disabled={!canGenerate}
              status={studio.status}
              onClick={handleGenerate}
            />
            <ProgressIndicator status={studio.status} />
          </section>
        </div>

        <div className="mt-6">
          <ComparisonView
            originalUrl={studio.image?.previewUrl}
            resultUrl={studio.result?.url}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <DownloadButton resultUrl={studio.result?.url} disabled={!studio.result} />
        </div>
      </main>
    </div>
  );
}