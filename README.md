# lumen.css

A CSS-only, CSS-variable-configurable, semantic-first framework for productive business applications.

**No startup classes required.** Link the stylesheet. Use semantic HTML.

## Installation

**GitHub Releases**

Download `lumen.css` or `lumen.min.css` from the project's GitHub Releases page and copy the file into your application, for example under `css/`.

Then link it from your HTML:

```html
<link rel="stylesheet" href="css/lumen.css" />
```

Use the minified build for production:

```html
<link rel="stylesheet" href="css/lumen.min.css" />
```

You can also vendor the stylesheet directly from this repository's `css/` directory if you prefer to track it in your own source tree.

## Quick start

```html
<link rel="stylesheet" href="css/lumen.css" />
```

That's it. Your semantic HTML is now styled.

## Features

- **CSS only** — no JavaScript runtime, no build step for consumers.
- **Configurable via CSS variables** — override any semantic token on `:root`.
- **Semantic-first** — element selectors and meaningful attributes drive all styling.
- **No required classes** — basic styling works without adding a single class to your HTML.
- **No layout system** — native CSS Grid and Flexbox handle layout; the framework stays out of the way.
- **Built-in light and dark themes** — automatic via `prefers-color-scheme`; override with `data-theme="dark"` or `data-theme="light"` on `<html>`.
- **Accessible defaults** — WCAG 2.1 AA contrast, visible focus rings, `prefers-reduced-motion` support, logical properties throughout.
- **Explicit browser support** — Chrome/Edge 121+, Firefox 121+, Safari 17.2+ (Dec 2023 baseline). Advanced features such as `:has()`, `color-mix()`, and relative color syntax set the minimum. See [Browser Support](docs/browser-support.html) for the full matrix, degradation notes, and hard non-goals.

## Customisation

Override semantic tokens before or after the import:

```css
:root {
  --color-accent:       #7c3aed;   /* purple brand */
  --color-accent-hover: #6d28d9;
  --font-family-base:   "Inter", system-ui, sans-serif;
  --radius-md:          0.5rem;
}
```

### Public token API

| Category        | Tokens                                                                 |
|-----------------|------------------------------------------------------------------------|
| Surfaces        | `--color-bg`, `--color-surface`, `--color-surface-raised`, `--color-surface-sunken` |
| Borders         | `--color-border`, `--color-border-strong`, `--color-border-subtle`    |
| Text            | `--color-text`, `--color-text-secondary`, `--color-text-tertiary`, `--color-text-disabled`, `--color-text-inverse`, `--color-text-on-accent` |
| Links           | `--color-link`, `--color-link-visited`, `--color-link-hover`          |
| Accent/Action   | `--color-accent`, `--color-accent-hover`, `--color-accent-active`, `--color-accent-subtle` |
| Status          | `--color-success[-subtle/-text/-border]`, `--color-warning[-subtle/-text/-border]`, `--color-danger[-subtle/-text/-border]` |
| Focus           | `--focus-ring-color`, `--focus-ring-width`, `--focus-ring-offset`     |
| Typography      | `--font-family-base`, `--font-family-mono`, `--font-size-{xs..4xl}`, `--font-weight-{normal..bold}`, `--line-height-{tight..relaxed}` |
| Spacing         | `--space-{1..16}` (0.25 rem increments)                               |
| Radius          | `--radius-{sm..xl}`, `--radius-full`                                  |
| Shadows         | `--shadow-{sm..xl}`                                                    |
| Borders         | `--border-width`, `--border-width-2`, `--border-style`                |
| Transitions     | `--transition-fast`, `--transition-base`, `--transition-slow`         |
| Layout shell    | `--layout-shell-header-height`, `--layout-shell-sidebar-width`, `--layout-shell-panel-width`, `--layout-shell-gap` |
| Navbar          | `--layout-navbar-height`, `--layout-navbar-padding-inline`, `--layout-navbar-item-gap`, `--layout-navbar-dropdown-min-inline-size`, `--layout-navbar-surface`, `--layout-navbar-border-color`, `--layout-navbar-shadow`, `--layout-navbar-z-index` |
| Loading/Spinner | `--layout-spinner-size`, `--layout-spinner-button-size`, `--layout-spinner-region-size`, `--layout-spinner-stroke-width`, `--layout-spinner-track-color`, `--layout-spinner-color`, `--layout-spinner-duration`, `--layout-spinner-region-backdrop` |
| Toast           | `--layout-toast-top`, `--layout-toast-inline-end`, `--layout-toast-gap`, `--layout-toast-max-inline-size`, `--layout-toast-z-index` |
| Notification center | `--layout-notification-center-gap`, `--layout-notification-item-padding`, `--layout-notification-item-radius` |
| Pagination      | `--layout-pagination-gap`, `--layout-pagination-item-min-inline-size`, `--layout-pagination-item-padding-inline` |
| Breadcrumbs     | `--layout-breadcrumb-gap`, `--layout-breadcrumb-separator-color`, `--layout-breadcrumb-current-font-weight` |
| Field composition | `--layout-field-gap`, `--layout-field-help-size`, `--layout-field-row-gap`, `--layout-field-row-min-column-size` |
| Input groups    | `--layout-input-group-gap`, `--layout-input-group-padding-inline`, `--layout-input-group-action-min-inline-size` |
| Tables          | `--table-stripe-bg`, `--table-row-hover-bg`, `--table-cell-padding-block`, `--table-cell-padding-inline`, `--table-cell-padding-block-compact`, `--table-sticky-header-shadow` |
| Badges          | `--layout-badge-padding-inline`, `--layout-badge-padding-block`, `--layout-badge-font-size`, `--layout-badge-radius` |
| Region states   | `--layout-region-state-padding`, `--layout-region-state-gap`, `--layout-region-state-max-inline-size` |

Tokens prefixed `--_` are **internal primitives** and not part of the stable public API.

## Layout shell

`div[data-layout-shell]` is the single supported container-based layout host. It composes a sticky header, a primary sidebar, a main content area, an optional inspector panel, and an optional footer without requiring any per-page layout CSS.

### Supported variant matrix

Exactly eight direct-child combinations are supported. All are detected automatically via `:has()` — no modifier class or attribute is needed on the shell host.

| # | Combination | Desktop layout |
|---|---|---|
| 1 | `main` | Single full-height content region |
| 2 | `header + main` | Sticky header, scrollable main |
| 3 | `header + main + panel` | Sticky header, main + fixed-width right panel |
| 4 | `header + main + footer` | Sticky header, scrollable main, sticky footer |
| 5 | `header + sidebar + main` | Sticky header, fixed-width left sidebar, scrollable main |
| 6 | `header + sidebar + main + panel` | Sticky header, sidebar, main, right panel |
| 7 | `header + sidebar + main + footer` | Sticky header, sidebar, main, sticky footer |
| 8 | `header + sidebar + main + panel + footer` | Full shell: header, sidebar, main, panel, footer |

**Deferred (not supported in this release):** `main + footer`, `main + panel`, `header + main + panel + footer`, `sidebar + main`, and `sidebar + main + footer` are intentionally out of scope. Headerless sidebar variants leave narrow-width sidebar discoverability under-specified; other combinations add documentation cost without distinct product value.

### Authoring contract

```html
<div data-layout-shell>

  <!-- optional sticky header -->
  <header data-layout-header>
    <!-- brand link -->
    <a href="/">Acme</a>

    <!-- optional responsive toggle (narrow viewports) -->
    <button
      data-nav-toggle
      aria-expanded="false"
      aria-controls="primary-navbar"
      aria-label="Open navigation"
      type="button"
    >☰</button>

    <!-- primary navigation -->
    <nav id="primary-navbar" data-navbar aria-label="Primary">
      <ul>
        <li><a href="/" aria-current="page">Home</a></li>
        <li>
          <details>
            <summary>Products</summary>
            <ul>
              <li><a href="/products/crm">CRM</a></li>
              <li><a href="/products/support">Support</a></li>
            </ul>
          </details>
        </li>
        <li><a href="/pricing">Pricing</a></li>
      </ul>
      <!-- optional secondary / end group -->
      <ul>
        <li><a href="/docs">Docs</a></li>
        <li><a href="/account">Account</a></li>
      </ul>
    </nav>

    <!-- optional header actions -->
    <div data-layout-actions>
      <button type="button">Sign in</button>
    </div>
  </header>

  <!-- optional primary sidebar -->
  <aside data-layout-sidebar aria-label="Primary navigation">
    <!-- nav tree, section links -->
  </aside>

  <!-- required main content -->
  <main>
    <!-- primary scrollable page content -->
  </main>

  <!-- optional right-side inspector panel -->
  <aside data-layout-panel aria-label="Details">
    <!-- contextual metadata, tools -->
  </aside>

  <!-- optional footer -->
  <footer data-layout-footer>
    <!-- secondary links, version info -->
  </footer>

</div>
```

### Shell contract

