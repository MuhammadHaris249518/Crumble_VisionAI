import { useState } from "react";
import Header from "./components/studio/Header";
import StudioPage from "./pages/StudioPage";
import DatasetPage from "./pages/DatasetPage";
import { useStudioState } from "./state/studioStore";
import { useBackendHealth } from "./hooks/useBackendHealth";
import { WifiOff } from "lucide-react";

const PAGES = { STUDIO: "studio", DATASET: "dataset" };

function App() {
  const studio  = useStudioState();
  const health  = useBackendHealth();
  const [page, setPage] = useState(PAGES.STUDIO);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.07) 0%, transparent 70%), #F8FAFC",
      }}
    >
      <Header page={page} onNavigate={setPage} hasResult={Boolean(studio.result)} />

      {/* ── Offline banner ── */}
      {health === "offline" && (
        <div className="flex items-center justify-center gap-3 bg-amber-50 px-4 py-2.5 border-b border-amber-200">
          <WifiOff className="h-4 w-4 flex-shrink-0 text-amber-600" />
          <p className="text-xs font-semibold text-amber-800">
            Backend unreachable — ngrok tunnel may have expired.&nbsp;
            <span className="font-normal">
              Get the new URL from Camber (<code className="rounded bg-amber-100 px-1 font-mono">print(public_url)</code>)
              and paste it as <code className="rounded bg-amber-100 px-1 font-mono">NGROK_TARGET</code> in{" "}
              <code className="rounded bg-amber-100 px-1 font-mono">vite.config.js</code>, then restart Vite.
            </span>
          </p>
        </div>
      )}

      {page === PAGES.DATASET ? (
        <DatasetPage studio={studio} onBack={() => setPage(PAGES.STUDIO)} />
      ) : (
        <StudioPage studio={studio} onViewDataset={() => setPage(PAGES.DATASET)} />
      )}
    </div>
  );
}

export default App;