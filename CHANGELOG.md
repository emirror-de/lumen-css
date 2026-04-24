# Changelog

All notable user-visible changes to lumen.css are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] — 2026-04-15

### Added

- **Layout shell** (`div[data-layout-shell]`) — eight direct-child variants
  detected automatically via `:has()`; sticky header, fixed sidebar, scrollable
  main, optional inspector panel, and optional footer with no per-page layout
  CSS required.
- **Navbar** (`nav[data-navbar]`) — one or two `<ul>` groups; single-level
  grouped dropdowns via `<a> + <ul>` open on hover/focus-within; responsive
  collapse driven by `button[data-nav-toggle][aria-expanded]`.
- **Tabs** (`section[data-tabs]`) with standard and `data-variant="segmented"`
  visual treatments; ARIA contract owned by application code.
- **Toast region** (`aside[data-toast-region]`) — fixed top-end stack for
  transient `role="status"` / `role="alert"` notifications.
- **Notification center** (`aside[data-notification-center]`) — persistent
  browsable inbox with unread state, tone variants, and dismiss buttons.
- **Pagination** (`nav[data-pagination]`) — accessible page controls with
  `aria-current="page"` on the active link and `aria-disabled` on disabled
  previous/next spans.
- **Breadcrumb navigation** (`nav[data-breadcrumbs]`) — CSS-only separators;
  `aria-current="page"` on the current step.
- **Field composition** (`div[data-field]`, `fieldset[data-field]`,
  `div[data-field-row]`) — label, control, help, error, and success marker
  association without classes.
- **Input group** (`div[data-input-group]`) — leading icon, prefix label,
  suffix label, and trailing action button in a joined visual shell; focus,
  invalid, and disabled states propagate to the wrapper.
- **Form validation summary** (`form[data-form-errors]` +
  `[data-form-summary]`) — assertive or polite error summary block with
  anchor links to invalid fields.
- **Loading patterns** — `progress:not([value])` indeterminate spinner,
  `progress[value][max]` determinate bar, `button[aria-busy="true"]` inline
  spinner, and `:where(…)[aria-busy="true"]` busy-region overlay.
- **Optional button variants** — `outlined`, `neutral`, `accent`, `success`,
  `warning`, `danger` scoped to button-like controls only.
- **Light and dark themes** — automatic via `prefers-color-scheme`; manual
  override via `data-theme="dark|light"` on `<html>`.
- **Public token API** — full set of semantic CSS custom properties for
  surfaces, borders, text, links, accent/action, status, focus, typography,
  spacing, radius, shadows, transitions, and all component-level tokens.
- **Browser support matrix** — `docs/browser-support.html` with explicit minimum
  versions, feature audit, and degradation notes.
- **Application recipes** — `docs/recipes.html` with five copy-pasteable
  production page recipes: sign-in, settings with tabs, records list, record
  detail with inspector panel, and notification center.
- **Accessibility smoke tests** — `tests/smoke.a11y.js` using axe-core +
  Playwright; covers WCAG 2.1 AA across showcase and recipes in light and
  dark themes.
- **Visual regression suite** — `tests/showcase.visual.js` using Playwright
  screenshot tests; covers light/dark/narrow across layout shell, navbar,
  forms, tabs, data tables, toasts, notification center, pagination,
  breadcrumbs, and loading patterns.

[Unreleased]: https://github.com/emirror-de/lumen-css/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/emirror-de/lumen-css/releases/tag/v1.0.0
