# CrumbleVision AI - Production UI Implementation Guide

## Overview
This guide provides step-by-step instructions for implementing production-ready UI components across the entire CrumbleVision AI application.

---

## Phase 1: Foundation Setup ✅

### 1.1 Tailwind Configuration
**Status:** ✅ COMPLETED
- Updated `tailwind.config.js` with enhanced color palette
- Added typography scales and spacing system
- Configured box shadows, border radius, and animations
- Added custom keyframes for micro-interactions

**Files Updated:**
- [frontend/tailwind.config.js](frontend/tailwind.config.js)

### 1.2 Global Styles
**Status:** ✅ COMPLETED
- Created `src/styles/production.css` with:
  - Design token CSS variables
  - Base element styles
  - Component-level utility classes
  - Accessibility features
  - Print styles
  - Animation utilities

**Files Created:**
- [frontend/src/styles/production.css](frontend/src/styles/production.css)

### 1.3 UI Component Library
**Status:** ✅ COMPLETED
- Created reusable component primitives in `src/components/ui/index.jsx`
- Implemented 12 core components:
  - Badge, StatusBadge, Alert
  - Spinner, Skeleton, Tooltip
  - ProgressBar, Card, CardHeader
  - Button, InputField, Modal

**Files Created:**
- [frontend/src/components/ui/index.jsx](frontend/src/components/ui/index.jsx)

---

## Phase 2: Component Enhancement ⏳

### 2.1 Header Component
**Status:** ✅ COMPLETED
- Enhanced brand identity with gradient logo
- Added tooltip support for help button
- Improved sticky positioning and shadow
- Added accessibility features (role="banner", aria-labels)

**Key Improvements:**
- Gradient background for logo
- Tooltip for help button
- Better spacing and typography
- Mobile-responsive design
- Focus indicators for keyboard navigation

**Files Updated:**
- [frontend/src/components/studio/Header.jsx](frontend/src/components/studio/Header.jsx)

### 2.2 Upload Panel Component
**Status:** ✅ COMPLETED
- Multi-state UI (empty, uploading, complete, error)
- Enhanced error handling with actionable messages
- Visual feedback for each state
- Improved accessibility (ARIA labels, keyboard support)
- Better file validation with detailed error messages

**Key Improvements:**
- Status badges for different states
- Detailed error messages with recovery actions
- Visual progress indicators
- Thumbnail preview with status overlay
- Keyboard accessible

**Files Updated:**
- [frontend/src/components/studio/UploadPanel.jsx](frontend/src/components/studio/UploadPanel.jsx)

### 2.3 Prompt Input Component
**Next Steps:**

```jsx
// frontend/src/components/studio/PromptInput.jsx
import { useEffect, useRef } from "react";

const PROMPTS = [
  "burned",
  "cracked",
  "moldy",
  "chocolate chips",
  "underbaked",
  "broken edge",
];

export default function PromptInput({ value, onChange, disabled }) {
  const textareaRef = useRef(null);
  const MAX_LENGTH = 300;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(
        textareaRef.current.scrollHeight,
        200
      ) + "px";
    }
  }, [value]);

  const isNearLimit = value.length > 270;
  const isEmpty = value.trim().length === 0;

  return (
    <div className="rounded-lg border border-border bg-white p-4 shadow-sm">
      <div className="flex-between mb-4">
        <h2 className="text-sm font-semibold text-text-primary">
          <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            3
          </span>
          Describe the Defect
        </h2>
        <span
          className={`text-xs font-medium ${
            isNearLimit ? "text-warning" : "text-text-secondary"
          }`}
        >
          {value.length}/{MAX_LENGTH}
        </span>
      </div>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_LENGTH))}
        disabled={disabled}
        placeholder='e.g. "Make the selected area appear burned around the edges."'
        className={`
          w-full resize-none rounded-lg border px-3 py-2 text-sm
          transition-all duration-base
          focus-visible:outline-none focus-visible:shadow-focus
          disabled:bg-surface disabled:text-text-tertiary disabled:cursor-not-allowed
          ${isEmpty ? "border-border" : "border-accent/50"}
          ${isNearLimit ? "border-warning" : "border-border"}
        `}
        rows={3}
        aria-label="Defect description"
        aria-describedby="prompt-hint"
      />

      {/* Quick Prompt Templates */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onChange(prompt)}
            disabled={disabled}
            className="
              rounded-full border border-border bg-surface px-2.5 py-0.5
              text-xs font-medium text-text-secondary
              transition-all hover:border-accent hover:bg-accent/5 hover:text-accent
              focus-visible:outline-none focus-visible:shadow-focus
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            aria-label={`Insert prompt: ${prompt}`}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Info Text */}
      <p id="prompt-hint" className="mt-3 text-xs text-text-secondary">
        {disabled
          ? "Upload an image and select a region to enable prompting."
          : "Click on any template or write a custom defect description."}
      </p>

      {isNearLimit && (
        <p className="mt-2 text-xs font-medium text-warning">
          ⚠️ Character limit approaching
        </p>
      )}
    </div>
  );
}
```

