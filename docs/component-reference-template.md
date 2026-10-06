# Component reference template

Use this structure for a new standalone component reference page. Keep the preview and copyable example driven by the same contract; use semantic HTML and current `data-ui` names.

## Page metadata

- **Name and purpose:** one-sentence explanation of the component’s job.
- **Status:** supported, experimental, or deprecated.
- **Browser baseline:** link to [`browser-support.html`](browser-support.html); call out any feature-specific degradation.
- **Related patterns:** links to the API references and recipes that compose with this pattern.

## Preview

Show the default state and any meaningful appearance options. Include a light/dark control only when theme behavior changes the component in a way that is useful to inspect. State controls must update the preview’s native/ARIA state and must not imply Lumen supplies application behavior.

## Copyable HTML

Provide a minimal example first, then a richer example with useful appearance properties and realistic content. The snippets should:

- Use semantic host and child elements appropriate to their context.
- Include required labels, accessible names, IDs, and ARIA relationships.
- Use only documented appearance attributes and supported values.
- Show hidden/inactive state using native attributes where applicable.
- Avoid unneeded wrappers and component-part markers.

## Accessibility

Document semantic requirements, accessible-name requirements, keyboard interaction expectations, focus behavior, and state synchronization. Separate what CSS styles from behavior the application must implement.

## Responsibility boundary

List the presentation Lumen supplies and the data, state, events, validation, routing, and lifecycle the consuming application owns.

## Verification

Link the focused automated test(s), record browser/version and viewport coverage, and list any manual checks that automation does not cover. Do not call browser behavior verified until it has been exercised on the supported baseline.
