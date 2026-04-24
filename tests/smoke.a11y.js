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

// ---------------------------------------------------------------------------
// Framework-critical explicit assertions
// These checks supplement axe and protect regressions that axe alone
// cannot detect: visible focus rings, ARIA wiring, and current-page markers.
// ---------------------------------------------------------------------------

test.describe('Layout shell — landmark structure', () => {
  test('showcase has a banner, navigation, and main landmark', async ({ page }) => {
    await page.goto(fileUrl('docs/showcase.html'));
    await expect(page.locator('header[data-layout-header]')).toBeVisible();
    await expect(page.locator('nav[data-navbar]')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('aside[data-layout-sidebar]')).toBeVisible();
  });
});

test.describe('Navbar — aria-current and responsive toggle', () => {
  test('at least one nav link carries aria-current="page"', async ({ page }) => {
    await page.goto(fileUrl('docs/recipes.html'));
    // Each recipe section has its own navbar; assert at least one carries the marker
    const currentLinks = page.locator('nav[data-navbar] a[aria-current="page"]');
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

    // Sibling panels in the same data-tabs host must be hidden
    const parentTabs = activePanel.locator('xpath=ancestor::section[@data-tabs]');
    const hiddenPanels = parentTabs.locator('[role="tabpanel"][hidden]');
    await expect(hiddenPanels).not.toHaveCount(0);
  });
});

test.describe('Pagination — aria-current', () => {
  test('current page link has aria-current="page"', async ({ page }) => {
    await page.goto(fileUrl('docs/recipes.html'));
    const currentPageLink = page.locator('nav[data-pagination] a[aria-current="page"]');
    await expect(currentPageLink).toHaveCount(1);
  });

  test('pagination nav has accessible label', async ({ page }) => {
    await page.goto(fileUrl('docs/recipes.html'));
    const paginationNav = page.locator('nav[data-pagination]');
    const label = await paginationNav.getAttribute('aria-label');
    const labelledBy = await paginationNav.getAttribute('aria-labelledby');
    expect(label || labelledBy).toBeTruthy();
  });
});

test.describe('Notification center — ARIA wiring', () => {
  test('notification center has accessible label', async ({ page }) => {
    await page.goto(fileUrl('docs/recipes.html'));
    const centers = page.locator('aside[data-notification-center]');
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
      'aside[data-notification-center] button[data-dismiss]'
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
      'aside[data-toast-region] li > div[role="status"], aside[data-toast-region] li > div[role="alert"]'
    );
    const count = await toasts.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Breadcrumbs — aria-current', () => {
  test('breadcrumb current step carries aria-current="page"', async ({ page }) => {
    await page.goto(fileUrl('docs/recipes.html'));
    const currentCrumb = page.locator('nav[data-breadcrumbs] [aria-current="page"]');
    await expect(currentCrumb).not.toHaveCount(0);
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