- `div[data-layout-shell]` is the only supported layout host — all shell styles are scoped to its direct children.
- Supported direct-child order: `header[data-layout-header]` (optional), `aside[data-layout-sidebar]` (optional), `main` (required), `aside[data-layout-panel]` (optional), `footer[data-layout-footer]` (optional).
- `header[data-layout-header]` — spans the full top edge; sticky.
- `aside[data-layout-sidebar]` — fixed-width left track; independently scrollable.
- `main` — fluid center track; the sole vertical scroll region for primary content.
- `aside[data-layout-panel]` — fixed-width right track; independently scrollable; hidden at narrow viewports.
- `footer[data-layout-footer]` — spans the full bottom edge; sticky.
- Sidebar and panel tracks activate automatically via `:has()` — no extra attribute required on the shell.
- Nested landmarks inside `<main>` are unaffected by the shell grid.

### Copy-pasteable examples

#### Variant 1 — `main` only

```html
<div data-layout-shell>
  <main>
    <h1>Page title</h1>
    <p>Content.</p>
  </main>
</div>
```

#### Variant 3 — `header + main + panel`

```html
<div data-layout-shell>
  <header data-layout-header>
    <a href="/">Acme</a>
    <nav data-navbar aria-label="Primary">
      <ul>
        <li><a href="/" aria-current="page">Home</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <h1>Content</h1>
    <p>Primary scrollable content.</p>
  </main>
  <aside data-layout-panel aria-label="Details">
    <h2>Inspector</h2>
    <p>Contextual metadata.</p>
  </aside>
</div>
```

#### Variant 7 — `header + sidebar + main + footer`

```html
<div data-layout-shell>
  <header data-layout-header>
    <a href="/">Acme</a>
    <nav data-navbar aria-label="Primary">
      <ul>
        <li><a href="/" aria-current="page">Dashboard</a></li>
      </ul>
    </nav>
  </header>
  <aside data-layout-sidebar aria-label="Primary navigation">
    <nav aria-label="Main">
      <ul>
        <li><a href="/" aria-current="page">Dashboard</a></li>
        <li><a href="/users">Users</a></li>
      </ul>
    </nav>
  </aside>
  <main>
    <h1>Dashboard</h1>
    <p>Primary scrollable content.</p>
  </main>
  <footer data-layout-footer>
    <p>Version 1.0 &mdash; &copy; 2026 Acme</p>
  </footer>
</div>
```

#### Variant 8 — `header + sidebar + main + panel + footer`

```html
<div data-layout-shell>
  <header data-layout-header>
    <a href="/">Acme Admin</a>
    <nav data-navbar aria-label="Primary">
      <ul>
        <li><a href="/" aria-current="page">Dashboard</a></li>
      </ul>
    </nav>
  </header>
  <aside data-layout-sidebar aria-label="Primary navigation">
    <nav aria-label="Main">
      <ul>
        <li><a href="/" aria-current="page">Dashboard</a></li>
        <li><a href="/users">Users</a></li>
      </ul>
    </nav>
  </aside>
  <main>
    <h1>Dashboard</h1>
    <p>Primary scrollable content.</p>
  </main>
  <aside data-layout-panel aria-label="Inspector">
    <h2>Record detail</h2>
    <p>Contextual metadata.</p>
  </aside>
  <footer data-layout-footer>
    <p>Version 1.0 &mdash; &copy; 2026 Acme</p>
  </footer>
</div>
```

### Responsive behavior

At `width ≤ 48em` (768 px):

- `aside[data-layout-sidebar]` slides off-canvas (`transform: translateX(-100%)`). Add `data-open` to reveal it. Application code owns the toggle button and `data-open` management.
- `aside[data-layout-panel]` is hidden; its column track is collapsed so `main` fills the full width.
- `main` expands to fill the full available width.
- `prefers-reduced-motion: reduce` disables the sidebar slide transition.

### What lumen.css does not own

- **Sidebar toggle** — application code adds/removes `data-open` on `aside[data-layout-sidebar]` and manages `aria-expanded` on any toggle button.
- **Panel show/hide** — application code decides when to include or remove `aside[data-layout-panel]` from the DOM.
- **Overlay/scrim** — no backdrop is provided for the off-canvas sidebar.

### Layout shell tokens

```css
:root {
  --layout-shell-header-height:  3.5rem;
  --layout-shell-sidebar-width:  clamp(14rem, 20vw, 20rem);
  --layout-shell-panel-width:    20rem;
  --layout-shell-gap:            0px;
}
```

## Navbar pattern

`nav[data-navbar]` is the primary navigation contract. It must be a direct child of `header[data-layout-header]` and contains one or two direct `<ul>` elements (primary/start group and optional secondary/end group).

### Authoring contract

```html
<header data-layout-header>
  <a href="/">Acme</a>

  <!-- optional responsive toggle -->
  <button
    data-nav-toggle
    aria-expanded="false"
    aria-controls="primary-navbar"
    aria-label="Open navigation"
    type="button"
  >☰</button>

  <nav id="primary-navbar" data-navbar aria-label="Primary">
    <!-- primary / start group -->
    <ul>
      <li><a href="/" aria-current="page">Home</a></li>
      <li>
        <!-- grouped navigation: a is both a link and the dropdown trigger -->
        <a href="/products">Products</a>
        <ul>
          <li><a href="/products/crm">CRM</a></li>
          <li><a href="/products/support">Support</a></li>
        </ul>
      </li>
      <li><a href="/pricing">Pricing</a></li>
    </ul>
    <!-- optional secondary / end group -->
    <ul>
      <li><a href="/docs">Docs</a></li>
      <li><a href="/account">Account</a></li>
    </ul>
  </nav>

  <!-- optional header actions -->
  <div data-layout-actions>
    <button type="button">Sign in</button>
  </div>
</header>
```

### Navbar contract

- `nav[data-navbar]` is the only supported primary navigation host — scoped to `header[data-layout-header]`.
- Contains one or two direct `<ul>` elements: first is the primary/start group; second (optional) is the secondary/end group.
- Top-level navigation items: `li > a` for plain links, `li > a[href] + ul` for single-level grouped navigation — the `a` serves as both a navigation link and the dropdown trigger; the dropdown opens on hover or focus-within with no JavaScript required.
- Nested navigation depth is limited to one level.
- `aria-current="page"` on the active link only.
- `button[data-nav-toggle][aria-expanded][aria-controls]` must appear immediately before the controlled `nav[data-navbar][id]` when responsive collapse is needed.
- `div[data-layout-actions]` as the last direct child of the header for header-level actions (sign-in, theme toggle, etc.).

### Responsive behavior

- Above `48em`: `nav[data-navbar]` is always visible inline; `button[data-nav-toggle]` is hidden.
- At/below `48em`: `button[data-nav-toggle]` is visible; `nav[data-navbar]` collapses by default and becomes a full-width stacked panel below the header row when `aria-expanded="true"`.
- `prefers-reduced-motion: reduce` disables navbar transition effects.

### What lumen.css does not own

- Toggle click handler — wire `button[data-nav-toggle]` to set `aria-expanded="true"/"false"` yourself.
- Escape-to-close — application code adds the keydown handler.
- Open-state persistence across page loads.
- Roving focus / keyboard navigation within the open panel.

### Navbar tokens

```css
:root {
  --layout-navbar-height:                  3.5rem;
  --layout-navbar-padding-inline:          var(--space-4);
  --layout-navbar-item-gap:                var(--space-1);
  --layout-navbar-dropdown-min-inline-size: 12rem;
  --layout-navbar-surface:                 var(--color-bg);
  --layout-navbar-border-color:            var(--color-border);
  --layout-navbar-shadow:                  var(--shadow-sm);
  --layout-navbar-z-index:                 900;
}
```

## Theming

### Automatic dark mode

The dark theme activates when the OS preference is dark and no explicit theme is set on `<html>`.

### Manual override

```html
<!-- Force dark -->
<html data-theme="dark">

<!-- Force light -->
<html data-theme="light">
```

Toggle with one line of JavaScript:

```js
document.documentElement.setAttribute(
  'data-theme',
  document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
);
```

## Supported states (no classes needed)

| State           | Attribute / selector                       |
|-----------------|--------------------------------------------|
| Disabled        | `disabled`, `[aria-disabled="true"]`       |
| Invalid         | `:invalid`, `[aria-invalid="true"]`        |
| Required        | `required`, `:required`                    |
| Read-only       | `readonly`, `:read-only`                   |
| Selected        | `[aria-selected="true"]`                   |
| Current         | `[aria-current="page/step/…"]`             |
| Expanded        | `[aria-expanded="true"]`                   |
| Pressed         | `[aria-pressed="true/false"]`              |
| Checked         | `[aria-checked="true/false/mixed"]`        |
| Busy            | `[aria-busy="true"]`                       |
| Sort indicator  | `[aria-sort="ascending/descending"]`       |
| Tooltip         | `[data-tooltip="…"]`                       |
| Visually hidden | `[data-visually-hidden]` (skip links)      |
| Live regions    | `role="alert"`, `role="status"`, `role="log"` |

## Loading patterns

lumen.css provides four context-based loading patterns driven by semantic elements and ARIA attributes alone — no class is required.

### The four patterns

