import { useState } from "react";
import Header from "./components/studio/Header";
import StudioPage from "./pages/StudioPage";
import DatasetPage from "./pages/DatasetPage";
import { useStudioState } from "./state/studioStore";

const PAGES = { STUDIO: "studio", DATASET: "dataset" };

function App() {
  const studio = useStudioState();
  const [page, setPage] = useState(PAGES.STUDIO);

  return (
    <div className="min-h-screen bg-surface">
      <Header page={page} onNavigate={setPage} hasResult={Boolean(studio.result)} />
      {page === PAGES.DATASET ? (
        <DatasetPage studio={studio} onBack={() => setPage(PAGES.STUDIO)} />
      ) : (
        <StudioPage studio={studio} onViewDataset={() => setPage(PAGES.DATASET)} />
      )}
    </div>
  );
}

export default App;