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
      className="btn-ghost disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-text-secondary disabled:hover:shadow-none"
    >
      <Download className="h-4 w-4" />
      Download Result
    </button>
  );
}