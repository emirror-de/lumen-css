# Framework integration recipes

The initial recipes cover **React** (called out in the improvement plan’s JSX ecosystem examples) and **HTMX** (called out as a server-rendered/HTML-first integration). In both cases, Lumen remains a stylesheet over semantic HTML; the framework does not replace the `data-ui`, native, or ARIA contracts.

Each snippet begins with the plain HTML contract. The React example is JSX syntax; the HTMX example is ordinary HTML with progressive enhancement attributes. The static examples are not a substitute for validating against a project’s installed framework version.

## React: record tabs

### Plain HTML baseline

```html
<div data-ui="tabs">
  <div role="tablist" aria-label="Record details">
    <button type="button" role="tab" id="overview-tab" aria-controls="overview-panel" aria-selected="true">Overview</button>
    <button type="button" role="tab" id="history-tab" aria-controls="history-panel" aria-selected="false" tabindex="-1">History</button>
  </div>
  <section role="tabpanel" id="overview-panel" aria-labelledby="overview-tab">Record summary</section>
  <section role="tabpanel" id="history-panel" aria-labelledby="history-tab" hidden>Record history</section>
</div>
```

### JSX adaptation

```jsx
import { useState } from "react";

export function RecordTabs({ record }) {
  const [active, setActive] = useState("overview");
  const tabs = ["overview", "history"];

  return (
    <div data-ui="tabs">
      <div role="tablist" aria-label={`${record.name} details`}>
        {tabs.map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            id={`${name}-tab`}
            aria-controls={`${name}-panel`}
            aria-selected={active === name}
            tabIndex={active === name ? 0 : -1}
            onClick={() => setActive(name)}
          >
            {name === "overview" ? "Overview" : "History"}
          </button>
        ))}
      </div>
      <section role="tabpanel" id="overview-panel" aria-labelledby="overview-tab" hidden={active !== "overview"}>
        {record.summary}
      </section>
      <section role="tabpanel" id="history-panel" aria-labelledby="history-tab" hidden={active !== "history"}>
        {record.history}
      </section>
    </div>
  );
}
```

**Application owns:** `active` state, activation policy, arrow-key navigation and focus management, record data, and stable IDs when multiple instances render. This concise example shows click/state wiring only; it is not a complete APG keyboard implementation. For the complete optional behavior, use the documented [tabs module](tabs-behavior.md) with non-framework-owned markup, or supply the full behavior in the application.

## HTMX: filter a record list

### Plain HTML baseline

```html
<form action="/records" method="get" role="search">
  <label for="record-query">Search records</label>
  <input id="record-query" name="q" type="search" />
  <button type="submit">Search</button>
</form>

<section id="record-results" aria-labelledby="records-heading">
  <h2 id="records-heading">Records</h2>
  <table>
    <thead><tr><th scope="col">Record</th><th scope="col">Status</th></tr></thead>
    <tbody><tr><th scope="row"><a href="/records/1042">AC-1042</a></th><td>Open</td></tr></tbody>
  </table>
</section>
```

### HTMX enhancement

```html
<form
  action="/records"
  method="get"
  role="search"
  hx-get="/records"
  hx-target="#record-results"
  hx-swap="outerHTML"
  hx-push-url="true"
>
  <label for="record-query">Search records</label>
  <input id="record-query" name="q" type="search" />
  <button type="submit">Search</button>
</form>

<section id="record-results" aria-labelledby="records-heading" aria-live="polite">
  <h2 id="records-heading">Records</h2>
  <table>
    <thead><tr><th scope="col">Record</th><th scope="col">Status</th></tr></thead>
    <tbody><tr><th scope="row"><a href="/records/1042">AC-1042</a></th><td>Open</td></tr></tbody>
  </table>
</section>
```

**Application/server owns:** query parsing, filtering, authorization, result HTML, pagination URLs, and correct response status. Keep the normal `action`/`method` and link destinations so the baseline works without HTMX. The response must preserve the target’s ID, heading relationship, and live announcement behavior; do not return framework-specific component markup in place of semantic HTML.

## Version and validation policy

These recipes use stable primitives rather than framework-specific UI kits. Before treating a recipe as supported, validate the snippet with the project’s declared current and previous major framework versions, verify generated DOM/ARIA values, and exercise narrow and wide layouts. Exact framework versions tested are not yet recorded; see the checklist’s section 7 release gate.
