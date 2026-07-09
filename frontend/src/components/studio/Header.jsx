import { Database, LayoutGrid } from "lucide-react";

export default function Header({ page = "studio", onNavigate, hasResult = false }) {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-6">
        <svg width="34" height="34" viewBox="0 0 36 36" aria-hidden="true" className="flex-shrink-0">
          <circle cx="18" cy="18" r="18" fill="#F5E6C8" />
          <circle cx="13" cy="14" r="2.6" fill="#B8792E" />
          <circle cx="22" cy="12" r="2" fill="#B8792E" />
          <circle cx="23" cy="21" r="2.8" fill="#B8792E" />
          <circle cx="14" cy="23" r="2" fill="#B8792E" />
        </svg>
        <div className="flex-1">
          <h1 className="text-base font-semibold leading-tight text-text-primary">CrumbleVision AI</h1>
          <p className="text-xs leading-tight text-text-secondary">Synthetic Defect Generation Studio</p>
        </div>

        {onNavigate && (
          <nav className="flex items-center gap-1 rounded-card border border-line bg-surface p-1">
            <button
              type="button"
              onClick={() => onNavigate("studio")}
              className={`flex items-center gap-1.5 rounded-card px-3 py-1.5 text-[12px] font-medium transition-colors ${
                page === "studio" ? "bg-white text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Studio
            </button>
            <button
              type="button"
              onClick={() => onNavigate("dataset")}
              className={`flex items-center gap-1.5 rounded-card px-3 py-1.5 text-[12px] font-medium transition-colors ${
                page === "dataset" ? "bg-white text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <Database className="h-3.5 w-3.5" />
              Dataset
              {hasResult && <span className="ml-0.5 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />}
            </button>
          </nav>
        )}

        <span className="hidden rounded-card border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-text-secondary sm:inline-flex">
          MVP
        </span>
      </div>
    </header>
  );
}