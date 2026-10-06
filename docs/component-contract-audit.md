# Component structure and host-tag audit

This inventory distinguishes structural constraints needed for meaning/accessibility from CSS selectors that can be relaxed. The card pilot and tabs follow-up are reflected in the current stylesheet and examples. Remaining contracts are intentionally unchanged until each is migrated with focused tests.

| Pattern | Current host/structure constraint | Why it exists | Decision |
|---|---|---|---|
| Card | Any `[data-ui="card"]` host; optional direct `figure`, semantic `header`/`footer`; side media groups content in an unmarked child | Figure/media relationship and side-by-side layout; semantic host meaning belongs to the consuming page | Relaxed: no fixed host tag or mandatory part markers. Keep the content group only for side media. |
| Tabs | Any `[data-ui="tabs"]`; direct tablist, buttons with ARIA relationships, panels with IDs/labels | Roles, IDs, and hidden state carry widget semantics; host tag is not intrinsic to tabs | Relaxed: selector no longer requires `section`. Keep direct ARIA structure because styling and panel association rely on it. |
| Layout shell | `div[data-ui="layout-shell"]`; direct header/sidebar/main/panel/footer arrangement | Named regions and ordering drive a page-level grid and responsive collapse | Host `div` is a CSS convenience, but the contract is page-level and its children form the layout algorithm. Review separately before broadening selectors. |
| Field composition | `div[data-ui="field"]` for a single control; `fieldset[data-ui="field"]` for grouped controls; help/error/success markers are direct children | `fieldset`/`legend` are needed for grouped native controls; direct child markers make validation association styling predictable | Keep the `fieldset` distinction for meaning. Review whether the ordinary single-field wrapper can be generalized without affecting selector reliability. |
| Field row | Any suitable `[data-ui="field-row"]` host with direct field children | Auto-fit columns are the layout behavior; field wrapper children retain their own semantics | Relaxed: removed the unnecessary `div` host restriction; the host's meaning remains the author's responsibility. |
| Input group | Any suitable `[data-ui="input-group"]` host with direct control and optional prefix/suffix/icon/action children | The wrapper owns one joined border/focus surface; direct children allow segment borders and focus/invalid propagation | Relaxed: removed the `div`-only restriction; a semantic `form` may serve as the host when it represents the actual submission. Keep direct-child constraints. |
| Tabs variant | `data-variant="segmented"` on tab host | Appearance only; no structural difference | Retained as a bounded appearance property. |
| Table overflow host | `div[data-table-container]` around a table | Horizontal scrolling while avoiding clipping menus and sticky headers | Candidate tag restriction; wrapper has no required semantics, but overflow behavior must be checked in grid/sidebar/modal contexts before relaxing. |
| Toast region | `aside[data-ui="toast-region"]` with list items and an inner `role="status"`/`role="alert"` element | `aside` names a complementary region; `li` is valid list structure; live-region role belongs on announcement content | Keep semantic and accessibility constraints. |
| Notification center | `aside[data-ui="notification-center"]` with a list of notification items | Complementary region and list semantics are appropriate for persistent notification content | Keep semantic constraints; child heading/actions remain application content. |
| Pagination / breadcrumbs | Labeled `nav[data-ui="…"]`; list and link/current-item relationships | Navigation landmark and ordered location/page items provide meaning | Keep native `nav` and list semantics. |
| Badge | `span`, `strong`, or `small` host | Badge is phrasing, non-interactive status text | Keep phrasing-element restriction; block hosts would change content semantics. |
| Form error summary | `form[data-ui="form-errors"] > [data-form-summary]` with role, heading, and linked list | Summary belongs to its form and needs announced, navigable errors | Keep direct relationship and ARIA/link requirements. |

## Migration rule

Only remove a host or child restriction when the replacement preserves native meaning, ARIA relationships, and a verifiable styling target. For each future relaxation, add a minimal and richer example plus narrow-container/browser coverage before updating the checklist.
