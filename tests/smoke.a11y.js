/**
 * Accessibility smoke tests for lumen.css
 *
 * Tests run against the local docs HTML files via file:// URLs so no dev
 * server is required. Each page is scanned with axe-core for WCAG 2.1 AA
 * violations, then checked for a set of framework-critical explicit assertions
 * that automated scanners alone cannot guarantee.
 *
 * Run: nix develop -c npm run test:a11y
 */

const { test, expect } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');
const path = require('path');

/** Return a file:// URL for a path relative to the project root. */
function fileUrl(relativePath) {
  return 'file://' + path.resolve(__dirname, '..', relativePath);
}

async function loadTabsBehaviorFixture(page) {
  await page.goto(fileUrl('docs/recipes.html'));
  await page.evaluate(() => {
    const host = document.createElement('div');
    host.id = 'behavior-tabs';
    host.dataset.ui = 'tabs';
    host.innerHTML = `
      <div role="tablist" aria-label="Behavior test">
        <button type="button" role="tab" id="behavior-tab-one" aria-controls="behavior-panel-one" aria-selected="true">One</button>
        <button type="button" role="tab" id="behavior-tab-two" aria-controls="behavior-panel-two" aria-selected="false" tabindex="-1">Two</button>
      </div>
      <div role="tabpanel" id="behavior-panel-one" aria-labelledby="behavior-tab-one">Panel one</div>
      <div role="tabpanel" id="behavior-panel-two" aria-labelledby="behavior-tab-two" hidden>Panel two</div>
    `;
    document.body.append(host);
  });
  await page.addScriptTag({ path: path.resolve(__dirname, '..', 'js/tabs.js') });
  await page.evaluate(() => {
    window.tabsBehaviorController = window.LumenTabs.initTabs(document.querySelector('#behavior-tabs'));
  });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Open a local HTML file, run a full WCAG 2.1 AA axe scan, and assert zero
 * violations. Optionally forces dark theme via data-theme attribute first.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} relativePath
 * @param {{ forceDark?: boolean, disableRules?: string[], iframes?: boolean }} [options]
 */
async function scanPage(page, relativePath, options = {}) {
  await page.goto(fileUrl(relativePath));

  if (options.forceDark) {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
  }

  let builder = new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']);

  // Build a single merged options object so that a subsequent .options() call
  // does not overwrite rules disabled by .disableRules() (the library replaces
  // this.option wholesale on each .options() call).
  const axeOptions = {};

  if (options.iframes === false) {
    axeOptions.iframes = false;
  }

  if (options.disableRules && options.disableRules.length > 0) {
    axeOptions.rules = {};
    for (const id of options.disableRules) {
      axeOptions.rules[id] = { enabled: false };
    }
  }

  if (Object.keys(axeOptions).length > 0) {
    builder = builder.options(axeOptions);
  }

  const results = await builder.analyze();

  expect(results.violations).toEqual([]);
}

// ---------------------------------------------------------------------------
// Showcase — full-page axe scan
// ---------------------------------------------------------------------------

test.describe('Showcase page', () => {
  test('has no axe violations on light theme', async ({ page }) => {
    // iframes:false — showcase srcdoc iframes contain standalone page demos
    // (each with their own heading hierarchy and repeated landmark labels)
    // that are not part of the framework's own accessibility contract.
    //
    // heading-order: the showcase page deliberately renders all heading levels
    // as a visual typography reference and embeds multiple iframe demos that
    // each start a fresh heading outline; the resulting cross-demo heading
    // sequence is an inherent documentation-page artifact.
    //
    // landmark-unique: multiple iframe demos on a single page each have their
    // own unlabelled <header>, <main>, <footer>, and identically-labelled
    // <nav aria-label="Primary"> elements; axe sees them as duplicate landmarks
    // across the combined DOM which is unavoidable in a multi-demo showcase.
    //
    // scrollable-region-focusable: the layout-shell <main> and iframe demo
    // containers are scrollable regions in the showcase's documentation layout;
    // this best-practice rule targets Safari-specific keyboard scrolling and
    // does not reflect a framework contract gap.
    await scanPage(page, 'docs/showcase.html', {
      iframes: false,
      disableRules: ['heading-order', 'landmark-unique', 'scrollable-region-focusable'],
    });
  });

  test('has no axe violations on dark theme', async ({ page }) => {
    await scanPage(page, 'docs/showcase.html', {
      forceDark: true,
      iframes: false,
      disableRules: ['heading-order', 'landmark-unique', 'scrollable-region-focusable'],
    });
  });
});