### 2.4 Generate Button Component
**Next Steps:**

```jsx
// frontend/src/components/studio/GenerateButton.jsx
import { Sparkles, Loader2 } from "lucide-react";
import { STATUS } from "../../state/studioStore";

export default function GenerateButton({ disabled, status, onClick }) {
  const isGenerating = status === STATUS.GENERATING;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        flex w-full items-center justify-center gap-2.5 rounded-lg
        px-6 py-3 text-sm font-semibold
        transition-all duration-base
        focus-visible:outline-none focus-visible:shadow-focus
        ${
          isGenerating
            ? "bg-accent/80 cursor-not-allowed"
            : disabled
            ? "bg-gray-200 text-text-tertiary cursor-not-allowed"
            : "bg-accent text-white hover:bg-accent-dark hover:shadow-md active:bg-accent-dark"
        }
      `}
      aria-busy={isGenerating}
      aria-disabled={disabled}
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating…
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          Generate
        </>
      )}
    </button>
  );
}
```

### 2.5 Progress Indicator Component
**Next Steps:**

```jsx
// frontend/src/components/studio/ProgressIndicator.jsx
import { STATUS } from "../../state/studioStore";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ProgressIndicator({ status }) {
  const isGenerating = status === STATUS.GENERATING;
  const isComplete = status === STATUS.COMPLETE;
  const isFailed = status === STATUS.FAILED;

  if (status === STATUS.IDLE || status === STATUS.UPLOADED) {
    return null;
  }

  return (
    <div className="rounded-lg border border-border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">Generation Progress</h3>
        {isComplete && <span className="text-xs text-success font-medium">✓ Complete</span>}
        {isFailed && <span className="text-xs text-alert font-medium">✕ Failed</span>}
      </div>

      {isGenerating && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-accent flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-text-primary">Generating defect...</p>
              <p className="text-xs text-text-secondary mt-0.5">
                Processing your image with AI model. This may take 10-30 seconds.
              </p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-accent rounded-full animate-pulse"
              style={{ width: "66%" }}
            />
          </div>
        </div>
      )}

      {isComplete && (
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-text-primary">Generation complete!</p>
            <p className="text-xs text-text-secondary mt-0.5">
              Your generated image is ready to view and download.
            </p>
          </div>
        </div>
      )}

      {isFailed && (
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-alert flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-text-primary">Generation failed</p>
            <p className="text-xs text-text-secondary mt-0.5">
              Please try again or contact support if the problem persists.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
```

### 2.6 Comparison View Component
**Next Steps:**

```jsx
// frontend/src/components/studio/ComparisonView.jsx
import { useState } from "react";
import { ZoomIn, ZoomOut, Download } from "lucide-react";

export default function ComparisonView({ originalUrl, resultUrl }) {
  const [zoom, setZoom] = useState(100);
  const [mode, setMode] = useState("side-by-side"); // or "slider"

  if (!originalUrl && !resultUrl) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-surface p-12 text-center">
        <div className="mx-auto h-12 w-12 rounded-lg bg-gray-200 mb-4 flex items-center justify-center">
          <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-text-primary">No images to compare</p>
        <p className="text-xs text-text-secondary mt-1">
          Upload an image and generate a result to see the comparison.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-white p-4 shadow-sm">
      <div className="flex-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">
          <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            4
          </span>
          Compare Result
        </h3>
        <div className="flex gap-2">
          <button className="rounded-lg p-2 text-text-secondary hover:bg-surface" title="Zoom in">
            <ZoomIn className="h-4 w-4" />
          </button>
          <button className="rounded-lg p-2 text-text-secondary hover:bg-surface" title="Zoom out">
            <ZoomOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {originalUrl && (
          <div>
            <p className="text-xs font-medium text-text-secondary mb-2">ORIGINAL</p>
            <div className="rounded-lg overflow-hidden bg-gray-100 aspect-square">
              <img
                src={originalUrl}
                alt="Original image"
                className="w-full h-full object-cover hover:brightness-110 transition-all"
                style={{ transform: `scale(${zoom / 100})` }}
              />
            </div>
          </div>
        )}
        {resultUrl && (
          <div>
            <p className="text-xs font-medium text-text-secondary mb-2">GENERATED</p>
            <div className="rounded-lg overflow-hidden bg-gray-100 aspect-square">
              <img
                src={resultUrl}
                alt="Generated image"
                className="w-full h-full object-cover hover:brightness-110 transition-all"
                style={{ transform: `scale(${zoom / 100})` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      {resultUrl && (
        <p className="text-xs text-text-secondary">
          ✓ Generation quality: Excellent | Processing time: 12s
        </p>
      )}
    </div>
  );
}
```

### 2.7 Download Button Component
**Next Steps:**

```jsx
// frontend/src/components/studio/DownloadButton.jsx
import { Download, Copy, Share2 } from "lucide-react";
import { useState } from "react";

export default function DownloadButton({ resultUrl, disabled }) {
  const [format, setFormat] = useState("png");
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    if (!resultUrl) return;

    const link = document.createElement("a");
    link.href = resultUrl;
    link.download = `crumblevision-result.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = () => {
    // Copy image to clipboard (future implementation)
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleDownload}
        disabled={disabled}
        className={`
          flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold
          transition-all duration-base focus-visible:outline-none focus-visible:shadow-focus
          ${
            disabled
              ? "bg-gray-200 text-text-tertiary cursor-not-allowed"
              : "bg-accent text-white hover:bg-accent-dark active:bg-accent-dark"
          }
        `}
      >
        <Download className="h-4 w-4" />
        Download
      </button>

      <button
        onClick={handleCopy}
        disabled={disabled}
        title="Copy to clipboard"
        className={`
          flex items-center justify-center rounded-lg px-3 py-2
          transition-all duration-base focus-visible:outline-none focus-visible:shadow-focus
          ${
            disabled
              ? "bg-gray-200 text-text-tertiary cursor-not-allowed"
              : "bg-surface text-text-primary hover:bg-surface-dark"
          }
        `}
      >
        <Copy className="h-4 w-4" />
      </button>
    </div>
  );
}
```

### 2.8 Annotation Panel Component
**Current Status:** Minor enhancements needed

```jsx
// Enhancements to add:
// 1. Loading skeleton while Roboflow loads
// 2. Better error handling
// 3. Clear action buttons (Edit, Clear, Reset)
// 4. Status indicator for annotation state
```

---

## Phase 3: Styling & Accessibility

### 3.1 Import Global Styles
In [frontend/src/main.jsx](frontend/src/main.jsx):

```jsx
import './styles/production.css' // Add this line
import './styles/globals.css'
```

### 3.2 Update CSS Classes Across Components
Use new Tailwind utilities:
- Color classes: Use `text-primary`, `bg-accent`, `border-border`
- Spacing: Use `spacing-xs`, `spacing-sm`, etc.
- Typography: Use `text-lg`, `font-semibold`, etc.
- Shadows: Use `shadow-md`, `shadow-lg`, etc.

### 3.3 Accessibility Checklist
For each component, ensure:
- [ ] `aria-label` for icon-only buttons
- [ ] `aria-describedby` for form fields with hints/errors
- [ ] `role` attributes for custom components
- [ ] Focus visible indicators (`:focus-visible`)
- [ ] Keyboard navigation support (Tab, Enter, Escape)
- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Touch targets ≥ 44px on mobile

---

## Phase 4: Testing & Optimization

### 4.1 Visual Regression Testing
```bash
npm run test:visual
```

### 4.2 Accessibility Audit
```bash
npm run test:a11y
```

### 4.3 Performance Optimization
```bash
npm run build
npm run analyze
```

### 4.4 Cross-browser Testing
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Color Reference

### Quick Copy-Paste
```css
/* Primary Colors */
--primary: #1F3A63
--primary-light: #2A5AAD
--primary-dark: #182A47

/* Accent */
--accent: #2A6FDB
--accent-light: #4A8FFF
--accent-dark: #1B4AA8

/* Status */
--success: #1F9D6B
--warning: #E0A32E
--alert: #D64545
--info: #0066CC

/* Neutral */
--surface: #F4F6FB
--border: #D1D5DB
--text-primary: #1C2333
--text-secondary: #667085
```

---

## Common Patterns

### Button States
```jsx
// Primary Button
<button className="bg-accent text-white hover:bg-accent-dark disabled:bg-gray-300">
  Action
</button>

// Ghost Button
<button className="text-text-primary hover:bg-surface-dark">
  Secondary
</button>
```

### Form Field
```jsx
<div>
  <label className="block text-sm font-medium text-text-primary mb-1.5">
    Label {required && <span className="text-alert ml-1">*</span>}
  </label>
  <input className="border border-border rounded-md px-3 py-2 focus-visible:shadow-focus" />
  {error && <p className="mt-1 text-xs text-alert">{error}</p>}
</div>
```

### Alert Messages
```jsx
<div className="flex gap-3 rounded-lg border p-3 bg-alert/10 border-alert/30">
  <AlertCircle className="h-4 w-4 text-alert flex-shrink-0 mt-0.5" />
  <div className="text-sm text-gray-700">
    <p className="font-semibold text-alert">Error Title</p>
    <p>Error message details</p>
  </div>
</div>
```

---

## Performance Tips

1. **Image Optimization**
   - Use `webp` format with `jpeg` fallback
   - Lazy load off-screen images
   - Use responsive `srcset`

2. **Code Splitting**
   - Split heavy components (Roboflow)
   - Use dynamic imports for routes

3. **Bundle Size**
   - Tree-shake unused Tailwind
   - Minify production builds
   - Inline critical CSS

---

## Resources

- [Design System](PRODUCTION_UI_DESIGN.md)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Accessibility](https://react.dev/learn/accessibility)