| Pattern | Selector | Behaviour |
|---------|----------|-----------|
| Indeterminate spinner | `progress:not([value])` | Renders as a compact circular spinner; omit `value` to activate |
| Determinate progress | `progress[value][max]` | Renders as a linear track with an accent fill |
| Inline action spinner | `button[aria-busy="true"]` | Appends a spinner after the button label; text stays visible |
| Busy-region overlay | `:where(form, fieldset, section, article, main, aside, dialog)[aria-busy="true"]` | Dims the region content and centres an overlay spinner |

### Usage examples

```html
<!-- 1. Indeterminate spinner -->
<label for="load">Loading</label>
<progress id="load" aria-label="Loading records"></progress>

<!-- 2. Determinate progress -->
<label for="upload">Uploading (65%)</label>
<progress id="upload" value="65" max="100"></progress>

<!-- 3. Inline action spinner — pair with disabled to prevent repeat submission -->
<button type="button" aria-busy="true" disabled>Saving…</button>

<!-- 4. Busy-region overlay on a semantic container -->
<section aria-busy="true">
  <h2>Report</h2>
  <p>Fetching data…</p>
  <!-- live-region copy for screen readers: -->
  <p role="status" data-visually-hidden>Loading report data, please wait.</p>
</section>
```

### Contract notes

- The busy-button spinner (`button[aria-busy="true"]`) is intentionally scoped to `<button>` because `input[type="submit"]`, `input[type="button"]`, and `input[type="reset"]` are replaced elements that do not support `::after` reliably across browsers.
- Authors should pair `aria-busy="true"` with `disabled` on a button when repeat submission must be prevented.
- The busy-region overlay is purely decorative. Authors remain responsible for adding live-region copy (`role="status"` or `role="alert"`) when a screen-reader announcement is needed.
- All spinner animations respect the global `prefers-reduced-motion: reduce` reset already in lumen.css; spinners freeze at their initial partial-ring frame, which remains legible as a loading indicator without relying on motion to convey meaning.

### Spinner tokens

```css
:root {
  --layout-spinner-size:            1.25rem;   /* indeterminate progress diameter */
  --layout-spinner-button-size:     1em;        /* inline button spinner diameter */
  --layout-spinner-region-size:     2.5rem;     /* overlay spinner diameter */
  --layout-spinner-stroke-width:    2px;
  --layout-spinner-track-color:     var(--color-border);
  --layout-spinner-color:           var(--color-accent);
  --layout-spinner-duration:        0.75s;
  --layout-spinner-region-backdrop: rgb(from var(--color-bg) r g b / 0.65);
}
```

## Toast notifications

lumen.css provides a semantic, fixed top-end toast stack for transient, non-blocking notifications. **Presentation only** — the framework styles toasts but does not own insertion, removal, queueing, timing, or focus management.

### Authoring contract

```html
<aside data-toast-region aria-label="Notifications">
  <ul>
    <!-- Polite update — announced at the next opportunity -->
    <li>
      <div role="status">
        Changes saved successfully.
        <button type="button" data-dismiss aria-label="Close"></button>
      </div>
    </li>

    <!-- Assertive alert — announced immediately -->
    <li>
      <div role="alert">
        Session will expire in 5 minutes.
        <button type="button" data-dismiss aria-label="Close"></button>
      </div>
    </li>

    <!-- Optional visual tone: success, warning, or danger -->
    <li data-tone="success">
      <div role="status">
        <strong>Import complete</strong>
        <p>142 records were added to your account.</p>
        <button type="button" data-dismiss aria-label="Close"></button>
      </div>
    </li>

    <!-- CTA button + close button can coexist -->
    <li data-tone="warning">
      <div role="status">
        <strong>Low disk space</strong>
        <p>Less than 500 MB remaining.</p>
        <button type="button">Review storage</button>
        <button type="button" data-dismiss aria-label="Close"></button>
      </div>
    </li>

    <li data-tone="danger">
      <div role="alert">
        <strong>Connection lost</strong>
        <p>Unable to reach the server. Changes may not be saved.</p>
        <button type="button">Retry</button>
        <button type="button" data-dismiss aria-label="Close"></button>
      </div>
    </li>
  </ul>
</aside>
```

### Contract rules

- The only supported host is `aside[data-toast-region][aria-label]`.
- The region contains exactly one direct `<ul>` or `<ol>`.
- Each toast is a direct `<li>` child of the list. Inside `<li>`, a single `<div role="status">` (polite) or `<div role="alert">` (assertive) wraps all toast content — this div is the live-region boundary.
- Announcement urgency is expressed only by `role` on the inner `div` — do not use `role` on `<li>` or to convey visual tone.
- Visual tone is expressed only by `data-tone="success|warning|danger"` on `<li>` — tone does not change urgency.
- Two optional button roles are supported per toast, placed inside the `[role]` div:
  - `button[type="button"][data-dismiss]` — close icon, absolutely positioned in the top-inline-end corner; always provide `aria-label="Close"` for screen-reader users; application code removes the `<li>` on click.
  - `button[type="button"]` (no `data-dismiss`) — trailing call-to-action, bottom-aligned; use for contextual actions like "Retry" or "Review storage".
- Both button types may appear together in the same toast.
- v1 supports one placement only: a fixed top-end stack (RTL-safe via logical inset properties).

### What lumen.css does not own

- **Insertion and removal** — application code inserts and removes `<li>` elements from the list.
- **Auto-dismiss** — no timers; application code decides when to remove a toast.
- **Queueing and deduplication** — application code limits stack depth and deduplicates messages.
- **Focus management** — application code must manage focus after a toast action or dismiss.

### When not to use toasts

Use inline messages or a `<dialog>` for:
- Blocking confirmations that require a user decision before continuing.
- Form validation errors tied to specific fields.
- Content that must not be missed or that requires acknowledgement.

### Toast tokens

```css
:root {
  --layout-toast-top:             var(--space-4);   /* inset from viewport top */
  --layout-toast-inline-end:      var(--space-4);   /* inset from viewport inline-end */
  --layout-toast-gap:             var(--space-3);   /* gap between stacked toasts */
  --layout-toast-max-inline-size: 22rem;            /* maximum toast width */
  --layout-toast-z-index:         950;              /* above navbar (900), below dialog */
}
```

## Notification center

lumen.css provides a persistent, browsable notification-center panel for production apps that need a stable inbox alongside the transient toast stack. **Presentation only** — the framework styles the notification center but does not own notification retrieval, unread counts, mark-read behaviour, item dismissal, or persistence.

### Authoring contract

```html
<aside data-notification-center aria-label="Notifications">
  <header>
    <h2>Notifications</h2>
    <button type="button">Mark all read</button>
  </header>

  <ul>
    <!-- Unread item with a primary action link -->
    <li data-unread="true">
      <h3>Deploy succeeded</h3>
      <p>Production build v2.4.1 finished without errors.</p>
      <time datetime="2026-04-14T10:30:00Z">10:30 AM</time>
      <a href="/deployments/241">View deployment</a>
      <button type="button" data-dismiss aria-label="Dismiss"></button>
    </li>

    <!-- Toned item (danger) with a primary action button -->
    <li data-tone="danger">
      <h3>Payment failed</h3>
      <p>Your card ending in 4242 was declined.</p>
      <time datetime="2026-04-14T09:15:00Z">9:15 AM</time>
      <button type="button">Update billing</button>
      <button type="button" data-dismiss aria-label="Dismiss"></button>
    </li>

    <!-- Read item, no action -->
    <li>
      <h3>Comment on your post</h3>
      <p>Sam replied to your comment in "Q3 roadmap".</p>
      <time datetime="2026-04-13T17:00:00Z">Yesterday</time>
    </li>
  </ul>

  <footer>
    <a href="/notifications">View all notifications</a>
  </footer>
</aside>
```

Empty center — compose with the existing `[data-region-state]` host when there are no notifications:

```html
<aside data-notification-center aria-label="Notifications">
  <header>
    <h2>Notifications</h2>
  </header>

  <aside data-region-state="empty">
    <h3>No notifications</h3>
    <p>You're all caught up.</p>
  </aside>
</aside>
```

### Contract rules

- The only supported host is `aside[data-notification-center]` with either `aria-label` or `aria-labelledby`.
- The host may contain an optional `<header>`, one required `<ul>` or `<ol>`, and an optional `<footer>`.
- Each direct `<li>` may contain, in any order:
  - `:is(h3, h4, h5, h6)` — notification heading (**required**).
  - `p` — supporting body text (optional).
  - `time` — timestamp (optional).
  - `a[href]` or `button[type="button"]` (not `[data-dismiss]`) — one primary action (optional).
  - `button[type="button"][data-dismiss]` — dismiss or mark-read button (optional); always provide `aria-label` for screen-reader users.
- Unread state is expressed with `data-unread="true"` on the `<li>`. There is no native semantic equivalent — this is a purely visual distinction.
- Optional tone is expressed with `data-tone="success|warning|danger"` on the `<li>` and reuses the framework's existing semantic tone token families.
- For an empty center, place a `[data-region-state="empty"]` host inside the `<aside>` instead of an empty `<ul>`.
- The `<header>` may contain one heading and one optional action button (for example "Mark all read"). Application code drives the button behaviour.
- The `<footer>` is intended for a single "View all" link or summary action.

