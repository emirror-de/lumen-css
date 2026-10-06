# CSS token audit

This is the pre-tooling audit required before token renames. `css/lumen.css` remains the source of truth until the machine-readable source is delivered under checklist section 8.

## Findings

- **Removed unused duplicate easing surface:** `--ease-out`, `--ease-in-out`, and `--ease-emphasized` had the same cubic-bezier value, had no consumers, and did not provide distinct behavior. They were removed. The used `--transition-fast`, `--transition-base`, and `--transition-slow` values intentionally combine duration and easing because call sites consume them as complete `transition` shorthand values.
- **Repeated private `--_button-*` declarations are intentional local aliases:** each button tone maps the same internal slots (`bg`, `text`, `border`, hover/active) to a different semantic button token. They are scoped to the button and not public theme tokens; collapsing them would make variant composition less clear.
- **Repeated dark-scheme declarations are intentional overrides:** shadow and table helper values are repeated in OS-preference and explicit `[data-theme="dark"]` scopes so both theme-selection paths produce the same appearance. The select-caret URL is repeated for light default and dark overrides because its embedded SVG fill cannot inherit CSS color.
- **Public button token family remains component-owned:** `--color-button-{tone}-{property}` intentionally aliases semantic color families and is consumed by native button styles. These are not duplicate declarations of the global semantic tokens; they form the override surface for button-specific treatment.

No other duplicate token family was renamed as part of this audit. Future naming changes should be coordinated with the token source and generated-CSS consistency check in section 8.
