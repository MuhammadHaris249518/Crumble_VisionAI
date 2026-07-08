import { useRef, useState, useEffect, useCallback } from "react";
import { Lock, Paintbrush2, Eraser, RotateCcw, CheckCircle2 } from "lucide-react";

/**
 * Interactive mask annotation tool (FR-03/FR-04/FR-05, KPI 5/6).
 *
 * This paints the mask directly in the browser with an HTML canvas rather
 * than embedding Roboflow's hosted widget (that requires a Roboflow
 * account/API key this environment doesn't have). It produces a black/white
 * PNG mask (white = region to edit) and reports it via onMaskChange.
 */
export default function AnnotationPanel({ image, mask, onMaskChange }) {
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [brushSize, setBrushSize] = useState(28);
  const [tool, setTool] = useState("brush");
  const [hasStrokes, setHasStrokes] = useState(false);

  const syncCanvasSize = useCallback(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    const { width, height } = img.getBoundingClientRect();
    if (width === 0 || height === 0) return;
    canvas.width = width;
    canvas.height = height;
    setHasStrokes(false);
  }, []);

  useEffect(() => {
    syncCanvasSize();
    window.addEventListener("resize", syncCanvasSize);
    return () => window.removeEventListener("resize", syncCanvasSize);
  }, [image, syncCanvasSize]);

  const getPoint = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const src = e.touches && e.touches.length ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };

  const paintAt = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = tool === "erase" ? "destination-out" : "source-over";
    ctx.fillStyle = "rgba(62, 124, 116, 0.55)";
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();
  };

  const exportMask = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;
    const mctx = maskCanvas.getContext("2d");
    mctx.fillStyle = "#000000";
    mctx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

    const srcCtx = canvas.getContext("2d");
    const srcData = srcCtx.getImageData(0, 0, canvas.width, canvas.height);
    const outData = mctx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
    let painted = false;
    for (let i = 0; i < srcData.data.length; i += 4) {
      if (srcData.data[i + 3] > 10) {
        outData.data[i] = 255;
        outData.data[i + 1] = 255;
        outData.data[i + 2] = 255;
        outData.data[i + 3] = 255;
        painted = true;
      }
    }
    mctx.putImageData(outData, 0, 0);

    if (!painted) {
      onMaskChange?.(null);
      return;
    }
    onMaskChange?.({
      dataUrl: maskCanvas.toDataURL("image/png"),
      previewUrl: canvas.toDataURL("image/png"),
    });
  }, [onMaskChange]);

  const handleStart = (e) => {
    if (!image) return;
    e.preventDefault();
    isDrawing.current = true;
    setHasStrokes(true);
    const { x, y } = getPoint(e);
    paintAt(x, y);
  };

  const handleMove = (e) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const { x, y } = getPoint(e);
    paintAt(x, y);
  };

  const handleStop = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    exportMask();
  };

  const clearMask = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    setHasStrokes(false);
    onMaskChange?.(null);
  };

  return (
    <div className="rounded-card border border-line bg-paper p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="step-tag">02</span>
          <h2 className="font-display text-[15px] font-semibold text-text-primary">
            Annotate Region
          </h2>
        </div>
        {mask && (
          <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 font-mono text-[11px] font-medium text-success">
            <CheckCircle2 className="h-3 w-3" /> Mask ready
          </span>
        )}
      </div>

      <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-card border border-dashed border-line bg-muted/40">
        {!image ? (
          <div className="flex flex-col items-center gap-2 p-6 text-center">
            <Lock className="h-7 w-7 text-text-secondary" />
            <p className="text-sm font-medium text-text-primary">
              Upload an image to begin annotation
            </p>
            <p className="max-w-xs text-xs text-text-secondary">
              Paint over the region you want the AI to modify.
            </p>
          </div>
        ) : (
          <div className="corner-frame relative w-full" style={{ "--corner-color": "#3E7C74" }}>
            <img
              ref={imgRef}
              src={image.previewUrl}
              alt="Uploaded"
              onLoad={syncCanvasSize}
              className="block w-full select-none rounded-card"
              draggable={false}
            />
            <canvas
              ref={canvasRef}
              className="absolute left-0 top-0 h-full w-full touch-none cursor-crosshair"
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleStop}
              onMouseLeave={handleStop}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleStop}
            />
          </div>
        )}
      </div>

      {image && (
        <>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setTool("brush")}
              className={`flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                tool === "brush"
                  ? "border-accent bg-accent/10 text-accent-dark"
                  : "border-line text-text-secondary hover:bg-muted"
              }`}
            >
              <Paintbrush2 className="h-3.5 w-3.5" /> Brush
            </button>
            <button
              type="button"
              onClick={() => setTool("erase")}
              className={`flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                tool === "erase"
                  ? "border-accent bg-accent/10 text-accent-dark"
                  : "border-line text-text-secondary hover:bg-muted"
              }`}
            >
              <Eraser className="h-3.5 w-3.5" /> Erase
            </button>
            <label className="ml-auto flex items-center gap-2 font-mono text-xs text-text-secondary">
              Brush
              <input
                type="range"
                min="6"
                max="80"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="accent-accent"
              />
            </label>
          </div>

          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={clearMask}
              disabled={!hasStrokes && !mask}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-[6px] border border-line px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-clay/40 hover:text-clay disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-line disabled:hover:text-text-secondary"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Clear
            </button>
          </div>
        </>
      )}
    </div>
  );
}