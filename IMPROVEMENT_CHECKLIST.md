# Lumen Improvement Implementation Checklists

Small, verifiable work items derived from [`IMPROVEMENT_PLAN.md`](IMPROVEMENT_PLAN.md). The project will not preserve backwards compatibility during this work and will not release a new version until the full checklist is complete. Breaking changes are acceptable. Support the current and previous stable release of Chrome and Edge on desktop, Firefox on desktop, Safari on macOS, Safari on iOS, and Chrome on Android. Record the tested versions in the browser-support documentation; exclude Internet Explorer and obsolete browser versions.

## 1. Stabilize the public attribute and token contract

### 1.1 Define the attribute rules
- [x] Adopt `data-ui="component-name"` as the identity attribute for components.
- [x] Reserve `data-variant`, `data-tone`, and `data-density` (and documented equivalents) for appearance options.
- [x] Use native HTML and ARIA attributes for state wherever available (`disabled`, `hidden`, `aria-expanded`, etc.).
- [x] Document when a new public attribute is justified and reject utility-style attribute proliferation.
- [x] Add examples of valid and invalid attribute usage to contributor guidance.

### 1.2 Migrate component identity attributes
- [x] Inventory existing component selectors, examples, tests, and docs that use component-specific identity attributes.
- [x] Update component CSS selectors to use `[data-ui="name"]`.
- [x] Update documentation and examples to use the new identity syntax.
- [x] Update visual/accessibility tests and fixtures to match.
- [x] Remove legacy component-identity selectors and markup; do not add compatibility aliases.
- [x] Search the repository for old identity attributes and update all active CSS, docs, examples, and tests to the new contract.

### 1.3 Make token names and sources predictable
- [x] Inventory current CSS custom properties and group them as primitive, semantic, or component tokens.
- [x] Document naming, fallback, and override conventions.
- [x] Identify duplicate or unclear tokens before renaming anything; the unused duplicate easing tokens were removed and intentional repeated private/theme overrides are recorded in [`docs/token-audit.md`](docs/token-audit.md).
- [x] Record the requirements for an eventual machine-readable token source in [`docs/token-source-requirements.md`](docs/token-source-requirements.md); implement and publish that source under section 8, where token tooling is planned.

## 2. Loosen rigid component markup contracts

### 2.1 Pilot the card contract
- [x] Change component identity from `data-card` to `data-ui="card"`.
- [x] Allow semantically appropriate host elements such as `article`, `section`, `div`, or `li`.
- [x] Replace the required `div[data-card-main]` and nested body structure with the simplest content structure that supports the design.
- [x] Retain child-part attributes only when a demonstrated layout or styling requirement needs them; do not preserve wrappers for compatibility.
- [x] Make the host tag flexible and let semantic context determine whether the card is an `article`, `section`, `li`, or another suitable element.
- [x] Update card examples, docs, and tests to teach the simplified contract.
- [ ] Verify card layouts still work across media positions, tones, density, and narrow containers.

### 2.2 Apply the contract consistently
- [x] List components with required host tags, child ordering, or mandatory wrappers in [`docs/component-contract-audit.md`](docs/component-contract-audit.md).
- [x] For each, distinguish semantic requirements from CSS convenience constraints in the audit.
- [ ] Relax only the constraints that do not protect meaning, accessibility, or a necessary layout; tabs host-tag restriction was relaxed, remaining candidates need focused coverage.
- [x] Add one minimal and one richer example for each updated component (card and tabs).

## 3. Add a small set of composition primitives

- [x] Choose the initial primitives and define each layout algorithm (for example stack, cluster, grid, split, center, container).
- [x] Limit modifiers to a small documented set of useful values.
- [x] Implement the first primitive with token-based spacing and responsive behavior.
- [x] Add examples demonstrating composition without utility-attribute sprawl.
- [x] Add tests or browser checks for wrapping, overflow, and narrow containers.
- [ ] Repeat for remaining primitives only after the initial API is validated.

## 4. Make CSS packages and installation first-class

- [x] Define the supported npm package name and installation workflow.
- [x] Add package metadata and a CSS entry point that works with common bundlers.
- [x] Identify stable CSS layer boundaries and expose only useful modular entry points.
- [x] Verify full and modular imports do not unexpectedly duplicate or reorder styles; only full and minified whole-stylesheet entries are published, with guidance to import exactly one.
- [x] Add install and import examples to the README.
- [x] Run packaging/release checks on the built artifact, not only the source tree.

## 5. Improve documentation as a learning system

### 5.1 Component references
- [x] Establish a repeatable reference-page template in [`docs/component-reference-template.md`](docs/component-reference-template.md).
- [ ] Include preview, copyable HTML, accessibility notes, and responsibility boundaries for each pattern.
- [ ] Add state or theme controls where they clarify behavior.
- [ ] Add browser-support notes for features used by the pattern.
- [ ] Verify examples use the current `data-ui` and attribute vocabulary.

