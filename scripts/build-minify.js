/**
 * build-minify.js — produces css/lumen.min.css from css/lumen.css.
 *
 * Uses PostCSS + cssnano (pure-Node, no native binaries required).
 * Run via: node scripts/build-minify.js
 */

"use strict";

const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const cssnano = require("cssnano");

const SRC = path.resolve(__dirname, "../css/lumen.css");
const OUT = path.resolve(__dirname, "../css/lumen.min.css");
const MAP = OUT + ".map";

const css = fs.readFileSync(SRC, "utf8");

postcss([
  cssnano({
    preset: [
      "default",
      {
        /* Preserve @layer declaration order — it is the public cascade API. */
        cssDeclarationSorter: false,
        mergeRules: false,
        /* Keep only the leading license comment (marked with "!"). */
        discardComments: { removeAllButFirst: true },
      },
    ],
  }),
])
  .process(css, {
    from: SRC,
    to: OUT,
    map: { inline: false, annotation: path.basename(MAP) },
  })
  .then((result) => {
    fs.writeFileSync(OUT, result.css);
    if (result.map) {
      fs.writeFileSync(MAP, result.map.toString());
    }
    const inKB = (fs.statSync(SRC).size / 1024).toFixed(1);
    const outKB = (fs.statSync(OUT).size / 1024).toFixed(1);
    process.stdout.write(
      `build:minify  ${path.basename(SRC)} (${inKB} kB) → ${path.basename(OUT)} (${outKB} kB)\n`
    );
  })
  .catch((err) => {
    process.stderr.write(`build:minify failed: ${err.message}\n`);
    process.exit(1);
  });
