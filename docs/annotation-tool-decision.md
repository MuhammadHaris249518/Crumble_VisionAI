# Annotation Tool: Build vs. Roboflow vs. CVAT

**Decision:** Build an in-house, browser-native annotation tool (React + Konva) rather than
embed Roboflow's hosted annotation widget or stand up CVAT.

## Options considered

| | Roboflow (hosted widget) | CVAT (self-hosted) | In-house (Konva) — chosen |
|---|---|---|---|
| User experience | Redirects/embeds an external site; breaks in-app flow | Standalone platform; not designed for end-customer-facing embedding | Fully inline, matches product design system |
| External dependency | Yes — account, API, hosted service | Yes — separate server + auth to operate | None |
| Control over UX/branding | Limited to what Roboflow's widget exposes | Low — heavy, general-purpose UI | Full |
| Fit for a commercial SaaS product | Poor — end users notice leaving the app | Poor — built for internal dataset teams, not customers | Good |
| Implementation cost | Low (embed + API calls) | Medium-high (server ops + integration) | Medium (drawing engine + mask export built by us) |
| Extensibility (e.g. future AI-assisted mask suggestions) | Constrained by Roboflow's roadmap | Possible but heavy | Straightforward — same codebase |

## Why in-house wins here

- The annotation tool's job is narrow and well-defined: let a user manually mark a region,
  and export that region as a binary mask. It does not need Roboflow's or CVAT's dataset-
  management features — those solve a different problem (managing large labeled datasets
  across a team), not "let one user paint one mask before generating one image."
- Keeping the user inside the application is a product requirement for a commercial tool,
  not a nice-to-have.
- `react-konva` is a mature, widely-used library for exactly this category of tool (canvas-
  based image labeling/annotation), so this isn't an unproven or exotic build.

## What we gave up

- No professional dataset-management tooling (not needed for this use case).
- More upfront engineering time than an embed would have cost.
- No automatic/AI-assisted mask suggestion yet — deferred; the architecture (a plain list of
  shapes rasterized to a mask) leaves room to add this later (e.g. a "suggest mask" button
  backed by a segmentation model) without redesigning the annotation system.

## Mask contract (unaffected by this choice)

Regardless of which annotation tool produces it, the mask handed to the backend is:

- A PNG the same width/height as the source image.
- White (`#FFFFFF`) = region to edit.
- Black (`#000000`) = protected/untouched region.

This means Workstream B (model fine-tuning) and the backend `/api/v1/generations` contract
are unaffected by this decision — only how the mask gets drawn changed, not its shape.