### What lumen.css does not own

- **Notification retrieval** — application code fetches and renders notification items.
- **Unread count** — application code maintains and displays the badge or count.
- **Mark-read behaviour** — application code removes or updates `data-unread="true"` on click.
- **Item dismissal** — application code removes the `<li>` on `data-dismiss` button click.
- **Persistence** — application code stores and syncs read/dismissed state.
- **Panel open/close** — positioning, toggling, and focus management are application responsibilities. Use `dialog`, a custom popover, or an off-canvas panel to host the notification center if overlay behaviour is required.

### Notification center vs. toasts

| | Notification center | Toast stack |
|---|---|---|
| **Persistence** | Persistent — survives page navigation | Transient — auto-dismissed or user-dismissed |
| **Discovery** | User-opened panel or in-page section | Fixed overlay, always visible when present |
| **Urgency** | Inbox model — all items share equal visual priority (tone optional) | Urgency driven by `role="status"` vs `role="alert"` |
| **Live region** | Not a live region — not announced on insertion | `role="status"` / `role="alert"` announce on insertion |
| **Host** | `aside[data-notification-center]` | `aside[data-toast-region]` |

Use toasts (`aside[data-toast-region]`) for transient, non-blocking feedback that must be announced by assistive technology immediately or at the next opportunity. Use the notification center for a persistent, browsable inbox that users open on demand.

### Notification center tokens

```css
:root {
  --layout-notification-center-gap:  var(--space-2);   /* gap between item grid rows */
  --layout-notification-item-padding: var(--space-3);  /* padding inside each item */
  --layout-notification-item-radius:  var(--radius-md); /* dismiss button corner radius */
}
```

## Pagination

lumen.css provides a narrow, accessible pagination component for data-heavy screens such as tables, search results, and record lists. **Presentation only** — the framework styles pagination but does not own page calculation, URL generation, or disabled-state management.

### Authoring contract

```html
<nav data-pagination aria-label="Results pagination">
  <ol>
    <!-- Disabled previous control (non-interactive) -->
    <li><span aria-disabled="true">Previous</span></li>

    <!-- Normal page links -->
    <li><a href="/records?page=1">1</a></li>

    <!-- Current page -->
    <li><a href="/records?page=2" aria-current="page">2</a></li>

    <!-- Normal page links -->
    <li><a href="/records?page=3">3</a></li>
    <li><a href="/records?page=4">4</a></li>

    <!-- Ellipsis gap marker (decorative, unfocusable) -->
    <li><span aria-hidden="true">&hellip;</span></li>

    <!-- Normal page link -->
    <li><a href="/records?page=9">9</a></li>

    <!-- Next control -->
    <li><a href="/records?page=3">Next</a></li>
  </ol>
</nav>
```

### Contract rules

- The only supported host is `nav[data-pagination]` with either `aria-label` or `aria-labelledby`.
- The host contains exactly one direct `<ol>` or `<ul>`.
- Each direct `<li>` contains exactly one of:
  - `a[href]` — normal page link (interactive).
  - `a[aria-current="page"]` — current page link (interactive, visually highlighted).
  - `span[aria-disabled="true"]` — disabled previous/next control (non-interactive).
  - `span[aria-hidden="true"]` — ellipsis gap marker (decorative, unfocusable).
- The data attribute is used as the scope selector so localized `aria-label` text is never part of the CSS contract.

### What lumen.css does not own

- **Page calculation** — application code computes total pages and the current page index.
- **URL generation** — application code constructs `href` values for each page link.
- **Disabled state** — application code decides when previous/next controls are disabled and uses `span[aria-disabled="true"]` accordingly.
- **Page-window collapsing** — ellipsis placement and page range truncation are not managed by the framework in v1.

### Pagination tokens

```css
:root {
  --layout-pagination-gap:                  var(--space-1);   /* gap between page items */
  --layout-pagination-item-min-inline-size: 2.25rem;          /* minimum hit-target width and height */
  --layout-pagination-item-padding-inline:  var(--space-3);   /* inline padding for prev/next labels */
}
```

## Breadcrumb navigation

lumen.css provides a semantic breadcrumb pattern for deep application hierarchies. **Presentation only** — the framework styles breadcrumbs but does not own route generation or localized crumb labels.

### Authoring contract

```html
<nav data-breadcrumbs aria-label="Page location">
  <ol>
    <!-- Ancestor location steps -->
    <li><a href="/dashboard">Home</a></li>
    <li><a href="/accounts">Accounts</a></li>
    <li><a href="/accounts/42">Acme Corporation</a></li>

    <!-- Current page — link variant (still interactive) -->
    <li><a href="/accounts/42/edit" aria-current="page">Edit details</a></li>

    <!-- Current page — non-interactive span variant -->
    <!-- <li><span aria-current="page">Edit details</span></li> -->
  </ol>
</nav>
```

### Contract rules

- The only supported host is `nav[data-breadcrumbs]` with either `aria-label` or `aria-labelledby`.
- The host contains exactly one direct `<ol>`.
- Each direct `<li>` represents one location step.
- Ancestor steps use `<a href="…">` (interactive).
- The final step (current page) uses either:
  - `<a href="…" aria-current="page">` — interactive link variant.
  - `<span aria-current="page">` — non-interactive text variant.
- Separators are decorative CSS (`li + li::before`) — never written into the DOM, so screen readers read a clean list of crumb labels only.
- The `data-breadcrumbs` attribute is the scope selector; the CSS contract does not depend on localized `aria-label` text.

### Long-label and wrapping behaviour

Breadcrumbs wrap naturally by default. No single-line overflow truncation is applied in v1; long translated labels or record names flow onto subsequent lines without overlapping separators.

### What lumen.css does not own

- **Route generation** — application code constructs `href` values for each crumb.
- **Localized labels** — the CSS selector depends only on `data-breadcrumbs`, never on label text.
- **Responsive collapsing** — overflow menus and collapsed ellipsis crumbs are intentionally deferred in v1.

### Breadcrumb tokens

```css
:root {
  --layout-breadcrumb-gap:                  var(--space-2);             /* gap between items and beside separators */
  --layout-breadcrumb-separator-color:      var(--color-text-tertiary); /* decorative separator colour */
  --layout-breadcrumb-current-font-weight:  var(--font-weight-medium);  /* weight of the current-page item */
}
```

## Tabs

lumen.css provides an accessible panel-switching primitive for settings screens, detail views, and dashboard sections. **Presentation only** — the framework styles ARIA states but does not own keyboard navigation, panel activation logic, or hidden-state management.

### Authoring contract

```html
<section data-tabs>
  <div role="tablist" aria-label="Account settings">
    <!-- Active tab: aria-selected="true", tabindex="0" -->
    <button role="tab" id="tab-profile" aria-controls="panel-profile" aria-selected="true">Profile</button>
    <!-- Inactive tabs: aria-selected="false", tabindex="-1" -->
    <button role="tab" id="tab-security" aria-controls="panel-security" aria-selected="false" tabindex="-1">Security</button>
    <button role="tab" id="tab-notifications" aria-controls="panel-notifications" aria-selected="false" tabindex="-1">Notifications</button>
  </div>

  <!-- Active panel — no hidden attribute -->
  <div role="tabpanel" id="panel-profile" aria-labelledby="tab-profile">
    <!-- panel content -->
  </div>

  <!-- Inactive panels — hidden by application code -->
  <div role="tabpanel" id="panel-security" aria-labelledby="tab-security" hidden>
    <!-- panel content -->
  </div>
  <div role="tabpanel" id="panel-notifications" aria-labelledby="tab-notifications" hidden>
    <!-- panel content -->
  </div>
</section>
```

### Segmented variant

Add `data-variant="segmented"` to the host for a pill/segmented-control appearance. The ARIA contract, keyboard behavior, and panel mechanics are **identical** — `data-variant="segmented"` is a visual treatment, not a separate component or public API.

```html
<section data-tabs data-variant="segmented">
  <div role="tablist" aria-label="Revenue period">
    <button role="tab" id="tab-7d" aria-controls="panel-7d" aria-selected="true">7 days</button>
    <button role="tab" id="tab-30d" aria-controls="panel-30d" aria-selected="false" tabindex="-1">30 days</button>
    <button role="tab" id="tab-90d" aria-controls="panel-90d" aria-selected="false" tabindex="-1">90 days</button>
  </div>
  <div role="tabpanel" id="panel-7d" aria-labelledby="tab-7d"><!-- content --></div>
  <div role="tabpanel" id="panel-30d" aria-labelledby="tab-30d" hidden><!-- content --></div>
  <div role="tabpanel" id="panel-90d" aria-labelledby="tab-90d" hidden><!-- content --></div>
</section>
```

### Contract rules

