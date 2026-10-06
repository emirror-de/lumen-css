# Requirements for a machine-readable token source

The eventual source is planned as JSON and will be introduced under section 8 of `IMPROVEMENT_CHECKLIST.md`. It must not become a second, manually-maintained copy of `css/lumen.css`.

## Required information

Each token record must include:

- Stable token identifier and exact CSS custom-property name.
- Category: primitive/internal, semantic/public, or component/public.
- Default value and any theme-specific values or CSS expression needed to represent the current light/dark behavior.
- Human-readable description and ownership (framework-wide or named component).
- Public status so private `--_*` values cannot accidentally appear as supported customization points.
- Alias/reference relationships when a value is derived from another token.

The document-level metadata must include a schema version and source version. Token names must be unique; references must resolve; every public token used in CSS must be represented, and internal tokens must be explicitly classified.

## Generation and validation requirements

- Generate or verify token declarations deterministically; repeated runs must produce no diff.
- Preserve cascade layer, theme scope, and declaration order where those affect behavior.
- Check that generated CSS and the token source agree, including dark-theme overrides and aliases.
- Fail on missing, duplicate, or unknown token references and on CSS token declarations absent from the source.
- Keep generated output checked in only if the build/release workflow can verify it is current.
- Produce a public token inventory for documentation from the same source rather than maintaining an independent table.
- Do not require consumers to use the source or add a runtime dependency to the CSS package.

`css/lumen.css` remains canonical until the source, generator/check, and release workflow are implemented and validated together. At that point, source-of-truth ownership must switch in one change, not through an extended dual-maintenance period.
