# CrumbleVision AI - Design System Quick Reference

## Color Palette

### Primary Actions
```jsx
<button className="bg-accent text-white hover:bg-accent-dark">
  {/* Vibrant Blue #2A6FDB */}
</button>
```

### Secondary Actions
```jsx
<button className="bg-surface text-text-primary border border-border hover:bg-surface-dark">
  {/* Light background #F4F6FB */}
</button>
```

### Status Colors
```jsx
// Success: #1F9D6B
// Warning: #E0A32E
// Error: #D64545
// Info: #0066CC
```

## Typography

### Heading
```jsx
<h1 className="text-5xl font-bold">Display</h1>
<h2 className="text-4xl font-semibold">Heading 1</h2>
<h3 className="text-3xl font-semibold">Heading 2</h3>
<h4 className="text-2xl font-semibold">Heading 3</h4>
<h5 className="text-xl font-semibold">Heading 4</h5>
<h6 className="text-lg font-semibold">Heading 5</h6>
```

### Body Text
```jsx
<p className="text-lg font-normal">Body Large</p>
<p className="text-base font-normal">Body Regular (default)</p>
<p className="text-sm font-normal">Body Small</p>
<label className="text-xs font-medium">Label</label>
<p className="text-[11px] font-normal">Caption</p>
```

## Spacing (8px grid)

```jsx
// Padding
className="px-2 py-2"   // 8px
className="px-3 py-3"   // 12px
className="px-4 py-4"   // 16px
className="px-6 py-6"   // 24px
className="px-8 py-8"   // 32px

// Margin
className="gap-2"       // 8px gap
className="gap-3"       // 12px gap
className="gap-4"       // 16px gap
className="mb-2"        // 8px margin bottom
className="mt-4"        // 16px margin top
```

## Common Button Patterns

### Primary Button
```jsx
<button className="
  bg-accent text-white 
  hover:bg-accent-dark 
  active:bg-accent-dark
  disabled:bg-gray-300 disabled:text-text-tertiary
  px-6 py-2 rounded-lg
  transition-all duration-100
  focus-visible:shadow-focus
">
  Primary Action
</button>
```

### Secondary Button
```jsx
<button className="
  bg-surface text-text-primary 
  border border-border
  hover:bg-surface-dark hover:border-border-dark
  px-6 py-2 rounded-lg
  transition-all duration-100
  focus-visible:shadow-focus
">
  Secondary Action
</button>
```

### Icon Button
```jsx
<button className="
  p-2 rounded-lg
  text-text-secondary
  hover:bg-surface
  hover:text-primary
  focus-visible:shadow-focus
  transition-all
">
  <Icon className="h-4 w-4" />
</button>
```

## Form Elements

### Input Field
```jsx
<div>
  <label className="block text-sm font-medium text-text-primary mb-1.5">
    Label
    {required && <span className="text-alert ml-1">*</span>}
  </label>
  <input 
    type="text"
    className="
      w-full px-3 py-2 
      border border-border rounded-md
      text-sm text-text-primary
      focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-focus
      disabled:bg-surface disabled:text-text-tertiary disabled:cursor-not-allowed
      placeholder:text-text-secondary
    "
    placeholder="Placeholder text"
  />
  {error && (
    <p id="field-error" className="mt-1 text-xs text-alert font-medium">
      {error}
    </p>
  )}
</div>
```

### Textarea Field
```jsx
<textarea
  className="
    w-full px-3 py-2
    border border-border rounded-lg
    text-sm text-text-primary
    focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-focus
    disabled:bg-surface disabled:text-text-tertiary disabled:cursor-not-allowed
    resize-none
    placeholder:text-text-secondary
  "
  rows={4}
  placeholder="Enter description..."
/>
```

## Cards & Containers

### Basic Card
```jsx
<div className="rounded-lg border border-border bg-white p-4 shadow-sm">
  {/* Card content */}
</div>
```

### Elevated Card
```jsx
<div className="rounded-lg border border-border bg-white p-4 shadow-lg">
  {/* Important content */}
</div>
```

### Card Header
```jsx
<div className="flex-between mb-4 pb-4 border-b border-border">
  <div>
    <h3 className="font-semibold text-lg text-gray-900">Title</h3>
    <p className="text-sm text-gray-600 mt-0.5">Subtitle</p>
  </div>
  <button>{/* Action */}</button>
</div>
```

## Status Indicators

### Success Alert
```jsx
<div className="flex gap-3 rounded-lg border border-success/30 p-3 bg-success/10">
  <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
  <div>
    <p className="font-semibold text-success text-xs">Success</p>
    <p className="text-xs text-gray-700">Operation completed successfully.</p>
  </div>
</div>
```

### Error Alert
```jsx
<div className="flex gap-3 rounded-lg border border-alert/30 p-3 bg-alert/10">
  <AlertCircle className="h-4 w-4 text-alert flex-shrink-0 mt-0.5" />
  <div>
    <p className="font-semibold text-alert text-xs">Error</p>
    <p className="text-xs text-gray-700">Something went wrong. Try again.</p>
  </div>
</div>
```

### Warning Alert
```jsx
<div className="flex gap-3 rounded-lg border border-warning/30 p-3 bg-warning/10">
  <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
  <div>
    <p className="font-semibold text-warning text-xs">Warning</p>
    <p className="text-xs text-gray-700">Please review this before proceeding.</p>
  </div>
</div>
```