- The only supported host is `section[data-tabs]`.
- The host contains exactly one direct `[role=tablist]` with either `aria-label` or `aria-labelledby`.
- Tab triggers are `button[role=tab]` — not links; this pattern is for in-page panel switching, not route navigation.
- Each button carries `aria-controls` (matching the target panel `id`) and `aria-selected="true|false"`.
- Each panel carries `role=tabpanel`, a unique `id`, and `aria-labelledby` pointing to its tab trigger's `id`.
- Inactive panels are hidden by the native `hidden` attribute — toggled by application code.
- `data-variant="segmented"` is a visual variant of the same ARIA contract; it is not a separate component or public API.

### Keyboard and application responsibilities

lumen.css styles ARIA states only. Application code owns all behavioral concerns:

- **Arrow-key navigation** — `ArrowLeft` / `ArrowRight` move focus between tab triggers inside the tablist.
- **Roving tabindex** — the active tab has `tabindex="0"`; all others have `tabindex="-1"`. This ensures a single tab stop for the whole tab group.
- **Tab activation strategy** — automatic (activate on focus) or manual (activate on `Enter` / `Space`). The WAI-ARIA Authoring Practices Guide covers both patterns.
- **Panel visibility** — toggling the `hidden` attribute on `[role=tabpanel]` elements to show the active panel and hide all others.
- **ARIA state** — setting `aria-selected="true"` on the active tab trigger and `aria-selected="false"` on all others when switching panels.

### What lumen.css does not own

- **Arrow-key navigation and focus management** — application code manages keyboard events.
- **Roving tabindex** — application code sets `tabindex="0"` and `tabindex="-1"` on triggers.
- **Tab activation** — deciding whether activation is automatic or manual is application-owned.
- **Panel visibility** — toggling `hidden` on `[role=tabpanel]` elements is application-owned.
- **ARIA state updates** — setting `aria-selected` when switching is application-owned.

### Tabs tokens

```css
:root {
  --layout-tabs-gap:            var(--space-1);  /* gap between tab triggers in the tablist */
  --layout-tabs-padding-inline: var(--space-1);  /* inline padding on the tablist container */
  --layout-tabs-panel-padding:  var(--space-4);  /* padding inside each tabpanel */
}
```

## Optional button variants

Semantic HTML remains the default. Button variants are expressed via two data attributes and are scoped to button-like controls only:

- `button`
- `input[type="submit"]`
- `input[type="button"]`
- `input[type="reset"]`

The framework applies no class-based styling to these controls; tone and variant are always attribute-driven.

### Public attribute contract (v1)

| Attribute | Values | Meaning |
|-----------|--------|---------|
| `data-tone` | `neutral` \| `accent` \| `success` \| `warning` \| `danger` | Semantic colour tone |
| `data-variant` | `outlined` | Outlined visual treatment (composes with any tone) |

### Supported combinations

| Pattern | Supported | Notes |
|---------|-----------|-------|
| No attributes | Yes | Default semantic button styling (neutral baseline) |
| `data-tone="…"` alone | Yes | Solid button in the selected tone |
| `data-variant="outlined"` alone | Yes | Outlined neutral button |
| `data-tone="…"` + `data-variant="outlined"` | Yes | Outlined variant of the selected tone |
| Multiple `data-tone` values | No | Attributes are single-valued by contract |

### Usage examples

```html
<button type="button">Default</button>
<button type="button" data-tone="success">Save</button>
<button type="button" data-tone="danger" data-variant="outlined">Delete</button>
<input type="submit" data-tone="accent" data-variant="outlined" value="Submit" />
<input type="reset" data-tone="neutral" value="Reset" />
```

If `input[type="reset"]` uses `data-tone` or `data-variant`, the variant styling intentionally overrides the default reset appearance so behaviour is consistent across all supported button-like controls.

## Field composition primitives

`data-field` and `data-field-row` are narrow, opt-in composition wrappers that solve what native HTML alone cannot: a consistent way to associate a label, help text, error message, and success message with a single control or a grouped set of controls. They are **not** general layout utilities.

### Authoring contract

```html
<!-- Single-field wrapper: div -->
<div data-field>
  <label for="email">Email address</label>
  <input type="email" id="email" name="email" />
  <span data-help>We only use this for account notifications.</span>  <!-- optional -->
  <span data-error>Please enter a valid email address.</span>         <!-- optional -->
  <span data-success>Email address confirmed.</span>                  <!-- optional -->
</div>

<!-- Grouped-choice wrapper: fieldset -->
<fieldset data-field>
  <legend>Notification frequency</legend>
  <label><input type="radio" name="freq" value="daily" /> Daily</label>
  <label><input type="radio" name="freq" value="weekly" /> Weekly</label>
  <span data-help>Digest emails are sent at 08:00 in your local timezone.</span>
</fieldset>

<!-- Inline field row: responsive auto-fit grid of div[data-field] children -->
<div data-field-row>
  <div data-field>
    <label for="first">First name</label>
    <input type="text" id="first" name="first_name" />
  </div>
  <div data-field>
    <label for="last">Last name</label>
    <input type="text" id="last" name="last_name" />
  </div>
</div>
```

### Contract rules

- `div[data-field]` — single-field wrapper; direct children: one `label`, one control, and optional `[data-help]`, `[data-error]`, `[data-success]` markers.
- `fieldset[data-field]` — grouped-choice wrapper; direct children: one `legend`, one or more controls (radios/checkboxes in `label` wrappers), and the same optional markers.
- `div[data-field-row]` — responsive inline row; direct children must be `div[data-field]` wrappers.
- `[data-help]`, `[data-error]`, and `[data-success]` must be **direct children** of `[data-field]`. They carry no implicit display logic; application code decides which to show at any given time.
- Invalid-state reinforcement applies automatically when the wrapped control matches `:invalid` (with a non-empty value) or carries `aria-invalid="true"`.
- The scope of `[data-field]` and `[data-field-row]` is intentionally narrow. Do not use them as generic layout primitives.

### Invalid-state example

```html
<div data-field>
  <label for="email">Email address</label>
  <input type="email" id="email" name="email"
         value="not-an-email" aria-invalid="true"
         aria-describedby="email-help email-error" />
  <span data-help id="email-help">We only use this for account notifications.</span>
  <span data-error id="email-error">Please enter a valid email address.</span>
</div>
```

When `aria-invalid="true"` is present:
- The control itself receives a danger border and background (via the existing `:invalid` / `aria-invalid` rules).
- The wrapping `label` shifts to the danger text colour.
- `[data-error]` is already styled in the danger tone; application code shows it.

### Field composition tokens

```css
:root {
  --layout-field-gap:                 var(--space-1);      /* gap between label, control, and supporting text */
  --layout-field-help-size:           var(--font-size-xs); /* font-size for help, error, and success text */
  --layout-field-row-gap:             var(--space-4);      /* gap between columns in an inline field row */
  --layout-field-row-min-column-size: 14rem;               /* minimum column width before the row collapses */
}
```

### What lumen.css does not own

- **Validation logic** — application code decides when a field is invalid and sets `aria-invalid`.
- **Marker visibility** — application code shows or hides `[data-error]` and `[data-success]` as appropriate.
- **Multi-step or wizard layouts** — those belong to application layout code.
- **Floating labels** — intentionally deferred in v1.

## Input group composition

`data-input-group` is a narrow, opt-in composition wrapper that provides the visual shell for common production controls: search fields with leading icons, currency inputs with prefix labels, unit fields with suffix labels, and fields with trailing action buttons.

**Presentation only** — the framework styles the visual composition. Application code owns search submission, clear-button behaviour, unit conversion, input masking, and validation messaging. `data-input-group` is not a general-purpose horizontal layout primitive.

### Supported direct children

| Role | Element | Notes |
|------|---------|-------|
| Text-like control | `input` (not checkbox, radio, range, file, color), `select` | Required; exactly one per group |
| Leading icon | `[data-icon]` with `aria-hidden="true"` | Non-interactive; no background tint |
| Prefix label | `[data-prefix]` with `aria-hidden="true"` | Non-interactive; sunken background tint |
| Suffix label | `[data-suffix]` with `aria-hidden="true"` | Non-interactive; sunken background tint |
| Trailing action | `button` | Interactive; flush border between control and button |

### Authoring contract

```html
<!-- Leading icon search field -->
<div data-input-group>
  <span data-icon aria-hidden="true">⌕</span>
  <input type="search" id="site-search" placeholder="Search…" />
  <button type="submit" aria-label="Search">Search</button>
</div>

<!-- Currency prefix field -->
<div data-input-group>
  <span data-prefix aria-hidden="true">$</span>
  <input type="number" id="amount" inputmode="decimal" placeholder="0.00" />
</div>

<!-- Suffix unit field -->
<div data-input-group>
  <input type="number" id="weight" inputmode="decimal" placeholder="0.0" />
  <span data-suffix aria-hidden="true">kg</span>
</div>

<!-- Trailing action button field -->
<div data-input-group>
  <input type="text" id="api-key" value="sk-••••••••" readonly />
  <button type="button" aria-label="Copy API key">Copy</button>
</div>
```

Each example must carry a proper `<label>` associated to the control's `id` via `for`. Prefix and suffix markers are purely decorative and `aria-hidden="true"` so screen readers read only the label and the typed value.

