// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

/**
 * Playwright configuration for lumen.css QA suites.
 *
 * Both the accessibility smoke suite (test:a11y) and the visual regression
 * suite (test:visual) share this config. Each suite runs against a file://
 * URL so no dev server is needed — the tests open the docs HTML files
 * directly from disk.
 *
 * On NixOS the flake devShell sets PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH to
 * the NixOS-patched system Chromium so that the dynamically-linked binary
 * downloaded by `npx playwright install` is never used.
 *
 * Run a specific project:
 *   nix develop -c npm run test:a11y
 *   nix develop -c npm run test:visual
 */

/** Resolved path to the Chromium executable.
 *  Prefer the NixOS-provided binary when available. */
const chromiumExecutablePath =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined;

/** Shared Chromium launch options. */
const chromiumOptions = chromiumExecutablePath
  ? { executablePath: chromiumExecutablePath }
  : {};

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',

  use: {
    // Disable network requests — all assets are local
    offline: false,
    // Deterministic viewport for screenshots and layout-sensitive a11y checks
    viewport: { width: 1280, height: 800 },
    // Always use light color scheme unless a test overrides it
    colorScheme: 'light',
  },

  projects: [
    {
      name: 'a11y',
      testMatch: /.*\.a11y\.js$/,
      use: {
        ...devices['Desktop Chrome'],
        colorScheme: 'light',
        launchOptions: chromiumOptions,
      },
    },
    {
      name: 'a11y-dark',
      testMatch: /.*\.a11y\.js$/,
      use: {
        ...devices['Desktop Chrome'],
        colorScheme: 'dark',
        launchOptions: chromiumOptions,
      },
    },
    {
      name: 'visual',
      testMatch: /.*\.visual\.js$/,
      use: {
        ...devices['Desktop Chrome'],
        colorScheme: 'light',
        launchOptions: chromiumOptions,
      },
    },
    {
      name: 'visual-dark',
      testMatch: /.*\.visual\.js$/,
      use: {
        ...devices['Desktop Chrome'],
        colorScheme: 'dark',
        launchOptions: chromiumOptions,
      },
    },
    {
      name: 'visual-narrow',
      testMatch: /.*\.visual\.js$/,
      use: {
        ...devices['Desktop Chrome'],
        colorScheme: 'light',
        viewport: { width: 640, height: 900 },
        launchOptions: chromiumOptions,
      },
    },
  ],

  snapshotDir: './tests/snapshots',
  snapshotPathTemplate:
    '{snapshotDir}/{testFilePath}/{arg}-{projectName}{ext}',

  // Update snapshots explicitly: npx playwright test --update-snapshots
  // Never update silently in CI
  updateSnapshots: process.env.CI ? 'none' : 'missing',
});
