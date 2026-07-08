import { ScanLine } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-line-dark bg-ink">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-accent text-text-onink">
            <ScanLine className="h-5 w-5" strokeWidth={2.25} />
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold leading-tight text-text-onink">
              CrumbleVision AI
            </h1>
            <p className="font-mono text-[11px] uppercase tracking-wideish text-text-onink-muted">
              Synthetic Defect Generation Studio
            </p>
          </div>
        </div>
        <span className="hidden items-center gap-1.5 rounded-full border border-line-dark bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wideish text-text-onink-muted sm:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          MVP
        </span>
      </div>
    </header>
  );
}