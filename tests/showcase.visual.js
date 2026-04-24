/**
 * Visual regression suite for lumen.css
 *
 * Each test captures a screenshot of a framework-critical UI region and
 * compares it against a stored baseline. Baselines are auto-created on the
 * first run (updateSnapshots: 'missing' in playwright.config.js). In CI the
 * config switches to 'none' so a missing baseline fails the build.
 *
 * Projects that run this file (defined in playwright.config.js):
 *   visual         — Chromium, light theme, 1280 × 800
 *   visual-dark    — Chromium, dark theme,  1280 × 800
 *   visual-narrow  — Chromium, light theme,   640 × 900
 *
 * Run: nix develop -c npm run test:visual
 * Update baselines: nix develop -c npx playwright test --project=visual --update-snapshots
 */

const { test, expect } = require('@playwright/test');
const path = require('path');

/** Return a file:// URL for a path relative to the project root. */
function fileUrl(relativePath) {
  return 'file://' + path.resolve(__dirname, '..', relativePath);
}

/**
 * Navigate to a page, optionally force dark theme via data-theme attribute,
 * then take a full-page screenshot and compare to the stored baseline.
 */
async function screenshotPage(page, relativePath, snapshotName, options = {}) {
  await page.goto(fileUrl(relativePath));

  if (options.forceDark) {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
  }

  await expect(page).toHaveScreenshot(snapshotName, {
    fullPage: true,
    animations: 'disabled',
  });
}

/**
 * Navigate to a page, wait for a selector, and screenshot just that element.
 */
async function screenshotElement(page, relativePath, selector, snapshotName, options = {}) {
  await page.goto(fileUrl(relativePath));

  if (options.forceDark) {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
  }

  const el = page.locator(selector).first();
  await el.waitFor({ state: 'visible' });
  await expect(el).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}

// ---------------------------------------------------------------------------
// Full showcase page
// ---------------------------------------------------------------------------

test.describe('Showcase — full page', () => {
  test('light theme', async ({ page }) => {
    await screenshotPage(page, 'docs/showcase.html', 'showcase-light.png');
  });

  test('dark theme', async ({ page }) => {
    await screenshotPage(page, 'docs/showcase.html', 'showcase-dark.png', { forceDark: true });
  });
});

// ---------------------------------------------------------------------------
// Layout shell
// ---------------------------------------------------------------------------

test.describe('Layout shell', () => {
  test('full shell (header + sidebar + main + panel + footer)', async ({ page }) => {
    await screenshotElement(
      page,
      'docs/showcase.html',
      '[data-layout-shell]',
      'layout-shell-full.png'
    );
  });
});

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------

test.describe('Navbar', () => {
  test('desktop navbar bar', async ({ page }) => {
    await screenshotElement(
      page,
      'docs/showcase.html',
      'header[data-layout-header]',
      'navbar-desktop.png'
    );
  });

  test('navbar with open dropdown (hover/focus-within)', async ({ page, viewport }) => {
    // The desktop dropdown is collapsed at narrow viewports — skip there.
    test.skip(viewport !== null && viewport.width < 768, 'dropdown only visible at wide viewport');
    await page.goto(fileUrl('docs/showcase.html'));
    // Trigger dropdown by hovering over the first item that has a nested ul
    const dropdownTrigger = page.locator('nav[data-navbar] li:has(ul) > a, nav[data-navbar] li:has(ul) > details > summary').first();
    await dropdownTrigger.hover();
    const header = page.locator('header[data-layout-header]').first();
    await expect(header).toHaveScreenshot('navbar-dropdown-open.png', { animations: 'disabled' });
  });
});

// ---------------------------------------------------------------------------
// Forms
// ---------------------------------------------------------------------------

test.describe('Forms', () => {
  test('sign-in form (recipes page)', async ({ page }) => {
    await screenshotElement(
      page,
      'docs/recipes.html',
      'section#sign-in, [id="sign-in"]',
      'form-sign-in.png'
    );
  });

  test('settings form with tabs (recipes page)', async ({ page }) => {
    await screenshotElement(
      page,
      'docs/recipes.html',
      'section#settings-tabs, [id="settings-tabs"]',
      'form-settings-tabs.png'
    );
  });

  test('field composition with invalid state (showcase)', async ({ page }) => {
    await screenshotElement(
      page,
      'docs/showcase.html',
      '[data-form-errors]',
      'form-validation-summary.png'
    );
  });
});

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

test.describe('Tabs', () => {
  test('standard tabs (showcase)', async ({ page }) => {
    await screenshotElement(
      page,
      'docs/showcase.html',
      'section[data-tabs]:not([data-variant])',
      'tabs-standard.png'
    );
  });

  test('segmented tabs (showcase)', async ({ page }) => {
    await screenshotElement(
      page,
      'docs/showcase.html',
      'section[data-tabs][data-variant="segmented"]',
      'tabs-segmented.png'
    );
  });
});

// ---------------------------------------------------------------------------
// Data table
// ---------------------------------------------------------------------------

test.describe('Data table', () => {
  test('records list table (recipes page)', async ({ page }) => {
    await screenshotElement(
      page,
      'docs/recipes.html',
      'section#records-list, [id="records-list"]',
      'data-table-records.png'
    );
  });
});

// ---------------------------------------------------------------------------
// Toast notifications
// ---------------------------------------------------------------------------

test.describe('Toast region', () => {
  test('toast stack (showcase)', async ({ page }) => {
    await screenshotElement(
      page,
      'docs/showcase.html',
      'aside[data-toast-region]',
      'toast-region.png'
    );
  });
});

// ---------------------------------------------------------------------------
// Notification center
// ---------------------------------------------------------------------------

test.describe('Notification center', () => {
  test('notification center panel (recipes page)', async ({ page }) => {
    await screenshotElement(
      page,
      'docs/recipes.html',
      'aside[data-notification-center]',
      'notification-center.png'
    );
  });
});

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

test.describe('Pagination', () => {
  test('pagination control (recipes page)', async ({ page }) => {
    await screenshotElement(
      page,
      'docs/recipes.html',
      'nav[data-pagination]',
      'pagination.png'
    );
  });
});

// ---------------------------------------------------------------------------
// Breadcrumbs
// ---------------------------------------------------------------------------

test.describe('Breadcrumbs', () => {
  test('breadcrumb nav (showcase)', async ({ page }) => {
    await screenshotElement(
      page,
      'docs/showcase.html',
      'nav[data-breadcrumbs]',
      'breadcrumbs.png'
    );
  });
});

// ---------------------------------------------------------------------------
// Loading patterns
// ---------------------------------------------------------------------------

test.describe('Loading patterns', () => {
  test('spinner and progress variants (showcase)', async ({ page }) => {
    await screenshotElement(
      page,
      'docs/showcase.html',
      ':is(section, div):has(progress)',
      'loading-patterns.png'
    );
  });
});

// ---------------------------------------------------------------------------
// Button variants
// ---------------------------------------------------------------------------

test.describe('Button variants', () => {
  test('button tone and outlined grid (showcase)', async ({ page }) => {
    await screenshotElement(
      page,
      'docs/showcase.html',
      ':is(section, div):has(button[data-tone="success"], button[data-tone="danger"])',
      'button-variants.png'
    );
  });
});