### State propagation

The wrapper presents as one cohesive control surface:

- **Focus** — when any child receives focus, the group border turns accent and a focus ring appears.
- **Invalid** — when the wrapped control is `:invalid` (non-empty) or carries `aria-invalid="true"`, the group border and background shift to the danger tone.
- **Disabled** — when the wrapped control or button is `disabled`, the entire group dims uniformly.

### What lumen.css does not own

- **Search submission** — wire up the form or button click yourself.
- **Clear-button behaviour** — resetting or clearing a field is application logic.
- **Unit conversion** — the suffix label is decorative; conversion logic lives in application code.
- **Input masking** — currency formatting, phone formatting, and similar masks belong to application code.
- **Validation messaging** — combine `data-input-group` with `div[data-field]` for label, help text, and error message composition.

### Input group tokens

```css
:root {
  --layout-input-group-gap:                    0px;           /* gap between segments; 0 gives a flush joined look */
  --layout-input-group-padding-inline:         var(--space-3); /* inline padding for prefix, suffix, and icon slots */
  --layout-input-group-action-min-inline-size: 2.5rem;         /* minimum inline size for trailing action buttons */
}
```

## Form validation summary

A reusable pattern for communicating multiple form errors after a failed submit. The summary block anchors at the top of the form and links directly to each invalid control or grouped fieldset legend. Grouped fieldset errors extend the existing `fieldset[data-field]` composition primitive.

### Authoring contract

```html
<!-- Add data-form-errors to the <form> when validation has failed -->
<form data-form-errors>

  <!-- Summary host: must be a direct child of form[data-form-errors] -->
  <!-- role="alert" for assertive announcement; "status" for polite -->
  <div data-form-summary role="alert" aria-labelledby="summary-heading">
    <h2 id="summary-heading">2 errors prevented this form from being submitted</h2>
    <ul>
      <li><a href="#email">Email address — enter a valid email address</a></li>
      <li><a href="#contact-legend">Preferred contact — select at least one option</a></li>
    </ul>
  </div>

  <!-- Invalid text field -->
  <div data-field>
    <label for="email">Email address</label>
    <input
      id="email"
      type="email"
      aria-invalid="true"
      aria-describedby="email-error"
    />
    <span data-error id="email-error">Enter a valid email address.</span>
  </div>

  <!-- Invalid grouped fieldset — aria-invalid on the fieldset adds group-level emphasis -->
  <fieldset data-field aria-invalid="true" aria-describedby="contact-error">
    <legend id="contact-legend">Preferred contact</legend>
    <label><input type="checkbox" /> Email</label>
    <label><input type="checkbox" /> Phone</label>
    <span data-error id="contact-error">Select at least one contact method.</span>
  </fieldset>

</form>
```

### Contract rules

- `data-form-errors` must be placed on the `<form>` element to activate summary styles.
- `[data-form-summary]` must be a **direct child** of `form[data-form-errors]`.
- `role="alert"` (assertive) or `role="status"` (polite) is required on `[data-form-summary]`.
- `[data-form-summary]` must contain exactly one heading child (`h2`, `h3`, or `h4`) and one direct `<ul>` or `<ol>`.
- Each list item must contain an anchor (`<a href="#id">`) targeting the `id` of an invalid control or a grouped legend.
- Grouped fieldset errors extend `fieldset[data-field]` — add `aria-invalid="true"` to the `<fieldset>` for group-level border reinforcement and legend emphasis. Individual controls inside continue using their own `aria-invalid` / `:invalid` styling.

### What lumen.css does not own

- **Triggering validation** — application code decides when validation runs (on submit, on blur, on input).
- **Populating the summary list** — application code generates the error links and inserts them into the `<ul>`.
- **Focus management** — move focus to the summary heading or the first invalid field after submit.
- **Setting `aria-invalid`** — the framework reacts to this attribute but never sets it.
- **Removing `data-form-errors`** — clear the attribute and summary content once errors are resolved.
- **Error message copy** — all text is application-owned.

### Form validation summary tokens

| Token | Default | Role |
|---|---|---|
| `--layout-form-summary-padding` | `var(--space-4)` | Internal padding of the summary block |
| `--layout-form-summary-gap` | `var(--space-3)` | Gap between summary heading and link list |
| `--layout-form-summary-max-inline-size` | `40rem` | Maximum inline size of the summary block |

```css
:root {
  --layout-form-summary-padding:         var(--space-4);
  --layout-form-summary-gap:             var(--space-3);
  --layout-form-summary-max-inline-size: 40rem;
}
```

## Command menu

Use `details[data-menu]` for row actions, card overflow actions, and any contextual action surface. The direct `summary` is the trigger; a direct `ul` or `ol` holds the action items.

### Host contract

```html
<details data-menu>
  <summary aria-label="Row actions">&#8942;</summary>
  <ul>
    <li><a href="/edit">Edit</a></li>
    <li><button type="button">Duplicate</button></li>
    <li role="separator"></li>
    <li data-tone="danger"><button type="button">Delete</button></li>
  </ul>
</details>
```

- Host: `details[data-menu]`
- Trigger: direct `summary` — any content (text, icon, ellipsis character)
- Action list: one direct `ul` or `ol`
- Action items: `a[href]` or `button[type=button]` inside `li`
- Separator: `li[role=separator]`
- Destructive item: `li[data-tone=danger]` — emphasises a single destructive action without styling the whole menu

### Placement

Default placement is `bottom-inline-end` (menu aligns to the inline-end edge of the trigger). Add `data-align="start"` to anchor the menu to the inline-start edge:

```html
<details data-menu data-align="start">
  …
</details>
```

### Known limitation: horizontal scroll containers clip the dropdown

`div[data-table-container]` sets `overflow-x: auto`. CSS does not allow `overflow-x: auto` and `overflow-y: visible` on the same element — the browser silently promotes `visible` to `auto`, which clips any absolutely-positioned child that overflows the block axis.

**Workaround:** omit `div[data-table-container]` from tables that contain command menus. For wide tables that genuinely need horizontal scrolling *and* row-action menus, application code must use a JavaScript-powered portal or the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) to anchor the menu outside the scroll container.

### Command menu tokens

| Token | Default | Role |
|---|---|---|
| `--layout-menu-min-inline-size` | `10rem` | Minimum width of the dropdown panel |
| `--layout-menu-padding` | `var(--space-1)` | Block padding inside the panel |
| `--layout-menu-item-padding-inline` | `var(--space-3)` | Inline padding on each action item |

```css
:root {
  --layout-menu-min-inline-size:     10rem;
  --layout-menu-padding:             var(--space-1);
  --layout-menu-item-padding-inline: var(--space-3);
}
```

### Framework scope (what lumen.css does not own)

lumen.css owns the visual menu surface, placement, and item styling only. Application code owns:

- Click handling and action callbacks
- Outside-click dismissal (add a `click` listener on `document` to close open menus when desired)
- Arrow-key roving focus (optional accessibility enhancement — native `details` toggle is the CSS-only baseline)
- Dynamic item generation or runtime list updates

## Showcase

Open `docs/showcase.html` in a browser — no server required — to see all elements in light and dark mode.

## Application recipes

Open `docs/recipes.html` in a browser for copy-pasteable, full-page application examples:

