# Optional tabs behavior

The core `lumen.css` stylesheet remains usable without JavaScript. The optional `lumen.css/tabs` module adds click activation and keyboard navigation to markup that already follows the [tabs HTML/ARIA contract](../README.md#tabs).

## Markup contract

Each `[data-ui="tabs"]` host contains one directly nested, labeled `[role="tablist"]`, buttons with `role="tab"`, `aria-controls`, and `aria-selected`, and corresponding `[role="tabpanel"]` elements with matching IDs and `aria-labelledby`. Exactly one tab is selected at a time. Inactive panels use the native `hidden` attribute. Use buttons for in-page panels, not links for route navigation.

```html
<div data-ui="tabs">
  <div role="tablist" aria-label="Account settings">
    <button role="tab" id="profile-tab" aria-controls="profile-panel" aria-selected="true">Profile</button>
    <button role="tab" id="security-tab" aria-controls="security-panel" aria-selected="false" tabindex="-1">Security</button>
  </div>
  <section role="tabpanel" id="profile-panel" aria-labelledby="profile-tab">
    <h2>Profile</h2>
  </section>
  <section role="tabpanel" id="security-panel" aria-labelledby="security-tab" hidden>
    <h2>Security</h2>
  </section>
</div>
```

The application must provide unique IDs, a useful tablist accessible name, and meaningful content. The behavior module does not fetch or generate panel content.

## Setup and teardown

With a bundler:

```js
import tabs from "lumen.css/tabs";

const tabsController = tabs.initTabs();
// When removing the initialized region or tearing down the page:
tabsController.destroy();
```

Without a bundler, load the optional script after the markup and call the same initializer:

```html
<script src="node_modules/lumen.css/js/tabs.js"></script>
<script>
  const tabsController = LumenTabs.initTabs();
</script>
```

`initTabs(root)` enhances valid tabs under the supplied `Document` or `Element`; with no argument it scans the document. Invalid/incomplete hosts are left untouched. `destroy()` removes its listeners; it intentionally leaves the current ARIA and `hidden` state in place.

## Keyboard and state behavior

- Click activates the clicked tab.
- Horizontal tablists use Left/Right arrows; vertical tablists (`aria-orientation="vertical"`) use Up/Down arrows.
- Arrow navigation wraps at either end. Home and End move to the first and last tab.
- Keyboard navigation moves focus and activates the destination tab (automatic activation).
- Every activation synchronizes `aria-selected`, roving `tabindex`, and panel `hidden` state.

Applications that need manual activation, custom routing, lazy panel loading, or another keyboard policy should own that behavior instead of initializing this module. The module adds no dependency to the CSS-only experience.

## Verification

Playwright coverage for click, keyboard, focus, and state synchronization is in `tests/smoke.a11y.js`. Run `npm run test:a11y` with the configured Chromium browser installed.
