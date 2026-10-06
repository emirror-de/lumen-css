# Contributing to Lumen

## Public HTML attribute contract

Lumen uses semantic HTML first. Public attributes should identify reusable UI concepts or express presentation—not recreate a utility-class system.

- **Component identity:** use `data-ui="name"` (for example, `<article data-ui="card">`). Component identity belongs in the `data-ui` value, not a component-specific boolean attribute such as `data-card`.
- **Appearance properties:** use documented value attributes such as `data-variant="outlined"`, `data-tone="danger"`, and `data-density="compact"`. A property must have a documented set of values and a clear visual purpose.
- **Composition:** use the bounded `data-layout` vocabulary (`stack`, `cluster`, `grid`, `split`, `center`, `container`) only for reusable layout algorithms. Do not add arbitrary layout-property values.
- **State:** use native HTML and ARIA attributes whenever they express the state, such as `disabled`, `hidden`, `aria-expanded`, `aria-selected`, and `aria-busy`. A custom state attribute is acceptable only when HTML and ARIA have no appropriate equivalent; document why it is needed.
- **Structure and parts:** use semantic elements for structure. Add a component-part marker only when CSS needs it to target a meaningful part that cannot be selected robustly from the semantic structure. Part markers are not component identities.

Examples:

```html
<!-- Component identity, appearance, and native state stay distinct. -->
<article data-ui="card" data-density="compact" aria-busy="true">
  <h2>Recent activity</h2>
</article>

<!-- Avoid legacy component flags and utility-style attributes. -->
<article data-card data-padding="small" data-display="grid">
  <h2>Recent activity</h2>
</article>
```

Before adding a public `data-*` attribute, verify that it solves a semantic, compositional, state, or reusable visual problem that native HTML/CSS cannot express conveniently. Do not add attributes for generic spacing, sizing, display, alignment, or other one-off utility styling. Avoid a growing catalog of component-specific part attributes when semantic markup or existing composition can express the relationship.

## Compatibility and releases

This project is making breaking changes to its public API. Do not add aliases for superseded component identity attributes. A new version will not be released until the improvement checklist is complete.

## Validation

Run `npm run validate` for CSS linting, minified build generation, and accessibility tests. Run `npm run test:visual` when changes affect rendered appearance. Browser support targets the current and previous stable release of desktop Chrome and Edge, desktop Firefox and Safari, iOS Safari, and Android Chrome; record tested versions in the browser-support documentation.
