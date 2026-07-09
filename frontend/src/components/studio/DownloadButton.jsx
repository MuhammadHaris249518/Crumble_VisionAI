import { Download } from "lucide-react";

export default function DownloadButton({ resultUrl, disabled }) {
  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `crumblevision-generated-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={disabled}
      className="flex items-center gap-2 rounded-card border border-line bg-white px-4 py-2 text-[13px] font-medium text-text-primary transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download className="h-4 w-4" />
      Download High-Quality Image
    </button>
  );
}