// ---------------------------------------------------------------------------
// Recipes page — full-page axe scan
// ---------------------------------------------------------------------------

test.describe('Recipes page', () => {
  test('has no axe violations on light theme', async ({ page }) => {
    // landmark-no-duplicate-main / landmark-main-is-top-level: recipes.html
    // intentionally embeds multiple full-page layout demos on one page; each
    // demo has its own <main> as required by the framework's documented contract.
    //
    // landmark-unique: each recipe demo is a complete page layout that includes
    // its own <main>, <nav aria-label="Primary">, sidebar, breadcrumbs, etc.
    // Having multiple demos on one page creates duplicate landmarks which is an
    // inherent documentation-demo artifact — not a framework contract violation.
    await scanPage(page, 'docs/recipes.html', {
      disableRules: [
        'landmark-no-duplicate-main',
        'landmark-main-is-top-level',
        'landmark-unique',
      ],
    });
  });

  test('has no axe violations on dark theme', async ({ page }) => {
    await scanPage(page, 'docs/recipes.html', {
      forceDark: true,
      disableRules: [
        'landmark-no-duplicate-main',
        'landmark-main-is-top-level',
        'landmark-unique',
      ],
    });
  });
});

test.describe('Acme Console application example', () => {
  test('has no axe violations on light theme', async ({ page }) => {
    await scanPage(page, 'docs/app-example.html');
  });

  test('has no axe violations on dark theme', async ({ page }) => {
    await scanPage(page, 'docs/app-example.html', { forceDark: true });
  });
});

// ---------------------------------------------------------------------------
// Framework-critical explicit assertions
// These checks supplement axe and protect regressions that axe alone
// cannot detect: visible focus rings, ARIA wiring, and current-page markers.
// ---------------------------------------------------------------------------

test.describe('Layout shell — landmark structure', () => {
  test('showcase has a banner, navigation, and main landmark', async ({ page }) => {
    await page.goto(fileUrl('docs/showcase.html'));
    await expect(page.locator('header[data-layout-header]')).toBeVisible();
    await expect(page.locator('nav[data-ui="navbar"]')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('aside[data-layout-sidebar]')).toBeVisible();
  });
});

test.describe('Navbar — aria-current and responsive toggle', () => {
  test('at least one nav link carries aria-current="page"', async ({ page }) => {
    await page.goto(fileUrl('docs/recipes.html'));
    // Each recipe section has its own navbar; assert at least one carries the marker
    const currentLinks = page.locator('nav[data-ui="navbar"] a[aria-current="page"]');
    await expect(currentLinks.first()).toBeVisible();
  });

  test('nav toggle has aria-expanded and aria-controls', async ({ page }) => {
    await page.goto(fileUrl('docs/recipes.html'));
    const toggle = page.locator('button[data-nav-toggle]').first();
    await expect(toggle).toHaveAttribute('aria-expanded');
    await expect(toggle).toHaveAttribute('aria-controls');
    await expect(toggle).toHaveAttribute('aria-label');
  });
});

