import { Suspense, lazy } from "react";
import { Database, LayoutGrid, Sparkles } from "lucide-react";
import { useBackendHealth } from "../../hooks/useBackendHealth";

// Lazy-load the heavy Three.js scene so it never blocks the first paint
const HeroScene = lazy(() => import("./HeroScene"));

export default function Header({ page = "studio", onNavigate, hasResult = false }) {
  const health = useBackendHealth();

  return (
    <header
      className="relative border-b border-line-dark overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 55%, #1a1040 100%)",
        minHeight: 72,
      }}
    >
      {/* ── 3D canvas layer ── */}
      <Suspense fallback={null}>
        <HeroScene height={72} />
      </Suspense>

      {/* ── Foreground content (above canvas) ── */}
      <div className="relative z-10 mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 sm:px-6">

        {/* Brand */}
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 scale-125 rounded-full bg-brand-300/20 blur-md" />
            <svg width="40" height="40" viewBox="0 0 36 36" aria-hidden="true" className="relative z-10 drop-shadow-lg">
              <circle cx="18" cy="18" r="18" fill="#F5E6C8" />
              <circle cx="18" cy="18" r="18" fill="url(#cg)" opacity="0.65" />
              <circle cx="13" cy="14" r="2.6" fill="#92400E" />
              <circle cx="22" cy="12" r="2"   fill="#92400E" />
              <circle cx="23" cy="21" r="2.8" fill="#92400E" />
              <circle cx="14" cy="23" r="2"   fill="#92400E" />
              <defs>
                <radialGradient id="cg" cx="40%" cy="35%">
                  <stop offset="0%"   stopColor="#FCD34D" />
                  <stop offset="100%" stopColor="#D97706" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          <div>
            <h1 className="text-[16px] font-extrabold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-brand-200 to-brand-300 bg-clip-text text-transparent">
                CrumbleVision
              </span>
              <span className="text-white"> AI</span>
            </h1>
            <p className="flex items-center gap-1 text-[11px] leading-tight text-slate-400">
              <Sparkles className="h-2.5 w-2.5 text-accent" />
              Synthetic Defect Generation Studio
            </p>
          </div>
        </div>

        {/* Navigation pills */}
        {onNavigate && (
          <nav className="flex items-center gap-1 rounded-pill border border-white/10 bg-white/5 p-1 backdrop-blur-sm">
            {[
              { id: "studio",  label: "Studio",  Icon: LayoutGrid },
              { id: "dataset", label: "Dataset", Icon: Database   },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                className={`relative flex items-center gap-1.5 rounded-pill px-4 py-1.5 text-[12px] font-semibold transition-all duration-200 ${
                  page === id
                    ? "bg-accent text-white shadow-sm shadow-accent/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
                {id === "dataset" && hasResult && (
                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-brand-300 ring-1 ring-primary" />
                )}
              </button>
            ))}
          </nav>
        )}

        {/* Backend health + Version */}
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            title={
              health === "online"  ? "Backend is reachable" :
              health === "offline" ? "Click for fix instructions" :
              "Checking connection…"
            }
            onClick={() => {
              if (health === "offline") {
                alert(
                  "Backend unreachable — ngrok tunnel may have expired.\n\n" +
                  "Fix:\n" +
                  "1. In your Camber notebook run: print(public_url)\n" +
                  "2. Copy the URL (e.g. https://xxxx.ngrok-free.app)\n" +
                  "3. Paste it as NGROK_TARGET in frontend/vite.config.js line 7\n" +
                  "4. Restart: Ctrl+C, then npm run dev"
                );
              }
            }}
            className={`flex items-center gap-1.5 rounded-pill border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-400 backdrop-blur-sm transition-colors ${
              health === "offline" ? "cursor-pointer hover:border-alert/40 hover:text-alert" : "cursor-default"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${
              health === "online"  ? "bg-success animate-pulse" :
              health === "offline" ? "bg-alert animate-pulse" :
              "bg-slate-500"
            }`} />
            {health === "online" ? "API online" : health === "offline" ? "API offline" : "API…"}
          </button>
          <span className="rounded-pill border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] font-medium tracking-wider text-slate-400 backdrop-blur-sm">
            v0.1 · MVP
          </span>
        </div>
      </div>
    </header>
  );
}