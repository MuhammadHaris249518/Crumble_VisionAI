import {
  Paintbrush2, Eraser, Square, Hexagon,
  Hand, Sparkles, Undo2, Redo2,
  ZoomIn, ZoomOut, Maximize2, Trash2,
} from "lucide-react";

const TOOLS = [
  { id: "sam",       label: "AI Select", icon: Sparkles    },
  { id: "brush",     label: "Brush",     icon: Paintbrush2 },
  { id: "eraser",    label: "Eraser",    icon: Eraser      },
  { id: "rectangle", label: "Rect",      icon: Square      },
  { id: "polygon",   label: "Polygon",   icon: Hexagon     },
  { id: "pan",       label: "Pan",       icon: Hand        },
];

function IconBtn({ title, onClick, disabled, active, children }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-card border p-1.5 transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "border-accent bg-accent/10 text-accent"
          : "border-line bg-surface-card text-text-muted hover:border-accent/40 hover:text-accent"
      }`}
    >
      {children}
    </button>
  );
}

export default function Toolbar({
  tool, onToolChange, brushSize, onBrushSizeChange,
  onUndo, onRedo, canUndo, canRedo,
  onZoomIn, onZoomOut, onZoomReset,
  onClearAll, hasShapes,
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {/* Tool buttons */}
      <div className="flex flex-wrap items-center gap-1.5">
        {TOOLS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            title={label}
            onClick={() => onToolChange(id)}
            className={`flex items-center gap-1 rounded-card border px-2.5 py-1 text-[11px] font-semibold transition-all ${
              tool === id
                ? "border-accent bg-accent text-white shadow-sm shadow-accent/30"
                : "border-line bg-surface-card text-text-muted hover:border-accent/40 hover:text-accent"
            }`}
          >
            <Icon className="h-3 w-3" />
            {label}
          </button>
        ))}

        <div className="mx-1 h-5 w-px bg-line" />

        <IconBtn title="Undo" onClick={onUndo} disabled={!canUndo}><Undo2 className="h-3.5 w-3.5" /></IconBtn>
        <IconBtn title="Redo" onClick={onRedo} disabled={!canRedo}><Redo2 className="h-3.5 w-3.5" /></IconBtn>

        <div className="mx-1 h-5 w-px bg-line" />

        <IconBtn title="Zoom in"    onClick={onZoomIn}   ><ZoomIn    className="h-3.5 w-3.5" /></IconBtn>
        <IconBtn title="Zoom out"   onClick={onZoomOut}  ><ZoomOut   className="h-3.5 w-3.5" /></IconBtn>
        <IconBtn title="Reset view" onClick={onZoomReset}><Maximize2 className="h-3.5 w-3.5" /></IconBtn>

        <button
          type="button"
          onClick={onClearAll}
          disabled={!hasShapes}
          className="ml-auto flex items-center gap-1 rounded-card border border-alert/30 bg-alert/5 px-2.5 py-1 text-[11px] font-semibold text-alert transition-all hover:border-alert hover:bg-alert/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 className="h-3 w-3" /> Clear
        </button>
      </div>

      {/* Brush size */}
      {(tool === "brush" || tool === "eraser") && (
        <label className="flex items-center gap-2.5 text-[11px] font-medium text-text-muted">
          <span className="w-16 flex-shrink-0">Brush size</span>
          <input
            type="range"
            min="4" max="100"
            value={brushSize}
            onChange={(e) => onBrushSizeChange(Number(e.target.value))}
            className="flex-1 accent-[#6366F1]"
          />
          <span className="w-9 text-right font-mono tabular-nums text-text-secondary">{brushSize}px</span>
        </label>
      )}

      {/* Contextual hints */}
      {tool === "polygon" && (
        <p className="text-[10px] font-medium text-text-muted">
          Click to place points · Click first point or press Enter to close · Esc to cancel
        </p>
      )}
      {tool === "pan" && (
        <p className="text-[10px] font-medium text-text-muted">Drag to pan · Scroll to zoom from any tool</p>
      )}
      {tool === "sam" && (
        <p className="text-[10px] font-medium text-accent/80">
          ✦ Drag a box around the defect — AI will tighten it into a precise mask
        </p>
      )}
    </div>
  );
}