/**
 * check-release.js — GitHub release sanity checks.
 *
 * Verifies two things:
 *   1. Every docs link found in README.md and CHANGELOG.md resolves to a real
 *      file inside the repository root so documentation never ships with broken
 *      cross-references.
 *   2. Every expected GitHub release asset exists on disk so tagged releases
 *      always have the files the workflow is meant to attach.
 *
 * Run via: node scripts/check-release.js
 * Or:      nix develop -c npm run check:release
 *
 * Exits with code 1 and a descriptive message for each failure found.
 */

"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

let failed = false;

function fail(msg) {
  process.stderr.write(`FAIL  ${msg}\n`);
  failed = true;
}

function pass(msg) {
  process.stdout.write(`ok    ${msg}\n`);
}

// ---------------------------------------------------------------------------
// 1. Docs link integrity — check Markdown link targets in release docs
// ---------------------------------------------------------------------------

/** Extract relative `docs/` link targets from Markdown link syntax [text](path). */
function extractDocsLinks(content) {
  const pattern = /\[([^\]]+)\]\((docs\/[^)#\s]+)/g;
  const links = [];
  let m;
  while ((m = pattern.exec(content)) !== null) {
    links.push(m[2]);
  }
  return links;
}

const releaseDocs = ["README.md", "CHANGELOG.md"];

for (const docFile of releaseDocs) {
  const fullPath = path.join(ROOT, docFile);
  if (!fs.existsSync(fullPath)) {
    fail(`${docFile} not found`);
    continue;
  }
  const content = fs.readFileSync(fullPath, "utf8");
  const links = extractDocsLinks(content);
  for (const link of links) {
    const target = path.join(ROOT, link);
    if (fs.existsSync(target)) {
      pass(`${docFile} → ${link}`);
    } else {
      fail(`${docFile} references missing target: ${link}`);
    }
  }
}

// ---------------------------------------------------------------------------
// 2. GitHub release asset integrity — check every expected uploaded file exists
// ---------------------------------------------------------------------------

const releaseAssets = [
  "css/lumen.css",
  "css/lumen.min.css",
  "css/lumen.min.css.map",
];

for (const entry of releaseAssets) {
  const target = path.join(ROOT, entry);
  if (fs.existsSync(target)) {
    pass(`release asset → ${entry}`);
  } else {
    fail(`release asset missing on disk: ${entry}`);
  }
}

// ---------------------------------------------------------------------------

if (failed) {
  process.stderr.write("\nRelease check failed. Fix the issues above before creating the GitHub Release.\n");
  process.exit(1);
} else {
  process.stdout.write("\nAll release checks passed.\n");
}