### 5.2 End-to-end example
- [x] Pick one realistic business application scenario (Acme Console operations workspace).
- [x] Build a small navigable example with dashboard, list/detail, forms, tables, notifications, and responsive navigation in [`docs/app-example.html`](docs/app-example.html).
- [x] Keep application behavior explicit rather than implying CSS supplies it; the example identifies static-demo limitations and application-owned routes, state, and data behavior.
- [ ] Link component references from the example and validate it at narrow and wide sizes (reference links are in place; browser validation is pending).

## 6. Add optional, tested JavaScript behaviors

- [x] Keep the core stylesheet usable without JavaScript.
- [x] Select one high-value behavior (tabs) and define its HTML and accessibility contract.
- [x] Implement it as a small dependency-free module that enhances valid HTML (`js/tabs.js`, exported as `lumen.css/tabs`).
- [ ] Test keyboard interaction, focus behavior, and state synchronization (coverage is added; Playwright execution is pending Chromium availability).
- [x] Document setup, teardown, and how to use application-owned behavior instead in [`docs/tabs-behavior.md`](docs/tabs-behavior.md).
- [ ] Add further behaviors only after the module format and contract prove out.

## 7. Publish framework integration recipes

- [x] Choose a small initial set of integrations based on project demand (React/JSX and HTMX), documented in [`docs/integrations.md`](docs/integrations.md).
- [x] Write a plain HTML baseline for each recipe.
- [x] Show how the framework integrates without replacing semantic markup with framework-specific components.
- [x] Include realistic examples and note behavior the application still owns.
- [ ] Validate snippets against the supported framework versions.

## 8. Build token and theme tooling

- [ ] Publish the token source in the chosen machine-readable format.
- [ ] Add a consistency check between token source and generated/maintained CSS values.
- [ ] Define a minimal theme input surface (brand, neutrals, radius, density, font).
- [ ] Prototype generation of a theme from those inputs.
- [ ] Check contrast and representative components for generated themes.
- [ ] Document supported customization points and avoid promising unstable internals.

## 9. Expand container-based responsiveness

- [ ] Inventory reusable components that currently depend on viewport breakpoints.
- [ ] Identify which components benefit from responding to their containing space.
- [ ] Record tested versions for the agreed current-and-previous-release browser baseline and verify container-query support against it.
- [ ] Convert one component at a time to container queries where supported by that baseline.
- [ ] Test the component in a main region, sidebar, modal, and narrow grid cell.
- [ ] Document any intentional viewport-level behavior separately.

## 10. Focus the application component catalog

- [ ] Prioritize components for business applications using user needs and documented gaps.
- [ ] For each candidate, define its semantic purpose, API, accessibility expectations, and application-owned behavior.
- [ ] Reuse composition primitives and tokens rather than adding one-off layout attributes.
- [ ] Ship one well-tested component at a time; avoid expanding the catalog ahead of documentation and contracts.

## 11. Provide canonical accessible behavior examples

- [ ] Select complex patterns where teams commonly make accessibility mistakes.
- [ ] Provide small standalone reference implementations with clear ownership boundaries.
- [ ] Add automated tests for keyboard and state behavior.
- [ ] Link the reference implementation from the relevant component documentation.
- [ ] Keep examples copyable even for users who do not install an optional behavior package.

## 12. Make customization easier

- [ ] Identify the smallest set of high-leverage theme inputs.
- [ ] Map each input to existing semantic and component tokens.
- [ ] Prototype derived colors using supported CSS features and sensible fallbacks.
- [ ] Verify contrast, focus visibility, and light/dark presentation.
- [ ] Document a compact end-to-end theme override.

## 13. Offer safer scoped styling

- [ ] Inventory global element selectors that could affect unrelated application UI.
- [ ] Define the intended behavior of a `[data-lumen]` scope and opt-out marker.
- [ ] Prototype a scoped stylesheet entry point without changing the default global build.
- [ ] Test nested scopes, opt-outs, and component selectors inside the scope.
- [ ] Document limitations and compare generated output with the global stylesheet.

## 14. Guard the framework's complexity budget

- [x] Add the public-attribute complexity rule to contributor guidance.
- [x] Require each proposed attribute to solve a semantic, compositional, state, or reusable visual problem.
- [x] Prefer native HTML/ARIA state over parallel custom state attributes.
- [x] Reject spacing, sizing, display, or alignment attributes that recreate a utility framework.
- [x] Review new component-part attributes for necessity and keep component APIs composable.

## Suggested delivery order and release gate

- [ ] Complete section 1's attribute contract before broad component migration; migration is breaking and includes no legacy aliases.
- [ ] Simplify the card contract in section 2 as the first component pilot, then apply the rules to other rigid contracts.
- [ ] Deliver section 4 (publishing) and section 3 (composition primitives) as implementation workstreams; neither is a partial-release milestone.
- [ ] Build section 5 documentation alongside API changes, then complete the full application example.
- [ ] Add sections 6 and 11 as the optional behavior workstream.
- [ ] Complete sections 7–10 and 12–14 incrementally as foundations land.
- [ ] Run the complete validation suite against the documented current-and-previous-release browser baseline.
- [ ] Release only when every checklist item is complete and the final release/build checks pass.
