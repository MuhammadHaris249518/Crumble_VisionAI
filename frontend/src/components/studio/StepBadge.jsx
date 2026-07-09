export default function StepBadge({ n }) {
  return (
    <span className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface-sunken font-mono text-[10px] font-medium text-text-primary">
      {n}
    </span>
  );
}