| Recipe | Primitives demonstrated |
|---|---|
| [Sign-in form](docs/recipes.html#sign-in) | Layout shell (v2), card, field composition, form validation summary, button tone |
| [Settings with tabs](docs/recipes.html#settings-tabs) | Layout shell (v5), breadcrumbs, tabs, field composition, button variants |
| [Records list](docs/recipes.html#records-list) | Layout shell (v5), data-view shell, input group, table, badges, command menu, pagination |
| [Record detail](docs/recipes.html#record-detail) | Layout shell (v6), breadcrumbs, badge, command menu, tabs, inspector panel |
| [Notification center](docs/recipes.html#notification-center) | Notification center, region states, toast stack |

Each recipe uses only documented framework contracts. Application-owned behavior (toggle handlers, keyboard navigation, validation logic) is noted inline.

## Data tables

Tables are styled by default with no extra markup. Three narrow opt-ins add higher-value business-table capabilities:

### Default (no extra attributes)

Stripes, hover, sorted-column arrow indicators via `aria-sort`, and row-state highlighting via `aria-selected`/`aria-current` all work out of the box:

```html
<table>
  <thead>
    <tr>
      <th scope="col" aria-sort="ascending">Account</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr aria-current="row"><td>Acme Corp</td><td>$84,000</td></tr>
    <tr aria-selected="true"><td>Globex</td><td>$210,000</td></tr>
  </tbody>
</table>
```

### Compact density (opt-in)

Add `data-density="compact"` to reduce row height for monitoring dashboards or data-grid contexts. Never applied globally.

```html
<table data-density="compact">
  ...
</table>
```

Tune the compact row height with `--table-cell-padding-block-compact` (default: `var(--space-1)`).

### Overflow container (opt-in)

Wrap a wide table in `<div data-table-container>` to add horizontal scrolling without causing page-level overflow. The container owns the border and radius; the inner table has no border of its own.

```html
<div data-table-container>
  <table>…</table>
</div>
```

Focus rings and sticky headers are never clipped by the container.

### Sticky headers (opt-in)

Add `data-sticky-header` to the `<table>` to keep `<thead>` cells pinned while the user scrolls. Combine with `data-table-container` for long, wide datasets:

```html
<div data-table-container>
  <table data-sticky-header>…</table>
</div>
```

Sticky headers degrade gracefully when no overflow container is present. Print output always renders headers in full via `display: table-header-group`.

### Table tokens

| Token | Default | Purpose |
|---|---|---|
| `--table-cell-padding-block` | `var(--space-3)` | Block (vertical) padding for `th` and `td` |
| `--table-cell-padding-inline` | `var(--space-4)` | Inline (horizontal) padding for `th` and `td` |
| `--table-cell-padding-block-compact` | `var(--space-1)` | Block padding override for compact tables |
| `--table-sticky-header-shadow` | `0 2px 4px …` | Shadow applied to sticky `th` for scroll depth cue |
| `--table-stripe-bg` | neutral-50 / neutral-850 | Even-row stripe background |
| `--table-row-hover-bg` | blue-50 / blue-950 | Row hover background |

## Status badges

Compact inline pills for status labels in tables, cards, lists, and dashboards. Badges are **purely presentational and non-interactive**. v1 provides a single compact pill shape only — no size variants, icon slots, or dismissible behavior.

**Supported host elements:** `span`, `strong`, `small` with `[data-badge]`.

**Supported tones:** `neutral` (default), `accent`, `success`, `warning`, `danger`.

```html
<!-- Default (neutral) -->
<span data-badge>Neutral</span>

<!-- Explicit tone -->
<span data-badge data-tone="accent">Accent</span>
<span data-badge data-tone="success">Success</span>
<span data-badge data-tone="warning">Warning</span>
<span data-badge data-tone="danger">Danger</span>

<!-- Inside a table cell -->
<td><span data-badge data-tone="success">Fulfilled</span></td>
```

Tone colors are resolved from the existing semantic token families (`--color-{tone}-subtle`, `--color-{tone}-text`, `--color-{tone}-border`). Sizing and shape are controlled by the four badge tokens:

| Token | Default | Description |
|---|---|---|
| `--layout-badge-padding-inline` | `var(--space-2)` | Horizontal padding |
| `--layout-badge-padding-block` | `var(--space-1)` | Vertical padding |
| `--layout-badge-font-size` | `var(--font-size-xs)` | Pill text size |
| `--layout-badge-radius` | `var(--radius-full)` | Pill border radius |

## Region states

lumen.css provides reusable region-level presentation patterns for communicating empty, error, and success states within application sections. These patterns sit between inline alerts (field-level or inline copy) and full dialogs — they apply to the entire content of a semantic section container.

**Presentation only** — the framework styles region states but does not own copy, retry logic, recovery flow, or focus management.

### Authoring contract

```html
<!-- Empty state — informational, no live-region role required -->
<section data-region-state="empty">
  <h2>No results found</h2>
  <p>Try adjusting your filters or search terms.</p>
  <footer>
    <button type="button">Clear filters</button>
  </footer>
</section>

<!-- Success state — add role="status" when AT announcement is needed (polite) -->
<section data-region-state="success" role="status">
  <h2>Import complete</h2>
  <p>142 records were imported successfully.</p>
  <footer>
    <a href="/records">View records</a>
  </footer>
</section>

<!-- Error state — add role="alert" when immediate AT announcement is needed (assertive) -->
<section data-region-state="error" role="alert">
  <h2>Unable to load data</h2>
  <p>A server error occurred. Your data was not affected.</p>
  <footer>
    <button type="button">Try again</button>
  </footer>
</section>
```

### Contract rules

- Supported host elements: `section`, `article`, `main`, `aside`.
- Supported states: `empty`, `success`, `error`.
- `data-region-state="empty"` is informational — no live-region role is required.
- `data-region-state="success"` should carry `role="status"` when the section appears or changes content dynamically and you want a polite screen-reader announcement.
- `data-region-state="error"` should carry `role="alert"` when the error appears dynamically and requires an immediate screen-reader announcement. For static error content already in the DOM at load time the role is optional.
- The host may contain a heading, body content (`p`, `ul`, `ol`), and an optional direct `footer` for action buttons or links.
- Colors derive from the existing `--color-success-*` and `--color-danger-*` semantic token families — no new feedback palette.

### When to use a dialog instead

Use a `<dialog>` when the feedback requires a user decision before the flow can continue (for example: a destructive confirmation). Use toast notifications (`aside[data-toast-region]`) for transient, non-blocking feedback.

### What lumen.css does not own

- **Application copy** — region-state is a presentation wrapper; all visible text is provided by the application.
- **Retry and recovery logic** — action buttons in the `footer` are wired up by application code.
- **Show/hide transitions** — application code decides when states appear or change.
- **Focus management** — application code manages focus after a dynamic state change.

### Region-state tokens

```css
:root {
  --layout-region-state-padding:         var(--space-8);  /* internal padding */
  --layout-region-state-gap:             var(--space-4);  /* gap between heading, body, and footer */
  --layout-region-state-max-inline-size: 36rem;           /* maximum block width */
}
```

## Card

`article[data-card]` is a reusable content-surface for presenting a single entity — a post, product, user, or any bounded piece of content — with optional media, tone cues, and density control.

**Presentation only** — lumen.css owns layout, spacing, border, and tone. Application code owns navigation destinations, analytics, data loading, media sources, and any command handlers inside the card.

### Authoring contract

```html
<!-- Default neutral card -->
<article data-card>
  <div data-card-main>
    <header>
      <h3>Card title</h3>
      <p>Supporting meta text</p>
    </header>
    <div data-card-body>
      <p>Card body content goes here.</p>
    </div>
    <footer>
      <button type="button">Action</button>
    </footer>
  </div>
</article>

<!-- Linked card — one heading link; host stays non-interactive -->
<article data-card>
  <div data-card-main>
    <header>
      <h3><a href="/items/1">Card title</a></h3>
    </header>
    <div data-card-body>
      <p>The heading link is the navigation affordance. Secondary controls remain independently operable.</p>
    </div>
    <footer>
      <button type="button">Secondary action</button>
      <details data-menu>
        <summary aria-label="More options">⋯</summary>
        <ul role="list">
          <li><button type="button">Edit</button></li>
          <li><button type="button">Delete</button></li>
        </ul>
      </details>
    </footer>
  </div>
</article>

<!-- Top-media card -->
<article data-card data-media-position="top">
  <figure data-card-media>
    <img src="cover.jpg" alt="Cover image description" />
  </figure>
  <div data-card-main>
    <header><h3>Top-media card</h3></header>
    <div data-card-body><p>Media renders above the content block.</p></div>
  </div>
</article>

<!-- Side-media card — collapses to stacked on narrow containers -->
<article data-card data-media-position="start">
  <figure data-card-media>
    <img src="thumb.jpg" alt="Thumbnail description" />
  </figure>
  <div data-card-main>
    <header><h3>Side-media card</h3></header>
    <div data-card-body><p>Media sits in a side slot at wider widths and collapses to stacked on narrow containers.</p></div>
  </div>
</article>

<!-- Toned cards -->
<article data-card data-tone="accent">…</article>
<article data-card data-tone="success">…</article>
<article data-card data-tone="warning">…</article>
<article data-card data-tone="danger">…</article>

<!-- Compact density -->
<article data-card data-density="compact">…</article>
```

### Contract rules

- The host element **must** be `article[data-card]`.
- `div[data-card-main]` is **required** and must be a direct child of the host.
- Supported direct children of the host (in order): optional `figure[data-card-media]`, required `div[data-card-main]`.
- Inside `div[data-card-main]`, supported children (in order): optional `header`, required `div[data-card-body]`, optional `footer`.
- `data-tone` accepts: `neutral` (default), `accent`, `success`, `warning`, `danger`.
- `data-density` accepts: `comfortable` (default), `compact`.
- `data-media-position` accepts: `top` (default stacked), `start` (side slot at wider widths, collapses to stacked at `inline-size < 28rem`).
- The linked-card pattern uses **one heading link** inside `header` or `div[data-card-body]` as the primary navigation affordance. The host itself must not be interactive, and no stretched-link overlay is supported.
- Nested secondary controls (`button`, `details[data-menu]`, etc.) remain independently focusable and operable.
- Tone styling is subtle and semantic — it uses the existing `--color-{tone}-subtle`, `--color-{tone}-border` token families without making the card resemble an alert banner.

### What lumen.css does not own

- **Navigation destinations** — the `href` on heading links is application-owned.
- **Analytics and tracking** — click handlers, impressions, and data attributes for analytics are application-owned.
- **Data loading** — populating card content dynamically is application-owned.
- **Media sources** — `src`, `srcset`, `alt`, and lazy-loading attributes are application-owned.
- **Command handlers** — buttons and menu items inside `footer` are wired by application code.

### Unsupported patterns in v1

- Clickable host cards (the host is never made interactive).
- Stretched-link overlays (`::after` pointer-event tricks that make the whole card clickable).
- Arbitrary child trees without `div[data-card-main]`.
- Gallery or media-carousel behavior inside `figure[data-card-media]`.
- Semantic host elements other than `article[data-card]`.

### Card tokens

```css
:root {
  --layout-card-padding:             var(--space-5);    /* internal padding (comfortable) */
  --layout-card-padding-compact:     var(--space-3);    /* internal padding (compact) */
  --layout-card-gap:                 var(--space-4);    /* gap between header / body / footer */
  --layout-card-gap-compact:         var(--space-2);    /* gap override (compact) */
  --layout-card-radius:              var(--radius-lg);  /* host border radius */
  --layout-card-media-inline-size:   10rem;             /* side-media track width */
  --layout-card-media-aspect-ratio:  16 / 9;            /* media intrinsic ratio */
}
```

## Data-view shell

`section[data-data-view]` is an opinionated framing shell for production list, search, and admin screens. It composes the framework's existing table, pagination, badge, loading, region-state, form, and input-group primitives into one cohesive section layout.

**Composition only** — the shell provides framing and spacing. It does not own search logic, filter state, pagination math, data loading, or result rendering.

### Authoring contract

```html
<section data-data-view>

  <!-- Optional: page-level heading + primary action -->
  <header>
    <h2>Users</h2>
    <button type="button">Invite user</button>
  </header>

  <!-- Optional: search, filter, and action toolbar -->
  <form data-data-toolbar>
    <div data-input-group>
      <span data-icon><svg aria-hidden="true">…</svg></span>
      <input type="search" placeholder="Search users…" />
    </div>
    <select aria-label="Status filter">
      <option value="">All statuses</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
    <button type="submit">Search</button>
  </form>

  <!-- Optional: result count or active-filter context -->
  <p data-results-summary>Showing 1–25 of 142 users</p>

  <!-- Required: data content region -->
  <div data-data-content>
    <table>
      <thead>…</thead>
      <tbody>…</tbody>
    </table>
  </div>

  <!-- Optional: pagination or secondary actions -->
  <footer>
    <nav data-pagination aria-label="Pagination">…</nav>
  </footer>

</section>
```

### Loading state

Apply `aria-busy="true"` to `[data-data-content]` to trigger the framework's built-in loading indicator:

```html
<div data-data-content aria-busy="true">
  <!-- content is replaced by a spinner via the existing loading pattern -->
</div>
```

### Empty and error states

Place an existing `[data-region-state]` host inside `[data-data-content]`:

```html
<!-- No results -->
<div data-data-content>
  <section data-region-state="empty">
    <h3>No users found</h3>
    <p>Try adjusting your search or filters.</p>
    <footer><button type="button">Clear filters</button></footer>
  </section>
</div>

<!-- Load error -->
<div data-data-content>
  <section data-region-state="error" role="alert">
    <h3>Unable to load users</h3>
    <p>A server error occurred. Your data was not affected.</p>
    <footer><button type="button">Try again</button></footer>
  </section>
</div>
```

### Contract rules

- The host element **must** be `section[data-data-view]`.
- `[data-data-content]` is **required**; all other direct children are optional.
- Allowed direct children (in order): optional `header`, optional `form[data-data-toolbar]`, optional `[data-results-summary]`, required `[data-data-content]`, optional `footer`.
- `form[data-data-toolbar]` composes existing form controls and input groups — no new widget semantics are introduced.
- `[data-results-summary]` provides status copy only; it **must not** contain interactive controls.
- The content region may contain a `<table>`, a list, cards, or an existing `[data-region-state]` host.
- `[aria-busy="true"]` on `[data-data-content]` uses the existing framework loading pattern — the shell adds no parallel spinner.
- The `footer` is the correct location for `nav[data-pagination]` or secondary action buttons.

### What lumen.css does not own

- **Search and filter logic** — application code wires up toolbar submissions and updates the content region.
- **Pagination math** — the application calculates page offsets and renders the correct `nav[data-pagination]` links.
- **Result copy** — all text inside `[data-results-summary]` is provided by the application.
- **Data loading and transitions** — application code sets and removes `aria-busy` and replaces content region children.
- **Focus management** — application code manages focus after dynamic content updates.

### Data-view shell tokens

```css
:root {
  --layout-data-view-gap:               var(--space-4);    /* gap between shell regions */
  --layout-data-view-toolbar-gap:       var(--space-3);    /* gap between toolbar controls */
  --layout-data-view-summary-font-size: var(--font-size-sm); /* results summary text size */
}
```

## Framework vs. application responsibilities

lumen.css is a CSS-only runtime. It styles ARIA states and data attributes but never registers event listeners, reads DOM state, or manages focus. A one-page reference table covering every interactive pattern is in [docs/responsibilities.html](docs/responsibilities.html).

Quick reference for the most-reached patterns:

| Pattern | lumen.css owns | Application code owns |
|---|---|---|
| **Navbar** | Dropdown on hover/focus-within; responsive collapse on `aria-expanded` | Toggle click handler; Escape-to-close; `aria-current="page"` on active link |
| **Sidebar** | Off-canvas slide on `data-open`; reduced-motion freeze | Add/remove `data-open`; overlay/scrim; focus management |
| **Tabs** | `aria-selected` styling; segmented variant | Arrow-key nav; roving tabindex; `hidden` toggle on panels |
| **Command menu** | Dropdown layout via native `<details>` | Outside-click dismiss; action callbacks |
| **Form validation summary** | Summary block and invalid-state styling | Trigger validation; populate error links; move focus; set `aria-invalid` |
| **Toast** | Fixed stack layout and tone variants | Insert/remove `<li>` items; auto-dismiss timer; focus on dismiss |
| **Notification center** | Panel layout; unread and tone variants | Fetch items; mark-read; dismiss; panel open/close |

## Development

```bash
nix develop -c npm run lint       # Stylelint check
nix develop -c npm run lint:fix   # Auto-fix formatting issues
nix develop -c npm run test:a11y  # Accessibility smoke tests (Playwright + axe-core)
nix develop -c npm run test:visual # Visual regression tests (Playwright screenshots)
nix develop -c npm run validate   # lint + build + test:a11y
```

CI runs on every push via `.github/workflows/ci.yml` using Nix for a fully reproducible environment. Three jobs run in parallel: `lint` (CSS lint + build), `a11y` (accessibility smoke tests), and `visual` (visual regression tests).

## Versioning and releases

lumen.css follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html):

- **Patch** (`1.0.x`) — bug fixes and documentation corrections with no change to the public CSS or token API.
- **Minor** (`1.x.0`) — backwards-compatible additions: new patterns, new tokens, or expanded contracts that do not break existing authored HTML.
- **Major** (`x.0.0`) — breaking changes to documented public contracts: renamed or removed tokens, changed selector scopes, removed patterns, or altered ARIA expectations.

Breaking changes are listed prominently in [CHANGELOG.md](CHANGELOG.md) under the relevant version heading. Deprecations are noted in the minor release that introduces the replacement and removed no earlier than the next major release.

Each release is tagged on GitHub. Release artifacts are produced by `.github/workflows/release.yml` and attached to the corresponding GitHub Release.

## Cascade layer order

```
reset → tokens → base → typography → controls → data → state
```

Consumer overrides should go in an unlayered block or in a layer declared after `state` to ensure they win naturally.

## v1 scope

Foundations, typography, forms, tables, details/dialog, semantic states, toast notifications, persistent notification-center panels (`aside[data-notification-center]` — browsable inbox surface for unread, read, and actionable notifications; complements the transient toast stack), pagination, breadcrumb navigation, field composition primitives (`data-field`, `data-field-row`, `data-help`, `data-error`, `data-success`), input group composition (`data-input-group`, `data-prefix`, `data-suffix`, `data-icon`), optional button variants (`data-tone="neutral|accent|success|warning|danger"` and `data-variant="outlined"`) scoped to button-like controls only, status badges (`[data-badge]` on `span`, `strong`, or `small` — non-interactive compact pills only), region-state patterns (`[data-region-state="empty|success|error"]` on `section`, `article`, `main`, or `aside` — presentation-only region feedback surfaces), container-based layout shell (`div[data-layout-shell]` — full-page production layout with eight supported direct-child combinations from `main`-only to the full `header + sidebar + main + panel + footer` shell; all variants detected via `:has()` with no modifier attribute needed), header navigation (`nav[data-navbar]` inside `header[data-layout-header]` — responsive primary navigation with `li > a[href] + ul` grouped items and optional `button[data-nav-toggle]` collapse), command menus (`details[data-menu]` — overlay action surfaces for row actions, card overflow actions, and contextual menus), data-view shells (`section[data-data-view]` — opinionated framing shell for production list, search, and admin screens that composes the framework's existing table, pagination, badge, loading, region-state, form, and input-group primitives), and cards (`article[data-card]` — reusable content-surface for posts, products, users, and bounded content with optional media, semantic tone variants, compact density mode, and linked-card support via one internal heading link). No grid system and no flex utilities.