## Badges

### Primary Badge
```jsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
  Badge
</span>
```

### Status Badge
```jsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
  Active
</span>
```

## Accessibility Patterns

### Icon Button with Label
```jsx
<button 
  aria-label="Close dialog"
  className="p-2 rounded-lg hover:bg-surface focus-visible:shadow-focus"
>
  <X className="h-4 w-4" />
</button>
```

### Form Field with Error
```jsx
<input
  id="email"
  aria-invalid={!!error}
  aria-describedby={error ? "email-error" : undefined}
  className="..."
/>
{error && (
  <p id="email-error" className="text-alert text-xs mt-1">
    {error}
  </p>
)}
```

### Loading State
```jsx
<button disabled aria-busy={true}>
  <Loader2 className="h-4 w-4 animate-spin mr-2" />
  Loading…
</button>
```

## Focus Indicators

### Standard Focus Ring
```jsx
className="focus-visible:outline-none focus-visible:shadow-focus"

/* Shadow Config:
  Box Shadow: 0 0 0 3px rgba(42, 111, 219, 0.1), 0 0 0 1px #2A6FDB
  (Light blue background + solid border)
*/
```

## Transitions & Animations

### Hover Effect
```jsx
className="transition-all duration-100 hover:bg-surface"
```

### Loading Spinner
```jsx
<div className="animate-spin">
  <Loader2 className="h-4 w-4" />
</div>
```

### Fade In Animation
```jsx
className="animate-fade-in"
```

### Slide Up Animation
```jsx
className="animate-slide-up"
```

## Responsive Design

### Hide on Mobile
```jsx
className="hidden sm:block"  // Hidden on mobile, visible on tablet+
```

### Show Only on Mobile
```jsx
className="sm:hidden"  // Visible on mobile, hidden on tablet+
```

### Responsive Grid
```jsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {/* Items */}
</div>
```

### Responsive Padding
```jsx
className="px-4 sm:px-6 lg:px-8"
```

## Common Utilities

### Flex Utilities
```jsx
className="flex items-center justify-between"
className="flex-center"        // Centered flex
className="flex-between"       // Space between
className="flex-start"         // Aligned left
className="flex-end"           // Aligned right
```

### Text Utilities
```jsx
className="text-truncate"      // Single line ellipsis
className="line-clamp-2"       // Max 2 lines ellipsis
className="line-clamp-3"       // Max 3 lines ellipsis
```

### Layout Utilities
```jsx
className="container-max"      // Max width container
className="section-padding"    // Standard section padding
```

## Step Indicators

```jsx
<span className="
  inline-flex h-5 w-5 
  items-center justify-center 
  rounded-full 
  bg-primary text-xs font-bold text-white
">
  1
</span>
```

## Mobile-First Responsive Strategy

```
Mobile First:
1. Start with mobile design (< 640px)
2. Add features at tablet (640px - 1024px)
3. Enhance at desktop (> 1024px)

Breakpoints:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
```

## File Locations

```
/frontend
├── src/
│   ├── styles/
│   │   └── production.css        ← Design tokens & utilities
│   ├── components/
│   │   ├── ui/
│   │   │   └── index.jsx         ← Component library
│   │   └── studio/
│   │       ├── Header.jsx        ← ✅ Updated
│   │       ├── UploadPanel.jsx   ← ✅ Updated
│   │       ├── PromptInput.jsx   ← ⏳ To implement
│   │       ├── GenerateButton.jsx ← ⏳ To implement
│   │       ├── ProgressIndicator.jsx ← ⏳ To implement
│   │       ├── ComparisonView.jsx ← ⏳ To implement
│   │       ├── DownloadButton.jsx ← ⏳ To implement
│   │       └── AnnotationPanel.jsx ← 🔄 Minor updates
│   └── main.jsx
└── tailwind.config.js             ← ✅ Enhanced
```

## Debugging Tips

### Color Issues
- Check if using design tokens (not hex)
- Verify color contrast in Chrome DevTools
- Test with accessibility analyzer

### Focus Issues
- Add `focus-visible:shadow-focus` to interactive elements
- Test keyboard navigation (Tab key)
- Check focus ring visibility

### Responsive Issues
- Test at actual breakpoints (640px, 768px, 1024px)
- Use Chrome DevTools device preview
- Test on real devices

### Performance Issues
- Check component tree depth
- Verify image optimization
- Use React DevTools profiler
- Check bundle size with `npm run build`

---

## Quick Copy-Paste Components

### Loading State
```jsx
<div className="flex items-center gap-2">
  <Loader2 className="h-4 w-4 animate-spin text-accent" />
  <span className="text-sm font-medium text-text-primary">Loading…</span>
</div>
```

### Empty State
```jsx
<div className="text-center py-12">
  <div className="mb-4 flex justify-center">
    <ImageIcon className="h-12 w-12 text-text-secondary" />
  </div>
  <p className="text-sm font-medium text-text-primary">No items found</p>
  <p className="text-xs text-text-secondary mt-1">Start by uploading an image</p>
</div>
```

### Divider
```jsx
<div className="h-px bg-border my-4" />
```

### Section Title
```jsx
<h2 className="text-2xl font-semibold text-text-primary mb-4">
  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
    2
  </span>
  Section Title
</h2>
```

---

**Last Updated:** 2024  
**Keep this handy while implementing!**