test.describe('Forms — label association and aria-invalid', () => {
  test('sign-in form inputs have associated labels', async ({ page }) => {
    await page.goto(fileUrl('docs/recipes.html'));
    const emailInput = page.locator('#sign-in-email');
    await expect(emailInput).toBeVisible();
    // The label must reference the input id via `for`
    const label = page.locator('label[for="sign-in-email"]');
    await expect(label).toBeVisible();
  });

  test('aria-invalid input has an associated error description', async ({ page }) => {
    await page.goto(fileUrl('docs/recipes.html'));
    const emailInput = page.locator('#sign-in-email');
    const describedBy = await emailInput.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    // The error element referenced in aria-describedby must exist
    const errorEl = page.locator(`#${describedBy.split(' ')[0]}`);
    await expect(errorEl).toBeVisible();
  });
});

test.describe('Tabs — ARIA wiring', () => {
  test('optional behavior synchronizes click activation and panel visibility', async ({ page }) => {
    await loadTabsBehaviorFixture(page);
    await page.locator('#behavior-tab-two').click();

    await expect(page.locator('#behavior-tab-two')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#behavior-tab-two')).toHaveAttribute('tabindex', '0');
    await expect(page.locator('#behavior-tab-one')).toHaveAttribute('aria-selected', 'false');
    await expect(page.locator('#behavior-panel-two')).toBeVisible();
    await expect(page.locator('#behavior-panel-one')).toBeHidden();
  });

  test('optional behavior handles wrapping keyboard navigation and moves focus', async ({ page }) => {
    await loadTabsBehaviorFixture(page);
    const firstTab = page.locator('#behavior-tab-one');
    const secondTab = page.locator('#behavior-tab-two');

    await firstTab.focus();
    await page.keyboard.press('ArrowLeft');
    await expect(secondTab).toBeFocused();
    await expect(secondTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#behavior-panel-two')).toBeVisible();

    await page.keyboard.press('End');
    await expect(secondTab).toBeFocused();
    await page.keyboard.press('Home');
    await expect(firstTab).toBeFocused();
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });

  test('destroy removes behavior listeners without resetting current state', async ({ page }) => {
    await loadTabsBehaviorFixture(page);
    await page.locator('#behavior-tab-two').click();
    await page.evaluate(() => window.tabsBehaviorController.destroy());
    await page.locator('#behavior-tab-one').click();

    await expect(page.locator('#behavior-tab-two')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#behavior-panel-two')).toBeVisible();
  });

  test('tabs styling accepts a non-section semantic host', async ({ page }) => {
    await page.goto(fileUrl('docs/recipes.html'));
    await page.evaluate(() => {
      const host = document.createElement('div');
      host.dataset.ui = 'tabs';
      host.id = 'generic-tabs-host';
      host.innerHTML = '<div role="tablist" aria-label="Example"><button role="tab">One</button></div>';
      document.body.append(host);
    });
    await expect(page.locator('#generic-tabs-host')).toHaveCSS('display', 'flex');
  });

  test('active tab has aria-selected="true" and tabindex="0"', async ({ page }) => {
    await page.goto(fileUrl('docs/recipes.html'));
    const activeTab = page.locator('[role="tab"][aria-selected="true"]').first();
    await expect(activeTab).toHaveAttribute('tabindex', '0');
    await expect(activeTab).toHaveAttribute('aria-controls');
  });

  test('inactive tabs have tabindex="-1"', async ({ page }) => {
    await page.goto(fileUrl('docs/recipes.html'));
    const inactiveTabs = page.locator('[role="tab"][aria-selected="false"]');
    const count = await inactiveTabs.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(inactiveTabs.nth(i)).toHaveAttribute('tabindex', '-1');
    }
  });

  test('active tabpanel is visible; inactive tabpanels have hidden attribute', async ({ page }) => {
    await page.goto(fileUrl('docs/recipes.html'));
    const activeTab = page.locator('[role="tab"][aria-selected="true"]').first();
    const panelId = await activeTab.getAttribute('aria-controls');
    const activePanel = page.locator(`#${panelId}`);
    await expect(activePanel).toBeVisible();

    // Sibling panels in the same data-ui="tabs" host must be hidden
    const parentTabs = activePanel.locator('xpath=ancestor::*[@data-ui="tabs"]');
    const hiddenPanels = parentTabs.locator('[role="tabpanel"][hidden]');
    await expect(hiddenPanels).not.toHaveCount(0);
  });
});

test.describe('Pagination — aria-current', () => {
  test('current page link has aria-current="page"', async ({ page }) => {
    await page.goto(fileUrl('docs/recipes.html'));
    const currentPageLink = page.locator('nav[data-ui="pagination"] a[aria-current="page"]');
    await expect(currentPageLink).toHaveCount(1);
  });

  test('pagination nav has accessible label', async ({ page }) => {
    await page.goto(fileUrl('docs/recipes.html'));
    const paginationNav = page.locator('nav[data-ui="pagination"]');
    const label = await paginationNav.getAttribute('aria-label');
    const labelledBy = await paginationNav.getAttribute('aria-labelledby');
    expect(label || labelledBy).toBeTruthy();
  });
});

test.describe('Notification center — ARIA wiring', () => {
  test('notification center has accessible label', async ({ page }) => {
    await page.goto(fileUrl('docs/recipes.html'));
    const centers = page.locator('aside[data-ui="notification-center"]');
    const count = await centers.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const label = await centers.nth(i).getAttribute('aria-label');
      const labelledBy = await centers.nth(i).getAttribute('aria-labelledby');
      expect(label || labelledBy).toBeTruthy();
    }
  });

  test('dismiss buttons have aria-label', async ({ page }) => {
    await page.goto(fileUrl('docs/recipes.html'));
    const dismissButtons = page.locator(
      'aside[data-ui="notification-center"] button[data-dismiss]'
    );
    const count = await dismissButtons.count();
    for (let i = 0; i < count; i++) {
      const label = await dismissButtons.nth(i).getAttribute('aria-label');
      expect(label).toBeTruthy();
    }
  });
});

test.describe('Toast region — role wiring', () => {
  test('toast items carry an inner div with role="status" or role="alert"', async ({ page }) => {
    await page.goto(fileUrl('docs/recipes.html'));
    // The <li> is the CSS styling host; the live-region role lives on the inner <div>.
    const toasts = page.locator(
      'aside[data-ui="toast-region"] li > div[role="status"], aside[data-ui="toast-region"] li > div[role="alert"]'
    );
    const count = await toasts.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Breadcrumbs — aria-current', () => {
  test('breadcrumb current step carries aria-current="page"', async ({ page }) => {
    await page.goto(fileUrl('docs/recipes.html'));
    const currentCrumb = page.locator('nav[data-ui="breadcrumbs"] [aria-current="page"]');
    await expect(currentCrumb).not.toHaveCount(0);
  });
});

test.describe('Composition primitives', () => {
  test('layout algorithms use responsive grid and wrapping cluster behavior', async ({ page }) => {
    await page.goto(fileUrl('docs/showcase.html'));
    await page.setContent(`
      <link rel="stylesheet" href="${fileUrl('css/lumen.css')}">
      <div data-layout="grid" id="layout-grid"><div></div><div></div></div>
      <div data-layout="cluster" id="layout-cluster"><span>One</span><span>Two</span></div>
    `);
    await expect(page.locator('#layout-grid')).toHaveCSS('display', 'grid');
    await expect(page.locator('#layout-cluster')).toHaveCSS('flex-wrap', 'wrap');
  });

  test('field row layout accepts a semantically suitable non-div host', async ({ page }) => {
    await page.goto(fileUrl('docs/showcase.html'));
    await page.setContent(`
      <link rel="stylesheet" href="${fileUrl('css/lumen.css')}">
      <fieldset data-ui="field-row" id="field-row">
        <div data-ui="field"><label for="first">First</label><input id="first"></div>
        <div data-ui="field"><label for="last">Last</label><input id="last"></div>
      </fieldset>
    `);
    await expect(page.locator('#field-row')).toHaveCSS('display', 'grid');
  });

  test('input group layout accepts a form host with direct controls', async ({ page }) => {
    await page.goto(fileUrl('docs/showcase.html'));
    await page.setContent(`
      <link rel="stylesheet" href="${fileUrl('css/lumen.css')}">
      <form data-ui="input-group" id="search-group" action="/search" method="get">
        <input type="search" name="q" aria-label="Search">
        <button type="submit">Search</button>
      </form>
    `);
    await expect(page.locator('#search-group')).toHaveCSS('display', 'flex');
    await expect(page.locator('#search-group input')).toHaveCSS('border-top-style', 'none');
  });
});

test.describe('Cards — flexible semantic hosts', () => {
  test('card styling works without required part attributes on different host elements', async ({ page }) => {
    await page.goto(fileUrl('docs/showcase.html'));
    const articleCard = page.locator('#cards article[data-ui="card"]').first();
    const listCard = page.locator('#cards li[data-ui="card"]');

    await expect(articleCard).toHaveCSS('display', 'flex');
    await expect(listCard).toHaveCSS('display', 'flex');
    await expect(articleCard.locator('[data-card-main], [data-card-body], [data-card-media]')).toHaveCount(0);
  });

  test('media positions, tones, and compact density expose their documented layouts', async ({ page }) => {
    await page.goto(fileUrl('docs/showcase.html'));
    const topMediaCard = page.locator('#cards article[data-ui="card"]:has(> figure):not([data-media-position="start"])');
    const sideMediaCard = page.locator('#cards article[data-media-position="start"]');
    const defaultCard = page.locator('#cards article[data-ui="card"]').first();
    const compactCard = page.locator('#cards article[data-density="compact"]');
    const successCard = page.locator('#cards article[data-tone="success"]');

    await expect(topMediaCard).toHaveCSS('flex-direction', 'column');
    await expect(sideMediaCard).toHaveCSS('flex-wrap', 'wrap');
    const [defaultPadding, compactPadding] = await Promise.all([
      defaultCard.evaluate((element) => Number.parseFloat(getComputedStyle(element).paddingInlineStart)),
      compactCard.evaluate((element) => Number.parseFloat(getComputedStyle(element).paddingInlineStart)),
    ]);
    expect(compactPadding).toBeLessThan(defaultPadding);
    await expect(successCard).not.toHaveCSS('border-color', await defaultCard.evaluate(
      (element) => getComputedStyle(element).borderTopColor
    ));
  });

  test('side-media card wraps within a narrow host without viewport breakpoints', async ({ page }) => {
    await page.goto(fileUrl('docs/showcase.html'));
    const card = page.locator('#cards article[data-media-position="start"]');
    await card.evaluate((element) => {
      element.style.inlineSize = '20rem';
      element.style.maxInlineSize = '20rem';
    });

    const figure = card.locator(':scope > figure');
    const content = card.locator(':scope > :not(figure)');
    const figureBox = await figure.boundingBox();
    const contentBox = await content.boundingBox();
    expect(figureBox).not.toBeNull();
    expect(contentBox).not.toBeNull();
    expect(contentBox.y).toBeGreaterThan(figureBox.y);
  });
});

test.describe('Focus visibility — primary controls are keyboard-reachable', () => {
  test('first interactive element in nav is focusable', async ({ page }) => {
    await page.goto(fileUrl('docs/showcase.html'));
    // Tab once from the document body — should land on the brand link or nav toggle
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    const tag = await focused.evaluate((el) => el.tagName.toLowerCase());
    expect(['a', 'button', 'input', 'select', 'details', 'summary']).toContain(tag);
  });

  test('nav toggle is not visible at wide viewport (desktop)', async ({ page }) => {
    await page.goto(fileUrl('docs/showcase.html'));
    // At the default 1280px viewport the toggle must be hidden (responsive)
    const toggle = page.locator('button[data-nav-toggle]').first();
    await expect(toggle).toBeHidden();
  });
});
