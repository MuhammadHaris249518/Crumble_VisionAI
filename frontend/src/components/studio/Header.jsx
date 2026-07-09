export default function Header() {
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
          <h1 className="text-base font-semibold leading-tight text-text-primary">
            CrumbleVision AI
          </h1>
          <p className="text-xs leading-tight text-text-secondary">
            Synthetic Defect Generation Studio
          </p>
        </div>
        <span className="hidden rounded-card border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-text-secondary sm:inline-flex">
          MVP
        </span>
      </div>
    </header>
  );
}