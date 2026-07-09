import { STATUS } from "../../state/studioStore";

const STATUS_COLOR = {
  [STATUS.IDLE]: "text-text-muted",
  [STATUS.UPLOADED]: "text-text-secondary",
  [STATUS.ANNOTATING]: "text-text-secondary",
  [STATUS.MASK_READY]: "text-success",
  [STATUS.GENERATING]: "text-warning",
  [STATUS.COMPLETE]: "text-success",
  [STATUS.FAILED]: "text-alert",
};

export default function SessionDetails({ image, prompt, status, mask }) {
  const rows = [
    ["image_id", image?.id ? image.id.slice(0, 8) : "—"],
    ["mask_status", mask ? "ready" : "none"],
    ["prompt_len", String(prompt.length)],
  ];

  return (
    <div className="rounded-panel border border-line bg-white p-3.5 shadow-sm">
      <p className="mb-2.5 text-[13px] font-medium text-text-primary">Session details</p>
      <div className="space-y-1.5 font-mono text-[11px] leading-relaxed text-text-secondary">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between">
            <span>{k}</span>
            <span className="text-text-primary">{v}</span>
          </div>
        ))}
        <div className="flex items-center justify-between">
          <span>status</span>
          <span className={STATUS_COLOR[status] || "text-text-muted"}>{status}</span>
        </div>
      </div>
    </div>
  );
}